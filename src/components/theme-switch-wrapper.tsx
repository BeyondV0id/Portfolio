"use client";

import { MoonIcon } from "@solar-icons/react/linear/moon";
import { SunIcon } from "@solar-icons/react/linear/sun";
import { useTheme } from "next-themes";
import { type MouseEvent, useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";

import { Button } from "./ui/button";

const subscribe = () => () => {};

export function ThemeSwitchWrapper() {
  const { resolvedTheme, setTheme } = useTheme();
  const { setMetaColor } = useMetaColor();
  const playSound = useSound("/audio/theme-toggle.mp3", 0.25);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const transitionInProgress = useRef(false);

  const isDark = resolvedTheme === "dark";
  const switchLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  function handleThemeChange(event: MouseEvent<HTMLButtonElement>) {
    if (transitionInProgress.current) return;

    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    const applyTheme = () => {
      setTheme(next);
      setMetaColor(META_THEME_COLORS[next]);
    };
    playSound();

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    const referenceRadius = Math.hypot(innerWidth, innerHeight) / Math.SQRT2;

    transitionInProgress.current = true;
    root.classList.add("theme-eclipse");
    root.style.setProperty("--vt-x", `${(x / innerWidth) * 100}%`);
    root.style.setProperty("--vt-y", `${(y / innerHeight) * 100}%`);
    root.style.setProperty("--vt-radius", `${(radius / referenceRadius) * 100}%`);
    const transition = document.startViewTransition(() => {
      root.classList.toggle("dark", next === "dark");
      flushSync(applyTheme);
    });
    const finishTransition = () => {
      root.classList.remove("theme-eclipse");
      root.style.removeProperty("--vt-x");
      root.style.removeProperty("--vt-y");
      root.style.removeProperty("--vt-radius");
      transitionInProgress.current = false;
    };
    void transition.finished.then(finishTransition, finishTransition);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={hydrated ? switchLabel : "Toggle theme"}
      onClick={handleThemeChange}
    >
      <MoonIcon aria-hidden className="dark:hidden" />
      <SunIcon aria-hidden className="hidden dark:block" />
    </Button>
  );
}

export { ThemeSwitchWrapper as ThemeToggle };
