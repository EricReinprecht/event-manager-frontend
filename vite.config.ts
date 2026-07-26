import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),

            '@api': path.resolve(__dirname, 'src/api'),

            '@auth': path.resolve(__dirname, 'src/auth'),

            '@components': path.resolve(__dirname, 'src/components'),

            '@layouts': path.resolve(__dirname, 'src/layouts'),

            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },
});
