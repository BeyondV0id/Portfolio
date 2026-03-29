import { Github, Globe, PinIcon, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Project } from "../../types/projects";

export function ProjectItem2({ project, hideBorders = false }: { project: Project; hideBorders?: boolean }) {
  const status = project.status || "building";
  const category = project.category || "Project";
  
  return (
    <div className={cn("group relative flex flex-col h-full bg-transparent transition-all duration-300 p-4")}>
      {!hideBorders && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px z-10" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }} />
      )}
      {/* Featured Image Area (The grey box with offset border effect) */}
      <div className="relative bg-zinc-100/50 dark:bg-zinc-900/40 rounded-[20px] p-1 border border-zinc-200 dark:border-white/5 mb-4">
        {/* The Inner Border Plate (Clipped Container) */}
        <div className="relative h-[240px] w-full rounded-[18px] border border-zinc-300/30 dark:border-white/5 p-5 pb-0 bg-zinc-200/30 dark:bg-[#1f1f1f]/50 overflow-hidden">
          {/* Label and Pinned State */}
          <div className="flex items-center justify-between w-full mb-6">
            <span className="text-[13px] font-medium text-zinc-500 dark:text-zinc-500 font-sans tracking-tight">
              {category}
            </span>
            {project.pinned && (
              <div className="bg-white/80 dark:bg-black/50 p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 shadow-sm relative z-10">
                <PinIcon className="size-3.5 rotate-45 text-black dark:text-white" />
              </div>
            )}
          </div>

          {/* The Project Image/Placeholder (Shifted and Clipped) */}
          <div className="relative aspect-[16/10] w-[110%] -left-[5%] mx-auto bg-black rounded-t-xl border border-white/5 overflow-hidden translate-y-4 shadow-2xl">
            {project.image ? (
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 h-full select-none">
                 <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/20 mb-2">STAY TUNED</span>
                 <span className="text-3xl font-black uppercase tracking-tighter text-white leading-[0.85] text-center">COMING<br/>SOON</span>
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>
        </div>
      </div>



      {/* Project Details Below */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[16px] font-bold tracking-tight text-foreground leading-tight">{project.title}</h3>
          
          {/* Status Pill */}
          <div className="shrink-0 flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/5">
            <span className={cn(
              "size-2 rounded-full", 
              status === 'live' ? 'bg-emerald-500' : 'bg-red-500'
            )} />
            <span className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 capitalize">{status}</span>
          </div>
        </div>
        
        <div className="text-[14px] text-muted-foreground leading-relaxed whitespace-pre-wrap line-clamp-2">
          {project.description}
        </div>

        <div className="mt-1">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors group/link hover:underline underline-offset-4"
            >
              View Project <ArrowUpRight className="size-4 opacity-70" />
            </Link>
        </div>
      </div>
    </div>
  );
}
