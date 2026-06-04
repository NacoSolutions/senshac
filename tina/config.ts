// tina/config.ts
import { defineConfig, type TinaField } from 'tinacms';

// ============================================================================
// SHARED FIELD DEFINITIONS
// ============================================================================

// Image field object (for nested use)
const imageFields: TinaField[] = [
  { type: 'image' as const, name: 'src', label: 'Image', required: true },
  { type: 'string' as const, name: 'alt', label: 'Alt Text', required: true },
];

// Gallery field object (for nested use)
const galleryFields: TinaField[] = [
  { type: 'number' as const, name: 'cols', label: 'Columns' },
  {
    type: 'object' as const,
    name: 'images',
    label: 'Images',
    list: true,
    fields: imageFields,
  },
];

// ============================================================================
// SITE CONFIG FIELDS
// ============================================================================

const siteConfigFields: TinaField[] = [
  { type: 'string' as const, name: 'siteUrl', label: 'Site URL', required: true },
  { type: 'string' as const, name: 'locales', label: 'Locales', list: true },
  { type: 'string' as const, name: 'defaultLocale', label: 'Default Locale', required: true },
  {
    type: 'object' as const,
    name: 'company',
    label: 'Company',
    fields: [
      { name: 'name', label: 'Name', type: 'string', required: true },
      { name: 'legalName', label: 'Legal Name', type: 'string' },
      { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' } },
      { name: 'tagline', label: 'Tagline', type: 'string' },
    ],
  },
  {
    type: 'object' as const,
    name: 'contact',
    label: 'Contact',
    fields: [
      { name: 'email', label: 'Email', type: 'string', required: true },
      { name: 'phone', label: 'Phone', type: 'string', required: true },
      { name: 'phoneLink', label: 'Phone Link (no spaces)', type: 'string' },
      {
        type: 'object' as const,
        name: 'location',
        label: 'Location',
        fields: [
          { name: 'city', label: 'City', type: 'string', required: true },
          { name: 'country', label: 'Country Code', type: 'string', required: true },
        ],
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'founder',
    label: 'Founder',
    fields: [
      { name: 'name', label: 'Name', type: 'string', required: true },
    ],
  },
  {
    type: 'object' as const,
    name: 'socialLinks',
    label: 'Social Links',
    list: true,
    fields: [
      { name: 'name', label: 'Name', type: 'string', required: true },
      { name: 'url', label: 'URL', type: 'string', required: true },
      {
        name: 'icon',
        label: 'Icon (Iconify)',
        type: 'string',
        required: true,
        description: 'UnoCSS icon class, e.g. "i-simple-icons-instagram" or "i-mdi-linkedin"',
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'attribution',
    label: 'Attribution',
    fields: [
      { name: 'design', label: 'Design By', type: 'string' },
      { name: 'development', label: 'Development By', type: 'string' },
    ],
  },
  {
    type: 'object' as const,
    name: 'branding',
    label: 'Branding',
    fields: [
      { name: 'logo', label: 'Logo', type: 'image', required: true },
      { name: 'logoWhite', label: 'Logo (White)', type: 'image', required: true },
      { name: 'symbol', label: 'Symbol', type: 'image', required: true },
      { name: 'symbolWhite', label: 'Symbol (White)', type: 'image', required: true },
      { name: 'ogImage', label: 'Default OG Image', type: 'image', required: true },
    ],
  },
  {
    type: 'object' as const,
    name: 'seo',
    label: 'SEO',
    fields: [
      { name: 'priceRange', label: 'Price Range', type: 'string' },
    ],
  },
];

// ============================================================================
// PAGE FIELDS (JSON)
// ============================================================================

const homePageFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Page Title', required: true, isTitle: true },
  { type: 'string' as const, name: 'description', label: 'Meta Description', required: true, ui: { component: 'textarea' } },
  { type: 'string' as const, name: 'headerStyle', label: 'Header Style', options: ['default', 'transparent'] },
  {
    type: 'object' as const,
    name: 'hero',
    label: 'Hero Section',
    fields: [
      { name: 'image', label: 'Background Image', type: 'image', required: true },
      {
        type: 'object' as const,
        name: 'topRight',
        label: 'Top Right Text (odd/even indent pattern)',
        fields: [
          { type: 'string' as const, name: 'lines', label: 'Lines', list: true },
        ],
      },
      {
        type: 'object' as const,
        name: 'tagline',
        label: 'Tagline',
        fields: [
          { type: 'string' as const, name: 'lines', label: 'Lines', list: true },
        ],
      },
      { name: 'taglineSub', label: 'Tagline Subtitle', type: 'string' },
    ],
  },
  {
    type: 'object' as const,
    name: 'about',
    label: 'About Section',
    fields: [
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' } },
      { name: 'ctaText', label: 'CTA Button Text', type: 'string' },
      { name: 'ctaLink', label: 'CTA Button Link', type: 'string' },
    ],
  },
];

const aboutPageFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Page Title', required: true, isTitle: true },
  { type: 'string' as const, name: 'description', label: 'Meta Description', required: true, ui: { component: 'textarea' } },
  { type: 'image' as const, name: 'heroImage', label: 'Hero Image' },
  {
    type: 'object' as const,
    name: 'hero',
    label: 'Hero Section',
    fields: [
      { name: 'title', label: 'Title', type: 'string', required: true },
    ],
  },
  {
    type: 'object' as const,
    name: 'behindName',
    label: 'Behind the Name',
    fields: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'p1', label: 'Paragraph 1', type: 'string', ui: { component: 'textarea' }, required: true },
      { name: 'p2', label: 'Paragraph 2', type: 'string', ui: { component: 'textarea' }, required: true },
      { name: 'footnote', label: 'Footnote', type: 'string' },
    ],
  },
  { type: 'image' as const, name: 'bannerImage', label: 'Banner Image' },
  {
    type: 'object' as const,
    name: 'bio',
    label: 'Biography',
    fields: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'image', label: 'Photo', type: 'image' },
      { name: 'paragraphs', label: 'Paragraphs', type: 'string', list: true, ui: { component: 'textarea' } },
    ],
  },
  {
    type: 'object' as const,
    name: 'awards',
    label: 'Awards',
    fields: [
      { name: 'title', label: 'Section Title', type: 'string' },
      {
        name: 'items',
        label: 'Awards List',
        type: 'object',
        list: true,
        fields: [
          { name: 'year', label: 'Year', type: 'string', required: true },
          { name: 'project', label: 'Project', type: 'string', required: true },
          { name: 'award', label: 'Award Name', type: 'string', required: true },
          { name: 'link', label: 'Link', type: 'string' },
        ],
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'mission',
    label: 'Mission',
    fields: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'p1', label: 'Paragraph 1', type: 'string', ui: { component: 'textarea' }, required: true },
      { name: 'p2', label: 'Paragraph 2', type: 'string', ui: { component: 'textarea' }, required: true },
      { name: 'quote', label: 'Quote', type: 'string', ui: { component: 'textarea' } },
    ],
  },
  { type: 'image' as const, name: 'missionImage', label: 'Mission Banner Image' },
];

const servicesPageFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Page Title', required: true, isTitle: true },
  { type: 'string' as const, name: 'description', label: 'Meta Description', required: true, ui: { component: 'textarea' } },
  {
    type: 'object' as const,
    name: 'hero',
    label: 'Hero Section',
    fields: [
      { name: 'title', label: 'Title', type: 'string', required: true },
    ],
  },
  {
    type: 'object' as const,
    name: 'intro',
    label: 'Introduction',
    fields: [
      { name: 'text', label: 'Text', type: 'string', ui: { component: 'textarea' }, required: true },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    type: 'object' as const,
    name: 'serviceGroups',
    label: 'Service Groups',
    list: true,
    fields: [
      { name: 'title', label: 'Group Title', type: 'string', required: true },
      {
        name: 'items',
        label: 'Services',
        type: 'object',
        list: true,
        fields: [
          { name: 'title', label: 'Service Title', type: 'string', required: true },
          { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' }, required: true },
        ],
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'faq',
    label: 'FAQ Section',
    fields: [
      { name: 'title', label: 'Section Title', type: 'string' },
      { name: 'image', label: 'Footer Image', type: 'image' },
      {
        name: 'items',
        label: 'Questions',
        type: 'object',
        list: true,
        fields: [
          { name: 'question', label: 'Question', type: 'string', required: true },
          { name: 'answer', label: 'Answer', type: 'string', ui: { component: 'textarea' }, required: true },
        ],
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'workProcess',
    label: 'Work Process',
    fields: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'p1', label: 'Paragraph 1', type: 'string', ui: { component: 'textarea' }, required: true },
      { name: 'p2', label: 'Paragraph 2', type: 'string', ui: { component: 'textarea' }, required: true },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
];

const contactPageFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Page Title', required: true, isTitle: true },
  { type: 'string' as const, name: 'description', label: 'Meta Description', required: true, ui: { component: 'textarea' } },
  { type: 'string' as const, name: 'heading', label: 'Heading', required: true },
  { type: 'string' as const, name: 'subheading', label: 'Subheading', required: true },
];

// ============================================================================
// LEGAL PAGE FIELDS (MDX)
// ============================================================================

const legalPageFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Title', required: true, isTitle: true },
  { type: 'string' as const, name: 'description', label: 'Meta Description', required: true, ui: { component: 'textarea' } },
  { type: 'datetime' as const, name: 'lastUpdated', label: 'Last Updated' },
  { type: 'rich-text' as const, name: 'body', label: 'Content', isBody: true },
];

// ============================================================================
// TRANSLATIONS FIELDS
// ============================================================================

const translationFields: TinaField[] = [
  {
    type: 'object' as const,
    name: 'nav',
    label: 'Navigation',
    fields: [
      { name: 'social', label: 'Social Label', type: 'string' },
      { name: 'menu', label: 'Menu Label', type: 'string' },
      { name: 'letsTalk', label: "Let's Talk", type: 'string' },
      { name: 'about', label: 'About', type: 'string' },
      { name: 'projects', label: 'Projects', type: 'string' },
      { name: 'services', label: 'Services', type: 'string' },
      { name: 'contact', label: 'Contact', type: 'string' },
    ],
  },
  {
    type: 'object' as const,
    name: 'footer',
    label: 'Footer',
    fields: [
      { name: 'privacy', label: 'Privacy Policy Link', type: 'string' },
      { name: 'legal', label: 'Legal Notice Link', type: 'string' },
      {
        name: 'links',
        label: 'Navigation Links',
        type: 'object',
        list: true,
        ui: {
          itemProps: (item) => ({ label: item?.label }),
        },
        fields: [
          { name: 'label', label: 'Label', type: 'string', required: true },
          { name: 'href', label: 'URL Path (include lang prefix if needed, e.g. /es/about)', type: 'string', required: true },
        ],
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'contactForm',
    label: 'Contact Form',
    fields: [
      { name: 'name', label: 'Name Field', type: 'string' },
      { name: 'company', label: 'Company Field', type: 'string' },
      { name: 'email', label: 'Email Field', type: 'string' },
      { name: 'phone', label: 'Phone Field', type: 'string' },
      { name: 'projectType', label: 'Project Type Label', type: 'string' },
      {
        type: 'object' as const,
        name: 'projectTypes',
        label: 'Project Types',
        fields: [
          { name: 'commercial', label: 'Commercial', type: 'string' },
          { name: 'restaurant', label: 'Restaurant', type: 'string' },
          { name: 'entertainment', label: 'Entertainment', type: 'string' },
          { name: 'other', label: 'Other', type: 'string' },
        ],
      },
      { name: 'serviceType', label: 'Service Type Label', type: 'string' },
      {
        type: 'object' as const,
        name: 'serviceTypes',
        label: 'Service Types',
        fields: [
          { name: 'fullPackage', label: 'Full Package', type: 'string' },
          { name: 'concept', label: 'Concept Only', type: 'string' },
          { name: 'unsure', label: 'Not Sure', type: 'string' },
        ],
      },
      { name: 'message', label: 'Message Field', type: 'string' },
      { name: 'privacy', label: 'Privacy Checkbox', type: 'string' },
      { name: 'submit', label: 'Submit Button', type: 'string' },
      { name: 'sending', label: 'Sending Text', type: 'string' },
      { name: 'success', label: 'Success Message', type: 'string' },
      { name: 'error', label: 'Error Message', type: 'string' },
      { name: 'turnstileFailed', label: 'Turnstile Failed Message', type: 'string' },
    ],
  },
  {
    type: 'object' as const,
    name: 'projects',
    label: 'Projects Page',
    fields: [
      { name: 'title', label: 'Page Title', type: 'string' },
      { name: 'description', label: 'Meta Description', type: 'string' },
      { name: 'heading', label: 'Heading', type: 'string' },
    ],
  },
  {
    type: 'object' as const,
    name: 'accessibility',
    label: 'Accessibility',
    fields: [
      { name: 'skipToContent', label: 'Skip to Content', type: 'string' },
      { name: 'selectLanguage', label: 'Select Language', type: 'string' },
      { name: 'toggleMenu', label: 'Toggle Menu', type: 'string' },
      { name: 'closeMenu', label: 'Close Menu', type: 'string' },
      { name: 'previousSlide', label: 'Previous Slide', type: 'string' },
      { name: 'nextSlide', label: 'Next Slide', type: 'string' },
      { name: 'goToSlide', label: 'Go to Slide', type: 'string' },
    ],
  },
];

// ============================================================================
// PROJECT FIELDS (JSON - rigid layout)
// ============================================================================

const projectFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Title', required: true, isTitle: true },
  { type: 'string' as const, name: 'description', label: 'Description', required: true, ui: { component: 'textarea' } },
  { type: 'string' as const, name: 'slug', label: 'URL Slug', required: true },
  { type: 'datetime' as const, name: 'publishDate', label: 'Publish Date', required: true },
  { type: 'datetime' as const, name: 'completedDate', label: 'Completed Date' },
  { type: 'string' as const, name: 'tags', label: 'Tags', list: true },
  { type: 'boolean' as const, name: 'showTags', label: 'Show Tags on Projects List' },
  { type: 'boolean' as const, name: 'featured', label: 'Featured' },
  { type: 'boolean' as const, name: 'draft', label: 'Draft' },
  {
    type: 'object' as const,
    name: 'banner',
    label: 'Banner',
    fields: [
      { type: 'image' as const, name: 'image', label: 'Cover Image', required: true },
      { type: 'string' as const, name: 'alt', label: 'Alt Text', required: true },
    ],
  },
  {
    type: 'object' as const,
    name: 'details',
    label: 'Project Details',
    fields: [
      { type: 'string' as const, name: 'title', label: 'Title', required: true },
      { type: 'string' as const, name: 'subtitle', label: 'Subtitle', required: true },
      { type: 'image' as const, name: 'image', label: 'Detail Image', required: true },
      { type: 'string' as const, name: 'services', label: 'Services', required: true },
      { type: 'string' as const, name: 'servicesLabel', label: 'Services Label', required: true },
      { type: 'string' as const, name: 'category', label: 'Category', required: true },
      { type: 'string' as const, name: 'categoryLabel', label: 'Category Label', required: true },
      { type: 'string' as const, name: 'area', label: 'Area', required: true },
      { type: 'string' as const, name: 'areaLabel', label: 'Area Label', required: true },
      { type: 'string' as const, name: 'location', label: 'Location', required: true },
      { type: 'string' as const, name: 'locationLabel', label: 'Location Label', required: true },
    ],
  },
  {
    type: 'object' as const,
    name: 'brief',
    label: 'Brief Section',
    fields: [
      { type: 'string' as const, name: 'title', label: 'Section Title', required: true },
      { type: 'string' as const, name: 'text', label: 'Text', required: true, ui: { component: 'textarea' } },
      {
        type: 'object' as const,
        name: 'gallery',
        label: 'Gallery',
        fields: galleryFields,
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'concept',
    label: 'Concept Section',
    fields: [
      { type: 'string' as const, name: 'title', label: 'Section Title', required: true },
      { type: 'string' as const, name: 'text', label: 'Text', required: true, ui: { component: 'textarea' } },
      {
        type: 'object' as const,
        name: 'gallery',
        label: 'Gallery',
        fields: galleryFields,
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'strategy',
    label: 'Strategy Section',
    fields: [
      { type: 'string' as const, name: 'title', label: 'Section Title', required: true },
      { type: 'string' as const, name: 'text', label: 'Text', required: true, ui: { component: 'textarea' } },
      {
        type: 'object' as const,
        name: 'carousel',
        label: 'Carousel Slides',
        list: true,
        fields: imageFields,
      },
      {
        type: 'object' as const,
        name: 'gallery',
        label: 'Gallery',
        fields: galleryFields,
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'collaborators',
    label: 'Collaborators Section',
    fields: [
      { type: 'string' as const, name: 'title', label: 'Section Title', required: true },
      {
        type: 'object' as const,
        name: 'list',
        label: 'Collaborators',
        list: true,
        fields: [
          { type: 'string' as const, name: 'name', label: 'Name', required: true },
          { type: 'string' as const, name: 'role', label: 'Role', required: true },
        ],
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'finalImage',
    label: 'Final Image',
    fields: imageFields,
  },
];

function localeFromDocument(document: { _sys: { breadcrumbs?: string[]; path?: string } }) {
  return document._sys.breadcrumbs?.[0] || document._sys.path?.split('/').at(-2) || 'es';
}

// ============================================================================
// TINA CONFIG
// ============================================================================

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.CF_PAGES_BRANCH || 'main',
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      // ========================================
      // SITE CONFIG (single file)
      // ========================================
      {
        name: 'siteConfig',
        label: 'Site Configuration',
        path: 'src/content/config',
        format: 'json',
        match: { include: 'site' },
        fields: siteConfigFields,
        ui: {
          allowedActions: { create: false, delete: false },
        },
      },

      // ========================================
      // PAGE SINGLETONS (JSON)
      // ========================================
      {
        name: 'home',
        label: 'Pages / Home',
        path: 'src/content/pages',
        format: 'json',
        match: { include: '*/home' },
        fields: homePageFields,
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => `/${localeFromDocument(document)}/`,
        },
      },
      {
        name: 'about',
        label: 'Pages / About',
        path: 'src/content/pages',
        format: 'json',
        match: { include: '*/about' },
        fields: aboutPageFields,
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => `/${localeFromDocument(document)}/about`,
        },
      },
      {
        name: 'services',
        label: 'Pages / Services',
        path: 'src/content/pages',
        format: 'json',
        match: { include: '*/services' },
        fields: servicesPageFields,
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => `/${localeFromDocument(document)}/services`,
        },
      },
      {
        name: 'contact',
        label: 'Pages / Contact',
        path: 'src/content/pages',
        format: 'json',
        match: { include: '*/contact' },
        fields: contactPageFields,
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => `/${localeFromDocument(document)}/contact`,
        },
      },

      // ========================================
      // LEGAL PAGES (MDX)
      // ========================================
      {
        name: 'legal',
        label: 'Legal / Pages',
        path: 'src/content/legal',
        format: 'mdx',
        fields: legalPageFields,
        ui: {
          router: ({ document }) => `/${localeFromDocument(document)}/${document._sys.filename}`,
        },
      },

      // ========================================
      // PROJECTS (JSON - rigid layout)
      // ========================================
      {
        name: 'projects',
        label: 'Portfolio / Projects',
        path: 'src/content/projects',
        format: 'json',
        fields: projectFields,
        ui: {
          router: ({ document }) => `/${localeFromDocument(document)}/projects/${document._sys.filename}`,
          filename: {
            slugify: (values) => values?.slug || values?.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'untitled',
          },
        },
      },

      // ========================================
      // TRANSLATIONS
      // ========================================
      {
        name: 'translations',
        label: 'System / Translations',
        path: 'src/content/translations',
        format: 'json',
        fields: translationFields,
        ui: {
          allowedActions: { create: false, delete: false },
        },
      },
    ],
  },
});
