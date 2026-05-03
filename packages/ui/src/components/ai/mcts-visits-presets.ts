/**
 * Shared MCTS search depth presets used across the analysis bar popover
 * and the settings panels.
 */
/**
 * Visit presets follow a 1-2.5-5 logarithmic series (standard E3 engineering scale).
 * Each step is approximately ×2 or ×2.5, all values are human-readable round numbers,
 * and the 12-entry list lays out as a clean 3×4 grid.
 */
export const VISITS_PRESETS: readonly number[] = [
  1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000,
];

export const MAX_VISITS = 10000;

export const visitsLabelKey = (visits: number): string => {
  if (visits <= 1) return 'analysisBar.visitsPopover.fast';
  if (visits >= 5000) return 'analysisBar.visitsPopover.extreme';
  if (visits >= 1000) return 'analysisBar.visitsPopover.veryDeep';
  if (visits >= 100) return 'analysisBar.visitsPopover.deep';
  return 'analysisBar.visitsPopover.balanced';
};

export const isExtremeVisits = (visits: number): boolean => visits >= 5000;
