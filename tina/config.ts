// tina/config.ts
import { defineConfig, type Template, type TinaField } from 'tinacms';

// ============================================================================
// SHORTCODE TEMPLATES - Custom components for rich-text editor
// ============================================================================

const bannerTemplate: Template = {
  name: 'banner',
  label: 'Banner Image',
  fields: [
    { name: 'src', label: 'Image', type: 'image', required: true },
    { name: 'alt', label: 'Alt Text', type: 'string' },
  ],
};

const detailsSectionTemplate: Template = {
  name: 'detailsSection',
  label: 'Details Section',
  fields: [
    { name: 'title', label: 'Title', type: 'string', required: true },
    { name: 'subtitle', label: 'Subtitle', type: 'string' },
    { name: 'services', label: 'Services', type: 'string', required: true },
    { name: 'servicesLabel', label: 'Services Label', type: 'string' },
    { name: 'category', label: 'Category', type: 'string', required: true },
    { name: 'categoryLabel', label: 'Category Label', type: 'string' },
    { name: 'area', label: 'Area', type: 'string', required: true },
    { name: 'areaLabel', label: 'Area Label', type: 'string' },
    { name: 'location', label: 'Location', type: 'string', required: true },
    { name: 'locationLabel', label: 'Location Label', type: 'string' },
    { name: 'image', label: 'Details Image', type: 'image' },
  ],
};

const sectionTemplate: Template = {
  name: 'section',
  label: 'Content Section',
  fields: [
    { name: 'title', label: 'Title', type: 'string', required: true },
    { name: 'id', label: 'Section ID', type: 'string' },
    { name: 'content', label: 'Content', type: 'rich-text' },
  ],
};

const galleryTemplate: Template = {
  name: 'gallery',
  label: 'Image Gallery',
  fields: [
    { name: 'cols', label: 'Columns', type: 'string', options: ['2', '3', '4'] },
    { name: 'gap', label: 'Gap', type: 'string' },
    {
      name: 'images',
      label: 'Images',
      type: 'object',
      list: true,
      fields: [
        { name: 'src', label: 'Image', type: 'image', required: true },
        { name: 'alt', label: 'Alt Text', type: 'string' },
      ],
    },
  ],
};

const carouselTemplate: Template = {
  name: 'carousel',
  label: 'Image Carousel',
  fields: [
    { name: 'id', label: 'Carousel ID', type: 'string', required: true },
    {
      name: 'slides',
      label: 'Slides',
      type: 'object',
      list: true,
      fields: [
        { name: 'src', label: 'Image', type: 'image', required: true },
        { name: 'alt', label: 'Alt Text', type: 'string' },
      ],
    },
  ],
};

const collaboratorsTemplate: Template = {
  name: 'collaborators',
  label: 'Collaborators Section',
  fields: [
    { name: 'title', label: 'Section Title', type: 'string' },
    {
      name: 'list',
      label: 'Collaborators',
      type: 'object',
      list: true,
      fields: [
        { name: 'name', label: 'Name', type: 'string', required: true },
        { name: 'role', label: 'Role', type: 'string', required: true },
        { name: 'url', label: 'Website URL', type: 'string' },
      ],
    },
    { name: 'image', label: 'Footer Image', type: 'image' },
  ],
};

const figureTemplate: Template = {
  name: 'figure',
  label: 'Figure with Caption',
  fields: [
    { name: 'src', label: 'Image', type: 'image', required: true },
    { name: 'alt', label: 'Alt Text', type: 'string' },
    { name: 'caption', label: 'Caption', type: 'string' },
    { name: 'width', label: 'Max Width', type: 'string' },
  ],
};

const youtubeTemplate: Template = {
  name: 'youtube',
  label: 'YouTube Video',
  fields: [
    { name: 'id', label: 'Video ID', type: 'string', required: true },
    { name: 'aspectRatio', label: 'Aspect Ratio', type: 'string' },
  ],
};

const buttonTemplate: Template = {
  name: 'button',
  label: 'Button',
  fields: [
    { name: 'href', label: 'Link URL', type: 'string', required: true },
    { name: 'text', label: 'Button Text', type: 'string', required: true },
    { name: 'variant', label: 'Style', type: 'string', options: ['primary', 'secondary', 'outline'] },
  ],
};

const spacerTemplate: Template = {
  name: 'spacer',
  label: 'Spacer',
  fields: [
    { name: 'height', label: 'Height (px)', type: 'string' },
  ],
};

// Page-specific templates
const heroHomeTemplate: Template = {
  name: 'heroHome',
  label: 'Home Hero',
  fields: [
    { name: 'image', label: 'Background Image', type: 'image', required: true },
    { name: 'topRight', label: 'Top Right Text', type: 'string' },
    { name: 'bottomLeft', label: 'Bottom Left Text', type: 'string' },
    { name: 'bottomLeftSub', label: 'Bottom Left Subtitle', type: 'string' },
  ],
};

const aboutHomeTemplate: Template = {
  name: 'aboutHome',
  label: 'Home About Section',
  fields: [
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' } },
    { name: 'cta', label: 'CTA Text', type: 'string' },
    { name: 'ctaLink', label: 'CTA Link', type: 'string' },
  ],
};

const heroServicesTemplate: Template = {
  name: 'heroServices',
  label: 'Services Hero',
  fields: [
    { name: 'title', label: 'Title', type: 'string', required: true },
    { name: 'symbolImage', label: 'Symbol Image', type: 'image' },
  ],
};

const introServicesTemplate: Template = {
  name: 'introServices',
  label: 'Services Intro',
  fields: [
    { name: 'text', label: 'Text', type: 'string', ui: { component: 'textarea' } },
    { name: 'image', label: 'Image', type: 'image' },
  ],
};

const servicesGroupTemplate: Template = {
  name: 'servicesGroup',
  label: 'Services Group',
  fields: [
    { name: 'title', label: 'Group Title', type: 'string', required: true },
    {
      name: 'items',
      label: 'Services',
      type: 'object',
      list: true,
      fields: [
        { name: 'title', label: 'Service Title', type: 'string', required: true },
        { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' } },
      ],
    },
  ],
};

const faqTemplate: Template = {
  name: 'faq',
  label: 'FAQ Item',
  fields: [
    { name: 'question', label: 'Question', type: 'string', required: true },
    { name: 'answer', label: 'Answer', type: 'string', ui: { component: 'textarea' }, required: true },
  ],
};

const workProcessTemplate: Template = {
  name: 'workProcess',
  label: 'Work Process Section',
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'p1', label: 'Paragraph 1', type: 'string', ui: { component: 'textarea' } },
    { name: 'p2', label: 'Paragraph 2', type: 'string', ui: { component: 'textarea' } },
    { name: 'image', label: 'Image', type: 'image' },
  ],
};

const aboutHeroTemplate: Template = {
  name: 'aboutHero',
  label: 'About Hero',
  fields: [
    { name: 'title', label: 'Title', type: 'string', required: true },
  ],
};

const behindNameTemplate: Template = {
  name: 'behindName',
  label: 'Behind the Name',
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'p1', label: 'Paragraph 1', type: 'string', ui: { component: 'textarea' } },
    { name: 'p2', label: 'Paragraph 2', type: 'string', ui: { component: 'textarea' } },
    { name: 'footnote', label: 'Footnote', type: 'string' },
  ],
};

const aboutBioTemplate: Template = {
  name: 'aboutBio',
  label: 'About Bio Section',
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'image', label: 'Photo', type: 'image' },
    { name: 'paragraphs', label: 'Bio Paragraphs', type: 'string', list: true, ui: { component: 'textarea' } },
  ],
};

const awardTemplate: Template = {
  name: 'award',
  label: 'Award',
  fields: [
    { name: 'year', label: 'Year', type: 'string', required: true },
    { name: 'project', label: 'Project', type: 'string', required: true },
    { name: 'award', label: 'Award Name', type: 'string', required: true },
    { name: 'link', label: 'Link', type: 'string' },
  ],
};

const aboutMissionTemplate: Template = {
  name: 'aboutMission',
  label: 'About Mission',
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'p1', label: 'Paragraph 1', type: 'string', ui: { component: 'textarea' } },
    { name: 'p2', label: 'Paragraph 2', type: 'string', ui: { component: 'textarea' } },
    { name: 'quote', label: 'Quote', type: 'string', ui: { component: 'textarea' } },
  ],
};

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
    ],
  },
  {
    type: 'object' as const,
    name: 'contact',
    label: 'Contact Page',
    fields: [
      { name: 'title', label: 'Page Title', type: 'string' },
      { name: 'description', label: 'Meta Description', type: 'string' },
      { name: 'heading', label: 'Heading', type: 'string' },
      { name: 'subheading', label: 'Subheading', type: 'string' },
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
    name: 'cookies',
    label: 'Cookie Consent',
    fields: [
      { name: 'message', label: 'Message', type: 'string', ui: { component: 'textarea' } },
      { name: 'moreInfo', label: 'More Info Link', type: 'string' },
      { name: 'accept', label: 'Accept Button', type: 'string' },
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
// COLLECTION TEMPLATES
// ============================================================================

// All shortcode templates for projects
const projectTemplates = [
  bannerTemplate,
  detailsSectionTemplate,
  sectionTemplate,
  galleryTemplate,
  carouselTemplate,
  collaboratorsTemplate,
  figureTemplate,
  youtubeTemplate,
  buttonTemplate,
  spacerTemplate,
];

// All shortcode templates for pages (includes page-specific ones)
const pageTemplates = [
  ...projectTemplates,
  heroHomeTemplate,
  aboutHomeTemplate,
  heroServicesTemplate,
  introServicesTemplate,
  servicesGroupTemplate,
  faqTemplate,
  workProcessTemplate,
  aboutHeroTemplate,
  behindNameTemplate,
  aboutBioTemplate,
  awardTemplate,
  aboutMissionTemplate,
];

// Project fields with shortcode-aware body
const projectFields: TinaField[] = [
  {
    type: 'string' as const,
    name: 'title',
    label: 'Title',
    required: true,
    isTitle: true,
  },
  {
    type: 'string' as const,
    name: 'description',
    label: 'Description',
    required: true,
    ui: { component: 'textarea' },
  },
  {
    type: 'datetime' as const,
    name: 'publishDate',
    label: 'Publish Date',
    required: true,
  },
  {
    type: 'datetime' as const,
    name: 'completedDate',
    label: 'Completed Date',
  },
  {
    type: 'string' as const,
    name: 'tags',
    label: 'Tags',
    list: true,
  },
  {
    type: 'image' as const,
    name: 'coverImage',
    label: 'Cover Image',
    required: true,
  },
  {
    type: 'boolean' as const,
    name: 'featured',
    label: 'Featured',
  },
  {
    type: 'boolean' as const,
    name: 'draft',
    label: 'Draft',
  },
  {
    type: 'rich-text' as const,
    name: 'body',
    label: 'Content (Shortcodes)',
    isBody: true,
    templates: projectTemplates,
  },
];

// Page fields with all templates
const pageFields: TinaField[] = [
  {
    type: 'string' as const,
    name: 'title',
    label: 'Title',
    required: true,
    isTitle: true,
  },
  {
    type: 'string' as const,
    name: 'description',
    label: 'Description',
    required: true,
    ui: { component: 'textarea' },
  },
  {
    type: 'image' as const,
    name: 'heroImage',
    label: 'Hero Image',
  },
  {
    type: 'string' as const,
    name: 'headerStyle',
    label: 'Header Style',
    options: ['default', 'transparent'],
  },
  {
    type: 'rich-text' as const,
    name: 'body',
    label: 'Content (Shortcodes)',
    isBody: true,
    templates: pageTemplates,
  },
];

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
      // PROJECTS
      // ========================================
      {
        name: 'projects_es',
        label: 'Projects (Spanish)',
        path: 'src/content/projects/es',
        format: 'mdx',
        fields: projectFields,
        ui: {
          filename: {
            slugify: (values) => values?.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'untitled',
          },
        },
      },
      {
        name: 'projects_ca',
        label: 'Projects (Catalan)',
        path: 'src/content/projects/ca',
        format: 'mdx',
        fields: projectFields,
        ui: {
          filename: {
            slugify: (values) => values?.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'untitled',
          },
        },
      },
      {
        name: 'projects_en',
        label: 'Projects (English)',
        path: 'src/content/projects/en',
        format: 'mdx',
        fields: projectFields,
        ui: {
          filename: {
            slugify: (values) => values?.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'untitled',
          },
        },
      },

      // ========================================
      // PAGES
      // ========================================
      {
        name: 'pages_es',
        label: 'Pages (Spanish)',
        path: 'src/content/pages/es',
        format: 'mdx',
        fields: pageFields,
      },
      {
        name: 'pages_ca',
        label: 'Pages (Catalan)',
        path: 'src/content/pages/ca',
        format: 'mdx',
        fields: pageFields,
      },
      {
        name: 'pages_en',
        label: 'Pages (English)',
        path: 'src/content/pages/en',
        format: 'mdx',
        fields: pageFields,
      },

      // ========================================
      // TRANSLATIONS
      // ========================================
      {
        name: 'translations_es',
        label: 'Translations (Spanish)',
        path: 'src/content/translations',
        format: 'json',
        match: { include: 'es' },
        fields: translationFields,
      },
      {
        name: 'translations_ca',
        label: 'Translations (Catalan)',
        path: 'src/content/translations',
        format: 'json',
        match: { include: 'ca' },
        fields: translationFields,
      },
      {
        name: 'translations_en',
        label: 'Translations (English)',
        path: 'src/content/translations',
        format: 'json',
        match: { include: 'en' },
        fields: translationFields,
      },
    ],
  },
});
