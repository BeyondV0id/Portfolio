import type { BlogPost } from "../types/blog";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "queues-and-workers-with-bullmq-and-redis",
    title: "Designing Reliable Background Queues with BullMQ and Redis",
    description:
      "Lessons from building SourceSurf's scraping and webhook ingestion pipeline — retries, backoff, rate limits, and keeping PostgreSQL from choking under burst load.",
    date: "14 Oct 2026",
    readingTime: "6 min read",
    tags: ["Backend", "Redis", "BullMQ", "Architecture"],
    content: `When you first build an API endpoint that scrapes or enriches external data, running it synchronously inside the request handler feels fine for ten users. At a hundred concurrent requests, timeouts and rate limits show up fast.

Moving that work into a queue changes how you think about failure. Nothing is instant anymore, and everything has to survive restarts.

## Separating Ingestion from Processing

Your HTTP layer should do the absolute minimum work required to validate a payload and enqueue a job. Returning \`202 Accepted\` with a job identifier lets the client move on while workers handle slow external I/O.

In SourceSurf, GitHub metadata syncs and webhook events go straight into dedicated Redis-backed queues. Each queue isolates one class of work so a spike in repository scraping never delays user-facing notifications.

## Retries, Backoff, and Idempotency

External APIs fail in predictable ways: transient 502s, rate-limit headers, and socket resets. Configuring exponential backoff in BullMQ prevents workers from hammering a struggling upstream service.

Just as important is making every job idempotent. If a worker crashes halfway through writing a batch of records and BullMQ retries the job, using deterministic keys and \`ON CONFLICT\` upserts in PostgreSQL ensures you never create duplicate rows.

## Guarding the Database Pool

A fleet of eager workers can easily exhaust database connections long before CPU becomes a bottleneck. Keep worker concurrency bounded relative to your PostgreSQL connection pool size, and batch metadata writes instead of firing one query per item.`,
  },
  {
    slug: "end-to-end-typesafety-in-fullstack-typescript",
    title: "End-to-End Type Safety Between Next.js and Express",
    description:
      "How sharing contracts, Zod schemas, and strict TypeScript boundaries eliminates entire classes of integration bugs without overengineering your stack.",
    date: "22 Aug 2026",
    readingTime: "5 min read",
    tags: ["TypeScript", "Next.js", "Express", "Full-Stack"],
    content: `Most full-stack bugs do not happen inside complex algorithms. They happen at the boundary where the backend renames a field and the frontend keeps reading the old property name until runtime.

You do not need a heavy code-generation pipeline to prevent that. Shared runtime schemas and strict TypeScript types get you most of the value with almost zero ceremony.

## Validate at the Edge with Zod

Types disappear at runtime. Every request body, query parameter, and environment variable entering an Express service should pass through a Zod schema first.

From that single schema, you derive the TypeScript type via \`z.infer<typeof Schema>\` and export it to your frontend client. Both sides agree on exact field shapes and optionality by construction.

## Modeling Nested Domain Data

While building Quorum, threaded discussions meant responses carried recursive comment trees, vote counts, and author metadata. Defining explicit response DTO types prevented UI components from relying on accidental database columns.

Keeping transport types separate from raw database row types also gives you room to evolve SQL tables without breaking every page component at once.`,
  },
  {
    slug: "postgresql-patterns-that-matter-in-production",
    title: "PostgreSQL Indexing and Query Patterns That Actually Matter",
    description:
      "A practical look at composite indexes, N+1 elimination, and keeping latency predictable as tables grow past the first hundred thousand rows.",
    date: "03 Jun 2026",
    readingTime: "7 min read",
    tags: ["PostgreSQL", "Databases", "Performance"],
    content: `During local development with fifty seed rows, almost every query completes in under two milliseconds. Production datasets are less forgiving.

Learning how to read \`EXPLAIN (ANALYZE, BUFFERS)\` output early saves hours of guessing once real traffic arrives.

## Index for Your Real Filter + Sort Order

Single-column indexes look neat in migrations, but queries almost always filter on one column and sort by another. A composite index matching \`WHERE status = ? ORDER BY created_at DESC\` lets PostgreSQL walk the index directly without an extra sort step.

Pay attention to column order in composite indexes: put equality predicates first and range or sort columns afterward.

## Avoiding Accidental N+1 Queries

ORM abstractions make it easy to fetch a list of items and then lazily look up related counts in a loop. Replacing those loops with a single \`LEFT JOIN\` or \`GROUP BY\` aggregation cuts round-trip overhead dramatically.

Measure query counts per request in development so regressions show up before they hit staging.`,
  },
  {
    slug: "minimal-interfaces-and-sweating-the-details",
    title: "Why Quiet Interfaces Outlast Flashy Redesigns",
    description:
      "Notes on typography, spacing, removing decorative chrome, and letting hierarchy do the work.",
    date: "19 Apr 2026",
    readingTime: "4 min read",
    tags: ["Design", "Frontend", "UI"],
    content: `It is tempting to fill every empty pixel with borders, dashed dividers, glowing badges, and entrance animations. Usually, those additions compensate for weak spacing and unclear hierarchy.

When you strip away the extra lines and cards, every decision about font size, contrast, and vertical rhythm becomes visible.

## Typography Carries Structure

Consistent type scale and restrained contrast do more for scannability than boxes around every section. Pairing clear headings with generous whitespace tells the reader where sections start and end without drawing a rule between them.

## Motion Should Earn Its Keep

Subtle hover transitions feel responsive; slow blur entrances on every paragraph just delay reading. Keep the page fast, readable, and calm so the actual work takes center stage.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
