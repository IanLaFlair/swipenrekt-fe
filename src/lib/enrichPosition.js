// Shared view-model enrichment for a position/bet record, used by
// PositionsPage, HistoryPage and (partially) ResultPage. Ported from the old
// App.jsx renderVals()'s `enrich`. Callers attach their own `onClaim`/`onOpen`
// handlers since those need page-local `navigate`/store access.

const mmss = (n) => String(Math.floor(Math.max(0, n) / 60)).padStart(2, '0') + ':' + String(Math.max(0, n) % 60).padStart(2, '0');

export function enrichPosition(p) {
  const potential = +(p.stake / p.price).toFixed(3);
  const pending = p.status === 'pending' || p.status === 'active';
  return Object.assign({}, p, {
    sideLabel: p.side === 'yes' ? 'YES' : 'NO',
    sideColor: p.side === 'yes' ? '#00ff9d' : '#ff3d6e',
    statusColor: pending ? '#ffcf4d' : (p.status === 'won' ? '#00ff9d' : '#ff3d6e'),
    statusBg: pending ? 'rgba(255,207,77,.12)' : (p.status === 'won' ? 'rgba(0,255,157,.12)' : 'rgba(255,61,110,.12)'),
    statusLabel: p.status.toUpperCase(),
    payoutStr: p.status === 'won' ? ('+◎' + potential) : (p.status === 'lost' ? ('−◎' + p.stake) : ('◎' + p.stake + ' → ◎' + potential)),
    payoutColor: p.status === 'won' ? '#00ff9d' : (p.status === 'lost' ? '#ff3d6e' : '#9a9ab0'),
    potentialStr: '◎' + potential,
    cdStr: mmss(p.countdown || 0),
    isPending: pending,
    isSettled: !pending,
    // Betting window still open — outcome can't be known yet.
    windowOpen: pending && (p.countdown || 0) > 0,
    // Window closed but the backend authority hasn't declared a result yet.
    awaitingResult: pending && (p.countdown || 0) <= 0,
    isWon: p.status === 'won',
    isLost: p.status === 'lost',
    // A declared win the user hasn't collected yet → show the CLAIM button.
    canClaim: p.status === 'won' && !p.claimed,
    claimed: !!p.claimed,
    // Real devnet explorer links for the on-chain place_bet / claim txs.
    explorerUrl: p.txSig ? ('https://explorer.solana.com/tx/' + p.txSig + '?cluster=devnet') : null,
    claimUrl: p.claimTxSig ? ('https://explorer.solana.com/tx/' + p.claimTxSig + '?cluster=devnet') : null
  });
}
