import Image from "next/image";
import Link from "next/link";

import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../../data";
import type { Project } from "../../types/projects";
import { ProjectLinks, ProjectMark } from "./project-parts";

export function ProjectList({
  projects,
  heading: Heading = "h3",
}: {
  projects: readonly Project[];
  heading?: "h2" | "h3";
}) {
  return (
    <FluidHoverGroup
      nearest
      className="rounded-2xl bg-neutral-100 p-1.5 dark:bg-neutral-900"
      highlightClassName="bg-neutral-200/70 dark:bg-neutral-800"
    >
      <ul>
        {projects.map((project) => {
          const summary = project.summary || project.description;

          return (
            <li
              key={project.id}
              data-fluid-item
              className="flex gap-2.5 px-2 py-3.5 sm:gap-3 sm:px-3"
            >
              <ProjectMark project={project} />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <Heading className="min-w-0 text-[15px] leading-snug font-medium tracking-tight break-words text-neutral-900 dark:text-neutral-100">
                    <Link
                      href={`/projects/${project.id}`}
                      className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {project.title}
                    </Link>
                  </Heading>
                  <ProjectLinks project={project} />
                </div>

                {summary && (
                  <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-pretty text-neutral-600 dark:text-neutral-400">
                    {summary}
                  </p>
                )}

                {project.skills.length > 0 && (
                  <ul
                    aria-label="Technologies"
                    className="mt-2 flex flex-wrap gap-1.5"
                  >
                    {project.skills.map((skill) => (
                      <ProjectSkill key={skill} skill={skill} />
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </FluidHoverGroup>
  );
}

function ProjectSkill({ skill }: { skill: string }) {
  const name = skill.toLowerCase().trim();
  const tech = TECH_STACK.find(
    ({ title, key }) =>
      title.toLowerCase() === name || key.toLowerCase() === name,
  );
  const darkIcon = tech?.theme ? tech.darkIcon : undefined;
  const iconPath = (icon: string) =>
    icon.startsWith("/") ? icon : `/icons/${icon}`;

  return (
    <li className="inline-flex min-h-6 items-center rounded-full bg-neutral-200 px-2 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
      {tech?.icon ? (
        <span title={tech.title}>
          <Image
            src={iconPath(tech.icon)}
            alt={tech.title}
            width={14}
            height={14}
            className={cn("object-contain", darkIcon && "dark:hidden")}
          />
          {darkIcon && (
            <Image
              src={iconPath(darkIcon)}
              alt={tech.title}
              width={14}
              height={14}
              className="hidden object-contain dark:block"
            />
          )}
        </span>
      ) : (
        skill
      )}
    </li>
  );
}
