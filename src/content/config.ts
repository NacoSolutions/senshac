// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Site configuration (global business info)
const siteConfig = defineCollection({
  loader: glob({ pattern: 'site.json', base: 'src/content/config' }),
  schema: z.object({
    siteUrl: z.string(),
    locales: z.array(z.string()),
    defaultLocale: z.string(),
    company: z.object({
      name: z.string(),
      legalName: z.string().optional(),
      description: z.string(),
      tagline: z.string().optional(),
    }),
    contact: z.object({
      email: z.string(),
      phone: z.string(),
      phoneLink: z.string().optional(),
      location: z.object({
        city: z.string(),
        country: z.string(),
      }),
    }),
    founder: z.object({
      name: z.string(),
    }),
    socialLinks: z.array(z.object({
      name: z.string(),
      url: z.string(),
      icon: z.string(), // UnoCSS icon class, e.g. "i-simple-icons-instagram"
    })),
    attribution: z.object({
      design: z.string().optional(),
      development: z.string().optional(),
    }).optional(),
    branding: z.object({
      logo: z.string(),
      logoWhite: z.string(),
      symbol: z.string(),
      symbolWhite: z.string(),
      ogImage: z.string(),
    }),
    seo: z.object({
      priceRange: z.string().optional(),
    }).optional(),
  }),
});

// Home page content
const homePageSchema = z.object({
  title: z.string(),
  description: z.string(),
  headerStyle: z.enum(['default', 'transparent']).default('transparent'),
  hero: z.object({
    image: z.string(),
    topRight: z.object({
      lines: z.array(z.string()),
    }).optional(),
    tagline: z.object({
      lines: z.array(z.string()),
    }).optional(),
    taglineSub: z.string().optional(),
  }),
  about: z.object({
    image: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
  }),
});

// About page content
const aboutPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  heroImage: z.string().optional(),
  hero: z.object({
    title: z.string(),
  }),
  behindName: z.object({
    title: z.string().optional(),
    p1: z.string(),
    p2: z.string(),
    footnote: z.string().optional(),
  }),
  bannerImage: z.string().optional(),
  bio: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    paragraphs: z.array(z.string()),
  }),
  awards: z.object({
    title: z.string().optional(),
    items: z.array(z.object({
      year: z.string(),
      project: z.string(),
      award: z.string(),
      link: z.string().optional(),
    })),
  }),
  mission: z.object({
    title: z.string().optional(),
    p1: z.string(),
    p2: z.string(),
    quote: z.string().optional(),
  }),
  missionImage: z.string().optional(),
});

// Services page content
const servicesPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  hero: z.object({
    title: z.string(),
  }),
  intro: z.object({
    text: z.string(),
    image: z.string().optional(),
  }),
  serviceGroups: z.array(z.object({
    title: z.string(),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
  })),
  faq: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    items: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
  }),
  workProcess: z.object({
    title: z.string().optional(),
    p1: z.string(),
    p2: z.string(),
    image: z.string().optional(),
  }),
});

// Contact page content
const contactPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  heading: z.string(),
  subheading: z.string(),
});

// JSON pages collection (home, about, services, contact)
const pagesJson = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/pages' }),
  schema: z.union([homePageSchema, aboutPageSchema, servicesPageSchema, contactPageSchema]),
});

// Legal MDX pages (privacy-policy, legal-notice)
const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

// Shared schemas for projects
const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

const gallerySchema = z.object({
  cols: z.number().default(2),
  images: z.array(imageSchema),
});

// Project schema (rigid layout with fixed sections)
const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  publishDate: z.coerce.date(),
  completedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  showTags: z.boolean().default(false),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  banner: z.object({
    image: z.string(),
    alt: z.string(),
  }),
  details: z.object({
    title: z.string(),
    subtitle: z.string(),
    image: z.string(),
    services: z.string(),
    servicesLabel: z.string(),
    category: z.string(),
    categoryLabel: z.string(),
    area: z.string(),
    areaLabel: z.string(),
    location: z.string(),
    locationLabel: z.string(),
  }),
  brief: z.object({
    title: z.string(),
    text: z.string(),
    gallery: gallerySchema,
  }),
  concept: z.object({
    title: z.string(),
    text: z.string(),
    gallery: gallerySchema,
  }),
  strategy: z.object({
    title: z.string(),
    text: z.string(),
    carousel: z.array(imageSchema),
    gallery: gallerySchema,
  }),
  collaborators: z.object({
    title: z.string(),
    list: z.array(z.object({
      name: z.string(),
      role: z.string(),
    })),
  }),
  finalImage: imageSchema,
});

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: 'src/content/projects',
    // Include language folder in ID to prevent collisions (e.g., "en/la-trobada")
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: projectSchema,
});

const translations = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/translations' }),
  schema: z.object({
    nav: z.object({
      social: z.string(),
      menu: z.string(),
      letsTalk: z.string(),
      about: z.string(),
      projects: z.string(),
      services: z.string(),
      contact: z.string(),
    }),
    footer: z.object({
      privacy: z.string(),
      legal: z.string(),
    }),
    contactForm: z.object({
      name: z.string(),
      company: z.string(),
      email: z.string(),
      phone: z.string(),
      projectType: z.string(),
      projectTypes: z.object({
        commercial: z.string(),
        restaurant: z.string(),
        entertainment: z.string(),
        other: z.string(),
      }),
      serviceType: z.string(),
      serviceTypes: z.object({
        fullPackage: z.string(),
        concept: z.string(),
        unsure: z.string(),
      }),
      message: z.string(),
      privacy: z.string(),
      submit: z.string(),
      sending: z.string(),
      success: z.string(),
      error: z.string(),
      turnstileFailed: z.string(),
      invalidEmail: z.string(),
      missingFields: z.string(),
    }),
    projects: z.object({
      title: z.string(),
      description: z.string(),
      heading: z.string(),
    }),
    accessibility: z.object({
      skipToContent: z.string(),
      selectLanguage: z.string(),
      toggleMenu: z.string(),
      closeMenu: z.string(),
      previousSlide: z.string(),
      nextSlide: z.string(),
      goToSlide: z.string(),
    }),
  }),
});

export const collections = {
  'site-config': siteConfig,
  pages: pagesJson,
  legal,
  projects,
  translations,
};
