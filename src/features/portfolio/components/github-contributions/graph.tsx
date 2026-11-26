import { GITHUB_USERNAME } from "@/features/portfolio/data";
import type { getGitHubContributions } from "@/features/portfolio/data/github-contributions";

import { GitHubActivity } from "./github-activity";

const GITHUB_ACTIVITY_COLORS = [
  "var(--contribution-1)",
  "var(--contribution-2)",
  "var(--contribution-3)",
  "var(--contribution-4)",
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
          username={GITHUB_USERNAME}
          contributions={calendar}
          repos={repos}
          accent={GITHUB_ACTIVITY_COLORS}
          showMonths
        />
      ) : (
        <p className="rounded-2xl bg-portfolio-panel p-4 text-sm text-muted-foreground">
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
      className="flex min-h-52 items-center justify-center rounded-2xl bg-portfolio-panel text-sm text-muted-foreground"
    >
      Loading GitHub activity…
    </div>
  );
}
