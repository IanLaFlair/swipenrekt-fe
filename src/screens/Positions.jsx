import React from "react";

// Converted from the design template (<sc-if value="{{ showPositions }}">).
// `v` is the vals object computed in App.render().
export default function Positions({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "35", background: "#0a0a0f", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 18px 12px" }}>
          <button onClick={v.goArena} style={{ width: "36px", height: "36px", borderRadius: "11px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#f4f4f8", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ←
          </button>
          <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "20px", letterSpacing: ".5px", color: "#f4f4f8" }}>
            MY POSITIONS
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", padding: "0 18px 14px" }}>
          <div style={{ flex: "1", background: "rgba(0,255,157,.07)", border: "1px solid rgba(0,255,157,.2)", borderRadius: "13px", padding: "11px 14px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "1px", color: "#7a7a8c", fontWeight: "600" }}>
              ACTIVE
            </div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "18px", fontWeight: "700", color: "#00ff9d" }}>
              {v.activeCount}
            </div>
          </div>
          <div style={{ flex: "1", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "13px", padding: "11px 14px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "1px", color: "#7a7a8c", fontWeight: "600" }}>
              AT STAKE
            </div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "18px", fontWeight: "700", color: "#fff" }}>
              {v.atStakeStr}
            </div>
          </div>
        </div>
        <div style={{ flex: "1", overflowY: "auto", padding: "2px 18px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {(v.positionsView || []).length === 0 ? (
            <div style={{ margin: "auto 0", textAlign: "center", color: "#7a7a8c", fontFamily: "'Space Mono',monospace", fontSize: "13px", padding: "40px 20px" }}>
              No open positions.<br />Swipe in the arena to place a bet.
            </div>
          ) : null}
          {(v.positionsView || []).map((p, p__i) => (
            <React.Fragment key={p?.id ?? p__i}>
              <div style={{ background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "16px", padding: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "9px" }}>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: "#9a9ab0", fontFamily: "'Space Mono',monospace" }}>
                    {p.mLabel}
                  </span>
                  <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: p.statusColor, background: p.statusBg, borderRadius: "7px", padding: "3px 8px" }}>
                    {p.statusLabel}
                  </span>
                </div>
                <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "17px", color: "#f4f4f8", letterSpacing: ".3px", lineHeight: "1.05", marginBottom: "11px" }}>
                  {p.q}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".5px", color: "#07070b", background: p.sideColor, borderRadius: "6px", padding: "3px 8px" }}>
                      {p.sideLabel}
                    </span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", color: "#cfcfe0" }}>
                      {"◎" + p.stake}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "15px", fontWeight: "700", color: p.payoutColor }}>
                    {p.payoutStr}
                  </span>
                </div>
                {p.isPending ? (
                  <>
                  <div style={{ marginTop: "13px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Space Mono',monospace", fontSize: "12px", color: p.canSettle ? "#00ff9d" : "#ffcf4d" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.canSettle ? "#00ff9d" : "#ffcf4d", animation: "snrPulse 1.4s infinite" }} />
                      {p.canSettle ? "Window closed · ready" : ("Settles in " + p.cdStr)}
                    </div>
                    {p.canSettle ? (
                      <button onClick={p.onSettle} style={{ background: "rgba(0,255,157,.12)", border: "1px solid rgba(0,255,157,.4)", borderRadius: "9px", color: "#00ff9d", fontSize: "11px", fontWeight: "700", letterSpacing: ".5px", padding: "7px 12px", cursor: "pointer" }}>
                        SETTLE + CLAIM
                      </button>
                    ) : null}
                  </div>
                  </>
                ) : null}
                {p.isSettled ? (
                  <>
                  <button onClick={p.onOpen} style={{ marginTop: "13px", width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "10px", color: "#cfcfe0", fontSize: "12px", fontWeight: "600", padding: "9px 0", cursor: "pointer" }}>
                    View verifiable receipt →
                  </button>
                  </>
                ) : null}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
