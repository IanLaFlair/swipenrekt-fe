import React from "react";

// Converted from the design template (<sc-if value="{{ showResult }}">).
// `v` is the vals object computed in App.render().
export default function Result({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "35", background: "#0a0a0f", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 18px 6px" }}>
          <button onClick={v.onResultBack} style={{ width: "36px", height: "36px", borderRadius: "11px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#f4f4f8", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ←
          </button>
          <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "20px", letterSpacing: ".5px", color: "#f4f4f8" }}>
            SETTLEMENT
          </div>
        </div>
        <div style={{ flex: "1", overflowY: "auto", padding: "6px 18px 24px" }}>
          <div style={{ textAlign: "center", borderRadius: "20px", padding: "26px 18px 22px", marginBottom: "14px", background: `radial-gradient(120% 100% at 50% 0%, ${v.selGlow}, rgba(255,255,255,.02))`, border: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", fontWeight: "700", color: "#9a9ab0", marginBottom: "6px" }}>
              {v.selOutcomeLabel}
            </div>
            <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "54px", lineHeight: "1", color: v.selPayoutColor }}>
              {v.selPayoutStr}
            </div>
            <div style={{ fontSize: "13px", color: "#cfcfe0", marginTop: "10px", textWrap: "balance" }}>
              {v.selQ}
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <div style={{ flex: "1", background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "13px", padding: "11px 13px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600", marginBottom: "4px" }}>
                PICK
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#07070b", background: v.selSideColor, borderRadius: "6px", padding: "2px 7px" }}>
                  {v.selSideLabel}
                </span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#cfcfe0" }}>
                  {v.selPriceCents}¢
                </span>
              </div>
            </div>
            <div style={{ flex: "1", background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "13px", padding: "11px 13px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600", marginBottom: "4px" }}>
                STAKE
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "14px", fontWeight: "700", color: "#fff" }}>
                {v.selStakeStr}
              </div>
            </div>
            <div style={{ flex: "1", background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "13px", padding: "11px 13px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600", marginBottom: "4px" }}>
                MATCH
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: "700", color: "#cfcfe0" }}>
                {v.selMatch}
              </div>
            </div>
          </div>
          <div style={{ background: "#101019", border: "1px solid rgba(0,255,157,.18)", borderRadius: "16px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                <path d="M11 2l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V5l7-3z" stroke="#00ff9d" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M8 11l2 2 4-4" stroke="#00ff9d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", color: "#00ff9d" }}>
                VERIFIABLE RESOLUTION
              </span>
            </div>
            <div style={{ background: "rgba(0,255,157,.05)", borderRadius: "10px", padding: "11px 13px", marginBottom: "14px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#f4f4f8", marginBottom: "3px" }}>
                {v.selStat}{" · "}{v.selStatMin}’
              </div>
              <div style={{ fontSize: "11px", color: "#7a7a8c" }}>
                Source: TxODDS scores stream (SSE)
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontFamily: "'Space Mono',monospace", fontSize: "11px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ color: "#6a6a7c" }}>
                  Merkle root
                </span>
                <span style={{ color: "#cfcfe0" }}>
                  {v.rcRoot}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ color: "#6a6a7c" }}>
                  Leaf hash
                </span>
                <span style={{ color: "#cfcfe0" }}>
                  {v.rcLeaf}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ color: "#6a6a7c" }}>
                  Proof · node 0
                </span>
                <span style={{ color: "#cfcfe0" }}>
                  {v.rcN1}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ color: "#6a6a7c" }}>
                  Proof · node 1
                </span>
                <span style={{ color: "#cfcfe0" }}>
                  {v.rcN2}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ color: "#6a6a7c" }}>
                  Settlement tx
                </span>
                <span style={{ color: "#00ff9d" }}>
                  {v.rcSig}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ color: "#6a6a7c" }}>
                  Slot
                </span>
                <span style={{ color: "#cfcfe0" }}>
                  {v.rcSlot}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginTop: "14px", background: "rgba(0,255,157,.1)", border: "1px solid rgba(0,255,157,.25)", borderRadius: "10px", padding: "9px 12px" }}>
              <span style={{ color: "#00ff9d", fontSize: "13px" }}>
                ✓
              </span>
              <span style={{ fontSize: "11.5px", fontWeight: "600", color: "#e6f9f0" }}>
                {"Settled on-chain via "}
                <span style={{ fontFamily: "'Space Mono',monospace" }}>
                  validate_stat
                </span>
                {" CPI"}
              </span>
            </div>
            {v.selExplorerUrl ? (
              <a href={v.selExplorerUrl} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", marginTop: "12px", width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,.14)", borderRadius: "10px", color: "#cfcfe0", fontSize: "12px", fontWeight: "600", padding: "10px 0", cursor: "pointer", textDecoration: "none" }}>
                View on Solana Explorer ↗
              </a>
            ) : null}
          </div>
          {v.selRare ? (
            <>
            <button onClick={v.onClaim} style={{ marginTop: "16px", width: "100%", background: "#ffcf4d", border: "none", borderRadius: "14px", color: "#1a1406", fontSize: "15px", fontWeight: "700", letterSpacing: ".3px", padding: "15px 0", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,207,77,.3)" }}>
              ★ Claim your rare moment card →
            </button>
            </>
          ) : null}
          <button onClick={v.goArena} style={{ marginTop: "10px", width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", color: "#cfcfe0", fontSize: "14px", fontWeight: "600", padding: "13px 0", cursor: "pointer" }}>
            Back to Arena
          </button>
        </div>
      </div>
    </>
  );
}
