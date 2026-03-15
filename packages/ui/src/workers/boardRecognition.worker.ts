/**
 * Web Worker for board recognition – keeps heavy image processing off the
 * main thread so corner-dragging and the rest of the UI stay responsive.
 */
import {
  recognizeBoard,
  reclassifyWithCorners,
  reclassifyWithHints,
  MokuDetector,
  warpPerspective,
} from '@kaya/board-recognition';
import type {
  RawImage,
  BoardCorners,
  CalibrationHint,
  RecognitionOptions,
  RecognitionResult,
  MokuDetectorConfig,
  MokuDetectOptions,
  MokuRawDetection,
} from '@kaya/board-recognition';

// ── Message protocol ────────────────────────────────────────────────────────

export type WorkerRequest =
  | {
      type: 'recognizeBoard';
      id: number;
      imgBuffer?: ArrayBuffer;
      width: number;
      height: number;
      options: RecognitionOptions;
    }
  | {
      type: 'reclassifyWithCorners';
      id: number;
      imgBuffer?: ArrayBuffer;
      width: number;
      height: number;
      corners: BoardCorners;
      options: RecognitionOptions;
    }
  | {
      type: 'reclassifyWithHints';
      id: number;
      imgBuffer?: ArrayBuffer;
      width: number;
      height: number;
      corners: BoardCorners;
      hints: CalibrationHint[];
      options: RecognitionOptions;
    }
  | {
      type: 'mokuInit';
      id: number;
      config?: MokuDetectorConfig;
    }
  | {
      type: 'mokuDetect';
      id: number;
      imgBuffer?: ArrayBuffer;
      width: number;
      height: number;
      options: MokuDetectOptions;
    }
  | {
      type: 'mokuRefilter';
      id: number;
      options: MokuDetectOptions;
    }
  | {
      type: 'mokuDispose';
      id: number;
    }
  | {
      type: 'warpOnly';
      id: number;
      imgBuffer?: ArrayBuffer;
      width: number;
      height: number;
      corners: [number, number][];
      outputSize: number;
      insetDst?: [[number, number], [number, number], [number, number], [number, number]];
    };

export interface WorkerResponse {
  id: number;
  result?: SerializedResult;
  error?: string;
}

/** Progress update sent during model download. */
export interface WorkerProgress {
  type: 'mokuProgress';
  progress: number; // 0..1
}

/** Serializable version of RecognitionResult (warpedImage sent as buffer). */
export interface SerializedResult {
  boardSize: number;
  stones: RecognitionResult['stones'];
  corners: BoardCorners;
  cornersDetected: boolean;
  sgf: string;
  warpedBuffer: ArrayBuffer;
  warpedSize: number; // width === height
  mokuRawDetections?: MokuRawDetection[];
  estimatedGridCorners?: BoardCorners;
  mokuRawCorners?: BoardCorners | null;
  mokuCornerCount?: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toRawImage(buffer: ArrayBuffer, width: number, height: number): RawImage {
  return { data: new Uint8ClampedArray(buffer), width, height };
}

function serializeResult(r: RecognitionResult): {
  serialized: SerializedResult;
  transfer: ArrayBuffer[];
} {
  // Clone the buffer so the worker retains its copy (e.g. for mokuRefilter cache).
  // Without this, transferring detaches the original and breaks subsequent refilter calls.
  const warpedBuffer = (r.warpedImage!.data.buffer as ArrayBuffer).slice(0);
  return {
    serialized: {
      boardSize: r.boardSize,
      stones: r.stones,
      corners: r.corners,
      cornersDetected: r.cornersDetected,
      sgf: r.sgf,
      warpedBuffer,
      warpedSize: r.warpedImage!.width,
      mokuRawDetections: r.mokuRawDetections,
      estimatedGridCorners: r.estimatedGridCorners,
      mokuRawCorners: r.mokuRawCorners,
      mokuCornerCount: r.mokuCornerCount,
    },
    transfer: [warpedBuffer],
  };
}

// ── Moku detector singleton ──────────────────────────────────────────────────

let mokuDetector: MokuDetector | null = null;
let cachedRawImage: RawImage | null = null;

// ── Handler ──────────────────────────────────────────────────────────────────

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const msg = e.data;
  try {
    let result: RecognitionResult;

    // Cache the image if provided
    if ('imgBuffer' in msg && msg.imgBuffer) {
      cachedRawImage = toRawImage(msg.imgBuffer, msg.width, msg.height);
    }
    const getImg = () => {
      if (!cachedRawImage) throw new Error('No image buffer provided and no cached image found');
      return cachedRawImage;
    };

    switch (msg.type) {
      case 'recognizeBoard': {
        result = await recognizeBoard(getImg(), msg.options);
        break;
      }
      case 'reclassifyWithCorners': {
        result = await reclassifyWithCorners(getImg(), msg.corners, msg.options);
        break;
      }
      case 'reclassifyWithHints': {
        result = await reclassifyWithHints(getImg(), msg.corners, msg.hints, msg.options);
        break;
      }
      case 'mokuInit': {
        mokuDetector?.dispose();
        const config = {
          ...msg.config,
          onProgress: (progress: number) => {
            (self as unknown as Worker).postMessage({
              type: 'mokuProgress',
              progress,
            } satisfies WorkerProgress);
          },
        };
        mokuDetector = new MokuDetector(config);
        await mokuDetector.init();
        (self as unknown as Worker).postMessage({
          id: msg.id,
          result: undefined,
        } satisfies WorkerResponse);
        return;
      }
      case 'mokuDetect': {
        if (!mokuDetector) throw new Error('Moku detector not initialized');
        result = await mokuDetector.detect(getImg(), msg.options);
        break;
      }
      case 'mokuRefilter': {
        if (!mokuDetector) throw new Error('Moku detector not initialized');
        const refiltered = mokuDetector.refilter(msg.options);
        if (!refiltered) throw new Error('No cached inference — run mokuDetect first');
        // Refilter only changes stones — skip the 2.5 MB warpedBuffer transfer.
        // The main thread keeps the existing warpedImage from the initial detect.
        const refilterSerialized: SerializedResult = {
          boardSize: refiltered.boardSize,
          stones: refiltered.stones,
          corners: refiltered.corners,
          cornersDetected: refiltered.cornersDetected,
          sgf: refiltered.sgf,
          warpedBuffer: new ArrayBuffer(0),
          warpedSize: 0,
          mokuRawDetections: refiltered.mokuRawDetections,
          estimatedGridCorners: refiltered.estimatedGridCorners,
          mokuRawCorners: refiltered.mokuRawCorners,
          mokuCornerCount: refiltered.mokuCornerCount,
        };
        (self as unknown as Worker).postMessage({
          id: msg.id,
          result: refilterSerialized,
        } satisfies WorkerResponse);
        return;
      }
      case 'mokuDispose': {
        mokuDetector?.dispose();
        mokuDetector = null;
        cachedRawImage = null; // Clear cache on dispose
        (self as unknown as Worker).postMessage({
          id: msg.id,
          result: undefined,
        } satisfies WorkerResponse);
        return;
      }
      case 'warpOnly': {
        const img = getImg();
        const corners = msg.corners as import('@kaya/board-recognition').BoardCorners;
        const warped = warpPerspective(img, corners, msg.outputSize, msg.insetDst);
        const warpedBuffer = warped.data.buffer as ArrayBuffer;
        (self as unknown as Worker).postMessage(
          {
            id: msg.id,
            result: {
              boardSize: 0,
              stones: [],
              corners,
              cornersDetected: true,
              sgf: '',
              warpedBuffer,
              warpedSize: warped.width,
            },
          } satisfies WorkerResponse,
          [warpedBuffer]
        );
        return;
      }
      default:
        return;
    }

    const { serialized, transfer } = serializeResult(result);
    (self as unknown as Worker).postMessage(
      { id: msg.id, result: serialized } satisfies WorkerResponse,
      transfer
    );
  } catch (err) {
    (self as unknown as Worker).postMessage({
      id: msg.id,
      error: err instanceof Error ? err.message : String(err),
    } satisfies WorkerResponse);
  }
};
