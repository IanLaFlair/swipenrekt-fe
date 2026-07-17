import { useNavigate } from "react-router-dom";
import { History } from "../screens";
import { useAppStore } from "../store/appStore.js";
import { enrichPosition } from "../lib/enrichPosition.js";

export default function HistoryPage() {
  const navigate = useNavigate();
  const history = useAppStore((s) => s.history);

  const historyView = history.map((p) => {
    const v = enrichPosition(p);
    v.onOpen = () => navigate("/positions/" + p.id);
    return v;
  });

  return <History v={{ goProfile: () => navigate("/profile"), historyView }} />;
}
