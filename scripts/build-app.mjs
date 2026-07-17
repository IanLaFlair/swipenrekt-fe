// Assemble src/App.jsx from the legacy logic class + the converted shell JSX.
// The logic is copied VERBATIM apart from the class header and Component.* ->
// App.* renames: DCLogic.setState had identical semantics to React.Component
// (functional update + shallow merge + callback), so the port is 1:1.
import { readFileSync, writeFileSync } from "node:fs";

const html = readFileSync("legacy/index.html", "utf8");
const m = html.match(/<script type="text\/x-dc" data-dc-script>([\s\S]*?)<\/script>/);
if (!m) throw new Error("logic script not found");

let logic = m[1].trim();
logic = logic.replace(/^class\s+Component\s+extends\s+DCLogic\s*\{/, "class App extends React.Component {");
logic = logic.replace(/\bComponent\./g, "App.");
if (logic.includes("extends DCLogic")) throw new Error("class header not rewritten");

// Shell: swap <screen-slot name="X" flag="showX" /> for the real component.
let shell = readFileSync("src/generated-shell.jsx.txt", "utf8");
const screens = [];
shell = shell.replace(
  /<screen-slot name="([A-Za-z]+)" flag="([A-Za-z]+)"\s*\/>/g,
  (_, name, flag) => {
    screens.push(name);
    return `{v.${flag} ? <${name} v={v} /> : null}`;
  },
);
if (shell.includes("screen-slot")) throw new Error("unreplaced screen-slot");

const out = `import React from "react";
// api.js is an IIFE that installs window.SNR — imported for its side effect so
// the bundler owns it (no extra request, same tested code).
import "./api.js";
import { ${screens.join(", ")} } from "./screens";

${logic}

  // The dc-runtime called renderVals() and rendered the template against it.
  // Here render() does the same, passing the vals object down to each screen.
  render() {
    const v = this.renderVals();
    return (
${shell}
    );
  }
}

export default App;
`;

// the ported class already ends with a closing brace; drop the duplicate
writeFileSync("src/App.jsx", out.replace(/\}\n\n  \/\/ The dc-runtime/, "\n  // The dc-runtime"));
console.log("src/App.jsx written — screens:", screens.join(", "));
