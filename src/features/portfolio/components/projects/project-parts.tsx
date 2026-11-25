import { ArrowUpRight, Github, Globe } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import type { Project } from "../../types/projects";

export function ProjectMark({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const initials = project.title
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg bg-white font-mono text-xs font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
        className,
      )}
    >
      {project.icon ? (
        <Image src={project.icon} alt="" width={22} height={22} />
      ) : (
        initials
      )}
    </span>
  );
}

export function ProjectLinks({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const website =
    project.links?.find(({ type }) => type === "website")?.href ??
    project.liveLink;
  const github =
    project.links?.find(({ type }) => type === "github")?.href ??
    project.githubLink;

  if (!website && !github) return null;

  const links = [
    { href: website, label: "Live site", icon: Globe },
    { href: github, label: "GitHub", icon: Github },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 text-xs",
        compact && "gap-x-1",
      )}
    >
      {links.map(
        ({ href, label, icon: Icon }) =>
          href && (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} for ${project.title}`}
              title={compact ? label : undefined}
              className={cn(
                "inline-flex min-h-6 items-center gap-1 rounded-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-neutral-400 dark:hover:text-neutral-100",
                compact && "size-8 justify-center",
              )}
            >
              {compact ? (
                <Icon aria-hidden className="size-4" />
              ) : (
                <>
                  {label}
                  <ArrowUpRight aria-hidden className="size-3" />
                </>
              )}
            </a>
          ),
      )}
    </div>
  );
}
