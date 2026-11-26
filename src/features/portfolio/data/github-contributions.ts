import { z } from "zod";

import { GITHUB_USERNAME } from "@/features/portfolio/data";

const calendarSchema = z.object({
  contributions: z.array(
    z.object({
      date: z.string().date(),
      count: z.number().int().nonnegative(),
      level: z.union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
      ]),
    }),
  ),
});

const CONTRIBUTION_REPOS = [
  "BeyondV0id/ossurf",
  "BeyondV0id/ossurf-scraper",
  "BeyondV0id/Portfolio",
  "BeyondV0id/portfolio_V2",
  "BeyondV0id/Quorum",
  "BeyondV0id/drizzle-auth-api",
  "BeyondV0id/deseng",
  "BeyondV0id/Endless_flow",
  "BeyondV0id/redis-pubsub-notifcation-serivce",
  "OSSURF/oss-trends-scraper",
  "OSSURF/OSSurf_Frontend",
  "OSSURF/OSSurf_Backend",
];

const contributorSchema = z.array(
  z.object({
    total: z.number().int().nonnegative(),
    author: z.object({ login: z.string() }).nullable(),
  }),
);

async function getCalendar() {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(GITHUB_USERNAME)}?y=last`,
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(5000) },
    );

    if (!response.ok) return null;

    const result = calendarSchema.safeParse(await response.json());
    return result.success && result.data.contributions.length
      ? result.data.contributions
      : null;
  } catch {
    return null;
  }
}

async function getContributionCount(fullName: string) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${fullName}/stats/contributors`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            ...(process.env.GITHUB_API_TOKEN
              ? { Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}` }
              : {}),
          },
          next: { revalidate: 86400 },
          signal: AbortSignal.timeout(5000),
        },
      );

      // GitHub computes contributor stats asynchronously and returns 202 while it works.
      if (response.status === 202 && attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        continue;
      }
      if (!response.ok) return null;

      const result = contributorSchema.safeParse(await response.json());
      if (!result.success) return null;

      return (
        result.data.find(
          (contributor) =>
            contributor.author?.login.toLowerCase() ===
            GITHUB_USERNAME.toLowerCase(),
        )?.total ?? 0
      );
    } catch {
      return null;
    }
  }

  return null;
}

async function getTopContributions() {
  const counts = await Promise.all(
    CONTRIBUTION_REPOS.map(async (fullName) => ({
      fullName,
      count: await getContributionCount(fullName),
    })),
  );

  return counts
    .filter(
      (entry): entry is { fullName: string; count: number } =>
        entry.count !== null && entry.count > 0,
    )
    .sort(
      (a, b) =>
        b.count - a.count || a.fullName.localeCompare(b.fullName),
    )
    .slice(0, 3)
    .map(({ fullName, count }) => ({
      name: fullName.split("/")[1] ?? fullName,
      count,
      href: `https://github.com/${fullName}`,
    }));
}

export async function getGitHubContributions() {
  const [calendar, repos] = await Promise.all([
    getCalendar(),
    getTopContributions(),
  ]);
  return { calendar, repos };
}
