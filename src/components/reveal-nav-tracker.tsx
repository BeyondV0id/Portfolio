"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function RevealNavTracker() {
  const pathname = usePathname();
  const initialPathname = useRef(pathname);

  useIsoLayoutEffect(() => {
    if (pathname !== initialPathname.current) {
      document.documentElement.dataset.revealSettled = "true";
    }
  }, [pathname]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.documentElement.dataset.revealSettled = "true";
    }, 750);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
