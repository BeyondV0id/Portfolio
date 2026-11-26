import { SceneSoundToggle } from "./scene-sound-toggle";
import { ThemeSwitchWrapper as ThemeToggle } from "./theme-switch-wrapper";

export function SiteHeader() {
  return (
    <header className="sticky inset-x-0 top-0 z-[100] bg-background">
      <div
        className="mx-auto flex h-12 max-w-2xl items-center justify-end gap-1 px-4"
        data-header-container
      >
        <SceneSoundToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
