/**
 * WebGPU Model Converter
 *
 * Automatically converts ONNX models for optimal WebGPU execution:
 * 1. Makes batch dimension static (required for graph capture)
 * 2. Decomposes unsupported ops (Softplus, LogSoftmax) into GPU-supported equivalents
 *
 * This runs entirely in the browser using protobufjs (already bundled with onnxruntime-web).
 * No Python or external tools required.
 */

import { getRoot, ONNX_FLOAT, ONNX_FLOAT16 } from './webgpu-converter-schema';

/**
 * Default batch size for WebGPU graph capture.
 * Larger batches amortize GPU↔CPU sync overhead (~80ms) over more positions.
 * batch=8: ~12ms/pos in batch analysis vs ~100ms/pos with batch=1.
 */
export const WEBGPU_BATCH_SIZE = 8;

/** Result of model conversion */
export interface ConversionResult {
  buffer: ArrayBuffer;
  wasConverted: boolean;
  changes: string[];
  batchSize: number;
}

/**
 * Check if an ONNX model needs WebGPU conversion.
 * Returns the list of issues found (empty = already optimized).
 */
export function checkModelNeedsConversion(modelBuffer: ArrayBuffer): string[] {
  const bytes = new Uint8Array(modelBuffer);
  const issues: string[] = [];

  // Quick binary scan for unsupported op names
  const scanFor = (opName: string): boolean => {
    const opBytes = new TextEncoder().encode(opName);
    for (let i = 0; i < bytes.length - opBytes.length; i++) {
      let match = true;
      for (let j = 0; j < opBytes.length; j++) {
        if (bytes[i + j] !== opBytes[j]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }
    return false;
  };

  if (scanFor('Softplus')) issues.push('Has Softplus ops (unsupported on WebGPU)');
  if (scanFor('LogSoftmax')) issues.push('Has LogSoftmax ops (unsupported on WebGPU)');

  return issues;
}

/**
 * Check if a model filename indicates it's already WebGPU-optimized.
 */
export function isWebGPUOptimized(modelName: string): boolean {
  return modelName.includes('.webgpu.');
}

/**
 * Convert an ONNX model for optimal WebGPU execution.
 *
 * Performs two transformations:
 * 1. Makes batch dimension static (default batch=8) for graph capture
 * 2. Decomposes Softplus/LogSoftmax into GPU-supported equivalents
 *
 * Works with both FP32 and FP16 models. No external tools needed.
 *
 * @param modelBuffer - Raw ONNX model bytes
 * @param options - Conversion options
 * @param options.batchSize - Static batch size (default: WEBGPU_BATCH_SIZE=8).
 *   Larger batches amortize GPU sync overhead for batch analysis.
 */
export async function convertModelForWebGPU(
  modelBuffer: ArrayBuffer,
  options?: { batchSize?: number }
): Promise<ConversionResult> {
  const batchSize = options?.batchSize ?? WEBGPU_BATCH_SIZE;
  const root = getRoot();
  const ModelProto = root.lookupType('onnx.ModelProto');

  console.log('[WebGPU Converter] Parsing model...');
  const startTime = performance.now();

  // Decode the model
  const model = ModelProto.decode(new Uint8Array(modelBuffer)) as any;
  const graph = model.graph;
  if (!graph) throw new Error('Model has no graph');

  const changes: string[] = [];

  // Detect model data type from first input
  let isFp16 = false;
  if (graph.input?.length > 0) {
    const elemType = graph.input[0]?.type?.tensorType?.elemType;
    if (elemType === ONNX_FLOAT16) isFp16 = true;
  }

  // Step 1: Make batch dimension static
  const makeStatic = (valueInfos: any[], label: string) => {
    if (!valueInfos) return;
    for (const vi of valueInfos) {
      const dims = vi.type?.tensorType?.shape?.dim;
      if (!dims || dims.length === 0) continue;
      const firstDim = dims[0];
      if (firstDim.dimParam || !firstDim.dimValue || Number(firstDim.dimValue) <= 0) {
        const oldVal = firstDim.dimParam || String(firstDim.dimValue || '?');
        firstDim.dimValue = batchSize;
        delete firstDim.dimParam;
        changes.push(`${label} ${vi.name}: batch ${oldVal} → ${batchSize}`);
      }
    }
  };

  makeStatic(graph.input, 'input');
  makeStatic(graph.output, 'output');
  makeStatic(graph.valueInfo, 'value_info');

  // Step 2: Replace unsupported ops
  const newNodes: any[] = [];
  const newValueInfos: any[] = [];
  let softplusCount = 0;
  let logsoftmaxCount = 0;

  // Create constant "1.0" initializer for Softplus decomposition
  const oneName = '__webgpu_const_one';
  const oneBytes = new Uint8Array(isFp16 ? 2 : 4);
  if (isFp16) {
    // FP16 encoding of 1.0 = 0x3C00
    oneBytes[0] = 0x00;
    oneBytes[1] = 0x3c;
  } else {
    // FP32 encoding of 1.0
    new DataView(oneBytes.buffer).setFloat32(0, 1.0, true);
  }

  let needsOneConst = false;

  for (const node of graph.node) {
    if (node.opType === 'Softplus') {
      // Softplus(x) = Relu(x) + Log(1 + Exp(-Abs(x)))
      const x = node.input[0];
      const y = node.output[0];
      const p = `__sp_${softplusCount}`;

      newNodes.push(
        { input: [x], output: [`${p}_abs`], opType: 'Abs' },
        { input: [`${p}_abs`], output: [`${p}_neg`], opType: 'Neg' },
        { input: [`${p}_neg`], output: [`${p}_exp`], opType: 'Exp' },
        { input: [`${p}_exp`, oneName], output: [`${p}_add1`], opType: 'Add' },
        { input: [`${p}_add1`], output: [`${p}_log`], opType: 'Log' },
        { input: [x], output: [`${p}_relu`], opType: 'Relu' },
        { input: [`${p}_relu`, `${p}_log`], output: [y], opType: 'Add' }
      );

      // Add value_info for intermediates (copy shape from input if available)
      const srcVi = [...(graph.valueInfo || []), ...(graph.input || [])].find(
        (vi: any) => vi.name === x
      );
      if (srcVi?.type) {
        for (const name of [
          `${p}_abs`,
          `${p}_neg`,
          `${p}_exp`,
          `${p}_add1`,
          `${p}_log`,
          `${p}_relu`,
        ]) {
          newValueInfos.push({
            name,
            type: JSON.parse(JSON.stringify(srcVi.type)),
          });
        }
      }

      softplusCount++;
      needsOneConst = true;
    } else if (node.opType === 'LogSoftmax') {
      // LogSoftmax(x) = Log(Softmax(x))
      const x = node.input[0];
      const y = node.output[0];
      const p = `__ls_${logsoftmaxCount}`;

      // Preserve axis attribute
      const attrs = node.attribute?.filter((a: any) => a.name === 'axis') || [];

      newNodes.push(
        { input: [x], output: [`${p}_sm`], opType: 'Softmax', attribute: attrs },
        { input: [`${p}_sm`], output: [y], opType: 'Log' }
      );

      const srcVi = [...(graph.valueInfo || []), ...(graph.input || [])].find(
        (vi: any) => vi.name === x
      );
      if (srcVi?.type) {
        newValueInfos.push({
          name: `${p}_sm`,
          type: JSON.parse(JSON.stringify(srcVi.type)),
        });
      }

      logsoftmaxCount++;
    } else {
      newNodes.push(node);
    }
  }

  if (softplusCount > 0) {
    changes.push(`Replaced ${softplusCount} Softplus ops`);
  }
  if (logsoftmaxCount > 0) {
    changes.push(`Replaced ${logsoftmaxCount} LogSoftmax ops`);
  }

  // Add constant initializer if needed
  if (needsOneConst) {
    if (!graph.initializer) graph.initializer = [];
    graph.initializer.push({
      dims: [],
      dataType: isFp16 ? ONNX_FLOAT16 : ONNX_FLOAT,
      rawData: oneBytes,
      name: oneName,
    });
  }

  // Update graph
  graph.node = newNodes;
  if (newValueInfos.length > 0) {
    if (!graph.valueInfo) graph.valueInfo = [];
    graph.valueInfo.push(...newValueInfos);
  }

  // Encode back
  const encoded = ModelProto.encode(model).finish();
  const elapsed = performance.now() - startTime;

  const origMB = (modelBuffer.byteLength / 1024 / 1024).toFixed(1);
  const newMB = (encoded.byteLength / 1024 / 1024).toFixed(1);
  console.log(
    `[WebGPU Converter] Done in ${elapsed.toFixed(0)}ms: ${origMB}MB → ${newMB}MB, ` +
      `${changes.length} changes (${graph.node.length} ops)`
  );

  return {
    buffer: encoded.buffer.slice(
      encoded.byteOffset,
      encoded.byteOffset + encoded.byteLength
    ) as ArrayBuffer,
    wasConverted: changes.length > 0,
    changes,
    batchSize,
  };
}

/**
 * Create ORT session options optimized for WebGPU execution.
 */
export function getWebGPUSessionOptions(
  enableGraphCapture: boolean = true
): Record<string, unknown> {
  return {
    executionProviders: ['webgpu'],
    graphOptimizationLevel: 'all',
    enableGraphCapture,
    preferredOutputLocation: 'gpu-buffer',
    executionMode: 'sequential',
  };
}
