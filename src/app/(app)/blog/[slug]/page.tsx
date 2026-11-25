import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Markdown } from "@/components/markdown";
import { BLOG_POSTS, getBlogPostBySlug } from "@/features/blog/data/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(markdown: string) {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const title = line.replace(/^##\s+/, "").trim();
      return { id: slugifyHeading(title), title };
    });
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);

  return (
    <div className="pb-16">
      <div className="mb-8 flex flex-col gap-5">
        <Link
          href="/blog"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          <span>all posts</span>
        </Link>
      </div>

      <article className="text-foreground">
        <div className="max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
            {post.date} · {post.readingTime}
          </p>
          <h1 className="mt-3 text-2xl font-medium tracking-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-2 text-base leading-relaxed tracking-tight text-muted-foreground">
            {post.description}
          </p>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium tracking-tight text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-xl">
          {headings.length > 0 && (
            <section className="relative mt-12">
              <h2 className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground xl:absolute xl:top-[0.3rem] xl:right-full xl:mr-8 xl:mb-0 xl:w-32 xl:text-right">
                contents
              </h2>
              <ol className="flex flex-col gap-1.5">
                {headings.map((heading, idx) => (
                  <li
                    key={heading.id}
                    className="flex gap-3 text-sm tracking-tight"
                  >
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${heading.id}`}
                      className="text-foreground/75 transition-colors hover:text-foreground"
                    >
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <div
            aria-hidden="true"
            className="my-8 text-center font-mono tracking-[0.6em] text-muted-foreground/50"
          >
            · · ·
          </div>

          <div className="flex min-w-0 flex-col gap-5 text-[15px] leading-relaxed tracking-tight text-foreground/85 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_h2]:mt-8 [&_h2]:scroll-mt-24 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:leading-relaxed [&_strong]:font-medium [&_strong]:text-foreground">
            <Markdown
              components={{
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  return (
                    <h2 id={slugifyHeading(text)} {...props}>
                      {children}
                    </h2>
                  );
                },
              }}
            >
              {post.content}
            </Markdown>
          </div>
        </div>
      </article>
    </div>
  );
}
