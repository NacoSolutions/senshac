// src/types/global.d.ts
// Global type declarations for client-side libraries

import type { Alpine as AlpineType } from 'alpinejs';
import type htmxType from 'htmx.org';

declare global {
  interface Window {
    Alpine: AlpineType;
    htmx: typeof htmxType;
  }
}

// Module declaration must be at file top-level (not in declare global)
declare module '@alpinejs/collapse';
