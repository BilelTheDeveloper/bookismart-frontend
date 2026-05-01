import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // 🚨 Add this line
  base: '/', 
  build: {
    // Ensures the output matches what Vercel expects
    outDir: 'dist',
    assetsDir: 'assets',
    // Generates a manifest to help debug pathing
    manifest: true 
  }
})