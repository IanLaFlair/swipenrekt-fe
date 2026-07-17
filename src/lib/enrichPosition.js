// Shared view-model enrichment for a position/bet record, used by
// PositionsPage, HistoryPage and (partially) ResultPage. Ported from the old
// App.jsx renderVals()'s `enrich`. Callers attach their own `onSettle`/`onOpen`
// handlers since those need page-local `navigate`/store access.

const mmss = (n) => String(Math.floor(Math.max(0, n) / 60)).padStart(2, '0') + ':' + String(Math.max(0, n) % 60).padStart(2, '0');

export function enrichPosition(p) {
  const potential = Math.round(p.stake / p.price);
  return Object.assign({}, p, {
    sideLabel: p.side === 'yes' ? 'YES' : 'NO',
    sideColor: p.side === 'yes' ? '#00ff9d' : '#ff3d6e',
    statusColor: p.status === 'pending' ? '#ffcf4d' : (p.status === 'won' ? '#00ff9d' : '#ff3d6e'),
    statusBg: p.status === 'pending' ? 'rgba(255,207,77,.12)' : (p.status === 'won' ? 'rgba(0,255,157,.12)' : 'rgba(255,61,110,.12)'),
    statusLabel: p.status.toUpperCase(),
    payoutStr: p.status === 'won' ? ('+$' + potential) : (p.status === 'lost' ? ('−$' + p.stake) : ('$' + p.stake + ' → $' + potential)),
    payoutColor: p.status === 'won' ? '#00ff9d' : (p.status === 'lost' ? '#ff3d6e' : '#9a9ab0'),
    cdStr: mmss(p.countdown || 0),
    isPending: p.status === 'pending',
    isSettled: p.status !== 'pending'
  });
}
