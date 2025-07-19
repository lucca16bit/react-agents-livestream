import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            external: [],
        },
        commonjsOptions: {
            include: [/dayjs/, /node_modules/],
        },
    },
    optimizeDeps: {
        include: ['dayjs', 'dayjs/locale/pt-br'],
    },
});
