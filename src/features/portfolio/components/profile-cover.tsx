export function ProfileCover() {
  return (
    <div className="flex cursor-pointer items-center justify-center rounded-[12px] border border-border bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center p-[4px] transition duration-300 [--pattern-foreground:var(--color-zinc-950)]/5 hover:brightness-90 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5">
      <img
        alt=""
        className="h-20 w-44 rounded-[8px] text-white sm:h-64 sm:w-64"
        src={"/icons/logo.png"}
      />
    </div>
  );
}
