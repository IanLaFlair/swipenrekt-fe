# Swipe N Rekt — PWA

Mobile-first, installable PWA for **Swipe N Rekt**: a moment-by-moment football prediction market you play by swiping cards Tinder-style. Prices come from TxODDS odds, positions settle on-chain via Merkle proof on Solana, with a game layer (streaks + rare NFT moment cards).

This repo is the **frontend MVP / design implementation** (TxODDS + Solana backend wiring is the next phase per the MVP scope). The full interactive flow runs on seeded mock data:

splash → connect wallet → pick match → **swipe arena** → confirm position → pending → **result + verifiable receipt** → rare card drop → album / pack opening / leaderboard / profile / history.

## Stack

- The UI is the imported Claude Design (`Swipe Arena.dc.html`) rendered verbatim by the Design runtime (`support.js`), which loads React 18 UMD and mounts the reactive component — pixel-faithful to the design.
- PWA layer: `manifest.webmanifest`, service worker (`sw.js`, app-shell + CDN caching for offline), maskable + Apple touch icons.
- Static site — no build step. Deploys to Vercel as-is.

## Local preview

```bash
npx serve .       # or: python3 -m http.server 8080
```

Open the served URL on a phone (or Chrome devtools device mode, 390px) and "Add to Home Screen" to install.

## Deploy

```bash
vercel          # preview
vercel --prod   # production
```

## Project source

- Design: https://claude.ai/design/p/3172eddc-25e5-4b07-804b-da7c923de587
- MVP scope: see `Swipe_n_Rekt_MVP_Scope.md`

## Files

| File | Purpose |
|---|---|
| `index.html` | The Swipe Arena design + PWA meta + SW registration |
| `support.js` | Design runtime (parses + renders the reactive component) |
| `manifest.webmanifest` | PWA manifest |
| `sw.js` | Service worker (offline app shell) |
| `icons/` | App icons (SVG + PNG, incl. maskable & Apple touch) |
| `vercel.json` | Static hosting + headers config |
