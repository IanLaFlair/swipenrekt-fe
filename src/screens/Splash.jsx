import React from "react";

// Converted from the design template (<sc-if value="{{ showSplash }}">).
// `v` is the vals object computed in App.render().
export default function Splash({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "42", background: "radial-gradient(130% 80% at 50% 14%, #15191f 0%, #07070b 60%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "34px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-50px", left: "-40px", width: "210px", height: "210px", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,255,157,.18),transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "30px", right: "-50px", width: "230px", height: "230px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,61,110,.16),transparent 70%)" }} />
        <div style={{ position: "relative", width: "150px", height: "198px", borderRadius: "18px", background: "linear-gradient(165deg,#1c1c2b,#0f0f18)", border: "1px solid rgba(255,255,255,.1)", boxShadow: "0 24px 60px rgba(0,0,0,.6)", transform: "rotate(-8deg)", marginBottom: "36px", overflow: "hidden", display: "flex", flexDirection: "column", padding: "14px" }}>
          <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "3px", background: "linear-gradient(90deg,#00ff9d,#ff3d6e)" }} />
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#7a7a8c" }}>
            ⏱ 04:12 · 5 MIN
          </div>
          <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <span style={{ fontFamily: "'Anton',sans-serif", fontSize: "19px", color: "#fff", lineHeight: "1.05" }}>
              GOAL IN
              <br />
              5 MIN?
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ flex: "1", height: "32px", borderRadius: "8px", background: "rgba(255,61,110,.12)", border: "1px solid rgba(255,61,110,.3)" }} />
            <div style={{ flex: "1", height: "32px", borderRadius: "8px", background: "rgba(0,255,157,.12)", border: "1px solid rgba(0,255,157,.3)" }} />
          </div>
        </div>
        <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "46px", lineHeight: ".92", letterSpacing: ".5px", color: "#f4f4f8", textAlign: "center" }}>
          SWIPE
          <br />
          <span style={{ color: "#ff3d6e" }}>
            N REKT
          </span>
        </div>
        <div style={{ fontSize: "14px", color: "#9a9ab0", textAlign: "center", marginTop: "14px", maxWidth: "286px", textWrap: "balance", lineHeight: "1.45" }}>
          Swipe in-play football markets. Bet a moment, settle on-chain, collect the rare ones.
        </div>
        <button onClick={v.onConnect} style={{ marginTop: "34px", width: "100%", maxWidth: "300px", background: "#00ff9d", border: "none", borderRadius: "15px", color: "#07070b", fontSize: "16px", fontWeight: "700", letterSpacing: ".3px", padding: "16px 0", cursor: "pointer", boxShadow: "0 10px 30px rgba(0,255,157,.3)" }}>
          Connect Wallet
        </button>
        <div style={{ marginTop: "18px", fontSize: "11px", color: "#6a6a7c", letterSpacing: ".5px", display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#00ff9d" }}>
            ◎
          </span>
          Powered by TxODDS · Solana devnet
        </div>
      </div>
    </>
  );
}
