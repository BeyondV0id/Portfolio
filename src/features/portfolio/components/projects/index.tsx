import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { PROJECTS } from "@/features/portfolio/data";

import { ProjectLinks, ProjectMark } from "./project-parts";

export function Projects() {
  const pinnedProjects = PROJECTS.filter((project) => project.pinned).slice(
    0,
    4,
  );

  return (
    <section id="projects" className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[18px] font-medium tracking-tight text-foreground">
          recent works.
        </h2>
        <Link
          href="/projects"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-sm text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          All projects <ArrowRight aria-hidden className="size-3.5" />
        </Link>
      </div>

      <FluidHoverGroup
        axis="xy"
        highlightClassName="rounded-2xl bg-neutral-200 dark:bg-neutral-700"
      >
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {pinnedProjects.map((project) => (
            <li
              key={project.id}
              data-fluid-item
              className="flex min-w-0 flex-col gap-4 rounded-2xl bg-neutral-100/65 p-4 dark:bg-neutral-900/70"
            >
              <div className="flex items-start justify-between gap-3">
                <ProjectMark project={project} className="size-10" />
                <ProjectLinks project={project} compact />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                  <Link
                    href={`/projects/${project.id}`}
                    className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {project.title}
                  </Link>
                </h3>
                {(project.summary || project.description) && (
                  <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {project.summary || project.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </FluidHoverGroup>
    </section>
  );
}
