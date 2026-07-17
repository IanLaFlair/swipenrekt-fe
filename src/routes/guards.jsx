import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

// Gate for screens that require a connected wallet/session.
export function RequireAuth() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

// Gate for the pre-auth flow (Splash, Connect) — bounce straight past it
// once the user is already connected.
export function RedirectIfAuthed() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  return isAuthenticated ? <Navigate to="/matches" replace /> : <Outlet />;
}

export function CatchAll() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  return <Navigate to={isAuthenticated ? "/matches" : "/"} replace />;
}
