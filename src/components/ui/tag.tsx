import React from "react";

import { cn } from "@/lib/utils";

function Tag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-muted/60 px-2 py-0.5 text-xs font-normal text-muted-foreground select-none",
        className,
      )}
      {...props}
    />
  );
}

export { Tag };
