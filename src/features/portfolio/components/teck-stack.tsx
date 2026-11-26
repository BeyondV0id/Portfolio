import Image from "next/image";
import React from "react";

import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { TECH_STACK } from "@/features/portfolio/data";

export function TeckStack() {
  const excludedCategories = new Set([
    "Productivity",
    "Design Tool",
    "Automation",
  ]);
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
      !tech.categories.some((category) => excludedCategories.has(category)),
  );

  return (
    <section id="stack" className="flex flex-col gap-5">
      <h2 className="section-title">stack.</h2>

      <FluidHoverGroup axis="xy" highlightClassName="rounded-md bg-accent">
        <ul className="flex flex-wrap items-center gap-2 select-none">
          {developmentStack.map((tech) => {
            const iconSrc = tech.icon.startsWith("/")
              ? tech.icon
              : `/icons/${tech.icon}`;
            const darkIconSrc =
              tech.theme && tech.darkIcon
                ? tech.darkIcon.startsWith("/")
                  ? tech.darkIcon
                  : `/icons/${tech.darkIcon}`
                : null;

            return (
              <li key={tech.key} className="flex">
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(tech.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-fluid-item
                  className="inline-flex items-center gap-1.5 rounded-md bg-[var(--pill)] px-2.5 py-1 text-xs text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring data-[fluid-hover-active]:text-foreground"
                  aria-label={tech.title}
                >
                  {tech.theme && darkIconSrc ? (
                    <>
                      <Image
                        src={iconSrc}
                        alt={`${tech.title} icon`}
                        width={14}
                        height={14}
                        className="block h-3.5 w-3.5 shrink-0 object-contain dark:hidden"
                        unoptimized
                      />
                      <Image
                        src={darkIconSrc}
                        alt={`${tech.title} icon`}
                        width={14}
                        height={14}
                        className="hidden h-3.5 w-3.5 shrink-0 object-contain dark:block"
                        unoptimized
                      />
                    </>
                  ) : (
                    <Image
                      src={iconSrc}
                      alt={`${tech.title} icon`}
                      width={14}
                      height={14}
                      className="h-3.5 w-3.5 shrink-0 object-contain"
                      unoptimized
                    />
                  )}
                  <span>{tech.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </FluidHoverGroup>
    </section>
  );
}
