import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import precss from "precss"
import cssnano from "cssnano"

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],

  css: {
    postcss: {
      plugins: [
        precss({}), // add options if needed
        cssnano({ preset: "default" })
      ],
    }
  }
})
