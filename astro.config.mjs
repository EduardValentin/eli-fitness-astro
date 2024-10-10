import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

import netlify from '@astrojs/netlify/functions';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

import db from '@astrojs/db';
import base64Loader from './base64Loader';

import node from '@astrojs/node';
import { visualizer } from 'rollup-plugin-visualizer';

import webVitals from '@astrojs/web-vitals';

let adapter;

if (process.argv[3] === '--node' || process.argv[4] === '--node') {
    adapter = node({ mode: 'standalone' });
} else {
    adapter = netlify();
}

// https://astro.build/config
export default defineConfig({
    output: 'server',
    integrations: [tailwind(), preact({
        include: ['**/preact/*'],
    }), db(), webVitals()],
    renderers: ['@astrojs/renderer-preact'],
    adapter: adapter,
    vite: {
        build: {
            rollupOptions: {
                treeshake: 'smallest',
            },
        },
        plugins: [
            ViteImageOptimizer({
                /* pass your config */
            }),
            base64Loader(),
            visualizer(),
        ],
    },
});