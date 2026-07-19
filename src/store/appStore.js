import { create } from "zustand";
import { CARDS, MATCHES, MATCHES_FULL, LEADERS, makeReceipt } from "../data/seed.js";
import { useAuthStore } from "./authStore.js";
import { placeBetOnChain, settleAndClaimOnChain, getPhantom } from "../chain.js";

// Shared app/domain state that used to live on the old App class component.
// Screen-only ephemeral UI state (drag/sheet gestures, pack-opening timers,
// connect-flow spinners) stays local to the page that owns it instead of
// living here — see the plan doc for the split rationale.

let toastTimer = null;
function showToast(set, text, ms) {
  set({ toast: text });
  clearTimeout(toastTimer);
  if (text) toastTimer = setTimeout(() => set({ toast: null }), ms);
}

let undoLockTimer = null;

export const useAppStore = create((set, get) => ({
  cards: CARDS,
  index: 0,
  timer: CARDS[0].windowSec,
  matches: MATCHES,
  matchesFull: MATCHES_FULL,
  positions: [], // real bets only: from GET /bets + on-chain bets placed this session
  history: [],   // real settled bets from GET /bets
  leaders: LEADERS,
  apiLive: false,
  toast: null,
  undo: null, // { prevIndex, side, stake }

  tick() {
    set(s => ({
      timer: s.timer > 0 ? s.timer - 1 : 0,
      positions: s.positions.map(p => (p.status === 'pending' && p.countdown > 0) ? { ...p, countdown: p.countdown - 1 } : p)
    }));
  },

  async bootstrapLive() {
    if (!window.SNR) return;
    try { await window.SNR.ensureLogin(); } catch (_) { /* stay on seeded data */ }
    await get().loadMatches();
    get().loadLeaderboard();
    get().loadProfile();
    get().loadBets();
  },

  async loadMatches() {
    if (!window.SNR) return;
    try {
      const r = await window.SNR.raw.matches('live', 1, 12);
      const list = (r && r.data) || [];
      if (!list.length) return;
      const mapped = list.map(window.SNR.map.match);
      const matchesFull = mapped.map(m => Object.assign({}, m, {
        markets: 0, phase: m.phase || (m.live ? 'Live' : 'Pre-match')
      }));
      set({ matches: mapped, matchesFull, apiLive: true });
      const first = mapped.find(m => m.live) || mapped[0];
      if (first) await get().loadPropositions(first.id, mapped);
    } catch (_) {}
  },

  async loadPropositions(matchId, matchesSource) {
    if (!window.SNR) return;
    try {
      const src = matchesSource || get().matches;
      const match = src.find(m => m.id === matchId);
      const r = await window.SNR.raw.propositions(matchId, 1, 20);
      const list = ((r && r.data) || []).filter(p => (p.status || 'open') === 'open');
      if (!list.length) return;
      const cards = list.map(p => window.SNR.map.proposition(p, match));
      set({ cards, index: 0, timer: cards[0].windowSec, apiLive: true });
    } catch (_) {}
  },

  async loadProfile() {
    if (!window.SNR || !window.SNR.getToken()) return;
    try {
      const r = await window.SNR.raw.userInfo();
      if (r && r.data) {
        useAuthStore.getState().setProfile(window.SNR.map.user(r.data));
      }
    } catch (_) {}
  },

  async loadLeaderboard() {
    if (!window.SNR) return;
    try {
      const r = await window.SNR.raw.leaderboard(1, 20);
      const list = (r && r.data) || [];
      if (!list.length) return;
      const me = window.SNR.guestIdentity().wallet;
      const leaders = list.map(l => {
        const row = window.SNR.map.leader(l);
        if (row.walletAddress && row.walletAddress === me) { row.you = true; row.name = 'YOU'; }
        return row;
      });
      set({ leaders });
    } catch (_) {}
  },

  async loadBets() {
    if (!window.SNR || !window.SNR.getToken()) return;
    try {
      const r = await window.SNR.raw.bets(1, 30);
      const list = (r && r.data) || [];
      if (!list.length) return;
      const byId = {};
      (get().matches || []).forEach(m => { byId[m.id] = m; });
      const mapped = list.map(b => {
        const v = window.SNR.map.bet(b);
        const p = v._proposition || {};
        const m = byId[p.matchId];
        v.mLabel = m ? (m.home + ' ' + m.hs + '–' + m.as + ' ' + m.away) : 'LIVE MATCH';
        v.receipt = makeReceipt();
        return v;
      });
      const positions = mapped.filter(p => p.status === 'pending');
      const history = mapped.filter(p => p.status !== 'pending');
      set(s => ({
        positions: positions.length ? positions : s.positions,
        history: history.length ? history : s.history
      }));
    } catch (_) {}
  },

  // ---- placing a bet ----
  placeBet(card, side, stake) {
    const price = side === 'yes' ? card.yes : (1 - card.yes);
    const newPos = {
      id: 'p' + Date.now(),
      mLabel: card.home + ' ' + card.hs + '–' + card.as + ' ' + card.away,
      q: card.q, side, stake, price,
      status: 'pending', countdown: 25,
      outcome: Math.random() < 0.62 ? 'won' : 'lost',
      rare: side === 'yes' && Math.random() < 0.5,
      stat: 'Stat confirmed via TxODDS scores stream', statMin: card.min + 3,
      player: 'WORLD CUP MOMENT', moment: card.q + ' · ' + card.home + ' vs ' + card.away,
      receipt: makeReceipt(),
      // market-identity fields so SETTLE NOW can resolve this bet on-chain later
      betProp: {
        id: card.id,
        onChainFixtureId: card.onChainFixtureId, onChainStatKey: card.onChainStatKey,
        onChainThreshold: card.onChainThreshold, onChainComparison: card.onChainComparison,
        onChainWindowStart: card.onChainWindowStart, onChainWindowEnd: card.onChainWindowEnd,
      }
    };
    // Bets go ON-CHAIN: the stake is the user's own devnet SOL, escrowed by the
    // deployed program via a Phantom-signed place_bet. No DB balance involved.
    // A real on-chain bet is final — no local undo.
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(card.id || '');
    const phantom = getPhantom();
    const goChain = isUuid && !!phantom;
    set(s => ({ positions: [newPos, ...s.positions] }));
    if (goChain) {
      // The stake is already in SOL (UI presets are 0.01–0.1 SOL).
      const stakeSol = Math.max(0.001, stake);
      placeBetOnChain({ proposition: card, propositionId: card.id, side, stakeSol, priceProb: card.yes })
        .then(({ signature }) => {
          set(s => ({ positions: s.positions.map(p => p.id === newPos.id ? { ...p, txSig: signature, onchain: true } : p) }));
          showToast(set, '✓  ' + stakeSol.toFixed(3) + ' SOL escrowed on-chain', 3400);
        })
        .catch((err) => {
          set(s => ({ positions: s.positions.filter(p => p.id !== newPos.id) }));
          const msg = err.code === 'NO_PHANTOM' ? 'Connect Phantom to bet'
            : err.code === 'LOW_BALANCE' ? 'Need devnet SOL — faucet.solana.com'
            : (err && err.message) || 'On-chain bet failed';
          showToast(set, '⚠  ' + msg, 3400);
        });
    } else if (isUuid && !phantom) {
      set(s => ({ positions: s.positions.filter(p => p.id !== newPos.id) }));
      showToast(set, '⚠  Connect Phantom (devnet) to place a bet', 3200);
    }
    return { willCallApi: goChain };
  },

  // Advances to the next card after the (page-local) exit animation finishes.
  // registerUndo/prevIndex/side/stake are only passed for a just-confirmed,
  // non-live bet, mirroring the old confirmPosition's setTimeout body.
  advanceCard({ registerUndo, prevIndex, side, stake } = {}) {
    set(s => {
      const ni = (s.index + 1) % s.cards.length;
      const patch = { index: ni, timer: s.cards[ni].windowSec };
      if (registerUndo) patch.undo = { prevIndex, side, stake };
      return patch;
    });
    clearTimeout(undoLockTimer);
    if (registerUndo) {
      undoLockTimer = setTimeout(() => {
        set(st => (st.undo && st.undo.prevIndex === prevIndex) ? { undo: null } : {});
      }, 4600);
    }
  },

  doUndo() {
    const u = get().undo;
    if (!u) return;
    clearTimeout(undoLockTimer);
    set(s => ({ index: u.prevIndex, timer: s.cards[u.prevIndex].windowSec, undo: null }));
  },

  skipToast() { showToast(set, '⏭  Card skipped', 1500); },
  clearToast() { showToast(set, null, 0); },

  async settle(id) {
    const pos = get().positions.find(p => p.id === id);
    if (!pos) return;
    // On-chain bets settle + claim for real; seeded/mock positions just flip.
    if (pos.onchain && pos.betProp && getPhantom()) {
      showToast(set, '⏳  Settling on-chain…', 5000);
      try {
        const { claimSig } = await settleAndClaimOnChain({ proposition: pos.betProp, side: pos.side, outcome: pos.outcome });
        set(s => ({ positions: s.positions.map(p => p.id === id ? Object.assign({}, p, { status: p.outcome, countdown: 0, settleTxSig: claimSig || p.txSig }) : p) }));
        showToast(set, pos.outcome === 'won' ? '✓  Won — SOL claimed on-chain' : '✓  Settled — no win this time', 3400);
      } catch (err) {
        showToast(set, '⚠  ' + (err && err.message ? err.message : 'Settle failed'), 3400);
      }
      return;
    }
    set(s => ({ positions: s.positions.map(p => p.id === id ? Object.assign({}, p, { status: p.outcome, countdown: 0 }) : p) }));
  },

  // ---- match switching ----
  // Non-live: just point the deck at the first card for that match.
  jumpToNonLive(id) {
    const ni = get().cards.findIndex(c => c.matchId === id);
    if (ni < 0) return;
    set(s => ({ index: ni, timer: s.cards[ni].windowSec }));
  },

  // Used by the Arena header's match chips — stays on /arena, no navigation.
  jumpToMatch(id) {
    if (get().apiLive) {
      const cur = get().cards[get().index];
      if (!cur || cur.matchId !== id) get().loadPropositions(id, get().matches);
      return;
    }
    get().jumpToNonLive(id);
  },

  // Used by the Matches screen — the caller awaits this then navigates itself.
  async selectMatch(id) {
    if (get().apiLive) {
      await get().loadPropositions(id, get().matches);
    } else {
      get().jumpToNonLive(id);
    }
  }
}));
