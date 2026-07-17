import React from "react";

// Converted from the design template (<sc-if value="{{ showMatches }}">).
// `v` is the vals object computed in App.render().
export default function Matches({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "42", background: "#0a0a0f", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 18px 12px" }}>
          <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "20px", letterSpacing: ".5px", color: "#f4f4f8" }}>
            PICK A MATCH
          </div>
          <button onClick={v.goArena} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#cfcfe0", fontSize: "12px", fontWeight: "600", padding: "7px 12px", cursor: "pointer" }}>
            Skip →
          </button>
        </div>
        <div style={{ flex: "1", overflowY: "auto", padding: "2px 18px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {(v.matchesView || []).map((m, m__i) => (
            <React.Fragment key={m?.id ?? m__i}>
              <div onClick={m.onSelect} style={{ background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "16px", padding: "14px 16px", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "11px" }}>
                  {m.live ? (
                    <>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: "#ff3d6e" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff3d6e", animation: "snrPulse 1.4s infinite" }} />
                      {"LIVE · "}{m.min}'
                    </span>
                    </>
                  ) : null}
                  {m.upcoming ? (
                    <>
                    <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: "#7a7a8c" }}>
                      UPCOMING
                    </span>
                    </>
                  ) : null}
                  <span style={{ fontSize: "11px", color: "#7a7a8c", fontFamily: "'Space Mono',monospace" }}>
                    {m.marketsLabel}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                  <span style={{ fontSize: "24px" }}>
                    {m.hf}
                  </span>
                  <span style={{ fontFamily: "'Anton',sans-serif", fontSize: "22px", color: "#f4f4f8" }}>
                    {m.home}
                  </span>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: "700", color: "#fff" }}>
                    {m.scoreOrTime}
                  </span>
                  <span style={{ fontFamily: "'Anton',sans-serif", fontSize: "22px", color: "#f4f4f8" }}>
                    {m.away}
                  </span>
                  <span style={{ fontSize: "24px" }}>
                    {m.af}
                  </span>
                </div>
                <div style={{ textAlign: "center", marginTop: "8px", fontSize: "11px", color: "#7a7a8c" }}>
                  {m.phaseLabel}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
