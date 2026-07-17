import { useNavigate } from "react-router-dom";
import { Matches } from "../screens";
import { useAppStore } from "../store/appStore.js";

export default function MatchesPage() {
  const navigate = useNavigate();
  const matchesFull = useAppStore((s) => s.matchesFull);

  const matchesView = matchesFull.map((m) => Object.assign({}, m, {
    live: m.live,
    upcoming: !m.live,
    scoreOrTime: m.live ? (m.hs + " : " + m.as) : "vs",
    marketsLabel: m.live ? (m.markets ? (m.markets + " markets") : "Live markets") : "Pre-match",
    phaseLabel: m.phase,
    onSelect: async () => {
      await useAppStore.getState().selectMatch(m.id);
      navigate("/arena");
    }
  }));

  return <Matches v={{ goArena: () => navigate("/arena"), matchesView }} />;
}
