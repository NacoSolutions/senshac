// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  const siteConfig = await getEntry('site-config', 'site');
  if (!siteConfig) {
    return new Response('Site config not found', { status: 500 });
  }

  const { siteUrl } = siteConfig.data;

  const robotsTxt = `# robots.txt
User-agent: *
Allow: /

# Block AI training crawlers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: FacebookBot
Disallow: /

# Block ad crawlers
User-agent: AdsBot-Google
Disallow: /

User-agent: AdsBot
Disallow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml

# LLMs.txt
# See: ${siteUrl}/llms.txt
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
