import dynamic from "next/dynamic";

import { SiteFooter } from "@/components/site-footer";
import { FloatingNav } from "@/components/floating-nav";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Panel } from "@/features/portfolio/components/panel";

const ScrollToTop = dynamic(() =>
  import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full overflow-x-hidden px-2">{children}</main>
      
      {/* <SiteFooter /> */}
      <FloatingNav />
      <ScrollToTop />
    </>
  );
}
