"use client";

import {
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  useLayoutEffect,
  useRef,
} from "react";

import { FluidHoverHighlight } from "@/lib/fluid-functionalism/fluid-hover-highlight";
import { spring } from "@/lib/fluid-functionalism/springs";
import { useFluidHover } from "@/lib/fluid-functionalism/use-fluid-hover";
import { cn } from "@/lib/utils";

const HIGHLIGHT_TRANSITION = {
  ...spring.fast,
  width: { duration: 0 },
  height: { duration: 0 },
};

function withMousePointer(handler: (event: MouseEvent) => void) {
  return (event: PointerEvent) => {
    if (event.pointerType === "mouse") handler(event);
  };
}

export function FluidHoverGroup({
  children,
  className,
  highlightClassName,
  axis = "y",
  nearest = false,
  as: Container = "div",
}: {
  children: ReactNode;
  className?: string;
  highlightClassName?: string;
  axis?: "y" | "x" | "xy";
  nearest?: boolean;
  as?: "div" | "nav";
}) {
  const containerRef = useRef<HTMLElement>(null);
  const hover = useFluidHover(containerRef, { axis, nearest, gapClick: false });
  const { handlers, registerItem } = hover;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-fluid-item]"),
    ).filter((item) => item.closest("[data-fluid-group]") === container);

    items.forEach((item, index) => registerItem(index, item));
    return () => items.forEach((_, index) => registerItem(index, null));
  }, [children, registerItem]);

  return (
    <Container
      ref={(node) => {
        containerRef.current = node;
      }}
      data-fluid-group
      className={cn("relative isolate", className)}
      onPointerEnter={withMousePointer(handlers.onMouseEnter)}
      onPointerMove={withMousePointer(handlers.onMouseMove)}
      onPointerLeave={withMousePointer(handlers.onMouseLeave)}
    >
      <FluidHoverHighlight
        hover={hover}
        transition={HIGHLIGHT_TRANSITION}
        className={cn("-z-10 rounded-lg bg-hover", highlightClassName)}
      />
      {children}
    </Container>
  );
}
