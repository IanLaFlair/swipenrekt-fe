import { useNavigate } from "react-router-dom";
import { Splash } from "../screens";

export default function SplashPage() {
  const navigate = useNavigate();
  return <Splash v={{ onConnect: () => navigate("/connect") }} />;
}
