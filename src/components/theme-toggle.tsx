"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";

import { MoonIcon } from "./animated-icons/moon";
import { SunMediumIcon } from "./animated-icons/sun-medium";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const { setMetaColor } = useMetaColor();

  const playSound = useSound("/audio/theme-toggle.mp3", 0.25);

  const switchTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark
    );
    playSound();
  }, [resolvedTheme, setTheme, setMetaColor, playSound]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={switchTheme}
      // onClick={() => {
      //   if (!document.startViewTransition) switchTheme();
      //   document.startViewTransition(switchTheme);
      // }}
    >
      <MoonIcon className="relative hidden after:absolute after:-inset-2 dark:block" />
      <SunMediumIcon className="relative block after:absolute after:-inset-2 dark:hidden" />
      <span className="sr-only">Theme Toggle</span>
    </Button>
  );
}
