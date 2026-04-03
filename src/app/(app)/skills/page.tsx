import { Feather } from "@phosphor-icons/react/dist/ssr";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { TECH_STACK } from "@/features/portfolio/data";
import { cn } from "@/lib/utils";


// Helper grouping function
const groupedTechs = TECH_STACK.reduce((acc, curr) => {
  const cat = (curr.categories && curr.categories[0]) || "Tools";
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(curr);
  return acc;
}, {} as Record<string, typeof TECH_STACK>);

const categoryOrder = ["Language", "Core", "Library", "Framework", "Database", "Auth Services", "Development Tools"];

const sortedCategories = Object.keys(groupedTechs).sort((a, b) => {
  const idxA = categoryOrder.indexOf(a);
  const idxB = categoryOrder.indexOf(b);
  if (idxA === -1) return 1;
  if (idxB === -1) return -1;
  return idxA - idxB;
});

function TechBadge({ title, icon, darkIcon, theme }: { title: string, icon: string, darkIcon?: string, theme?: boolean }) {
  const iconSrc = theme ? (icon.startsWith("/") ? icon : `/icons/${icon}`) : (icon.startsWith("/") ? icon : `/icons/${icon}`);
  const darkIconSrc = theme && darkIcon ? (darkIcon.startsWith("/") ? darkIcon : `/icons/${darkIcon}`) : null;

  return (
    <span className="group inline-flex items-center gap-1.5 leading-none rounded-[8px] border border-border bg-transparent px-2 py-1 text-sm font-medium text-muted-foreground align-middle transition-all duration-300 hover:border-foreground/65 hover:text-foreground/65 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 relative -top-[1.5px] select-none">
      {theme && darkIconSrc ? (
        <>
          <Image
            src={iconSrc}
            alt={`${title} icon`}
            width={14}
            height={14}
            className="block dark:hidden shrink-0 w-[14px] h-[14px] object-contain"
            unoptimized
          />
          <Image
            src={darkIconSrc}
            alt={`${title} icon`}
            width={14}
            height={14}
            className="hidden dark:block shrink-0 w-[14px] h-[14px] object-contain"
            unoptimized
          />
        </>
      ) : (
        <Image
          src={iconSrc}
          alt={`${title} icon`}
          width={14}
          height={14}
          className="shrink-0 w-[14px] h-[14px] object-contain"
          unoptimized
        />
      )}
      <span className="transition-colors group-hover:text-foreground whitespace-nowrap">{title}</span>
    </span>
  );
}

export const metadata = {
  title: "Skills",
  description: "My tech stack and tools.",
};

export default function SkillsPage() {
  return (
    <div className="relative bg-background">
      {/* Top Header Boundary */}
      <div className="mx-auto md:max-w-3xl relative p-[9px]" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px), repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "1px 100%, 1px 100%", backgroundPosition: "left top, right top", backgroundRepeat: "no-repeat" }}>
        
        {/* Top viewport boundary line */}
        <div className="pointer-events-none absolute top-0 left-[-1000px] right-[-1000px] h-px -z-1" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }} />

        {/* Flickering Grid Cover */}
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
          <div className="pointer-events-none absolute top-0 left-[-1000px] right-[-1000px] h-px" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }} />
        </div>

        <Container delay={0.1}>
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Link href="/" className="relative z-10 cursor-pointer p-1 border border-border hover:border-foreground/65 rounded-[8px] hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-all duration-300" aria-label="Go back">
                <ArrowLeft className="w-[18px] h-[18px]" />
              </Link>
              <h1 className="text-xl font-bold leading-tight text-foreground font-sans flex items-center gap-2">
                Skills
              </h1>
            </div>
            <div className="relative z-10">
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>
      
      {/* Horizontal Divider */}
      <div className="mx-auto md:max-w-3xl relative">
        <div className="w-full h-px" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }}></div>
        <div className="pointer-events-none absolute top-0 left-[-1000px] right-[-1000px] h-px -z-1" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }}></div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto md:max-w-3xl relative px-6 py-10 pb-10" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px), repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "1px 100%, 1px 100%", backgroundPosition: "left top, right top", backgroundRepeat: "no-repeat" }}>
        
        <Container delay={0.2}>
          <div className="text-muted-foreground leading-loose text-[15px] max-w-2xl mt-4 mb-4">
            <p className="mb-6">
              My main tech stack is{" "}<TechBadge title="Next.js" icon="nextjs.svg" />{" "}framework with{" "}<TechBadge title="Tailwind CSS" icon="tailwindcss.svg" />{" "}as a styling library. For the database, I use{" "}<TechBadge title="PostgreSQL" icon="postgresql.svg" />{" "}deployed on{" "}<TechBadge title="Supabase" icon="supabase.svg" />{" "}with{" "}<TechBadge title="Drizzle ORM" icon="Drizzle ORM_dark.svg" theme={false} />{" "}as an ORM.
            </p>
            <p>
              For database management and rapid schema exploration, I rely on{" "}<TechBadge title="Drizzle Studio" icon="Drizzle ORM_dark.svg" theme={false} />. I focus on building scalable, performant, and type-safe applications that bridge the gap between complex backends and intuitive user interfaces.
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {sortedCategories.map((category) => (
              <React.Fragment key={category}>
                <div className="relative w-full h-px my-4 pointer-events-none">
                  <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-[-1000px] right-[-1000px] h-px -z-1" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }} />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-xs font-mono font-medium tracking-wider text-zinc-500/80 uppercase mb-1">
                    &lt;{category}/&gt;
                  </h2>
                  <ul className="flex flex-wrap gap-2 select-none">
                    {groupedTechs[category].map((tech) => {
                      const iconSrc = tech.theme ? (tech.icon.startsWith("/") ? tech.icon : `/icons/${tech.icon}`) : (tech.icon.startsWith("/") ? tech.icon : `/icons/${tech.icon}`);
                      const darkIconSrc = tech.theme && tech.darkIcon ? (tech.darkIcon.startsWith("/") ? tech.darkIcon : `/icons/${tech.darkIcon}`) : null;

                      return (
                        <li key={tech.key} className="flex">
                          <a
                            href={`https://www.google.com/search?q=${encodeURIComponent(tech.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "group relative flex min-w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[8px] border border-border bg-transparent px-2 py-1",
                              "text-sm transition-all duration-300 select-none",
                              "hover:border-foreground/65 hover:text-foreground/65 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
                            )}
                            aria-label={tech.title}
                          >
                            {/* Icon */}
                            {tech.theme && darkIconSrc ? (
                              <>
                                <Image
                                  src={iconSrc}
                                  alt={`${tech.title} icon`}
                                  width={16}
                                  height={16}
                                  className="block dark:hidden shrink-0 w-[16px] h-[16px] object-contain"
                                  unoptimized
                                />
                                <Image
                                  src={darkIconSrc}
                                  alt={`${tech.title} icon`}
                                  width={16}
                                  height={16}
                                  className="hidden dark:block shrink-0 w-[16px] h-[16px] object-contain"
                                  unoptimized
                                />
                              </>
                            ) : (
                              <Image
                                src={iconSrc}
                                alt={`${tech.title} icon`}
                                width={16}
                                height={16}
                                className="shrink-0 w-[16px] h-[16px] object-contain"
                                unoptimized
                              />
                            )}

                            {/* Label */}
                            <span className="font-medium text-muted-foreground transition-colors group-hover:text-foreground whitespace-nowrap">
                              {tech.title}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Container>

      </div>
    </div>
  );
}

