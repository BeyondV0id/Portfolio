"use client";

import { MoonIcon as Moon } from "@solar-icons/react/linear/moon";
import { SunIcon as SunMedium } from "@solar-icons/react/linear/sun";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";
import { spring } from "@/lib/fluid-functionalism/springs";

import { Button } from "./ui/button";
import { FluidHoverGroup } from "./ui/fluid-hover-group";

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { setMetaColor } = useMetaColor();
  const playSound = useSound("/audio/theme-toggle.mp3", 0.25);
  const reducedMotion = useReducedMotion();
  const transitionInProgress = useRef(false);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const ThemeIcon = isDark ? Moon : SunMedium;
  const iconOffset = reducedMotion ? 0 : isDark ? -2 : 0;
  const iconAngle = reducedMotion ? 0 : isDark ? -30 : 30;

  function switchTheme() {
    if (transitionInProgress.current) return;

    const applyTheme = () => {
      setTheme(nextTheme);
      setMetaColor(META_THEME_COLORS[nextTheme]);
    };
    playSound();

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    transitionInProgress.current = true;
    const root = document.documentElement;
    root.classList.add("theme-eclipse");
    const transition = document.startViewTransition(() =>
      flushSync(applyTheme),
    );
    const finishTransition = () => {
      root.classList.remove("theme-eclipse");
      transitionInProgress.current = false;
    };
    void transition.finished.then(finishTransition, finishTransition);
  }

  return (
    <FluidHoverGroup>
      <Button
        type="button"
        variant="fluid"
        size="icon"
        data-fluid-item
        onClick={switchTheme}
        aria-label="Dark mode"
        aria-pressed={hydrated ? isDark : undefined}
      >
        {hydrated ? (
          <motion.span
            aria-hidden="true"
            className="relative inline-grid size-4 place-items-center"
            initial={false}
            animate={{ x: iconOffset }}
            transition={spring.moderate}
          >
            <AnimatePresence initial={false}>
              <motion.span
                key={resolvedTheme}
                className="absolute inset-0 grid place-items-center"
                initial={{ opacity: 0, rotate: iconAngle, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  rotate: -iconAngle,
                  scale: 0.7,
                  transition: reducedMotion
                    ? { duration: 0 }
                    : spring.moderate.exit,
                }}
                transition={reducedMotion ? { duration: 0 } : spring.moderate}
              >
                <ThemeIcon />
              </motion.span>
            </AnimatePresence>
          </motion.span>
        ) : (
          <>
            <Moon aria-hidden className="hidden dark:block" />
            <SunMedium aria-hidden className="block dark:hidden" />
          </>
        )}
      </Button>
    </FluidHoverGroup>
  );
}
