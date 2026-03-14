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
  applyMokuPredictedCorners: () => void;
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
 * Apply spreadCollapsedCorners and return the safe corners.
 * Convenience wrapper that discards the "changed" boolean.
 */
export function safeCorners(corners: BoardCorners, width: number, height: number): BoardCorners {
  return spreadCollapsedCorners(corners, width, height).corners;
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
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      const id = ctx.getImageData(0, 0, w, h);

      canvas.toBlob(
        blob => {
          if (!blob) {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to encode downscaled image'));
            return;
          }
          const downscaledUrl = URL.createObjectURL(blob);
          URL.revokeObjectURL(url); // free original FULL SIZE url early
          resolve({
            raw: { data: id.data, width: w, height: h },
            objectURL: downscaledUrl,
          });
        },
        'image/jpeg',
        0.85
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}
