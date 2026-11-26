import { ProjectList } from "@/features/portfolio/components/projects/project-list";
import { PROJECTS } from "@/features/portfolio/data";

export const metadata = {
  title: "Projects",
  description: "View my showcase of projects.",
};

export default function ProjectsPage() {
  return (
    <div className="reveal-stagger reveal-page-sub pb-16">
      <h1 className="section-title">projects.</h1>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        cool projects i&apos;ve worked on and things i&apos;m actively building.
      </p>

      <div className="mt-6">
        <ProjectList projects={PROJECTS} heading="h2" />
      </div>
    </div>
  );
}
