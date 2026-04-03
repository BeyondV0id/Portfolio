import { ArrowLeft, ExternalLink,FileText, Github, Globe } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { PROJECTS } from "@/features/portfolio/data";
import type { ProjectLink } from "@/features/portfolio/types/projects";

const DASH_H = {
  backgroundImage:
    "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)",
  backgroundSize: "100% 1px",
  backgroundRepeat: "no-repeat",
} as const;

const DASH_V = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)",
  backgroundSize: "1px 100%",
  backgroundRepeat: "no-repeat",
} as const;

const SIDE_DASH = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px), repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)",
  backgroundSize: "1px 100%, 1px 100%",
  backgroundPosition: "left top, right top",
  backgroundRepeat: "no-repeat",
} as const;

function HDash() {
  return (
    <div
      className="pointer-events-none absolute top-0 -left-[100vw] w-[200vw] h-px -z-1"
      style={DASH_H}
    />
  );
}

function getAllLinks(project: {
  githubLink?: string;
  liveLink?: string;
  links?: ProjectLink[];
}): ProjectLink[] {
  if (project.links && project.links.length > 0) return project.links;
  const result: ProjectLink[] = [];
  if (project.githubLink) result.push({ type: "github", href: project.githubLink });
  if (project.liveLink) result.push({ type: "website", href: project.liveLink });
  return result;
}

function getLink(links: ProjectLink[], type: ProjectLink["type"]) {
  return links.find((l) => l.type === type);
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  const status = project.status ?? "building";
  const isLive = status === "live";
  const links = getAllLinks(project);

  const githubLink = getLink(links, "github");
  const websiteLink = getLink(links, "website");
  const postLink = getLink(links, "post");

  // Split description into paragraphs on newlines
  const paragraphs = (project.description ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="relative bg-background">

      {/* ── Header ── */}
      <div className="mx-auto md:max-w-3xl relative p-[9px]" style={SIDE_DASH}>
        <HDash />

        {/* Pattern Grid */}
        <div className="relative h-[100px] sm:h-[250px] w-full p-2 sm:p-4">
          <div className="relative size-full overflow-hidden bg-background/50">
            <div className="overflow-hidden p-2 sm:p-5 h-full">
              <div
                className="h-full min-h-[60px] w-full bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center px-[5px] sm:min-h-[110px] [--pattern-foreground:color-mix(in_oklab,var(--color-zinc-400)_60%,transparent)] dark:[--pattern-foreground:color-mix(in_oklab,var(--color-zinc-600)_60%,transparent)]"
              />
            </div>
          </div>
        </div>

        <div className="relative w-full h-px pointer-events-none mt-2 mb-4">
          <div className="pointer-events-none absolute top-0 -left-[100vw] w-[200vw] h-px" style={DASH_H} />
        </div>

        <Container delay={0.1}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="/projects"
                className="relative z-10 cursor-pointer p-1 border border-border hover:border-foreground/65 rounded-[8px] hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-all duration-300"
                aria-label="Go back"
              >
                <ArrowLeft className="w-[18px] h-[18px]" />
              </Link>
              <h1 className="text-[1.15rem] font-bold leading-tight text-title">
                Projects
              </h1>
            </div>
            <div className="relative z-10">
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>

      {/* ── Divider ── */}
      <div className="mx-auto md:max-w-3xl relative">
        <div className="w-full h-px" style={DASH_H} />
        <HDash />
      </div>

      {/* ── Main Content ── */}
      <div className="mx-auto md:max-w-3xl relative" style={SIDE_DASH}>
        <Container delay={0.2}>
          <div className="flex flex-col items-start">

            {/* Image */}
            <div className="px-4 w-full p-4">
              <div className="w-full h-full md:min-h-[340px] min-h-[200px] rounded-[12px] relative border border-border p-[4px] overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1000}
                    height={1000}
                    className="w-full object-cover md:h-[340px] h-[200px] rounded-[8px] border border-border"
                    unoptimized
                  />
                ) : (
                  <div className="w-full md:h-[340px] h-[200px] rounded-[8px] border border-border flex flex-col items-center justify-center bg-zinc-950 select-none">
                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/30 mb-2 opacity-50">
                      STAY TUNED
                    </span>
                    <span className="text-3xl font-black uppercase tracking-tighter text-white/30 leading-[0.85] text-center opacity-50">
                      COMING
                      <br />
                      SOON
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Links Row */}
            <div className="w-full">
              {/* top divider of row */}
              <div className="w-full h-px" style={DASH_H} />

              <div className="flex items-stretch justify-between w-full">
                {/* GitHub */}
                {githubLink ? (
                  <a
                    href={githubLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group py-[11px] flex text-[1.05rem] text-foreground hover:text-title hover:bg-mutedBackground transition-all duration-300 w-full items-center justify-center cursor-pointer"
                  >
                    <Github className="w-[15px] h-[15px] shrink-0" />
                    <div className="relative ml-1.5">
                      <span>Github</span>
                      <span className="absolute left-0 bottom-0 w-full h-px bg-title origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </div>
                    <ExternalLink className="opacity-0 hidden lg:block group-hover:opacity-100 transition-opacity duration-300" height={18} width={18} />
                  </a>
                ) : (
                  <div className="py-[11px] flex text-[1.05rem] text-foreground opacity-40 w-full items-center justify-center cursor-not-allowed select-none">
                    <Github className="w-[15px] h-[15px] shrink-0" />
                    <div className="relative ml-1.5"><span>Github</span></div>
                  </div>
                )}

                {/* Vertical separator */}
                <div className="self-stretch">
                  <div className="h-full w-px" style={DASH_V} />
                </div>

                {/* Website */}
                {websiteLink ? (
                  <a
                    href={websiteLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group py-[11px] flex text-[1.05rem] text-foreground hover:text-title hover:bg-mutedBackground transition-all duration-300 w-full items-center justify-center cursor-pointer"
                  >
                    <Globe className="w-[15px] h-[15px] shrink-0" />
                    <div className="relative ml-1.5">
                      <span>Website</span>
                      <span className="absolute left-0 bottom-0 w-full h-px bg-title origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </div>
                    <ExternalLink className="opacity-0 hidden lg:block group-hover:opacity-100 transition-opacity duration-300" height={18} width={18} />
                  </a>
                ) : (
                  <div className="py-[11px] flex text-[1.05rem] text-foreground opacity-40 w-full items-center justify-center cursor-not-allowed select-none">
                    <Globe className="w-[15px] h-[15px] shrink-0" />
                    <div className="relative ml-1.5"><span>Website</span></div>
                  </div>
                )}

                {/* Vertical separator */}
                <div className="self-stretch">
                  <div className="h-full w-px" style={DASH_V} />
                </div>

                {/* Post */}
                {postLink ? (
                  <a
                    href={postLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group py-[11px] flex text-[1.05rem] text-foreground hover:text-title hover:bg-mutedBackground transition-all duration-300 w-full items-center justify-center cursor-pointer"
                  >
                    <FileText className="w-[15px] h-[15px] shrink-0" />
                    <div className="relative ml-1.5">
                      <span>Post</span>
                      <span className="absolute left-0 bottom-0 w-full h-px bg-title origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </div>
                    <ExternalLink className="opacity-0 hidden lg:block group-hover:opacity-100 transition-opacity duration-300" height={18} width={18} />
                  </a>
                ) : (
                  <div className="py-[11px] flex text-[1.05rem] text-foreground opacity-40 w-full items-center justify-center cursor-not-allowed select-none">
                    <FileText className="w-[15px] h-[15px] shrink-0" />
                    <div className="relative ml-1.5"><span>Post</span></div>
                  </div>
                )}
              </div>

              {/* bottom divider of row */}
              <div className="w-full h-px" style={DASH_H} />
            </div>

            {/* Title + Status + Description */}
            <div className="flex flex-col w-full gap-1.5 p-4">
              {/* Title + animated status */}
              <div className="flex items-center justify-between">
                <h2 className="text-[1.40rem] font-bold leading-tight text-title">
                  {project.title}
                </h2>
                <div className="flex items-center gap-1 pr-1 select-none">
                  <div className="relative flex items-center justify-center">
                    {!isLive && (
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping bg-amber-500"
                        style={{ width: 10, height: 10, borderRadius: "50%", opacity: 0.4 }}
                      />
                    )}
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 24 24"
                      className={`relative z-10 ${isLive ? "text-emerald-500" : "text-amber-500"}`}
                      height={14}
                      width={14}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium capitalize">
                    {status}
                  </p>
                </div>
              </div>

              {/* Description paragraphs */}
              <div className="text-base text-foreground [&>p]:mb-3 [&>p:last-child]:mb-0">
                {paragraphs.length > 0 ? (
                  paragraphs.map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <p className="text-muted-foreground italic">No description provided.</p>
                )}
              </div>
            </div>

            {/* ── Stack Used ── */}
            <div className="w-full h-px" style={DASH_H} />

            <div className="flex font-semibold text-title flex-col gap-2.5 px-4 pt-4 pb-5 w-full">
              <h3>Stack used</h3>
              <div className="flex flex-wrap items-center gap-1.5">
                {project.skills.map((skill) => (
                  <a
                    key={skill}
                    href={`https://www.google.com/search?q=${encodeURIComponent(skill)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex min-w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[8px] border border-border bg-transparent px-2 py-1 text-sm transition-all duration-300 hover:border-foreground/65 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 select-none"
                  >
                    <span className="font-medium text-muted-foreground transition-colors group-hover:text-foreground whitespace-nowrap">
                      {skill}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </div>


    </div>
  );
}
