import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'

import alias from "@rollup/plugin-alias";

const src = path.resolve(__dirname, "src");

export default defineConfig({
  plugins: [react(),
  alias({
    entries: [
      {
        find: "src",
        replacement: src,
      },
    ],
  }),
  ],

})
