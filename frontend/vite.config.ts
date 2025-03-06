import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures correct routing on deployment
  server: {
    port: 5173, // Local development port
  },
  build: {
    outDir: "dist",
  },
});
