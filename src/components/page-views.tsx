"use client";

import { Eye } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function formatViews(count: number) {
  return new Intl.NumberFormat("en-US").format(count);
}

function getNamespace() {
  if (typeof window === "undefined") return "local-dev";
  return window.location.hostname.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
}

export function PageViews() {
  const pathname = usePathname();
  const [views, setViews] = useState<number | null>(null);
  const [isError, setIsError] = useState(false);

  const key = useMemo(() => {
    if (!pathname) return "home";
    const normalized = pathname === "/" ? "home" : pathname.replace(/\//g, "-");
    return `page-${normalized}`;
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;

    async function hitViewCounter() {
      try {
        setIsError(false);
        const namespace = getNamespace();
        const response = await fetch(
          `https://api.countapi.xyz/hit/${namespace}/${key}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) throw new Error("Failed to fetch views");
        const data = (await response.json()) as { value?: number };

        if (isMounted) {
          setViews(typeof data.value === "number" ? data.value : null);
        }
      } catch {
        if (isMounted) {
          setIsError(true);
          setViews(null);
        }
      }
    }

    hitViewCounter();

    return () => {
      isMounted = false;
    };
  }, [key]);

  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] leading-none text-muted-foreground">
      <Eye className="size-3.5 opacity-80" aria-hidden="true" />
      <span
        className="font-medium tracking-wide text-muted-foreground"
        aria-label="Page views"
      >
        {isError ? "--" : views === null ? "..." : formatViews(views)}
      </span>
    </div>
  );
}
