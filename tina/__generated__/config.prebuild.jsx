// tina/config.ts
import { defineConfig } from "tinacms";
var bannerTemplate = {
  name: "banner",
  label: "Banner Image",
  fields: [
    { name: "src", label: "Image", type: "image", required: true },
    { name: "alt", label: "Alt Text", type: "string" }
  ]
};
var detailsSectionTemplate = {
  name: "detailsSection",
  label: "Details Section",
  fields: [
    { name: "title", label: "Title", type: "string", required: true },
    { name: "subtitle", label: "Subtitle", type: "string" },
    { name: "services", label: "Services", type: "string", required: true },
    { name: "servicesLabel", label: "Services Label", type: "string" },
    { name: "category", label: "Category", type: "string", required: true },
    { name: "categoryLabel", label: "Category Label", type: "string" },
    { name: "area", label: "Area", type: "string", required: true },
    { name: "areaLabel", label: "Area Label", type: "string" },
    { name: "location", label: "Location", type: "string", required: true },
    { name: "locationLabel", label: "Location Label", type: "string" },
    { name: "image", label: "Details Image", type: "image" }
  ]
};
var sectionTemplate = {
  name: "section",
  label: "Content Section",
  fields: [
    { name: "title", label: "Title", type: "string", required: true },
    { name: "id", label: "Section ID", type: "string" },
    { name: "content", label: "Content", type: "rich-text" }
  ]
};
var galleryTemplate = {
  name: "gallery",
  label: "Image Gallery",
  fields: [
    { name: "cols", label: "Columns", type: "string", options: ["2", "3", "4"] },
    { name: "gap", label: "Gap", type: "string" },
    {
      name: "images",
      label: "Images",
      type: "object",
      list: true,
      fields: [
        { name: "src", label: "Image", type: "image", required: true },
        { name: "alt", label: "Alt Text", type: "string" }
      ]
    }
  ]
};
var carouselTemplate = {
  name: "carousel",
  label: "Image Carousel",
  fields: [
    { name: "id", label: "Carousel ID", type: "string", required: true },
    {
      name: "slides",
      label: "Slides",
      type: "object",
      list: true,
      fields: [
        { name: "src", label: "Image", type: "image", required: true },
        { name: "alt", label: "Alt Text", type: "string" }
      ]
    }
  ]
};
var collaboratorsTemplate = {
  name: "collaborators",
  label: "Collaborators Section",
  fields: [
    { name: "title", label: "Section Title", type: "string" },
    {
      name: "list",
      label: "Collaborators",
      type: "object",
      list: true,
      fields: [
        { name: "name", label: "Name", type: "string", required: true },
        { name: "role", label: "Role", type: "string", required: true },
        { name: "url", label: "Website URL", type: "string" }
      ]
    },
    { name: "image", label: "Footer Image", type: "image" }
  ]
};
var figureTemplate = {
  name: "figure",
  label: "Figure with Caption",
  fields: [
    { name: "src", label: "Image", type: "image", required: true },
    { name: "alt", label: "Alt Text", type: "string" },
    { name: "caption", label: "Caption", type: "string" },
    { name: "width", label: "Max Width", type: "string" }
  ]
};
var youtubeTemplate = {
  name: "youtube",
  label: "YouTube Video",
  fields: [
    { name: "id", label: "Video ID", type: "string", required: true },
    { name: "aspectRatio", label: "Aspect Ratio", type: "string" }
  ]
};
var buttonTemplate = {
  name: "button",
  label: "Button",
  fields: [
    { name: "href", label: "Link URL", type: "string", required: true },
    { name: "text", label: "Button Text", type: "string", required: true },
    { name: "variant", label: "Style", type: "string", options: ["primary", "secondary", "outline"] }
  ]
};
var spacerTemplate = {
  name: "spacer",
  label: "Spacer",
  fields: [
    { name: "height", label: "Height (px)", type: "string" }
  ]
};
var heroHomeTemplate = {
  name: "heroHome",
  label: "Home Hero",
  fields: [
    { name: "image", label: "Background Image", type: "image", required: true },
    { name: "topRight", label: "Top Right Text", type: "string" },
    { name: "bottomLeft", label: "Bottom Left Text", type: "string" },
    { name: "bottomLeftSub", label: "Bottom Left Subtitle", type: "string" }
  ]
};
var aboutHomeTemplate = {
  name: "aboutHome",
  label: "Home About Section",
  fields: [
    { name: "image", label: "Image", type: "image" },
    { name: "title", label: "Title", type: "string" },
    { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
    { name: "cta", label: "CTA Text", type: "string" },
    { name: "ctaLink", label: "CTA Link", type: "string" }
  ]
};
var heroServicesTemplate = {
  name: "heroServices",
  label: "Services Hero",
  fields: [
    { name: "title", label: "Title", type: "string", required: true },
    { name: "symbolImage", label: "Symbol Image", type: "image" }
  ]
};
var introServicesTemplate = {
  name: "introServices",
  label: "Services Intro",
  fields: [
    { name: "text", label: "Text", type: "string", ui: { component: "textarea" } },
    { name: "image", label: "Image", type: "image" }
  ]
};
var servicesGroupTemplate = {
  name: "servicesGroup",
  label: "Services Group",
  fields: [
    { name: "title", label: "Group Title", type: "string", required: true },
    {
      name: "items",
      label: "Services",
      type: "object",
      list: true,
      fields: [
        { name: "title", label: "Service Title", type: "string", required: true },
        { name: "description", label: "Description", type: "string", ui: { component: "textarea" } }
      ]
    }
  ]
};
var faqTemplate = {
  name: "faq",
  label: "FAQ Item",
  fields: [
    { name: "question", label: "Question", type: "string", required: true },
    { name: "answer", label: "Answer", type: "string", ui: { component: "textarea" }, required: true }
  ]
};
var workProcessTemplate = {
  name: "workProcess",
  label: "Work Process Section",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "p1", label: "Paragraph 1", type: "string", ui: { component: "textarea" } },
    { name: "p2", label: "Paragraph 2", type: "string", ui: { component: "textarea" } },
    { name: "image", label: "Image", type: "image" }
  ]
};
var aboutHeroTemplate = {
  name: "aboutHero",
  label: "About Hero",
  fields: [
    { name: "title", label: "Title", type: "string", required: true }
  ]
};
var behindNameTemplate = {
  name: "behindName",
  label: "Behind the Name",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "p1", label: "Paragraph 1", type: "string", ui: { component: "textarea" } },
    { name: "p2", label: "Paragraph 2", type: "string", ui: { component: "textarea" } },
    { name: "footnote", label: "Footnote", type: "string" }
  ]
};
var aboutBioTemplate = {
  name: "aboutBio",
  label: "About Bio Section",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "image", label: "Photo", type: "image" },
    { name: "paragraphs", label: "Bio Paragraphs", type: "string", list: true, ui: { component: "textarea" } }
  ]
};
var awardTemplate = {
  name: "award",
  label: "Award",
  fields: [
    { name: "year", label: "Year", type: "string", required: true },
    { name: "project", label: "Project", type: "string", required: true },
    { name: "award", label: "Award Name", type: "string", required: true },
    { name: "link", label: "Link", type: "string" }
  ]
};
var aboutMissionTemplate = {
  name: "aboutMission",
  label: "About Mission",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "p1", label: "Paragraph 1", type: "string", ui: { component: "textarea" } },
    { name: "p2", label: "Paragraph 2", type: "string", ui: { component: "textarea" } },
    { name: "quote", label: "Quote", type: "string", ui: { component: "textarea" } }
  ]
};
var projectTemplates = [
  bannerTemplate,
  detailsSectionTemplate,
  sectionTemplate,
  galleryTemplate,
  carouselTemplate,
  collaboratorsTemplate,
  figureTemplate,
  youtubeTemplate,
  buttonTemplate,
  spacerTemplate
];
var pageTemplates = [
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
  aboutMissionTemplate
];
var projectFields = [
  {
    type: "string",
    name: "title",
    label: "Title",
    required: true,
    isTitle: true
  },
  {
    type: "string",
    name: "description",
    label: "Description",
    required: true,
    ui: { component: "textarea" }
  },
  {
    type: "datetime",
    name: "publishDate",
    label: "Publish Date",
    required: true
  },
  {
    type: "datetime",
    name: "completedDate",
    label: "Completed Date"
  },
  {
    type: "string",
    name: "tags",
    label: "Tags",
    list: true
  },
  {
    type: "image",
    name: "coverImage",
    label: "Cover Image",
    required: true
  },
  {
    type: "boolean",
    name: "featured",
    label: "Featured"
  },
  {
    type: "boolean",
    name: "draft",
    label: "Draft"
  },
  {
    type: "rich-text",
    name: "body",
    label: "Content (Shortcodes)",
    isBody: true,
    templates: projectTemplates
  }
];
var pageFields = [
  {
    type: "string",
    name: "title",
    label: "Title",
    required: true,
    isTitle: true
  },
  {
    type: "string",
    name: "description",
    label: "Description",
    required: true,
    ui: { component: "textarea" }
  },
  {
    type: "image",
    name: "heroImage",
    label: "Hero Image"
  },
  {
    type: "string",
    name: "headerStyle",
    label: "Header Style",
    options: ["default", "transparent"]
  },
  {
    type: "rich-text",
    name: "body",
    label: "Content (Shortcodes)",
    isBody: true,
    templates: pageTemplates
  }
];
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
      // PROJECTS
      // ========================================
      {
        name: "projects_es",
        label: "\u{1F1EA}\u{1F1F8} Projects (Spanish)",
        path: "src/content/projects/es",
        format: "md",
        fields: projectFields,
        ui: {
          filename: {
            slugify: (values) => values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "untitled"
          }
        }
      },
      {
        name: "projects_ca",
        label: "\u{1F3F4}\u{E0065}\u{E0073}\u{E0063}\u{E0074}\u{E007F} Projects (Catalan)",
        path: "src/content/projects/ca",
        format: "md",
        fields: projectFields,
        ui: {
          filename: {
            slugify: (values) => values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "untitled"
          }
        }
      },
      {
        name: "projects_en",
        label: "\u{1F1EC}\u{1F1E7} Projects (English)",
        path: "src/content/projects/en",
        format: "md",
        fields: projectFields,
        ui: {
          filename: {
            slugify: (values) => values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "untitled"
          }
        }
      },
      // ========================================
      // PAGES
      // ========================================
      {
        name: "pages_es",
        label: "\u{1F1EA}\u{1F1F8} Pages (Spanish)",
        path: "src/content/pages/es",
        format: "md",
        fields: pageFields
      },
      {
        name: "pages_ca",
        label: "\u{1F3F4}\u{E0065}\u{E0073}\u{E0063}\u{E0074}\u{E007F} Pages (Catalan)",
        path: "src/content/pages/ca",
        format: "md",
        fields: pageFields
      },
      {
        name: "pages_en",
        label: "\u{1F1EC}\u{1F1E7} Pages (English)",
        path: "src/content/pages/en",
        format: "md",
        fields: pageFields
      }
    ]
  }
});
export {
  config_default as default
};
