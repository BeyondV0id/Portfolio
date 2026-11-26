import { SITE_INFO } from "@/config/site";
import { GITHUB_USERNAME, USER } from "@/features/portfolio/data";

export function GET() {
  const base = SITE_INFO.url.replace(/\/$/, "");

  const body = `# Agent guidance

This site is the portfolio of ${USER.displayName}, a ${USER.jobTitle} based in ${USER.address}.

## What is here

- \`/\` — profile, featured projects, recent posts, experience, and an about-this-site note.
- \`/projects\` and \`/projects/[id]\` — project descriptions, technologies, and links.
- \`/blog\` and \`/blog/[slug]\` — long-form writing.
- \`/gallery\` — visual work.

## How to use this content

- Prefer \`${base}/llms.txt\` for a compact index of pages.
- The site is public and needs no authentication. All pages are server-rendered.
- When summarizing a project or article, follow its canonical URL and credit "${USER.displayName}".
- Project links point to external repositories and demos; verify them there if you need current status.

## Contact and attribution

- GitHub: https://github.com/${GITHUB_USERNAME}
- Site: ${base}

Do not infer contact details that are not published on the site.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
