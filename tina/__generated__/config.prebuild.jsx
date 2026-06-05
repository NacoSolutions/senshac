// tina/config.ts
import { defineConfig } from "tinacms";
var imageFields = [
  { type: "image", name: "src", label: "Image" },
  { type: "string", name: "alt", label: "Alt Text" }
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
  { type: "string", name: "siteUrl", label: "Site URL" },
  { type: "string", name: "locales", label: "Locales", list: true },
  { type: "string", name: "defaultLocale", label: "Default Locale" },
  {
    type: "object",
    name: "company",
    label: "Company",
    fields: [
      { name: "name", label: "Name", type: "string" },
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
      { name: "email", label: "Email", type: "string" },
      { name: "phone", label: "Phone", type: "string" },
      { name: "phoneLink", label: "Phone Link (no spaces)", type: "string" },
      {
        type: "object",
        name: "location",
        label: "Location",
        fields: [
          { name: "city", label: "City", type: "string" },
          { name: "country", label: "Country Code", type: "string" }
        ]
      }
    ]
  },
  {
    type: "object",
    name: "founder",
    label: "Founder",
    fields: [
      { name: "name", label: "Name", type: "string" }
    ]
  },
  {
    type: "object",
    name: "socialLinks",
    label: "Social Links",
    list: true,
    fields: [
      { name: "name", label: "Name", type: "string" },
      { name: "url", label: "URL", type: "string" },
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
      { name: "logo", label: "Logo", type: "image" },
      { name: "logoWhite", label: "Logo (White)", type: "image" },
      { name: "symbol", label: "Symbol", type: "image" },
      { name: "symbolWhite", label: "Symbol (White)", type: "image" },
      { name: "ogImage", label: "Default OG Image", type: "image" }
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
var contactFormBlock = {
  name: "contactForm",
  label: "Contact Form Layout",
  type: "object",
  fields: [
    { type: "image", name: "bannerImage", label: "Banner Image" },
    { type: "string", name: "heading", label: "Heading" },
    { type: "string", name: "subheading", label: "Subheading" }
  ]
};
var homeHeroBlock = {
  name: "homeHero",
  label: "Home Hero",
  type: "object",
  fields: [
    { name: "image", label: "Background Image", type: "image" },
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
    { name: "title", label: "Title", type: "string" }
  ]
};
var behindNameBlock = {
  name: "behindName",
  label: "Behind the Name",
  type: "object",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "p1", label: "Paragraph 1", type: "string", ui: { component: "textarea" } },
    { name: "p2", label: "Paragraph 2", type: "string", ui: { component: "textarea" } },
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
        { name: "year", label: "Year", type: "string" },
        { name: "project", label: "Project", type: "string" },
        { name: "award", label: "Award Name", type: "string" },
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
    { name: "p1", label: "Paragraph 1", type: "string", ui: { component: "textarea" } },
    { name: "p2", label: "Paragraph 2", type: "string", ui: { component: "textarea" } },
    { name: "quote", label: "Quote", type: "string", ui: { component: "textarea" } }
  ]
};
var servicesHeroBlock = {
  name: "servicesHero",
  label: "Services Hero",
  type: "object",
  fields: [
    { name: "title", label: "Title", type: "string" }
  ]
};
var servicesIntroBlock = {
  name: "servicesIntro",
  label: "Services Introduction",
  type: "object",
  fields: [
    { name: "text", label: "Text", type: "string", ui: { component: "textarea" } },
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
        { name: "title", label: "Group Title", type: "string" },
        {
          name: "items",
          label: "Services",
          type: "object",
          list: true,
          fields: [
            { name: "title", label: "Service Title", type: "string" },
            { name: "description", label: "Description", type: "string", ui: { component: "textarea" } }
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
        { name: "question", label: "Question", type: "string" },
        { name: "answer", label: "Answer", type: "string", ui: { component: "textarea" } }
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
    { name: "p1", label: "Paragraph 1", type: "string", ui: { component: "textarea" } },
    { name: "p2", label: "Paragraph 2", type: "string", ui: { component: "textarea" } },
    { name: "image", label: "Image", type: "image" }
  ]
};
var editorialHeroBlock = {
  name: "editorialHero",
  label: "Editorial Hero",
  type: "object",
  fields: [
    { name: "title", label: "Title", type: "string", ui: { component: "textarea" } },
    { name: "intro", label: "Introduction", type: "string", ui: { component: "textarea" } },
    { name: "ctaText", label: "Link Text", type: "string" },
    { name: "ctaLink", label: "Link URL", type: "string" },
    { name: "mediaType", label: "Media Type", type: "string", options: ["image", "video"] },
    { name: "image", label: "Image", type: "image" },
    { name: "imageAlt", label: "Image Alt Text", type: "string" },
    { name: "placeholderLabel", label: "Placeholder Label", type: "string" }
  ]
};
var editorialCopyBlock = {
  name: "editorialCopy",
  label: "Editorial Copy",
  type: "object",
  fields: [
    { name: "eyebrow", label: "Eyebrow", type: "string" },
    { name: "title", label: "Title", type: "string", ui: { component: "textarea" } },
    { name: "headingLevel", label: "Heading Level", type: "string", options: ["h1", "h2"] },
    { name: "body", label: "Body", type: "string", ui: { component: "textarea" } }
  ]
};
var editorialAccordionBlock = {
  name: "editorialAccordion",
  label: "Editorial Accordion",
  type: "object",
  fields: [
    { name: "intro", label: "Introduction", type: "string", ui: { component: "textarea" } },
    {
      name: "items",
      label: "Accordion Items",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.number || ""} ${item?.title || ""}`.trim() }) },
      fields: [
        { name: "number", label: "Number", type: "string" },
        { name: "title", label: "Title", type: "string" },
        { name: "summary", label: "Summary", type: "string", ui: { component: "textarea" } },
        { name: "open", label: "Open by Default", type: "boolean" },
        {
          name: "details",
          label: "Expanded Details",
          type: "object",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          fields: [
            { name: "label", label: "Label", type: "string" },
            { name: "text", label: "Text", type: "string", ui: { component: "textarea" } }
          ]
        }
      ]
    }
  ]
};
var editorialRowsBlock = {
  name: "editorialRows",
  label: "Editorial Rows",
  type: "object",
  fields: [
    { name: "title", label: "Title", type: "string", ui: { component: "textarea" } },
    { name: "intro", label: "Introduction", type: "string", ui: { component: "textarea" } },
    {
      name: "items",
      label: "Rows",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title }) },
      fields: [
        { name: "title", label: "Title", type: "string" },
        { name: "text", label: "Text", type: "string", ui: { component: "textarea" } }
      ]
    }
  ]
};
var editorialCtaBlock = {
  name: "editorialCta",
  label: "Editorial Call to Action",
  type: "object",
  fields: [
    { name: "text", label: "Text", type: "string" },
    { name: "link", label: "URL", type: "string" }
  ]
};
var editorialShowcaseBlock = {
  name: "editorialShowcase",
  label: "Editorial Media / Work Showcase",
  type: "object",
  fields: [
    { name: "eyebrow", label: "Eyebrow", type: "string" },
    { name: "title", label: "Title", type: "string", ui: { component: "textarea" } },
    { name: "mediaType", label: "Media Type", type: "string", options: ["image", "video"] },
    { name: "image", label: "Image", type: "image" },
    { name: "imageAlt", label: "Image Alt Text", type: "string" },
    { name: "placeholderLabel", label: "Placeholder Label", type: "string" },
    { name: "ctaText", label: "Link Text", type: "string" },
    { name: "ctaLink", label: "Link URL", type: "string" },
    {
      name: "items",
      label: "Work Items",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title }) },
      fields: [
        { name: "title", label: "Title", type: "string" },
        { name: "link", label: "URL", type: "string" },
        { name: "image", label: "Image", type: "image" },
        { name: "imageAlt", label: "Image Alt Text", type: "string" },
        { name: "placeholderLabel", label: "Placeholder Label", type: "string" }
      ]
    }
  ]
};
var editorialMissionBlock = {
  name: "editorialMission",
  label: "Studio Mission",
  type: "object",
  fields: [
    { name: "label", label: "Label", type: "string" },
    { name: "paragraphs", label: "Paragraphs", type: "string", list: true, ui: { component: "textarea" } },
    { name: "statement", label: "Closing Statement", type: "string", ui: { component: "textarea" } },
    { name: "image", label: "Image", type: "image" },
    { name: "imageAlt", label: "Image Alt Text", type: "string" },
    { name: "placeholderLabel", label: "Placeholder Label", type: "string" }
  ]
};
var projectBannerBlock = {
  name: "projectBanner",
  label: "Project Banner",
  type: "object",
  fields: [
    { type: "image", name: "image", label: "Cover Image" },
    { type: "string", name: "alt", label: "Alt Text" }
  ]
};
var projectDetailsBlock = {
  name: "projectDetails",
  label: "Project Details",
  type: "object",
  fields: [
    { type: "string", name: "title", label: "Title" },
    { type: "string", name: "subtitle", label: "Subtitle" },
    { type: "image", name: "image", label: "Detail Image" },
    { type: "string", name: "services", label: "Services" },
    { type: "string", name: "servicesLabel", label: "Services Label" },
    { type: "string", name: "category", label: "Category" },
    { type: "string", name: "categoryLabel", label: "Category Label" },
    { type: "string", name: "area", label: "Area" },
    { type: "string", name: "areaLabel", label: "Area Label" },
    { type: "string", name: "location", label: "Location" },
    { type: "string", name: "locationLabel", label: "Location Label" }
  ]
};
var projectBriefBlock = {
  name: "projectBrief",
  label: "Project Brief",
  type: "object",
  fields: [
    { type: "string", name: "title", label: "Section Title" },
    { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
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
    { type: "string", name: "title", label: "Section Title" },
    { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
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
    { type: "string", name: "title", label: "Section Title" },
    { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
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
    { type: "string", name: "title", label: "Section Title" },
    {
      type: "object",
      name: "list",
      label: "Collaborators",
      list: true,
      fields: [
        { type: "string", name: "name", label: "Name" },
        { type: "string", name: "role", label: "Role" }
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
    workProcessBlock,
    contactFormBlock,
    editorialHeroBlock,
    editorialCopyBlock,
    editorialAccordionBlock,
    editorialRowsBlock,
    editorialCtaBlock,
    editorialShowcaseBlock,
    editorialMissionBlock
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
  { type: "string", name: "title", label: "Page Title", isTitle: true, required: true },
  { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
  { type: "string", name: "headerStyle", label: "Header Style", options: ["default", "transparent"] },
  pageBlocksField
];
var aboutPageFields = [
  { type: "string", name: "title", label: "Page Title", isTitle: true, required: true },
  { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
  { type: "image", name: "heroImage", label: "Hero Image" },
  pageBlocksField
];
var servicesPageFields = [
  { type: "string", name: "title", label: "Page Title", isTitle: true, required: true },
  { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
  pageBlocksField
];
var contactPageFields = [
  { type: "string", name: "title", label: "Page Title", isTitle: true, required: true },
  { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
  pageBlocksField
];
var projectFields = [
  { type: "string", name: "title", label: "Title", isTitle: true, required: true },
  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
  { type: "string", name: "slug", label: "URL Slug" },
  { type: "datetime", name: "publishDate", label: "Publish Date" },
  { type: "datetime", name: "completedDate", label: "Completed Date" },
  { type: "string", name: "tags", label: "Tags", list: true },
  { type: "boolean", name: "showTags", label: "Show Tags on Projects List" },
  { type: "boolean", name: "featured", label: "Featured" },
  { type: "boolean", name: "draft", label: "Draft" },
  projectBlocksField
];
var legalPageFields = [
  { type: "string", name: "title", label: "Title", isTitle: true, required: true },
  { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
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
      {
        name: "links",
        label: "Navigation Links",
        type: "object",
        list: true,
        ui: {
          itemProps: (item) => ({ label: item?.label })
        },
        fields: [
          { name: "label", label: "Label", type: "string" },
          { name: "href", label: "URL Path (include lang prefix if needed, e.g. /es/about)", type: "string" }
        ]
      }
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
          { name: "label", label: "Label", type: "string" },
          { name: "href", label: "URL Path (include lang prefix if needed, e.g. /es/about)", type: "string" }
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
          { name: "value", label: "Value (sent in email)", type: "string" },
          { name: "label", label: "Label (shown in dropdown)", type: "string" }
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
          { name: "value", label: "Value (sent in email)", type: "string" },
          { name: "label", label: "Label (shown in dropdown)", type: "string" }
        ]
      },
      { name: "message", label: "Message Field", type: "string" },
      { name: "privacy", label: "Privacy Checkbox", type: "string" },
      { name: "submit", label: "Submit Button", type: "string" },
      { name: "sending", label: "Sending Text", type: "string" },
      { name: "success", label: "Success Message", type: "string" },
      { name: "error", label: "Error Message", type: "string" },
      { name: "turnstileFailed", label: "Turnstile Failed Message", type: "string" },
      { name: "invalidEmail", label: "Invalid Email Message", type: "string" },
      { name: "missingFields", label: "Missing Fields Message", type: "string" }
    ]
  },
  {
    type: "object",
    name: "projects",
    label: "Projects Page",
    fields: [
      { name: "title", label: "Page Title", type: "string", required: true },
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
          allowedActions: { create: false, delete: false },
          global: true
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
          allowedActions: { create: false, delete: false },
          global: true
        }
      }
    ]
  }
});
export {
  config_default as default
};
