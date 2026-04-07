"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

import { getOrCreateVisitorId } from "@/lib/fingerprint";

function formatViews(count: number) {
  return new Intl.NumberFormat("en-US").format(count);
}

export function PageViews() {
  const [views, setViews] = useState<number | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchVisitors() {
      try {
        setIsError(false);
        const fingerprint = getOrCreateVisitorId();

        const response = await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fingerprint }),
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch visitor count");
        }

        const data = (await response.json()) as { totalVisits?: number };
        const nextViews = Number(data.totalVisits);

        if (!Number.isFinite(nextViews) || nextViews < 0) {
          throw new Error("Invalid visitor count");
        }

        if (!cancelled) {
          setViews(nextViews);
        }
      } catch {
        if (!cancelled) {
          setIsError(true);
          setViews(null);
        }
      }
    }

    fetchVisitors();

    return () => {
      cancelled = true;
    };
  }, []);

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
