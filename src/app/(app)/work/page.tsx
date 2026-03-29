import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { EXPERIENCES } from "@/features/portfolio/data";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Tag } from "@/components/ui/tag";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/container";

export const metadata = {
  title: "Experiences",
  description: "My professional experiences.",
};

export default function ExperiencesPage() {
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
              <h1 className="text-xl font-bold leading-tight text-foreground font-sans flex items-baseline gap-3">
                Experiences
              </h1>
            </div>
            <div className="relative z-10">
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>
      
      <div className="mx-auto md:max-w-3xl relative">
        <div className="w-full h-px" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }}></div>
        <div className="pointer-events-none absolute top-0 -left-[100vw] w-[200vw] h-px -z-1" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }}></div>
      </div>

      <div className="mx-auto md:max-w-3xl relative px-6 py-10 pb-6" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px), repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "1px 100%, 1px 100%", backgroundPosition: "left top, right top", backgroundRepeat: "no-repeat" }}>
        
        <Container delay={0.2}>
          <div className="flex flex-col">
            {EXPERIENCES.map((exp, expIdx) => {
              if (!exp?.positions) return null;
              return exp.positions.map((pos, posIdx) => {
                const start = pos.employmentPeriod?.start ?? "";
                const end = pos.employmentPeriod?.end ?? "Present";

                return (
                  <React.Fragment key={`${exp.id}-${pos.id}`}>
                    {(expIdx > 0 || posIdx > 0) && (
                      <div className="relative w-full h-px my-8 pointer-events-none">
                        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-[100vw] w-[200vw] h-px -z-1" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }} />
                      </div>
                    )}

                    <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                        <div className="flex items-start gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-muted/50 border border-muted-foreground/15">
                            {exp.companyLogo ? (
                              <Image
                                src={exp.companyLogo}
                                alt={exp.companyName || "Company logo"}
                                width={40}
                                height={40}
                                className="rounded-[10px] w-full h-full object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="w-6 h-6 bg-primary/20 rounded-[4px] flex items-center justify-center">
                                <span className="text-xs font-bold">{(exp.companyName || "?").charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <h3 className="text-[1.05rem] font-bold text-foreground font-sans">
                                {exp.companyName || "Unknown"}
                              </h3>
                              {pos.employmentType && (
                                <span className="inline-flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-1.5 py-[0.5px] text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                                  {pos.employmentType}
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mt-0.5">
                              {pos.title}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-start sm:items-end w-full sm:w-auto mt-1 sm:mt-0 pl-13 sm:pl-0">
                          <p className="text-[13px] font-medium text-foreground">
                            {start}
                            {end && end !== start && (
                              <>
                                <span className="font-mono"> — </span>
                                {end}
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="pl-13 w-full">
                        {pos.description && (
                          <ul className="text-[14px] leading-relaxed text-zinc-400 dark:text-zinc-400 list-disc ml-5 marker:text-zinc-600 space-y-1.5 pt-2">
                            {pos.description.split('\n').filter(l => l.trim() !== '').map((line, i) => (
                              <li key={i}>{line.trim()}</li>
                            ))}
                          </ul>
                        )}

                        {pos.skills && pos.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {pos.skills.map((skill) => (
                              <Tag key={skill}>{skill}</Tag>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  </React.Fragment>
                );
              });
            })}
          </div>
        </Container>

      </div>
    </div>
  );
}

