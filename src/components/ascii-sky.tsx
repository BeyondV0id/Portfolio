"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import type { MountedSky } from "@/lib/ascii-sky";

import styles from "./ascii-sky.module.css";

export function HomeSky() {
  return usePathname() === "/" ? <AsciiSky placement="hero" /> : null;
}

export function AsciiSky({ placement }: { placement: "hero" | "footer" }) {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skyRef = useRef<MountedSky>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;

    async function start(element: HTMLCanvasElement) {
      try {
        const { mountSky } = await import("@/lib/ascii-sky");
        if (disposed) return;

        const sky = mountSky(element, {
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
        });
        skyRef.current = sky;
        await sky.ready;
        if (!disposed) setReady(true);
      } catch {
        // The still image remains visible if the canvas renderer can't start.
        if (!disposed) skyRef.current?.stop();
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void start(canvas);
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(canvas);

    return () => {
      disposed = true;
      observer.disconnect();
      skyRef.current?.stop();
      skyRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      skyRef.current?.setTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  return (
    <div aria-hidden="true" className={styles[placement]}>
      <div className={styles.sky} data-ready={ready}>
        <div className={styles.still} />
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
}
