import { PortfolioList } from "@/components/ui/portfolio-list";

import type { Project } from "../../types/projects";
import { ProjectLinks, ProjectMark, ProjectTitleLink } from "./project-parts";

export function ProjectList({
  projects,
  heading: Heading = "h3",
}: {
  projects: readonly Project[];
  heading?: "h2" | "h3";
}) {
  return (
    <PortfolioList>
      {projects.map((project) => {
        const summary = project.summary || project.description;

        return (
          <li
            key={project.id}
            data-fluid-item
            className="relative flex min-w-0 items-start gap-3 rounded-xl px-3 py-4"
          >
            <ProjectMark project={project} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <Heading className="min-w-0 text-[15px] leading-snug font-medium text-foreground">
                  <ProjectTitleLink project={project} />
                </Heading>
                <ProjectLinks project={project} />
              </div>

              {summary && (
                <p className="mt-1 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {summary}
                </p>
              )}

              {project.skills.length > 0 && (
                <ul
                  aria-label="Technologies"
                  className="mt-2 flex flex-wrap gap-1.5"
                >
                  {project.skills.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex items-center rounded-md bg-[var(--pill)] px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </PortfolioList>
  );
}
