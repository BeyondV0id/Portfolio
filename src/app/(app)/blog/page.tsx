import type { Metadata } from "next";
import Link from "next/link";

import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { BLOG_POSTS } from "@/features/blog/data/posts";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Notes on building things, breaking them, and what I learned putting them back together.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col px-4 pt-6 pb-16">
      <h1 className="text-[18px] font-medium tracking-tight text-foreground">
        blogs.
      </h1>
      <p className="mt-2 text-base leading-tight font-normal tracking-tight text-muted-foreground">
        notes on building things, breaking them, and what i learned putting them
        back together.
      </p>

      <FluidHoverGroup className="mt-6 -mx-2">
        <ul className="reveal-product-subtle flex flex-col">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                data-fluid-item
                className="flex w-full flex-col gap-1 rounded-lg px-2 py-3 text-left focus-visible:outline-2 focus-visible:outline-ring"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-base font-medium tracking-tight text-foreground">
                    {post.title}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] tracking-tight text-muted-foreground tabular-nums">
                    {post.date}
                  </span>
                </span>

                <span className="line-clamp-2 text-sm leading-relaxed tracking-tight text-muted-foreground">
                  {post.description}
                </span>

                <span className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                  {post.readingTime} ·{" "}
                  <span className="text-foreground/75">read</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </FluidHoverGroup>
    </div>
  );
}
