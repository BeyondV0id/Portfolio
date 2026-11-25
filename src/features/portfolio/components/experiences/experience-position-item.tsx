import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";

import type { ExperiencePosition } from "../../types/experiences";
import { ExperienceIcon } from "./experience-position-icon";

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition;
}) {
  const { start, end } = position.employmentPeriod ?? {};
  const period = end && end !== start ? `${start} – ${end}` : start;
  const description = position.description?.trim();
  const skills = position.skills ?? [];

  const heading = (
    <>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <ExperienceIcon className="size-4" icon={position.icon} />
      </span>
      <span className="flex-1 text-sm font-medium">{position.title}</span>
    </>
  );

  const metadata = (
    <>
      {(position.employmentType || period) && (
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 pl-9 text-sm text-muted-foreground">
          {position.employmentType && <span>{position.employmentType}</span>}
          {period && <span>{period}</span>}
        </div>
      )}
      {skills.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 pt-2 pl-9">
          {skills.map((skill) => (
            <li key={skill}>
              <Tag>{skill}</Tag>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  if (!description) {
    return (
      <div>
        <h4 className="flex items-center gap-2 px-2">{heading}</h4>
        {metadata}
      </div>
    );
  }

  return (
    <CollapsibleWithContext defaultOpen={position.isExpanded}>
      <h4>
        <CollapsibleTrigger
          data-fluid-item
          className="relative z-10 flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left focus-visible:outline-2 focus-visible:outline-ring"
        >
          {heading}
          <span aria-hidden className="text-muted-foreground [&_svg]:size-4">
            <CollapsibleChevronsIcon />
          </span>
        </CollapsibleTrigger>
      </h4>
      {metadata}
      <CollapsibleContent>
        <Prose className="pt-2 pl-9 text-sm leading-relaxed text-muted-foreground">
          <Markdown>{description}</Markdown>
        </Prose>
      </CollapsibleContent>
    </CollapsibleWithContext>
  );
}
