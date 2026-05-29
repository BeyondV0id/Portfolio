import React from "react";

import { cn } from "@/lib/utils";

function Tag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[8px] border border-border bg-transparent px-2 py-0.5 text-xs font-medium text-muted-foreground transition-all duration-300 select-none hover:-translate-y-[2px] hover:scale-[1.03] hover:shadow-md hover:shadow-zinc-200/40 dark:hover:shadow-zinc-950/40 hover:border-foreground/65 hover:text-foreground/65 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
        className
      )}
      {...props}
    />
  );
}

export { Tag };
