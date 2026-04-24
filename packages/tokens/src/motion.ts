export const motion = {
  duration: {
    instant: "80ms",
    fast: "120ms",
    normal: "180ms",
    slow: "260ms"
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    emphasized: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)"
  }
} as const;
