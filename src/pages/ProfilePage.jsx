import { useNavigate } from "react-router-dom";
import { Profile } from "../screens";
import { useAuthStore } from "../store/authStore.js";
import { albumSummary } from "../data/seed.js";

const PACK_INVENTORY = [{ t: "common", c: 3 }, { t: "uncommon", c: 1 }, { t: "rare", c: 2 }, { t: "epic", c: 1 }, { t: "legendary", c: 1 }];
const TC = { common: "#9aa0b0", uncommon: "#00ff9d", rare: "#26a0ff", epic: "#b026ff", legendary: "#ffcf4d" };
const TG = { common: "rgba(154,160,176,.2)", uncommon: "rgba(0,255,157,.22)", rare: "rgba(38,160,255,.28)", epic: "rgba(176,38,255,.3)", legendary: "rgba(255,207,77,.4)" };

export default function ProfilePage() {
  const navigate = useNavigate();
  const prof = useAuthStore((s) => s.profile);
  const { setsDone: albumOwned, setsTotal: albumTotal, setsPctW: albumPctW } = albumSummary();

  const signed = (n) => (Number(n) >= 0 ? "+$" : "−$") + Math.abs(Math.round(Number(n) || 0)).toLocaleString("en-US");

  const profWinRate = (prof ? Math.round(prof.winRate) : 61) + "%";
  const profBestStreak = "🔥 " + (prof ? prof.bestStreak : 14);
  const profPredictions = prof ? prof.totalPredictions : 128;
  const profPnl = prof ? signed(prof.netPnl) : "+$640";
  const profPnlColor = (prof && prof.netPnl < 0) ? "#ff3d6e" : "#00ff9d";
  const profName = (prof && prof.username) ? prof.username
    : (prof && prof.walletAddress ? ("DEGEN_" + prof.walletAddress.slice(-2).toUpperCase()) : "DEGEN_07");
  const profStreakLine = "🔥 " + (prof ? prof.currentStreak : 7) + "-win streak";
  const walletAddr = (prof && prof.walletAddress)
    ? (prof.walletAddress.slice(0, 4) + "…" + prof.walletAddress.slice(-4))
    : "7xKp…9fA2";

  const packTotal = PACK_INVENTORY.reduce((a, p) => a + p.c, 0);
  const packsView = PACK_INVENTORY.map((p) => ({
    tier: p.t, count: p.c, label: p.t.toUpperCase() + " PACK",
    color: TC[p.t], glow: TG[p.t],
    bg: "linear-gradient(160deg,#16161f,#101019)",
    border: "1px solid " + TC[p.t].replace(")", "") + "55",
    onOpen: () => navigate("/pack/" + p.t)
  }));

  return (
    <Profile
      v={{
        profName, walletAddr, profWinRate, profBestStreak, profPredictions, profPnl, profPnlColor,
        albumOwned, albumTotal, albumPctW, profStreakLine,
        packTotal, packsView,
        openHistory: () => navigate("/history"),
        goArena: () => navigate("/arena"),
        goAlbum: () => navigate("/album"),
        goLeaderboard: () => navigate("/leaderboard"),
        goProfile: () => navigate("/profile")
      }}
    />
  );
}
