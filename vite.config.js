import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['main-gecko-pro.ngrok-free.app'],
  },
  base: "/wordlekid/",
  plugins: [react()],
})
