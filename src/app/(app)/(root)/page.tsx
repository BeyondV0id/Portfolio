import dayjs from "dayjs";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { RecentBlogs } from "@/features/blog/components/recent-blogs";
import { AboutSite } from "@/features/portfolio/components/about-site";
import { Experiences } from "@/features/portfolio/components/experiences";
import { Hero } from "@/features/portfolio/components/hero";
import { Projects } from "@/features/portfolio/components/projects";
import { TeckStack } from "@/features/portfolio/components/teck-stack";
import { USER } from "@/features/portfolio/data";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <h1 className="sr-only">{USER.displayName}</h1>
      <Hero />

      <div className="reveal-product-subtle flex flex-col gap-8 pb-12">
        <Projects />
        <TeckStack />
        <Experiences />
        <RecentBlogs />
      </div>

      <AboutSite />
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
