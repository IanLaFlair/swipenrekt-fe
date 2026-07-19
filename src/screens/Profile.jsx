import React from "react";

// Converted from the design template (<sc-if value="{{ showProfile }}">).
// `v` is the vals object computed in App.render().
export default function Profile({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "35", background: "#0a0a0f", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "1", overflowY: "auto", padding: "8px 18px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "18px", background: "linear-gradient(135deg,#00ff9d,#ff3d6e)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Anton',sans-serif", fontSize: "26px", color: "#07070b", flexShrink: "0" }}>
              D
            </div>
            <div style={{ minWidth: "0" }}>
              <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "21px", color: "#f4f4f8", letterSpacing: ".4px" }}>
                {v.profName}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", marginTop: "3px" }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#9a9ab0" }}>
                  {v.walletAddr}
                </span>
                <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".5px", color: "#00ff9d", background: "rgba(0,255,157,.1)", borderRadius: "5px", padding: "2px 6px" }}>
                  DEVNET
                </span>
              </div>
            </div>
            <button onClick={v.onLogout} className="snr-press" style={{ marginLeft: "auto", flexShrink: 0, border: "1px solid rgba(255,61,110,.4)", background: "rgba(255,61,110,.1)", color: "#ff6b8a", borderRadius: "10px", padding: "8px 13px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
              Disconnect
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
            <div style={{ background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "14px", padding: "13px 15px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600", marginBottom: "4px" }}>
                WIN RATE
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: "700", color: "#00ff9d" }}>
                {v.profWinRate}
              </div>
            </div>
            <div style={{ background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "14px", padding: "13px 15px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600", marginBottom: "4px" }}>
                BEST STREAK
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: "700", color: "#fff" }}>
                {v.profBestStreak}
              </div>
            </div>
            <div style={{ background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "14px", padding: "13px 15px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600", marginBottom: "4px" }}>
                PREDICTIONS
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: "700", color: "#fff" }}>
                {v.profPredictions}
              </div>
            </div>
            <div style={{ background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "14px", padding: "13px 15px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600", marginBottom: "4px" }}>
                NET P&amp;L
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: "700", color: v.profPnlColor }}>
                {v.profPnl}
              </div>
            </div>
          </div>
          <div style={{ background: "#14141d", border: "1px solid rgba(255,255,255,.07)", borderRadius: "14px", padding: "14px 15px", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "9px" }}>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#f4f4f8" }}>
                Album collection
              </span>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: "700", color: "#ffcf4d" }}>
                {v.albumOwned}{" / "}{v.albumTotal}
              </span>
            </div>
            <div style={{ height: "7px", borderRadius: "5px", background: "rgba(255,255,255,.07)", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg,#00ff9d,#ffcf4d)", width: v.albumPctW }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,207,77,.07)", border: "1px solid rgba(255,207,77,.25)", borderRadius: "14px", padding: "13px 15px", marginBottom: "12px" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#f4f4f8" }}>
                {v.profStreakLine}
              </div>
              <div style={{ fontSize: "11px", color: "#a59a78", marginTop: "2px" }}>
                Streak insurance active · 1 miss forgiven
              </div>
            </div>
            <span style={{ fontFamily: "'Anton',sans-serif", fontSize: "26px", color: "#ffcf4d" }}>
              7
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "9px", marginTop: "2px" }}>
            <span style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#6a6a7c", fontWeight: "600" }}>
              YOUR PACKS
            </span>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: "700", color: "#cfcfe0" }}>
              {v.packTotal}{" unopened"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "9px", overflowX: "auto", padding: "4px 2px", marginBottom: "14px" }}>
            {(v.packsView || []).map((p, p__i) => (
              <React.Fragment key={p?.id ?? p__i}>
                <div onClick={p.onOpen} style={{ flexShrink: "0", width: "96px", cursor: "pointer", position: "relative", borderRadius: "15px", border: `1px solid ${p.border}`, background: p.bg, padding: "13px 8px 11px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", overflow: "hidden" }}>
                  <span style={{ position: "absolute", top: "7px", right: "7px", minWidth: "21px", height: "21px", borderRadius: "11px", background: p.color, color: "#07070b", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>
                    ×{p.count}
                  </span>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", border: `1.5px solid ${p.color}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.03)", boxShadow: `0 0 16px ${p.glow}` }}>
                    <span style={{ fontSize: "19px", color: p.color }}>
                      ★
                    </span>
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".5px", color: "#f4f4f8", textAlign: "center", lineHeight: "1.1" }}>
                    {p.label}
                  </div>
                  <div style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".5px", color: p.color }}>
                    OPEN →
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <button onClick={v.openHistory} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", color: "#cfcfe0", fontSize: "14px", fontWeight: "600", padding: "14px 0", cursor: "pointer" }}>
            View full history →
          </button>
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
          <div onClick={v.goProfile} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#00ff9d" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
              <path d="M4.5 18.5a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".3px" }}>
              Profile
            </span>
          </div>
          <div style={{ position: "absolute", bottom: "7px", left: "50%", transform: "translateX(-50%)", width: "128px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,.22)" }} />
        </div>
      </div>
    </>
  );
}
