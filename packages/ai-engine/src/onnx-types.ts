import type { BaseEngineConfig } from './base-engine';

/** Node in the MCTS search tree */
export interface MCTSNode {
  N: number; // visit count
  W: number; // cumulative value (sum of Black's winrate)
  P: number; // prior probability (from parent's NN policy)
  children: Map<string, MCTSNode> | null;
  expanded: boolean;
  virtualLoss: number; // in-flight evaluations passing through this node
}

export interface OnnxEngineConfig extends BaseEngineConfig {
  /** ArrayBuffer of the ONNX model */
  modelBuffer?: ArrayBuffer;

  /** URL to the ONNX model */
  modelUrl?: string;

  /** Execution providers to try (default: ['webgpu', 'wasm']) */
  executionProviders?: string[];

  /** Number of threads for WASM backend (default: 4) */
  numThreads?: number;

  /** Path to WASM files (default: '/wasm/') */
  wasmPath?: string;

  /** Enable verbose debug logging */
  debug?: boolean;

  /**
   * Enable WebGPU graph capture for static-shape models.
   * Captures all GPU dispatches in the first run and replays them, eliminating per-op overhead.
   * Requires ALL model ops to run on WebGPU EP (use a WebGPU-converted model).
   */
  enableGraphCapture?: boolean;

  /**
   * Static batch size of the model (e.g., 1 for static-b1 models).
   * When set, inference will chunk inputs to this batch size.
   * Auto-detected from model metadata when possible.
   */
  staticBatchSize?: number;

  /**
   * Board size to use for WebNN freeDimensionOverrides (default: 19).
   * Must match the actual board being analyzed. Engine is re-created when this changes.
   */
  boardSize?: number;
}
