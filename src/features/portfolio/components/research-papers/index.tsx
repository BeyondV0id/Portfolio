import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { PUBLICATIONS } from "@/features/portfolio/data";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ResearchPaperItem } from "./research-paper-item";

export function ResearchPapers() {
  if (!PUBLICATIONS || PUBLICATIONS.length === 0) return null;

  return (
    <Panel id="research">
      <PanelHeader className="flex items-center justify-between">
        <PanelTitle>Research Papers</PanelTitle>
        <Link
          href="/research"
          className="group mr-2 inline-flex items-center gap-1 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
        >
          View More <ArrowUpRightIcon className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {PUBLICATIONS.map((pub, index) => (
          <div key={index} className="screen-line-after space-y-2 py-4">
            <ResearchPaperItem publication={pub} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
