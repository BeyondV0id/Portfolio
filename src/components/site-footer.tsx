import { SITE_INFO } from "@/config/site";

const domain = SITE_INFO.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function SiteFooter() {
  return (
    <footer className="mt-4">
      <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-8 text-xs text-muted-foreground">
        <span>
          © {new Date().getFullYear()} {SITE_INFO.name}
        </span>
        <span className="flex flex-wrap items-center gap-x-3 font-mono">
          <a href="/llms.txt" className="hover:text-foreground">
            llms.txt
          </a>
          <a href="/agent.md" className="hover:text-foreground">
            agent.md
          </a>
          <a href="/robots.txt" className="hover:text-foreground">
            robots.txt
          </a>
          <a
            href={SITE_INFO.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            {domain}
          </a>
        </span>
      </div>
    </footer>
  );
}
