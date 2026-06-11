// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import UnoCSS from '@unocss/astro';
import mdx from '@astrojs/mdx';
import tina from '@tinacms/astro/integration';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: 'https://senshac.com',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  integrations: [tina(), UnoCSS({ injectReset: true }), mdx()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  redirects: {
    '/admin': '/admin/index.html',
    '/es/admin': '/admin/index.html',
    '/en/admin': '/admin/index.html',
    '/ca/admin': '/admin/index.html'
  },
  vite: {
    plugins: [
      {
        name: 'silence-esbuild-options-warning',
        configResolved(config) {
          if (config.optimizeDeps?.esbuildOptions) {
            delete config.optimizeDeps.esbuildOptions;
          }
        }
      }
    ],
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
