import { useNavigate } from "react-router-dom";
import { Leaderboard } from "../screens";
import { useAppStore } from "../store/appStore.js";

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const leaders = useAppStore((s) => s.leaders);

  const leadersView = leaders.map((l) => Object.assign({}, l, {
    initial: l.name.charAt(0).toUpperCase(),
    rowBg: l.you ? "rgba(0,255,157,.08)" : "#14141d",
    rowBorder: l.you ? "1px solid rgba(0,255,157,.4)" : "1px solid rgba(255,255,255,.06)",
    rankColor: l.rank <= 3 ? "#ffcf4d" : "#7a7a8c",
    nameColor: l.you ? "#00ff9d" : "#f4f4f8"
  }));

  return (
    <Leaderboard
      v={{
        leadersView,
        goArena: () => navigate("/arena"),
        goAlbum: () => navigate("/album"),
        goLeaderboard: () => navigate("/leaderboard"),
        goProfile: () => navigate("/profile")
      }}
    />
  );
}
