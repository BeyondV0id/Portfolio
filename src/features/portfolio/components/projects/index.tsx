import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { PROJECTS, SOCIAL_LINKS } from "@/features/portfolio/data";

import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectItem2 } from "./projectItem";

export function Projects() {
  const pinnedProjects = PROJECTS.filter(project => project.pinned);

  return (
    <Panel id="projects">
      <PanelHeader className="flex items-center justify-between">
        <PanelTitle>
          Projects
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({PROJECTS.length})
          </sup>
        </PanelTitle>
        <Link 
          href="/projects" 
          className="group mr-2 inline-flex items-center gap-1 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
        >
          View More <ArrowUpRightIcon className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </PanelHeader>

      <div className="relative">
      <div className="relative grid grid-cols-1 sm:grid-cols-2">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 z-0 hidden sm:block pointer-events-none z-10" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "1px 100%", backgroundRepeat: "no-repeat" }} />
        
        {pinnedProjects.map((project, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && idx % 2 === 0 && (
              <div className="hidden sm:block col-span-2 relative z-10 pointer-events-none">
                <div className="w-full h-px" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }}></div>
              </div>
            )}
            {idx > 0 && (
              <div className="block sm:hidden pointer-events-none">
                <div className="w-full h-px" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }}></div>
              </div>
            )}
            <div>
              <ProjectItem2 project={project} hideBorders={true} />
            </div>
          </React.Fragment>
        ))}
      </div>
      </div>

    </Panel>
  );
}
