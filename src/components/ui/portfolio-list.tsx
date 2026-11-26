import type { ReactNode } from "react";

import { FluidHoverGroup } from "./fluid-hover-group";

export function PortfolioList({ children }: { children: ReactNode }) {
  return (
    <FluidHoverGroup
      className="rounded-2xl bg-portfolio-panel p-1"
      highlightClassName="rounded-xl bg-foreground/6"
    >
      <ul className="flex flex-col">{children}</ul>
    </FluidHoverGroup>
  );
}
