import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'icons/favicon-64.png',
        'icons/apple-touch-icon.png',
      ],
      manifest: {
        id: '/',
        name: 'Gaurav Chaudhary — Portfolio',
        short_name: 'Gaurav C.',
        description:
          'GTA-inspired interactive portfolio of Gaurav Chaudhary — projects, resume and more.',
        lang: 'en',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'any',
        scope: '/',
        start_url: '/',
        categories: ['portfolio', 'personal'],
        shortcuts: [
          {
            name: 'Resume',
            short_name: 'Resume',
            url: '/?open=resume',
            icons: [{ src: '/icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' }],
          },
          {
            name: 'Projects',
            short_name: 'Projects',
            url: '/?open=safari',
            icons: [{ src: '/icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' }],
          },
        ],
        screenshots: [
          {
            src: '/screenshots/mobile-narrow.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/screenshots/desktop-wide.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the app shell + small static assets. Keep large media out of
        // the precache (handled by runtime caching below).
        globPatterns: ['**/*.{js,css,html,svg,woff,woff2,ttf,webp}'],
        globIgnores: [
          '**/node_modules/**',
          '**/videos/**',
          '**/*.png',
          '**/images/gta-bg-v4.png',
        ],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        additionalManifestEntries: [
          { url: '/images/gaurav-bg-car.webp', revision: null },
          { url: '/images/gta-bg-v3.webp', revision: null },
          { url: '/images/gaurav-gta6-v2.webp', revision: null },
          { url: '/images/gta-radar.webp', revision: null },
          { url: '/images/weapon-wheel.webp', revision: null },
          { url: '/images/wanted-v2.webp', revision: null },
          { url: '/images/health-hud.png', revision: null },
          { url: '/images/finder.svg', revision: null },
          { url: '/images/appstore.svg', revision: null },
          { url: '/images/notes.svg', revision: null },
          { url: '/images/calendar.svg', revision: null },
          { url: '/screenshots/mobile-narrow.png', revision: null },
          { url: '/screenshots/desktop-wide.png', revision: null },
          { url: '/icons/pwa-192x192.png', revision: null },
          { url: '/icons/pwa-512x512.png', revision: null },
          { url: '/icons/maskable-512x512.png', revision: null },
          { url: '/icons/apple-touch-icon.png', revision: null },
          { url: '/icons/favicon-64.png', revision: null },
        ],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            // Images (webp/png/jpg/svg) — cache on first use.
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Fonts.
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Audio + video — large, streamed media. Range-request friendly.
            urlPattern: ({ request }) =>
              request.destination === 'video' || request.destination === 'audio',
            handler: 'CacheFirst',
            options: {
              cacheName: 'media-cache',
              rangeRequests: true,
              expiration: {
                maxEntries: 12,
                maxAgeSeconds: 60 * 60 * 24 * 14, // 14 days
              },
              cacheableResponse: { statuses: [0, 200, 206] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#apps': fileURLToPath(new URL('./src/apps', import.meta.url)),
      '#components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '#content': fileURLToPath(new URL('./src/content', import.meta.url)),
      '#hoc': fileURLToPath(new URL('./src/hoc', import.meta.url)),
      '#sections': fileURLToPath(new URL('./src/sections', import.meta.url)),
      '#store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '#windows': fileURLToPath(new URL('./src/windows', import.meta.url)),
    },
  },
})
