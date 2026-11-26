import dynamic from "next/dynamic";

import { RevealNavTracker } from "@/components/reveal-nav-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PortfolioHeader } from "@/features/portfolio/components/portfolio-header";

const ScrollToTop = dynamic(() =>
  import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop),
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RevealNavTracker />
      <SiteHeader />
      <div className="w-full overflow-x-clip">
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
