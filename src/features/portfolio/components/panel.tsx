import { Slot as SlotPrimitive } from "radix-ui";
import React from "react";

const Slot = SlotPrimitive.Slot;

import { cn } from "@/lib/utils";

function Panel({
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  hideTopLine?: boolean;
  hideBottomLine?: boolean;
}) {
  const {
    hideTopLine: omittedHideTopLine,
    hideBottomLine: omittedHideBottomLine,
    ...sectionProps
  } = props;
  void omittedHideTopLine;
  void omittedHideBottomLine;

  return (
    <section
      data-slot="panel"
      className={cn("relative", className)}
      {...sectionProps}
    >
      {children}
    </section>
  );
}

function PanelHeader({ className, children, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="panel-header"
      className={cn("flex items-center justify-between py-3", className)}
      {...props}
    >
      {children}
    </header>
  );
}

function PanelTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"h2"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp
      data-slot="panel-title"
      className={cn("text-sm font-medium text-muted-foreground", className)}
      {...props}
    />
  );
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="panel-body" className={cn("", className)} {...props} />
  );
}

export { Panel, PanelContent, PanelHeader, PanelTitle };
