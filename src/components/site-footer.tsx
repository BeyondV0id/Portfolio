import { SITE_INFO } from "@/config/site";

import { FooterSky } from "./footer-sky";

const domain = SITE_INFO.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function SiteFooter() {
  return (
    <footer className="reveal-item reveal-footer mt-4">
      <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-8 text-xs text-muted-foreground">
        <span>
          © {new Date().getFullYear()} {SITE_INFO.name}
        </span>
        <span className="flex flex-wrap items-center gap-x-3 font-mono">
          <a
            href="/llms.txt"
            className="transition-colors duration-150 hover:text-foreground"
          >
            llms.txt
          </a>
          <a
            href="/agent.md"
            className="transition-colors duration-150 hover:text-foreground"
          >
            agent.md
          </a>
          <a
            href="/robots.txt"
            className="transition-colors duration-150 hover:text-foreground"
          >
            robots.txt
          </a>
          <a
            href={SITE_INFO.url}
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-150 hover:text-foreground"
          >
            {domain}
          </a>
        </span>
      </div>
      <FooterSky />
    </footer>
  );
}
