import { useNavigate } from "react-router-dom";
import { Album } from "../screens";
import { albumSummary } from "../data/seed.js";

export default function AlbumPage() {
  const navigate = useNavigate();
  const { setsDone, setsTotal, setsPctW, sets } = albumSummary();

  const albumSets = sets.map((c) => Object.assign({}, c, {
    onOpen: () => navigate("/album/" + c.idx)
  }));

  return (
    <Album
      v={{
        setsDone, setsTotal, setsPctW, albumSets,
        goArena: () => navigate("/arena"),
        goAlbum: () => navigate("/album"),
        goLeaderboard: () => navigate("/leaderboard"),
        goProfile: () => navigate("/profile")
      }}
    />
  );
}
