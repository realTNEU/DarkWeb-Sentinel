import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss({
    theme: {
      extend: {
        colors: {
          darkblue: "#211C84",
          dark: "#0a0a0a"
        },
      },
    }

  }
    
  )],
})
