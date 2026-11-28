import dynamic from "next/dynamic";

import { AsciiSky } from "@/components/ascii-sky";
import { RevealNavTracker } from "@/components/reveal-nav-tracker";
import { SiteFooter } from "@/components/site-footer";
import { PortfolioHeader } from "@/features/portfolio/components/portfolio-header";

const ScrollToTop = dynamic(() =>
  import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop),
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RevealNavTracker />
      <div className="isolate w-full overflow-x-clip">
        <AsciiSky placement="hero" />
        <div className="mx-auto w-full max-w-2xl px-4">
          <PortfolioHeader />
          <main>{children}</main>
        </div>
      </div>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
