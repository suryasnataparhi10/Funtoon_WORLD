// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Funtoon_WORLD/', // <-- matches the repo name
  plugins: [react()],
  build: {
    outDir: 'docs', // output build into docs folder
    emptyOutDir: true,
  },
});
