import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/kids-sudoku/',
  plugins: [ VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Sudoku Game',
      short_name: 'Sudoku Game',
      description: 'Sudoku Game',
      theme_color: '#2563eb',
      start_url: '/kids-sudoku/',
      scope: '/kids-sudoku/',
      display: 'standalone',
      icons: [
        {
          src: '/kids-sudoku/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/kids-sudoku/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/kids-sudoku/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})
