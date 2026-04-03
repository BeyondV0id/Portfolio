import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { EXPERIENCES } from "@/features/portfolio/data";

import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ExperienceItem } from "./experience-item";

export function Experiences() {
  return (
    <Panel id="education">
      <PanelHeader className="flex items-center justify-between">
        <PanelTitle>Education</PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Panel>
  );
}
