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
    <div className="mx-auto flex max-w-2xl flex-col px-4 pt-6 pb-16">
      <h1 className="text-[18px] font-medium tracking-tight text-foreground">
        gallery.
      </h1>
      <p className="mt-2 text-base leading-tight font-normal tracking-tight text-muted-foreground">
        moments where the tech community comes together — meetups, hackathons,
        and the setups behind them.
      </p>

      <div className="reveal-product-subtle mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {GALLERY_ITEMS.map((item) => (
          <figure
            key={item.id}
            className="relative col-span-1 aspect-[4/3] overflow-hidden rounded-xl bg-muted"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 672px) 330px, 100vw"
              className="object-cover"
              unoptimized
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pt-10 pb-3 text-sm font-medium tracking-tight text-white">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
