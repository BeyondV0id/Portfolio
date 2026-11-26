export const motionTokens = {
  spring: {
    snappy: { type: "spring" as const, duration: 0.2, bounce: 0.1 },
  },
  duration: {
    fast: 0.15,
    instant: 0,
  },
  ease: {
    enter: [0.22, 1, 0.36, 1] as const,
    standard: [0.4, 0, 0.2, 1] as const,
  },
  blur: {
    subtle: 4,
  },
} as const;