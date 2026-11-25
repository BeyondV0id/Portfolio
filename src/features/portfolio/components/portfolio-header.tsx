import Image from "next/image";

import { DesktopNav } from "@/components/desktop-nav";
import { MAIN_NAV, PROFILE_IMAGES } from "@/config/site";
import { USER } from "@/features/portfolio/data";

import { AnimatedTitle } from "./animated-title";

export function PortfolioHeader() {
  return (
    <div id="portfolio-header" className="flex flex-col gap-6 pt-6 pb-8">
      <div className="flex items-center gap-4">
        <div className="relative size-14 shrink-0 sm:size-16">
          <Image
            src={PROFILE_IMAGES.light}
            alt={`${USER.displayName}'s avatar`}
            className="rounded-full object-cover dark:hidden"
            fill
            unoptimized
          />
          <Image
            src={PROFILE_IMAGES.dark}
            alt={`${USER.displayName}'s avatar`}
            className="hidden rounded-full object-cover dark:block"
            fill
            unoptimized
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="text-[20px] font-normal tracking-tight text-foreground">
            {USER.displayName}
          </p>
          <AnimatedTitle />
        </div>
      </div>

      <DesktopNav items={MAIN_NAV} />
    </div>
  );
}
