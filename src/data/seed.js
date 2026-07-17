// Design-time seed data + pure helpers, used as the fallback state until live
// backend data arrives (see store/appStore.js's bootstrapLive/loadMatches/etc).
// Ported verbatim from the old App.jsx `static` members.

export const CARDS = [
  {id:'c1',matchId:'m1',home:'ARG',away:'FRA',hf:'🇦🇷',af:'🇫🇷',hs:2,as:1,min:67,q:'GOAL IN THE NEXT 5 MINUTES?',cat:'GOALS',ctx:'Argentina pushing — 4 shots in the last 3 min',yes:0.41,windowSec:300},
  {id:'c2',matchId:'m1',home:'ARG',away:'FRA',hf:'🇦🇷',af:'🇫🇷',hs:2,as:1,min:67,q:'MESSI TO ASSIST OR SCORE THIS HALF?',cat:'STAR',ctx:'Messi already has 5 key passes this half',yes:0.33,windowSec:420},
  {id:'c3',matchId:'m2',home:'BRA',away:'ESP',hf:'🇧🇷',af:'🇪🇸',hs:0,as:0,min:23,q:'NEXT CORNER TO BRAZIL?',cat:'SET PIECE',ctx:'Brazil dominating the right flank',yes:0.56,windowSec:180},
  {id:'c4',matchId:'m3',home:'GER',away:'NED',hf:'🇩🇪',af:'🇳🇱',hs:1,as:1,min:78,q:'YELLOW CARD IN THE NEXT 10 MIN?',cat:'DISCIPLINE',ctx:'Tension rising — 3 hard tackles in a row',yes:0.64,windowSec:600},
  {id:'c5',matchId:'m4',home:'POR',away:'MEX',hf:'🇵🇹',af:'🇲🇽',hs:1,as:0,min:55,q:'RONALDO TO SCORE AGAIN TONIGHT?',cat:'STAR',ctx:'Already 1 goal — 3 shots on target',yes:0.27,windowSec:900},
  {id:'c6',matchId:'m2',home:'BRA',away:'ESP',hf:'🇧🇷',af:'🇪🇸',hs:0,as:0,min:23,q:'TOTAL CORNERS OVER 9?',cat:'STATS',ctx:'High tempo, plenty of wing attacks',yes:0.48,windowSec:600},
  {id:'c7',matchId:'m3',home:'GER',away:'NED',hf:'🇩🇪',af:'🇳🇱',hs:1,as:1,min:78,q:'MATCH WINNER: NETHERLANDS?',cat:'RESULT',ctx:'Netherlands chasing a 2nd, Germany defending',yes:0.39,windowSec:720},
  {id:'c8',matchId:'m1',home:'ARG',away:'FRA',hf:'🇦🇷',af:'🇫🇷',hs:2,as:1,min:67,q:'MBAPPÉ TO SCORE BEFORE THE 80TH MIN?',cat:'STAR',ctx:'Mbappé heating up — 2 quick sprints',yes:0.36,windowSec:780}
];

export const MATCHES = [
  {id:'m1',home:'ARG',away:'FRA',hf:'🇦🇷',af:'🇫🇷',hs:2,as:1,min:67},
  {id:'m2',home:'BRA',away:'ESP',hf:'🇧🇷',af:'🇪🇸',hs:0,as:0,min:23},
  {id:'m3',home:'GER',away:'NED',hf:'🇩🇪',af:'🇳🇱',hs:1,as:1,min:78},
  {id:'m4',home:'POR',away:'MEX',hf:'🇵🇹',af:'🇲🇽',hs:1,as:0,min:55}
];

export const WALLETS = [
  { name: 'Phantom', tag: 'Detected', col: '#ab9ff2', letter: 'P' },
  { name: 'Solflare', tag: '', col: '#ffb020', letter: 'S' },
  { name: 'Backpack', tag: '', col: '#e6484d', letter: 'B' },
  { name: 'Devnet Guest', tag: 'Free', col: '#00ff9d', letter: '◎' }
];

export const MATCHES_FULL = [
  { id:'m1', home:'ARG', away:'FRA', hf:'🇦🇷', af:'🇫🇷', hs:2, as:1, min:67, phase:'2nd Half', live:true, markets:14 },
  { id:'m2', home:'BRA', away:'ESP', hf:'🇧🇷', af:'🇪🇸', hs:0, as:0, min:23, phase:'1st Half', live:true, markets:11 },
  { id:'m3', home:'GER', away:'NED', hf:'🇩🇪', af:'🇳🇱', hs:1, as:1, min:78, phase:'2nd Half', live:true, markets:9 },
  { id:'m4', home:'POR', away:'MEX', hf:'🇵🇹', af:'🇲🇽', hs:1, as:0, min:55, phase:'2nd Half', live:true, markets:12 },
  { id:'u1', home:'URU', away:'USA', hf:'🇺🇾', af:'🇺🇸', hs:0, as:0, min:0, phase:'Kickoff 21:00', live:false, markets:0 },
  { id:'u2', home:'CRO', away:'JPN', hf:'🇭🇷', af:'🇯🇵', hs:0, as:0, min:0, phase:'Kickoff 23:45', live:false, markets:0 }
];

export const LEADERS = [
  { rank:1, name:'0xDegenKing', streak:23, wr:71, pnl:'+$4.2k', bot:false },
  { rank:2, name:'LiquidityLarry', streak:0, wr:58, pnl:'+$3.8k', bot:true },
  { rank:3, name:'GoalSniperBot', streak:11, wr:64, pnl:'+$3.1k', bot:true },
  { rank:4, name:'SnipeQueen', streak:9, wr:62, pnl:'+$2.4k', bot:false },
  { rank:5, name:'ChaosKomodo', streak:4, wr:55, pnl:'+$1.9k', bot:true },
  { rank:6, name:'TikiTakaTom', streak:6, wr:59, pnl:'+$1.2k', bot:false },
  { rank:7, name:'YOU', streak:7, wr:61, pnl:'+$640', bot:false, you:true }
];

export const PACKS = {
  common:    { label:'COMMON PACK',    color:'#9aa0b0', glow:'rgba(154,160,176,.28)', streak:'1 WIN',         guarantee:'1 card inside',          intensity:0, cards:[{pos:'MIDFIELD',num:14,rarity:'common',ovr:72}] },
  uncommon:  { label:'UNCOMMON PACK',  color:'#00ff9d', glow:'rgba(0,255,157,.3)',    streak:'3 WIN STREAK',  guarantee:'1 uncommon + 1 common',  intensity:1, cards:[{pos:'DEFENDER',num:4,rarity:'uncommon',ovr:78},{pos:'GOALKEEPER',num:1,rarity:'common',ovr:71}] },
  rare:      { label:'RARE PACK',      color:'#26a0ff', glow:'rgba(38,160,255,.35)',  streak:'5 WIN STREAK',  guarantee:'3 rare guaranteed',      intensity:2, cards:[{pos:'MIDFIELD',num:8,rarity:'rare',ovr:84},{pos:'FORWARD',num:9,rarity:'rare',ovr:86},{pos:'DEFENDER',num:5,rarity:'rare',ovr:83}] },
  epic:      { label:'EPIC PACK',      color:'#b026ff', glow:'rgba(176,38,255,.4)',   streak:'10 WIN STREAK', guarantee:'4 rare guaranteed',      intensity:3, cards:[{pos:'MIDFIELD',num:10,rarity:'rare',ovr:85},{pos:'DEFENDER',num:3,rarity:'rare',ovr:84},{pos:'GOALKEEPER',num:1,rarity:'rare',ovr:84},{pos:'FORWARD',num:7,rarity:'epic',ovr:90}] },
  legendary: { label:'LEGENDARY PACK', color:'#ffcf4d', glow:'rgba(255,207,77,.5)',   streak:'20 WIN STREAK', guarantee:'1 legendary guaranteed', intensity:4, cards:[{pos:'MIDFIELD',num:6,rarity:'rare',ovr:85},{pos:'FORWARD',num:11,rarity:'rare',ovr:86},{pos:'DEFENDER',num:2,rarity:'epic',ovr:89},{pos:'MIDFIELD',num:8,rarity:'epic',ovr:91},{pos:'FORWARD',num:10,rarity:'legendary',ovr:97}] }
};

export const RC = { common:'#9aa0b0', uncommon:'#00ff9d', rare:'#26a0ff', epic:'#b026ff', legendary:'#ffcf4d' };
export const RGLOW = { common:'rgba(154,160,176,.25)', uncommon:'rgba(0,255,157,.3)', rare:'rgba(38,160,255,.35)', epic:'rgba(176,38,255,.4)', legendary:'rgba(255,207,77,.5)' };

export const COUNTRIES = [
  {n:'Argentina',f:'🇦🇷'},{n:'Brazil',f:'🇧🇷'},{n:'France',f:'🇫🇷'},{n:'Spain',f:'🇪🇸'},{n:'Germany',f:'🇩🇪'},{n:'Portugal',f:'🇵🇹'},{n:'Netherlands',f:'🇳🇱'},{n:'Italy',f:'🇮🇹'},
  {n:'Belgium',f:'🇧🇪'},{n:'Croatia',f:'🇭🇷'},{n:'Uruguay',f:'🇺🇾'},{n:'Mexico',f:'🇲🇽'},{n:'United States',f:'🇺🇸'},{n:'Canada',f:'🇨🇦'},{n:'Japan',f:'🇯🇵'},{n:'South Korea',f:'🇰🇷'},
  {n:'Morocco',f:'🇲🇦'},{n:'Senegal',f:'🇸🇳'},{n:'Nigeria',f:'🇳🇬'},{n:'Ghana',f:'🇬🇭'},{n:'Cameroon',f:'🇨🇲'},{n:'Egypt',f:'🇪🇬'},{n:'Ivory Coast',f:'🇨🇮'},{n:'Australia',f:'🇦🇺'},
  {n:'Saudi Arabia',f:'🇸🇦'},{n:'Iran',f:'🇮🇷'},{n:'Qatar',f:'🇶🇦'},{n:'Switzerland',f:'🇨🇭'},{n:'Denmark',f:'🇩🇰'},{n:'Sweden',f:'🇸🇪'},{n:'Poland',f:'🇵🇱'},{n:'Serbia',f:'🇷🇸'},
  {n:'Austria',f:'🇦🇹'},{n:'Ukraine',f:'🇺🇦'},{n:'England',f:'🇬🇧'},{n:'Colombia',f:'🇨🇴'},{n:'Ecuador',f:'🇪🇨'},{n:'Peru',f:'🇵🇪'},{n:'Chile',f:'🇨🇱'},{n:'Paraguay',f:'🇵🇾'},
  {n:'Costa Rica',f:'🇨🇷'},{n:'Panama',f:'🇵🇦'},{n:'Tunisia',f:'🇹🇳'},{n:'Algeria',f:'🇩🇿'},{n:'Turkey',f:'🇹🇷'},{n:'Norway',f:'🇳🇴'},{n:'Greece',f:'🇬🇷'},{n:'Czechia',f:'🇨🇿'}
];

export const POS26 = ['FW','FW','MF','MF','DF','MF','FW','DF','MF','DF','FW','DF','MF','GK','FW','GK','DF','MF','FW','DF','MF','GK','DF','MF','FW','DF'];
export const NUM26 = [10,9,7,11,8,4,5,17,6,14,20,3,2,21,18,1,12,13,15,16,19,22,23,24,25,26];
export const SURN = ['Silva','Costa','Santos','Pereira','Müller','Schmidt','Rossi','Bianchi','García','Martín','López','Dubois','Moreau','Kovač','Novak','Horvat','Nielsen','Hansen','Andersson','Johansson','Nakamura','Tanaka','Kim','Park','Diallo','Traoré','Mensah','Okafor','Hassan','Said','Khan','Ahmed','Smith','Walker','Murphy','Petrov','Ivanov','Popescu','Nowak','Yilmaz','Demir','Berg','Rodríguez','Fernández','Vidal','Castro','Mendes','Aguirre'];
export const INIT = ['A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','R','S','T','V','Z'];

export function ownedCountFor(ci) { return ci < 2 ? 26 : 2 + ((ci * 7 + 3) % 23); }

export function ownedMask(ci, cnt) {
  const idx = Array.from({ length: 26 }, (_, i) => i);
  let seed = ci * 9301 + 49297;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  const mask = Array(26).fill(false);
  for (let i = 0; i < cnt; i++) mask[idx[i]] = true;
  return mask;
}

export function nameFor(ci, k) {
  const sur = SURN[(ci * 5 + k * 7) % SURN.length];
  const ini = INIT[(ci * 3 + k) % INIT.length];
  return ini + '. ' + sur.toUpperCase();
}

// Shared by AlbumPage and ProfilePage so both agree on the same "sets
// completed" math without duplicating it.
export function albumSummary() {
  const setsDone = COUNTRIES.reduce((a, c, i) => a + (ownedCountFor(i) >= 26 ? 1 : 0), 0);
  const setsTotal = COUNTRIES.length;
  const sets = COUNTRIES.map((co, i) => {
    const owned = ownedCountFor(i);
    const complete = owned >= 26;
    return {
      idx: i,
      flag: co.f, name: co.n, owned, complete,
      pctW: Math.round(owned / 26 * 100) + '%',
      barColor: complete ? '#00ff9d' : 'linear-gradient(90deg,#26a0ff,#b026ff)',
      countColor: complete ? '#00ff9d' : '#cfcfe0',
      rowBg: complete ? 'rgba(0,255,157,.06)' : '#14141d',
      rowBorder: complete ? '1px solid rgba(0,255,157,.3)' : '1px solid rgba(255,255,255,.07)'
    };
  });
  return { setsDone, setsTotal, setsPctW: Math.round(setsDone / setsTotal * 100) + '%', sets };
}

export function genPlayers(ci) {
  const order = [['legendary', 1], ['epic', 2], ['rare', 5], ['uncommon', 7], ['common', 11]];
  const cnt = ownedCountFor(ci);
  const mask = ownedMask(ci, cnt);
  const out = []; let k = 0;
  order.forEach(([rar, c]) => { for (let x = 0; x < c; x++) { out.push({ rar, pos: POS26[k], num: NUM26[k], name: nameFor(ci, k), owned: mask[k] }); k++; } });
  return out;
}

export function makeReceipt() {
  const hx = (n) => '0x' + Array.from({ length: n }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
  return { root: hx(40), leaf: hx(40), n1: hx(24), n2: hx(24), sig: hx(64), slot: 318000000 + Math.floor(Math.random() * 900000) };
}

export function buildSeeds() {
  return [
    { id: 'seed1', mLabel: 'ARG 2–1 FRA', q: 'MESSI TO ASSIST OR SCORE?', side: 'yes', stake: 50, price: 0.33, status: 'won', countdown: 0, outcome: 'won', rare: true, stat: 'Messi assist on 2nd goal', statMin: 58, player: 'LIONEL MESSI', moment: 'Assist · 58’ · ARG vs FRA', receipt: makeReceipt() },
    { id: 'seed2', mLabel: 'GER 1–1 NED', q: 'YELLOW CARD IN THE NEXT 10 MIN?', side: 'no', stake: 20, price: 0.36, status: 'lost', countdown: 0, outcome: 'lost', rare: false, stat: 'Yellow card shown at 71’', statMin: 71, player: '', moment: '', receipt: makeReceipt() },
    { id: 'seed3', mLabel: 'BRA 0–0 ESP', q: 'NEXT CORNER TO BRAZIL?', side: 'yes', stake: 20, price: 0.56, status: 'pending', countdown: 138, outcome: 'won', rare: true, stat: 'Corner awarded to Brazil', statMin: 24, player: 'RAPHINHA', moment: 'Corner won · 24’ · BRA vs ESP', receipt: makeReceipt() }
  ];
}

export function buildHistory() {
  const r = () => makeReceipt();
  return [
    { id:'h1', mLabel:'ARG 2–1 FRA', q:'GOAL IN THE NEXT 5 MINUTES?', side:'yes', stake:20, price:0.41, status:'won', countdown:0, outcome:'won', rare:false, stat:'Goal scored by Álvarez', statMin:64, player:'', moment:'', receipt:r() },
    { id:'h2', mLabel:'BRA 0–0 ESP', q:'TOTAL CORNERS OVER 9?', side:'no', stake:30, price:0.52, status:'lost', countdown:0, outcome:'lost', rare:false, stat:'11 corners reached at 80’', statMin:80, player:'', moment:'', receipt:r() },
    { id:'h3', mLabel:'POR 1–0 MEX', q:'RONALDO TO SCORE AGAIN?', side:'yes', stake:25, price:0.27, status:'won', countdown:0, outcome:'won', rare:true, stat:'Ronaldo goal at 63’', statMin:63, player:'RONALDO', moment:'Goal · 63’ · POR vs MEX', receipt:r() },
    { id:'h4', mLabel:'GER 1–1 NED', q:'MATCH WINNER: NETHERLANDS?', side:'no', stake:40, price:0.61, status:'won', countdown:0, outcome:'won', rare:false, stat:'Match ended level', statMin:90, player:'', moment:'', receipt:r() },
    { id:'h5', mLabel:'ARG 2–1 FRA', q:'MBAPPÉ TO SCORE BEFORE 80’?', side:'yes', stake:20, price:0.36, status:'lost', countdown:0, outcome:'lost', rare:false, stat:'No goal before 80’', statMin:80, player:'', moment:'', receipt:r() },
    { id:'h6', mLabel:'BRA 0–0 ESP', q:'NEXT CORNER TO SPAIN?', side:'yes', stake:15, price:0.47, status:'won', countdown:0, outcome:'won', rare:false, stat:'Corner to Spain at 31’', statMin:31, player:'', moment:'', receipt:r() },
    { id:'h7', mLabel:'POR 1–0 MEX', q:'YELLOW CARD IN 10 MIN?', side:'yes', stake:20, price:0.58, status:'won', countdown:0, outcome:'won', rare:false, stat:'Booking at 57’', statMin:57, player:'', moment:'', receipt:r() },
    { id:'h8', mLabel:'GER 1–1 NED', q:'GOAL IN THE NEXT 5 MINUTES?', side:'no', stake:30, price:0.55, status:'lost', countdown:0, outcome:'lost', rare:false, stat:'Goal scored at 76’', statMin:76, player:'', moment:'', receipt:r() }
  ];
}
