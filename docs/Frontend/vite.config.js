import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Funtoon_WORLD/docs/',
  plugins: [react()],
})
