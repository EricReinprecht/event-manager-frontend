import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),

            '@components': path.resolve(__dirname, './src/components'),

            '@layouts': path.resolve(__dirname, './src/layouts'),

            '@auth': path.resolve(__dirname, './src/auth'),

            '@user': path.resolve(__dirname, './src/user'),

            '@styles': path.resolve(__dirname, './src/styles'),

            '@api': path.resolve(__dirname, './src/api'),

            '@routes': path.resolve(__dirname, './src/routes'),
        },
    },
});
