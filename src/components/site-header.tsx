import dynamic from "next/dynamic";
import Link from "next/link";

import { DesktopNav } from "@/components/desktop-nav";
import { MAIN_NAV, SITE_INFO } from "@/config/site";
import { cn } from "@/lib/utils";

import { SiteHeaderWrapper } from "./site-header-wrapper";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <SiteHeaderWrapper
      className={cn(
        "sticky inset-x-0 top-0 z-[100] bg-background/80 backdrop-blur-md px-2 pt-2",
        "data-[affix=true]:shadow-[0_4px_12px_-4px_black]/10 dark:data-[affix=true]:shadow-[0_4px_12px_-4px_black]/50",
        "transition-all duration-300",
      )}
    >
      <div
        className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 screen-border-x px-4 after:z-1 sm:gap-4 md:max-w-3xl"
        data-header-container
      >
        <DesktopNav items={MAIN_NAV} />

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}
