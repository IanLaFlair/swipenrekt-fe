// On-chain betting on Solana devnet — swipe = a real place_bet transaction
// signed by the user's Phantom wallet, moving devnet SOL into the program's
// escrow PDA. No backend, no DB balance: the money is the wallet's own SOL.
//
// Talks to the deployed program with raw @solana/web3.js (no IDL): Anchor
// discriminators are precomputed, args are borsh little-endian. Mirrors
// swipenrekt-blockchain/app/demo-devnet.mjs, which is verified on devnet.
import {
  Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction, LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export const PROGRAM_ID = new PublicKey("iZvZwSKPvRZpEqxyXSiRGos9pGuuzygmKdcAB6biffQ");
export const CLUSTER = "devnet";
export const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Precomputed Anchor discriminators = sha256("global:<ix>")[..8].
const DISC = {
  initialize_reward_pool: [139, 189, 60, 130, 44, 211, 218, 99],
  initialize_market: [35, 35, 189, 193, 155, 48, 170, 203],
  place_bet: [222, 62, 67, 220, 63, 166, 126, 33],
  settle_market_mock: [36, 174, 175, 47, 184, 207, 166, 196],
  claim_payout: [127, 240, 132, 62, 227, 198, 146, 133],
};
const disc = (n) => Buffer.from(DISC[n]);
const enc = (s) => new TextEncoder().encode(s);
const u8 = (n) => Buffer.from([n & 0xff]);
const u32 = (n) => { const b = Buffer.alloc(4); b.writeUInt32LE(n >>> 0); return b; };
const i32 = (n) => { const b = Buffer.alloc(4); b.writeInt32LE(n); return b; };
const i64 = (n) => { const b = Buffer.alloc(8); b.writeBigInt64LE(BigInt(n)); return b; };
const u64 = (n) => { const b = Buffer.alloc(8); b.writeBigUInt64LE(BigInt(Math.round(n))); return b; };
const pdaOf = (seeds) => PublicKey.findProgramAddressSync(seeds, PROGRAM_ID)[0];
const ak = (pubkey, isSigner, isWritable) => ({ pubkey, isSigner, isWritable });
const SYS = SystemProgram.programId;

// ---- deterministic market params from a proposition id --------------------
// The frontend and the seed script MUST derive identical params so their market
// PDAs match. window_start is a FIXED past timestamp (so the market PDA is
// stable over time) with a far-future window_end, i.e. the market is always
// "open" for the demo. fixture_id / stat_key are hashed from the proposition id
// so every card maps to its own unique market.
const WINDOW_START = 1700000000; // fixed, in the past
const WINDOW_END = 4000000000;   // year ~2096
const PERIOD = 0, THRESHOLD = 1, COMPARISON = 0; // "> 1", GreaterThan

function hash32(str) {
  let h = 2166136261 >>> 0; // FNV-1a
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}
// Accepts a proposition id (string) or the whole card/proposition object. When
// the backend has populated the on-chain fields (onChainFixtureId/StatKey/
// WindowStart), those define the market — so the frontend hits the SAME PDA the
// backend created. Otherwise fall back to a deterministic hash of the id with a
// fixed always-open window (works standalone until the backend catches up).
const has = (v) => v !== null && v !== undefined && v !== "";
export function marketParams(prop) {
  const p = typeof prop === "object" && prop ? prop : {};
  const id = typeof prop === "string" ? prop : (p.id || "");
  if (has(p.onChainFixtureId) && has(p.onChainStatKey) && has(p.onChainWindowStart)) {
    return {
      fixtureId: Number(p.onChainFixtureId),
      statKey: Number(p.onChainStatKey),
      windowStart: Number(p.onChainWindowStart),
      windowEnd: has(p.onChainWindowEnd) ? Number(p.onChainWindowEnd) : WINDOW_END,
      period: PERIOD,
      threshold: has(p.onChainThreshold) ? Number(p.onChainThreshold) : THRESHOLD,
      comparison: has(p.onChainComparison) ? Number(p.onChainComparison) : COMPARISON,
      source: "backend",
    };
  }
  const a = hash32(id);
  const b = hash32("stat:" + id);
  return {
    fixtureId: a,                 // fits i64
    statKey: (b % 1_000_000) + 1, // u32, non-zero
    windowStart: WINDOW_START,
    windowEnd: WINDOW_END,
    period: PERIOD, threshold: THRESHOLD, comparison: COMPARISON,
    source: "derived",
  };
}

function marketPda(p) {
  return pdaOf([enc("market"), i64(p.fixtureId), u32(p.statKey), i64(p.windowStart)]);
}
const rewardPoolPda = () => pdaOf([enc("reward_pool")]);
const rewardVaultPda = () => pdaOf([enc("reward_vault")]);
const vaultPda = (market) => pdaOf([enc("vault"), market.toBuffer()]);
const positionPda = (market, user) => pdaOf([enc("position"), market.toBuffer(), user.toBuffer()]);

// ---- instruction builders --------------------------------------------------
export function ixInitRewardPool(authority) {
  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [ak(rewardPoolPda(), false, true), ak(authority, true, true), ak(SYS, false, false)],
    data: disc("initialize_reward_pool"),
  });
}
export function ixInitMarket(authority, p) {
  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [ak(marketPda(p), false, true), ak(authority, true, true), ak(SYS, false, false)],
    data: Buffer.concat([disc("initialize_market"), i64(p.fixtureId), u32(p.statKey), i32(p.period ?? PERIOD), i32(p.threshold ?? THRESHOLD), u8(p.comparison ?? COMPARISON), i64(p.windowStart), i64(p.windowEnd)]),
  });
}
export function ixPlaceBet(user, p, side /* 'yes'|'no' */, stakeLamports, priceBps) {
  const market = marketPda(p);
  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      ak(market, false, true), ak(positionPda(market, user), false, true), ak(vaultPda(market), false, true),
      ak(rewardPoolPda(), false, true), ak(rewardVaultPda(), false, true),
      ak(user, true, true), ak(SYS, false, false),
    ],
    data: Buffer.concat([disc("place_bet"), u8(side === "yes" ? 1 : 0), u64(stakeLamports), u32(priceBps)]),
  });
}

// ---- Phantom provider ------------------------------------------------------
export function getPhantom() {
  const p = (window.phantom && window.phantom.solana) || (window.solana && window.solana.isPhantom ? window.solana : null);
  return p && p.isPhantom ? p : null;
}

export const solToLamports = (sol) => Math.round(sol * LAMPORTS_PER_SOL);
export const lamportsToSol = (l) => l / LAMPORTS_PER_SOL;
export const explorerTx = (sig) => `https://explorer.solana.com/tx/${sig}?cluster=${CLUSTER}`;

// ---- settle + claim: resolve a market and pull the winner's SOL back --------
// Demo path: the bettor (who created the market on first bet) settles it via
// settle_market_mock to the decided outcome, then claims their payout. In a real
// product settlement is oracle-driven (settle_market + Merkle proof); this is the
// convenience path for the demo. `outcome` is 'won' | 'lost'; only 'won' claims.
export async function settleAndClaimOnChain({ proposition, side, outcome }) {
  const phantom = getPhantom();
  if (!phantom) { const e = new Error("Phantom not found"); e.code = "NO_PHANTOM"; throw e; }
  if (!phantom.publicKey) { await phantom.connect(); }
  const user = new PublicKey(phantom.publicKey.toString());

  const p = marketParams(proposition);
  const market = marketPda(p);
  if (!(await connection.getAccountInfo(market))) { const e = new Error("Market not on-chain yet"); e.code = "NO_MARKET"; throw e; }

  const won = outcome === "won";
  const userSide = side === "yes" ? 1 : 0;
  const winningSide = won ? userSide : 1 - userSide;

  // settle + (if won) claim in ONE transaction: within a tx, instructions run in
  // order, so claim sees the just-settled market. One Phantom signature.
  const ixSettle = new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [ak(market, false, true), ak(user, true, false)],
    data: Buffer.concat([disc("settle_market_mock"), u8(winningSide)]),
  });
  const ixClaim = new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      ak(market, false, false), ak(positionPda(market, user), false, true), ak(vaultPda(market), false, true),
      ak(user, true, true), ak(SYS, false, false),
    ],
    data: disc("claim_payout"),
  });

  const send = async (ixs) => {
    const tx = new Transaction().add(...ixs);
    tx.feePayer = user;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    const signed = await phantom.signTransaction(tx);
    const sig = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(sig, "confirmed");
    return sig;
  };

  try {
    const sig = await send(won ? [ixSettle, ixClaim] : [ixSettle]);
    return won ? { claimSig: sig } : { settleSig: sig };
  } catch (err) {
    // Market already settled from a prior run? Fall back to claim-only.
    if (won && /already settled|0x1771|custom program error/i.test(err.message || "")) {
      return { claimSig: await send([ixClaim]) };
    }
    throw err;
  }
}

// The connected Phantom wallet's live devnet SOL balance (null if not connected).
// Phantom's connection doesn't survive a page reload, so if we're logged in but
// the provider has no publicKey yet, silently re-establish it (onlyIfTrusted =
// no popup when the site was already approved) before reading the balance.
export async function getWalletSol() {
  const p = getPhantom();
  if (!p) return null;
  if (!p.publicKey) {
    try { await p.connect({ onlyIfTrusted: true }); } catch (_) { return null; }
  }
  if (!p.publicKey) return null;
  try {
    const lamports = await connection.getBalance(new PublicKey(p.publicKey.toString()));
    return lamports / LAMPORTS_PER_SOL;
  } catch (_) { return null; }
}

// ---- high-level: place a real on-chain bet via Phantom ---------------------
// stakeSol in SOL (e.g. 0.05). priceProb = implied probability 0..1.
// Creates the market on first bet if it doesn't exist yet (payer = user),
// then sends place_bet. Phantom signs; returns the confirmed tx signature.
export async function placeBetOnChain({ proposition, propositionId, side, stakeSol, priceProb }) {
  const phantom = getPhantom();
  if (!phantom) { const e = new Error("Phantom not found"); e.code = "NO_PHANTOM"; throw e; }
  if (!phantom.publicKey) { await phantom.connect(); }
  const user = new PublicKey(phantom.publicKey.toString());

  // Prefer the full proposition (carries the backend's on-chain fields); fall
  // back to just the id (hash-derived market).
  const p = marketParams(proposition || propositionId);
  const market = marketPda(p);

  // Enough devnet SOL for the stake + ~account rent + fees?
  const bal = await connection.getBalance(user);
  const need = solToLamports(stakeSol) + 0.01 * LAMPORTS_PER_SOL;
  if (bal < need) { const e = new Error("Not enough devnet SOL — top up at faucet.solana.com"); e.code = "LOW_BALANCE"; throw e; }

  const tx = new Transaction();
  // market first-touch: init if missing (needs an existing reward pool)
  if (!(await connection.getAccountInfo(market))) {
    if (!(await connection.getAccountInfo(rewardPoolPda()))) tx.add(ixInitRewardPool(user));
    tx.add(ixInitMarket(user, p));
  }
  const priceBps = Math.max(0, Math.min(10000, Math.round(priceProb * 10000)));
  tx.add(ixPlaceBet(user, p, side, solToLamports(stakeSol), priceBps));

  tx.feePayer = user;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  // Phantom only SIGNS; we submit to our own devnet connection, so it works
  // regardless of which cluster the user's Phantom happens to be set to.
  const signed = await phantom.signTransaction(tx);
  const signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature, "confirmed");
  return { signature, market: market.toBase58(), vault: vaultPda(market).toBase58() };
}
