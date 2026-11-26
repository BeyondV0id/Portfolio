"use client";

import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";

import { ThemeSwitch } from "./theme-switch";

const subscribe = () => () => {};

export function ThemeSwitchWrapper() {
  const { resolvedTheme, setTheme } = useTheme();
  const { setMetaColor } = useMetaColor();
  const playSound = useSound("/audio/theme-toggle.mp3", 0.25);
  const reducedMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const transitionInProgress = useRef(false);

  const isDark = resolvedTheme === "dark";
  const theme = isDark ? "dark" : "light";

  function handleThemeChange(next: "light" | "dark") {
    if (transitionInProgress.current) return;

    const applyTheme = () => {
      setTheme(next);
      setMetaColor(META_THEME_COLORS[next]);
    };
    playSound();

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      reducedMotion
    ) {
      applyTheme();
      return;
    }

    transitionInProgress.current = true;
    const root = document.documentElement;
    root.classList.add("theme-eclipse");
    const transition = document.startViewTransition(() => flushSync(applyTheme));
    const finishTransition = () => {
      root.classList.remove("theme-eclipse");
      transitionInProgress.current = false;
    };
    void transition.finished.then(finishTransition, finishTransition);
  }

  return (
    <ThemeSwitch
      theme={hydrated ? theme : "light"}
      variant="reveal"
      iconOnly
      onThemeChange={(next) => handleThemeChange(next)}
    />
  );
}

export { ThemeSwitchWrapper as ThemeToggle };