import React from "react";

// Converted from the design template (<sc-if value="{{ showCountry }}">).
// `v` is the vals object computed in App.render().
export default function Country({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "38", background: "#0a0a0f", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 18px 6px" }}>
          <button onClick={v.backToAlbum} style={{ width: "36px", height: "36px", borderRadius: "11px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#f4f4f8", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
            ←
          </button>
          <span style={{ fontSize: "26px", lineHeight: "1" }}>
            {v.countryFlag}
          </span>
          <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "20px", letterSpacing: ".5px", color: "#f4f4f8" }}>
            {v.countryName}
          </div>
        </div>
        <div style={{ padding: "2px 18px 10px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11px", color: "#9a9ab0", marginBottom: "6px" }}>
            <span style={{ letterSpacing: ".5px" }}>
              PLAYERS COLLECTED
            </span>
            <span style={{ fontFamily: "'Space Mono',monospace", fontWeight: "700", color: "#fff" }}>
              {v.cOwned}{" / 26"}
            </span>
          </div>
          <div style={{ height: "7px", borderRadius: "5px", background: "rgba(255,255,255,.07)", overflow: "hidden" }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg,#26a0ff,#b026ff)", width: v.cPctW }} />
          </div>
        </div>
        <div style={{ flex: "1", overflowY: "auto", padding: "6px 18px 22px" }}>
          {v.cComplete ? (
            <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", background: "linear-gradient(120deg,rgba(255,207,77,.16),rgba(255,138,61,.12))", border: "1px solid rgba(255,207,77,.4)", borderRadius: "15px", padding: "14px 16px", marginBottom: "14px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffcf4d" }}>
                  ★ Set complete!
                </div>
                <div style={{ fontSize: "11px", color: "#a59a78", marginTop: "2px" }}>
                  All 26 collected · claim your reward
                </div>
              </div>
              <button style={{ flexShrink: "0", background: "#ffcf4d", border: "none", borderRadius: "10px", color: "#1a1406", fontSize: "12px", fontWeight: "700", letterSpacing: ".3px", padding: "9px 13px", cursor: "pointer" }}>
                CLAIM
              </button>
            </div>
            <div style={{ borderRadius: "14px", border: "2px solid #ffcf4d", background: "linear-gradient(160deg,#231d0e,#100e0a)", boxShadow: "0 0 28px rgba(255,207,77,.35)", overflow: "hidden", display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", marginBottom: "18px" }}>
              <span style={{ fontSize: "38px", lineHeight: "1" }}>
                {v.countryFlag}
              </span>
              <div style={{ flex: "1" }}>
                <div style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "1.5px", color: "#ffcf4d", marginBottom: "3px" }}>
                  EXCLUSIVE REWARD
                </div>
                <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "19px", color: "#fff", letterSpacing: ".4px", lineHeight: "1" }}>
                  {v.championName}
                </div>
              </div>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "1px", color: "#1a1406", background: "#ffcf4d", borderRadius: "6px", padding: "3px 8px" }}>
                LEGENDARY
              </span>
            </div>
            </>
          ) : null}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "9px" }}>
            {(v.countryCards || []).map((p, p__i) => (
              <React.Fragment key={p?.id ?? p__i}>
                {p.owned ? (
                  <>
                  <div style={{ borderRadius: "12px", border: `1.5px solid ${p.rarityColor}`, background: "linear-gradient(160deg,#1c1c28,#101019)", boxShadow: `0 0 14px ${p.glow}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: "62px", position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", background: "repeating-linear-gradient(45deg,#20202c,#20202c 6px,#1a1a24 6px,#1a1a24 12px)" }}>
                      <span style={{ position: "absolute", top: "6px", left: "7px", fontFamily: "'Space Mono',monospace", fontSize: "9px", fontWeight: "700", color: "rgba(255,255,255,.45)" }}>
                        {p.numLabel}
                      </span>
                      <span style={{ position: "absolute", top: "6px", right: "7px", width: "9px", height: "9px", borderRadius: "50%", background: p.rarityColor, boxShadow: `0 0 8px ${p.rarityColor}` }} />
                      <svg viewBox="0 0 40 44" width="42%" style={{ display: "block", opacity: ".55" }}>
                        <circle cx="20" cy="13" r="7" fill={p.rarityColor} />
                        <path d="M6 44c0-9 6-15 14-15s14 6 14 15z" fill={p.rarityColor} />
                      </svg>
                    </div>
                    <div style={{ padding: "7px 8px 8px" }}>
                      <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "13px", color: "#fff", letterSpacing: ".2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {p.name}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "3px" }}>
                        <span style={{ fontSize: "8px", fontWeight: "700", letterSpacing: ".5px", color: p.rarityColor }}>
                          {p.pos}
                        </span>
                        <span style={{ fontSize: "8px", color: "#6a6a7c", fontFamily: "'Space Mono',monospace" }}>
                          {p.numLabel}
                        </span>
                      </div>
                      <div style={{ fontSize: "8px", fontWeight: "700", letterSpacing: ".8px", color: p.rarityColor, marginTop: "4px" }}>
                        {p.rarityLabel}
                      </div>
                    </div>
                  </div>
                  </>
                ) : null}
                {p.locked ? (
                  <>
                  <div style={{ borderRadius: "12px", border: "1px dashed rgba(255,255,255,.1)", background: "#0e0e16", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", minHeight: "128px" }}>
                    <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                      <rect x="5" y="9.5" width="12" height="9" rx="2" stroke="#3a3a48" strokeWidth="1.6" />
                      <path d="M7.5 9.5V7a3.5 3.5 0 0 1 7 0v2.5" stroke="#3a3a48" strokeWidth="1.6" />
                    </svg>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#3a3a48" }}>
                      {p.numLabel}
                    </span>
                  </div>
                  </>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
