import type { getGitHubContributions } from "@/features/portfolio/data/github-contributions";

import { GitHubActivity } from "./github-activity";

const GITHUB_ACTIVITY_COLORS = [
  "var(--color-emerald-700)",
  "var(--color-emerald-600)",
  "var(--color-emerald-500)",
  "var(--color-emerald-400)",
];

export async function GitHubContributionGraph({
  contributions,
}: {
  contributions: ReturnType<typeof getGitHubContributions>;
}) {
  const { calendar, repos } = await contributions;

  return (
    <>
      {calendar ? (
        <GitHubActivity
          contributions={calendar}
          repos={repos}
          accent={GITHUB_ACTIVITY_COLORS}
          showMonths
        />
      ) : (
        <p className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          GitHub activity is temporarily unavailable.
        </p>
      )}
    </>
  );
}

export function GitHubContributionFallback() {
  return (
    <div
      role="status"
      className="flex min-h-52 items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground"
    >
      Loading GitHub activity…
    </div>
  );
}
