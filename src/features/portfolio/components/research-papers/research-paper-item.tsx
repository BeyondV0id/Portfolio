"use client";

import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import { BookOpen, ExternalLink, FileText } from "lucide-react";

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
        {publication.title}
      </h4>

      {hasDescription && (
        <div className="shrink-0 text-muted-foreground [&_svg]:size-4" aria-hidden>
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
          <div className="mt-3 ml-9 rounded-lg border border-border/60 bg-muted/30 dark:bg-muted/20 overflow-hidden">

            {/* Abstract label bar */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border/40 bg-muted/50 dark:bg-muted/30">
              <FileText className="size-3.5 text-muted-foreground shrink-0" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                Abstract
              </span>
            </div>

            {/* Description */}
            {publication.description && (
              <p className="px-4 py-3 text-[13px] leading-relaxed text-muted-foreground/90">
                {publication.description}
              </p>
            )}

            {/* Keyword chips */}
            {hasKeywords && (
              <div className="px-4 pb-3 pt-2 flex flex-wrap gap-1.5 border-t border-border/30">
                {publication.keywords!.map((kw) => (
                  <Tag key={kw}>{kw}</Tag>
                ))}
              </div>
            )}

            {/* Read Paper link */}
            {publication.url && (
              <div className="px-4 py-2.5 border-t border-border/30">
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-foreground/60 hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Read Paper
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  );
}
