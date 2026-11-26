"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { IconMorph } from "@/components/arc/icon-morph/icon-morph";
import { Button } from "@/components/ui/button";

import styles from "./theme-switch.module.css";

export type ThemeSwitchVariant = "reveal" | "eclipse" | "split" | "rise";
export type Theme = "light" | "dark";

export interface ThemeSwitchProps {
  theme: Theme;
  variant?: ThemeSwitchVariant;
  onThemeChange: (next: Theme, variant: ThemeSwitchVariant, trigger: HTMLElement) => void;
  label?: string;
  iconOnly?: boolean;
}



function useSettled() {
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => { second = requestAnimationFrame(() => setSettled(true)); });
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); };
  }, []);
  return settled;
}

function ThemeIcon({ theme }: { theme: Theme; reduced: boolean; settled: boolean }) {
  return (
    <IconMorph name="theme" state={theme === "dark"} size={16} strokeWidth={1.75} />
  );
}

export function ThemeSwitch({ theme, variant = "reveal", onThemeChange, label, iconOnly = false }: ThemeSwitchProps) {
  const reduced = useReducedMotion() ?? false;
  const settled = useSettled();
  const next = theme === "light" ? "dark" : "light";
  const classes = [styles.themeSwitch, styles[variant], iconOnly ? styles.iconOnly : "", settled ? styles.settled : ""].join(" ");

  return (
    <Button
      type="button"
      size="sm"
      variant="secondary"
      className={classes}
      data-theme={theme}
      aria-label={label ?? `Switch to ${next} mode`}
      aria-pressed={theme === "dark"}
      onClick={event => onThemeChange(next, variant, event.currentTarget)}
    >
      <span className={styles.iconWrap}><ThemeIcon theme={theme} reduced={reduced} settled={settled} /></span>
      {!iconOnly && <span className={styles.label}>Switch theme</span>}
    </Button>
  );
}

export default ThemeSwitch;
