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
      includeAssets: ['icons/icon.svg'],
      manifest: {
        name: 'Санья — офлайн-гид',
        short_name: 'Санья',
        description: 'Маршруты, места, адреса, бюджет и SOS без интернета',
        theme_color: '#063b4c',
        background_color: '#f3f7f8',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'ru',
        start_url: './',
        icons: [
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
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
