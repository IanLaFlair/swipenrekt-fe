import { useNavigate } from "react-router-dom";
import { Positions } from "../screens";
import { useAppStore } from "../store/appStore.js";
import { enrichPosition } from "../lib/enrichPosition.js";

export default function PositionsPage() {
  const navigate = useNavigate();
  const positions = useAppStore((s) => s.positions);

  const activeCount = positions.filter((p) => p.status === "pending").length;
  const atStake = positions.filter((p) => p.status === "pending").reduce((a, p) => a + p.stake, 0);

  const positionsView = positions.map((p) => {
    const v = enrichPosition(p);
    v.onSettle = () => useAppStore.getState().settle(p.id);
    v.onOpen = () => navigate("/positions/" + p.id);
    return v;
  });

  return (
    <Positions
      v={{
        goArena: () => navigate("/arena"),
        activeCount,
        atStakeStr: "$" + atStake,
        positionsView
      }}
    />
  );
}
