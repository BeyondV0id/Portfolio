import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PROJECTS, SOCIAL_LINKS } from "@/features/portfolio/data";
import { ProjectItem2 } from "@/features/portfolio/components/projects/projectItem";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Projects",
  description: "View my showcase of projects.",
};

export default function ProjectsPage() {
  return (
    <div className="relative z-50 bg-background min-h-screen">
      <div className="mx-auto md:max-w-3xl relative p-[9px]" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px), repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "1px 100%, 1px 100%", backgroundPosition: "left top, right top", backgroundRepeat: "no-repeat" }}>
        
        {/* Top viewport boundary line */}
        <div className="pointer-events-none absolute top-0 -left-[100vw] w-[200vw] h-px -z-1" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }} />

        {/* Flickering Grid Cover */}
        <div className="relative h-[250px] w-full p-4">
          <div className="relative size-full overflow-hidden bg-background/50">
            <FlickeringGrid
              className="absolute inset-0 z-0 size-full"
              squareSize={4}
              gridGap={4}
              color="#6B7280"
              maxOpacity={0.4}
              flickerChance={0.05}
              height={800}
              width={800}
            />
          </div>
        </div>

        <div className="relative w-full h-px pointer-events-none mt-2 mb-4">
          <div className="pointer-events-none absolute top-0 -left-[100vw] w-[200vw] h-px" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }} />
        </div>

        <Container delay={0.1}>
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Link href="/" className="relative z-10 cursor-pointer p-1 border border-transparent hover:border-border rounded-[6px] hover:bg-mutedBackground transition-colors duration-300" aria-label="Go back">
                <ArrowLeft className="w-[18px] h-[18px]" />
              </Link>
              <h1 className="text-[1.15rem] font-bold leading-tight text-title">Projects</h1>
            </div>
            <div className="relative z-10 ml-2">
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>
      
      <div className="mx-auto md:max-w-3xl relative">
        <div className="w-full h-px" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }}></div>
        <div className="pointer-events-none absolute top-0 -left-[100vw] w-[200vw] h-px -z-1" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }}></div>
      </div>

      <div className="mx-auto md:max-w-3xl relative" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px), repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "1px 100%, 1px 100%", backgroundPosition: "left top, right top", backgroundRepeat: "no-repeat" }}>
        <Container delay={0.2}>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-0">
            <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 z-0 hidden sm:block pointer-events-none">
              <div className="h-full w-px" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "1px 100%", backgroundRepeat: "no-repeat" }}></div>
            </div>

            {PROJECTS.map((project, idx) => (
              <React.Fragment key={project.title}>
                {/* Desktop Horizontal Divider before the item (starting row 2+, so idx === 2, 4...) */}
                {idx > 0 && idx % 2 === 0 && (
                  <div className="hidden sm:block col-span-2 relative w-full h-px pointer-events-none z-0">
                    <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-[100vw] w-[200vw] h-px -z-1" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }}></div>
                  </div>
                )}

                {/* Mobile Horizontal Divider before every item (except the 1st) */}
                {idx > 0 && (
                  <div className="block sm:hidden relative w-full h-px pointer-events-none">
                    <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-[100vw] w-[200vw] h-px -z-1" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }}></div>
                  </div>
                )}

                <div className="">
                  <div className="relative z-10 p-3 h-full">
                    <ProjectItem2 project={project} hideBorders={true} />
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

