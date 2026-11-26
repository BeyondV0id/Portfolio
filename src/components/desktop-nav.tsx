"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <FluidHoverGroup
      as="nav"
      axis="xy"
      nearest
      className="-ml-2 flex w-fit flex-wrap items-center gap-x-2 gap-y-1"
    >
      {items.map((item) => {
        const current = pathname === item.href;
        const active = current || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            data-fluid-item
            className={cn(
              "rounded-lg px-2 py-1 text-[18px] font-normal transition-[color,transform] duration-150 ease-[var(--ease-out)] motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-ring",
              active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {item.title.toLowerCase()}
          </Link>
        );
      })}
    </FluidHoverGroup>
  );
}
