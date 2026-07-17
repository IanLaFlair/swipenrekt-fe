import React from "react";

// Converted from the design template (<sc-if value="{{ showHistory }}">).
// `v` is the vals object computed in App.render().
export default function History({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "42", background: "#0a0a0f", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 18px 12px" }}>
          <button onClick={v.goProfile} style={{ width: "36px", height: "36px", borderRadius: "11px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#f4f4f8", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ←
          </button>
          <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "20px", letterSpacing: ".5px", color: "#f4f4f8" }}>
            HISTORY
          </div>
        </div>
        <div style={{ flex: "1", overflowY: "auto", padding: "2px 18px 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {(v.historyView || []).map((p, p__i) => (
            <React.Fragment key={p?.id ?? p__i}>
              <div onClick={p.onOpen} style={{ background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "14px", padding: "13px 14px", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: "#9a9ab0", fontFamily: "'Space Mono',monospace" }}>
                    {p.mLabel}
                  </span>
                  <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: p.statusColor, background: p.statusBg, borderRadius: "7px", padding: "3px 8px" }}>
                    {p.statusLabel}
                  </span>
                </div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#f4f4f8", marginBottom: "9px" }}>
                  {p.q}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "10px", fontWeight: "700", color: "#07070b", background: p.sideColor, borderRadius: "6px", padding: "2px 7px" }}>
                      {p.sideLabel}
                    </span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#9a9ab0" }}>
                      ${p.stake}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "14px", fontWeight: "700", color: p.payoutColor }}>
                    {p.payoutStr}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
