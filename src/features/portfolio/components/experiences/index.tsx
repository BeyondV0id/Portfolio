import { CaseIcon as BriefcaseBusiness } from "@solar-icons/react/linear/case";
import { SquareAcademicCapIcon as GraduationCap } from "@solar-icons/react/linear/square-academic-cap";
import { format, isValid, parse } from "date-fns";
import Image from "next/image";

import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";
import { EXPERIENCES } from "@/features/portfolio/data";

import type { Experience, ExperiencePosition } from "../../types/experiences";
import { TimelineMotion } from "./timeline-motion";

const groups = [
  { id: "experience", title: "Experience", icon: BriefcaseBusiness },
  { id: "education", title: "Education", icon: GraduationCap },
];

export function Experiences() {
  return groups.map(({ id, title, icon: Icon }) => {
    const entries = EXPERIENCES.flatMap((experience) => {
      const positions = experience.positions?.filter(
        (position) => (position.icon === "education") === (id === "education"),
      );

      return positions?.length ||
        (id === "experience" && !experience.positions?.length)
        ? [{ ...experience, positions }]
        : [];
    });

    if (entries.length === 0) return null;

    return (
      <TimelineMotion key={id} id={id}>
        <h2
          data-timeline-reveal
          id={`${id}-title`}
          className="relative flex min-h-10 items-center pl-13 text-[18px] font-medium tracking-tight"
        >
          <span className="absolute left-0 grid size-10 place-items-center rounded-full bg-background">
            <span className="grid size-8 place-items-center rounded-full border border-link/65 text-link">
              <Icon aria-hidden className="size-4" />
            </span>
          </span>
          {title}
        </h2>
        <ul className="flex flex-col gap-8 pt-4">
          {entries.map((experience) => (
            <TimelineEntry key={experience.id} experience={experience} />
          ))}
        </ul>
      </TimelineMotion>
    );
  });
}

function TimelineEntry({ experience }: { experience: Experience }) {
  return (
    <li data-timeline-reveal className="relative min-w-0 pl-13">
      <span
        aria-hidden
        className="absolute top-1 left-5 grid size-4 -translate-x-1/2 place-items-center rounded-full border border-link bg-background ring-2 ring-background before:size-2 before:rounded-full before:bg-link"
      />

      <h3 className="flex items-start gap-2 text-base leading-snug font-medium tracking-tight">
        {experience.companyLogo && (
          <Image
            src={experience.companyLogo}
            alt=""
            width={20}
            height={20}
            className="size-5 shrink-0 rounded-sm object-contain"
            unoptimized
          />
        )}
        {experience.companyName}
        {experience.isCurrentEmployer && (
          <span className="sr-only">Current employer</span>
        )}
      </h3>

      <div className="mt-2.5 space-y-4">
        {experience.positions?.map((position) => (
          <TimelinePosition key={position.id} position={position} />
        ))}
      </div>
    </li>
  );
}

function TimelinePosition({ position }: { position: ExperiencePosition }) {
  const description = position.description?.trim();
  const period = position.employmentPeriod;
  const skills = position.skills ?? [];
  const previewHeight =
    position.summary && position.icon !== "education" ? 16 : 0;

  return (
    <div className="space-y-2 pt-1">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <h4 className="text-base font-normal leading-snug">{position.title}</h4>
        {period && (
          <p className="shrink-0 text-xs tabular-nums sm:text-sm">
            {formatDate(period.start)} –{" "}
            {period.end ? formatDate(period.end) : "Present"}
          </p>
        )}
      </div>
      {position.summary && (
        <Prose className="text-sm leading-relaxed text-muted-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          <Markdown>{position.summary}</Markdown>
        </Prose>
      )}
      {description && (
        <CollapsibleWithContext defaultOpen={position.isExpanded}>
          <CollapsibleContent previewHeight={previewHeight}>
            <Prose className="mb-1.5 text-sm leading-relaxed text-muted-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0">
              <Markdown>{description}</Markdown>
            </Prose>
          </CollapsibleContent>
          <FluidHoverGroup className="w-fit" highlightClassName="rounded-md">
            <CollapsibleTrigger
              data-fluid-item
              className="group inline-flex min-h-6 items-center gap-1 rounded-md px-1.5 text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring data-[fluid-hover-active]:text-foreground"
            >
              <span className="group-data-[state=open]:hidden">Read more</span>
              <span className="hidden group-data-[state=open]:inline">
                Show less
              </span>
              <span className="sr-only"> for {position.title}</span>
              <CollapsibleChevronsIcon />
            </CollapsibleTrigger>
          </FluidHoverGroup>
        </CollapsibleWithContext>
      )}
      {skills.length > 0 && (
        <ul aria-label="Technologies" className="flex flex-wrap gap-1.5 pt-1">
          {skills.map((skill) => (
            <li key={skill}>
              <Tag className="rounded-full px-2.5 text-foreground">{skill}</Tag>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatDate(value: string) {
  if (!value.includes(".")) return value;

  const date = parse(value, "MM.yyyy", new Date(2000, 0));
  return isValid(date) ? format(date, "MMM yyyy") : value;
}
