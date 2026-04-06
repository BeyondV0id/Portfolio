import { PROFILE_IMAGES } from "@/config/site";
import { USER, SOCIAL_LINKS } from "@/features/portfolio/data";
import Image from "next/image";

export function ProfileHeader() {
  const socialOrder = ["GitHub", "LinkedIn", "LeetCode", "Email"];
  const socials = socialOrder
    .map((title) => SOCIAL_LINKS.find((link) => link.title === title))
    .filter((link): link is NonNullable<typeof link> => Boolean(link));

  return (
    <div className="screen-line-after flex screen-border-x items-center">
      <div className="shrink-0 border-r border-edge px-2 py-2">
        <div className="mx-0.5 my-[3px]">
          <img
            className="size-32 rounded-full object-cover ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40 dark:hidden"
            alt={`${USER.displayName}'s avatar`}
            src={PROFILE_IMAGES.light}
            fetchPriority="high"
          />
          <img
            className="hidden size-32 rounded-full object-cover ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40 dark:block"
            alt={`${USER.displayName}'s avatar`}
            src={PROFILE_IMAGES.dark}
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-edge">
        <div className="flex items-start justify-between gap-4 pl-4 pr-3 pt-3">
          <h1 className="text-3xl font-normal leading-tight">
            {USER.displayName}
          </h1>

          <div className="flex items-center gap-2">
            {socials.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/70 transition-colors hover:border-foreground/65 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60"
                aria-label={link.title}
              >
                <Image
                  src={`/icons/${link.icon}`}
                  alt={link.title}
                  width={18}
                  height={18}
                  className="object-contain"
                  unoptimized
                />
              </a>
            ))}
          </div>
        </div>

        <div className="h-12 border-t border-edge py-1 pl-4 sm:h-auto">
          <p className="font-mono text-sm text-balance text-muted-foreground">
            {USER.flipSentences[0]}
          </p>
        </div>
      </div>
    </div>
  );
}
