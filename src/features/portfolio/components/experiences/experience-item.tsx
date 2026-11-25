import Image from "next/image";

import type { Experience } from "../../types/experiences";
import { ExperiencePositionItem } from "./experience-position-item";

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <article className="space-y-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center select-none">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.companyName ?? ""}
              width={24}
              height={24}
              quality={100}
              className="rounded-full"
              unoptimized
              aria-hidden
            />
          ) : (
            <span className="flex size-2 rounded-full bg-muted-foreground/40" />
          )}
        </div>

        <h3 className="text-base leading-snug font-medium text-foreground">
          {experience.companyName}
        </h3>

        {experience.isCurrentEmployer && (
          <span className="relative flex items-center justify-center">
            <span className="relative inline-flex size-2 rounded-full bg-info" />
            <span className="sr-only">Current</span>
          </span>
        )}
      </div>

      <div className="space-y-4">
        {experience.positions?.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </article>
  );
}
