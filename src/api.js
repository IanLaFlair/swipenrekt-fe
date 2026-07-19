// Swipe N Rekt — backend API client
// Wraps https://swipe-api.fachry.dev and maps its payloads onto the shapes the
// design component already renders. Attaches to window.SNR. No build step.
(() => {
  "use strict";

  // Relative base: requests go same-origin to /api and are proxied to the real
  // backend (Vite dev-server proxy locally, Vercel rewrite in prod). This makes
  // reads same-origin, so the backend's CORS allowlist never applies.
  const BASE = "/api";
  const LS_TOKEN = "snr_token";
  const LS_WALLET = "snr_wallet";
  const LS_NONCE = "snr_nonce";

  // ---- token + guest identity persistence ----
  const getToken = () => { try { return localStorage.getItem(LS_TOKEN) || null; } catch (_) { return null; } };
  const setToken = (t) => { try { t ? localStorage.setItem(LS_TOKEN, t) : localStorage.removeItem(LS_TOKEN); } catch (_) {} };

  const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  function randB58(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += B58[Math.floor(Math.random() * B58.length)];
    return s;
  }
  // A stable devnet-guest identity so the same browser is the same user across
  // reloads. Real Phantom signing is a separate workstream; this keeps the auth
  // flow functional end-to-end against the live backend.
  function guestIdentity() {
    let wallet, nonce;
    try {
      wallet = localStorage.getItem(LS_WALLET);
      nonce = localStorage.getItem(LS_NONCE);
    } catch (_) {}
    if (!wallet) { wallet = randB58(44); try { localStorage.setItem(LS_WALLET, wallet); } catch (_) {} }
    if (!nonce) { nonce = randB58(16); try { localStorage.setItem(LS_NONCE, nonce); } catch (_) {} }
    return { wallet, nonce };
  }

  // ---- low-level request ----
  async function req(method, path, { body, auth = false, query } = {}) {
    let url = BASE + path;
    if (query) {
      const qs = Object.entries(query)
        .filter(([, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
        .join("&");
      if (qs) url += "?" + qs;
    }
    const headers = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (auth) {
      const t = getToken();
      if (t) headers["Authorization"] = "Bearer " + t;
    }
    const res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
    let json = null;
    try { json = await res.json(); } catch (_) {}
    if (!res.ok) {
      const msg = json && (Array.isArray(json.message) ? json.message.join(", ") : json.message);
      const err = new Error(msg || ("Request failed (" + res.status + ")"));
      err.status = res.status;
      err.body = json;
      throw err;
    }
    return json;
  }

  // ---- endpoints (raw) ----
  const raw = {
    login: (walletAddress, nonce) => req("POST", "/auth/login", { body: { walletAddress, nonce } }),
    userInfo: () => req("GET", "/user/info", { auth: true }),
    leaderboard: (page = 1, limit = 10) => req("GET", "/user/leaderboard", { query: { page, limit } }),
    openPack: (userPackId) => req("POST", "/user/pack/open", { auth: true, body: { userPackId } }),
    bets: (page = 1, limit = 20) => req("GET", "/bets", { auth: true, query: { page, limit } }),
    // Records an already-placed on-chain bet: the backend verifies txSignature
    // against the proposition's on-chain market (amount/side/wallet) and derives
    // the stake from the verified transfer — no DB balance is touched.
    placeBet: (propositionId, pick, txSignature) => req("POST", "/bets", { auth: true, body: { propositionId, pick, txSignature } }),
    matches: (status = "live", page = 1, limit = 10) => req("GET", "/match", { query: { status, page, limit } }),
    liveMatches: () => req("GET", "/match/live"),
    propositions: (matchId, page = 1, limit = 20) => req("GET", "/proposition", { query: { match_id: matchId, page, limit } }),
    albums: (page = 1, limit = 20) => req("GET", "/album", { query: { page, limit } }),
    album: (id) => req("GET", "/album/" + encodeURIComponent(id))
  };

  // ---- mappers (API payload -> render shapes) ----
  const FLAGS = {
    argentina: "🇦🇷", brazil: "🇧🇷", france: "🇫🇷", spain: "🇪🇸", germany: "🇩🇪", portugal: "🇵🇹",
    netherlands: "🇳🇱", italy: "🇮🇹", belgium: "🇧🇪", croatia: "🇭🇷", uruguay: "🇺🇾", mexico: "🇲🇽",
    "united states": "🇺🇸", usa: "🇺🇸", canada: "🇨🇦", japan: "🇯🇵", "south korea": "🇰🇷", morocco: "🇲🇦",
    senegal: "🇸🇳", nigeria: "🇳🇬", ghana: "🇬🇭", cameroon: "🇨🇲", egypt: "🇪🇬", australia: "🇦🇺",
    england: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", colombia: "🇨🇴", ecuador: "🇪🇨", switzerland: "🇨🇭", denmark: "🇩🇰", poland: "🇵🇱"
  };
  // Proper 3-letter codes (initials are wrong for single-word names, e.g.
  // "France" -> "F"). Fall back to first 3 letters / word initials when unknown.
  const CODES = {
    argentina: "ARG", brazil: "BRA", france: "FRA", spain: "ESP", germany: "GER", portugal: "POR",
    netherlands: "NED", italy: "ITA", belgium: "BEL", croatia: "CRO", uruguay: "URU", mexico: "MEX",
    "united states": "USA", usa: "USA", canada: "CAN", japan: "JPN", "south korea": "KOR", morocco: "MAR",
    senegal: "SEN", nigeria: "NGA", ghana: "GHA", cameroon: "CMR", egypt: "EGY", australia: "AUS",
    england: "ENG", colombia: "COL", ecuador: "ECU", switzerland: "SUI", denmark: "DEN", poland: "POL"
  };
  function teamMeta(name) {
    const n = (name || "").trim();
    const key = n.toLowerCase();
    const flag = FLAGS[key] || "⚽";
    let code = CODES[key];
    if (!code) {
      const words = n.replace(/[^A-Za-z ]/g, "").split(/\s+/).filter(Boolean);
      code = ((words.length > 1 ? words.map(w => w[0]).join("") : n).slice(0, 3).toUpperCase()) || "???";
    }
    return { flag, code };
  }
  const num = (v) => (v === null || v === undefined || v === "" ? 0 : Number(v));

  // decimal odds (strings) -> demargined implied YES probability in [0,1]
  function impliedYes(oddsYes, oddsNo) {
    const oy = num(oddsYes), on = num(oddsNo);
    if (oy > 0 && on > 0) {
      const iy = 1 / oy, ino = 1 / on;
      return iy / (iy + ino);
    }
    if (oy > 0) return Math.min(0.99, Math.max(0.01, 1 / oy));
    return 0.5;
  }

  function mapMatch(m) {
    const h = teamMeta(m.teamHome), a = teamMeta(m.teamAway);
    const min = parseInt(m.matchMinute, 10);
    return {
      id: m.id,
      home: h.code, away: a.code, hf: h.flag, af: a.flag,
      homeName: m.teamHome || "", awayName: m.teamAway || "",
      hs: num(m.scoreHome), as: num(m.scoreAway),
      min: isNaN(min) ? 0 : min,
      phase: m.half || (m.status === "live" ? "Live" : (m.status || "")),
      live: (m.status || "").toLowerCase() === "live",
      status: m.status || ""
    };
  }

  // proposition -> swipe card matching the component's CARDS shape
  function mapProposition(p, match) {
    const m = match || {};
    const yes = impliedYes(p.oddsYes, p.oddsNo);
    let windowSec = 300;
    if (p.settlesAt) {
      const secs = Math.round((new Date(p.settlesAt).getTime() - Date.now()) / 1000);
      if (!isNaN(secs) && secs > 0) windowSec = Math.min(3600, Math.max(60, secs));
    }
    return {
      id: p.id,
      matchId: p.matchId,
      home: m.home || "", away: m.away || "", hf: m.hf || "⚽", af: m.af || "⚽",
      hs: m.hs || 0, as: m.as || 0, min: m.min || 0,
      matchStatus: m.status || "", matchLive: !!m.live, matchPhase: m.phase || "",
      q: (p.question || "").toUpperCase(),
      cat: (p.category || "MARKET").toUpperCase(),
      ctx: p.contextText || "",
      yes: Math.min(0.97, Math.max(0.03, yes)),
      oddsYes: num(p.oddsYes), oddsNo: num(p.oddsNo),
      status: p.status || "open",
      settlesAt: p.settlesAt || null,
      windowSec,
      // On-chain market bridge fields (backend-populated; null until Fachry
      // creates the market on-chain). When present, the frontend derives the
      // market PDA from these instead of hashing the proposition id.
      onChainFixtureId: p.onChainFixtureId,
      onChainStatKey: p.onChainStatKey,
      onChainThreshold: p.onChainThreshold,
      onChainComparison: p.onChainComparison,
      onChainWindowStart: p.onChainWindowStart,
      onChainWindowEnd: p.onChainWindowEnd,
      marketAddress: p.marketAddress || null
    };
  }

  // bet -> position/history row matching enrich() input
  function mapBet(b) {
    const p = b.proposition || {};
    const side = b.pick ? "yes" : "no";
    const price = b.pick ? impliedYes(p.oddsYes, p.oddsNo) : (1 - impliedYes(p.oddsYes, p.oddsNo));
    let status = "pending", outcome = "won";
    const st = (b.status || "").toLowerCase();
    if (st === "won" || st === "win") { status = "won"; outcome = "won"; }
    else if (st === "lost" || st === "lose") { status = "lost"; outcome = "lost"; }
    else if (p.outcome !== null && p.outcome !== undefined) {
      const win = b.pick === p.outcome;
      status = win ? "won" : "lost"; outcome = status;
    }
    return {
      id: b.id,
      mLabel: (p.matchId ? "" : "") + (p.question ? "" : ""), // filled below if we have match label
      q: (p.question || "").toUpperCase(),
      side, stake: num(b.stake),
      price: price > 0 ? price : 0.5,
      status,
      settlesAt: p.settlesAt || null,
      countdown: status !== "pending" ? 0
        : (p.settlesAt ? Math.max(0, Math.round((new Date(p.settlesAt).getTime() - Date.now()) / 1000)) : 115),
      outcome,
      rare: false,
      stat: p.contextText || "Settled via TxODDS scores stream",
      statMin: 0, player: "WORLD CUP MOMENT",
      moment: (p.question || "") ,
      potentialWin: num(b.potentialWin),
      // on-chain linkage so a DB-loaded bet can still settle+claim on-chain and
      // be de-duplicated against a locally-tracked copy of the same tx.
      txSig: b.txSignature || null,
      positionAddress: b.positionAddress || null,
      onchain: !!b.txSignature,
      betProp: {
        id: p.id,
        marketAddress: p.marketAddress || null,
        onChainFixtureId: p.onChainFixtureId, onChainStatKey: p.onChainStatKey,
        onChainThreshold: p.onChainThreshold, onChainComparison: p.onChainComparison,
        onChainWindowStart: p.onChainWindowStart, onChainWindowEnd: p.onChainWindowEnd,
      },
      _proposition: p
    };
  }

  function mapUser(u) {
    return {
      id: u.id,
      username: u.username || null,
      walletAddress: u.walletAddress || "",
      balanceUsdc: num(u.balanceUsdc),
      winRate: num(u.winRatePercentage),
      bestStreak: num(u.bestStreak),
      currentStreak: num(u.currentStreak),
      netPnl: num(u.netPnl),
      totalPredictions: num(u.totalPredictions),
      userPacks: Array.isArray(u.userPacks) ? u.userPacks : [],
      userCards: Array.isArray(u.userCards) ? u.userCards : []
    };
  }

  function mapLeader(l) {
    const pnl = num(l.netPnl);
    const pnlStr = (pnl >= 0 ? "+$" : "−$") + Math.abs(Math.round(pnl)).toLocaleString("en-US");
    const name = l.username || (l.walletAddress ? (l.walletAddress.slice(0, 4) + "…" + l.walletAddress.slice(-4)) : "anon");
    return {
      rank: num(l.rank),
      name,
      streak: num(l.bestStreak),
      wr: Math.round(num(l.winRatePercentage)),
      pnl: pnlStr,
      bot: false,
      you: false,
      walletAddress: l.walletAddress || ""
    };
  }

  // ---- Solana wallet connect (Phantom / Solflare / Backpack) ----
  // base58 encode a byte array (for the signMessage signature)
  function bs58encode(bytes) {
    let zeros = 0;
    while (zeros < bytes.length && bytes[zeros] === 0) zeros++;
    const digits = [];
    for (let i = zeros; i < bytes.length; i++) {
      let carry = bytes[i];
      for (let j = 0; j < digits.length; j++) {
        carry += digits[j] << 8;
        digits[j] = carry % 58;
        carry = (carry / 58) | 0;
      }
      while (carry > 0) { digits.push(carry % 58); carry = (carry / 58) | 0; }
    }
    let str = "";
    for (let z = 0; z < zeros; z++) str += "1";
    for (let q = digits.length - 1; q >= 0; q--) str += B58[digits[q]];
    return str;
  }

  function resolveProvider(name) {
    const w = window;
    const n = (name || "").toLowerCase();
    if (n.indexOf("phantom") >= 0) {
      if (w.phantom && w.phantom.solana && w.phantom.solana.isPhantom) return w.phantom.solana;
      if (w.solana && w.solana.isPhantom) return w.solana;
      return null;
    }
    if (n.indexOf("solflare") >= 0) return (w.solflare && w.solflare.isSolflare) ? w.solflare : null;
    if (n.indexOf("backpack") >= 0) return w.backpack || (w.xnft && w.xnft.solana) || null;
    return w.solana || null;
  }
  function walletAvailable(name) { return !!resolveProvider(name); }

  // Connect an external Solana wallet and get a signed sign-in proof.
  // The signature is deterministic (fixed message), so it doubles as a stable nonce.
  async function connectExternalWallet(name) {
    const provider = resolveProvider(name);
    if (!provider) { const e = new Error(name + " not detected"); e.code = "NO_PROVIDER"; throw e; }
    let resp;
    try { resp = await provider.connect(); }
    catch (err) { const e = new Error("Connection rejected"); e.code = "CONNECT_REJECTED"; throw e; }
    const pkObj = (resp && resp.publicKey) ? resp.publicKey : provider.publicKey;
    if (!pkObj) { const e = new Error("No public key from wallet"); e.code = "NO_PUBKEY"; throw e; }
    const pubkey = pkObj.toString();
    let nonce;
    try {
      const message = "Swipe N Rekt — sign in\nWallet: " + pubkey;
      const encoded = new TextEncoder().encode(message);
      const signed = await provider.signMessage(encoded, "utf8");
      const sigBytes = (signed && signed.signature) ? signed.signature : signed;
      nonce = bs58encode(sigBytes instanceof Uint8Array ? sigBytes : new Uint8Array(sigBytes)).slice(0, 44);
    } catch (err) {
      const e = new Error("Signature rejected"); e.code = "SIG_REJECTED"; throw e;
    }
    return { pubkey, nonce, provider, walletName: name };
  }

  // Log in with a real wallet pubkey and persist it as the active identity.
  async function loginWithWallet(pubkey, nonce) {
    const r = await raw.login(pubkey, nonce);
    const token = r && r.data && r.data.token;
    if (!token) throw new Error("Login returned no token");
    setToken(token);
    try { localStorage.setItem(LS_WALLET, pubkey); localStorage.setItem(LS_NONCE, nonce); } catch (_) {}
    return token;
  }

  // ---- high-level auth helper ----
  async function ensureLogin() {
    if (getToken()) return getToken();
    const { wallet, nonce } = guestIdentity();
    const r = await raw.login(wallet, nonce);
    const token = r && r.data && r.data.token;
    if (!token) throw new Error("Login returned no token");
    setToken(token);
    return token;
  }

  window.SNR = {
    BASE,
    raw,
    getToken, setToken, guestIdentity, ensureLogin,
    walletAvailable, connectExternalWallet, loginWithWallet, bs58encode,
    logout: () => setToken(null),
    map: { match: mapMatch, proposition: mapProposition, bet: mapBet, user: mapUser, leader: mapLeader, teamMeta, impliedYes }
  };
})();
