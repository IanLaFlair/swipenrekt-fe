import React from "react";

// Converted from the design template (<sc-if value="{{ showConnect }}">).
// `v` is the vals object computed in App.render().
export default function Connect({ v }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "42", background: "#0a0a0f", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 18px 8px" }}>
          <button onClick={v.goSplash} style={{ width: "36px", height: "36px", borderRadius: "11px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#f4f4f8", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ←
          </button>
          <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "20px", letterSpacing: ".5px", color: "#f4f4f8" }}>
            CONNECT WALLET
          </div>
        </div>
        <div style={{ flex: "1", padding: "10px 20px 0", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "13px", color: "#9a9ab0", marginBottom: "18px", lineHeight: "1.45" }}>
            {"Pick a wallet to enter the arena. Demo runs on "}
            <span style={{ color: "#00ff9d" }}>
              Solana devnet
            </span>
            {" — test USDC from the faucet, no real funds."}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {(v.wallets || []).map((w, w__i) => (
              <React.Fragment key={w?.id ?? w__i}>
                <button onClick={w.onClick} style={{ display: "flex", alignItems: "center", gap: "13px", background: "#14141d", border: "1px solid rgba(255,255,255,.08)", borderRadius: "14px", padding: "14px 16px", cursor: "pointer", opacity: w.rowOpacity }}>
                  <span style={{ width: "38px", height: "38px", borderRadius: "11px", background: w.col, color: "#0a0a0f", fontWeight: "700", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                    {w.letter}
                  </span>
                  <span style={{ flex: "1", textAlign: "left", fontSize: "15px", fontWeight: "600", color: "#f4f4f8" }}>
                    {w.name}
                  </span>
                  {w.isConnecting ? (
                    <>
                    <span style={{ fontSize: "12px", color: "#00ff9d", fontWeight: "600" }}>
                      Connecting…
                    </span>
                    </>
                  ) : null}
                  {w.showTag ? (
                    <>
                    <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".5px", color: "#9a9ab0", background: "rgba(255,255,255,.06)", borderRadius: "6px", padding: "3px 8px" }}>
                      {w.tag}
                    </span>
                    </>
                  ) : null}
                </button>
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: "auto", fontSize: "11px", color: v.connectFooterColor, textAlign: "center", padding: "18px 0" }}>
            {v.connectFooter}
          </div>
        </div>
      </div>
    </>
  );
}
