/**
 * Shared MCTS search depth presets used across the analysis bar popover
 * and the settings panels.
 *
 * Four presets with qualitatively distinct use cases. Power users can pick
 * any integer in [1, MAX_VISITS] via the custom input in AISettings.
 */
export const VISITS_PRESETS: readonly number[] = [1, 50, 500, 2500];

export const MIN_VISITS = 1;
export const MAX_VISITS = 50000;

export const visitsLabelKey = (visits: number): string => {
  if (visits <= 1) return 'analysisBar.visitsPopover.fast';
  if (visits >= 2500) return 'analysisBar.visitsPopover.extreme';
  if (visits >= 500) return 'analysisBar.visitsPopover.deep';
  return 'analysisBar.visitsPopover.balanced';
};

export const isExtremeVisits = (visits: number): boolean => visits >= 2500;

export const isPresetVisits = (visits: number): boolean => VISITS_PRESETS.includes(visits);
