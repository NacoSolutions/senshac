// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import UnoCSS from '@unocss/astro';
import optimizeImages from './src/integrations/optimize-images.ts';

// https://astro.build/config
// NOTE: remarkPlugins don't work with Astro 5's glob loader for content collections.
// Shortcodes are processed at render time via src/utils/shortcodes.ts instead.
export default defineConfig({
  site: 'https://senshac.com',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
    sessionKVBindingName: false,
  }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  integrations: [UnoCSS({ injectReset: true }), optimizeImages()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    ssr: {
      external: ['node:crypto', 'node:path'],
    },
    build: {
      rollupOptions: {
        // Suppress HTMX eval warning - it's used safely for hx-on:* event handlers
        onwarn(warning, warn) {
          if (warning.code === 'EVAL' && warning.id?.includes('htmx')) return;
          warn(warning);
        },
      },
    },
  },
});
