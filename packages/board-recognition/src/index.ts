// ============================================================================
// @kaya/board-recognition – public API
// ============================================================================

export type {
  RawImage,
  GrayImage,
  Point,
  BoardCorners,
  DetectedStone,
  CalibrationHint,
  RecognitionOptions,
  RecognitionResult,
  StoneColor,
  MokuRawDetection,
} from './types';

import type {
  RawImage,
  BoardCorners,
  CalibrationHint,
  RecognitionOptions,
  RecognitionResult,
} from './types';
import { resize, toGrayscale } from './image';
import { findBoardCorners, imageCorners, orderCorners, estimateGridInWarped } from './corners';
import { warpPerspective } from './perspective';
import { classifyIntersections, classifyWithHints } from './stones';
import { buildSGF } from './sgf';

export { orderCorners, estimateGridInWarped } from './corners';
export { warpPerspective, computeHomography, applyHomography } from './perspective';
export { classifyIntersections, classifyWithHints } from './stones';
export { buildSGF } from './sgf';
export { toGrayscale } from './image';
export { MokuDetector, mapStonesToGrid, expandCorners, clearModelCache } from './moku-detector';
export type { MokuDetectorConfig, MokuDetectOptions, ProgressCallback } from './moku-detector';

// ============================================================================
// Main entry point
// ============================================================================

/**
 * Recognise a Go board from a raw RGBA image.
 *
 * `options.boardSize` is **required** – the caller should ask the user which
 * size the board is before calling this.  Corner detection is automatic but
 * the result should be reviewed by the user.
 */
export async function recognizeBoard(
  img: RawImage,
  options: RecognitionOptions
): Promise<RecognitionResult> {
  const {
    boardSize,
    outputSize = 800,
    blackThreshold = 45,
    whiteThreshold = 30,
    cannyHighThreshold,
    cannyLowThreshold,
    gridCorners,
  } = options;

  // Downscale for corner-detection (Hough is expensive at full resolution)
  const processImg = resize(img, 600);
  const scale = img.width / processImg.width;

  const detectedOnSmall = findBoardCorners(processImg, {
    cannyHigh: cannyHighThreshold,
    cannyLow: cannyLowThreshold,
    boardSize,
  });

  let corners: BoardCorners;
  let cornersDetected: boolean;

  if (detectedOnSmall) {
    // Scale corners back to original image coordinates
    corners = detectedOnSmall.map(([x, y]) => [x * scale, y * scale]) as BoardCorners;
    cornersDetected = true;
  } else {
    corners = imageCorners(img.width, img.height);
    cornersDetected = false;
  }

  // Warp to square
  const warped = warpPerspective(img, corners, outputSize);
  const warpedGray = toGrayscale(warped);

  // Estimate grid position within the warped image
  const estimatedGrid = cornersDetected ? estimateGridInWarped(outputSize) : undefined;
  const effectiveGridCorners = gridCorners ?? estimatedGrid;

  // Classify intersections
  const stones = classifyIntersections(warpedGray, boardSize, {
    blackThreshold,
    whiteThreshold,
    gridCorners: effectiveGridCorners,
  });

  return {
    boardSize,
    stones,
    corners,
    cornersDetected,
    sgf: buildSGF(boardSize, stones),
    warpedImage: warped,
    estimatedGridCorners: estimatedGrid,
  };
}

/**
 * Re-run stone detection with a manually-corrected set of corners.
 * The board size must be supplied by the caller.
 */
export async function reclassifyWithCorners(
  img: RawImage,
  corners: BoardCorners,
  options: RecognitionOptions
): Promise<RecognitionResult> {
  const {
    boardSize,
    outputSize = 800,
    blackThreshold = 45,
    whiteThreshold = 30,
    gridCorners,
  } = options;

  const warped = warpPerspective(img, corners, outputSize);
  const warpedGray = toGrayscale(warped);

  const estimatedGrid = estimateGridInWarped(outputSize);
  const stones = classifyIntersections(warpedGray, boardSize, {
    blackThreshold,
    whiteThreshold,
    gridCorners: gridCorners ?? undefined,
  });

  return {
    boardSize,
    stones,
    corners,
    cornersDetected: true,
    sgf: buildSGF(boardSize, stones),
    warpedImage: warped,
    estimatedGridCorners: estimatedGrid,
  };
}

/**
 * Re-run stone detection with user-provided calibration hints.
 * Hints override specific intersection classifications and improve
 * the classifier's cluster centroids for remaining intersections.
 */
export async function reclassifyWithHints(
  img: RawImage,
  corners: BoardCorners,
  hints: CalibrationHint[],
  options: RecognitionOptions
): Promise<RecognitionResult> {
  const { boardSize, outputSize = 800 } = options;

  const warped = warpPerspective(img, corners, outputSize);
  const warpedGray = toGrayscale(warped);

  const estimatedGrid = estimateGridInWarped(outputSize);
  const stones = classifyWithHints(warpedGray, boardSize, hints, options.gridCorners ?? undefined);

  return {
    boardSize,
    stones,
    corners,
    cornersDetected: true,
    sgf: buildSGF(boardSize, stones),
    warpedImage: warped,
    estimatedGridCorners: estimatedGrid,
  };
}
