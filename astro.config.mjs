import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

import netlify from '@astrojs/netlify/functions';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

import db from '@astrojs/db';
import base64 from './base64Loader';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    integrations: [
        tailwind(),
        preact({
            include: ['**/preact/*'],
        }),
        db(),
    ],
    renderers: ['@astrojs/renderer-preact'],
    adapter: netlify(),
    vite: {
        plugins: [
            ViteImageOptimizer({
                /* pass your config */
            }),
            base64(),
        ],
    },
});
