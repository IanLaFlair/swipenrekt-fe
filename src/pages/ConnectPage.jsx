import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Connect } from "../screens";
import { WALLETS } from "../data/seed.js";
import { useAuthStore } from "../store/authStore.js";
import { useAppStore } from "../store/appStore.js";

export default function ConnectPage() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(null);
  const [connectError, setConnectError] = useState(null);
  const mounted = useRef(true);
  useEffect(() => () => { mounted.current = false; }, []);

  const connectWallet = (name) => {
    setConnecting(name);
    setConnectError(null);
    const afterLogin = () => {
      useAppStore.getState().loadProfile();
      useAppStore.getState().loadBets();
      useAppStore.getState().loadMatches();
    };

    // Devnet Guest (or no API) → generated guest identity. Keep a minimum
    // ~1.3s "connecting…" animation even though ensureLogin usually resolves
    // fast, but only navigate once auth is actually set — the /matches route
    // is guarded and needs isAuthenticated to be true first.
    if (name === "Devnet Guest" || !window.SNR) {
      const delay = new Promise((res) => setTimeout(res, 1300));
      const login = window.SNR
        ? window.SNR.ensureLogin()
            .then(() => {
              useAuthStore.getState().setAuth({
                token: window.SNR.getToken(),
                wallet: window.SNR.guestIdentity().wallet,
                walletName: "Devnet Guest"
              });
              afterLogin();
            })
            .catch(() => {})
        : Promise.resolve();
      Promise.all([delay, login]).then(() => {
        if (!mounted.current) return;
        setConnecting(null);
        navigate("/matches");
      });
      return;
    }

    // Real Solana wallet: connect + sign a message (Phantom popup), then log
    // in with the actual pubkey. Errors are surfaced on this screen.
    window.SNR.connectExternalWallet(name)
      .then(({ pubkey, nonce }) => window.SNR.loginWithWallet(pubkey, nonce).then(() => pubkey))
      .then((pubkey) => {
        useAuthStore.getState().setAuth({ token: window.SNR.getToken(), wallet: pubkey, walletName: name });
        afterLogin();
        if (!mounted.current) return;
        setConnecting(null);
        setConnectError(null);
        navigate("/matches");
      })
      .catch((err) => {
        if (!mounted.current) return;
        const code = err && err.code;
        const msg = code === "NO_PROVIDER" ? (name + " not detected — install the extension or use Devnet Guest")
          : (code === "CONNECT_REJECTED" || code === "SIG_REJECTED") ? ("Sign-in cancelled in " + name)
          : ((err && err.message) || "Connection failed");
        setConnecting(null);
        setConnectError(msg);
      });
  };

  const wallets = WALLETS.map((w) => {
    const guest = w.name === "Devnet Guest";
    const detected = guest ? true : (window.SNR ? window.SNR.walletAvailable(w.name) : false);
    const tag = guest ? "Free" : (detected ? "Detected" : "Install");
    return Object.assign({}, w, {
      isConnecting: connecting === w.name,
      showTag: !!tag && connecting !== w.name,
      tag,
      rowOpacity: (connecting && connecting !== w.name) ? 0.45 : 1,
      onClick: () => connectWallet(w.name)
    });
  });

  return (
    <Connect
      v={{
        goSplash: () => navigate("/"),
        wallets,
        connectFooter: connectError || "By connecting you agree this is a devnet demo.",
        connectFooterColor: connectError ? "#ff6b8a" : "#6a6a7c"
      }}
    />
  );
}
