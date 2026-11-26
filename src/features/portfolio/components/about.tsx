import { UserCircleIcon } from "@solar-icons/react/linear/user-circle";

import { Markdown } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";
import { USER } from "@/features/portfolio/data";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <div className="flex items-center gap-2.5">
          <UserCircleIcon
            aria-hidden
            className="size-4 shrink-0 text-muted-foreground"
          />
          <PanelTitle className="text-[19px]/[23px] font-normal text-foreground">
            About
          </PanelTitle>
        </div>
      </PanelHeader>

      <PanelContent>
        <Prose className="text-sm/relaxed [--tw-prose-body:var(--muted-foreground)] dark:[--tw-prose-invert-body:var(--muted-foreground)]">
          <Markdown>{USER.about}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
