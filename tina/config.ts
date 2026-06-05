// tina/config.ts
import { defineConfig, type TinaField } from 'tinacms';

// ============================================================================
// SHARED FIELD DEFINITIONS
// ============================================================================

// Image field object (for nested use)
const imageFields: TinaField[] = [
  { type: 'image' as const, name: 'src', label: 'Image' },
  { type: 'string' as const, name: 'alt', label: 'Alt Text' },
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
  { type: 'string' as const, name: 'siteUrl', label: 'Site URL' },
  { type: 'string' as const, name: 'locales', label: 'Locales', list: true },
  { type: 'string' as const, name: 'defaultLocale', label: 'Default Locale' },
  {
    type: 'object' as const,
    name: 'company',
    label: 'Company',
    fields: [
      { name: 'name', label: 'Name', type: 'string' },
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
      { name: 'email', label: 'Email', type: 'string' },
      { name: 'phone', label: 'Phone', type: 'string' },
      { name: 'phoneLink', label: 'Phone Link (no spaces)', type: 'string' },
      {
        type: 'object' as const,
        name: 'location',
        label: 'Location',
        fields: [
          { name: 'city', label: 'City', type: 'string' },
          { name: 'country', label: 'Country Code', type: 'string' },
        ],
      },
    ],
  },
  {
    type: 'object' as const,
    name: 'founder',
    label: 'Founder',
    fields: [
      { name: 'name', label: 'Name', type: 'string' },
    ],
  },
  {
    type: 'object' as const,
    name: 'socialLinks',
    label: 'Social Links',
    list: true,
    fields: [
      { name: 'name', label: 'Name', type: 'string' },
      { name: 'url', label: 'URL', type: 'string' },
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
      { name: 'logo', label: 'Logo', type: 'image' },
      { name: 'logoWhite', label: 'Logo (White)', type: 'image' },
      { name: 'symbol', label: 'Symbol', type: 'image' },
      { name: 'symbolWhite', label: 'Symbol (White)', type: 'image' },
      { name: 'ogImage', label: 'Default OG Image', type: 'image' },
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
// BLOCK TEMPLATES
// ============================================================================

const contactFormBlock: TinaField = {
  name: 'contactForm',
  label: 'Contact Form Layout',
  type: 'object',
  fields: [
    { type: 'image', name: 'bannerImage', label: 'Banner Image' },
    { type: 'string', name: 'heading', label: 'Heading' },
    { type: 'string', name: 'subheading', label: 'Subheading' },
  ],
};

const homeHeroBlock: TinaField = {
  name: 'homeHero',
  label: 'Home Hero',
  type: 'object',
  fields: [
    { name: 'image', label: 'Background Image', type: 'image' },
    {
      type: 'object',
      name: 'topRight',
      label: 'Top Right Text (odd/even indent pattern)',
      fields: [{ type: 'string', name: 'lines', label: 'Lines', list: true }],
    },
    {
      type: 'object',
      name: 'tagline',
      label: 'Tagline',
      fields: [{ type: 'string', name: 'lines', label: 'Lines', list: true }],
    },
    { name: 'taglineSub', label: 'Tagline Subtitle', type: 'string' },
  ]
};

const homeAboutBlock: TinaField = {
  name: 'homeAbout',
  label: 'Home About',
  type: 'object',
  fields: [
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' } },
    { name: 'ctaText', label: 'CTA Button Text', type: 'string' },
    { name: 'ctaLink', label: 'CTA Button Link', type: 'string' },
  ]
};

const aboutHeroBlock: TinaField = {
  name: 'aboutHero',
  label: 'About Hero',
  type: 'object',
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
  ]
};

const behindNameBlock: TinaField = {
  name: 'behindName',
  label: 'Behind the Name',
  type: 'object',
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'p1', label: 'Paragraph 1', type: 'string', ui: { component: 'textarea' } },
    { name: 'p2', label: 'Paragraph 2', type: 'string', ui: { component: 'textarea' } },
    { name: 'footnote', label: 'Footnote', type: 'string' },
  ]
};

const bannerImageBlock: TinaField = {
  name: 'bannerImage',
  label: 'Banner Image',
  type: 'object',
  fields: [
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'alt', label: 'Alt Text', type: 'string' }
  ]
};

const bioBlock: TinaField = {
  name: 'bio',
  label: 'Biography',
  type: 'object',
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'image', label: 'Photo', type: 'image' },
    { name: 'paragraphs', label: 'Paragraphs', type: 'string', list: true, ui: { component: 'textarea' } },
  ]
};

const awardsBlock: TinaField = {
  name: 'awards',
  label: 'Awards',
  type: 'object',
  fields: [
    { name: 'title', label: 'Section Title', type: 'string' },
    {
      name: 'items',
      label: 'Awards List',
      type: 'object',
      list: true,
      fields: [
        { name: 'year', label: 'Year', type: 'string' },
        { name: 'project', label: 'Project', type: 'string' },
        { name: 'award', label: 'Award Name', type: 'string' },
        { name: 'link', label: 'Link', type: 'string' },
      ],
    },
  ]
};

const missionBlock: TinaField = {
  name: 'mission',
  label: 'Mission',
  type: 'object',
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'p1', label: 'Paragraph 1', type: 'string', ui: { component: 'textarea' } },
    { name: 'p2', label: 'Paragraph 2', type: 'string', ui: { component: 'textarea' } },
    { name: 'quote', label: 'Quote', type: 'string', ui: { component: 'textarea' } },
  ]
};

const servicesHeroBlock: TinaField = {
  name: 'servicesHero',
  label: 'Services Hero',
  type: 'object',
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
  ]
};

const servicesIntroBlock: TinaField = {
  name: 'servicesIntro',
  label: 'Services Introduction',
  type: 'object',
  fields: [
    { name: 'text', label: 'Text', type: 'string', ui: { component: 'textarea' } },
    { name: 'image', label: 'Image', type: 'image' },
  ]
};

const serviceGroupsBlock: TinaField = {
  name: 'serviceGroups',
  label: 'Service Groups',
  type: 'object',
  fields: [
    {
      name: 'groups',
      label: 'Groups',
      type: 'object',
      list: true,
      fields: [
        { name: 'title', label: 'Group Title', type: 'string' },
        {
          name: 'items',
          label: 'Services',
          type: 'object',
          list: true,
          fields: [
            { name: 'title', label: 'Service Title', type: 'string' },
            { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' } },
          ],
        },
      ]
    }
  ]
};

const faqBlock: TinaField = {
  name: 'faq',
  label: 'FAQ Section',
  type: 'object',
  fields: [
    { name: 'title', label: 'Section Title', type: 'string' },
    { name: 'image', label: 'Footer Image', type: 'image' },
    {
      name: 'items',
      label: 'Questions',
      type: 'object',
      list: true,
      fields: [
        { name: 'question', label: 'Question', type: 'string' },
        { name: 'answer', label: 'Answer', type: 'string', ui: { component: 'textarea' } },
      ],
    },
  ]
};

const workProcessBlock: TinaField = {
  name: 'workProcess',
  label: 'Work Process',
  type: 'object',
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'p1', label: 'Paragraph 1', type: 'string', ui: { component: 'textarea' } },
    { name: 'p2', label: 'Paragraph 2', type: 'string', ui: { component: 'textarea' } },
    { name: 'image', label: 'Image', type: 'image' },
  ]
};

const editorialHeroBlock: TinaField = {
  name: 'editorialHero',
  label: 'Editorial Hero',
  type: 'object',
  fields: [
    { name: 'title', label: 'Title', type: 'string', ui: { component: 'textarea' } },
    { name: 'intro', label: 'Introduction', type: 'string', ui: { component: 'textarea' } },
    { name: 'ctaText', label: 'Link Text', type: 'string' },
    { name: 'ctaLink', label: 'Link URL', type: 'string' },
    { name: 'mediaType', label: 'Media Type', type: 'string', options: ['image', 'video'] },
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'imageAlt', label: 'Image Alt Text', type: 'string' },
    { name: 'placeholderLabel', label: 'Placeholder Label', type: 'string' },
  ],
};

const editorialCopyBlock: TinaField = {
  name: 'editorialCopy',
  label: 'Editorial Copy',
  type: 'object',
  fields: [
    { name: 'eyebrow', label: 'Eyebrow', type: 'string' },
    { name: 'title', label: 'Title', type: 'string', ui: { component: 'textarea' } },
    { name: 'headingLevel', label: 'Heading Level', type: 'string', options: ['h1', 'h2'] },
    { name: 'body', label: 'Body', type: 'string', ui: { component: 'textarea' } },
  ],
};

const editorialAccordionBlock: TinaField = {
  name: 'editorialAccordion',
  label: 'Editorial Accordion',
  type: 'object',
  fields: [
    { name: 'intro', label: 'Introduction', type: 'string', ui: { component: 'textarea' } },
    {
      name: 'items',
      label: 'Accordion Items',
      type: 'object',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.number || ''} ${item?.title || ''}`.trim() }) },
      fields: [
        { name: 'number', label: 'Number', type: 'string' },
        { name: 'title', label: 'Title', type: 'string' },
        { name: 'summary', label: 'Summary', type: 'string', ui: { component: 'textarea' } },
        { name: 'open', label: 'Open by Default', type: 'boolean' },
        {
          name: 'details',
          label: 'Expanded Details',
          type: 'object',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          fields: [
            { name: 'label', label: 'Label', type: 'string' },
            { name: 'text', label: 'Text', type: 'string', ui: { component: 'textarea' } },
          ],
        },
      ],
    },
  ],
};

const editorialRowsBlock: TinaField = {
  name: 'editorialRows',
  label: 'Editorial Rows',
  type: 'object',
  fields: [
    { name: 'title', label: 'Title', type: 'string', ui: { component: 'textarea' } },
    { name: 'intro', label: 'Introduction', type: 'string', ui: { component: 'textarea' } },
    {
      name: 'items',
      label: 'Rows',
      type: 'object',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title }) },
      fields: [
        { name: 'title', label: 'Title', type: 'string' },
        { name: 'text', label: 'Text', type: 'string', ui: { component: 'textarea' } },
      ],
    },
  ],
};

const editorialCtaBlock: TinaField = {
  name: 'editorialCta',
  label: 'Editorial Call to Action',
  type: 'object',
  fields: [
    { name: 'text', label: 'Text', type: 'string' },
    { name: 'link', label: 'URL', type: 'string' },
  ],
};

const editorialShowcaseBlock: TinaField = {
  name: 'editorialShowcase',
  label: 'Editorial Media / Work Showcase',
  type: 'object',
  fields: [
    { name: 'eyebrow', label: 'Eyebrow', type: 'string' },
    { name: 'title', label: 'Title', type: 'string', ui: { component: 'textarea' } },
    { name: 'mediaType', label: 'Media Type', type: 'string', options: ['image', 'video'] },
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'imageAlt', label: 'Image Alt Text', type: 'string' },
    { name: 'placeholderLabel', label: 'Placeholder Label', type: 'string' },
    { name: 'ctaText', label: 'Link Text', type: 'string' },
    { name: 'ctaLink', label: 'Link URL', type: 'string' },
    {
      name: 'items',
      label: 'Work Items',
      type: 'object',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title }) },
      fields: [
        { name: 'title', label: 'Title', type: 'string' },
        { name: 'link', label: 'URL', type: 'string' },
        { name: 'image', label: 'Image', type: 'image' },
        { name: 'imageAlt', label: 'Image Alt Text', type: 'string' },
        { name: 'placeholderLabel', label: 'Placeholder Label', type: 'string' },
      ],
    },
  ],
};

const editorialMissionBlock: TinaField = {
  name: 'editorialMission',
  label: 'Studio Mission',
  type: 'object',
  fields: [
    { name: 'label', label: 'Label', type: 'string' },
    { name: 'paragraphs', label: 'Paragraphs', type: 'string', list: true, ui: { component: 'textarea' } },
    { name: 'statement', label: 'Closing Statement', type: 'string', ui: { component: 'textarea' } },
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'imageAlt', label: 'Image Alt Text', type: 'string' },
    { name: 'placeholderLabel', label: 'Placeholder Label', type: 'string' },
  ],
};

const projectBannerBlock: TinaField = {
  name: 'projectBanner',
  label: 'Project Banner',
  type: 'object',
  fields: [
    { type: 'image', name: 'image', label: 'Cover Image' },
    { type: 'string', name: 'alt', label: 'Alt Text' },
  ]
};

const projectDetailsBlock: TinaField = {
  name: 'projectDetails',
  label: 'Project Details',
  type: 'object',
  fields: [
    { type: 'string', name: 'title', label: 'Title' },
    { type: 'string', name: 'subtitle', label: 'Subtitle' },
    { type: 'image', name: 'image', label: 'Detail Image' },
    { type: 'string', name: 'services', label: 'Services' },
    { type: 'string', name: 'servicesLabel', label: 'Services Label' },
    { type: 'string', name: 'category', label: 'Category' },
    { type: 'string', name: 'categoryLabel', label: 'Category Label' },
    { type: 'string', name: 'area', label: 'Area' },
    { type: 'string', name: 'areaLabel', label: 'Area Label' },
    { type: 'string', name: 'location', label: 'Location' },
    { type: 'string', name: 'locationLabel', label: 'Location Label' },
  ]
};

const projectBriefBlock: TinaField = {
  name: 'projectBrief',
  label: 'Project Brief',
  type: 'object',
  fields: [
    { type: 'string', name: 'title', label: 'Section Title' },
    { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
    {
      type: 'object',
      name: 'gallery',
      label: 'Gallery',
      fields: galleryFields,
    },
  ]
};

const projectConceptBlock: TinaField = {
  name: 'projectConcept',
  label: 'Project Concept',
  type: 'object',
  fields: [
    { type: 'string', name: 'title', label: 'Section Title' },
    { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
    {
      type: 'object',
      name: 'gallery',
      label: 'Gallery',
      fields: galleryFields,
    },
  ]
};

const projectStrategyBlock: TinaField = {
  name: 'projectStrategy',
  label: 'Project Strategy',
  type: 'object',
  fields: [
    { type: 'string', name: 'title', label: 'Section Title' },
    { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
    {
      type: 'object',
      name: 'carousel',
      label: 'Carousel Slides',
      list: true,
      fields: imageFields,
    },
    {
      type: 'object',
      name: 'gallery',
      label: 'Gallery',
      fields: galleryFields,
    },
  ]
};

const projectCollaboratorsBlock: TinaField = {
  name: 'projectCollaborators',
  label: 'Project Collaborators',
  type: 'object',
  fields: [
    { type: 'string', name: 'title', label: 'Section Title' },
    {
      type: 'object',
      name: 'list',
      label: 'Collaborators',
      list: true,
      fields: [
        { type: 'string', name: 'name', label: 'Name' },
        { type: 'string', name: 'role', label: 'Role' },
      ],
    },
  ]
};

const projectFinalImageBlock: TinaField = {
  name: 'projectFinalImage',
  label: 'Project Final Image',
  type: 'object',
  fields: imageFields
};

const pageBlocksField: TinaField = {
  type: 'object',
  name: 'blocks',
  label: 'Page Blocks',
  list: true,
  templates: [
    homeHeroBlock,
    homeAboutBlock,
    aboutHeroBlock,
    behindNameBlock,
    bannerImageBlock,
    bioBlock,
    awardsBlock,
    missionBlock,
    servicesHeroBlock,
    servicesIntroBlock,
    serviceGroupsBlock,
    faqBlock,
    workProcessBlock,
    contactFormBlock,
    editorialHeroBlock,
    editorialCopyBlock,
    editorialAccordionBlock,
    editorialRowsBlock,
    editorialCtaBlock,
    editorialShowcaseBlock,
    editorialMissionBlock,
  ],
};

const projectBlocksField: TinaField = {
  type: 'object',
  name: 'blocks',
  label: 'Project Blocks',
  list: true,
  templates: [
    projectBannerBlock,
    projectDetailsBlock,
    projectBriefBlock,
    projectConceptBlock,
    projectStrategyBlock,
    projectCollaboratorsBlock,
    projectFinalImageBlock,
    bannerImageBlock,
  ],
};

const homePageFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Page Title', isTitle: true, required: true },
  { type: 'string' as const, name: 'description', label: 'Meta Description', ui: { component: 'textarea' } },
  { type: 'string' as const, name: 'headerStyle', label: 'Header Style', options: ['default', 'transparent'] },
  pageBlocksField,
];

const aboutPageFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Page Title', isTitle: true, required: true },
  { type: 'string' as const, name: 'description', label: 'Meta Description', ui: { component: 'textarea' } },
  { type: 'image' as const, name: 'heroImage', label: 'Hero Image' },
  pageBlocksField,
];

const servicesPageFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Page Title', isTitle: true, required: true },
  { type: 'string' as const, name: 'description', label: 'Meta Description', ui: { component: 'textarea' } },
  pageBlocksField,
];

const contactPageFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Page Title', isTitle: true, required: true },
  { type: 'string' as const, name: 'description', label: 'Meta Description', ui: { component: 'textarea' } },
  pageBlocksField,
];

const projectFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Title', isTitle: true, required: true },
  { type: 'string' as const, name: 'description', label: 'Description', ui: { component: 'textarea' } },
  { type: 'string' as const, name: 'slug', label: 'URL Slug' },
  { type: 'datetime' as const, name: 'publishDate', label: 'Publish Date' },
  { type: 'datetime' as const, name: 'completedDate', label: 'Completed Date' },
  { type: 'string' as const, name: 'tags', label: 'Tags', list: true },
  { type: 'boolean' as const, name: 'showTags', label: 'Show Tags on Projects List' },
  { type: 'boolean' as const, name: 'featured', label: 'Featured' },
  { type: 'boolean' as const, name: 'draft', label: 'Draft' },
  projectBlocksField,
];


// ============================================================================
// LEGAL PAGE FIELDS (MDX)
// ============================================================================

const legalPageFields: TinaField[] = [
  { type: 'string' as const, name: 'title', label: 'Title', isTitle: true, required: true },
  { type: 'string' as const, name: 'description', label: 'Meta Description', ui: { component: 'textarea' } },
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
      {
        name: 'links',
        label: 'Navigation Links',
        type: 'object',
        list: true,
        ui: {
          itemProps: (item) => ({ label: item?.label }),
        },
        fields: [
          { name: 'label', label: 'Label', type: 'string' },
          { name: 'href', label: 'URL Path (include lang prefix if needed, e.g. /es/about)', type: 'string' },
        ],
      },
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
          { name: 'label', label: 'Label', type: 'string' },
          { name: 'href', label: 'URL Path (include lang prefix if needed, e.g. /es/about)', type: 'string' },
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
        list: true,
        ui: { itemProps: (item) => ({ label: item?.label }) },
        fields: [
          { name: 'value', label: 'Value (sent in email)', type: 'string' },
          { name: 'label', label: 'Label (shown in dropdown)', type: 'string' },
        ],
      },
      { name: 'serviceType', label: 'Service Type Label', type: 'string' },
      {
        type: 'object' as const,
        name: 'serviceTypes',
        label: 'Service Types',
        list: true,
        ui: { itemProps: (item) => ({ label: item?.label }) },
        fields: [
          { name: 'value', label: 'Value (sent in email)', type: 'string' },
          { name: 'label', label: 'Label (shown in dropdown)', type: 'string' },
        ],
      },
      { name: 'message', label: 'Message Field', type: 'string' },
      { name: 'privacy', label: 'Privacy Checkbox', type: 'string' },
      { name: 'submit', label: 'Submit Button', type: 'string' },
      { name: 'sending', label: 'Sending Text', type: 'string' },
      { name: 'success', label: 'Success Message', type: 'string' },
      { name: 'error', label: 'Error Message', type: 'string' },
      { name: 'turnstileFailed', label: 'Turnstile Failed Message', type: 'string' },
      { name: 'invalidEmail', label: 'Invalid Email Message', type: 'string' },
      { name: 'missingFields', label: 'Missing Fields Message', type: 'string' },
    ],
  },
  {
    type: 'object' as const,
    name: 'projects',
    label: 'Projects Page',
    fields: [
      { name: 'title', label: 'Page Title', type: 'string', required: true },
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

// PROJECT FIELDS (Replaced with Blocks)

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
          global: true,
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
          global: true,
        },
      },
    ],
  },
});
