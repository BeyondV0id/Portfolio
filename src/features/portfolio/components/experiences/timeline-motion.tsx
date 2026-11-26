"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";

export function TimelineMotion({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start 90%", "end 90%"],
    trackContentSize: true,
  });
  const rail = useTransform(scrollYProgress, (value) => `scaleY(${value})`);
  const marker = useTransform(
    scrollYProgress,
    (value) => `translateY(${value * 100}%)`,
  );

  return (
    <section
      ref={section}
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative scroll-mt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-5 left-5 w-0.5 -translate-x-1/2"
      >
        <div className="absolute inset-0 border-l-2 border-dashed border-border motion-reduce:border-solid motion-reduce:border-link/50" />
        <motion.div
          data-timeline-progress
          className="absolute inset-0 origin-top bg-link motion-reduce:hidden"
          style={{ transform: rail }}
        />
        <motion.div
          className="absolute inset-0 motion-reduce:hidden"
          style={{ transform: marker }}
        >
          <span className="absolute top-0 left-1/2 size-2 -translate-1/2 rounded-full bg-link" />
        </motion.div>
      </div>
      {children}
    </section>
  );
}
