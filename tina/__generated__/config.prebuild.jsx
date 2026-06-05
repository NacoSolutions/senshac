// tina/config.ts
import { defineConfig } from "tinacms";
var imageFields = [
  { type: "image", name: "src", label: "Image", required: true },
  { type: "string", name: "alt", label: "Alt Text", required: true }
];
var galleryFields = [
  { type: "number", name: "cols", label: "Columns" },
  {
    type: "object",
    name: "images",
    label: "Images",
    list: true,
    fields: imageFields
  }
];
var siteConfigFields = [
  { type: "string", name: "siteUrl", label: "Site URL", required: true },
  { type: "string", name: "locales", label: "Locales", list: true },
  { type: "string", name: "defaultLocale", label: "Default Locale", required: true },
  {
    type: "object",
    name: "company",
    label: "Company",
    fields: [
      { name: "name", label: "Name", type: "string", required: true },
      { name: "legalName", label: "Legal Name", type: "string" },
      { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
      { name: "tagline", label: "Tagline", type: "string" }
    ]
  },
  {
    type: "object",
    name: "contact",
    label: "Contact",
    fields: [
      { name: "email", label: "Email", type: "string", required: true },
      { name: "phone", label: "Phone", type: "string", required: true },
      { name: "phoneLink", label: "Phone Link (no spaces)", type: "string" },
      {
        type: "object",
        name: "location",
        label: "Location",
        fields: [
          { name: "city", label: "City", type: "string", required: true },
          { name: "country", label: "Country Code", type: "string", required: true }
        ]
      }
    ]
  },
  {
    type: "object",
    name: "founder",
    label: "Founder",
    fields: [
      { name: "name", label: "Name", type: "string", required: true }
    ]
  },
  {
    type: "object",
    name: "socialLinks",
    label: "Social Links",
    list: true,
    fields: [
      { name: "name", label: "Name", type: "string", required: true },
      { name: "url", label: "URL", type: "string", required: true },
      {
        name: "icon",
        label: "Icon (Iconify)",
        type: "string",
        required: true,
        description: 'UnoCSS icon class, e.g. "i-simple-icons-instagram" or "i-mdi-linkedin"'
      }
    ]
  },
  {
    type: "object",
    name: "attribution",
    label: "Attribution",
    fields: [
      { name: "design", label: "Design By", type: "string" },
      { name: "development", label: "Development By", type: "string" }
    ]
  },
  {
    type: "object",
    name: "branding",
    label: "Branding",
    fields: [
      { name: "logo", label: "Logo", type: "image", required: true },
      { name: "logoWhite", label: "Logo (White)", type: "image", required: true },
      { name: "symbol", label: "Symbol", type: "image", required: true },
      { name: "symbolWhite", label: "Symbol (White)", type: "image", required: true },
      { name: "ogImage", label: "Default OG Image", type: "image", required: true }
    ]
  },
  {
    type: "object",
    name: "seo",
    label: "SEO",
    fields: [
      { name: "priceRange", label: "Price Range", type: "string" }
    ]
  }
];
var homeHeroBlock = {
  name: "homeHero",
  label: "Home Hero",
  type: "object",
  fields: [
    { name: "image", label: "Background Image", type: "image", required: true },
    {
      type: "object",
      name: "topRight",
      label: "Top Right Text (odd/even indent pattern)",
      fields: [{ type: "string", name: "lines", label: "Lines", list: true }]
    },
    {
      type: "object",
      name: "tagline",
      label: "Tagline",
      fields: [{ type: "string", name: "lines", label: "Lines", list: true }]
    },
    { name: "taglineSub", label: "Tagline Subtitle", type: "string" }
  ]
};
var homeAboutBlock = {
  name: "homeAbout",
  label: "Home About",
  type: "object",
  fields: [
    { name: "image", label: "Image", type: "image" },
    { name: "title", label: "Title", type: "string" },
    { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
    { name: "ctaText", label: "CTA Button Text", type: "string" },
    { name: "ctaLink", label: "CTA Button Link", type: "string" }
  ]
};
var aboutHeroBlock = {
  name: "aboutHero",
  label: "About Hero",
  type: "object",
  fields: [
    { name: "title", label: "Title", type: "string", required: true }
  ]
};
var behindNameBlock = {
  name: "behindName",
  label: "Behind the Name",
  type: "object",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "p1", label: "Paragraph 1", type: "string", ui: { component: "textarea" }, required: true },
    { name: "p2", label: "Paragraph 2", type: "string", ui: { component: "textarea" }, required: true },
    { name: "footnote", label: "Footnote", type: "string" }
  ]
};
var bannerImageBlock = {
  name: "bannerImage",
  label: "Banner Image",
  type: "object",
  fields: [
    { name: "image", label: "Image", type: "image" },
    { name: "alt", label: "Alt Text", type: "string" }
  ]
};
var bioBlock = {
  name: "bio",
  label: "Biography",
  type: "object",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "image", label: "Photo", type: "image" },
    { name: "paragraphs", label: "Paragraphs", type: "string", list: true, ui: { component: "textarea" } }
  ]
};
var awardsBlock = {
  name: "awards",
  label: "Awards",
  type: "object",
  fields: [
    { name: "title", label: "Section Title", type: "string" },
    {
      name: "items",
      label: "Awards List",
      type: "object",
      list: true,
      fields: [
        { name: "year", label: "Year", type: "string", required: true },
        { name: "project", label: "Project", type: "string", required: true },
        { name: "award", label: "Award Name", type: "string", required: true },
        { name: "link", label: "Link", type: "string" }
      ]
    }
  ]
};
var missionBlock = {
  name: "mission",
  label: "Mission",
  type: "object",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "p1", label: "Paragraph 1", type: "string", ui: { component: "textarea" }, required: true },
    { name: "p2", label: "Paragraph 2", type: "string", ui: { component: "textarea" }, required: true },
    { name: "quote", label: "Quote", type: "string", ui: { component: "textarea" } }
  ]
};
var servicesHeroBlock = {
  name: "servicesHero",
  label: "Services Hero",
  type: "object",
  fields: [
    { name: "title", label: "Title", type: "string", required: true }
  ]
};
var servicesIntroBlock = {
  name: "servicesIntro",
  label: "Services Introduction",
  type: "object",
  fields: [
    { name: "text", label: "Text", type: "string", ui: { component: "textarea" }, required: true },
    { name: "image", label: "Image", type: "image" }
  ]
};
var serviceGroupsBlock = {
  name: "serviceGroups",
  label: "Service Groups",
  type: "object",
  fields: [
    {
      name: "groups",
      label: "Groups",
      type: "object",
      list: true,
      fields: [
        { name: "title", label: "Group Title", type: "string", required: true },
        {
          name: "items",
          label: "Services",
          type: "object",
          list: true,
          fields: [
            { name: "title", label: "Service Title", type: "string", required: true },
            { name: "description", label: "Description", type: "string", ui: { component: "textarea" }, required: true }
          ]
        }
      ]
    }
  ]
};
var faqBlock = {
  name: "faq",
  label: "FAQ Section",
  type: "object",
  fields: [
    { name: "title", label: "Section Title", type: "string" },
    { name: "image", label: "Footer Image", type: "image" },
    {
      name: "items",
      label: "Questions",
      type: "object",
      list: true,
      fields: [
        { name: "question", label: "Question", type: "string", required: true },
        { name: "answer", label: "Answer", type: "string", ui: { component: "textarea" }, required: true }
      ]
    }
  ]
};
var workProcessBlock = {
  name: "workProcess",
  label: "Work Process",
  type: "object",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "p1", label: "Paragraph 1", type: "string", ui: { component: "textarea" }, required: true },
    { name: "p2", label: "Paragraph 2", type: "string", ui: { component: "textarea" }, required: true },
    { name: "image", label: "Image", type: "image" }
  ]
};
var projectBannerBlock = {
  name: "projectBanner",
  label: "Project Banner",
  type: "object",
  fields: [
    { type: "image", name: "image", label: "Cover Image", required: true },
    { type: "string", name: "alt", label: "Alt Text", required: true }
  ]
};
var projectDetailsBlock = {
  name: "projectDetails",
  label: "Project Details",
  type: "object",
  fields: [
    { type: "string", name: "title", label: "Title", required: true },
    { type: "string", name: "subtitle", label: "Subtitle", required: true },
    { type: "image", name: "image", label: "Detail Image", required: true },
    { type: "string", name: "services", label: "Services", required: true },
    { type: "string", name: "servicesLabel", label: "Services Label", required: true },
    { type: "string", name: "category", label: "Category", required: true },
    { type: "string", name: "categoryLabel", label: "Category Label", required: true },
    { type: "string", name: "area", label: "Area", required: true },
    { type: "string", name: "areaLabel", label: "Area Label", required: true },
    { type: "string", name: "location", label: "Location", required: true },
    { type: "string", name: "locationLabel", label: "Location Label", required: true }
  ]
};
var projectBriefBlock = {
  name: "projectBrief",
  label: "Project Brief",
  type: "object",
  fields: [
    { type: "string", name: "title", label: "Section Title", required: true },
    { type: "string", name: "text", label: "Text", required: true, ui: { component: "textarea" } },
    {
      type: "object",
      name: "gallery",
      label: "Gallery",
      fields: galleryFields
    }
  ]
};
var projectConceptBlock = {
  name: "projectConcept",
  label: "Project Concept",
  type: "object",
  fields: [
    { type: "string", name: "title", label: "Section Title", required: true },
    { type: "string", name: "text", label: "Text", required: true, ui: { component: "textarea" } },
    {
      type: "object",
      name: "gallery",
      label: "Gallery",
      fields: galleryFields
    }
  ]
};
var projectStrategyBlock = {
  name: "projectStrategy",
  label: "Project Strategy",
  type: "object",
  fields: [
    { type: "string", name: "title", label: "Section Title", required: true },
    { type: "string", name: "text", label: "Text", required: true, ui: { component: "textarea" } },
    {
      type: "object",
      name: "carousel",
      label: "Carousel Slides",
      list: true,
      fields: imageFields
    },
    {
      type: "object",
      name: "gallery",
      label: "Gallery",
      fields: galleryFields
    }
  ]
};
var projectCollaboratorsBlock = {
  name: "projectCollaborators",
  label: "Project Collaborators",
  type: "object",
  fields: [
    { type: "string", name: "title", label: "Section Title", required: true },
    {
      type: "object",
      name: "list",
      label: "Collaborators",
      list: true,
      fields: [
        { type: "string", name: "name", label: "Name", required: true },
        { type: "string", name: "role", label: "Role", required: true }
      ]
    }
  ]
};
var projectFinalImageBlock = {
  name: "projectFinalImage",
  label: "Project Final Image",
  type: "object",
  fields: imageFields
};
var pageBlocksField = {
  type: "object",
  name: "blocks",
  label: "Page Blocks",
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
    workProcessBlock
  ]
};
var projectBlocksField = {
  type: "object",
  name: "blocks",
  label: "Project Blocks",
  list: true,
  templates: [
    projectBannerBlock,
    projectDetailsBlock,
    projectBriefBlock,
    projectConceptBlock,
    projectStrategyBlock,
    projectCollaboratorsBlock,
    projectFinalImageBlock,
    bannerImageBlock
  ]
};
var homePageFields = [
  { type: "string", name: "title", label: "Page Title", required: true, isTitle: true },
  { type: "string", name: "description", label: "Meta Description", required: true, ui: { component: "textarea" } },
  { type: "string", name: "headerStyle", label: "Header Style", options: ["default", "transparent"] },
  pageBlocksField
];
var aboutPageFields = [
  { type: "string", name: "title", label: "Page Title", required: true, isTitle: true },
  { type: "string", name: "description", label: "Meta Description", required: true, ui: { component: "textarea" } },
  { type: "image", name: "heroImage", label: "Hero Image" },
  pageBlocksField
];
var servicesPageFields = [
  { type: "string", name: "title", label: "Page Title", required: true, isTitle: true },
  { type: "string", name: "description", label: "Meta Description", required: true, ui: { component: "textarea" } },
  pageBlocksField
];
var contactPageFields = [
  { type: "string", name: "title", label: "Page Title", required: true, isTitle: true },
  { type: "string", name: "description", label: "Meta Description", required: true, ui: { component: "textarea" } },
  { type: "image", name: "bannerImage", label: "Banner Image" },
  { type: "string", name: "heading", label: "Heading", required: true },
  { type: "string", name: "subheading", label: "Subheading", required: true }
];
var projectFields = [
  { type: "string", name: "title", label: "Title", required: true, isTitle: true },
  { type: "string", name: "description", label: "Description", required: true, ui: { component: "textarea" } },
  { type: "string", name: "slug", label: "URL Slug", required: true },
  { type: "datetime", name: "publishDate", label: "Publish Date", required: true },
  { type: "datetime", name: "completedDate", label: "Completed Date" },
  { type: "string", name: "tags", label: "Tags", list: true },
  { type: "boolean", name: "showTags", label: "Show Tags on Projects List" },
  { type: "boolean", name: "featured", label: "Featured" },
  { type: "boolean", name: "draft", label: "Draft" },
  projectBlocksField
];
var legalPageFields = [
  { type: "string", name: "title", label: "Title", required: true, isTitle: true },
  { type: "string", name: "description", label: "Meta Description", required: true, ui: { component: "textarea" } },
  { type: "datetime", name: "lastUpdated", label: "Last Updated" },
  { type: "rich-text", name: "body", label: "Content", isBody: true }
];
var translationFields = [
  {
    type: "object",
    name: "nav",
    label: "Navigation",
    fields: [
      { name: "social", label: "Social Label", type: "string" },
      { name: "menu", label: "Menu Label", type: "string" },
      { name: "letsTalk", label: "Let's Talk", type: "string" },
      { name: "about", label: "About", type: "string" },
      { name: "projects", label: "Projects", type: "string" },
      { name: "services", label: "Services", type: "string" },
      { name: "contact", label: "Contact", type: "string" }
    ]
  },
  {
    type: "object",
    name: "footer",
    label: "Footer",
    fields: [
      { name: "privacy", label: "Privacy Policy Link", type: "string" },
      { name: "legal", label: "Legal Notice Link", type: "string" },
      {
        name: "links",
        label: "Navigation Links",
        type: "object",
        list: true,
        ui: {
          itemProps: (item) => ({ label: item?.label })
        },
        fields: [
          { name: "label", label: "Label", type: "string", required: true },
          { name: "href", label: "URL Path (include lang prefix if needed, e.g. /es/about)", type: "string", required: true }
        ]
      }
    ]
  },
  {
    type: "object",
    name: "contactForm",
    label: "Contact Form",
    fields: [
      { name: "name", label: "Name Field", type: "string" },
      { name: "company", label: "Company Field", type: "string" },
      { name: "email", label: "Email Field", type: "string" },
      { name: "phone", label: "Phone Field", type: "string" },
      { name: "projectType", label: "Project Type Label", type: "string" },
      {
        type: "object",
        name: "projectTypes",
        label: "Project Types",
        list: true,
        ui: { itemProps: (item) => ({ label: item?.label }) },
        fields: [
          { name: "value", label: "Value (sent in email)", type: "string", required: true },
          { name: "label", label: "Label (shown in dropdown)", type: "string", required: true }
        ]
      },
      { name: "serviceType", label: "Service Type Label", type: "string" },
      {
        type: "object",
        name: "serviceTypes",
        label: "Service Types",
        list: true,
        ui: { itemProps: (item) => ({ label: item?.label }) },
        fields: [
          { name: "value", label: "Value (sent in email)", type: "string", required: true },
          { name: "label", label: "Label (shown in dropdown)", type: "string", required: true }
        ]
      },
      { name: "message", label: "Message Field", type: "string" },
      { name: "privacy", label: "Privacy Checkbox", type: "string" },
      { name: "submit", label: "Submit Button", type: "string" },
      { name: "sending", label: "Sending Text", type: "string" },
      { name: "success", label: "Success Message", type: "string" },
      { name: "error", label: "Error Message", type: "string" },
      { name: "turnstileFailed", label: "Turnstile Failed Message", type: "string" }
    ]
  },
  {
    type: "object",
    name: "projects",
    label: "Projects Page",
    fields: [
      { name: "title", label: "Page Title", type: "string" },
      { name: "description", label: "Meta Description", type: "string" },
      { name: "heading", label: "Heading", type: "string" }
    ]
  },
  {
    type: "object",
    name: "accessibility",
    label: "Accessibility",
    fields: [
      { name: "skipToContent", label: "Skip to Content", type: "string" },
      { name: "selectLanguage", label: "Select Language", type: "string" },
      { name: "toggleMenu", label: "Toggle Menu", type: "string" },
      { name: "closeMenu", label: "Close Menu", type: "string" },
      { name: "previousSlide", label: "Previous Slide", type: "string" },
      { name: "nextSlide", label: "Next Slide", type: "string" },
      { name: "goToSlide", label: "Go to Slide", type: "string" }
    ]
  }
];
function localeFromDocument(document) {
  return document._sys.breadcrumbs?.[0] || document._sys.path?.split("/").at(-2) || "es";
}
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || process.env.CF_PAGES_BRANCH || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ========================================
      // SITE CONFIG (single file)
      // ========================================
      {
        name: "siteConfig",
        label: "Site Configuration",
        path: "src/content/config",
        format: "json",
        match: { include: "site" },
        fields: siteConfigFields,
        ui: {
          allowedActions: { create: false, delete: false }
        }
      },
      // ========================================
      // PAGE SINGLETONS (JSON)
      // ========================================
      {
        name: "home",
        label: "Pages / Home",
        path: "src/content/pages",
        format: "json",
        match: { include: "*/home" },
        fields: homePageFields,
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => `/${localeFromDocument(document)}/`
        }
      },
      {
        name: "about",
        label: "Pages / About",
        path: "src/content/pages",
        format: "json",
        match: { include: "*/about" },
        fields: aboutPageFields,
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => `/${localeFromDocument(document)}/about`
        }
      },
      {
        name: "services",
        label: "Pages / Services",
        path: "src/content/pages",
        format: "json",
        match: { include: "*/services" },
        fields: servicesPageFields,
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => `/${localeFromDocument(document)}/services`
        }
      },
      {
        name: "contact",
        label: "Pages / Contact",
        path: "src/content/pages",
        format: "json",
        match: { include: "*/contact" },
        fields: contactPageFields,
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => `/${localeFromDocument(document)}/contact`
        }
      },
      // ========================================
      // LEGAL PAGES (MDX)
      // ========================================
      {
        name: "legal",
        label: "Legal / Pages",
        path: "src/content/legal",
        format: "mdx",
        fields: legalPageFields,
        ui: {
          router: ({ document }) => `/${localeFromDocument(document)}/${document._sys.filename}`
        }
      },
      // ========================================
      // PROJECTS (JSON - rigid layout)
      // ========================================
      {
        name: "projects",
        label: "Portfolio / Projects",
        path: "src/content/projects",
        format: "json",
        fields: projectFields,
        ui: {
          router: ({ document }) => `/${localeFromDocument(document)}/projects/${document._sys.filename}`,
          filename: {
            slugify: (values) => values?.slug || values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "untitled"
          }
        }
      },
      // ========================================
      // TRANSLATIONS
      // ========================================
      {
        name: "translations",
        label: "System / Translations",
        path: "src/content/translations",
        format: "json",
        fields: translationFields,
        ui: {
          allowedActions: { create: false, delete: false }
        }
      }
    ]
  }
});
export {
  config_default as default
};
