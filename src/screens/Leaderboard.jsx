import React from "react";

// Converted from the design template (<sc-if value="{{ showLeaderboard }}">).
// `v` is the vals object computed in App.render().
export default function Leaderboard({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "35", background: "#0a0a0f", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "8px 18px 8px" }}>
          <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "20px", letterSpacing: ".5px", color: "#f4f4f8" }}>
            LEADERBOARD
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", padding: "0 18px 12px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".5px", color: "#07070b", background: "#00ff9d", borderRadius: "9px", padding: "7px 13px" }}>
            Global
          </span>
          <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: ".5px", color: "#9a9ab0", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "9px", padding: "7px 13px" }}>
            Friends
          </span>
          <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: ".5px", color: "#9a9ab0", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "9px", padding: "7px 13px" }}>
            This match
          </span>
        </div>
        <div style={{ flex: "1", overflowY: "auto", padding: "2px 18px 18px", display: "flex", flexDirection: "column", gap: "9px" }}>
          {(v.leadersView || []).map((l, l__i) => (
            <React.Fragment key={l?.id ?? l__i}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: l.rowBg, border: l.rowBorder, borderRadius: "14px", padding: "11px 14px" }}>
                <span style={{ width: "22px", textAlign: "center", fontFamily: "'Space Mono',monospace", fontSize: "15px", fontWeight: "700", color: l.rankColor, flexShrink: "0" }}>
                  {l.rank}
                </span>
                <span style={{ width: "34px", height: "34px", borderRadius: "11px", background: "rgba(255,255,255,.07)", color: "#cfcfe0", fontWeight: "700", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                  {l.initial}
                </span>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: l.nameColor }}>
                      {l.name}
                    </span>
                    {l.bot ? (
                      <>
                      <span style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "1px", color: "#ffcf4d", background: "rgba(255,207,77,.12)", border: "1px solid rgba(255,207,77,.3)", borderRadius: "5px", padding: "1px 5px" }}>
                        BOT
                      </span>
                      </>
                    ) : null}
                  </div>
                  <div style={{ fontSize: "11px", color: "#7a7a8c", fontFamily: "'Space Mono',monospace", marginTop: "2px" }}>
                    {"🔥 "}{l.streak}{" · "}{l.wr}% WR
                  </div>
                </div>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "14px", fontWeight: "700", color: "#00ff9d", flexShrink: "0" }}>
                  {l.pnl}
                </span>
              </div>
            </React.Fragment>
          ))}
          <div style={{ fontSize: "10px", color: "#5a5a6a", textAlign: "center", padding: "8px 16px", lineHeight: "1.5" }}>
            Market-maker bots seed liquidity on both sides at TxODDS prices. They’re tagged transparently and recede as organic volume grows.
          </div>
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
          <div onClick={v.goAlbum} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#55555f" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="4" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
              <rect x="12" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
              <rect x="4" y="12" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
              <rect x="12" y="12" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".3px" }}>
              Album
            </span>
          </div>
          <div onClick={v.goLeaderboard} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#00ff9d" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="3" y="12" width="4" height="6" rx="1" fill="currentColor" />
              <rect x="9" y="8" width="4" height="10" rx="1" fill="currentColor" />
              <rect x="15" y="4" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
            <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".3px" }}>
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
