import Link from "next/link";

import { PROJECTS } from "@/features/portfolio/data";

import { ProjectList } from "./project-list";

export function Projects() {
  const pinnedProjects = PROJECTS.filter((project) => project.pinned).slice(
    0,
    4,
  );

  return (
    <section id="projects" className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="section-title">projects.</h2>
        <Link href="/projects" className="quiet-link">
          View all
        </Link>
      </div>
      <ProjectList projects={pinnedProjects} />
    </section>
  );
}
