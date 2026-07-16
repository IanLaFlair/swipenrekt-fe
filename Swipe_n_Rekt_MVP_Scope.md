# Swipe n Rekt — Scope MVP & Strategi Submission

**Hackathon:** TxODDS World Cup (Superteam Earn)
**Tim:** 2 orang, full fokus (~40 jam/minggu)
**Timeline:** 3 minggu efektif (deadline submit 19 Juli 2026, 23:59 UTC)
**Token:** USDC | **Chain:** Solana (devnet untuk demo) | **Platform:** Mobile-first web app

---

## 1. Konsep satu kalimat

Prediction market sepakbola momen-per-momen yang diakses lewat swipe ala Tinder — harga dari odds TxODDS, di-settle otomatis on-chain pakai Merkle proof, dengan lapisan game (streak + kartu NFT langka) yang bikin orang balik tiap hari.

## 2. Keputusan kunci yang udah dikunci

| Aspek | Keputusan | Alasan |
|---|---|---|
| Model market | P2P escrow (share YES/NO ala Polymarket) | Pool diisi pemain, gak butuh modal sendiri |
| Cold-start | Market-maker bot (nyediain likuiditas awal kedua sisi) | Pasar jalan walau baru 1 player real |
| Token | USDC | Stabil, logika taruhan bersih |
| Sumber harga | Odds stream TxODDS (demargined) | Adil, transparan |
| Settlement | On-chain via Merkle proof (`validate_stat` CPI) | Trustless, ini jualan teknis utama |
| Lapisan game | Streak + NFT drop dari momen langka | Retensi + originality (untuk Fan Experience) |
| Platform | Web app mobile-first (React), bukan native | Juri klik link langsung tes, swipe = gesture HP |

## 3. Model ekonomi (P2P + market-maker bot)

- Tiap kartu = pasar YES/NO. Harga YES + NO = $1 (ala Polymarket).
- User swipe = beli share YES atau NO seharga implied probability dari odds TxODDS.
- Settle: sisi bener → share jadi $1, sisi salah → $0. Yang menang dibayar dari dana yang masang sisi kalah (escrow).
- **Platform gak nanggung modal** — cuma ambil fee kecil.
- **Market-maker bot**: nyediain likuiditas awal di kedua sisi pakai harga odds TxODDS, jadi user pertama tetep bisa main instan. Transparan di repo. Di produksi, peran bot surut pas likuiditas organik masuk.
- Demo devnet: semua USDC dari faucet (gratis, uang mainan).

> **Catatan strategi:** Repo wajib public. Bot likuiditas pasti keliatan di kode. Frame duluan sebagai "market-maker untuk cold-start" di pitch & docs — lebih kuat daripada juri nemu sendiri.

## 4. Strategi dua track

Engine teknisnya ~80% sama. Bikin dua bungkus + dua demo video.

### Target — Consumer & Fan Experiences ($16K, 1st $10K)
- Headline: pengalaman swipe + game loop + kartu NFT langka
- Dinilai: UX, real-time, originality, monetization, completeness
- Contoh ide resmi mereka ("Hi-Lo streak game") mirip arah Swipe n Rekt

### Target — Prediction Markets & Settlement ($18K, 1st $12K)
- Headline: P2P escrow + settlement engine on-chain via Merkle proof
- Dinilai: core functionality, UX, code quality & logic (deterministik)
- Buang NFT/streak dari headline, poles settlement + verifiable resolution UI
- Posisi pitch: "Polymarket buat in-play football, tapi settle otomatis dari Merkle proof TxODDS — gak perlu oracle voting yang lambat & bisa didebat."

---

## 5. Fitur: Wajib vs Pembeda vs Roadmap

### WAJIB JALAN (fondasi — kalau ini goyah, semua jatoh)
- Tarik fixtures TxODDS → tampilin match World Cup live
- Konsumsi odds stream (SSE) → generate kartu swipe + harga (implied probability)
- Swipe kanan/kiri = beli share YES/NO → posisi masuk smart contract (escrow USDC)
- Market-maker bot nyediain likuiditas dua sisi
- Konsumsi scores stream (SSE) → deteksi event terjadi/enggak
- **Settle on-chain otomatis pakai Merkle proof TxODDS → bayar pemenang**

### PEMBEDA (pilih sesuai waktu — ini yang bikin "wah")
- AI co-pilot: bisikan konteks per kartu ("Tim A 3 tembakan dalam 2 menit")
- 10 persona market-maker bot dengan karakter beda (agresif/hati-hati) → bikin leaderboard hidup
- Win-streak system (main & nebak bener → streak naik)
- NFT drop dari momen langka (cNFT, supply cap, eligibility by streak)
- Album/dex koleksi kartu

### ROADMAP (cukup disebut di pitch, JANGAN dibangun)
- Likuiditas organik / liquidity provider eksternal (bot surut)
- Hybrid model (P2P + AMM pelengkap)
- Gacha pack berbayar
- Trading kartu antar-user / marketplace
- Kartu sebagai boost payout

---

## 6. Breakdown 3 Minggu (task mentah, bagi sendiri)

### Minggu 1 — Fondasi data + kontrak
- Setup auth TxLINE (guest JWT + activate, free World Cup tier)
- Konsumsi odds stream + scores stream (SSE), parsing payload
- Service yang ubah odds → "kartu" (jenis, harga/implied probability, window)
- Setup program Solana (Anchor), escrow USDC untuk posisi YES/NO
- Logika P2P matching dasar (YES vs NO) + market-maker bot stub
- Stub settlement (mock dulu, belum CPI ke TxLINE)
- **Target:** data ngalir + kontrak nampung posisi (settle masih mock)

### Minggu 2 — Settlement on-chain + swipe UI
- Frontend swipe mobile-first (kartu, animasi swipe via react-tinder-card/framer-motion)
- Sambungin wallet Solana (Phantom) + swipe → kontrak (masang posisi)
- Tampilan posisi aktif + hasil
- **Settlement beneran: CPI ke `validate_stat` TxLINE + Merkle proof**
- Bayar pemenang otomatis dari escrow
- Verifiable resolution UI (tampilin "receipt" Merkle proof)
- Market-maker bot jalan beneran (ambil sisi lawan pakai harga odds)
- **Target:** satu loop penuh jalan end-to-end on-chain (swipe → settle → bayar, kebukti proof)

### Minggu 3 — Pembeda + poles + demo
- AI co-pilot (bisikan konteks)
- Win-streak + 1 contoh NFT drop live (cNFT) + album
- 10 persona bot + leaderboard (kalau sempat)
- Poles UX mobile, fix bug, deploy devnet + Vercel
- **Rekam 2 demo video** (versi Fan Experience + versi Prediction Markets)
- Tulis dokumentasi teknis + list endpoint TxLINE
- Submit ke dua track

---

## 7. Checklist syarat submit (dua track, masing-masing wajib)
- [ ] Demo video ≤5 menit (problem → walkthrough → cara TxLINE powering backend)
- [ ] Public GitHub repo
- [ ] Link app deployed / endpoint yang bisa juri tes (devnet OK)
- [ ] Dokumentasi teknis singkat + list endpoint TxLINE
- [ ] Jawaban feedback pengalaman pakai TxLINE API
- [ ] Produk FUNCTIONAL, bukan mockup (mockup = auto-disqualified)

## 8. Risiko & mitigasi
| Risiko | Mitigasi |
|---|---|
| Settlement on-chain molor | Minggu 2 fokus penuh ke sini, mock dulu di minggu 1 |
| Scope kebanyakan (NFT+AI+streak) | Pembeda = opsional, fondasi diutamakan |
| Demo pecah pas presentasi | Loop inti harus solid sebelum nambah pembeda |
| Match World Cup udah kelar saat juri review | Demo video jadi kunci — rekam pas ada match live |
| SSE free tier delay 60 detik | Desain kartu window agak panjang (5 menit, bukan 10 detik) |
| P2P sepi lawan | Market-maker bot nambal likuiditas; demo pakai skenario ter-seed |

## 9. Endpoint TxLINE yang dipakai (catat buat dokumentasi)
- `POST /auth/guest/start` — guest JWT
- `POST /api/token/activate` — aktivasi (free World Cup tier)
- Fixtures snapshot — daftar match + status fase
- `GET /api/odds/stream` (SSE, filter `fixtureId`) — generate kartu + harga
- Scores stream (SSE) — deteksi event + settle
- Merkle proof (scores) + `validate_stat` CPI — settlement on-chain

## 10. Stack
- Frontend: React + Tailwind, mobile-first (frame ~390px, center di desktop)
- Swipe: react-tinder-card atau framer-motion (jangan bikin dari nol)
- Wallet: Solana wallet adapter (Phantom)
- Smart contract: Anchor (Rust)
- Deploy: Vercel (frontend) + VPS OVH (backend kalau perlu)

---

## 11. Daftar Screen (Design Brief untuk Claude Design)

**Vibe:** degen/crypto-native (berani, energetik, bukan korporat). Mobile-first (frame ~390px, center di desktop). Elemen inti: kartu swipe ala Tinder (stack, gesture kiri/kanan/atas). Kerangka navigasi: bottom tab bar (Arena / Album / Leaderboard / Profil); screen lain muncul sebagai modal / bottom-sheet / push screen.

### Onboarding & Masuk
- **1. Splash / Landing (P1)** — logo, tagline degen, tombol Connect Wallet. First impression.
- **2. Connect Wallet (P1)** — pilih wallet (Phantom dkk), status connecting. Modal.
- **3. Pilih Match (P1)** — daftar match World Cup (live/akan main): tim vs tim, skor live, status fase, badge LIVE. Tap → arena.

### Inti — Gameplay
- **4. Swipe Arena (P1) — JANTUNG PRODUK** — stack kartu prediction. Kartu teratas: pertanyaan ("Gol 5 menit ke depan?"), harga/odds (implied %), payout potensial, timer window. Gesture kiri (TIDAK)/kanan (YA)/atas (skip). Atas: skor live + menit. Bawah: saldo USDC, streak counter.
- **5. Konfirmasi Posisi (P1)** — muncul pas swipe: "masang YA, $X, potensi menang $Y". Atur nominal. Bottom-sheet.
- **6. Posisi Aktif / Pending (P1)** — taruhan jalan belum settle: pertanyaan, sisi, nominal, status, countdown.
- **7. Hasil + Verifiable Receipt (P1) — PEMBEDA TEKNIS** — hasil menang/kalah + payout, plus receipt Merkle proof (tap → detail/explorer).

### Lapisan Game
- **8. Album / Koleksi Kartu (P2) — PEMBEDA FAN EXPERIENCE** — grid kartu ala Pokédex. Kepunya: berwarna + rarity badge. Belum: siluet terkunci. Progress bar koleksi. Tap → detail (rarity, dari momen apa, supply cap).
- **9. Kartu Drop / Reward Moment (P2)** — animasi dapet kartu langka. "You earned: [Pemain] — Legendary". Momen wah buat demo.
- **10. Streak / Progress (P2)** — visual streak berjalan, milestone berikutnya, status streak insurance.

### Sosial
- **11. Leaderboard (P2)** — ranking pemain + persona bot: rank, avatar, streak, win rate. Filter.
- **12. Profil & Stats (P2)** — avatar, wallet, win rate, streak terpanjang, total prediksi, koleksi ringkas, riwayat.

### Pendukung
- **13. Riwayat / History (P2)** — semua taruhan lama + hasil, scrollable.

### Prioritas desain (kalau waktu terbatas)
1. Swipe Arena (4) — wajah produk
2. Konfirmasi Posisi (5) + Posisi Aktif (6)
3. Hasil + Receipt (7) — pembeda teknis
4. Pilih Match (3) + Landing (1)
5. Album (8) + Kartu Drop (9) — pembeda Fan Experience
6. Sisanya — pelengkap

6 screen pertama cukup buat demo video loop penuh: pilih match → swipe → konfirmasi → nunggu → hasil + bukti → dapet kartu.

**Catatan:** AI co-pilot TIDAK dipakai (di-drop).

---

## 12. Wallet & Auth

**Peran wallet:** identitas + dompet sekaligus. Gak ada email/password. Connect wallet = login. Alamat wallet = ID user. Wallet nyimpen USDC + tanda tangan tiap transaksi.

**Alur:**
1. Tap "Connect Wallet" → Phantom kebuka → user approve koneksi
2. App baca alamat + saldo USDC (ini yang tampil di Arena)
3. Swipe → slide to confirm → Phantom minta tanda tangan → USDC ke escrow
4. Settle → payout otomatis balik ke wallet

**Teknis:** Solana Wallet Adapter (library jadi, jangan bikin dari nol). Network: DEVNET (SOL + USDC mainan dari faucet).

**Friksi yang harus disadari:** tiap transaksi = pop-up Phantom minta tanda tangan. Ini mematahkan ritme "swipe cepet".
- **Buat demo:** terima pop-up tiap transaksi. Normal di Web3, juri ngerti.
- **Roadmap (JANGAN bangun):** session key / delegation — approve sekali di awal ("boleh potong sampai $X sesi ini"), swipe berikutnya gak perlu tanda tangan. Sebut di pitch sebagai solusi produksi.

**Aturan keamanan (WAJIB):**
- App TIDAK PERNAH minta atau nyimpen seed phrase / private key. Connect lewat Phantom langsung; app cuma minta tanda tangan, gak pernah pegang kunci.
- Pakai wallet adapter standar = aman by default (app gak pernah liat kunci).
