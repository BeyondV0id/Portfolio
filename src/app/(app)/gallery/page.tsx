import type { Metadata } from "next";
import Image from "next/image";

import { GALLERY_ITEMS } from "@/features/gallery/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments where the tech community comes together — setups, hackathons, and things along the way.",
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col pb-16">
      <h1 className="section-title">gallery.</h1>
      <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
        moments where the tech community comes together — meetups, hackathons,
        and the setups behind them.
      </p>

      <div className="reveal-product-subtle mt-8 grid gap-3 sm:grid-cols-2">
        {GALLERY_ITEMS.map((item) => (
          <figure
            key={item.id}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="relative aspect-[4/3] bg-muted">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 672px) 330px, 100vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <figcaption className="px-4 py-2.5 text-sm text-muted-foreground">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
