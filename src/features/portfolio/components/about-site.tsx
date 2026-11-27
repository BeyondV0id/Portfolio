import { SITE_INFO } from "@/config/site";
import { GITHUB_USERNAME, USER } from "@/features/portfolio/data";

const CONTACT_EMAIL = "the.harsha.mail@gmail.com";

function buildHash() {
  return (
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
    process.env.NEXT_PUBLIC_COMMIT_SHA?.slice(0, 7) ??
    "local"
  );
}

export function AboutSite() {
  const domain = SITE_INFO.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const date = new Date().toISOString().slice(0, 10);

  return (
    <section
      aria-label="About this site"
      className="reveal-item reveal-page-main-rest reveal-step-5 relative mt-16"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-mono text-sm tracking-tight">{domain}</span>
      </div>

      <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          <div className="flex min-w-0 flex-col gap-2">
            <span className="text-xs text-muted-foreground">created by</span>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="w-fit rounded-sm font-mono text-sm hover:underline focus-visible:outline-2 focus-visible:outline-ring"
            >
              @{GITHUB_USERNAME}
            </a>
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <span className="text-xs text-muted-foreground">build</span>
            <span className="font-mono text-sm">{buildHash()}</span>
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <span className="text-xs text-muted-foreground">typeface</span>
            <span className="font-mono text-sm">Geist Sans · Paper Mono</span>
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <span className="text-xs text-muted-foreground">contact</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="w-fit truncate rounded-sm font-mono text-sm hover:underline focus-visible:outline-2 focus-visible:outline-ring"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-8 sm:items-end sm:text-right">
          <div className="flex min-w-0 flex-col gap-2 sm:items-end">
            <span className="text-xs text-muted-foreground">date</span>
            <time className="font-mono text-sm" dateTime={date}>
              {date}
            </time>
          </div>
          <div className="flex min-w-0 flex-col gap-2 sm:items-end">
            <span className="text-xs text-muted-foreground">based in</span>
            <span className="font-mono text-sm">{USER.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
