import { differenceInMonths, isValid, parse } from "date-fns";
import Image from "next/image";

import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Prose } from "@/components/ui/typography";

import type { Experience, ExperiencePosition } from "../../types/experiences";
import { ExperienceIcon } from "./experience-position-icon";

// Adapted from https://chanhdai.com/components/work-experience-component.
// See LICENSE.chanhdai for the original license and copyright notice.
export function WorkExperience({
  experiences,
}: {
  experiences: readonly Experience[];
}) {
  return (
    <div className="divide-y divide-border">
      {experiences.map((experience) => (
        <article key={experience.id} className="space-y-3.5 px-3 py-4 sm:px-4">
          <div className="flex items-start gap-2.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
              {experience.companyLogo ? (
                <Image
                  src={experience.companyLogo}
                  alt=""
                  width={24}
                  height={24}
                  className="rounded-full"
                  unoptimized
                />
              ) : (
                <span aria-hidden>{experience.companyName?.charAt(0)}</span>
              )}
            </span>
            <h3 className="flex-1 text-base leading-snug font-semibold">
              {experience.companyName}
            </h3>
            {experience.isCurrentEmployer && (
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-info">
                <span className="sr-only">Current employer</span>
              </span>
            )}
          </div>

          {experience.positions?.map((position) => (
            <WorkExperiencePosition key={position.id} position={position} />
          ))}
        </article>
      ))}
    </div>
  );
}

function WorkExperiencePosition({
  position,
}: {
  position: ExperiencePosition;
}) {
  const description = position.description?.trim();
  const { start, end } = position.employmentPeriod ?? {};
  const duration = start ? formatDuration(start, end) : null;
  const titleClassName =
    "w-full text-left text-sm font-medium text-foreground";

  return (
    <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2.5">
      <div aria-hidden className="flex flex-col items-center pb-1">
        <span className="grid size-6 place-items-center rounded-sm border border-border bg-background text-muted-foreground">
          <ExperienceIcon icon={position.icon} className="size-3.5" />
        </span>
        <span className="w-px flex-1 bg-border" />
      </div>

      <CollapsibleWithContext defaultOpen={position.isExpanded}>
        <div className="rounded-md bg-muted/60">
          <h4>
            {description ? (
              <CollapsibleTrigger
                className={`${titleClassName} flex min-h-8 items-center justify-between gap-2 rounded-t-md px-2.5 pt-1.5 focus-visible:outline-2 focus-visible:outline-ring`}
              >
                <span>{position.title}</span>
                <span className="shrink-0 text-muted-foreground">
                  <CollapsibleChevronsIcon />
                </span>
              </CollapsibleTrigger>
            ) : (
              <span className={`${titleClassName} block px-2.5 pt-2`}>
                {position.title}
              </span>
            )}
          </h4>
          {(position.employmentType || start) && (
            <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 px-2.5 pt-0.5 pb-2 text-xs text-muted-foreground">
              {position.employmentType && (
                <div>
                  <dt className="sr-only">Employment type</dt>
                  <dd>{position.employmentType}</dd>
                </div>
              )}
              {start && (
                <div
                  className={
                    position.employmentType
                      ? "border-l border-border pl-2"
                      : undefined
                  }
                >
                  <dt className="sr-only">Employment period</dt>
                  <dd className="tabular-nums">
                    {start}–{end ?? "Present"}
                  </dd>
                </div>
              )}
              {duration && (
                <div className="border-l border-border pl-2">
                  <dt className="sr-only">Duration</dt>
                  <dd className="tabular-nums">{duration}</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        {description && (
          <CollapsibleContent>
            <Prose className="px-2.5 pt-2 text-sm leading-relaxed text-muted-foreground">
              <Markdown>{description}</Markdown>
            </Prose>
          </CollapsibleContent>
        )}

        {!!position.skills?.length && (
          <ul aria-label="Technologies" className="flex flex-wrap gap-1.5 pt-2">
            {position.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-sm border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
      </CollapsibleWithContext>
    </div>
  );
}

function formatDuration(start: string, end?: string) {
  const reference = new Date();
  const startDate = parse(
    start,
    start.includes(".") ? "MM.yyyy" : "yyyy",
    reference,
  );
  const endDate = end
    ? parse(end, end.includes(".") ? "MM.yyyy" : "yyyy", reference)
    : reference;
  if (!isValid(startDate) || !isValid(endDate) || endDate < startDate)
    return null;

  const endMonthOffset =
    end && !end.includes(".") && start.includes(".") ? 11 : 0;
  const inclusiveMonth = start.includes(".") || !end || end.includes(".");
  const totalMonths =
    differenceInMonths(endDate, startDate) +
    endMonthOffset +
    Number(inclusiveMonth);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return [years ? `${years}y` : "", months ? `${months}m` : ""]
    .filter(Boolean)
    .join(" ");
}
