import React from "react";
// api.js is an IIFE that installs window.SNR — imported for its side effect so
// the bundler owns it (no extra request, same tested code).
import "./api.js";
import { Positions, Result, Splash, Connect, Matches, Album, Country, Leaderboard, Profile, History, Pack } from "./screens";

class App extends React.Component {
  static CARDS = [
    {id:'c1',matchId:'m1',home:'ARG',away:'FRA',hf:'🇦🇷',af:'🇫🇷',hs:2,as:1,min:67,q:'GOAL IN THE NEXT 5 MINUTES?',cat:'GOALS',ctx:'Argentina pushing — 4 shots in the last 3 min',yes:0.41,windowSec:300},
    {id:'c2',matchId:'m1',home:'ARG',away:'FRA',hf:'🇦🇷',af:'🇫🇷',hs:2,as:1,min:67,q:'MESSI TO ASSIST OR SCORE THIS HALF?',cat:'STAR',ctx:'Messi already has 5 key passes this half',yes:0.33,windowSec:420},
    {id:'c3',matchId:'m2',home:'BRA',away:'ESP',hf:'🇧🇷',af:'🇪🇸',hs:0,as:0,min:23,q:'NEXT CORNER TO BRAZIL?',cat:'SET PIECE',ctx:'Brazil dominating the right flank',yes:0.56,windowSec:180},
    {id:'c4',matchId:'m3',home:'GER',away:'NED',hf:'🇩🇪',af:'🇳🇱',hs:1,as:1,min:78,q:'YELLOW CARD IN THE NEXT 10 MIN?',cat:'DISCIPLINE',ctx:'Tension rising — 3 hard tackles in a row',yes:0.64,windowSec:600},
    {id:'c5',matchId:'m4',home:'POR',away:'MEX',hf:'🇵🇹',af:'🇲🇽',hs:1,as:0,min:55,q:'RONALDO TO SCORE AGAIN TONIGHT?',cat:'STAR',ctx:'Already 1 goal — 3 shots on target',yes:0.27,windowSec:900},
    {id:'c6',matchId:'m2',home:'BRA',away:'ESP',hf:'🇧🇷',af:'🇪🇸',hs:0,as:0,min:23,q:'TOTAL CORNERS OVER 9?',cat:'STATS',ctx:'High tempo, plenty of wing attacks',yes:0.48,windowSec:600},
    {id:'c7',matchId:'m3',home:'GER',away:'NED',hf:'🇩🇪',af:'🇳🇱',hs:1,as:1,min:78,q:'MATCH WINNER: NETHERLANDS?',cat:'RESULT',ctx:'Netherlands chasing a 2nd, Germany defending',yes:0.39,windowSec:720},
    {id:'c8',matchId:'m1',home:'ARG',away:'FRA',hf:'🇦🇷',af:'🇫🇷',hs:2,as:1,min:67,q:'MBAPPÉ TO SCORE BEFORE THE 80TH MIN?',cat:'STAR',ctx:'Mbappé heating up — 2 quick sprints',yes:0.36,windowSec:780}
  ];
  static MATCHES = [
    {id:'m1',home:'ARG',away:'FRA',hf:'🇦🇷',af:'🇫🇷',hs:2,as:1,min:67},
    {id:'m2',home:'BRA',away:'ESP',hf:'🇧🇷',af:'🇪🇸',hs:0,as:0,min:23},
    {id:'m3',home:'GER',away:'NED',hf:'🇩🇪',af:'🇳🇱',hs:1,as:1,min:78},
    {id:'m4',home:'POR',away:'MEX',hf:'🇵🇹',af:'🇲🇽',hs:1,as:0,min:55}
  ];
  static WALLETS = [
    { name: 'Phantom', tag: 'Detected', col: '#ab9ff2', letter: 'P' },
    { name: 'Solflare', tag: '', col: '#ffb020', letter: 'S' },
    { name: 'Backpack', tag: '', col: '#e6484d', letter: 'B' },
    { name: 'Devnet Guest', tag: 'Free', col: '#00ff9d', letter: '◎' }
  ];
  static MATCHES_FULL = [
    { id:'m1', home:'ARG', away:'FRA', hf:'🇦🇷', af:'🇫🇷', hs:2, as:1, min:67, phase:'2nd Half', live:true, markets:14 },
    { id:'m2', home:'BRA', away:'ESP', hf:'🇧🇷', af:'🇪🇸', hs:0, as:0, min:23, phase:'1st Half', live:true, markets:11 },
    { id:'m3', home:'GER', away:'NED', hf:'🇩🇪', af:'🇳🇱', hs:1, as:1, min:78, phase:'2nd Half', live:true, markets:9 },
    { id:'m4', home:'POR', away:'MEX', hf:'🇵🇹', af:'🇲🇽', hs:1, as:0, min:55, phase:'2nd Half', live:true, markets:12 },
    { id:'u1', home:'URU', away:'USA', hf:'🇺🇾', af:'🇺🇸', hs:0, as:0, min:0, phase:'Kickoff 21:00', live:false, markets:0 },
    { id:'u2', home:'CRO', away:'JPN', hf:'🇭🇷', af:'🇯🇵', hs:0, as:0, min:0, phase:'Kickoff 23:45', live:false, markets:0 }
  ];
  static ALBUM = [
    { player:'MESSI', sub:'Assist · 58’', rarity:'legendary', owned:true },
    { player:'MBAPPÉ', sub:'Goal · 71’', rarity:'epic', owned:true },
    { player:'RAPHINHA', sub:'Corner · 24’', rarity:'rare', owned:true },
    { player:'VINÍCIUS', sub:'Solo run · 12’', rarity:'epic', owned:true },
    { player:'PEDRI', sub:'Assist · 33’', rarity:'rare', owned:true },
    { locked:true }, { locked:true }, { locked:true }, { locked:true }, { locked:true }, { locked:true }, { locked:true }
  ];
  static LEADERS = [
    { rank:1, name:'0xDegenKing', streak:23, wr:71, pnl:'+$4.2k', bot:false },
    { rank:2, name:'LiquidityLarry', streak:0, wr:58, pnl:'+$3.8k', bot:true },
    { rank:3, name:'GoalSniperBot', streak:11, wr:64, pnl:'+$3.1k', bot:true },
    { rank:4, name:'SnipeQueen', streak:9, wr:62, pnl:'+$2.4k', bot:false },
    { rank:5, name:'ChaosKomodo', streak:4, wr:55, pnl:'+$1.9k', bot:true },
    { rank:6, name:'TikiTakaTom', streak:6, wr:59, pnl:'+$1.2k', bot:false },
    { rank:7, name:'YOU', streak:7, wr:61, pnl:'+$640', bot:false, you:true }
  ];

  static PACKS = {
    common:    { label:'COMMON PACK',    color:'#9aa0b0', glow:'rgba(154,160,176,.28)', streak:'1 WIN',         guarantee:'1 card inside',          intensity:0, cards:[{pos:'MIDFIELD',num:14,rarity:'common',ovr:72}] },
    uncommon:  { label:'UNCOMMON PACK',  color:'#00ff9d', glow:'rgba(0,255,157,.3)',    streak:'3 WIN STREAK',  guarantee:'1 uncommon + 1 common',  intensity:1, cards:[{pos:'DEFENDER',num:4,rarity:'uncommon',ovr:78},{pos:'GOALKEEPER',num:1,rarity:'common',ovr:71}] },
    rare:      { label:'RARE PACK',      color:'#26a0ff', glow:'rgba(38,160,255,.35)',  streak:'5 WIN STREAK',  guarantee:'3 rare guaranteed',      intensity:2, cards:[{pos:'MIDFIELD',num:8,rarity:'rare',ovr:84},{pos:'FORWARD',num:9,rarity:'rare',ovr:86},{pos:'DEFENDER',num:5,rarity:'rare',ovr:83}] },
    epic:      { label:'EPIC PACK',      color:'#b026ff', glow:'rgba(176,38,255,.4)',   streak:'10 WIN STREAK', guarantee:'4 rare guaranteed',      intensity:3, cards:[{pos:'MIDFIELD',num:10,rarity:'rare',ovr:85},{pos:'DEFENDER',num:3,rarity:'rare',ovr:84},{pos:'GOALKEEPER',num:1,rarity:'rare',ovr:84},{pos:'FORWARD',num:7,rarity:'epic',ovr:90}] },
    legendary: { label:'LEGENDARY PACK', color:'#ffcf4d', glow:'rgba(255,207,77,.5)',   streak:'20 WIN STREAK', guarantee:'1 legendary guaranteed', intensity:4, cards:[{pos:'MIDFIELD',num:6,rarity:'rare',ovr:85},{pos:'FORWARD',num:11,rarity:'rare',ovr:86},{pos:'DEFENDER',num:2,rarity:'epic',ovr:89},{pos:'MIDFIELD',num:8,rarity:'epic',ovr:91},{pos:'FORWARD',num:10,rarity:'legendary',ovr:97}] }
  };
  static RC = { common:'#9aa0b0', uncommon:'#00ff9d', rare:'#26a0ff', epic:'#b026ff', legendary:'#ffcf4d' };
  static RGLOW = { common:'rgba(154,160,176,.25)', uncommon:'rgba(0,255,157,.3)', rare:'rgba(38,160,255,.35)', epic:'rgba(176,38,255,.4)', legendary:'rgba(255,207,77,.5)' };
  static COUNTRIES = [
    {n:'Argentina',f:'🇦🇷'},{n:'Brazil',f:'🇧🇷'},{n:'France',f:'🇫🇷'},{n:'Spain',f:'🇪🇸'},{n:'Germany',f:'🇩🇪'},{n:'Portugal',f:'🇵🇹'},{n:'Netherlands',f:'🇳🇱'},{n:'Italy',f:'🇮🇹'},
    {n:'Belgium',f:'🇧🇪'},{n:'Croatia',f:'🇭🇷'},{n:'Uruguay',f:'🇺🇾'},{n:'Mexico',f:'🇲🇽'},{n:'United States',f:'🇺🇸'},{n:'Canada',f:'🇨🇦'},{n:'Japan',f:'🇯🇵'},{n:'South Korea',f:'🇰🇷'},
    {n:'Morocco',f:'🇲🇦'},{n:'Senegal',f:'🇸🇳'},{n:'Nigeria',f:'🇳🇬'},{n:'Ghana',f:'🇬🇭'},{n:'Cameroon',f:'🇨🇲'},{n:'Egypt',f:'🇪🇬'},{n:'Ivory Coast',f:'🇨🇮'},{n:'Australia',f:'🇦🇺'},
    {n:'Saudi Arabia',f:'🇸🇦'},{n:'Iran',f:'🇮🇷'},{n:'Qatar',f:'🇶🇦'},{n:'Switzerland',f:'🇨🇭'},{n:'Denmark',f:'🇩🇰'},{n:'Sweden',f:'🇸🇪'},{n:'Poland',f:'🇵🇱'},{n:'Serbia',f:'🇷🇸'},
    {n:'Austria',f:'🇦🇹'},{n:'Ukraine',f:'🇺🇦'},{n:'England',f:'🇬🇧'},{n:'Colombia',f:'🇨🇴'},{n:'Ecuador',f:'🇪🇨'},{n:'Peru',f:'🇵🇪'},{n:'Chile',f:'🇨🇱'},{n:'Paraguay',f:'🇵🇾'},
    {n:'Costa Rica',f:'🇨🇷'},{n:'Panama',f:'🇵🇦'},{n:'Tunisia',f:'🇹🇳'},{n:'Algeria',f:'🇩🇿'},{n:'Turkey',f:'🇹🇷'},{n:'Norway',f:'🇳🇴'},{n:'Greece',f:'🇬🇷'},{n:'Czechia',f:'🇨🇿'}
  ];
  static POS26 = ['FW','FW','MF','MF','DF','MF','FW','DF','MF','DF','FW','DF','MF','GK','FW','GK','DF','MF','FW','DF','MF','GK','DF','MF','FW','DF'];
  static NUM26 = [10,9,7,11,8,4,5,17,6,14,20,3,2,21,18,1,12,13,15,16,19,22,23,24,25,26];
  static SURN = ['Silva','Costa','Santos','Pereira','Müller','Schmidt','Rossi','Bianchi','García','Martín','López','Dubois','Moreau','Kovač','Novak','Horvat','Nielsen','Hansen','Andersson','Johansson','Nakamura','Tanaka','Kim','Park','Diallo','Traoré','Mensah','Okafor','Hassan','Said','Khan','Ahmed','Smith','Walker','Murphy','Petrov','Ivanov','Popescu','Nowak','Yilmaz','Demir','Berg','Rodríguez','Fernández','Vidal','Castro','Mendes','Aguirre'];
  static INIT = ['A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','R','S','T','V','Z'];
  static ownedCountFor(ci) { return ci < 2 ? 26 : 2 + ((ci * 7 + 3) % 23); }
  static ownedMask(ci, cnt) {
    const idx = Array.from({ length: 26 }, (_, i) => i);
    let seed = ci * 9301 + 49297;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
    const mask = Array(26).fill(false);
    for (let i = 0; i < cnt; i++) mask[idx[i]] = true;
    return mask;
  }
  static nameFor(ci, k) {
    const sur = App.SURN[(ci * 5 + k * 7) % App.SURN.length];
    const ini = App.INIT[(ci * 3 + k) % App.INIT.length];
    return ini + '. ' + sur.toUpperCase();
  }
  genPlayers(ci) {
    const order = [['legendary', 1], ['epic', 2], ['rare', 5], ['uncommon', 7], ['common', 11]];
    const cnt = App.ownedCountFor(ci);
    const mask = App.ownedMask(ci, cnt);
    const out = []; let k = 0;
    order.forEach(([rar, c]) => { for (let x = 0; x < c; x++) { out.push({ rar, pos: App.POS26[k], num: App.NUM26[k], name: App.nameFor(ci, k), owned: mask[k] }); k++; } });
    return out;
  }

  state = {
    index: 0,
    packTier: 'rare', packPhase: 'closed', packRevealed: 0, packDragArmed: false, packToast: null,
    drag: { x:0, y:0, active:false },
    exiting: null,
    exit: { x:0, y:0, r:0 },
    timer: App.CARDS[0].windowSec,
    toast: null,
    cards: App.CARDS,
    matches: App.MATCHES,
    sheet: null,       // { side: 'yes' | 'no' }
    stake: 20,
    slideX: 0,
    sliding: false,
    undo: null,        // { prevIndex, side, stake }
    screen: 'splash',  // splash|connect|matches|arena|album|leaderboard|profile|positions|result|history
    positions: this.buildSeeds(),
    history: this.buildHistory(),
    selObj: null,
    selCountry: 0,
    connecting: null,
    connectError: null,
    dropOpen: false,
    // ---- live API state (falls back to the seeded design data until loaded) ----
    matchesFull: App.MATCHES_FULL,
    leaders: App.LEADERS,
    profile: null,       // { balanceUsdc, winRate, bestStreak, currentStreak, netPnl, totalPredictions, walletAddress }
    apiLive: false       // true once real backend data is in play
  };

  componentDidMount() {
    this._iv = setInterval(() => {
      this.setState(s => ({
        timer: s.timer > 0 ? s.timer - 1 : 0,
        positions: s.positions.map(p => (p.status === 'pending' && p.countdown > 0) ? Object.assign({}, p, { countdown: p.countdown - 1 }) : p)
      }));
    }, 1000);
    // Warm up live data in the background so the arena/matches are real by the
    // time the user connects. Silent on failure — the seeded design data stays.
    this.bootstrapLive();
  }
  componentWillUnmount() {
    this._dead = true;
    clearInterval(this._iv);
    clearTimeout(this._t1);
    clearTimeout(this._t2);
    clearTimeout(this._t3);
    clearTimeout(this._tc);
    clearTimeout(this._pt);
    this.clearPackTimers();
  }

  // ---- live backend integration ----
  safeSet(patch) { if (!this._dead) this.setState(patch); }

  async bootstrapLive() {
    if (!window.SNR) return;
    try { await window.SNR.ensureLogin(); } catch (_) { /* stay on seeded data */ }
    await this.loadMatches();
    this.loadLeaderboard();
    this.loadProfile();
    this.loadBets();
  }

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
      this.safeSet({ matches: mapped, matchesFull, apiLive: true });
      // preload cards for the first live match
      const first = mapped.find(m => m.live) || mapped[0];
      if (first) await this.loadPropositions(first.id, mapped, false);
    } catch (_) {}
  }

  async loadPropositions(matchId, matchesSource, switchScreen) {
    if (!window.SNR) return;
    try {
      const src = matchesSource || this.state.matches;
      const match = src.find(m => m.id === matchId);
      const r = await window.SNR.raw.propositions(matchId, 1, 20);
      const list = ((r && r.data) || []).filter(p => (p.status || 'open') === 'open');
      if (!list.length) return;
      const cards = list.map(p => window.SNR.map.proposition(p, match));
      this.safeSet(s => {
        const patch = { cards, index: 0, timer: cards[0].windowSec, apiLive: true, exiting: null, sheet: null, drag: { x:0, y:0, active:false } };
        if (switchScreen) patch.screen = 'arena';
        return patch;
      });
    } catch (_) {}
  }

  async loadProfile() {
    if (!window.SNR || !window.SNR.getToken()) return;
    try {
      const r = await window.SNR.raw.userInfo();
      if (r && r.data) this.safeSet({ profile: window.SNR.map.user(r.data) });
    } catch (_) {}
  }

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
      this.safeSet({ leaders });
    } catch (_) {}
  }

  async loadBets() {
    if (!window.SNR || !window.SNR.getToken()) return;
    try {
      const r = await window.SNR.raw.bets(1, 30);
      const list = (r && r.data) || [];
      if (!list.length) return;
      const byId = {};
      (this.state.matches || []).forEach(m => { byId[m.id] = m; });
      const mapped = list.map(b => {
        const v = window.SNR.map.bet(b);
        const p = v._proposition || {};
        const m = byId[p.matchId];
        v.mLabel = m ? (m.home + ' ' + m.hs + '–' + m.as + ' ' + m.away) : 'LIVE MATCH';
        v.receipt = this.makeReceipt();
        return v;
      });
      const positions = mapped.filter(p => p.status === 'pending');
      const history = mapped.filter(p => p.status !== 'pending');
      this.safeSet({
        positions: positions.length ? positions : this.state.positions,
        history: history.length ? history : this.state.history
      });
    } catch (_) {}
  }

  // ---- swipe on card ----
  onPointerDown = (e) => {
    if (this.state.exiting || this.state.sheet) return;
    this._start = { x: e.clientX, y: e.clientY };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    this.setState({ drag: { x:0, y:0, active:true } });
  };
  onPointerMove = (e) => {
    if (!this.state.drag.active) return;
    const dx = e.clientX - this._start.x;
    const dy = e.clientY - this._start.y;
    this.setState({ drag: { x:dx, y:dy, active:true } });
  };
  onPointerUp = () => {
    if (!this.state.drag.active) return;
    const { x, y } = this.state.drag;
    const TH = 128; // require a deliberate, far swipe
    if (x > TH && Math.abs(x) > Math.abs(y)) this.openSheet('yes');
    else if (x < -TH && Math.abs(x) > Math.abs(y)) this.openSheet('no');
    else if (y < -TH) this.commitSkip();
    else this.setState({ drag: { x:0, y:0, active:false } });
  };

  // ---- skip (no confirm) ----
  commitSkip() {
    if (this.state.exiting) return;
    const dx = this.state.drag.x;
    const exit = { x:(dx || 0), y:-900, r:(dx * 0.04) || 0 };
    this.setState(s => ({ exiting: 'skip', exit, drag: { x:s.drag.x, y:s.drag.y, active:false }, toast: '⏭  Card skipped' }));
    clearTimeout(this._t1); clearTimeout(this._t2);
    this._t1 = setTimeout(() => {
      this.setState(s => {
        const ni = (s.index + 1) % s.cards.length;
        return { index: ni, exiting: null, exit: { x:0, y:0, r:0 }, drag: { x:0, y:0, active:false }, timer: s.cards[ni].windowSec };
      });
    }, 400);
    this._t2 = setTimeout(() => this.setState({ toast: null }), 1500);
  }

  // ---- bottom sheet ----
  openSheet(side) {
    if (this.state.exiting) return;
    this.setState({ sheet: { side }, drag: { x:0, y:0, active:false }, slideX: 0, sliding: false });
  }
  closeSheet = () => {
    this.setState({ sheet: null, slideX: 0, sliding: false });
  };
  setStake(v) { this.setState({ stake: v }); }
  onStakeInput = (e) => {
    const digits = (e.target.value || '').replace(/[^0-9]/g, '');
    const n = digits === '' ? 0 : Math.min(9999, parseInt(digits, 10));
    this.setState({ stake: n });
  };

  // ---- slide-to-confirm ----
  onSlideDown = (e) => {
    this._slideStart = e.clientX;
    const track = e.currentTarget.parentElement;
    this._trackW = track ? track.getBoundingClientRect().width : 320;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    this.setState({ sliding: true });
  };
  onSlideMove = (e) => {
    if (!this.state.sliding) return;
    const max = (this._trackW || 320) - 56;
    let dx = e.clientX - this._slideStart;
    dx = Math.max(0, Math.min(max, dx));
    this.setState({ slideX: dx });
  };
  onSlideUp = () => {
    if (!this.state.sliding) return;
    const max = (this._trackW || 320) - 56;
    if (this.state.slideX >= max * 0.86) this.confirmPosition();
    else this.setState({ slideX: 0, sliding: false });
  };

  confirmPosition() {
    const side = this.state.sheet ? this.state.sheet.side : 'yes';
    const stake = this.state.stake;
    const prevIndex = this.state.index;
    const exit = side === 'yes' ? { x:740, y:24, r:26 } : { x:-740, y:24, r:-26 };
    const c = this.state.cards[this.state.index];
    const price = side === 'yes' ? c.yes : (1 - c.yes);
    const newPos = {
      id: 'p' + Date.now(),
      mLabel: c.home + ' ' + c.hs + '–' + c.as + ' ' + c.away,
      q: c.q, side, stake, price,
      status: 'pending', countdown: 115,
      outcome: Math.random() < 0.62 ? 'won' : 'lost',
      rare: side === 'yes' && Math.random() < 0.5,
      stat: 'Stat confirmed via TxODDS scores stream', statMin: c.min + 3,
      player: 'WORLD CUP MOMENT', moment: c.q + ' · ' + c.home + ' vs ' + c.away,
      receipt: this.makeReceipt()
    };
    // A real backend bet is final — it can't be locally undone. So in live mode we
    // skip the optimistic "undo" affordance and confirm/reject with a toast instead.
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(c.id || '');
    const willCallApi = this.state.apiLive && window.SNR && window.SNR.getToken() && isUuid;
    this.setState(s => ({ sheet: null, slideX: 0, sliding: false, exiting: side, exit, toast: null, positions: [newPos, ...s.positions] }));
    if (willCallApi) {
      window.SNR.raw.placeBet(c.id, side === 'yes', stake)
        .then(() => {
          this.safeSet({ toast: '✓  Position placed · $' + stake + ' on ' + (side === 'yes' ? 'YES' : 'NO') });
          this.loadBets();
          this.loadProfile();
          clearTimeout(this._t2);
          this._t2 = setTimeout(() => this.safeSet({ toast: null }), 2400);
        })
        .catch((err) => {
          this.safeSet(s => ({
            positions: s.positions.filter(p => p.id !== newPos.id),
            toast: '⚠  ' + (err && err.message ? err.message : 'Bet failed')
          }));
          clearTimeout(this._t2);
          this._t2 = setTimeout(() => this.safeSet({ toast: null }), 2800);
        });
    }
    clearTimeout(this._t1); clearTimeout(this._t2); clearTimeout(this._t3);
    this._t1 = setTimeout(() => {
      this.setState(s => {
        const ni = (s.index + 1) % s.cards.length;
        const patch = { index: ni, exiting: null, exit: { x:0, y:0, r:0 }, drag: { x:0, y:0, active:false }, timer: s.cards[ni].windowSec };
        // Only offer local undo in seeded/mock mode; a live bet is already committed.
        if (!willCallApi) patch.undo = { prevIndex, side, stake };
        return patch;
      });
    }, 400);
    // lock the position after the undo window
    this._t3 = setTimeout(() => {
      this.setState(st => (st.undo && st.undo.prevIndex === prevIndex) ? { undo: null } : {});
    }, 4600);
  }

  doUndo = () => {
    const u = this.state.undo;
    if (!u) return;
    clearTimeout(this._t3);
    this.setState(s => ({
      index: u.prevIndex,
      exiting: null,
      exit: { x:0, y:0, r:0 },
      drag: { x:0, y:0, active:false },
      timer: s.cards[u.prevIndex].windowSec,
      undo: null
    }));
  };

  jumpToMatch(id) {
    if (this.state.apiLive) {
      const cur = this.state.cards[this.state.index];
      if (!cur || cur.matchId !== id) this.loadPropositions(id, this.state.matches, false);
      return;
    }
    const ni = this.state.cards.findIndex(c => c.matchId === id);
    if (ni < 0) return;
    this.setState({ index: ni, exiting: null, exit: { x:0, y:0, r:0 }, drag: { x:0, y:0, active:false }, timer: this.state.cards[ni].windowSec, toast: null, sheet: null, slideX: 0 });
  }

  // ---- positions / settlement / navigation ----
  makeReceipt() {
    const hx = (n) => '0x' + Array.from({ length: n }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
    return { root: hx(40), leaf: hx(40), n1: hx(24), n2: hx(24), sig: hx(64), slot: 318000000 + Math.floor(Math.random() * 900000) };
  }
  buildSeeds() {
    return [
      { id: 'seed1', mLabel: 'ARG 2–1 FRA', q: 'MESSI TO ASSIST OR SCORE?', side: 'yes', stake: 50, price: 0.33, status: 'won', countdown: 0, outcome: 'won', rare: true, stat: 'Messi assist on 2nd goal', statMin: 58, player: 'LIONEL MESSI', moment: 'Assist · 58’ · ARG vs FRA', receipt: this.makeReceipt() },
      { id: 'seed2', mLabel: 'GER 1–1 NED', q: 'YELLOW CARD IN THE NEXT 10 MIN?', side: 'no', stake: 20, price: 0.36, status: 'lost', countdown: 0, outcome: 'lost', rare: false, stat: 'Yellow card shown at 71’', statMin: 71, player: '', moment: '', receipt: this.makeReceipt() },
      { id: 'seed3', mLabel: 'BRA 0–0 ESP', q: 'NEXT CORNER TO BRAZIL?', side: 'yes', stake: 20, price: 0.56, status: 'pending', countdown: 138, outcome: 'won', rare: true, stat: 'Corner awarded to Brazil', statMin: 24, player: 'RAPHINHA', moment: 'Corner won · 24’ · BRA vs ESP', receipt: this.makeReceipt() }
    ];
  }
  buildHistory() {
    const r = () => this.makeReceipt();
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
  goPositions = () => this.setState({ screen: 'positions' });
  goArena = () => this.setState({ screen: 'arena', dropOpen: false });
  goAlbum = () => this.setState({ screen: 'album' });
  openCountry = (i) => this.setState({ screen: 'country', selCountry: i });
  backToAlbum = () => this.setState({ screen: 'album' });
  goLeaderboard = () => this.setState({ screen: 'leaderboard' });
  goProfile = () => this.setState({ screen: 'profile' });
  goMatches = () => this.setState({ screen: 'matches' });
  goConnect = () => this.setState({ screen: 'connect' });
  goSplash = () => this.setState({ screen: 'splash', connecting: null });
  clearPackTimers() { (this._ptimers || []).forEach(clearTimeout); this._ptimers = []; }
  openPackTier = (tier) => { this.clearPackTimers(); this.setState({ screen:'pack', packTier:tier, packPhase:'closed', packRevealed:0, packToast:null }); };
  packBack = () => { this.clearPackTimers(); this.setState({ screen:'profile' }); };
  packStart = () => {
    if (this.state.packPhase !== 'closed') return;
    this.clearPackTimers();
    const tier = this.state.packTier;
    const cards = App.PACKS[tier].cards;
    const TEAR = 760;
    this.setState({ packPhase:'tearing', packRevealed:0 });
    this._ptimers.push(setTimeout(() => this.setState({ packPhase:'revealing' }), TEAR));
    let t = TEAR + 280;
    cards.forEach((c, i) => {
      const extra = (tier === 'legendary' && i === cards.length - 1) ? 850 : 0;
      if (i > 0) t += 620;
      t += extra;
      this._ptimers.push(setTimeout(() => this.setState({ packRevealed: i + 1 }), t));
    });
    this._ptimers.push(setTimeout(() => this.setState({ packPhase:'done' }), t + 720));
  };
  packDown = (e) => { this._pps = { x:e.clientX, y:e.clientY }; this.setState({ packDragArmed:true }); };
  packMove = (e) => {
    if (!this.state.packDragArmed || !this._pps) return;
    const d = Math.hypot(e.clientX - this._pps.x, e.clientY - this._pps.y);
    if (d > 46) { this.setState({ packDragArmed:false }); this.packStart(); }
  };
  packUp = () => this.setState({ packDragArmed:false });
  packReset = () => { this.clearPackTimers(); this.setState({ packPhase:'closed', packRevealed:0 }); };
  packAddToAlbum = () => {
    this.setState({ packToast:'Added to your Album ✓' });
    clearTimeout(this._pt);
    this._pt = setTimeout(() => this.setState({ packToast:null }), 2100);
  };
  openHistory = () => this.setState({ screen: 'history' });
  connectWallet = (name) => {
    this.setState({ connecting: name, connectError: null });
    clearTimeout(this._tc);
    const afterLogin = () => { this.loadProfile(); this.loadBets(); this.loadMatches(); };
    // Devnet Guest (or no API) → generated guest identity, keep the quick animation.
    if (name === 'Devnet Guest' || !window.SNR) {
      if (window.SNR) window.SNR.ensureLogin().then(afterLogin).catch(() => {});
      this._tc = setTimeout(() => this.safeSet({ connecting: null, screen: 'matches' }), 1300);
      return;
    }
    // Real Solana wallet: connect + sign a message (Phantom popup), then log in
    // with the actual pubkey. Errors are surfaced on the connect screen.
    window.SNR.connectExternalWallet(name)
      .then(({ pubkey, nonce }) => window.SNR.loginWithWallet(pubkey, nonce))
      .then(() => { afterLogin(); this.safeSet({ connecting: null, connectError: null, screen: 'matches' }); })
      .catch((err) => {
        const code = err && err.code;
        const msg = code === 'NO_PROVIDER' ? (name + ' not detected — install the extension or use Devnet Guest')
          : (code === 'CONNECT_REJECTED' || code === 'SIG_REJECTED') ? 'Sign-in cancelled in ' + name
          : ((err && err.message) || 'Connection failed');
        this.safeSet({ connecting: null, connectError: msg });
      });
  };
  selectMatch = (id) => {
    if (this.state.apiLive) { this.loadPropositions(id, this.state.matches, true); return; }
    this.jumpToMatch(id);
    this.setState({ screen: 'arena' });
  };
  openResult = (obj) => this.setState({ screen: 'result', selObj: obj });
  settle = (id) => this.setState(s => ({ positions: s.positions.map(p => p.id === id ? Object.assign({}, p, { status: p.outcome, countdown: 0 }) : p) }));
  goDrop = () => this.setState({ dropOpen: true });
  closeDrop = () => this.setState({ dropOpen: false, screen: 'arena' });

  albumVals() {
    const s = this.state;
    const C = App.COUNTRIES;
    const setsDone = C.reduce((a, c, i) => a + (App.ownedCountFor(i) >= 26 ? 1 : 0), 0);
    const albumSets = C.map((co, i) => {
      const o = App.ownedCountFor(i);
      const comp = o >= 26;
      return {
        flag: co.f, name: co.n, owned: o, complete: comp,
        pctW: Math.round(o / 26 * 100) + '%',
        barColor: comp ? '#00ff9d' : 'linear-gradient(90deg,#26a0ff,#b026ff)',
        countColor: comp ? '#00ff9d' : '#cfcfe0',
        rowBg: comp ? 'rgba(0,255,157,.06)' : '#14141d',
        rowBorder: comp ? '1px solid rgba(0,255,157,.3)' : '1px solid rgba(255,255,255,.07)',
        onOpen: () => this.openCountry(i)
      };
    });

    const ci = s.selCountry;
    const co = App.COUNTRIES[ci] || { n: '', f: '' };
    const cOwned = App.ownedCountFor(ci);
    const cComplete = cOwned >= 26;
    const countryCards = this.genPlayers(ci).map(p => ({
      name: p.name, pos: p.pos, numLabel: '#' + p.num, owned: p.owned, locked: !p.owned,
      rarityColor: App.RC[p.rar], rarityLabel: p.rar.toUpperCase(),
      glow: App.RGLOW[p.rar]
    }));

    return {
      setsDone, setsTotal: C.length,
      setsPctW: Math.round(setsDone / C.length * 100) + '%',
      albumSets,
      // profile "Album collection" line reuses these
      albumOwned: setsDone, albumTotal: C.length,
      albumPctW: Math.round(setsDone / C.length * 100) + '%',
      // country detail
      backToAlbum: this.backToAlbum,
      countryName: co.n, countryFlag: co.f,
      cOwned, cComplete,
      cPctW: Math.round(cOwned / 26 * 100) + '%',
      countryCards,
      championName: co.n.toUpperCase() + ' CHAMPION'
    };
  }

  packVals() {
    const s = this.state;
    const pk = App.PACKS[s.packTier];
    const tier = s.packTier;
    const torn = s.packPhase !== 'closed';
    const n = pk.cards.length;
    const sizeFor = (cnt) => cnt <= 1 ? { w:170, h:232 } : cnt === 2 ? { w:148, h:204 } : cnt === 3 ? { w:106, h:146 } : cnt === 4 ? { w:104, h:142 } : { w:94, h:130 };
    const sz = sizeFor(n);
    const cards = pk.cards.map((c, i) => {
      const open = i < s.packRevealed;
      const isActive = i === s.packRevealed - 1 && s.packPhase !== 'done';
      const isHead = s.packPhase === 'done' && (c.rarity === 'legendary' || c.rarity === 'epic') && i === n - 1;
      return {
        pos: c.pos, ovr: c.ovr, numLabel: '#' + c.num,
        rarityColor: App.RC[c.rarity], rarityLabel: c.rarity.toUpperCase(),
        glow: open ? App.RGLOW[c.rarity] : 'transparent',
        w: sz.w + 'px', h: sz.h + 'px',
        flip: open ? 'rotateY(0deg)' : 'rotateY(180deg)',
        emph: isHead ? 'scale(1.12)' : (isActive ? 'scale(1.06)' : 'scale(1)'),
        shown: torn ? 1 : 0
      };
    });
    const labelWords = pk.label.split(' ');
    const shimmerOn = pk.intensity >= 2 && !torn;
    const shSpeed = tier === 'legendary' ? '1.6s' : (tier === 'epic' ? '2.1s' : '2.8s');
    let statusText, statusColor;
    if (s.packPhase === 'closed') { statusText = 'Tap the pack to tear it open'; statusColor = '#8a8a9c'; }
    else if (s.packPhase === 'tearing') { statusText = 'Tearing open…'; statusColor = pk.color; }
    else if (s.packPhase === 'revealing') { statusText = 'Revealing ' + s.packRevealed + ' / ' + n + '…'; statusColor = '#cfcfe0'; }
    else { statusText = tier === 'legendary' ? '★  YOU PULLED A LEGENDARY!' : ('Nice pull — ' + n + (n > 1 ? ' cards' : ' card') + ' unlocked'); statusColor = pk.color; }
    return {
      showPack: s.screen === 'pack',
      packBack: this.packBack,
      pkStreak: pk.streak, pkGuarantee: pk.guarantee, pkColor: pk.color,
      pkLabelA: labelWords[0], pkLabelB: labelWords[1] || '',
      pkGlowColor: pk.glow,
      pkGlowOpacity: torn ? (0.35 + pk.intensity * 0.13) : (0.18 + pk.intensity * 0.09),
      pkOnOpen: this.packStart, pkOnDown: this.packDown, pkOnMove: this.packMove, pkOnUp: this.packUp,
      pkCoverPE: torn ? 'none' : 'auto',
      pkCoverOpacity: torn ? 0 : 1,
      pkTopCover: torn ? 'translateY(-78%) rotate(-7deg)' : 'translateY(0) rotate(0)',
      pkBottomCover: torn ? 'translateY(82%) rotate(6deg)' : 'translateY(0) rotate(0)',
      pkWiggle: s.packPhase === 'closed' ? 'packWiggle 2.8s ease-in-out infinite' : 'none',
      pkShimmerOpacity: shimmerOn ? 1 : 0,
      pkShimmerAnim: shimmerOn ? ('shimmer ' + shSpeed + ' linear infinite') : 'none',
      packCards: cards,
      pkCardsOpacity: torn ? 1 : 0,
      pkShowBurst: s.packPhase === 'done' && pk.intensity >= 3,
      pkStatusText: statusText, pkStatusColor: statusColor,
      pkShowDone: s.packPhase === 'done',
      pkOnAdd: this.packAddToAlbum, pkOnReset: this.packReset,
      pkToastText: s.packToast || '',
      pkToastY: s.packToast ? 0 : 14,
      pkToastOpacity: s.packToast ? 1 : 0
    };
  }

  renderVals() {
    const s = this.state;
    const raw = s.cards[s.index];
    const stake = s.stake;
    const yesPct = Math.round(raw.yes * 100);
    const noPct = 100 - yesPct;
    const card = Object.assign({}, raw, {
      yesPct, noPct, yesCents: yesPct, noCents: noPct,
      yesWin: stake > 0 ? Math.round(stake / raw.yes) : 0,
      noWin: stake > 0 ? Math.round(stake / (1 - raw.yes)) : 0,
      windowLabel: Math.round(raw.windowSec / 60) + ' MIN',
      scoreStr: raw.hs + ' : ' + raw.as
    });

    const { drag, exiting, exit } = s;
    let tx, ty, rot;
    if (exiting) { tx = exit.x; ty = exit.y; rot = exit.r; }
    else { tx = drag.x; ty = drag.y; rot = drag.x * 0.05; }
    const topTransform = 'translate3d(' + tx + 'px,' + ty + 'px,0) rotate(' + rot + 'deg)';
    const topTransition = exiting
      ? 'transform .4s cubic-bezier(.36,0,.2,1), opacity .4s ease'
      : (drag.active ? 'transform 0s' : 'transform .5s cubic-bezier(.22,1,.3,1)');
    const topOpacity = exiting ? 0 : 1;

    const clamp = (v) => Math.max(0, Math.min(1, v));
    const yesStamp = exiting === 'yes' ? 1 : clamp(drag.x / 110);
    const noStamp = exiting === 'no' ? 1 : clamp(-drag.x / 110);
    const skipStamp = exiting === 'skip' ? 1 : clamp(-drag.y / 110);

    const t = s.timer || 0;
    const timerStr = String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');

    const matches = s.matches.map(m => {
      const active = m.id === raw.matchId;
      return Object.assign({}, m, {
        active,
        scoreStr: m.hs + '–' + m.as,
        chipBg: active ? 'rgba(0,255,157,.08)' : '#13131f',
        chipBorder: active ? '1px solid rgba(0,255,157,.5)' : '1px solid rgba(255,255,255,.07)',
        onSelect: () => this.jumpToMatch(m.id)
      });
    });

    // ---- bottom sheet ----
    const sheet = s.sheet;
    const sheetOpen = !!sheet;
    const sSide = sheet ? sheet.side : 'yes';
    const price = sSide === 'yes' ? raw.yes : (1 - raw.yes);
    const sheetAccent = sSide === 'yes' ? '#00ff9d' : '#ff3d6e';
    const sheetAccentSoft = sSide === 'yes' ? 'rgba(0,255,157,.12)' : 'rgba(255,61,110,.12)';
    const sheetAccentBorder = sSide === 'yes' ? 'rgba(0,255,157,.45)' : 'rgba(255,61,110,.45)';
    const presets = [10, 20, 50, 100].map(v => ({
      v, label: '$' + v,
      bg: s.stake === v ? sheetAccentSoft : 'rgba(255,255,255,.04)',
      border: s.stake === v ? '1px solid ' + sheetAccentBorder : '1px solid rgba(255,255,255,.08)',
      color: s.stake === v ? sheetAccent : '#cfcfe0',
      onClick: () => this.setStake(v)
    }));
    const slideMaxR = (this._trackW || 320) - 56;
    const slideProgress = clamp((s.slideX || 0) / slideMaxR);

    // ---- undo ----
    const undo = s.undo;
    const undoOpen = !!undo;
    const undoText = undo ? ('✓  Position placed · $' + undo.stake + ' on ' + (undo.side === 'yes' ? 'YES' : 'NO')) : '';

    // ---- positions / result / drop ----
    const shortHex = (h) => h ? (h.slice(0, 10) + '…' + h.slice(-6)) : '';
    const mmss = (n) => String(Math.floor(Math.max(0, n) / 60)).padStart(2, '0') + ':' + String(Math.max(0, n) % 60).padStart(2, '0');
    const positionsList = s.positions;
    const activeCount = positionsList.filter(p => p.status === 'pending').length;
    const atStake = positionsList.filter(p => p.status === 'pending').reduce((a, p) => a + p.stake, 0);
    const enrich = (p) => {
      const potential = Math.round(p.stake / p.price);
      const v = Object.assign({}, p, {
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
      v.onSettle = () => this.settle(p.id);
      v.onOpen = () => this.openResult(v);
      return v;
    };
    const positionsView = positionsList.map(enrich);
    const historyView = s.history.map(enrich);
    const sel = s.selObj || positionsList[0] || {};
    const selWon = sel.status === 'won';
    const selPayout = sel.price ? Math.round(sel.stake / sel.price) : 0;
    const rc = sel.receipt || {};

    const toastShow = !!s.toast;

    // ---- profile / arena stats (real user data when logged in, seeded otherwise) ----
    const prof = s.profile;
    const money = (n) => '$' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const signed = (n) => (Number(n) >= 0 ? '+$' : '−$') + Math.abs(Math.round(Number(n) || 0)).toLocaleString('en-US');
    const balanceStr = prof ? money(prof.balanceUsdc) : '$1,240.50';
    const arenaStreak = prof ? prof.currentStreak : 7;
    const profWinRate = (prof ? Math.round(prof.winRate) : 61) + '%';
    const profBestStreak = '🔥 ' + (prof ? prof.bestStreak : 14);
    const profPredictions = prof ? prof.totalPredictions : 128;
    const profPnl = prof ? signed(prof.netPnl) : '+$640';
    const profPnlColor = (prof && prof.netPnl < 0) ? '#ff3d6e' : '#00ff9d';
    const profName = (prof && prof.username) ? prof.username
      : (prof && prof.walletAddress ? ('DEGEN_' + prof.walletAddress.slice(-2).toUpperCase()) : 'DEGEN_07');
    const profStreakLine = '🔥 ' + (prof ? prof.currentStreak : 7) + '-win streak';
    const profWalletAddr = (prof && prof.walletAddress)
      ? (prof.walletAddress.slice(0, 4) + '…' + prof.walletAddress.slice(-4))
      : '7xKp…9fA2';

    return {
      // nav + positions
      goPositions: this.goPositions,
      goArena: this.goArena,
      hasActive: activeCount > 0,
      activeCount,
      atStakeStr: '$' + atStake,
      showPositions: s.screen === 'positions',
      showResult: s.screen === 'result',
      positionsView,
      // result
      selQ: sel.q || '',
      selMatch: sel.mLabel || '',
      selSideLabel: sel.side === 'yes' ? 'YES' : 'NO',
      selSideColor: sel.side === 'yes' ? '#00ff9d' : '#ff3d6e',
      selStakeStr: '$' + (sel.stake || 0),
      selPriceCents: Math.round((sel.price || 0) * 100),
      selOutcomeLabel: selWon ? 'YOU WON' : 'DIDN’T HIT',
      selPayoutStr: selWon ? ('+$' + selPayout) : ('−$' + (sel.stake || 0)),
      selPayoutColor: selWon ? '#00ff9d' : '#ff3d6e',
      selGlow: selWon ? 'rgba(0,255,157,.16)' : 'rgba(255,61,110,.13)',
      selStat: sel.stat || '',
      selStatMin: sel.statMin || 0,
      rcRoot: shortHex(rc.root), rcLeaf: shortHex(rc.leaf),
      rcN1: shortHex(rc.n1), rcN2: shortHex(rc.n2), rcSig: shortHex(rc.sig),
      rcSlot: rc.slot || 0,
      selRare: selWon && !!sel.rare,
      onClaim: this.goDrop,
      onResultBack: this.goPositions,
      // drop
      dropOpen: s.dropOpen,
      dropPlayer: sel.player || 'WORLD CUP MOMENT',
      dropMoment: sel.moment || 'Rare live moment',
      dropMatch: sel.mLabel || '',
      closeDrop: this.closeDrop,

      // ---- app screens ----
      showSplash: s.screen === 'splash',
      showConnect: s.screen === 'connect',
      showMatches: s.screen === 'matches',
      showAlbum: s.screen === 'album',
      showCountry: s.screen === 'country',
      showLeaderboard: s.screen === 'leaderboard',
      showProfile: s.screen === 'profile',
      showHistory: s.screen === 'history',
      onConnect: this.goConnect,
      goSplash: this.goSplash,
      goAlbum: this.goAlbum,
      goLeaderboard: this.goLeaderboard,
      goProfile: this.goProfile,
      goMatches: this.goMatches,
      openHistory: this.openHistory,
      historyView,
      ...this.packVals(),
      packTotal: [{t:'common',c:3},{t:'uncommon',c:1},{t:'rare',c:2},{t:'epic',c:1},{t:'legendary',c:1}].reduce((a,p)=>a+p.c,0),
      packsView: (() => {
        const TC = { common:'#9aa0b0', uncommon:'#00ff9d', rare:'#26a0ff', epic:'#b026ff', legendary:'#ffcf4d' };
        const TG = { common:'rgba(154,160,176,.2)', uncommon:'rgba(0,255,157,.22)', rare:'rgba(38,160,255,.28)', epic:'rgba(176,38,255,.3)', legendary:'rgba(255,207,77,.4)' };
        const inv = [{t:'common',c:3},{t:'uncommon',c:1},{t:'rare',c:2},{t:'epic',c:1},{t:'legendary',c:1}];
        return inv.map(p => ({
          tier:p.t, count:p.c, label:p.t.toUpperCase() + ' PACK',
          color:TC[p.t], glow:TG[p.t],
          bg:'linear-gradient(160deg,#16161f,#101019)',
          border:'1px solid ' + TC[p.t].replace(')', '')+'55',
          onOpen: () => this.openPackTier(p.t)
        }));
      })(),
      walletAddr: profWalletAddr,
      balanceStr, arenaStreak,
      profWinRate, profBestStreak, profPredictions, profPnl, profPnlColor, profName, profStreakLine,
      wallets: App.WALLETS.map(w => {
        const guest = w.name === 'Devnet Guest';
        const detected = guest ? true : (window.SNR ? window.SNR.walletAvailable(w.name) : false);
        const tag = guest ? 'Free' : (detected ? 'Detected' : 'Install');
        return Object.assign({}, w, {
          isConnecting: s.connecting === w.name,
          showTag: !!tag && s.connecting !== w.name,
          tag,
          rowOpacity: (s.connecting && s.connecting !== w.name) ? 0.45 : 1,
          onClick: () => this.connectWallet(w.name)
        });
      }),
      connectFooter: s.connectError || 'By connecting you agree this is a devnet demo.',
      connectFooterColor: s.connectError ? '#ff6b8a' : '#6a6a7c',
      matchesView: (s.matchesFull || App.MATCHES_FULL).map(m => Object.assign({}, m, {
        live: m.live, upcoming: !m.live,
        scoreOrTime: m.live ? (m.hs + ' : ' + m.as) : 'vs',
        marketsLabel: m.live ? (m.markets ? (m.markets + ' markets') : 'Live markets') : 'Pre-match',
        phaseLabel: m.phase,
        onSelect: () => this.selectMatch(m.id)
      })),
      ...this.albumVals(),
      leadersView: (s.leaders || App.LEADERS).map(l => Object.assign({}, l, {
        initial: l.name.charAt(0).toUpperCase(),
        rowBg: l.you ? 'rgba(0,255,157,.08)' : '#14141d',
        rowBorder: l.you ? '1px solid rgba(0,255,157,.4)' : '1px solid rgba(255,255,255,.06)',
        rankColor: l.rank <= 3 ? '#ffcf4d' : '#7a7a8c',
        nameColor: l.you ? '#00ff9d' : '#f4f4f8'
      })),
      card, matches, timerStr, stakeStr: '$' + stake,
      topTransform, topTransition, topOpacity,
      yesStamp, noStamp, skipStamp,
      onPointerDown: this.onPointerDown,
      onPointerMove: this.onPointerMove,
      onPointerUp: this.onPointerUp,
      decideNo: () => this.openSheet('no'),
      decideSkip: () => this.commitSkip(),
      decideYes: () => this.openSheet('yes'),

      // sheet
      scrimOpacity: sheetOpen ? 1 : 0,
      scrimPE: sheetOpen ? 'auto' : 'none',
      sheetY: sheetOpen ? '0%' : '112%',
      sheetSideLabel: sSide === 'yes' ? 'YES' : 'NO',
      sheetQ: raw.q,
      sheetAccent, sheetAccentSoft, sheetAccentBorder,
      sheetPriceCents: Math.round(price * 100),
      sheetWin: stake > 0 ? Math.round(stake / price) : 0,
      stake,
      presets,
      closeSheet: this.closeSheet,
      onStakeInput: this.onStakeInput,
      onSlideDown: this.onSlideDown,
      onSlideMove: this.onSlideMove,
      onSlideUp: this.onSlideUp,
      slideX: s.slideX || 0,
      slideFillPx: ((s.slideX || 0) + 53) + 'px',
      slideTransition: s.sliding ? 'transform 0s' : 'transform .25s ease',
      slideLabelOpacity: 1 - slideProgress,

      // undo
      undoText,
      undoY: undoOpen ? 0 : 16,
      undoOpacity: undoOpen ? 1 : 0,
      undoPE: undoOpen ? 'auto' : 'none',
      doUndo: this.doUndo,

      // skip toast
      toastText: s.toast || '',
      toastY: toastShow ? 0 : 16,
      toastOpacity: toastShow ? 1 : 0
    };
  }

  // The dc-runtime called renderVals() and rendered the template against it.
  // Here render() does the same, passing the vals object down to each screen.
  render() {
    const v = this.renderVals();
    return (
      <div style={{ minHeight: "100dvh", width: "100%", background: "#07070b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "480px", height: "100dvh", background: "#0a0a0f", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 20px 8px" }}>
            <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "19px", letterSpacing: ".6px", color: "#f4f4f8", whiteSpace: "nowrap" }}>
              {"SWIPE "}
              <span style={{ color: "#ff3d6e" }}>
                N REKT
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button onClick={v.goPositions} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "11px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", cursor: "pointer", color: "#cfcfe0" }}>
                <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                  <path d="M4 6.5h14M4 11h14M4 15.5h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                {v.hasActive ? (
                  <>
                  <span style={{ position: "absolute", top: "-6px", right: "-6px", minWidth: "18px", height: "18px", borderRadius: "9px", background: "#00ff9d", color: "#07070b", fontSize: "10px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                    {v.activeCount}
                  </span>
                  </>
                ) : null}
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "20px", padding: "5px 11px", fontSize: "10px", fontWeight: "600", letterSpacing: "1px", color: "#8a8a9c" }}>
                <span style={{ color: "#00ff9d" }}>
                  ◎
                </span>
                {" DEVNET "}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", padding: "2px 16px 10px", flexShrink: "0" }}>
            {(v.matches || []).map((m, m__i) => (
              <React.Fragment key={m?.id ?? m__i}>
                <div onClick={m.onSelect} style={{ flexShrink: "0", cursor: "pointer", borderRadius: "13px", padding: "8px 12px", background: m.chipBg, border: m.chipBorder, display: "flex", flexDirection: "column", gap: "3px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#f4f4f8" }}>
                    <span style={{ fontSize: "13px" }}>
                      {m.hf}
                    </span>
                    <span style={{ fontWeight: "700" }}>
                      {m.home}
                    </span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontWeight: "700", color: "#cfcfe0" }}>
                      {m.scoreStr}
                    </span>
                    <span style={{ fontWeight: "700" }}>
                      {m.away}
                    </span>
                    <span style={{ fontSize: "13px" }}>
                      {m.af}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", color: "#7a7a8c", fontFamily: "'Space Mono',monospace" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ff3d6e", animation: "snrPulse 1.4s infinite" }} />
                    {m.min}{"' "}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div style={{ flex: "1", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 24px 0", minHeight: "0" }}>
            <div style={{ position: "absolute", width: "calc(100% - 48px)", height: "452px", borderRadius: "28px", background: "#101019", border: "1px solid rgba(255,255,255,.05)", transform: "scale(.88) translateY(34px)", zIndex: "0" }} />
            <div style={{ position: "absolute", width: "calc(100% - 48px)", height: "452px", borderRadius: "28px", background: "#15151f", border: "1px solid rgba(255,255,255,.06)", transform: "scale(.94) translateY(17px)", zIndex: "1" }} />
            <div onPointerDown={v.onPointerDown} onPointerMove={v.onPointerMove} onPointerUp={v.onPointerUp} onPointerCancel={v.onPointerUp} style={{ position: "relative", width: "100%", height: "452px", borderRadius: "28px", overflow: "hidden", background: "linear-gradient(165deg,#1c1c2b 0%,#0f0f18 100%)", border: "1px solid rgba(255,255,255,.1)", boxShadow: "0 26px 64px rgba(0,0,0,.6)", display: "flex", flexDirection: "column", padding: "24px 20px 20px", zIndex: "3", touchAction: "none", cursor: "grab", willChange: "transform", transform: v.topTransform, transition: v.topTransition, opacity: v.topOpacity }}>
              <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "4px", background: "linear-gradient(90deg,#00ff9d,#ff3d6e)" }} />
              <div style={{ position: "absolute", inset: "0", background: "rgba(0,255,157,.16)", pointerEvents: "none", zIndex: "4", opacity: v.yesStamp }} />
              <div style={{ position: "absolute", inset: "0", background: "rgba(255,61,110,.16)", pointerEvents: "none", zIndex: "4", opacity: v.noStamp }} />
              <div style={{ position: "absolute", inset: "0", background: "rgba(150,150,180,.14)", pointerEvents: "none", zIndex: "4", opacity: v.skipStamp }} />
              <div style={{ position: "absolute", top: "30px", left: "22px", zIndex: "6", transform: "rotate(-16deg)", fontFamily: "'Anton',sans-serif", fontSize: "34px", letterSpacing: "2px", color: "#00ff9d", border: "4px solid #00ff9d", borderRadius: "10px", padding: "2px 14px", opacity: v.yesStamp }}>
                YES
              </div>
              <div style={{ position: "absolute", top: "30px", right: "22px", zIndex: "6", transform: "rotate(16deg)", fontFamily: "'Anton',sans-serif", fontSize: "34px", letterSpacing: "2px", color: "#ff3d6e", border: "4px solid #ff3d6e", borderRadius: "10px", padding: "2px 14px", opacity: v.noStamp }}>
                NO
              </div>
              <div style={{ position: "absolute", top: "36px", left: "50%", marginLeft: "-52px", zIndex: "6", transform: "rotate(-5deg)", fontFamily: "'Anton',sans-serif", fontSize: "30px", letterSpacing: "3px", color: "#9a9ab0", border: "4px solid #9a9ab0", borderRadius: "10px", padding: "2px 14px", opacity: v.skipStamp }}>
                SKIP
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: "2" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,.05)", borderRadius: "9px", padding: "6px 10px", fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: "700", color: "#e6e6f0" }}>
                  <span style={{ color: "#ff3d6e" }}>
                    ⏱
                  </span>
                  {v.timerStr}
                  <span style={{ color: "#6a6a7c", fontWeight: "400" }}>
                    {"· "}{v.card.windowLabel}
                  </span>
                </div>
                <div style={{ background: "rgba(0,255,157,.1)", border: "1px solid rgba(0,255,157,.25)", borderRadius: "9px", padding: "5px 10px", fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", color: "#00ff9d" }}>
                  {v.card.cat}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "11px", marginTop: "18px", position: "relative", zIndex: "2" }}>
                <span style={{ fontSize: "22px" }}>
                  {v.card.hf}
                </span>
                <span style={{ fontFamily: "'Anton',sans-serif", fontSize: "21px", color: "#f4f4f8" }}>
                  {v.card.home}
                </span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "24px", fontWeight: "700", color: "#fff", letterSpacing: "1px" }}>
                  {v.card.scoreStr}
                </span>
                <span style={{ fontFamily: "'Anton',sans-serif", fontSize: "21px", color: "#f4f4f8" }}>
                  {v.card.away}
                </span>
                <span style={{ fontSize: "22px" }}>
                  {v.card.af}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", marginTop: "5px", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#7a7a8c", position: "relative", zIndex: "2" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ff3d6e", animation: "snrPulse 1.4s infinite" }} />
                {v.card.min}{"' · 2ND HALF "}
              </div>
              <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: "2" }}>
                <h2 style={{ margin: "0", fontFamily: "'Anton',sans-serif", fontSize: "31px", lineHeight: "1.02", letterSpacing: ".3px", color: "#fff", textAlign: "center", textWrap: "balance" }}>
                  {v.card.q}
                </h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", fontSize: "12px", color: "#8a8a9c", textAlign: "center", marginBottom: "14px", position: "relative", zIndex: "2" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ff9d", flexShrink: "0" }} />
                {v.card.ctx}{" "}
              </div>
              <div style={{ position: "relative", zIndex: "2" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono',monospace", fontSize: "11px", marginBottom: "5px" }}>
                  <span style={{ color: "#ff3d6e" }}>
                    {"NO "}{v.card.noPct}%
                  </span>
                  <span style={{ color: "#00ff9d" }}>
                    {v.card.yesPct}% YES
                  </span>
                </div>
                <div style={{ height: "9px", borderRadius: "6px", background: "#ff3d6e", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#00ff9d", width: `${v.card.yesPct}%` }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "14px", position: "relative", zIndex: "2" }}>
                <div style={{ flex: "1", background: "rgba(255,61,110,.08)", border: "1px solid rgba(255,61,110,.28)", borderRadius: "14px", padding: "11px 13px", display: "flex", flexDirection: "column", gap: "2px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#ff3d6e" }}>
                    ← NO
                  </div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: "700", color: "#fff" }}>
                    {v.card.noCents}¢
                  </div>
                  <div style={{ fontSize: "11px", color: "#7a7a8c" }}>
                    {v.stakeStr}{" → $"}{v.card.noWin}
                  </div>
                </div>
                <div style={{ flex: "1", background: "rgba(0,255,157,.08)", border: "1px solid rgba(0,255,157,.28)", borderRadius: "14px", padding: "11px 13px", display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-end", textAlign: "right" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#00ff9d" }}>
                    YES →
                  </div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: "700", color: "#fff" }}>
                    {v.card.yesCents}¢
                  </div>
                  <div style={{ fontSize: "11px", color: "#7a7a8c" }}>
                    {v.stakeStr}{" → $"}{v.card.yesWin}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 26px 0", flexShrink: "0" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#6a6a7c", fontWeight: "600" }}>
                BALANCE
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "15px", fontWeight: "700", color: "#fff" }}>
                {v.balanceStr}{" "}
                <span style={{ fontSize: "10px", color: "#00ff9d" }}>
                  USDC
                </span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", alignItems: "flex-end" }}>
              <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#6a6a7c", fontWeight: "600" }}>
                STREAK
              </div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>
                {"🔥 "}{v.arenaStreak}{" "}
                <span style={{ fontSize: "10px", color: "#7a7a8c", fontWeight: "500" }}>
                  wins
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "24px", padding: "14px 0 12px", flexShrink: "0" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
              <button onClick={v.decideNo} style={{ width: "62px", height: "62px", borderRadius: "50%", border: "none", background: "#ff3d6e", color: "#0a0a0f", fontSize: "26px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 22px rgba(255,61,110,.32)" }} className="snr-press">
                ✕
              </button>
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: "#ff6b8a" }}>
                NO
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
              <button onClick={v.decideSkip} style={{ width: "58px", height: "58px", borderRadius: "50%", border: "2px solid rgba(255,255,255,.28)", background: "#1c1c28", color: "#dcdce6", fontSize: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }} className="snr-press">
                ⏭
              </button>
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: "#9a9ab0" }}>
                SKIP
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
              <button onClick={v.decideYes} style={{ width: "62px", height: "62px", borderRadius: "50%", border: "none", background: "#00ff9d", color: "#07070b", fontSize: "26px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 22px rgba(0,255,157,.32)" }} className="snr-press">
                ✓
              </button>
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: "#3df0b0" }}>
                YES
              </span>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "100px", left: "50%", marginLeft: "-110px", width: "220px", textAlign: "center", background: "#1b1b2b", border: "1px solid rgba(255,255,255,.12)", borderRadius: "12px", padding: "10px 16px", fontSize: "13px", fontWeight: "600", color: "#f4f4f8", boxShadow: "0 12px 30px rgba(0,0,0,.5)", zIndex: "40", pointerEvents: "none", transition: "transform .25s ease,opacity .25s ease", transform: `translateY(${v.toastY}px)`, opacity: v.toastOpacity }}>
            {v.toastText}
          </div>
          <div style={{ position: "absolute", bottom: "100px", left: "50%", marginLeft: "-167px", width: "334px", zIndex: "42", transition: "transform .25s ease,opacity .25s ease", transform: `translateY(${v.undoY}px)`, opacity: v.undoOpacity, pointerEvents: v.undoPE }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", background: "#1b1b2b", border: "1px solid rgba(255,255,255,.14)", borderRadius: "12px", padding: "11px 12px 11px 15px", boxShadow: "0 12px 30px rgba(0,0,0,.55)" }}>
              <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#f4f4f8", whiteSpace: "nowrap" }}>
                {v.undoText}
              </span>
              <button onClick={v.doUndo} style={{ flexShrink: "0", background: "rgba(0,255,157,.12)", border: "1px solid rgba(0,255,157,.4)", borderRadius: "8px", color: "#00ff9d", fontSize: "12px", fontWeight: "700", cursor: "pointer", letterSpacing: ".5px", padding: "6px 12px" }}>
                UNDO
              </button>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid rgba(255,255,255,.07)", background: "rgba(10,10,16,.92)", backdropFilter: "blur(12px)", padding: "9px 0 18px", flexShrink: "0", position: "relative" }}>
            <div onClick={v.goArena} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#00ff9d" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="3" y="6" width="11" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" opacity=".45" />
                <rect x="8" y="3" width="11" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
              </svg>
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".3px" }}>
                Arena
              </span>
            </div>
            <div onClick={v.goAlbum} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#55555f" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="4" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
                <rect x="12" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
                <rect x="4" y="12" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
                <rect x="12" y="12" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".3px" }}>
                Album
              </span>
            </div>
            <div onClick={v.goLeaderboard} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#55555f" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="3" y="12" width="4" height="6" rx="1" fill="currentColor" />
                <rect x="9" y="8" width="4" height="10" rx="1" fill="currentColor" />
                <rect x="15" y="4" width="4" height="14" rx="1" fill="currentColor" />
              </svg>
              <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".3px" }}>
                Ranking
              </span>
            </div>
            <div onClick={v.goProfile} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", color: "#55555f" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4.5 18.5a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".3px" }}>
                Profile
              </span>
            </div>
            <div style={{ position: "absolute", bottom: "7px", left: "50%", transform: "translateX(-50%)", width: "128px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,.22)" }} />
          </div>
          <div onClick={v.closeSheet} style={{ position: "absolute", inset: "0", zIndex: "30", background: "rgba(4,4,8,.62)", transition: "opacity .3s ease", opacity: v.scrimOpacity, pointerEvents: v.scrimPE }} />
          <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", zIndex: "31", background: "#13131d", borderTop: "1px solid rgba(255,255,255,.08)", borderRadius: "26px 26px 0 0", boxShadow: "0 -20px 50px rgba(0,0,0,.55)", padding: "10px 20px 26px", transition: "transform .34s cubic-bezier(.3,1,.3,1)", transform: `translateY(${v.sheetY})` }}>
            <div style={{ width: "40px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,.18)", margin: "4px auto 16px" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "0" }}>
                <span style={{ flexShrink: "0", fontFamily: "'Anton',sans-serif", fontSize: "15px", letterSpacing: "1px", color: "#07070b", background: v.sheetAccent, borderRadius: "8px", padding: "4px 11px" }}>
                  {v.sheetSideLabel}
                </span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#f4f4f8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {v.sheetQ}
                </span>
              </div>
              <button onClick={v.closeSheet} style={{ flexShrink: "0", width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(255,255,255,.12)", background: "transparent", color: "#9a9ab0", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✕
              </button>
            </div>
            <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#6a6a7c", fontWeight: "600", marginBottom: "7px" }}>
              YOUR STAKE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", padding: "11px 16px", marginBottom: "12px" }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "26px", fontWeight: "700", color: "#fff" }}>
                $
              </span>
              <input value={v.stake} onInput={v.onStakeInput} inputMode="numeric" style={{ flex: "1", minWidth: "0", background: "transparent", border: "none", outline: "none", color: "#fff", fontFamily: "'Space Mono',monospace", fontSize: "26px", fontWeight: "700", padding: "0" }} />
              <span style={{ color: "#7a7a8c", fontSize: "17px" }}>
                ✎
              </span>
              <span style={{ color: "#6a6a7c", fontSize: "11px", letterSpacing: ".5px", marginLeft: "2px" }}>
                USDC
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
              {(v.presets || []).map((p, p__i) => (
                <React.Fragment key={p?.id ?? p__i}>
                  <button onClick={p.onClick} style={{ flex: "1", cursor: "pointer", borderRadius: "11px", padding: "9px 0", fontFamily: "'Space Mono',monospace", fontSize: "14px", fontWeight: "700", background: p.bg, border: p.border, color: p.color }}>
                    {p.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,.03)", borderRadius: "14px", padding: "13px 16px", marginBottom: "18px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600" }}>
                  PRICE
                </span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "15px", fontWeight: "700", color: "#cfcfe0" }}>
                  {v.sheetPriceCents}¢
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-end" }}>
                <span style={{ fontSize: "10px", letterSpacing: "1px", color: "#6a6a7c", fontWeight: "600" }}>
                  WIN →
                </span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "24px", fontWeight: "700", color: v.sheetAccent }}>
                  ${v.sheetWin}
                </span>
              </div>
            </div>
            <div data-slidetrack="1" style={{ position: "relative", height: "56px", borderRadius: "16px", background: v.sheetAccentSoft, border: `1px solid ${v.sheetAccentBorder}`, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: v.slideFillPx, background: v.sheetAccentSoft }} />
              <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", letterSpacing: ".5px", color: v.sheetAccent, opacity: v.slideLabelOpacity, pointerEvents: "none" }}>
                Slide to confirm →
              </div>
              <div onPointerDown={v.onSlideDown} onPointerMove={v.onSlideMove} onPointerUp={v.onSlideUp} onPointerCancel={v.onSlideUp} style={{ position: "absolute", left: "3px", top: "3px", width: "50px", height: "50px", borderRadius: "13px", background: v.sheetAccent, color: "#07070b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "700", cursor: "grab", touchAction: "none", transform: `translateX(${v.slideX}px)`, transition: v.slideTransition }}>
                →
              </div>
            </div>
          </div>
          {v.showPositions ? <Positions v={v} /> : null}
          {v.showResult ? <Result v={v} /> : null}
          {v.dropOpen ? (
            <>
            <div style={{ position: "absolute", inset: "0", zIndex: "45", background: "radial-gradient(circle at 50% 36%, rgba(255,207,77,.18), rgba(7,7,11,.97) 62%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px" }}>
              <div style={{ fontSize: "12px", letterSpacing: "3px", fontWeight: "700", color: "#ffcf4d", marginBottom: "18px", animation: "snrPulse 1.6s infinite" }}>
                ★ RARE MOMENT UNLOCKED ★
              </div>
              <div style={{ width: "236px", borderRadius: "20px", overflow: "hidden", border: "2px solid #ffcf4d", boxShadow: "0 0 70px rgba(255,207,77,.45)", background: "linear-gradient(#1b1810,#100e0a)", animation: "dropIn .6s cubic-bezier(.2,1.25,.3,1) both" }}>
                <div style={{ height: "196px", position: "relative", background: "repeating-linear-gradient(45deg,#2a2616,#2a2616 11px,#221f12 11px,#221f12 22px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "1px", color: "#6e6650" }}>
                    MOMENT&nbsp;CLIP
                  </span>
                  <span style={{ position: "absolute", top: "11px", right: "11px", fontSize: "9px", fontWeight: "700", letterSpacing: "1px", color: "#1a1406", background: "#ffcf4d", borderRadius: "6px", padding: "3px 8px" }}>
                    LEGENDARY
                  </span>
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "22px", color: "#fff", letterSpacing: ".4px" }}>
                    {v.dropPlayer}
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#a59a78", marginTop: "3px" }}>
                    {v.dropMoment}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", borderTop: "1px solid rgba(255,207,77,.18)", paddingTop: "10px" }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#cfcfe0" }}>
                      #024 / 250
                    </span>
                    <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px", color: "#ffcf4d" }}>
                      cNFT · SOLANA
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "26px", width: "236px" }}>
                <button onClick={v.closeDrop} style={{ flex: "1", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "13px", color: "#f4f4f8", fontSize: "13px", fontWeight: "600", padding: "13px 0", cursor: "pointer" }}>
                  Add to Album
                </button>
                <button onClick={v.closeDrop} style={{ flex: "1", background: "#00ff9d", border: "none", borderRadius: "13px", color: "#07070b", fontSize: "13px", fontWeight: "700", padding: "13px 0", cursor: "pointer" }}>
                  Continue
                </button>
              </div>
            </div>
            </>
          ) : null}
          {v.showSplash ? <Splash v={v} /> : null}
          {v.showConnect ? <Connect v={v} /> : null}
          {v.showMatches ? <Matches v={v} /> : null}
          {v.showAlbum ? <Album v={v} /> : null}
          {v.showCountry ? <Country v={v} /> : null}
          {v.showLeaderboard ? <Leaderboard v={v} /> : null}
          {v.showProfile ? <Profile v={v} /> : null}
          {v.showHistory ? <History v={v} /> : null}
          {v.showPack ? <Pack v={v} /> : null}
        </div>
      </div>
    );
  }
}

export default App;
