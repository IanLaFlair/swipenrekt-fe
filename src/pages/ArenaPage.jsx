import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore.js";
import { useAuthStore } from "../store/authStore.js";
import { getWalletSol } from "../chain.js";

const clamp = (v) => Math.max(0, Math.min(1, v));

export default function ArenaPage() {
  const navigate = useNavigate();

  const cards = useAppStore((s) => s.cards);
  const index = useAppStore((s) => s.index);
  const timer = useAppStore((s) => s.timer);
  const matches = useAppStore((s) => s.matches);
  const positions = useAppStore((s) => s.positions);
  const toast = useAppStore((s) => s.toast);
  const undo = useAppStore((s) => s.undo);
  const profile = useAuthStore((s) => s.profile);

  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [exiting, setExiting] = useState(null);
  const [exit, setExit] = useState({ x: 0, y: 0, r: 0 });
  const [sheet, setSheet] = useState(null); // { side: 'yes' | 'no' }
  const [stake, setStake] = useState(0.02);
  const [slideX, setSlideX] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [walletSol, setWalletSol] = useState(null);

  // Live devnet SOL balance of the connected wallet — refreshes on mount and
  // whenever a position is placed (so the escrowed SOL shows up).
  useEffect(() => {
    let alive = true;
    const tick = () => getWalletSol().then((v) => { if (alive) setWalletSol(v); });
    tick();
    const iv = setInterval(tick, 8000);
    return () => { alive = false; clearInterval(iv); };
  }, [positions.length]);

  const startRef = useRef(null);
  const slideStartRef = useRef(0);
  const trackWRef = useRef(320);
  const t1Ref = useRef(null);

  const raw = cards[index];

  // ---- swipe on card ----
  const onPointerDown = (e) => {
    if (exiting || sheet) return;
    startRef.current = { x: e.clientX, y: e.clientY };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    setDrag({ x: 0, y: 0, active: true });
  };
  const onPointerMove = (e) => {
    if (!drag.active) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    setDrag({ x: dx, y: dy, active: true });
  };
  const onPointerUp = () => {
    if (!drag.active) return;
    const { x, y } = drag;
    const TH = 128; // require a deliberate, far swipe
    if (x > TH && Math.abs(x) > Math.abs(y)) openSheet("yes");
    else if (x < -TH && Math.abs(x) > Math.abs(y)) openSheet("no");
    else if (y < -TH) commitSkip();
    else setDrag({ x: 0, y: 0, active: false });
  };

  // ---- skip (no confirm) ----
  const commitSkip = () => {
    if (exiting) return;
    const dx = drag.x;
    setExiting("skip");
    setExit({ x: dx || 0, y: -900, r: (dx * 0.04) || 0 });
    setDrag((d) => ({ x: d.x, y: d.y, active: false }));
    useAppStore.getState().skipToast();
    clearTimeout(t1Ref.current);
    t1Ref.current = setTimeout(() => {
      useAppStore.getState().advanceCard();
      setExiting(null);
      setExit({ x: 0, y: 0, r: 0 });
      setDrag({ x: 0, y: 0, active: false });
    }, 400);
  };

  // ---- bottom sheet ----
  const openSheet = (side) => {
    if (exiting) return;
    setSheet({ side });
    setDrag({ x: 0, y: 0, active: false });
    setSlideX(0);
    setSliding(false);
  };
  const closeSheet = () => { setSheet(null); setSlideX(0); setSliding(false); };
  const onStakeInput = (e) => {
    const digits = (e.target.value || "").replace(/[^0-9.]/g, "");
    const n = digits === "" ? 0 : Math.min(100, parseFloat(digits) || 0);
    setStake(n);
  };

  // ---- slide-to-confirm ----
  const onSlideDown = (e) => {
    slideStartRef.current = e.clientX;
    const track = e.currentTarget.parentElement;
    trackWRef.current = track ? track.getBoundingClientRect().width : 320;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    setSliding(true);
  };
  const onSlideMove = (e) => {
    if (!sliding) return;
    const max = (trackWRef.current || 320) - 56;
    let dx = e.clientX - slideStartRef.current;
    dx = Math.max(0, Math.min(max, dx));
    setSlideX(dx);
  };
  const onSlideUp = () => {
    if (!sliding) return;
    const max = (trackWRef.current || 320) - 56;
    if (slideX >= max * 0.86) confirmPosition();
    else { setSlideX(0); setSliding(false); }
  };

  const confirmPosition = () => {
    const side = sheet ? sheet.side : "yes";
    const stakeVal = stake;
    const prevIndex = index;
    const exitTo = side === "yes" ? { x: 740, y: 24, r: 26 } : { x: -740, y: 24, r: -26 };
    const { willCallApi } = useAppStore.getState().placeBet(raw, side, stakeVal);
    useAppStore.getState().clearToast();
    setSheet(null);
    setSlideX(0);
    setSliding(false);
    setExiting(side);
    setExit(exitTo);
    clearTimeout(t1Ref.current);
    t1Ref.current = setTimeout(() => {
      useAppStore.getState().advanceCard(willCallApi ? {} : { registerUndo: true, prevIndex, side, stake: stakeVal });
      setExiting(null);
      setExit({ x: 0, y: 0, r: 0 });
      setDrag({ x: 0, y: 0, active: false });
    }, 400);
  };

  const onChipSelect = (id) => {
    useAppStore.getState().jumpToMatch(id);
    setExiting(null);
    setExit({ x: 0, y: 0, r: 0 });
    setDrag({ x: 0, y: 0, active: false });
    setSheet(null);
    setSlideX(0);
    useAppStore.getState().clearToast();
  };

  // ---- derived view values ----
  const yesPct = Math.round(raw.yes * 100);
  const noPct = 100 - yesPct;
  const card = Object.assign({}, raw, {
    yesPct, noPct, yesCents: yesPct, noCents: noPct,
    yesWin: stake > 0 ? +(stake / raw.yes).toFixed(3) : 0,
    noWin: stake > 0 ? +(stake / (1 - raw.yes)).toFixed(3) : 0,
    windowLabel: Math.round(raw.windowSec / 60) + " MIN",
    scoreStr: raw.hs + " : " + raw.as
  });

  let tx, ty, rot;
  if (exiting) { tx = exit.x; ty = exit.y; rot = exit.r; }
  else { tx = drag.x; ty = drag.y; rot = drag.x * 0.05; }
  const topTransform = "translate3d(" + tx + "px," + ty + "px,0) rotate(" + rot + "deg)";
  const topTransition = exiting
    ? "transform .4s cubic-bezier(.36,0,.2,1), opacity .4s ease"
    : (drag.active ? "transform 0s" : "transform .5s cubic-bezier(.22,1,.3,1)");
  const topOpacity = exiting ? 0 : 1;

  const yesStamp = exiting === "yes" ? 1 : clamp(drag.x / 110);
  const noStamp = exiting === "no" ? 1 : clamp(-drag.x / 110);
  const skipStamp = exiting === "skip" ? 1 : clamp(-drag.y / 110);

  const t = timer || 0;
  const timerStr = String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");

  const matchesView = matches.map((m) => {
    const active = m.id === raw.matchId;
    return Object.assign({}, m, {
      active,
      scoreStr: m.hs + "–" + m.as,
      chipBg: active ? "rgba(0,255,157,.08)" : "#13131f",
      chipBorder: active ? "1px solid rgba(0,255,157,.5)" : "1px solid rgba(255,255,255,.07)",
      onSelect: () => onChipSelect(m.id)
    });
  });

  const sheetOpen = !!sheet;
  const sSide = sheet ? sheet.side : "yes";
  const price = sSide === "yes" ? raw.yes : (1 - raw.yes);
  const sheetAccent = sSide === "yes" ? "#00ff9d" : "#ff3d6e";
  const sheetAccentSoft = sSide === "yes" ? "rgba(0,255,157,.12)" : "rgba(255,61,110,.12)";
  const sheetAccentBorder = sSide === "yes" ? "rgba(0,255,157,.45)" : "rgba(255,61,110,.45)";
  const presets = [0.01, 0.02, 0.05, 0.1].map((v) => ({
    v, label: "◎" + v,
    bg: stake === v ? sheetAccentSoft : "rgba(255,255,255,.04)",
    border: stake === v ? "1px solid " + sheetAccentBorder : "1px solid rgba(255,255,255,.08)",
    color: stake === v ? sheetAccent : "#cfcfe0",
    onClick: () => setStake(v)
  }));
  const slideMaxR = (trackWRef.current || 320) - 56;
  const slideProgress = clamp((slideX || 0) / slideMaxR);

  const undoOpen = !!undo;
  const undoText = undo ? ("✓  Position placed · ◎" + undo.stake + " on " + (undo.side === "yes" ? "YES" : "NO")) : "";

  const toastShow = !!toast;

  const activeCount = positions.filter((p) => p.status === "pending").length;
  const hasActive = activeCount > 0;

  const money = (n) => "$" + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const balanceStr = profile ? money(profile.balanceUsdc) : "$1,240.50";
  const arenaStreak = profile ? profile.currentStreak : 7;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 20px 8px" }}>
        <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "19px", letterSpacing: ".6px", color: "#f4f4f8", whiteSpace: "nowrap" }}>
          {"SWIPE "}
          <span style={{ color: "#ff3d6e" }}>N REKT</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => navigate("/positions")} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "11px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", cursor: "pointer", color: "#cfcfe0" }}>
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path d="M4 6.5h14M4 11h14M4 15.5h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {hasActive ? (
              <span style={{ position: "absolute", top: "-6px", right: "-6px", minWidth: "18px", height: "18px", borderRadius: "9px", background: "#00ff9d", color: "#07070b", fontSize: "10px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                {activeCount}
              </span>
            ) : null}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "20px", padding: "5px 11px", fontSize: "10px", fontWeight: "600", letterSpacing: "1px", color: "#8a8a9c" }}>
            <span style={{ color: "#00ff9d" }}>◎</span>
            {" DEVNET "}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", padding: "2px 16px 10px", flexShrink: "0" }}>
        {matchesView.map((m, m__i) => (
          <React.Fragment key={m?.id ?? m__i}>
            <div onClick={m.onSelect} style={{ flexShrink: "0", cursor: "pointer", borderRadius: "13px", padding: "8px 12px", background: m.chipBg, border: m.chipBorder, display: "flex", flexDirection: "column", gap: "3px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#f4f4f8" }}>
                <span style={{ fontSize: "13px" }}>{m.hf}</span>
                <span style={{ fontWeight: "700" }}>{m.home}</span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontWeight: "700", color: "#cfcfe0" }}>{m.scoreStr}</span>
                <span style={{ fontWeight: "700" }}>{m.away}</span>
                <span style={{ fontSize: "13px" }}>{m.af}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", color: "#7a7a8c", fontFamily: "'Space Mono',monospace" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ff3d6e", animation: "snrPulse 1.4s infinite" }} />
                {m.min}{"' "}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ flex: "1", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 24px 0", minHeight: "0" }}>
        <div style={{ position: "absolute", width: "calc(100% - 48px)", height: "min(452px, 100%)", borderRadius: "28px", background: "#101019", border: "1px solid rgba(255,255,255,.05)", transform: "scale(.88) translateY(34px)", zIndex: "0" }} />
        <div style={{ position: "absolute", width: "calc(100% - 48px)", height: "min(452px, 100%)", borderRadius: "28px", background: "#15151f", border: "1px solid rgba(255,255,255,.06)", transform: "scale(.94) translateY(17px)", zIndex: "1" }} />
        <div onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} style={{ position: "relative", width: "100%", height: "min(452px, 100%)", borderRadius: "28px", overflow: "hidden", background: "linear-gradient(165deg,#1c1c2b 0%,#0f0f18 100%)", border: "1px solid rgba(255,255,255,.1)", boxShadow: "0 26px 64px rgba(0,0,0,.6)", display: "flex", flexDirection: "column", padding: "24px 20px 20px", zIndex: "3", touchAction: "none", cursor: "grab", willChange: "transform", transform: topTransform, transition: topTransition, opacity: topOpacity }}>
          <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "4px", background: "linear-gradient(90deg,#00ff9d,#ff3d6e)" }} />
          <div style={{ position: "absolute", inset: "0", background: "rgba(0,255,157,.16)", pointerEvents: "none", zIndex: "4", opacity: yesStamp }} />
          <div style={{ position: "absolute", inset: "0", background: "rgba(255,61,110,.16)", pointerEvents: "none", zIndex: "4", opacity: noStamp }} />
          <div style={{ position: "absolute", inset: "0", background: "rgba(150,150,180,.14)", pointerEvents: "none", zIndex: "4", opacity: skipStamp }} />
          <div style={{ position: "absolute", top: "30px", left: "22px", zIndex: "6", transform: "rotate(-16deg)", fontFamily: "'Anton',sans-serif", fontSize: "34px", letterSpacing: "2px", color: "#00ff9d", border: "4px solid #00ff9d", borderRadius: "10px", padding: "2px 14px", opacity: yesStamp }}>
            YES
          </div>
          <div style={{ position: "absolute", top: "30px", right: "22px", zIndex: "6", transform: "rotate(16deg)", fontFamily: "'Anton',sans-serif", fontSize: "34px", letterSpacing: "2px", color: "#ff3d6e", border: "4px solid #ff3d6e", borderRadius: "10px", padding: "2px 14px", opacity: noStamp }}>
            NO
          </div>
          <div style={{ position: "absolute", top: "36px", left: "50%", marginLeft: "-52px", zIndex: "6", transform: "rotate(-5deg)", fontFamily: "'Anton',sans-serif", fontSize: "30px", letterSpacing: "3px", color: "#9a9ab0", border: "4px solid #9a9ab0", borderRadius: "10px", padding: "2px 14px", opacity: skipStamp }}>
            SKIP
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: "2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,.05)", borderRadius: "9px", padding: "6px 10px", fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: "700", color: "#e6e6f0" }}>
              <span style={{ color: "#ff3d6e" }}>⏱</span>
              {timerStr}
              <span style={{ color: "#6a6a7c", fontWeight: "400" }}>{"· "}{card.windowLabel}</span>
            </div>
            <div style={{ background: "rgba(0,255,157,.1)", border: "1px solid rgba(0,255,157,.25)", borderRadius: "9px", padding: "5px 10px", fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", color: "#00ff9d" }}>
              {card.cat}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "11px", marginTop: "18px", position: "relative", zIndex: "2" }}>
            <span style={{ fontSize: "22px" }}>{card.hf}</span>
            <span style={{ fontFamily: "'Anton',sans-serif", fontSize: "21px", color: "#f4f4f8" }}>{card.home}</span>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "24px", fontWeight: "700", color: "#fff", letterSpacing: "1px" }}>{card.scoreStr}</span>
            <span style={{ fontFamily: "'Anton',sans-serif", fontSize: "21px", color: "#f4f4f8" }}>{card.away}</span>
            <span style={{ fontSize: "22px" }}>{card.af}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", marginTop: "5px", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#7a7a8c", position: "relative", zIndex: "2" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ff3d6e", animation: "snrPulse 1.4s infinite" }} />
            {card.min}{"' · 2ND HALF "}
          </div>
          <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: "2" }}>
            <h2 style={{ margin: "0", fontFamily: "'Anton',sans-serif", fontSize: "31px", lineHeight: "1.02", letterSpacing: ".3px", color: "#fff", textAlign: "center", textWrap: "balance" }}>
              {card.q}
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", fontSize: "12px", color: "#8a8a9c", textAlign: "center", marginBottom: "14px", position: "relative", zIndex: "2" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ff9d", flexShrink: "0" }} />
            {card.ctx}{" "}
          </div>
          <div style={{ position: "relative", zIndex: "2" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono',monospace", fontSize: "11px", marginBottom: "5px" }}>
              <span style={{ color: "#ff3d6e" }}>{"NO "}{card.noPct}%</span>
              <span style={{ color: "#00ff9d" }}>{card.yesPct}% YES</span>
            </div>
            <div style={{ height: "9px", borderRadius: "6px", background: "#ff3d6e", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#00ff9d", width: `${card.yesPct}%` }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "14px", position: "relative", zIndex: "2" }}>
            <div style={{ flex: "1", background: "rgba(255,61,110,.08)", border: "1px solid rgba(255,61,110,.28)", borderRadius: "14px", padding: "11px 13px", display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#ff3d6e" }}>← NO</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: "700", color: "#fff" }}>{card.noCents}¢</div>
              <div style={{ fontSize: "11px", color: "#7a7a8c" }}>{"◎" + stake}{" → ◎"}{card.noWin}</div>
            </div>
            <div style={{ flex: "1", background: "rgba(0,255,157,.08)", border: "1px solid rgba(0,255,157,.28)", borderRadius: "14px", padding: "11px 13px", display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-end", textAlign: "right" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#00ff9d" }}>YES →</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: "700", color: "#fff" }}>{card.yesCents}¢</div>
              <div style={{ fontSize: "11px", color: "#7a7a8c" }}>{"◎" + stake}{" → ◎"}{card.yesWin}</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 26px 0", flexShrink: "0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#6a6a7c", fontWeight: "600" }}>BALANCE</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "15px", fontWeight: "700", color: "#fff" }}>
            {walletSol != null ? walletSol.toFixed(3) : "—"}{" "}
            <span style={{ fontSize: "10px", color: "#00ff9d" }}>SOL</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", alignItems: "flex-end" }}>
          <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#6a6a7c", fontWeight: "600" }}>STREAK</div>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>
            {"🔥 "}{arenaStreak}{" "}
            <span style={{ fontSize: "10px", color: "#7a7a8c", fontWeight: "500" }}>wins</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "24px", padding: "14px 0 12px", flexShrink: "0" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <button onClick={() => openSheet("no")} style={{ width: "62px", height: "62px", borderRadius: "50%", border: "none", background: "#ff3d6e", color: "#0a0a0f", fontSize: "26px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 22px rgba(255,61,110,.32)" }} className="snr-press">
            ✕
          </button>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: "#ff6b8a" }}>NO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <button onClick={commitSkip} style={{ width: "58px", height: "58px", borderRadius: "50%", border: "2px solid rgba(255,255,255,.28)", background: "#1c1c28", color: "#dcdce6", fontSize: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }} className="snr-press">
            ⏭
          </button>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: "#9a9ab0" }}>SKIP</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <button onClick={() => openSheet("yes")} style={{ width: "62px", height: "62px", borderRadius: "50%", border: "none", background: "#00ff9d", color: "#07070b", fontSize: "26px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 22px rgba(0,255,157,.32)" }} className="snr-press">
            ✓
          </button>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: "#3df0b0" }}>YES</span>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "100px", left: "50%", marginLeft: "-110px", width: "220px", textAlign: "center", background: "#1b1b2b", border: "1px solid rgba(255,255,255,.12)", borderRadius: "12px", padding: "10px 16px", fontSize: "13px", fontWeight: "600", color: "#f4f4f8", boxShadow: "0 12px 30px rgba(0,0,0,.5)", zIndex: "40", pointerEvents: "none", transition: "transform .25s ease,opacity .25s ease", transform: `translateY(${toastShow ? 0 : 16}px)`, opacity: toastShow ? 1 : 0 }}>
        {toast || ""}
      </div>
      <div style={{ position: "absolute", bottom: "100px", left: "50%", marginLeft: "-167px", width: "334px", zIndex: "42", transition: "transform .25s ease,opacity .25s ease", transform: `translateY(${undoOpen ? 0 : 16}px)`, opacity: undoOpen ? 1 : 0, pointerEvents: undoOpen ? "auto" : "none" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", background: "#1b1b2b", border: "1px solid rgba(255,255,255,.14)", borderRadius: "12px", padding: "11px 12px 11px 15px", boxShadow: "0 12px 30px rgba(0,0,0,.55)" }}>
          <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#f4f4f8", whiteSpace: "nowrap" }}>{undoText}</span>
          <button onClick={() => useAppStore.getState().doUndo()} style={{ flexShrink: "0", background: "rgba(0,255,157,.12)", border: "1px solid rgba(0,255,157,.4)", borderRadius: "8px", color: "#00ff9d", fontSize: "12px", fontWeight: "700", cursor: "pointer", letterSpacing: ".5px", padding: "6px 12px" }}>
            UNDO
          </button>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid rgba(255,255,255,.07)", background: "rgba(10,10,16,.92)", backdropFilter: "blur(12px)", padding: "9px 0 18px", flexShrink: "0", position: "relative" }}>
        <div onClick={() => navigate("/arena")} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#00ff9d" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="6" width="11" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" opacity=".45" />
            <rect x="8" y="3" width="11" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".3px" }}>Arena</span>
        </div>
        <div onClick={() => navigate("/album")} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#55555f" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="4" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
            <rect x="12" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
            <rect x="4" y="12" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
            <rect x="12" y="12" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".3px" }}>Album</span>
        </div>
        <div onClick={() => navigate("/leaderboard")} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#55555f" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="12" width="4" height="6" rx="1" fill="currentColor" />
            <rect x="9" y="8" width="4" height="10" rx="1" fill="currentColor" />
            <rect x="15" y="4" width="4" height="14" rx="1" fill="currentColor" />
          </svg>
          <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".3px" }}>Ranking</span>
        </div>
        <div onClick={() => navigate("/profile")} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#55555f" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4.5 18.5a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".3px" }}>Profile</span>
        </div>
        <div style={{ position: "absolute", bottom: "7px", left: "50%", transform: "translateX(-50%)", width: "128px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,.22)" }} />
      </div>
      <div onClick={closeSheet} style={{ position: "absolute", inset: "0", zIndex: "30", background: "rgba(4,4,8,.62)", transition: "opacity .3s ease", opacity: sheetOpen ? 1 : 0, pointerEvents: sheetOpen ? "auto" : "none" }} />
      <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", zIndex: "31", background: "#13131d", borderTop: "1px solid rgba(255,255,255,.08)", borderRadius: "26px 26px 0 0", boxShadow: "0 -20px 50px rgba(0,0,0,.55)", padding: "10px 20px 26px", transition: "transform .34s cubic-bezier(.3,1,.3,1)", transform: `translateY(${sheetOpen ? "0%" : "112%"})` }}>
        <div style={{ width: "40px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,.18)", margin: "4px auto 16px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "0" }}>
            <span style={{ flexShrink: "0", fontFamily: "'Anton',sans-serif", fontSize: "15px", letterSpacing: "1px", color: "#07070b", background: sheetAccent, borderRadius: "8px", padding: "4px 11px" }}>
              {sSide === "yes" ? "YES" : "NO"}
            </span>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#f4f4f8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {raw.q}
            </span>
          </div>
          <button onClick={closeSheet} style={{ flexShrink: "0", width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(255,255,255,.12)", background: "transparent", color: "#9a9ab0", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
        </div>
        <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#6a6a7c", fontWeight: "600", marginBottom: "7px" }}>YOUR STAKE</div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", padding: "11px 16px", marginBottom: "12px" }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "26px", fontWeight: "700", color: "#fff" }}>◎</span>
          <input value={stake} onInput={onStakeInput} inputMode="numeric" style={{ flex: "1", minWidth: "0", background: "transparent", border: "none", outline: "none", color: "#fff", fontFamily: "'Space Mono',monospace", fontSize: "26px", fontWeight: "700", padding: "0" }} />
          <span style={{ color: "#7a7a8c", fontSize: "17px" }}>✎</span>
          <span style={{ color: "#6a6a7c", fontSize: "11px", letterSpacing: ".5px", marginLeft: "2px" }}>SOL</span>
        </div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
          {presets.map((p, p__i) => (
            <React.Fragment key={p?.v ?? p__i}>
              <button onClick={p.onClick} style={{ flex: "1", cursor: "pointer", borderRadius: "11px", padding: "9px 0", fontFamily: "'Space Mono',monospace", fontSize: "14px", fontWeight: "700", background: p.bg, border: p.border, color: p.color }}>
                {p.label}
              </button>
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,.03)", borderRadius: "14px", padding: "13px 16px", marginBottom: "18px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600" }}>PRICE</span>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "15px", fontWeight: "700", color: "#cfcfe0" }}>{Math.round(price * 100)}¢</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-end" }}>
            <span style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600" }}>WIN →</span>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "24px", fontWeight: "700", color: sheetAccent }}>◎{stake > 0 ? +(stake / price).toFixed(3) : 0}</span>
          </div>
        </div>
        <div data-slidetrack="1" style={{ position: "relative", height: "56px", borderRadius: "16px", background: sheetAccentSoft, border: `1px solid ${sheetAccentBorder}`, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: (slideX + 53) + "px", background: sheetAccentSoft }} />
          <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", letterSpacing: ".5px", color: sheetAccent, opacity: 1 - slideProgress, pointerEvents: "none" }}>
            Slide to confirm →
          </div>
          <div onPointerDown={onSlideDown} onPointerMove={onSlideMove} onPointerUp={onSlideUp} onPointerCancel={onSlideUp} style={{ position: "absolute", left: "3px", top: "3px", width: "50px", height: "50px", borderRadius: "13px", background: sheetAccent, color: "#07070b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "700", cursor: "grab", touchAction: "none", transform: `translateX(${slideX}px)`, transition: sliding ? "transform 0s" : "transform .25s ease" }}>
            →
          </div>
        </div>
      </div>
    </>
  );
}
