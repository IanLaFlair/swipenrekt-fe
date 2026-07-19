import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// api.js is an IIFE that installs window.SNR — imported for its side effect so
// the bundler owns it (no extra request, same tested code).
import "./api.js";
import { useAppStore } from "./store/appStore.js";
import { RequireAuth, RedirectIfAuthed, CatchAll } from "./routes/guards.jsx";
import SplashPage from "./pages/SplashPage.jsx";
import ConnectPage from "./pages/ConnectPage.jsx";
import ArenaPage from "./pages/ArenaPage.jsx";
import MatchesPage from "./pages/MatchesPage.jsx";
import AlbumPage from "./pages/AlbumPage.jsx";
import CountryPage from "./pages/CountryPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import PositionsPage from "./pages/PositionsPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import PackPage from "./pages/PackPage.jsx";

export default function App() {
  // Always-mounted for the app's lifetime (parent of <Routes>): ticks the
  // card timer/position countdowns every second and warms up live backend
  // data in the background, regardless of which route is active.
  useEffect(() => {
    const iv = setInterval(() => useAppStore.getState().tick(), 1000);
    useAppStore.getState().bootstrapLive();
    return () => clearInterval(iv);
  }, []);

  // Keying the wrapper on the pathname remounts it on every navigation, which
  // replays the CSS entrance animation (.snr-page) so the incoming screen fades
  // + slides in instead of flashing. Routes still resolve against `location`.
  const location = useLocation();

  return (
    <div style={{ minHeight: "100dvh", width: "100%", background: "#07070b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif" }}>
      <div style={{ position: "relative", width: "100%", maxWidth: "480px", height: "100dvh", background: "#0a0a0f", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div key={location.pathname} className="snr-page" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
        <Routes location={location}>
          <Route element={<RedirectIfAuthed />}>
            <Route path="/" element={<SplashPage />} />
            <Route path="/connect" element={<ConnectPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/arena" element={<ArenaPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/album" element={<AlbumPage />} />
            <Route path="/album/:idx" element={<CountryPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/positions" element={<PositionsPage />} />
            <Route path="/positions/:id" element={<ResultPage />} />
            <Route path="/pack/:tier" element={<PackPage />} />
          </Route>
          <Route path="*" element={<CatchAll />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}
