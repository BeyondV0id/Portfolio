"use client";

import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

import type { Publication } from "../../types/publications";

export function ResearchPaperItem({ publication }: { publication: Publication }) {
  const hasDescription = Boolean(
    publication.description && publication.description.trim().length > 0,
  );
  const hasKeywords = (publication.keywords ?? []).length > 0;

  const header = (
    <div className="relative z-1 mb-1 flex items-center gap-3">
      <div
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-lg",
          "bg-muted text-muted-foreground",
          "border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background",
        )}
        aria-hidden
      >
        <BookOpen className="size-4" />
      </div>

      <h4 className="flex-1 font-medium text-balance leading-snug">
        {publication.url ? (
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
            onClick={(e) => e.stopPropagation()}
          >
            {publication.title}
          </a>
        ) : (
          publication.title
        )}
      </h4>

      {hasDescription && (
        <div
          className="shrink-0 text-muted-foreground [&_svg]:size-4"
          aria-hidden
        >
          <CollapsibleChevronsIcon />
        </div>
      )}
    </div>
  );

  const meta = (
    <div className="flex items-center gap-2 pl-9 text-sm text-muted-foreground">
      <span>{publication.publisher}</span>
      <span className="font-mono opacity-40">·</span>
      <span>{publication.year}</span>
    </div>
  );

  if (!hasDescription) {
    return (
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
        <div className="block w-full text-left select-none">
          {header}
          {meta}
          {hasKeywords && (
            <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
              {publication.keywords!.map((kw) => (
                <li key={kw} className="flex">
                  <Tag>{kw}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <CollapsibleWithContext defaultOpen={false} asChild>
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
        <CollapsibleTrigger
          className={cn(
            "block w-full text-left select-none",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg hover:before:bg-accent2",
          )}
        >
          {header}
          {meta}
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-fade-up data-[state=open]:animate-collapsible-fade-down">
          {publication.description && (
            <Prose className="pt-2 pl-9 text-sm text-muted-foreground/90 leading-relaxed">
              <Markdown>{publication.description}</Markdown>
            </Prose>
          )}
        </CollapsibleContent>

        {hasKeywords && (
          <ul className="flex flex-wrap gap-1.5 pt-2 pl-9">
            {publication.keywords!.map((kw) => (
              <li key={kw} className="flex">
                <Tag>{kw}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </CollapsibleWithContext>
  );
}
