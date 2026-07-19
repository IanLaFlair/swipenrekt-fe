import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Dev-server proxy: /api/* → the real backend, so the browser talks
  // same-origin and never hits CORS (mirrors the Vercel rewrite in prod).
  server: {
    port: 3000, strictPort: true,
    proxy: {
      "/api": {
        target: "https://swipe-api.fachry.dev",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
  preview: { port: 3000, strictPort: true },
  build: { outDir: "dist", sourcemap: true },
});
