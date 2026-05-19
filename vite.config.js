import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/three/")) return "three";
          if (id.includes("/framer-motion/")) return "motion";
          if (id.includes("/lucide-react/")) return "icons";
          if (id.includes("/react/") || id.includes("/react-dom/")) return "react-vendor";
          return "vendor";
        },
      },
    },
  },
})
