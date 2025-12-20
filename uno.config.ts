// uno.config.ts
import { defineConfig, presetUno, presetIcons } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      // Define brand colors here
    },
    fontFamily: {
      sans: ['Sinteca', 'system-ui', 'sans-serif'],
      display: ['Jozsika', 'serif'],
    },
    fontSize: {
      // Match WordPress theme sizes
      // UnoCSS fontSize uses [size, lineHeight] tuple format
      'xs': ['0.875rem', 'normal'],    // 14px
      'sm': ['1rem', 'normal'],        // 16px
      'base': ['1.25rem', 'normal'],   // 20px - body default
      'lg': ['1.5rem', 'normal'],      // 24px
      'xl': ['2rem', '1'],             // 32px
      '2xl': ['2.25rem', '1'],         // 36px - sinteca-small-title
      '3xl': ['3.25rem', '1'],         // 52px - sinteca-medium-title
      '4xl': ['5rem', '1'],            // 80px - sinteca-big-title
      '5xl': ['6rem', '1.2'],          // 96px - banner title
    },
  },
  shortcuts: {
    // Common patterns
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
  },
});
