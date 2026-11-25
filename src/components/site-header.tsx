import { SiteHeaderWrapper } from "./site-header-wrapper";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <SiteHeaderWrapper className="sticky inset-x-0 top-0 z-[100] bg-background/85 backdrop-blur-md">
      <div
        className="mx-auto flex h-12 max-w-2xl items-center justify-end px-4"
        data-header-container
      >
        <ThemeToggle />
      </div>
    </SiteHeaderWrapper>
  );
}
