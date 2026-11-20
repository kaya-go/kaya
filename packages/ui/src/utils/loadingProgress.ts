/**
 * The SGF loading overlay's progress, as shown.
 */

/**
 * Whole percent shown for `loadingProgress`, which is a fraction from 0 to 1
 * (see `GameTreeContextValue.loadingProgress`). The bar width and the label
 * both use it, so they always agree.
 */
export function loadingPercent(progress: number): number {
  if (!Number.isFinite(progress)) return 0;
  return Math.round(Math.min(Math.max(progress, 0), 1) * 100);
}
