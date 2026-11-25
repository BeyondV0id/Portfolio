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

const publicEventsSchema = z.array(
  z.object({
    type: z.string(),
    repo: z.object({ name: z.string().regex(/^[\w.-]+\/[\w.-]+$/) }),
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

async function getRecentRepositories() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/events/public?per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) return [];

    const result = publicEventsSchema.safeParse(await response.json());
    if (!result.success) return [];

    const pushes = new Map<string, number>();
    for (const event of result.data) {
      if (event.type !== "PushEvent") continue;
      const name = event.repo.name;
      pushes.set(name, (pushes.get(name) ?? 0) + 1);
    }

    return [...pushes]
      .sort(
        ([firstName, firstCount], [secondName, secondCount]) =>
          secondCount - firstCount || firstName.localeCompare(secondName),
      )
      .slice(0, 3)
      .map(([name, count]) => ({
        name,
        count,
        href: `https://github.com/${name}`,
      }));
  } catch {
    return [];
  }
}

export async function getGitHubContributions() {
  const [calendar, repos] = await Promise.all([
    getCalendar(),
    getRecentRepositories(),
  ]);
  return { calendar, repos };
}
