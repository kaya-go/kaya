import * as ort from 'onnxruntime-web/all';
import type { Sign } from '@kaya/goboard';
import type { AnalysisResult, MoveSuggestion } from './types';

/**
 * Convert Float32Array to Float16 (stored as Uint16Array).
 * Uses the standard IEEE 754 half-precision format.
 */
export function float32ToFloat16(float32Array: Float32Array): Uint16Array {
  const float16Array = new Uint16Array(float32Array.length);
  const view = new DataView(new ArrayBuffer(4));

  for (let i = 0; i < float32Array.length; i++) {
    const val = float32Array[i];
    view.setFloat32(0, val, true);
    const f32 = view.getUint32(0, true);

    // Extract components from float32
    const sign = (f32 >>> 31) & 0x1;
    const exp = (f32 >>> 23) & 0xff;
    const frac = f32 & 0x7fffff;

    let f16: number;
    if (exp === 0) {
      // Zero or denormalized - map to zero in fp16
      f16 = sign << 15;
    } else if (exp === 255) {
      // Infinity or NaN
      f16 = (sign << 15) | 0x7c00 | (frac ? 0x200 : 0);
    } else {
      // Normalized number
      const newExp = exp - 127 + 15;
      if (newExp >= 31) {
        // Overflow to infinity
        f16 = (sign << 15) | 0x7c00;
      } else if (newExp <= 0) {
        // Underflow to zero or denorm
        if (newExp >= -10) {
          // Denormalized
          const mant = (frac | 0x800000) >> (1 - newExp + 13);
          f16 = (sign << 15) | (mant >> 10);
        } else {
          f16 = sign << 15;
        }
      } else {
        // Normal case
        f16 = (sign << 15) | (newExp << 10) | (frac >> 13);
      }
    }
    float16Array[i] = f16;
  }
  return float16Array;
}

/**
 * Create an ONNX tensor with the appropriate data type for the model.
 */
export function createTensor(
  data: Float32Array,
  dims: readonly number[],
  inputDataType: 'float32' | 'float16'
): ort.Tensor {
  if (inputDataType === 'float16') {
    const float16Data = float32ToFloat16(data);
    return new ort.Tensor('float16', float16Data, dims);
  }
  return new ort.Tensor('float32', data, dims);
}

export function validateTensorData(
  buffer: Float32Array,
  label: string,
  debugEnabled: boolean
): void {
  if (!debugEnabled) return;
  for (let i = 0; i < buffer.length; i++) {
    const value = buffer[i];
    if (!Number.isFinite(value)) {
      throw new Error(`[OnnxEngine] Invalid ${label} value at index ${i}: ${value}`);
    }
  }
}

export function debugLog(
  debugEnabled: boolean,
  message: string,
  payload?: Record<string, unknown>
): void {
  if (!debugEnabled) return;
  if (payload) {
    console.log('[AI:Onnx][debug]', message, payload);
  } else {
    console.log('[AI:Onnx][debug]', message);
  }
}

export function disposeTensors(results: ort.InferenceSession.ReturnType): void {
  for (const key of Object.keys(results)) {
    try {
      results[key]?.dispose?.();
    } catch {
      // Ignore
    }
  }
}

/**
 * Process batch inference results into AnalysisResult array.
 */
export async function processBatchResults(
  results: ort.InferenceSession.ReturnType,
  plas: Sign[],
  size: number,
  batchSize: number
): Promise<AnalysisResult[]> {
  const getData = async (tensor: ort.Tensor): Promise<Float32Array> => {
    if (typeof tensor.getData === 'function') {
      try {
        return (await tensor.getData()) as Float32Array;
      } catch {
        return tensor.data as Float32Array;
      }
    }
    return tensor.data as Float32Array;
  };

  const [policyData, valueData, miscvalueData, ownershipData] = await Promise.all([
    getData(results.policy),
    getData(results.value),
    getData(results.miscvalue),
    results.ownership ? getData(results.ownership) : Promise.resolve(undefined),
  ]);

  // Capture dims before disposing tensors (dims may be inaccessible after dispose on GPU)
  const policyDims = results.policy.dims;
  const valueDims = results.value.dims;
  const miscvalueDims = results.miscvalue.dims;

  disposeTensors(results);

  const numPolicyHeads = policyDims.length === 3 ? Number(policyDims[1]) : 1;
  const numMoves = policyDims.length === 3 ? Number(policyDims[2]) : Number(policyDims[1]);
  const policyStride = numPolicyHeads * numMoves;
  const valueStride = valueDims.length > 1 ? Number(valueDims[1]) : 3;
  const miscvalueStride = miscvalueDims.length > 1 ? Number(miscvalueDims[1]) : 10;
  const ownershipStride = size * size;

  const analysisResults: AnalysisResult[] = [];
  const letters = 'ABCDEFGHJKLMNOPQRST';

  for (let b = 0; b < batchSize; b++) {
    const pla = plas[b];

    // Extract data for this batch item
    const policy = policyData.subarray(b * policyStride, b * policyStride + numMoves);
    const value = valueData.subarray(b * valueStride, (b + 1) * valueStride);
    const miscvalue = miscvalueData.subarray(b * miscvalueStride, (b + 1) * miscvalueStride);
    const ownership = ownershipData
      ? ownershipData.subarray(b * ownershipStride, (b + 1) * ownershipStride)
      : undefined;

    // Win rate from value head (from current player's perspective)
    const expValue = [Math.exp(value[0]), Math.exp(value[1]), Math.exp(value[2])];
    const sumValue = expValue[0] + expValue[1] + expValue[2];
    const winrateCurrentPlayer = expValue[0] / sumValue;

    // Convert to Black's perspective: if Black to play, keep as-is; if White to play, flip
    const blackWinrate = pla === 1 ? winrateCurrentPlayer : 1 - winrateCurrentPlayer;

    // Score values from miscvalue head (from current player's perspective)
    // miscvalue[0] = scoreMean, miscvalue[1] = scoreStdev (pre-softplus), miscvalue[2] = lead
    const leadCurrentPlayer = miscvalue[2] * 20.0;

    // Convert lead to Black's perspective
    const blackLead = leadCurrentPlayer * pla;

    // Policy softmax
    let maxLogit = -Infinity;
    for (let i = 0; i < numMoves; i++) {
      if (policy[i] > maxLogit) maxLogit = policy[i];
    }

    const probs = new Float32Array(numMoves);
    let sumProbs = 0;
    for (let i = 0; i < numMoves; i++) {
      probs[i] = Math.exp(policy[i] - maxLogit);
      sumProbs += probs[i];
    }
    for (let i = 0; i < numMoves; i++) probs[i] /= sumProbs;

    // Top moves
    const indices = Array.from({ length: numMoves }, (_, i) => i);
    indices.sort((a, b) => probs[b] - probs[a]);

    const moveSuggestions: MoveSuggestion[] = [];
    for (let i = 0; i < 10; i++) {
      const idx = indices[i];
      const prob = probs[idx];
      let moveStr = '';

      if (idx === size * size) {
        moveStr = 'PASS';
      } else {
        const y = Math.floor(idx / size);
        const x = idx % size;
        moveStr = `${letters[x]}${size - y}`;
      }

      moveSuggestions.push({ move: moveStr, probability: prob });
    }

    analysisResults.push({
      moveSuggestions,
      // Winrate from Black's perspective
      winRate: blackWinrate,
      // Score lead from Black's perspective (positive = Black ahead)
      scoreLead: blackLead,
      currentTurn: pla === 1 ? 'B' : 'W',
      ownership: ownership ? Array.from(ownership).map(v => v * pla) : undefined,
    });
  }

  return analysisResults;
}
