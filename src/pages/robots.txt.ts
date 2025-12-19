// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

const siteUrl = 'https://senshac.com';

const robotsTxt = `# robots.txt for senshac.com
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

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
