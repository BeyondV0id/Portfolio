import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { PUBLICATIONS } from "@/features/portfolio/data";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Tag } from "@/components/ui/tag";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/container";

export const metadata = {
  title: "Research Papers",
  description: "Published research papers and academic work.",
};

const DASH_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(to right, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)",
  backgroundSize: "100% 1px",
  backgroundRepeat: "no-repeat",
};

const SIDE_DASH_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px), repeating-linear-gradient(to bottom, var(--dash-border) 0px, var(--dash-border) 6px, transparent 6px, transparent 14px)",
  backgroundSize: "1px 100%, 1px 100%",
  backgroundPosition: "left top, right top",
  backgroundRepeat: "no-repeat",
};

export default function ResearchPage() {
  return (
    <div className="relative z-50 bg-background min-h-screen">
      {/* Top Header */}
      <div className="mx-auto md:max-w-3xl relative p-[9px]" style={SIDE_DASH_STYLE}>
        <div
          className="pointer-events-none absolute top-0 -left-[100vw] w-[200vw] h-px -z-1"
          style={DASH_STYLE}
        />

        {/* Flickering Grid Cover */}
        <div className="relative h-[250px] w-full p-4">
          <div className="relative size-full overflow-hidden bg-background/50">
            <FlickeringGrid
              className="absolute inset-0 z-0 size-full"
              squareSize={4}
              gridGap={4}
              color="#6B7280"
              maxOpacity={0.4}
              flickerChance={0.05}
              height={800}
              width={800}
            />
          </div>
        </div>

        <div className="relative w-full h-px pointer-events-none mt-2 mb-4">
          <div
            className="pointer-events-none absolute top-0 -left-[100vw] w-[200vw] h-px"
            style={DASH_STYLE}
          />
        </div>

        <Container delay={0.1}>
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="relative z-10 cursor-pointer p-1 border border-transparent hover:border-border rounded-[6px] hover:bg-mutedBackground transition-colors duration-300"
                aria-label="Go back"
              >
                <ArrowLeft className="w-[18px] h-[18px]" />
              </Link>
              <h1 className="text-xl font-bold leading-tight text-foreground font-sans flex items-baseline gap-3">
                Research Papers
              </h1>
            </div>
            <div className="relative z-10">
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>

      {/* Horizontal divider */}
      <div className="mx-auto md:max-w-3xl relative">
        <div className="w-full h-px" style={DASH_STYLE} />
        <div
          className="pointer-events-none absolute top-0 -left-[100vw] w-[200vw] h-px -z-1"
          style={DASH_STYLE}
        />
      </div>

      {/* Main content */}
      <div
        className="mx-auto md:max-w-3xl relative px-6 py-10 pb-6"
        style={SIDE_DASH_STYLE}
      >
        <Container delay={0.2}>
          <div className="flex flex-col gap-0">
            {PUBLICATIONS.map((pub, index) => (
              <div key={index}>
                {index > 0 && (
                  <div className="relative w-full h-px my-8 pointer-events-none">
                    <div
                      className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-[100vw] w-[200vw] h-px -z-1"
                      style={DASH_STYLE}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {/* Header row */}
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-muted/50 border border-muted-foreground/15">
                      <BookOpen className="size-5 text-muted-foreground" />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-[1.05rem] font-bold text-foreground font-sans leading-snug">
                          {pub.url ? (
                            <a
                              href={pub.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline underline-offset-4 inline-flex items-center gap-1.5"
                            >
                              {pub.title}
                              <ExternalLink className="size-3.5 shrink-0 opacity-60" />
                            </a>
                          ) : (
                            pub.title
                          )}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          {pub.publisher}
                        </span>
                        <span className="font-mono opacity-40 text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground">{pub.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {pub.description && (
                    <p className="text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400 pl-13">
                      {pub.description}
                    </p>
                  )}

                  {/* Keywords */}
                  {pub.keywords && pub.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 pl-13">
                      {pub.keywords.map((kw) => (
                        <Tag key={kw}>{kw}</Tag>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Bottom Footer */}
      <div
        className="mx-auto md:max-w-3xl relative"
        style={SIDE_DASH_STYLE}
      >
        <div className="w-full h-px" style={DASH_STYLE} />
        <div
          className="pointer-events-none absolute top-0 -left-[100vw] w-[200vw] h-px -z-1"
          style={DASH_STYLE}
        />
        <div
          className="w-full h-px relative z-10 pointer-events-none"
          style={DASH_STYLE}
        >
          <div
            className="pointer-events-none absolute bottom-0 -left-[100vw] w-[200vw] h-px -z-1"
            style={DASH_STYLE}
          />
        </div>
      </div>
    </div>
  );
}
