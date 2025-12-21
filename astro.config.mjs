// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import UnoCSS from '@unocss/astro';
import mdx from '@astrojs/mdx';
import optimizeImages from './src/integrations/optimize-images.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://senshac.pages.dev',
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
  integrations: [UnoCSS({ injectReset: true }), mdx(), optimizeImages()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
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
