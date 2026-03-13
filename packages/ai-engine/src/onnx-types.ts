import type { GoBoard, Sign } from '@kaya/goboard';
import type { BaseEngineConfig } from './base-engine';
import type { AnalysisResult } from './types';

/** Node in the MCTS search tree */
export interface MCTSNode {
  N: number; // visit count
  W: number; // cumulative value (sum of Black's winrate)
  S: number; // cumulative score lead (sum of score estimates)
  P: number; // prior probability (from parent's NN policy)
  children: Map<string, MCTSNode> | null;
  expanded: boolean;
  virtualLoss: number; // in-flight evaluations passing through this node
}

/** Batch evaluator for MCTS: evaluates multiple leaf positions in one call. */
export type MCTSBatchEvaluator = (
  leaves: Array<{
    board: GoBoard;
    pla: Sign;
    komi: number;
    history: { color: Sign; x: number; y: number }[];
  }>
) => Promise<AnalysisResult[]>;

/** Progress update emitted during MCTS search. */
export interface MCTSProgress {
  completedVisits: number;
  totalVisits: number;
  bestMove: string;
  bestMoveVisits: number;
  winRate: number;
  scoreLead: number;
  topMoves: Array<{ move: string; visits: number; winRate: number; scoreLead: number }>;
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
