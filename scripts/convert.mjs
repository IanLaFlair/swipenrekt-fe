// One-shot converter: the design's <x-dc> template -> React JSX components.
//
// Mechanical transform only — it does not invent markup. Every style string is
// parsed and re-emitted so the design survives byte-for-byte in meaning:
//   {{ expr }}                       -> {v.expr}   (or {m.expr} inside sc-for)
//   <sc-if value="{{ x }}">…         -> {v.x ? (<>…</>) : null}
//   <sc-for list="{{ xs }}" as="m">… -> {v.xs.map((m, i) => (<Fragment key={i}>…</Fragment>))}
//   style="a-b:c"                    -> style={{ aB: "c" }}
//   style-active="…"                 -> className="snr-press" (runtime ignored it before)
//
// Top-level <sc-if value="{{ showX }}"> blocks become src/screens/X.jsx.
// Usage: node scripts/convert.mjs
import { parse } from "node-html-parser";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = "legacy/index.html";
const html = readFileSync(SRC, "utf8");

// ---- pull the template out of <x-dc> … </x-dc>, minus <helmet> ----
const open = html.indexOf("<x-dc>");
const close = html.lastIndexOf("</x-dc>");
let tpl = html.slice(open + "<x-dc>".length, close);
tpl = tpl.replace(/<helmet>[\s\S]*?<\/helmet>/, "");

const VOID = new Set(["br", "img", "input", "hr", "meta", "link", "source", "area", "base", "col", "embed", "param", "track", "wbr"]);
// Attributes whose JSX spelling differs from HTML.
const ATTR_MAP = {
  class: "className",
  for: "htmlFor",
  inputmode: "inputMode",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
};

const cssProp = (p) =>
  p.startsWith("--") ? p : p.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

// Split respecting parens/quotes so url(a;b) and 'Anton',sans-serif survive.
function splitTop(str, sep) {
  const out = [];
  let depth = 0, quote = null, cur = "";
  for (const ch of str) {
    if (quote) { cur += ch; if (ch === quote) quote = null; continue; }
    if (ch === "'" || ch === '"') { quote = ch; cur += ch; continue; }
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === sep && depth === 0) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

// `{{ a.b }}` -> scoped JS expression. Locals (sc-for vars) stay bare; everything
// else is a value off the vals object `v`.
const scopeExpr = (raw, locals) => {
  const e = raw.trim();
  const root = e.split(/[.[\s]/)[0];
  return locals.has(root) ? e : `v.${e}`;
};

// Interpolate a raw attribute/text value that may contain {{ }}.
// Returns { js: true, code } for an expression, or { js: false, text }.
function interp(raw, locals) {
  const whole = raw.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/);
  if (whole) return { js: true, code: scopeExpr(whole[1], locals) };
  if (!raw.includes("{{")) return { js: false, text: raw };
  // mixed text + expressions -> template literal
  const parts = raw.split(/\{\{([\s\S]+?)\}\}/g);
  const body = parts
    .map((s, i) => (i & 1 ? "${" + scopeExpr(s, locals) + "}" : s.replace(/`/g, "\\`").replace(/\$\{/g, "\\${")))
    .join("");
  return { js: true, code: "`" + body + "`" };
}

function styleToJsx(raw, locals) {
  const decls = splitTop(raw, ";");
  const pairs = [];
  for (const d of decls) {
    if (!d.trim()) continue;
    const i = d.indexOf(":");
    if (i === -1) continue;
    const prop = d.slice(0, i).trim();
    const val = d.slice(i + 1).trim();
    const key = cssProp(prop);
    const safeKey = /^[a-zA-Z][a-zA-Z0-9]*$/.test(key) ? key : JSON.stringify(key);
    const r = interp(val, locals);
    pairs.push(`${safeKey}: ${r.js ? r.code : JSON.stringify(r.text)}`);
  }
  return `{{ ${pairs.join(", ")} }}`;
}

// Parse rawAttrs ourselves to preserve original attribute casing (onClick etc).
function rawAttrPairs(rawAttrs) {
  const out = [];
  const re = /([a-zA-Z_:@.\-\[\]]+)\s*=\s*("([^"]*)"|'([^']*)')|([a-zA-Z_:@.\-]+)(?=[\s/>]|$)/g;
  let m;
  while ((m = re.exec(rawAttrs))) {
    if (m[1]) out.push([m[1], m[3] !== undefined ? m[3] : m[4]]);
    else if (m[5]) out.push([m[5], true]);
  }
  return out;
}

const esc = (t) =>
  t.replace(/([{}])/g, "{'$1'}").replace(/\{\{/g, "{{");

function emitChildren(node, locals, ind) {
  return node.childNodes.map((c) => emit(c, locals, ind)).filter(Boolean).join("\n");
}

function emit(node, locals, ind) {
  const pad = "  ".repeat(ind);

  // text node
  //
  // JSX strips whitespace at line ends and next to tags, which silently glues
  // inline text to adjacent <span>s ("Demo runs on" + "Solana devnet"). So any
  // literal chunk carrying a meaningful leading/trailing space is emitted as a
  // string expression, which JSX preserves verbatim.
  if (node.nodeType === 3) {
    const raw = node.rawText;
    if (!raw.trim()) return null;
    const collapsed = raw.replace(/\s+/g, " ");
    const lit = (s) => {
      if (!s) return "";
      return s === s.trim() ? esc(s) : `{${JSON.stringify(s)}}`;
    };
    if (!collapsed.includes("{{")) return pad + lit(collapsed);
    // split text into literal + {…} chunks, preserving spacing on each side
    const parts = collapsed.split(/\{\{([\s\S]+?)\}\}/g);
    const body = parts
      .map((s, i) => (i & 1 ? `{${scopeExpr(s, locals)}}` : lit(s)))
      .join("");
    return pad + body;
  }
  if (node.nodeType === 8) return null; // comment
  if (node.nodeType !== 1) return null;

  const tag = node.rawTagName;

  // ---- <sc-if value="{{ x }}"> ----
  if (tag === "sc-if") {
    const attrs = Object.fromEntries(rawAttrPairs(node.rawAttrs));
    const cond = interp(attrs.value ?? "", locals);
    const inner = emitChildren(node, locals, ind + 1);
    return `${pad}{${cond.js ? cond.code : JSON.stringify(cond.text)} ? (\n${pad}  <>\n${inner}\n${pad}  </>\n${pad}) : null}`;
  }

  // ---- <sc-for list="{{ xs }}" as="m"> ----
  if (tag === "sc-for") {
    const attrs = Object.fromEntries(rawAttrPairs(node.rawAttrs));
    const list = interp(attrs.list ?? "", locals);
    const as = attrs.as || "item";
    const next = new Set(locals);
    next.add(as);
    const idx = `${as}__i`;
    const inner = emitChildren(node, next, ind + 2);
    const listCode = list.js ? list.code : "[]";
    return `${pad}{(${listCode} || []).map((${as}, ${idx}) => (\n${pad}  <React.Fragment key={${as}?.id ?? ${idx}}>\n${inner}\n${pad}  </React.Fragment>\n${pad}))}`;
  }

  // ---- regular element ----
  const parts = [];
  let pressClass = false;
  for (const [name, value] of rawAttrPairs(node.rawAttrs)) {
    if (name.startsWith("hint-placeholder")) continue;
    if (name === "style-active") { pressClass = true; continue; }
    if (name === "style") { parts.push(`style=${styleToJsx(value, locals)}`); continue; }
    const jsxName = ATTR_MAP[name] || name;
    if (value === true) { parts.push(jsxName); continue; }
    const r = interp(value, locals);
    parts.push(r.js ? `${jsxName}={${r.code}}` : `${jsxName}=${JSON.stringify(r.text)}`);
  }
  if (pressClass) parts.push(`className="snr-press"`);

  const attrStr = parts.length ? " " + parts.join(" ") : "";
  if (VOID.has(tag)) return `${pad}<${tag}${attrStr} />`;

  const inner = emitChildren(node, locals, ind + 1);
  if (!inner) return `${pad}<${tag}${attrStr} />`;
  return `${pad}<${tag}${attrStr}>\n${inner}\n${pad}</${tag}>`;
}

// ---- split top-level screens out ----
const root = parse(tpl, { lowerCaseTagName: false, comment: false });
// the phone frame is the deepest single wrapper holding the screens
const all = root.querySelectorAll("sc-if");
const screenBlocks = all.filter((n) => {
  const a = Object.fromEntries(rawAttrPairs(n.rawAttrs));
  const m = (a.value || "").match(/^\s*\{\{\s*(show[A-Za-z]+)\s*\}\}\s*$/);
  if (!m) return false;
  // only top-level ones (not nested inside another sc-if/sc-for)
  let p = n.parentNode;
  while (p) {
    if (p.rawTagName === "sc-if" || p.rawTagName === "sc-for") return false;
    p = p.parentNode;
  }
  return true;
});

mkdirSync("src/screens", { recursive: true });
const made = [];
for (const blk of screenBlocks) {
  const a = Object.fromEntries(rawAttrPairs(blk.rawAttrs));
  const flag = a.value.match(/\{\{\s*(show[A-Za-z]+)\s*\}\}/)[1];
  const name = flag.replace(/^show/, "");
  const body = emitChildren(blk, new Set(), 3);
  const file = `import React from "react";

// Converted from the design template (<sc-if value="{{ ${flag} }}">).
// \`v\` is the vals object computed in App.render().
export default function ${name}({ v }) {
  return (
    <>
${body}
    </>
  );
}
`;
  writeFileSync(`src/screens/${name}.jsx`, file);
  made.push({ name, flag });
  // replace the block in the tree with a marker so App doesn't duplicate it
  blk.replaceWith(`<screen-slot name="${name}" flag="${flag}"></screen-slot>`);
}

// ---- remaining tree = the arena shell ----
const shellBody = emitChildren(root, new Set(), 3);
writeFileSync("src/generated-shell.jsx.txt", shellBody);
writeFileSync(
  "src/screens/index.js",
  made.map((m) => `export { default as ${m.name} } from "./${m.name}.jsx";`).join("\n") + "\n",
);
console.log("screens:", made.map((m) => m.name).join(", "));
console.log("shell -> src/generated-shell.jsx.txt");
