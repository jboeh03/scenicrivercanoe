// Single source of truth for scroll progress, read by the R3F render loop.
// Kept OUTSIDE React so camera updates never trigger re-renders.
export const scrollState = {
  /** Whole-page scroll progress, 0 (top) .. 1 (bottom). */
  progress: 0,
  /** Instantaneous scroll velocity from Lenis (used for subtle motion effects). */
  velocity: 0,
  /** True once Lenis + ScrollTrigger are wired up. */
  ready: false,
}

export type ScrollState = typeof scrollState
