import { ArrowRightIcon } from "@solar-icons/react/linear/arrow-right";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { cn } from "@/lib/utils";

export function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center",
        className,
      )}
    >
      <h1 className="mt-8 mb-6 font-mono text-8xl font-medium">404</h1>

      <FluidHoverGroup highlightClassName="bg-primary">
        <Button
          variant="fluid"
          className="bg-primary/90 text-primary-foreground data-[fluid-hover-active]:text-primary-foreground"
          asChild
        >
          <Link href="/" data-fluid-item>
            Go to Home
            <ArrowRightIcon />
          </Link>
        </Button>
      </FluidHoverGroup>
    </div>
  );
}
