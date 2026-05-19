import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isPWAEnabled = env.VITE_PWA_ENABLED === 'true';

  const plugins = [react(), tailwindcss()];

  // PWA — only active when VITE_PWA_ENABLED=true
  // Requires: npm install vite-plugin-pwa workbox-window --save-dev
  if (isPWAEnabled) {
    try {
      const { VitePWA } = await import('vite-plugin-pwa');
      plugins.push(
        VitePWA({
          registerType: 'autoUpdate',
          devOptions: { enabled: false },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/bookismart-backend-kcnn\.onrender\.com\/api\/public\//,
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'api-public-cache',
                  expiration: { maxEntries: 50, maxAgeSeconds: 300 },
                },
              },
            ],
          },
          manifest: {
            name: 'Bookiify',
            short_name: 'Bookiify',
            description: 'Réservez vos rendez-vous instantanément',
            theme_color: '#4f46e5',
            background_color: '#0f172a',
            display: 'standalone',
            orientation: 'portrait',
            start_url: '/',
            scope: '/',
            icons: [
              { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
              { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
              { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
            ],
          },
        })
      );
      console.info('[PWA] vite-plugin-pwa enabled.');
    } catch {
      console.warn('[PWA] vite-plugin-pwa not found. Run: npm install vite-plugin-pwa workbox-window --save-dev');
    }
  }

  return {
    plugins,
    base: '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsDir: 'assets',
      manifest: true,
      chunkSizeWarningLimit: 2000,
    },
  };
});
