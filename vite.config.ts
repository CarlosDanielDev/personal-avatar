import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import alias from "@rollup/plugin-alias";

const src = path.resolve(__dirname, "src");

export default defineConfig({
  plugins: [react(),
  alias({
    entries: [
      { find: "src", replacement: src },
    ],
  }),
  ],
  define: {
    'process.env': {}
  },
  envPrefix: 'VITE_',
})
