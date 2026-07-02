import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  assetsInclude: ['**/*.geojson'],
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/waypilot-192.png', 'icons/waypilot-512.png', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'WayPilot',
        short_name: 'WayPilot',
        description: 'Маршруты, места, адреса, бюджет и SOS без интернета',
        theme_color: '#063b4c',
        background_color: '#f3f7f8',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'ru',
        start_url: './',
        icons: [
          { src: 'icons/waypilot-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/waypilot-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/waypilot-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,json,geojson,mp3,wav,webp,jpg,jpeg,png}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true
      }
    })
  ]
})
