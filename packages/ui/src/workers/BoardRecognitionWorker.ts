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
    // warpedImage is only populated for warpOnly responses; detect/refilter skip the transfer
    warpedImage:
      s.warpedBuffer.byteLength > 0
        ? {
            data: new Uint8ClampedArray(s.warpedBuffer),
            width: s.warpedSize,
            height: s.warpedSize,
          }
        : undefined!,
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
    // Transfer the original buffer (zero-copy) instead of cloning 7.6 MB.
    // The main thread only uses rawImage.width/height after this, never .data.
    return imgData.buffer as ArrayBuffer;
  }

  recognizeBoard(
    imgData: Uint8ClampedArray,
    width: number,
    height: number,
    options: RecognitionOptions
  ): Promise<RecognitionResult> {
    const id = this.nextId++;
    const imgBuffer = this._getImgBuffer(imgData);

    const msg = {
      type: 'recognizeBoard',
      id,
      imgBuffer,
      width,
      height,
      options,
    } satisfies WorkerRequest;

    return new Promise<RecognitionResult>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage(msg, imgBuffer ? [imgBuffer] : []);
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

    const msg = {
      type: 'reclassifyWithCorners',
      id,
      imgBuffer,
      width,
      height,
      corners,
      options,
    } satisfies WorkerRequest;

    return new Promise<RecognitionResult>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage(msg, imgBuffer ? [imgBuffer] : []);
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

    const msg = {
      type: 'reclassifyWithHints',
      id,
      imgBuffer,
      width,
      height,
      corners,
      hints,
      options,
    } satisfies WorkerRequest;

    return new Promise<RecognitionResult>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage(msg, imgBuffer ? [imgBuffer] : []);
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
  mokuInit(
    config?: MokuDetectorConfig,
    onProgress?: (progress: number) => void,
    modelData?: ArrayBuffer
  ): Promise<void> {
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
      const msg = {
        type: 'mokuInit' as const,
        id,
        config,
        ...(modelData && { modelData }),
      };
      this.worker.postMessage(msg, modelData ? [modelData] : []);
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

    const msg = {
      type: 'mokuDetect' as const,
      id,
      imgBuffer,
      width,
      height,
      options,
    };

    return new Promise<RecognitionResult>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage(msg, imgBuffer ? [imgBuffer] : []);
    });
  }

  /**
   * Re-filter cached inference outputs with a new threshold.
   * No image data or ONNX inference needed — instant postprocess only.
   */
  mokuRefilter(options: MokuDetectOptions): Promise<RecognitionResult> {
    const id = this.nextId++;
    return new Promise<RecognitionResult>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({
        type: 'mokuRefilter' as const,
        id,
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

// ── Singleton worker pool with idle timeout ──────────────────────────────────

const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

let sharedWorker: BoardRecognitionWorker | null = null;
let refCount = 0;
let idleTimer: ReturnType<typeof setTimeout> | null = null;
let mokuInitialized = false;

function clearIdleTimer() {
  if (idleTimer !== null) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
}

/**
 * Acquire a shared BoardRecognitionWorker instance.
 * The worker (and its ONNX session) persists across dialog openings.
 * Call `releaseSharedWorker()` when the dialog closes.
 * After all consumers release and an idle timeout elapses, the worker is terminated.
 */
export function acquireSharedWorker(): BoardRecognitionWorker {
  clearIdleTimer();
  if (!sharedWorker) {
    sharedWorker = new BoardRecognitionWorker();
    mokuInitialized = false;
  }
  refCount++;
  return sharedWorker;
}

/** Whether the shared worker's moku detector is already initialized. */
export function isSharedMokuReady(): boolean {
  return mokuInitialized;
}

/** Mark the shared worker's moku detector as initialized. */
export function setSharedMokuReady(ready: boolean): void {
  mokuInitialized = ready;
}

/**
 * Immediately terminate the shared worker and reset all state.
 * Used when the detection model changes (upload / reset) so the next
 * dialog open creates a fresh worker with the correct model.
 */
export function destroySharedWorker(): void {
  clearIdleTimer();
  if (sharedWorker) {
    sharedWorker.dispose();
    sharedWorker = null;
  }
  refCount = 0;
  mokuInitialized = false;
}

/**
 * Release a reference to the shared worker.
 * When all consumers release, an idle timer starts.
 * After the timeout, the worker is terminated to free memory.
 */
export function releaseSharedWorker(): void {
  refCount = Math.max(0, refCount - 1);
  if (refCount === 0) {
    idleTimer = setTimeout(() => {
      if (refCount === 0 && sharedWorker) {
        sharedWorker.dispose();
        sharedWorker = null;
        mokuInitialized = false;
      }
    }, IDLE_TIMEOUT_MS);
  }
}
