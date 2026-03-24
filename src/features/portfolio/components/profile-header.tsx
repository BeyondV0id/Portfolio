import { USER } from "@/features/portfolio/data";




export function ProfileHeader() {
  return (
    <div className="screen-line-after flex screen-border-x">
      <div className="shrink-0 border-r border-edge">
        <div className="mx-0.5 my-[3px]">
          <img
            className="size-32 rounded-full object-cover ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
            alt={`${USER.displayName}'s avatar`}
            src={USER.avatar}
            fetchPriority="high"
          />
        </div>


      </div>

      <div className="flex flex-1 flex-col">


        <div className="border-t border-edge">
          <h1 className="flex items-center pl-4 text-3xl font-normal">
            {USER.displayName}
            &nbsp;

          </h1>

          <div className="h-12 border-t border-edge py-1 pl-4 sm:h-auto">
            <p className="font-mono text-sm text-balance text-muted-foreground">
              {USER.flipSentences[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
