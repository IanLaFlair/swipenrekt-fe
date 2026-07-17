import { create } from "zustand";
import { persist } from "zustand/middleware";

// React-facing, persisted mirror of "who is the authenticated user". The
// vanilla window.SNR client (src/api.js) remains the source of truth for the
// Authorization header on requests — this store is populated alongside it at
// the moment a wallet connect succeeds, so components can subscribe to it.
export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      wallet: null,
      walletName: null,
      profile: null,
      isAuthenticated: false,
      setAuth: ({ token, wallet, walletName }) =>
        set({ token, wallet, walletName, isAuthenticated: true }),
      setProfile: (profile) => set({ profile }),
      clearAuth: () =>
        set({ token: null, wallet: null, walletName: null, profile: null, isAuthenticated: false }),
    }),
    { name: "snr-auth" }
  )
);
