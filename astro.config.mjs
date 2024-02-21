import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

import netlify from "@astrojs/netlify/functions";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://astro.build/config
export default defineConfig({
	output: "server",
	integrations: [tailwind(), preact()],
	renderers: ["@astrojs/renderer-preact"],
	adapter: netlify(),
	vite: {
		plugins: [
			ViteImageOptimizer({
				/* pass your config */
			}),
		],
	},
});
