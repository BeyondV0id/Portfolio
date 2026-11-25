"use client";

import { Moon, SunMedium } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";
import { spring } from "@/lib/fluid-functionalism/springs";

import { Button } from "./ui/button";

export function ThemeToggle() {
  const reduceMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();

  const { setMetaColor } = useMetaColor();

  const playSound = useSound("/audio/theme-toggle.mp3", 0.25);

  const switchTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark,
    );
    playSound();
  }, [resolvedTheme, setTheme, setMetaColor, playSound]);

  return (
    <Button variant="ghost" size="icon" asChild>
      <motion.button
        type="button"
        onClick={switchTheme}
        initial={false}
        animate="rest"
        whileHover={reduceMotion ? undefined : "hover"}
      >
        <motion.span
          aria-hidden
          className="inline-flex"
          variants={{
            rest: { transform: "rotate(0deg)" },
            hover: { transform: "rotate(-12deg)" },
          }}
          transition={spring.fast}
        >
          <Moon className="hidden dark:block" />
          <SunMedium className="block dark:hidden" />
        </motion.span>
        <span className="sr-only">Theme Toggle</span>
      </motion.button>
    </Button>
  );
}
