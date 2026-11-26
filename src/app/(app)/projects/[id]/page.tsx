import { ArrowLeftIcon as ArrowLeft } from "@solar-icons/react/linear/arrow-left";
import { GlobalIcon as Globe } from "@solar-icons/react/linear/global";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { Icons } from "@/components/icons";
import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { PROJECTS } from "@/features/portfolio/data";
import type { ProjectLink } from "@/features/portfolio/types/projects";
import { cn } from "@/lib/utils";

function getAllLinks(project: {
  githubLink?: string;
  liveLink?: string;
  links?: ProjectLink[];
}): ProjectLink[] {
  if (project.links && project.links.length > 0) return project.links;
  const result: ProjectLink[] = [];
  if (project.githubLink)
    result.push({ type: "github", href: project.githubLink });
  if (project.liveLink)
    result.push({ type: "website", href: project.liveLink });
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

  const status = project.status;
  const isLive = status === "live";
  const links = getAllLinks(project);

  const githubLink = getLink(links, "github");
  const websiteLink = getLink(links, "website");

  const paragraphs = (project.description ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="pb-16">
      <Link href="/projects" className="quiet-link mb-8">
        <ArrowLeft aria-hidden className="size-4" />
        All projects
      </Link>

      <div className="flex flex-col gap-8">
        {project.image && (
          <div className="relative h-[220px] w-full overflow-hidden rounded-xl bg-muted sm:h-[320px]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Title + Status + Links */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-[22px] leading-[34px] font-medium tracking-[-0.01em] text-foreground">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              {status && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      isLive
                        ? "bg-foreground"
                        : "border border-muted-foreground",
                    )}
                    aria-hidden
                  />
                  <span className="lowercase">{status}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {githubLink && (
                  <a
                    href={githubLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quiet-link"
                  >
                    <Icons.github aria-hidden className="size-4" />
                    <span>GitHub</span>
                  </a>
                )}

                {websiteLink && (
                  <a
                    href={websiteLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quiet-link"
                  >
                    <Globe aria-hidden className="size-4" />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="text-[15px] leading-relaxed text-foreground/85 [&>p]:mb-3 [&>p:last-child]:mb-0">
            {paragraphs.length > 0 ? (
              paragraphs.map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p className="text-muted-foreground italic">
                No description provided.
              </p>
            )}
          </div>
        </div>

        {/* Stack Used */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="section-title">stack used.</h2>
            <FluidHoverGroup
              axis="xy"
              highlightClassName="rounded-md bg-accent"
              className="flex flex-wrap items-center gap-2"
            >
              {project.skills.map((skill) => (
                <a
                  key={skill}
                  href={`https://www.google.com/search?q=${encodeURIComponent(skill)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-fluid-item
                  className="inline-flex items-center rounded-md bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring data-[fluid-hover-active]:text-foreground"
                >
                  {skill}
                </a>
              ))}
            </FluidHoverGroup>
          </div>
        )}
      </div>
    </div>
  );
}
