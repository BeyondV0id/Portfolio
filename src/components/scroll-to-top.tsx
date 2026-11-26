"use client";

import { ArrowUpIcon } from "@solar-icons/react/linear/arrow-up";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { spring } from "@/lib/fluid-functionalism/springs";
import { cn } from "@/lib/utils";

export function ScrollToTop({
  className,
  style,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setVisible(latestValue >= 400);

    const prev = scrollY.getPrevious() ?? 0;
    const diff = latestValue - prev;
    setScrollDirection(diff > 0 ? "down" : "up");
  });

  return (
    <FluidHoverGroup
      className={cn(
        "fixed right-4 bottom-[calc(var(--bottom,1rem)+env(safe-area-inset-bottom,0px))] z-50 lg:right-8 lg:[--bottom:2rem]",
        !visible && "pointer-events-none",
      )}
      highlightClassName="bg-accent"
    >
      <Button
        aria-hidden={!visible}
        data-visible={visible}
        tabIndex={visible ? 0 : -1}
        data-scroll-direction={scrollDirection}
        data-fluid-item
        className={cn(
          "bg-muted/60 transition-opacity motion-reduce:transition-none data-[scroll-direction=down]:not-data-[fluid-hover-active]:opacity-30 data-[visible=false]:opacity-0",
          className,
        )}
        style={{ transitionDuration: `${spring.moderate.duration}s`, ...style }}
        variant="fluid"
        size="icon-lg"
        onClick={() => window.scrollTo({ top: 0 })}
        {...props}
      >
        <ArrowUpIcon className="size-5" />
        <span className="sr-only">Scroll to top</span>
      </Button>
    </FluidHoverGroup>
  );
}
