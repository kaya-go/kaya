// ============================================================================
// Core types for board recognition
// ============================================================================

/** Raw RGBA image */
export interface RawImage {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

/** Grayscale image as float array (0-255 range) */
export interface GrayImage {
  data: Float32Array;
  width: number;
  height: number;
}

/** A 2D point */
export type Point = [number, number];

/** Four corners of the board in image coordinates: [TL, TR, BR, BL] */
export type BoardCorners = [Point, Point, Point, Point];

/** Stone color */
export type StoneColor = 'black' | 'white';

/** A detected stone */
export interface DetectedStone {
  x: number; // column (0-indexed)
  y: number; // row (0-indexed)
  color: StoneColor;
}

/** User-provided calibration hint for a specific intersection */
export interface CalibrationHint {
  x: number; // column (0-indexed)
  y: number; // row (0-indexed)
  color: StoneColor | 'empty';
}

/** Options for recognition */
export interface RecognitionOptions {
  boardSize: 9 | 13 | 19;
  outputSize?: number; // size of warped square image in pixels (default 800)
  blackThreshold?: number; // how much darker than board = black stone (default 45)
  whiteThreshold?: number; // how much brighter than board = white stone (default 35)
  cannyHighThreshold?: number;
  cannyLowThreshold?: number;
  /** Grid corner positions within the warped image (overrides default full-image grid). */
  gridCorners?: BoardCorners;
}

/** Raw moku detection in original image coordinates (for re-mapping on corner change) */
export interface MokuRawDetection {
  cx: number;
  cy: number;
  classId: number;
  score: number;
}

/** Full recognition result */
export interface RecognitionResult {
  boardSize: number;
  stones: DetectedStone[];
  corners: BoardCorners; // detected or fallback corners in original image coords
  cornersDetected: boolean; // false = fallback to image bounds
  sgf: string;
  warpedImage: RawImage; // for preview
  /** Estimated grid corners within the warped image (inset from board boundary). */
  estimatedGridCorners?: BoardCorners;
  /** Raw moku detections in image coords (only set by moku backend, for corner re-mapping). */
  mokuRawDetections?: MokuRawDetection[];
}
