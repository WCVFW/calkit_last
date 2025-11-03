import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    hmr: {
      overlay: false,
    },
    watch: {
      // Ignore OneDrive sync folders and node_modules to avoid frequent restarts
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/OneDrive/**',
        '**/OneDrive - **/**',
        '**/OneDrive*/**',
        '**/*~',
        '**/*.lnk',
        '**/desktop.ini',
        '**/*.TMP',
        '**/*.tmp'
      ]
    },
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
