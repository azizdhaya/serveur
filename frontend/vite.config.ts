import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const srcDir = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "");
  const apiPort = env.VITE_API_PORT || "8787";
  const proxyTarget = `http://127.0.0.1:${apiPort}`;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { "@": srcDir },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return undefined;
            if (id.includes("recharts") || id.includes("d3-")) return "charts";
            if (id.includes("@tanstack")) return "query";
            if (id.includes("react-router")) return "router";
            return "vendor";
          },
        },
      },
    },
    server: {
      // Autorise l'écoute sur toutes les interfaces (utile avec tunnels).
      host: true,
      port: 5173,
      strictPort: false,
      // Autorise l'accès via tunnel (ngrok) en environnement de dev.
      allowedHosts: true,
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
        "/health": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: true,
      allowedHosts: true,
    },
  };
});
