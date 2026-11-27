import { ChatRoundDotsIcon } from "@solar-icons/react/linear/chat-round-dots";
import { CodeSquareIcon } from "@solar-icons/react/linear/code-square";
import { DatabaseIcon } from "@solar-icons/react/linear/database";
import { RadarIcon } from "@solar-icons/react/linear/radar";
import { ShieldKeyholeIcon } from "@solar-icons/react/linear/shield-keyhole";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "../../types/projects";

const projectSymbols = {
  discovery: RadarIcon,
  discussion: ChatRoundDotsIcon,
  data: DatabaseIcon,
  security: ShieldKeyholeIcon,
};

export function ProjectMark({ project }: { project: Project }) {
  const Icon = project.symbol ? projectSymbols[project.symbol] : CodeSquareIcon;

  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-foreground dark:bg-background"
    >
      {project.icon ? (
        <Image
          src={project.icon}
          alt=""
          width={20}
          height={20}
          className="size-5 object-contain"
        />
      ) : (
        <Icon className="size-[18px]" />
      )}
    </span>
  );
}

export function ProjectTitleLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="no-underline focus-visible:outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:outline-2 focus-visible:after:outline-ring"
    >
      {project.title}
    </Link>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  const website =
    project.links?.find(({ type }) => type === "website")?.href ??
    project.liveLink;
  const github =
    project.links?.find(({ type }) => type === "github")?.href ??
    project.githubLink;

  if (!website && !github) return null;

  const links = [
    { href: website, label: "Live" },
    { href: github, label: "GitHub" },
  ];

  return (
    <div className="pointer-events-none relative z-10 flex w-fit items-center gap-3">
      {links.map(
        ({ href, label }) =>
          href && (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} for ${project.title}`}
              className="pointer-events-auto rounded-sm text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {label}
            </a>
          ),
      )}
    </div>
  );
}
