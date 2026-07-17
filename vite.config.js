import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Port 3000 is not cosmetic: the backend CORS allowlist only admits
  // http://localhost:3000, so any other port gets "Failed to fetch".
  server: { port: 3000, strictPort: true },
  preview: { port: 3000, strictPort: true },
  build: { outDir: "dist", sourcemap: true },
});
