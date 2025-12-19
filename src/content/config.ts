// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/projects' }),
  schema: z.object({
    // Core metadata (required)
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    completedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // All content now handled via shortcodes in body
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    lastUpdated: z.coerce.date().optional(),
    headerStyle: z.enum(['default', 'transparent']).default('default'),
  }),
});

export const collections = {
  projects,
  pages,
};
