import { SiLeetcode } from "@icons-pack/react-simple-icons";
import { FileIcon } from "@solar-icons/react/linear/file";
import { LetterIcon } from "@solar-icons/react/linear/letter";
import { Suspense } from "react";

import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { SOCIAL_LINKS, USER } from "@/features/portfolio/data";
import { getGitHubContributions } from "@/features/portfolio/data/github-contributions";

import {
  GitHubContributionFallback,
  GitHubContributionGraph,
} from "./github-contributions/graph";

const RESUME_URL =
  "https://drive.google.com/drive/folders/1zgvzdr7TtIUkfEDyFkDcVbsKF_03nY4q";
const SOCIAL_ACTIONS = [
  { title: "Email", icon: LetterIcon },
  { title: "GitHub", icon: Icons.github },
  { title: "LinkedIn", icon: Icons.linkedin },
  { title: "LeetCode", icon: SiLeetcode },
  { title: "X (Twitter)", icon: Icons.x },
];
const ICON_CLASS_NAME = "size-3.5 shrink-0";
const PILL_CLASS_NAME =
  "inline-flex items-center gap-1.5 rounded-md bg-[var(--pill)] px-2.5 py-1 text-xs text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring data-[fluid-hover-active]:text-foreground";

export function Hero() {
  const contributions = getGitHubContributions();
  const heroSocials = SOCIAL_ACTIONS.flatMap(({ title, icon }) => {
    const link = SOCIAL_LINKS.find((social) => social.title === title);
    return link ? [{ ...link, icon }] : [];
  });

  return (
    <section className="flex flex-col gap-8 pb-8">
      <div className="flex flex-col gap-3">
        <h2 className="section-title">about me.</h2>

        <div className="text-lg leading-[1.6] text-muted-foreground [&>p]:mb-3 [&>p:last-child]:mb-0 [&_strong]:font-medium [&_strong]:text-foreground">
          <Markdown>{USER.about}</Markdown>
        </div>

        <FluidHoverGroup
          axis="xy"
          className="mt-2 flex flex-wrap items-center gap-2"
          highlightClassName="rounded-md bg-accent"
        >
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-fluid-item
            className={PILL_CLASS_NAME}
          >
            <FileIcon aria-hidden className={ICON_CLASS_NAME} />
            Resume
          </a>
          {heroSocials.map(({ title, href, icon: Icon }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              data-fluid-item
              className={PILL_CLASS_NAME}
            >
              <Icon aria-hidden className={ICON_CLASS_NAME} />
              {title === "X (Twitter)" ? "X" : title}
            </a>
          ))}
        </FluidHoverGroup>
      </div>

      <section aria-label="GitHub contributions">
        <Suspense fallback={<GitHubContributionFallback />}>
          <GitHubContributionGraph contributions={contributions} />
        </Suspense>
      </section>
    </section>
  );
}
