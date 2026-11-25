import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";

import { BLOG_POSTS } from "../data/posts";

export function RecentBlogs() {
  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blogs" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-medium tracking-tight text-foreground">
          random 2am thoughts.
        </h2>
        <Link
          href="/blog"
          className={buttonVariants({ size: "sm", variant: "outline" })}
        >
          view all <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </div>

      <p className="text-[15px] font-normal leading-relaxed tracking-tight text-muted-foreground">
        notes on building things, breaking them, and what i learned putting them
        back together.
      </p>

      <FluidHoverGroup className="mt-2 -mx-2">
        <ul className="flex flex-col">
          {recentPosts.map((post) => (
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
                <span className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                  {post.readingTime} ·{" "}
                  <span className="text-foreground/75">read</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </FluidHoverGroup>
    </section>
  );
}
