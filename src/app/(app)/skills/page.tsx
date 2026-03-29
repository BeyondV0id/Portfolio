import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TECH_STACK } from "@/features/portfolio/data";
import { cn } from "@/lib/utils";
import { Feather } from "@phosphor-icons/react/dist/ssr";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/container";


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
    <span className="inline-flex items-center gap-1 leading-none rounded-md border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900 px-1.5 py-1 text-sm font-medium text-zinc-800 dark:text-zinc-200 align-middle transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 relative -top-[1.5px]">
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
      <span className="translate-y-[0.5px]">{title}</span>
    </span>
  );
}

export const metadata = {
  title: "Skills",
  description: "My tech stack and tools.",
};

export default function SkillsPage() {
  return (
    <div className="relative z-50 bg-background min-h-screen">
      {/* Top Header Boundary */}
      <div className="mx-auto md:max-w-3xl relative p-[9px]" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px), repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "1px 100%, 1px 100%", backgroundPosition: "left top, right top", backgroundRepeat: "no-repeat" }}>
        
        {/* Top viewport boundary line */}
        <div className="pointer-events-none absolute top-0 left-[-1000px] right-[-1000px] h-px -z-1" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }} />

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
            />
          </div>
        </div>

        <div className="relative w-full h-px pointer-events-none mt-2 mb-4">
          <div className="pointer-events-none absolute top-0 left-[-1000px] right-[-1000px] h-px" style={{ backgroundImage: "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat" }} />
        </div>

        <Container delay={0.1}>
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Link href="/" className="relative z-10 cursor-pointer p-1 border border-transparent hover:border-border rounded-[6px] hover:bg-mutedBackground transition-colors duration-300" aria-label="Go back">
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
                          <div
                            className={cn(
                              "flex items-center gap-2 rounded-[10px] px-3 py-1.5",
                              "border border-zinc-200/80 dark:border-zinc-800/80",
                              "bg-zinc-50/50 dark:bg-zinc-900/40",
                              "text-[13px] font-medium text-zinc-800 dark:text-zinc-200",
                              "transition-all duration-200 hover:bg-zinc-100/80 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
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
                            <span className="leading-none mt-[1px]">{tech.title}</span>
                          </div>
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

