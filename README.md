# Swipe N Rekt — PWA

Mobile-first, installable PWA for **Swipe N Rekt**: a moment-by-moment football prediction market you play by swiping cards Tinder-style. Prices come from TxODDS odds, positions settle on-chain via Merkle proof on Solana, with a game layer (streaks + rare NFT moment cards).

splash → connect wallet → pick match → **swipe arena** → confirm position → pending → **result + verifiable receipt** → rare card drop → album / pack opening / leaderboard / profile / history.

## Stack

- **React 18 + Vite** (no TypeScript). `src/App.jsx` holds the app state and handlers; each screen is a component in `src/screens/` that receives the computed `v` (vals) object.
- **`src/api.js`** — backend client for `https://swipe-api.fachry.dev` (installs `window.SNR`): JWT auth, all endpoints, and mappers from API payloads to render shapes (decimal odds → demargined implied probability).
- **Wallets** — real Phantom / Solflare / Backpack via injected providers (connect + `signMessage`), with a Devnet Guest fallback. Identity only; there is no on-chain escrow yet (see the `swipenrekt-blockchain` repo).
- **PWA** — `public/manifest.webmanifest`, service worker (`public/sw.js`, app-shell + font caching), maskable + Apple touch icons.

> ⚠️ **The backend CORS allowlist only admits `http://localhost:3000`.** That's why dev/preview are pinned to port 3000, and why the deployed origin must be added to the allowlist before production can load any data.

## Local dev

```bash
npm install
npm run dev       # http://localhost:3000  (port matters — CORS)
npm run build     # -> dist/
npm run preview
```

## Deploy

```bash
vercel          # preview
vercel --prod   # production
```

## Project source

- Design: https://claude.ai/design/p/3172eddc-25e5-4b07-804b-da7c923de587
- MVP scope: see `Swipe_n_Rekt_MVP_Scope.md`

## Layout

| Path | Purpose |
|---|---|
| `index.html` | Vite entry — PWA meta, fonts, global CSS + keyframes (from the design's `<helmet>`) |
| `src/main.jsx` | Mounts `<App />`, registers the service worker |
| `src/App.jsx` | State, handlers, API loaders, `renderVals()` → the arena shell |
| `src/screens/` | One component per screen (Splash, Connect, Matches, Album, Country, Leaderboard, Profile, Positions, Result, History, Pack) |
| `src/api.js` | Backend API client (`window.SNR`) |
| `public/` | Served verbatim: icons, manifest, service worker |
| `scripts/` | One-shot converters used to port the design template → JSX (see below) |
| `legacy/` | The pre-React design export, kept for reference/diffing. Not built or deployed — safe to delete once production is verified. |

## How the port was done

The UI was originally a Claude Design export: one `<x-dc>` template plus a `DCLogic`
class, rendered by `support.js` (React 18 + Babel pulled from unpkg at runtime).

`scripts/convert.mjs` mechanically converts that template to JSX — `{{ expr }}` →
`{v.expr}`, `<sc-if>` → `&&`, `<sc-for>` → `.map()`, and every inline `style` string
parsed into a JSX style object. `scripts/build-app.mjs` then assembles `App.jsx` from
the legacy logic class (copied verbatim: `DCLogic.setState` had identical semantics to
`React.Component`) plus the converted shell.

The scripts are kept for provenance. `src/` is now the source of truth — edit it directly.
