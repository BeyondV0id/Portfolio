import dayjs from "dayjs";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { Experiences } from "@/features/portfolio/components/experiences";
import { ResearchPapers } from "@/features/portfolio/components/research-papers";
import { Container } from "@/components/container";
import { Hero } from "@/features/portfolio/components/hero";
import { Projects } from "@/features/portfolio/components/projects";
import { TeckStack } from "@/features/portfolio/components/teck-stack";
import { USER } from "@/features/portfolio/data";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <Hero />
        <Separator />

        <Container delay={0.5}>
          <Projects />
        </Container>
        <Separator />

        <Container delay={0.6}>
          <TeckStack />
        </Container>
        <Separator />

        <Container delay={0.7}>
          <Experiences />
        </Container>
        <Separator />

        <Container delay={0.8}>
          <ResearchPapers />
        </Container>
        <Separator />

        {/* <Blog />
        <Separator /> */}
      </div>
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: dayjs(USER.dateCreated).toISOString(),
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full screen-border-x",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}
