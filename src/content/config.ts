// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    completedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    lastUpdated: z.coerce.date().optional(),
    headerStyle: z.enum(['default', 'transparent']).default('default'),
  }),
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
    contact: z.object({
      title: z.string(),
      description: z.string(),
      heading: z.string(),
      subheading: z.string(),
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
      turnstileFailed: z.string().optional(),
    }),
    projects: z.object({
      title: z.string(),
      description: z.string(),
      heading: z.string(),
    }),
    cookies: z.object({
      message: z.string(),
      moreInfo: z.string(),
      accept: z.string(),
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
  projects,
  pages,
  translations,
};
