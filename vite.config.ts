import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: false,
            pwaAssets: {
                disabled: false,
                config: true,
            },
            manifest: {
                name: 'Sudoku för barn',
                short_name: 'Sudoku',
                description: 'Sudoku spel för barn',
                theme_color: '#2563eb',
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
            },
            devOptions: {
                enabled: false,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module',
            },
        })
    ],
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
});
