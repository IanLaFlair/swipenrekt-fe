import { useNavigate } from "react-router-dom";
import { Positions } from "../screens";
import { useAppStore } from "../store/appStore.js";
import { enrichPosition } from "../lib/enrichPosition.js";

export default function PositionsPage() {
  const navigate = useNavigate();
  const positions = useAppStore((s) => s.positions);

  const isPending = (p) => p.status === "pending" || p.status === "active";
  const activeCount = positions.filter(isPending).length;
  const atStake = positions.filter(isPending).reduce((a, p) => a + p.stake, 0);

  const positionsView = positions.map((p) => {
    const v = enrichPosition(p);
    v.onClaim = () => useAppStore.getState().claim(p.id);
    v.onOpen = () => navigate("/positions/" + p.id);
    return v;
  });

  return (
    <Positions
      v={{
        goArena: () => navigate("/arena"),
        activeCount,
        atStakeStr: "◎" + atStake,
        positionsView
      }}
    />
  );
}
