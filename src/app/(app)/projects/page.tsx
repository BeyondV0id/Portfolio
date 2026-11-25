import { ProjectList } from "@/features/portfolio/components/projects/project-list";
import { PROJECTS } from "@/features/portfolio/data";

export const metadata = {
  title: "Projects",
  description: "View my showcase of projects.",
};

export default function ProjectsPage() {
  return (
    <div className="pb-16">
      <h1 className="text-[18px] font-medium tracking-tight text-foreground">
        projects.
      </h1>
      <p className="mt-2 text-base leading-tight font-normal tracking-tight text-muted-foreground">
        cool projects i&apos;ve worked on and things i&apos;m actively building.
      </p>

      <div className="reveal-product-subtle mt-8">
        <ProjectList projects={PROJECTS} heading="h2" />
      </div>
    </div>
  );
}
