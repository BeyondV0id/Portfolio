import { SITE_INFO } from "@/config/site";
import { GITHUB_USERNAME, USER } from "@/features/portfolio/data";

export function GET() {
  const base = SITE_INFO.url.replace(/\/$/, "");

  const body = `# ${USER.displayName}

> ${USER.bio}

Portfolio, projects, and writing by ${USER.displayName} (${GITHUB_USERNAME}). Based in ${USER.address}.

## Key pages

- [Home](${base}/): Profile, featured projects, recent writing, and experience.
- [Projects](${base}/projects): Full list of projects with descriptions and links.
- [Blog](${base}/blog): Articles on development, systems, and open source.

## About this site

- [agent.md](${base}/agent.md): Guidance for AI agents reading this site.
- [robots.txt](${base}/robots.txt): Crawling rules and sitemap location.
- [sitemap.xml](${base}/sitemap.xml): All indexable pages.

## Contact

- [GitHub](https://github.com/${GITHUB_USERNAME})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
