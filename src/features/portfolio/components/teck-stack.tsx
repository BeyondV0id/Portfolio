import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { TECH_STACK } from "@/features/portfolio/data";
import { cn } from "@/lib/utils";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function TeckStack() {
  const excludedCategories = new Set(["Productivity", "Design Tool", "Automation"]);
  const excludedKeys = new Set([
    "tableau",
    "mysql",
    "pandas",
    "numpy",
    "scikit-learn",
    "matplotlib",
    "seaborn",
  ]);
  const developmentStack = TECH_STACK.filter(
    (tech) =>
      !excludedKeys.has(tech.key) &&
      !tech.categories.some((category) => excludedCategories.has(category))
  );

  return (
    <Panel id="stack">
      <PanelHeader className="flex items-center justify-between">
        <PanelTitle>Stack</PanelTitle>
        <Link 
          href="/skills" 
          className="group mr-2 inline-flex items-center gap-1 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
        >
          View More <ArrowUpRightIcon className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </PanelHeader>

      <PanelContent>
        <ul className="flex flex-wrap items-center justify-center gap-2 select-none">
          {developmentStack.map((tech) => {
            const iconSrc = tech.theme ? `icons/${tech.icon}` : `/icons/${tech.icon}`;
            const darkIconSrc = tech.theme ? `icons/${tech.darkIcon}` : null;

            return (
              <li key={tech.key} className="flex">
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(tech.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative flex min-w-fit flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[8px] border border-border bg-transparent px-2 py-1",
                    "text-sm transition-all duration-300 select-none",
                    "hover:border-foreground/65 hover:text-foreground/65 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
                  )}
                  aria-label={tech.title}
                >
                  {tech.theme && darkIconSrc ? (
                    <>
                      <Image src={iconSrc} alt={`${tech.title} icon`} width={16} height={16} className="block h-4 w-4 shrink-0 object-contain dark:hidden" unoptimized />
                      <Image src={darkIconSrc} alt={`${tech.title} icon`} width={16} height={16} className="hidden h-4 w-4 shrink-0 object-contain dark:block" unoptimized />
                    </>
                  ) : (
                    <Image src={iconSrc} alt={`${tech.title} icon`} width={16} height={16} className="h-4 w-4 shrink-0 object-contain" unoptimized />
                  )}
                  <span className="font-medium text-muted-foreground transition-colors group-hover:text-foreground whitespace-nowrap">
                    {tech.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}
