// src/utils/shortcodes.ts
// Runtime shortcode processor for Astro Content Layer
// Remark plugins don't run with glob loader, so we process at render time

import { createHash } from 'node:crypto';
import { basename, extname } from 'node:path';

/**
 * Generate optimized image HTML with srcset
 */
function optimizedImg(src: string, alt = '', className = '', loading = 'lazy', widths = [400, 800, 1200]): string {
  if (!src) {
    return `<img src="" alt="${alt}" class="${className}" loading="${loading}" decoding="async" />`;
  }

  const hash = createHash('md5').update(src).digest('hex').slice(0, 8);
  const baseName = basename(src, extname(src));

  const sources = widths.map(w => ({
    width: w,
    path: `/_optimized/${baseName}-${hash}-${w}.webp`
  }));

  const srcset = sources.map(s => `${s.path} ${s.width}w`).join(', ');
  const defaultSrc = sources.find(s => s.width === 800)?.path ?? sources[0]?.path ?? src;
  const sizes = '(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px';

  return `<img src="${defaultSrc}" srcset="${srcset}" sizes="${sizes}" alt="${alt}" class="${className}" loading="${loading}" decoding="async" />`;
}

type ShortcodeHandler = (attrs: Record<string, string>) => string;

const shortcodes: Record<string, ShortcodeHandler> = {
  // YouTube embed
  youtube: ({ id, aspectRatio = '16/9' }) => `
    <div class="video-embed" style="aspect-ratio: ${aspectRatio};">
      <iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" style="width: 100%; height: 100%;"></iframe>
    </div>`,

  // Vimeo embed
  vimeo: ({ id }) => `
    <div class="video-embed" style="aspect-ratio: 16/9;">
      <iframe src="https://player.vimeo.com/video/${id}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy" style="width: 100%; height: 100%;"></iframe>
    </div>`,

  // Button
  button: ({ href, text, variant = 'primary' }) => {
    const variants: Record<string, string> = {
      primary: 'bg-black text-white hover:bg-gray-800',
      secondary: 'bg-white text-black border border-black hover:bg-gray-100',
      outline: 'border border-black hover:bg-black hover:text-white',
    };
    return `<a href="${href}" class="inline-block px-6 py-3 rounded-full transition-colors font-sans text-sm uppercase tracking-wider ${variants[variant] || variants.primary}">${text}</a>`;
  },

  // Callout
  callout: ({ type = 'info', title }) => {
    const types: Record<string, string> = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      success: 'bg-green-50 border-green-200 text-green-800',
    };
    return `<aside class="p-4 border-l-4 my-4 ${types[type] || types.info}"><strong class="block mb-1">${title || type.charAt(0).toUpperCase() + type.slice(1)}</strong>`;
  },
  '/callout': () => `</aside>`,

  // Figure with caption
  figure: ({ src, alt = '', caption = '', width = '100%' }) => `
    <figure class="my-8" style="max-width: ${width};">
      ${optimizedImg(src, alt, 'w-full h-auto')}
      ${caption ? `<figcaption class="text-sm text-gray-600 mt-2 text-center">${caption}</figcaption>` : ''}
    </figure>`,

  // Spacer
  spacer: ({ height = '30px' }) => `<div style="height: ${height};"></div>`,

  // Columns
  columns: ({ cols = '2', gap = '8' }) => {
    const gridCols: Record<string, string> = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-3', '4': 'md:grid-cols-4' };
    return `<div class="grid grid-cols-1 ${gridCols[cols] || gridCols['2']} gap-${gap}">`;
  },
  '/columns': () => `</div>`,

  col: () => `<div>`,
  '/col': () => `</div>`,

  // Page link
  pagelink: ({ href, text }) => `<a href="${href}" class="page-link">${text}</a>`,

  // Divider
  divider: ({ color = 'black', margin = '8' }) => `<hr class="border-${color} my-${margin}" />`,

  // Project banner
  banner: ({ src, alt = '' }) => `
    <section class="section-banner">
      <div class="w-full">
        ${optimizedImg(src, alt, 'w-full h-screen object-cover', 'eager', [800, 1200, 1800])}
      </div>
    </section>`,

  // Project header
  header: ({ title, subtitle = '' }) => `
    <div class="project-title mb-6">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-medium">${title}</h1>
    </div>
    ${subtitle ? `<div class="project-subtitle mb-12"><p class="text-lg md:text-xl font-medium">${subtitle}</p></div>` : ''}`,

  // Project details grid
  details: ({ services, category, area, location, image, servicesLabel = 'SERVICES', categoryLabel = 'CATEGORY', areaLabel = 'AREA', locationLabel = 'LOCATION' }) => `
    <div class="project-details grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-t border-b border-gray-200 py-8">
      <div class="detail-item">
        <p class="text-xs uppercase tracking-wider text-gray-500 mb-1">${servicesLabel}</p>
        <p class="font-medium">${services}</p>
      </div>
      <div class="detail-item">
        <p class="text-xs uppercase tracking-wider text-gray-500 mb-1">${categoryLabel}</p>
        <p class="font-medium">${category}</p>
      </div>
      <div class="detail-item">
        <p class="text-xs uppercase tracking-wider text-gray-500 mb-1">${areaLabel}</p>
        <p class="font-medium">${area}</p>
      </div>
      <div class="detail-item">
        <p class="text-xs uppercase tracking-wider text-gray-500 mb-1">${locationLabel}</p>
        <p class="font-medium">${location}</p>
      </div>
    </div>
    ${image ? `<div class="project-details-image">${optimizedImg(image, services, 'w-full')}</div>` : ''}`,

  // Project section
  section: ({ title = '', id }) => `
    <section id="${id || title.toLowerCase()}" class="project-section py-16 md:py-24">
      <h2 class="sinteca-small-text uppercase tracking-wider font-semibold mb-8">${title}</h2>
      <div class="prose prose-lg max-w-none">`,
  '/section': () => `</div></section>`,

  // Gallery grid
  gallery: ({ cols = '2', gap = '4' }) => {
    const gridCols: Record<string, string> = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-3', '4': 'md:grid-cols-4' };
    return `<div class="grid grid-cols-1 ${gridCols[cols] || gridCols['2']} gap-${gap} my-8">`;
  },
  '/gallery': () => `</div>`,

  // Gallery image
  img: ({ src, alt = '' }) => `
    <div class="overflow-hidden">
      ${optimizedImg(src, alt, 'w-full h-auto object-cover')}
    </div>`,

  // Carousel
  carousel: ({ id }) => `
    <div id="${id}" class="carousel relative overflow-hidden my-8" x-data="{ current: 0, total: 0 }" x-init="total = $el.querySelectorAll('.carousel-slide').length">
      <div class="carousel-track flex transition-transform duration-300" :style="'transform: translateX(-' + (current * 100) + '%)'">`,
  '/carousel': () => `
      </div>
      <div class="carousel-controls absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        <template x-for="i in total" :key="i">
          <button @click="current = i - 1" :class="current === i - 1 ? 'bg-white' : 'bg-white/50'" class="w-2 h-2 rounded-full"></button>
        </template>
      </div>
      <button @click="current = current > 0 ? current - 1 : total - 1" class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">&larr;</button>
      <button @click="current = current < total - 1 ? current + 1 : 0" class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">&rarr;</button>
    </div>`,

  // Carousel slide
  slide: ({ src, alt = '' }) => `
    <div class="carousel-slide flex-shrink-0 w-full">
      ${optimizedImg(src, alt, 'w-full h-auto object-cover')}
    </div>`,

  // Collaborators
  collaborators: ({ title = 'COLLABORATORS' }) => `
    <section class="project-collaborators py-16 md:py-24 border-t border-gray-200">
      <h2 class="sinteca-small-text uppercase tracking-wider font-semibold mb-8">${title}</h2>
      <ul class="space-y-2">`,
  '/collaborators': () => `</ul></section>`,

  // Collaborator item
  collab: ({ name, role, url }) => url
    ? `<li><a href="${url}" target="_blank" rel="noopener" class="hover:underline"><strong>${name}</strong> — ${role}</a></li>`
    : `<li><strong>${name}</strong> — ${role}</li>`,

  // Text block
  text: ({ class: className = '' }) => `<div class="${className}">`,
  '/text': () => `</div>`,

  // Details section wrapper
  'details-section': () => `
    <div class="section-details py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 md:px-8">`,
  '/details-section': () => `
      </div>
    </div>`,

  // === HOME PAGE SHORTCODES ===

  'hero-home': ({ image, topRight = '', bottomLeft = '', bottomLeftSub = '' }) => `
    <section class="relative h-screen w-full overflow-hidden bg-black">
      ${optimizedImg(image, '', 'absolute inset-0 w-full h-full object-cover', 'eager', [800, 1200, 1800])}
      <div class="absolute top-[10%] right-0 pr-4 md:pr-8 text-right text-white">
        <p class="text-sm md:text-base tracking-wider leading-tight whitespace-pre-line">${topRight} <span class="text-xs align-top">®</span></p>
      </div>
      <div class="absolute bottom-[10%] left-0 pl-4 md:pl-8 text-white max-w-xl">
        <p class="text-2xl md:text-3xl lg:text-4xl font-light leading-tight whitespace-pre-line">${bottomLeft}</p>
        <p class="text-sm md:text-base text-gray-300 mt-2">${bottomLeftSub}</p>
      </div>
    </section>`,

  'about-home': ({ image, title = '', description = '', cta = '', ctaLink = '' }) => `
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="h-[30px]"></div>
        <div class="grid grid-cols-12 gap-8">
          <div class="col-span-12 md:col-span-4">
            ${optimizedImg(image, '', 'w-1/2 h-auto', 'lazy', [200, 400])}
          </div>
          <div class="col-span-12 md:col-span-8">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-light leading-tight uppercase whitespace-pre-line mb-8">${title}</h2>
            <p class="text-base leading-relaxed mb-8">${description}</p>
            <a href="${ctaLink}" class="page-link">${cta}</a>
          </div>
        </div>
        <div class="h-[60px]"></div>
      </div>
    </section>`,

  // === SERVICES PAGE SHORTCODES ===

  'hero-services': ({ title = '', symbolImage = '/images/brand/simbol-senshac.webp' }) => `
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="py-16 md:py-24">
          <div class="grid grid-cols-12 gap-8 items-center">
            <div class="col-span-12 md:col-span-8">
              <h1 class="sinteca-medium-title leading-tight whitespace-pre-line">${title}</h1>
            </div>
            <div class="col-span-12 md:col-span-4 flex justify-end">
              ${optimizedImg(symbolImage, 'Sens*Hac', 'w-24 md:w-32 h-auto', 'eager', [100, 200])}
            </div>
          </div>
        </div>
      </div>
    </section>`,

  'intro-services': ({ text = '', image = '' }) => `
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="grid grid-cols-12 gap-8">
          <div class="hidden md:block md:col-span-4"></div>
          <div class="col-span-12 md:col-span-8">
            <p class="text-base leading-relaxed mb-8">${text}</p>
            ${optimizedImg(image, '', 'w-1/2 h-auto', 'lazy', [300, 600])}
          </div>
        </div>
        <div class="h-[60px]"></div>
      </div>
    </section>`,

  'services-section': () => `
    <section class="bg-[#f2f2f2]">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="h-[60px]"></div>`,
  '/services-section': () => `
      </div>
    </section>`,

  'services-group': ({ title = '' }) => `
    <div class="grid grid-cols-12 gap-8 py-8 border-t border-black">
      <div class="col-span-12 md:col-span-4">
        <h2 class="sinteca-small-text uppercase tracking-wider font-semibold">${title}</h2>
      </div>
      <div class="col-span-12 md:col-span-8">
        <div class="grid grid-cols-2 gap-8">`,
  '/services-group': () => `
        </div>
      </div>
    </div>`,

  'service-item': ({ title = '', description = '' }) => `
    <div class="col-span-2 sm:col-span-1">
      <h3 class="sinteca-small-text uppercase tracking-wider font-semibold mb-3">${title}</h3>
      <p class="sinteca-small-text text-gray-600">${description}</p>
    </div>`,

  'faqs-section': ({ title = "FAQ'S" }) => `
    <style>[x-cloak] { display: none !important; }</style>
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="h-[60px]"></div>
        <div class="faqs-title-row grid grid-cols-12 gap-8 py-6 border-b border-black">
          <div class="col-span-12 md:col-span-4">
            <h2 class="sinteca-small-text uppercase tracking-wider font-semibold">${title}</h2>
          </div>
        </div>`,
  '/faqs-section': () => `
      </div>
    </section>`,

  'faq': ({ question = '', answer = '' }) => `
    <div class="grid grid-cols-12 gap-8 py-6 border-b border-black faq-item" x-data="{ open: false }">
      <div class="hidden md:block md:col-span-4"></div>
      <div class="col-span-12 md:col-span-8">
        <button class="w-full text-left flex justify-between items-start gap-4 group" x-on:click="open = !open" aria-expanded="false" x-bind:aria-expanded="open">
          <span class="text-base font-sans font-normal group-hover:text-gray-600 transition-colors">${question}</span>
          <svg class="w-4 h-4 flex-shrink-0 mt-1 transition-transform" x-bind:class="open && 'rotate-45'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
        <div class="overflow-hidden transition-all duration-300" x-show="open" x-collapse x-cloak>
          <p class="sinteca-small-text text-gray-600 mt-4 leading-relaxed">${answer}</p>
        </div>
      </div>
    </div>`,

  'faqs-image': ({ src = '' }) => `
    <div class="py-8">
      ${optimizedImg(src, '', 'w-full h-auto')}
    </div>`,

  'work-process': ({ title = 'WORK PROCESS', p1 = '', p2 = '', image = '' }) => `
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="h-[60px]"></div>
        <div class="grid grid-cols-12 gap-8 py-8 border-t border-black">
          <div class="col-span-12 md:col-span-4">
            <h2 class="sinteca-small-text uppercase tracking-wider font-semibold">${title}</h2>
          </div>
          <div class="col-span-12 md:col-span-8">
            <div class="grid grid-cols-2 gap-8">
              <div class="col-span-2 sm:col-span-1">
                <p class="sinteca-small-text text-gray-600 leading-relaxed">${p1}</p>
              </div>
              <div class="col-span-2 sm:col-span-1">
                <p class="sinteca-small-text text-gray-600 leading-relaxed">${p2}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-8 pb-16">
          <div class="col-span-12 md:col-span-8">
            ${optimizedImg(image, '', 'w-full h-auto')}
          </div>
          <div class="hidden md:block md:col-span-4"></div>
        </div>
      </div>
    </section>`,

  // === ABOUT PAGE SHORTCODES ===

  'about-hero': ({ title = '' }) => `
    <section class="bg-[#f2f2f2]">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="h-[90px]"></div>
        <div class="border-b border-black pb-8">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-light">${title}</h1>
        </div>
        <div class="h-[90px]"></div>`,
  '/about-hero': () => `
        <div class="h-[20px]"></div>
      </div>
    </section>`,

  'behind-name': ({ title = '', p1 = '', p2 = '', footnote = '' }) => `
    <div class="grid grid-cols-12 gap-8 pb-8">
      <div class="col-span-12 md:col-span-6">
        <h2 class="text-sm uppercase tracking-wider font-medium">${title}</h2>
      </div>
      <div class="col-span-12 md:col-span-6">
        <p class="text-base leading-relaxed mb-6">${p1}</p>
        <p class="text-base leading-relaxed mb-6">${p2}</p>
        <p class="text-sm text-gray-600 italic">${footnote}</p>
      </div>
    </div>`,

  'about-banner': ({ src = '', height = '580px' }) => `
    <section class="overflow-hidden" style="height: ${height};">
      ${optimizedImg(src, '', 'w-full h-full object-cover object-center', 'lazy', [800, 1200, 1800])}
    </section>`,

  'about-bio': ({ title = '', image = '' }) => `
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="h-[70px]"></div>
        <div class="grid grid-cols-12 gap-8">
          <div class="col-span-12 md:col-span-4">
            ${optimizedImg(image, '', 'w-full h-auto')}
          </div>
          <div class="col-span-12 md:col-span-8">
            <h2 class="text-sm uppercase tracking-wider font-medium mb-8">${title}</h2>
            <div class="space-y-6 text-base leading-relaxed">`,
  '/about-bio': () => `
            </div>
          </div>
        </div>
        <div class="h-[70px]"></div>
      </div>
    </section>`,

  'bio-p': () => `<p>`,
  '/bio-p': () => `</p>`,

  'awards-section': ({ title = 'Awards' }) => `
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <h2 class="text-sm uppercase tracking-wider font-medium mb-8">${title}</h2>
        <div class="border-t border-black">`,
  '/awards-section': () => `
        </div>
        <div class="h-[70px]"></div>
      </div>
    </section>`,

  'award': ({ year = '', project = '', award = '', link = '' }) => `
    <a href="${link}" target="_blank" rel="noopener noreferrer" class="grid grid-cols-12 gap-4 py-8 border-b border-black hover:bg-gray-50 transition-colors group">
      <div class="col-span-6 md:col-span-1"><span class="text-sm">${year}</span></div>
      <div class="col-span-6 md:col-span-3"><span class="text-sm">${project}</span></div>
      <div class="col-span-10 md:col-span-6"><span class="text-sm">${award}</span></div>
      <div class="col-span-2 text-right">
        <svg class="w-4 h-4 inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"></path>
        </svg>
      </div>
    </a>`,

  'about-mission': ({ title = '', p1 = '', p2 = '', quote = '' }) => `
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="h-[60px]"></div>
        <div class="grid grid-cols-12 gap-8">
          <div class="col-span-12 md:col-span-4">
            <h2 class="text-sm uppercase tracking-wider font-medium">${title}</h2>
          </div>
          <div class="col-span-12 md:col-span-8">
            <p class="text-base leading-relaxed mb-6">${p1}</p>
            <p class="text-base leading-relaxed">${p2}</p>
          </div>
        </div>
        <div class="h-[60px]"></div>
        <div class="border-t border-black pt-8 pb-8">
          <p class="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">${quote}</p>
        </div>
        <div class="h-[60px]"></div>
      </div>
    </section>`,
};

// Regex to match [[shortcode attr="value"]] or [[/shortcode]]
const shortcodeRegex = /\[\[(\/?[\w-]+)(?:\s+([^\]]+))?\]\]/g;

/**
 * Parse attribute string into object
 */
function parseAttrs(attrStr: string | undefined): Record<string, string> {
  if (!attrStr) return {};
  const attrs: Record<string, string> = {};
  const regex = /(\w+)="([^"]+)"/g;
  let match;
  while ((match = regex.exec(attrStr))) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

/**
 * Process shortcodes in markdown body content
 * @param body - Raw markdown body from content collection entry
 * @returns HTML string with shortcodes processed
 */
export function processShortcodes(body: string): string {
  if (!body) return '';

  return body.replace(shortcodeRegex, (match, name, attrStr) => {
    const handler = shortcodes[name];
    if (handler) {
      const attrs = parseAttrs(attrStr);
      return handler(attrs);
    }
    // Return original if no handler found
    return match;
  });
}

/**
 * Simple markdown to HTML converter for basic content
 * Handles headings, paragraphs, bold, italic, links, and lists
 */
function simpleMarkdown(text: string): string {
  let html = text
    // Escape HTML entities first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headings (must be at start of line)
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr />')
    // Line breaks - two or more newlines become paragraph breaks
    .replace(/\n{2,}/g, '</p><p>')
    // Single newlines within paragraphs
    .replace(/\n/g, '<br />');

  // Process unordered lists
  html = html.replace(/(<p>)?- (.+?)(<br \/>|<\/p>)/g, (_match, _pStart, content, _pEnd) => {
    return `<li>${content}</li>`;
  });

  // Wrap consecutive li elements in ul
  html = html.replace(/(<li>.*?<\/li>)+/gs, (match) => `<ul>${match}</ul>`);

  // Wrap in paragraph tags
  html = `<p>${html}</p>`;

  // Clean up empty paragraphs and fix nesting
  html = html
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[1-6]>)/g, '$1')
    .replace(/(<\/h[1-6]>)<\/p>/g, '$1')
    .replace(/<p>(<ul>)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1')
    .replace(/<p>(<hr \/>)<\/p>/g, '$1')
    .replace(/<p><br \/>/g, '<p>')
    .replace(/<br \/><\/p>/g, '</p>');

  return html;
}

/**
 * Process content with both shortcodes and markdown
 * Use this for pages that may contain shortcodes mixed with standard markdown
 * @param body - Raw markdown body from content collection entry
 * @returns HTML string with shortcodes and markdown processed
 */
export function processContent(body: string): string {
  if (!body) return '';

  // First process shortcodes
  const withShortcodes = processShortcodes(body);

  // Then process markdown for any remaining non-shortcode content
  // Split by shortcode-generated HTML (sections, divs with classes) and process markdown in between
  const parts = withShortcodes.split(/(<section[^>]*>[\s\S]*?<\/section>|<div class="[^"]*"[^>]*>[\s\S]*?<\/div>)/g);

  return parts.map(part => {
    // If it's HTML from a shortcode, keep as-is
    if (part.startsWith('<section') || part.startsWith('<div class=')) {
      return part;
    }
    // Otherwise, process as markdown
    return simpleMarkdown(part);
  }).join('');
}
