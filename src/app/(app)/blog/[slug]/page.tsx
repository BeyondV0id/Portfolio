import { ArrowLeftIcon as ArrowLeft } from "@solar-icons/react/linear/arrow-left";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Markdown } from "@/components/markdown";
import { RailToc } from "@/components/ui/rail-toc";
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
      return { id: slugifyHeading(title), label: title };
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
    <div className="reveal-stagger reveal-page-sub pb-16">
      <Link href="/blog" className="quiet-link mb-8">
        <ArrowLeft aria-hidden className="size-3.5" />
        All posts
      </Link>

      <article className="relative w-full min-w-0 max-w-xl wrap-anywhere text-foreground">
        <div>
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
                  className="rounded-full bg-portfolio-tag px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          {headings.length > 0 && (
            <aside className="mt-10 xl:absolute xl:inset-y-0 xl:right-full xl:mt-0 xl:mr-8 xl:w-56">
              <RailToc
                items={headings}
                className="max-w-full xl:sticky xl:top-24 xl:max-h-[calc(100dvh-7rem)] xl:w-full xl:overflow-y-auto xl:px-1"
              />
            </aside>
          )}

          <div className="mt-8 flex min-w-0 flex-col gap-5 text-[15px] leading-relaxed tracking-tight text-foreground/85 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_h2]:mt-8 [&_h2]:scroll-mt-24 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:leading-relaxed [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_strong]:font-medium [&_strong]:text-foreground">
            <Markdown
              components={{
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  return (
                    <h2 id={slugifyHeading(text)} tabIndex={-1} {...props}>
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
