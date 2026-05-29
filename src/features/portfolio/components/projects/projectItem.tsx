import { ArrowUpRight, Github, Globe, PinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { TECH_STACK } from "../../data";
import type { Project } from "../../types/projects";

export function ProjectItem2({ project, hideBorders = false }: { project: Project; hideBorders?: boolean }) {
  const status = project.status || "building";
  const category = project.category || "Project";
  
  const getTechInfo = (skill: string) => {
    const s = skill.toLowerCase().trim();
    return TECH_STACK.find(
      (t) => t.title.toLowerCase() === s || t.key.toLowerCase() === s
    );
  };

  const links = project.links ?? [];
  const githubLink = links.find((l) => l.type === "github");
  const websiteLink = links.find((l) => l.type === "website");

  return (
    <div className={cn("group relative flex flex-col h-full bg-transparent transition-all duration-300 p-4")}>
      {!hideBorders && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px z-10" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }} />
      )}
      {/* Featured Image Area */}
      <div className="relative bg-zinc-100/50 dark:bg-zinc-900/40 rounded-[20px] p-1 border border-zinc-200 dark:border-white/5 mb-4">
        <div className="relative h-[240px] w-full rounded-[18px] border border-zinc-300/30 dark:border-white/5 p-5 pb-0 bg-zinc-200/30 dark:bg-[#1f1f1f]/50 overflow-hidden">
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
      <div className="flex flex-col gap-3 px-1">
        {/* Title + Links */}
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[18px] font-bold tracking-tight text-foreground leading-tight">
            {project.title}
          </h3>
          
          <div className="flex items-center gap-3">
            {githubLink && (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-foreground transition-colors p-1"
                aria-label="GitHub Repository"
              >
                <Github className="size-5 stroke-[1.75]" />
              </a>
            )}
            {websiteLink && (
              <a
                href={websiteLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-foreground transition-colors p-1"
                aria-label="Live Website"
              >
                <Globe className="size-5 stroke-[1.75]" />
              </a>
            )}
          </div>
        </div>
        
        {/* Description */}
        <div className="text-[14px] text-muted-foreground leading-relaxed whitespace-pre-wrap line-clamp-2">
          {project.description}
        </div>

        {/* Tech Stack Capsules Under Description */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-1 select-none">
            {project.skills.map((skill) => {
              const tech = getTechInfo(skill);
              if (tech) {
                const iconSrc = tech.theme
                  ? tech.icon.startsWith("/")
                    ? tech.icon
                    : `/icons/${tech.icon}`
                  : tech.icon.startsWith("/")
                    ? tech.icon
                    : `/icons/${tech.icon}`;
                const darkIconSrc =
                  tech.theme && tech.darkIcon
                    ? tech.darkIcon.startsWith("/")
                      ? tech.darkIcon
                      : `/icons/${tech.darkIcon}`
                    : null;

                return (
                  <span
                    key={skill}
                    className="group relative inline-flex min-w-fit items-center justify-center gap-1.5 overflow-hidden rounded-[8px] border border-border bg-transparent px-2.5 py-1 text-xs font-normal text-muted-foreground select-none transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.03] hover:shadow-md hover:shadow-zinc-200/40 dark:hover:shadow-zinc-950/40 hover:border-foreground/65 hover:text-foreground/65 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
                  >
                    {tech.theme && darkIconSrc ? (
                      <>
                        <Image
                          src={iconSrc}
                          alt={`${tech.title} icon`}
                          width={12}
                          height={12}
                          className="block dark:hidden shrink-0 w-[12px] h-[12px] object-contain"
                          unoptimized
                        />
                        <Image
                          src={darkIconSrc}
                          alt={`${tech.title} icon`}
                          width={12}
                          height={12}
                          className="hidden dark:block shrink-0 w-[12px] h-[12px] object-contain"
                          unoptimized
                        />
                      </>
                    ) : (
                      <Image
                        src={iconSrc}
                        alt={`${tech.title} icon`}
                        width={12}
                        height={12}
                        className="shrink-0 w-[12px] h-[12px] object-contain"
                        unoptimized
                      />
                    )}
                    <span className="transition-colors group-hover:text-foreground">
                      {tech.title}
                    </span>
                  </span>
                );
              }

              return (
                <span
                  key={skill}
                  className="group relative inline-flex min-w-fit items-center justify-center gap-1.5 overflow-hidden rounded-[8px] border border-border bg-transparent px-2.5 py-1 text-xs font-normal text-muted-foreground select-none transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.03] hover:shadow-md hover:shadow-zinc-200/40 dark:hover:shadow-zinc-950/40 hover:border-foreground/65 hover:text-foreground/65 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
                >
                  <span className="transition-colors group-hover:text-foreground">
                    {skill}
                  </span>
                </span>
              );
            })}
          </div>
        )}

        {/* Bottom Row: Status + View Details */}
        <div className="flex items-center justify-between w-full mt-3">
          {/* Status Pill */}
          <div className="shrink-0 flex items-center gap-2 px-3 py-1 rounded-[8px] bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/5">
            <div className="relative flex items-center justify-center">
              {status === "building" && (
                <span className="absolute size-2 rounded-full bg-amber-500 animate-ping opacity-75" />
              )}
              <span className={cn(
                "relative size-2 rounded-full", 
                status === 'live' ? 'bg-emerald-500' : 'bg-amber-500'
              )} />
            </div>
            <span className="text-[13px] font-mono font-medium text-zinc-500 dark:text-zinc-400 capitalize">
              {status === 'live' ? 'Working' : 'Building'}
            </span>
          </div>

          {/* View Project Link */}
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors group/link cursor-pointer"
          >
            <span className="relative">
              View Project
              <span className="absolute left-0 bottom-0 w-full h-px bg-foreground origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out" />
            </span>
            <ArrowUpRight className="size-4 opacity-70 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}

