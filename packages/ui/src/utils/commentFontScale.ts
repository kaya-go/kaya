/**
 * Bounds and helpers for the move-comment text-size control.
 *
 * The scale is a plain multiplier applied to the comment panel's base font
 * size via the `--comment-font-scale` CSS variable. 1 is the default size.
 */
export const COMMENT_FONT_SCALE_MIN = 0.8;
export const COMMENT_FONT_SCALE_MAX = 1.6;
export const COMMENT_FONT_SCALE_STEP = 0.1;
export const COMMENT_FONT_SCALE_DEFAULT = 1;

/** Clamp a scale into the supported range and round to avoid float drift. */
export function clampCommentFontScale(scale: number): number {
  if (!Number.isFinite(scale)) return COMMENT_FONT_SCALE_DEFAULT;
  const clamped = Math.min(COMMENT_FONT_SCALE_MAX, Math.max(COMMENT_FONT_SCALE_MIN, scale));
  return Math.round(clamped * 100) / 100;
}
