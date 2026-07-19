import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "../screens";
import { useAppStore } from "../store/appStore.js";

const shortHex = (h) => h ? (h.slice(0, 10) + "…" + h.slice(-6)) : "";

export default function ResultPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const positions = useAppStore((s) => s.positions);
  const history = useAppStore((s) => s.history);
  const [dropOpen, setDropOpen] = useState(false);

  const sel = [...positions, ...history].find((p) => p.id === id) || {};
  const selWon = sel.status === "won";
  const selPayout = sel.price ? +(sel.stake / sel.price).toFixed(3) : 0;
  const rc = sel.receipt || {};

  const v = {
    onResultBack: () => navigate("/positions"),
    goArena: () => navigate("/arena"),
    selQ: sel.q || "",
    selMatch: sel.mLabel || "",
    selSideLabel: sel.side === "yes" ? "YES" : "NO",
    selSideColor: sel.side === "yes" ? "#00ff9d" : "#ff3d6e",
    selStakeStr: "◎" + (sel.stake || 0),
    selPriceCents: Math.round((sel.price || 0) * 100),
    selOutcomeLabel: selWon ? "YOU WON" : "DIDN'T HIT",
    selPayoutStr: selWon ? ("+◎" + selPayout) : ("−◎" + (sel.stake || 0)),
    selPayoutColor: selWon ? "#00ff9d" : "#ff3d6e",
    selGlow: selWon ? "rgba(0,255,157,.16)" : "rgba(255,61,110,.13)",
    selStat: sel.stat || "",
    selStatMin: sel.statMin || 0,
    rcRoot: shortHex(rc.root), rcLeaf: shortHex(rc.leaf),
    rcN1: shortHex(rc.n1), rcN2: shortHex(rc.n2), rcSig: shortHex(rc.sig),
    rcSlot: rc.slot || 0,
    selRare: selWon && !!sel.rare,
    onClaim: () => setDropOpen(true)
  };

  const closeDrop = () => { setDropOpen(false); navigate("/arena"); };

  return (
    <>
      <Result v={v} />
      {dropOpen ? (
        <div style={{ position: "absolute", inset: "0", zIndex: "45", background: "radial-gradient(circle at 50% 36%, rgba(255,207,77,.18), rgba(7,7,11,.97) 62%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px" }}>
          <div style={{ fontSize: "12px", letterSpacing: "3px", fontWeight: "700", color: "#ffcf4d", marginBottom: "18px", animation: "snrPulse 1.6s infinite" }}>
            ★ RARE MOMENT UNLOCKED ★
          </div>
          <div style={{ width: "236px", borderRadius: "20px", overflow: "hidden", border: "2px solid #ffcf4d", boxShadow: "0 0 70px rgba(255,207,77,.45)", background: "linear-gradient(#1b1810,#100e0a)", animation: "dropIn .6s cubic-bezier(.2,1.25,.3,1) both" }}>
            <div style={{ height: "196px", position: "relative", background: "repeating-linear-gradient(45deg,#2a2616,#2a2616 11px,#221f12 11px,#221f12 22px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "1px", color: "#6e6650" }}>
                MOMENT&nbsp;CLIP
              </span>
              <span style={{ position: "absolute", top: "11px", right: "11px", fontSize: "9px", fontWeight: "700", letterSpacing: "1px", color: "#1a1406", background: "#ffcf4d", borderRadius: "6px", padding: "3px 8px" }}>
                LEGENDARY
              </span>
            </div>
            <div style={{ padding: "14px 16px 16px" }}>
              <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "22px", color: "#fff", letterSpacing: ".4px" }}>
                {sel.player || "WORLD CUP MOMENT"}
              </div>
              <div style={{ fontSize: "11.5px", color: "#a59a78", marginTop: "3px" }}>
                {sel.moment || "Rare live moment"}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", borderTop: "1px solid rgba(255,207,77,.18)", paddingTop: "10px" }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#cfcfe0" }}>
                  #024 / 250
                </span>
                <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: "#ffcf4d" }}>
                  cNFT · SOLANA
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "26px", width: "236px" }}>
            <button onClick={closeDrop} style={{ flex: "1", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "13px", color: "#f4f4f8", fontSize: "13px", fontWeight: "600", padding: "13px 0", cursor: "pointer" }}>
              Add to Album
            </button>
            <button onClick={closeDrop} style={{ flex: "1", background: "#00ff9d", border: "none", borderRadius: "13px", color: "#07070b", fontSize: "13px", fontWeight: "700", padding: "13px 0", cursor: "pointer" }}>
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
