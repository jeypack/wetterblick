import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

/**
 * Vite configuration for the Wetterblick project.
 * @see {@link https://vite.dev/config/ Vite Configuration Documentation} for more information on available options.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("recharts")) return "recharts-vendor";
          if (id.includes("firebase")) return "firebase-vendor";
          if (
            id.includes("@headlessui") ||
            id.includes("lucide-react") ||
            id.includes("@heroicons")
          ) {
            return "ui-vendor";
          }
        },
      },
    },
  },
  base: "/demos/weather/",
});
