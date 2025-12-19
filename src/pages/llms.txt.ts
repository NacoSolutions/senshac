// src/pages/llms.txt.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const siteUrl = 'https://senshac.com';

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');

  // Get unique project slugs (use Spanish as primary)
  const projectList = projects
    .filter(p => p.id.startsWith('es/'))
    .map(p => {
      const slug = p.id.replace('es/', '');
      return `- [${p.data.title}](${siteUrl}/es/projects/${slug})`;
    })
    .join('\n');

  const llmsTxt = `# Sens*Hac - Interior Design Studio

> We design branded spaces that inspire & connect.

Sens*Hac is a Barcelona-based interior design studio specializing in commercial, gastronomy, and entertainment spaces. Founded by Ester Cobles, we create sensory experiences through thoughtful design.

## About

Sens*Hac creates spaces that connect brands with their audiences through design. We specialize in:
- Commercial interiors
- Restaurant & hospitality design
- Entertainment venues
- Retail spaces

## Contact

- Email: ester@senshac.com
- Phone: +34 661 661 426
- Location: Barcelona, Spain

## Pages

- [Home](${siteUrl}/es/)
- [About](${siteUrl}/es/about)
- [Services](${siteUrl}/es/services)
- [Projects](${siteUrl}/es/projects)
- [Contact](${siteUrl}/es/contact)

## Projects

${projectList}

## Languages

This website is available in:
- Spanish: ${siteUrl}/es/
- Catalan: ${siteUrl}/ca/
- English: ${siteUrl}/en/

## Social

- [Instagram](https://www.instagram.com/sens_hac/)
- [Pinterest](https://www.pinterest.com/senshac_design/)
- [LinkedIn](https://www.linkedin.com/company/senshac/)

## Technical

- Sitemap: ${siteUrl}/sitemap.xml
- Robots: ${siteUrl}/robots.txt
`;

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
