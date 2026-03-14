/**
 * Typed wrapper around the board-recognition Web Worker.
 * Manages worker lifecycle and provides a promise-based API.
 */
import type {
  BoardCorners,
  CalibrationHint,
  RecognitionOptions,
  RecognitionResult,
  MokuDetectorConfig,
  MokuDetectOptions,
} from '@kaya/board-recognition';
import type {
  WorkerRequest,
  WorkerResponse,
  SerializedResult,
  WorkerProgress,
} from './boardRecognition.worker';

// Re-export for convenience
export type { SerializedResult };

type Pending = {
  resolve: (value: RecognitionResult) => void;
  reject: (reason: Error) => void;
};

function deserializeResult(s: SerializedResult): RecognitionResult {
  return {
    boardSize: s.boardSize,
    stones: s.stones,
    corners: s.corners,
    cornersDetected: s.cornersDetected,
    sgf: s.sgf,
    warpedImage: {
      data: new Uint8ClampedArray(s.warpedBuffer),
      width: s.warpedSize,
      height: s.warpedSize,
    },
    mokuRawDetections: s.mokuRawDetections,
    estimatedGridCorners: s.estimatedGridCorners,
    mokuRawCorners: s.mokuRawCorners,
    mokuCornerCount: s.mokuCornerCount,
  };
}

export class BoardRecognitionWorker {
  private worker: Worker;
  private nextId = 1;
  private pending = new Map<number, Pending>();
  private progressCallback: ((progress: number) => void) | null = null;
  private lastImgData: Uint8ClampedArray | null = null;

  constructor() {
    this.worker = new Worker(new URL('./boardRecognition.worker.js', import.meta.url), {
      type: 'module',
    });
    this.worker.onmessage = (e: MessageEvent<WorkerResponse | WorkerProgress>) => {
      const data = e.data;
      // Handle progress updates
      if ('type' in data && data.type === 'mokuProgress') {
        this.progressCallback?.(data.progress);
        return;
      }
      const { id, result, error } = data as WorkerResponse;
      const p = this.pending.get(id);
      if (!p) return;
      this.pending.delete(id);
      if (error) {
        p.reject(new Error(error));
      } else if (result) {
        p.resolve(deserializeResult(result));
      } else {
        // mokuInit / mokuDispose return no result
        p.resolve(undefined as unknown as RecognitionResult);
      }
    };
  }

  private _getImgBuffer(imgData: Uint8ClampedArray): ArrayBuffer | undefined {
    if (this.lastImgData === imgData) {
      return undefined; // already cached on worker
    }
    this.lastImgData = imgData;
    return imgData.buffer.slice(0) as ArrayBuffer; // only clone once per unique image
  }

  recognizeBoard(
    imgData: Uint8ClampedArray,
    width: number,
    height: number,
    options: RecognitionOptions
  ): Promise<RecognitionResult> {
    const id = this.nextId++;
    const imgBuffer = this._getImgBuffer(imgData);

    return new Promise<RecognitionResult>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({
        type: 'recognizeBoard',
        id,
        imgBuffer,
        width,
        height,
        options,
      } satisfies WorkerRequest);
    });
  }

  reclassifyWithCorners(
    imgData: Uint8ClampedArray,
    width: number,
    height: number,
    corners: BoardCorners,
    options: RecognitionOptions
  ): Promise<RecognitionResult> {
    const id = this.nextId++;
    const imgBuffer = this._getImgBuffer(imgData);

    return new Promise<RecognitionResult>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({
        type: 'reclassifyWithCorners',
        id,
        imgBuffer,
        width,
        height,
        corners,
        options,
      } satisfies WorkerRequest);
    });
  }

  reclassifyWithHints(
    imgData: Uint8ClampedArray,
    width: number,
    height: number,
    corners: BoardCorners,
    hints: CalibrationHint[],
    options: RecognitionOptions
  ): Promise<RecognitionResult> {
    const id = this.nextId++;
    const imgBuffer = this._getImgBuffer(imgData);

    return new Promise<RecognitionResult>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({
        type: 'reclassifyWithHints',
        id,
        imgBuffer,
        width,
        height,
        corners,
        hints,
        options,
      } satisfies WorkerRequest);
    });
  }

  /** Cancel all pending requests and terminate the worker. */
  dispose(): void {
    for (const p of this.pending.values()) {
      p.reject(new Error('Worker disposed'));
    }
    this.pending.clear();
    this.worker.terminate();
  }

  /** Cancel a specific pending request (used for debounce). */
  cancelAll(): void {
    for (const p of this.pending.values()) {
      p.reject(new Error('Cancelled'));
    }
    this.pending.clear();
  }

  // ── Moku detector methods ──────────────────────────────

  /** Initialize the moku ONNX detector (downloads and loads the model). */
  mokuInit(config?: MokuDetectorConfig, onProgress?: (progress: number) => void): Promise<void> {
    this.progressCallback = onProgress ?? null;
    const id = this.nextId++;
    return new Promise<void>((resolve, reject) => {
      this.pending.set(id, {
        resolve: () => {
          this.progressCallback = null;
          resolve();
        },
        reject: err => {
          this.progressCallback = null;
          reject(err);
        },
      } as Pending);
      this.worker.postMessage({
        type: 'mokuInit' as const,
        id,
        config,
      });
    });
  }

  /** Run moku detection on an image. */
  mokuDetect(
    imgData: Uint8ClampedArray,
    width: number,
    height: number,
    options: MokuDetectOptions
  ): Promise<RecognitionResult> {
    const id = this.nextId++;
    const imgBuffer = this._getImgBuffer(imgData);

    return new Promise<RecognitionResult>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({
        type: 'mokuDetect' as const,
        id,
        imgBuffer,
        width,
        height,
        options,
      });
    });
  }

  /** Dispose the moku detector and free ONNX resources. */
  mokuDispose(): Promise<void> {
    const id = this.nextId++;
    this.lastImgData = null; // Clear main thread cache
    return new Promise<void>((resolve, reject) => {
      this.pending.set(id, {
        resolve: () => resolve(),
        reject,
      } as Pending);
      this.worker.postMessage({
        type: 'mokuDispose' as const,
        id,
      });
    });
  }

  /** Warp the image only (no stone detection). Used during corner dragging. */
  warpOnly(
    imgData: Uint8ClampedArray,
    width: number,
    height: number,
    corners: BoardCorners,
    outputSize: number,
    insetDst?: [[number, number], [number, number], [number, number], [number, number]]
  ): Promise<RecognitionResult> {
    const id = this.nextId++;
    const imgBuffer = this._getImgBuffer(imgData);

    return new Promise<RecognitionResult>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({
        type: 'warpOnly' as const,
        id,
        imgBuffer,
        width,
        height,
        corners,
        outputSize,
        insetDst,
      });
    });
  }
}
