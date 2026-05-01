import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/', 
  build: {
    outDir: 'dist',
    emptyOutDir: true, // 🚨 Add this to wipe old files before building
    assetsDir: 'assets',
    manifest: true 
  }
})