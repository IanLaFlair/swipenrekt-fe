/* Swipe N Rekt — service worker (app-shell cache + runtime caching).
 *
 * The app is a Vite build now: JS/CSS ship as content-hashed files under
 * /assets/, so they can't be precached by name. The runtime cache below picks
 * them up instead — safe precisely because the hash changes with the content.
 * unpkg is gone from RUNTIME_HOSTS: React is bundled, not fetched at runtime.
 */
const VERSION = "snr-v5";
const SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icons/icon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
];
const RUNTIME_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Never intercept the API — it must always hit the network. Covers both the
  // direct host and the same-origin /api proxy path (Vite dev / Vercel rewrite).
  if (url.hostname.endsWith("fachry.dev") || url.pathname.startsWith("/api/")) return;

  // App navigation: network-first, fall back to the cached shell (offline).
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match("/index.html")));
    return;
  }

  const sameOrigin = url.origin === self.location.origin;
  const cacheableCdn = RUNTIME_HOSTS.some((h) => url.hostname.endsWith(h));

  if (sameOrigin || cacheableCdn) {
    // Cache-first with background refresh.
    e.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            if (res && (res.ok || res.type === "opaque")) {
              const copy = res.clone();
              caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
            }
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
  }
});
