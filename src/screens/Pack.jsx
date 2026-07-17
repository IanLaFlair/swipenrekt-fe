import React from "react";

// Converted from the design template (<sc-if value="{{ showPack }}">).
// `v` is the vals object computed in App.render().
export default function Pack({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "46", background: "radial-gradient(130% 80% at 50% 18%, #15161f 0%, #07070b 60%)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "150px", left: "50%", width: "340px", height: "340px", marginLeft: "-170px", borderRadius: "50%", pointerEvents: "none", zIndex: "0", background: `radial-gradient(circle, ${v.pkGlowColor}, transparent 68%)`, opacity: v.pkGlowOpacity, animation: "pulseGlow 3.4s ease-in-out infinite" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 18px 4px", position: "relative", zIndex: "2" }}>
          <button onClick={v.packBack} style={{ width: "36px", height: "36px", borderRadius: "11px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#f4f4f8", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
            ←
          </button>
          <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "20px", letterSpacing: ".5px", color: "#f4f4f8" }}>
            PACK OPENING
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "8px 18px 6px", flexShrink: "0", position: "relative", zIndex: "2" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,107,26,.12)", border: "1px solid rgba(255,107,26,.35)", borderRadius: "20px", padding: "6px 12px" }}>
            <span style={{ fontSize: "14px" }}>
              🔥
            </span>
            <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".5px", color: "#ff8a3d" }}>
              {v.pkStreak}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "20px", padding: "6px 12px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: v.pkColor, boxShadow: `0 0 8px ${v.pkColor}` }} />
            <span style={{ fontSize: "11px", fontWeight: "600", color: "#cfcfe0" }}>
              {v.pkGuarantee}
            </span>
          </div>
        </div>
        <div style={{ flex: "1", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "0", padding: "8px 16px", zIndex: "2" }}>
          {v.pkShowBurst ? (
            <>
            <div style={{ position: "absolute", width: "240px", height: "240px", borderRadius: "50%", border: `3px solid ${v.pkColor}`, animation: "burstRing .9s ease-out forwards", pointerEvents: "none" }} />
            <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", border: `2px solid ${v.pkColor}`, animation: "burstRing 1.1s ease-out .12s forwards", pointerEvents: "none" }} />
            </>
          ) : null}
          <div style={{ position: "absolute", inset: "0", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", alignContent: "center", gap: "10px", padding: "0 14px", opacity: v.pkCardsOpacity, transition: "opacity .4s ease", pointerEvents: "none" }}>
            {(v.packCards || []).map((c, c__i) => (
              <React.Fragment key={c?.id ?? c__i}>
                <div style={{ position: "relative", width: c.w, height: c.h, perspective: "1000px", transition: "transform .45s cubic-bezier(.3,1.4,.4,1),opacity .4s ease", transform: c.emph, opacity: c.shown }}>
                  <div style={{ position: "absolute", inset: "0", transformStyle: "preserve-3d", transition: "transform .75s cubic-bezier(.4,0,.2,1)", transform: c.flip }}>
                    <div style={{ position: "absolute", inset: "0", borderRadius: "13px", overflow: "hidden", border: "2px solid rgba(255,255,255,.1)", background: "repeating-linear-gradient(45deg,#16161f,#16161f 8px,#1c1c28 8px,#1c1c28 16px)", display: "flex", alignItems: "center", justifyContent: "center", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                      <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "26px", color: "rgba(255,255,255,.16)", letterSpacing: "1px" }}>
                        SR
                      </div>
                      <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "3px", background: "linear-gradient(90deg,#00ff9d,#ff3d6e)" }} />
                    </div>
                    <div style={{ position: "absolute", inset: "0", borderRadius: "13px", overflow: "hidden", background: "linear-gradient(165deg,#22222f,#0f0f18)", border: `2px solid ${c.rarityColor}`, boxShadow: `0 0 22px ${c.glow}`, display: "flex", flexDirection: "column", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(0deg)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 9px 0" }}>
                        <div style={{ display: "flex", flexDirection: "column", lineHeight: "1" }}>
                          <span style={{ fontFamily: "'Anton',sans-serif", fontSize: "20px", color: "#fff" }}>
                            {c.ovr}
                          </span>
                          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "1px", color: c.rarityColor, marginTop: "1px" }}>
                            {c.pos}
                          </span>
                        </div>
                        <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: c.rarityColor, boxShadow: `0 0 8px ${c.rarityColor}` }} />
                      </div>
                      <div style={{ flex: "1", position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", background: "repeating-linear-gradient(45deg,#1a1a26,#1a1a26 6px,#15151f 6px,#15151f 12px)", margin: "6px 7px 0", borderRadius: "8px", overflow: "hidden" }}>
                        <span style={{ position: "absolute", top: "6px", left: "0", right: "0", textAlign: "center", fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "rgba(255,255,255,.14)" }}>
                          {c.numLabel}
                        </span>
                        <svg viewBox="0 0 40 44" width="58%" style={{ display: "block", opacity: ".5" }}>
                          <circle cx="20" cy="13" r="7" fill={c.rarityColor} />
                          <path d="M6 44c0-9 6-15 14-15s14 6 14 15z" fill={c.rarityColor} />
                        </svg>
                      </div>
                      <div style={{ textAlign: "center", padding: "6px 0 8px", fontSize: "9px", fontWeight: "700", letterSpacing: "1.5px", color: c.rarityColor }}>
                        {c.rarityLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div style={{ position: "relative", width: "236px", height: "312px", animation: v.pkWiggle, zIndex: "5", pointerEvents: v.pkCoverPE }}>
            <div onPointerDown={v.pkOnDown} onPointerMove={v.pkOnMove} onPointerUp={v.pkOnUp} onClick={v.pkOnOpen} style={{ position: "absolute", inset: "0", cursor: "pointer", borderRadius: "22px", background: "linear-gradient(160deg,#1d1d2a 0%,#101019 100%)", border: `1.5px solid ${v.pkColor}`, clipPath: "polygon(0% 0%,100% 0%,100% 60%,88% 66%,76% 59%,64% 67%,52% 59%,40% 67%,28% 59%,16% 66%,0% 60%)", transition: "transform .7s cubic-bezier(.5,0,.2,1),opacity .5s ease .18s", transform: v.pkTopCover, opacity: v.pkCoverOpacity, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "5px", background: v.pkColor }} />
              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(115deg,transparent 20%,rgba(255,255,255,.22) 50%,transparent 80%)", backgroundSize: "220% 100%", opacity: v.pkShimmerOpacity, animation: v.pkShimmerAnim, pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "54px", left: "0", right: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "74px", height: "74px", borderRadius: "50%", border: `2px solid ${v.pkColor}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.03)", boxShadow: `0 0 26px ${v.pkGlowColor}` }}>
                  <span style={{ fontSize: "34px", color: v.pkColor }}>
                    ★
                  </span>
                </div>
                <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "25px", letterSpacing: "1px", color: "#fff", textAlign: "center", lineHeight: ".95" }}>
                  {v.pkLabelA}
                  <br />
                  {v.pkLabelB}
                </div>
              </div>
            </div>
            <div onPointerDown={v.pkOnDown} onPointerMove={v.pkOnMove} onPointerUp={v.pkOnUp} onClick={v.pkOnOpen} style={{ position: "absolute", inset: "0", cursor: "pointer", borderRadius: "22px", background: "linear-gradient(160deg,#1d1d2a 0%,#101019 100%)", border: `1.5px solid ${v.pkColor}`, clipPath: "polygon(0% 60%,16% 66%,28% 59%,40% 67%,52% 59%,64% 67%,76% 59%,88% 66%,100% 60%,100% 100%,0% 100%)", transition: "transform .7s cubic-bezier(.5,0,.2,1),opacity .5s ease .18s", transform: v.pkBottomCover, opacity: v.pkCoverOpacity, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(115deg,transparent 20%,rgba(255,255,255,.22) 50%,transparent 80%)", backgroundSize: "220% 100%", opacity: v.pkShimmerOpacity, animation: v.pkShimmerAnim, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "30px", left: "0", right: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
                <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "22px" }}>
                  <div style={{ width: "2px", height: "14px", background: "rgba(255,255,255,.3)" }} />
                  <div style={{ width: "3px", height: "22px", background: "rgba(255,255,255,.3)" }} />
                  <div style={{ width: "2px", height: "10px", background: "rgba(255,255,255,.3)" }} />
                  <div style={{ width: "4px", height: "18px", background: "rgba(255,255,255,.3)" }} />
                  <div style={{ width: "2px", height: "22px", background: "rgba(255,255,255,.3)" }} />
                  <div style={{ width: "3px", height: "12px", background: "rgba(255,255,255,.3)" }} />
                  <div style={{ width: "2px", height: "20px", background: "rgba(255,255,255,.3)" }} />
                </div>
                <div style={{ fontSize: "14px", fontWeight: "700", letterSpacing: "1px", color: "#f4f4f8" }}>
                  TAP TO OPEN
                </div>
                <div style={{ fontSize: "10px", letterSpacing: ".5px", color: "#7a7a8c" }}>
                  or swipe to tear ✂
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "2px 18px 4px", flexShrink: "0", position: "relative", zIndex: "2", minHeight: "22px" }}>
          <span style={{ fontSize: "13px", fontWeight: "600", color: v.pkStatusColor, letterSpacing: ".3px" }}>
            {v.pkStatusText}
          </span>
        </div>
        <div style={{ padding: "8px 18px 26px", flexShrink: "0", position: "relative", zIndex: "2" }}>
          {v.pkShowDone ? (
            <>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              <button onClick={v.pkOnAdd} style={{ width: "100%", background: "#00ff9d", border: "none", borderRadius: "15px", color: "#07070b", fontSize: "15px", fontWeight: "700", letterSpacing: ".3px", padding: "15px 0", cursor: "pointer", boxShadow: "0 10px 26px rgba(0,255,157,.28)" }}>
                Add to collection
              </button>
              <button onClick={v.pkOnReset} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "15px", color: "#cfcfe0", fontSize: "14px", fontWeight: "600", padding: "13px 0", cursor: "pointer" }}>
                Open another pack
              </button>
            </div>
            </>
          ) : null}
        </div>
        <div style={{ position: "absolute", bottom: "108px", left: "50%", marginLeft: "-120px", width: "240px", textAlign: "center", background: "#1b1b2b", border: "1px solid rgba(0,255,157,.3)", borderRadius: "12px", padding: "11px 16px", fontSize: "13px", fontWeight: "600", color: "#e6f9f0", boxShadow: "0 12px 30px rgba(0,0,0,.55)", zIndex: "48", pointerEvents: "none", transition: "transform .25s ease,opacity .25s ease", transform: `translateY(${v.pkToastY}px)`, opacity: v.pkToastOpacity }}>
          {v.pkToastText}
        </div>
      </div>
    </>
  );
}
