import Link from "next/link";

import { PortfolioList } from "@/components/ui/portfolio-list";

import type { BlogPost } from "../types/blog";

export function BlogList({ posts }: { posts: readonly BlogPost[] }) {
  return (
    <PortfolioList>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            data-fluid-item
            className="flex flex-col gap-1 rounded-xl px-3 py-4 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-[15px] leading-snug font-medium text-foreground">
                {post.title}
              </span>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {post.date}
              </span>
            </span>
            <span className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {post.description}
            </span>
            <span className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-[var(--pill)] px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              <span className="ml-1">{post.readingTime}</span>
            </span>
          </Link>
        </li>
      ))}
    </PortfolioList>
  );
}
