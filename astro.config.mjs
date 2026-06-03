// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import UnoCSS from '@unocss/astro';
import mdx from '@astrojs/mdx';
import tina from '@tinacms/astro/integration';
import optimizeImages from './src/integrations/optimize-images.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://preview.senshac.com',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  integrations: [tina(), UnoCSS({ injectReset: true }), mdx(), optimizeImages()],
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
