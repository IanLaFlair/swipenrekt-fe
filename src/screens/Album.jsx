import React from "react";

// Converted from the design template (<sc-if value="{{ showAlbum }}">).
// `v` is the vals object computed in App.render().
export default function Album({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "35", background: "#0a0a0f", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "8px 18px 10px" }}>
          <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "20px", letterSpacing: ".5px", color: "#f4f4f8", marginBottom: "10px" }}>
            ALBUM
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11px", color: "#9a9ab0", marginBottom: "6px" }}>
            <span style={{ letterSpacing: ".5px" }}>
              SETS COMPLETED
            </span>
            <span style={{ fontFamily: "'Space Mono',monospace", fontWeight: "700", color: "#fff" }}>
              {v.setsDone}{" / "}{v.setsTotal}
            </span>
          </div>
          <div style={{ height: "7px", borderRadius: "5px", background: "rgba(255,255,255,.07)", overflow: "hidden" }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg,#00ff9d,#ffcf4d)", width: v.setsPctW }} />
          </div>
        </div>
        <div style={{ flex: "1", overflowY: "auto", padding: "6px 18px 18px", display: "flex", flexDirection: "column", gap: "9px" }}>
          {(v.albumSets || []).map((c, c__i) => (
            <React.Fragment key={c?.id ?? c__i}>
              <div onClick={c.onOpen} style={{ display: "flex", alignItems: "center", gap: "13px", background: c.rowBg, border: c.rowBorder, borderRadius: "15px", padding: "13px 15px", cursor: "pointer" }}>
                <span style={{ fontSize: "30px", flexShrink: "0", lineHeight: "1" }}>
                  {c.flag}
                </span>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: "#f4f4f8" }}>
                      {c.name}
                    </span>
                    {c.complete ? (
                      <>
                      <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "1px", color: "#07070b", background: "#00ff9d", borderRadius: "5px", padding: "2px 6px" }}>
                        COMPLETE
                      </span>
                      </>
                    ) : null}
                  </div>
                  <div style={{ height: "6px", borderRadius: "4px", background: "rgba(255,255,255,.07)", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: c.barColor, width: c.pctW }} />
                  </div>
                </div>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", fontWeight: "700", color: c.countColor, flexShrink: "0" }}>
                  {c.owned}/26
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid rgba(255,255,255,.07)", background: "rgba(10,10,16,.95)", backdropFilter: "blur(12px)", padding: "9px 0 18px", flexShrink: "0", position: "relative" }}>
          <div onClick={v.goArena} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#55555f" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="3" y="6" width="11" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" opacity=".45" />
              <rect x="8" y="3" width="11" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
            </svg>
            <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".3px" }}>
              Arena
            </span>
          </div>
          <div onClick={v.goAlbum} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#00ff9d" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="4" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
              <rect x="12" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
              <rect x="4" y="12" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
              <rect x="12" y="12" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".3px" }}>
              Album
            </span>
          </div>
          <div onClick={v.goLeaderboard} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#55555f" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="3" y="12" width="4" height="6" rx="1" fill="currentColor" />
              <rect x="9" y="8" width="4" height="10" rx="1" fill="currentColor" />
              <rect x="15" y="4" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
            <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".3px" }}>
              Ranking
            </span>
          </div>
          <div onClick={v.goProfile} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#55555f" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
              <path d="M4.5 18.5a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".3px" }}>
              Profile
            </span>
          </div>
          <div style={{ position: "absolute", bottom: "7px", left: "50%", transform: "translateX(-50%)", width: "128px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,.22)" }} />
        </div>
      </div>
    </>
  );
}
