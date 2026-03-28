import { Suspense, useMemo } from "react";
import Image from "next/image";
import { MailIcon } from "lucide-react";

import { Container } from "@/components/container";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { USER, SOCIAL_LINKS } from "@/features/portfolio/data";
import { getGitHubContributions } from "@/features/portfolio/data/github-contributions";
import { Panel } from "./panel";
import {
  GitHubContributionFallback,
  GitHubContributionGraph,
} from "./github-contributions/graph";

import { ThemeToggle } from "@/components/theme-toggle";
import { LinkIcon } from "lucide-react";

import { FlickeringGrid } from "@/components/ui/flickering-grid";

function getSocialIcon(title: string) {
  const t = title.toLowerCase();
  if (t === "github")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    );
  if (t === "linkedin")
    return (
      <svg viewBox="0 0 448 512" fill="currentColor" className="size-3.5">
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
      </svg>
    );
  if (t === "leetcode")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.956-.207a1.378 1.378 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382H10.617z" />
      </svg>
    );
  if (t === "medium")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.11-.53 5.62-1.18 5.62-.66 0-1.18-2.51-1.18-5.62s.52-5.62 1.18-5.62c.65 0 1.18 2.51 1.18 5.62z" />
      </svg>
    );
  if (t === "twitter" || t === "x" || t === "x (formerly twitter)" || t === "x (twitter)")
    return (
      <>
        <Image 
          src="/icons/X (formerly Twitter)_light.svg" 
          alt="X" 
          width={14} 
          height={14} 
          className="size-3.5 dark:hidden" 
        />
        <Image 
          src="/icons/X (formerly Twitter)_dark.svg" 
          alt="X" 
          width={14} 
          height={14} 
          className="size-3.5 hidden dark:block" 
        />
      </>
    );
  if (t === "daily.dev")
    return (
      <>
        <Image 
          src="/icons/daily.dev_light.svg" 
          alt="daily.dev" 
          width={14} 
          height={14} 
          className="size-3.5 dark:hidden" 
        />
        <Image 
          src="/icons/daily.dev_dark.svg" 
          alt="daily.dev" 
          width={14} 
          height={14} 
          className="size-3.5 hidden dark:block" 
        />
      </>
    );

  return <LinkIcon className="size-3.5" />;
}

export function Hero() {
  const contributions = getGitHubContributions();

  return (
    <Panel className="flex flex-col">
      {/* Flickering Grid Cover */}
      <div className="relative h-[250px] w-full p-4">
        <div className="relative size-full overflow-hidden  bg-background/50">
          <FlickeringGrid
            className="absolute inset-0 z-0 size-full"
            squareSize={4}
            gridGap={4}
            color="#6B7280"
            maxOpacity={0.4}
            flickerChance={0.05}
          />
        </div>
      </div>

      {/* Header section wrapped in Panel */}
      <Panel className="flex w-full rounded-none border-x-0 border-t-0 bg-transparent px-6 py-6 shadow-none">
        {/* Avatar — switches between dark and light mode versions */}
        <div className="relative mr-5 size-20 shrink-0 sm:size-24">
          {/* Dark mode avatar */}
          <Image
            src={USER.avatar}
            alt={`${USER.displayName}'s avatar`}
            className="rounded-xl object-cover ring-1 ring-border hidden dark:block"
            fill
            unoptimized
          />
          {/* Light mode avatar */}
          <Image
            src="/images/avatar-light.png"
            alt={`${USER.displayName}'s avatar`}
            className="rounded-xl object-cover ring-1 ring-border block dark:hidden"
            fill
            unoptimized
          />
        </div>

        <div className="flex flex-1 flex-col justify-end py-0.5">
          {/* Bottom row: name and title */}
          <Container delay={0.1}>
            <div>
              <h1 
                className="font-normal tracking-tight text-foreground sm:text-4xl text-3xl text-zinc-950 dark:text-foreground" 
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {USER.displayName}
              </h1>
              <p className="mt-1 text-sm tracking-tight text-zinc-600 dark:text-muted-foreground">
                {USER.jobTitle}
              </p>
            </div>
          </Container>
        </div>

        {/* Right column: Theme Toggle & Views */}
        <div className="flex flex-col items-end justify-between py-0.5">
          <ThemeToggle />
        </div>
      </Panel>

      {/* About Section */}
      <Container delay={0.2}>
        <div className="px-6 pt-6 pb-2 font-sans text-sm leading-relaxed text-muted-foreground [&>p]:mb-4">
          <Markdown>{USER.about}</Markdown>
        </div>
      </Container>

      {/* Buttons */}
      <Container delay={0.3}>
        <div className="flex flex-wrap items-center gap-3 px-6 pt-2 pb-6">
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-lg border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            asChild
          >
            <a
              href={
                USER.email
                  ? `mailto:${Buffer.from(USER.email, "base64").toString("utf8")}`
                  : "#"
              }
            >
              <MailIcon className="mr-2 size-4" /> Send an email
            </a>
          </Button>
        </div>
      </Container>

      {/* Social Links */}
      <Container delay={0.4}>
        <div className="px-6 pt-2 pb-2">
          <p className="mb-4 font-mono text-sm text-foreground">
            Here are my <span className="font-bold">socials</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {getSocialIcon(link.title)}
                {link.title === "X (Formerly Twitter)" ? "Twitter" : link.title}
              </a>
            ))}
          </div>
        </div>
      </Container>

      {/* Github Contributions */}
      <div className="w-full px-6 pb-6">
        <Suspense fallback={<GitHubContributionFallback />}>
          <GitHubContributionGraph contributions={contributions} />
        </Suspense>
      </div>
    </Panel>
  );
}
