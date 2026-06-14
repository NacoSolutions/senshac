// @ts-check

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tina from "@tinacms/astro/integration";
import UnoCSS from "@unocss/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	site: "https://senshac.com",
	output: "static",
	adapter: cloudflare({
		imageService: "compile",
		prerenderEnvironment: "node",
	}),
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
		},
	},
	integrations: [tina(), UnoCSS({ injectReset: true }), mdx()],
	i18n: {
		defaultLocale: "es",
		locales: ["es", "ca", "en"],
		routing: {
			prefixDefaultLocale: true,
		},
	},

	vite: {
		plugins: [
			{
				name: "silence-esbuild-options-warning",
				configResolved(config) {
					if (config.optimizeDeps?.esbuildOptions) {
						delete config.optimizeDeps.esbuildOptions;
					}
				},
			},
		],
		build: {
			rollupOptions: {
				// Suppress HTMX eval warning - it's used safely for hx-on:* event handlers
				onwarn(warning, warn) {
					if (warning.code === "EVAL" && warning.id?.includes("htmx")) return;
					warn(warning);
				},
			},
		},
		ssr: {
			noExternal: ["@aws-sdk/client-s3", "@aws-sdk/s3-request-presigner"],
		},
	},
});
