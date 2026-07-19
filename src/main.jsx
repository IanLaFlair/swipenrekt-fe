import { Buffer } from "buffer";
// @solana/web3.js and our on-chain instruction encoding assume Node's Buffer.
if (typeof globalThis.Buffer === "undefined") globalThis.Buffer = Buffer;

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// PWA: same service worker as before, now serving the built assets.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((e) => console.warn("[snr] sw failed", e));
  });
}
