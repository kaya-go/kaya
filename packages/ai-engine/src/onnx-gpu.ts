/**
 * GPU buffer management for OnnxEngine graph capture mode.
 */
import * as ort from 'onnxruntime-web/all';

/** Pre-allocated GPU buffer state for graph capture mode. */
export interface GpuBufferState {
  device: any;
  binBuffer: any;
  globalBuffer: any;
  binTensor: ort.Tensor | null;
  globalTensor: ort.Tensor | null;
  allocatedBoardSize: number;
}

export function createEmptyGpuState(): GpuBufferState {
  return {
    device: null,
    binBuffer: null,
    globalBuffer: null,
    binTensor: null,
    globalTensor: null,
    allocatedBoardSize: 0,
  };
}

export async function allocateGpuBuffers(
  state: GpuBufferState,
  boardSize: number,
  maxBatch: number,
  inputDataType: 'float32' | 'float16'
): Promise<void> {
  const device = (ort.env as any).webgpu?.device;
  if (!device) throw new Error('WebGPU device not available from ORT');

  state.device = device;
  const bytesPerElement = inputDataType === 'float16' ? 2 : 4;
  const dataType = inputDataType === 'float16' ? 'float16' : 'float32';
  const bufferUsage = 4 | 8 | 128; // COPY_SRC | COPY_DST | STORAGE
  const align4 = (n: number) => Math.ceil(n / 4) * 4;

  const binSize = align4(maxBatch * 22 * boardSize * boardSize * bytesPerElement);
  state.binBuffer = device.createBuffer({ size: binSize, usage: bufferUsage });
  state.binTensor = ort.Tensor.fromGpuBuffer(state.binBuffer, {
    dataType,
    dims: [maxBatch, 22, boardSize, boardSize],
  });

  const globalSize = align4(maxBatch * 19 * bytesPerElement);
  state.globalBuffer = device.createBuffer({ size: globalSize, usage: bufferUsage });
  state.globalTensor = ort.Tensor.fromGpuBuffer(state.globalBuffer, {
    dataType,
    dims: [maxBatch, 19],
  });

  console.log(
    `[OnnxEngine] GPU buffers allocated for graph capture (batch=${maxBatch}, board=${boardSize}x${boardSize})`
  );
  state.allocatedBoardSize = boardSize;
}

export function releaseGpuBuffers(state: GpuBufferState): void {
  if (state.binBuffer) {
    state.binBuffer.destroy();
    state.binBuffer = null;
  }
  if (state.globalBuffer) {
    state.globalBuffer.destroy();
    state.globalBuffer = null;
  }
  state.binTensor = null;
  state.globalTensor = null;
  state.allocatedBoardSize = 0;
}

export function uploadToGpuBuffers(
  state: GpuBufferState,
  binData: Float32Array | Uint16Array,
  globalData: Float32Array | Uint16Array
): { binTensor: ort.Tensor; globalTensor: ort.Tensor } {
  if (!state.device || !state.binBuffer || !state.globalBuffer) {
    throw new Error('GPU buffers not allocated');
  }

  const align4Write = (device: any, buffer: any, data: Float32Array | Uint16Array) => {
    const byteLen = data.byteLength;
    if (byteLen % 4 === 0) {
      device.queue.writeBuffer(buffer, 0, data.buffer, data.byteOffset, byteLen);
    } else {
      const padded = new Uint8Array(Math.ceil(byteLen / 4) * 4);
      padded.set(new Uint8Array(data.buffer, data.byteOffset, byteLen));
      device.queue.writeBuffer(buffer, 0, padded.buffer, 0, padded.byteLength);
    }
  };

  align4Write(state.device, state.binBuffer, binData);
  align4Write(state.device, state.globalBuffer, globalData);

  return { binTensor: state.binTensor!, globalTensor: state.globalTensor! };
}

/**
 * Recreate GPU buffers (and session) when board size changes in graph capture mode.
 * Returns null if no change was needed, otherwise the new session/flags to apply.
 */
export async function recreateSessionForBoardSize(
  state: GpuBufferState,
  size: number,
  inputDataType: 'float32' | 'float16',
  maxBatch: number,
  sessionOptions: ort.InferenceSession.SessionOptions,
  modelSource: { buffer?: ArrayBuffer; url?: string },
  currentSession: ort.InferenceSession | null
): Promise<{
  session: ort.InferenceSession | null;
  graphCaptureEnabled: boolean;
  useGpuInputs: boolean;
} | null> {
  if (size === state.allocatedBoardSize) return null;

  console.log(
    `[OnnxEngine] Board size changed (${state.allocatedBoardSize}→${size}), recreating session for graph capture`
  );

  releaseGpuBuffers(state);

  try {
    if (currentSession) {
      await currentSession.release();
    }

    const recreateStart = performance.now();
    let newSession: ort.InferenceSession;
    if (modelSource.buffer) {
      newSession = await ort.InferenceSession.create(modelSource.buffer, sessionOptions);
    } else if (modelSource.url) {
      newSession = await ort.InferenceSession.create(modelSource.url, sessionOptions);
    } else {
      throw new Error('No model source available');
    }

    await allocateGpuBuffers(state, size, maxBatch, inputDataType);
    const elapsed = performance.now() - recreateStart;
    console.log(
      `[OnnxEngine] Session recreated for ${size}x${size} board in ${elapsed.toFixed(0)}ms`
    );
    return { session: newSession, graphCaptureEnabled: true, useGpuInputs: true };
  } catch (e) {
    console.warn('[OnnxEngine] Session recreation failed, disabling graph capture:', e);
    return { session: currentSession, graphCaptureEnabled: false, useGpuInputs: false };
  }
}
