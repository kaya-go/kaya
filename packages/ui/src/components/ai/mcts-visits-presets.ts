/**
 * Shared MCTS search depth presets used across the analysis bar popover
 * and the settings panels.
 */
export const VISITS_PRESETS: readonly number[] = [1, 4, 10, 32, 64, 128, 256, 400];

export const visitsLabelKey = (visits: number): string => {
  if (visits <= 1) return 'analysisBar.visitsPopover.fast';
  if (visits >= 256) return 'analysisBar.visitsPopover.veryDeep';
  if (visits >= 32) return 'analysisBar.visitsPopover.deep';
  return 'analysisBar.visitsPopover.balanced';
};
