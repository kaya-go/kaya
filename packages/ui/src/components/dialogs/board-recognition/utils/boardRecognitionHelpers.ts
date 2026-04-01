/**
 * Pure helper functions for board recognition logic.
 * Extracted from useBoardRecognition to reduce duplication.
 */
import type {
  BoardCorners,
  CalibrationHint,
  Point,
  RecognitionResult,
  RawImage,
} from '@kaya/board-recognition';
import { buildSGF, mapStonesToGrid, spreadCollapsedCorners } from '@kaya/board-recognition';

export interface BoardRecognitionState {
  rawImage: RawImage | null;
  objectURL: string | null;
  corners: BoardCorners | null;
  setCorners: React.Dispatch<React.SetStateAction<BoardCorners | null>>;
  result: RecognitionResult | null;
  setResult: React.Dispatch<React.SetStateAction<RecognitionResult | null>>;
  analyzing: boolean;
  loadError: string | null;
  mokuReady: boolean;
  mokuLoading: boolean;
  mokuProgress: number;
  gridCorners: BoardCorners | null;
  setGridCorners: React.Dispatch<React.SetStateAction<BoardCorners | null>>;
  gridCornersRef: React.MutableRefObject<BoardCorners | null>;
  hints: CalibrationHint[];
  setHints: React.Dispatch<React.SetStateAction<CalibrationHint[]>>;
  scheduleReclassify: (newCorners: BoardCorners) => void;
  cancelReclassify: () => void;
  reclassifyWithHints: (newHints: CalibrationHint[]) => void;
  doReclassifyNow: (
    srcCorners: BoardCorners,
    gc: BoardCorners | null,
    h: CalibrationHint[]
  ) => void;
  handleMokuThresholdChange: (newThreshold: number) => void;
  commitMokuThreshold: () => void;
  rawDimsRef: React.MutableRefObject<{ width: number; height: number }>;
  cornersRef: React.MutableRefObject<BoardCorners | null>;
  cornersManuallySet: boolean;
  resetCornersToAuto: () => void;
}

/** Warped output size in pixels. */
export const WARP_SIZE = 800;
/** Fractional inset so the board has visible margins in the warped output. */
export const WARP_MARGIN = 0.08;

/** Max dimension for the working image used in warp / classify. */
export const MAX_WORKING_DIM = 1600;

/** Compute the 4 inset destination corners for perspective warp. */
export function computeInsetDst(): [Point, Point, Point, Point] {
  const m = Math.round(WARP_SIZE * WARP_MARGIN);
  return [
    [m, m],
    [WARP_SIZE - 1 - m, m],
    [WARP_SIZE - 1 - m, WARP_SIZE - 1 - m],
    [m, WARP_SIZE - 1 - m],
  ];
}

/**
 * Build a RecognitionResult by re-mapping moku raw detections onto a new
 * set of corners. This is the common pattern used when corners change
 * but the raw detections stay the same.
 */
export function buildMokuResult(
  base: RecognitionResult,
  corners: BoardCorners,
  boardSize: number,
  gridCorners?: BoardCorners | null
): RecognitionResult {
  const rawDets = base.mokuRawDetections!;
  const stones = mapStonesToGrid(rawDets, corners, boardSize);
  const insetDst = computeInsetDst();
  return {
    ...base,
    boardSize,
    stones,
    corners,
    cornersDetected: true,
    sgf: buildSGF(boardSize, stones),
    estimatedGridCorners: gridCorners ?? insetDst,
    mokuRawDetections: rawDets,
  };
}

/**
 * Maximum fraction of image dimension that corners are allowed to overflow
 * beyond the image bounds. A board that extends past the photo edge needs
 * corners slightly outside the image for an accurate perspective warp.
 */
export const CORNER_OVERFLOW_FRACTION = 0.25;

/**
 * Clamp corner points to a generous overflow region around the image
 * so they remain reachable / draggable while still preventing wildly
 * out-of-bounds values from degenerate detections.
 */
function clampCorners(corners: BoardCorners, width: number, height: number): BoardCorners {
  const overX = width * CORNER_OVERFLOW_FRACTION;
  const overY = height * CORNER_OVERFLOW_FRACTION;
  return corners.map(([x, y]) => [
    Math.max(-overX, Math.min(width - 1 + overX, x)),
    Math.max(-overY, Math.min(height - 1 + overY, y)),
  ]) as unknown as BoardCorners;
}

/**
 * Apply spreadCollapsedCorners + bounds clamping and return safe corners.
 * Convenience wrapper that discards the "changed" boolean.
 */
export function safeCorners(corners: BoardCorners, width: number, height: number): BoardCorners {
  const spread = spreadCollapsedCorners(corners, width, height).corners;
  return clampCorners(spread, width, height);
}

/**
 * Fix a recognition result's corners via spreadCollapsedCorners.
 * Returns the (possibly updated) result and the safe corners.
 */
export function fixResultCorners(
  r: RecognitionResult,
  width: number,
  height: number
): { result: RecognitionResult; corners: BoardCorners } {
  const safe = safeCorners(r.corners, width, height);
  const result = safe !== r.corners ? { ...r, corners: safe } : r;
  return { result, corners: safe };
}

/** Load a File into an RGBA pixel buffer, downscaled to maxDim. */
export async function fileToDownscaledImage(
  file: File,
  maxDim: number
): Promise<{ raw: RawImage; objectURL: string }> {
  // Use createImageBitmap for async, non-blocking image decode + downscale
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  // Resize asynchronously via createImageBitmap (avoids main-thread freeze)
  const resized =
    scale < 1 ? await createImageBitmap(bitmap, { resizeWidth: w, resizeHeight: h }) : bitmap;
  if (scale < 1) bitmap.close();

  // Yield to allow UI to render before the synchronous pixel read
  await new Promise(r => setTimeout(r, 0));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(resized, 0, 0, w, h);
  resized.close();
  const id = ctx.getImageData(0, 0, w, h);

  const objectURL = await new Promise<string>((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) {
          reject(new Error('Failed to encode downscaled image'));
          return;
        }
        resolve(URL.createObjectURL(blob));
      },
      'image/jpeg',
      0.85
    );
  });

  return {
    raw: { data: id.data, width: w, height: h },
    objectURL,
  };
}
