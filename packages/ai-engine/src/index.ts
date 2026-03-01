/**
 * @kaya/ai-engine - AI Engine for Go Game Analysis
 *
 * This package provides AI-powered analysis for Go games using KataGo models.
 *
 * Architecture:
 * - Abstract Engine base class for all AI implementations
 * - OnnxEngine: KataGo neural network via ONNX Runtime Web (WASM/WebGPU)
 * - TauriEngine: Native ONNX Runtime via Tauri with GPU support (CUDA/CoreML/DirectML)
 *   NOTE: TauriEngine must be imported separately from '@kaya/ai-engine/tauri-engine'
 *   to avoid loading Tauri dependencies in web workers
 * - Built-in position caching for performance
 *
 * Usage (Web):
 * ```typescript
 * import { OnnxEngine } from '@kaya/ai-engine';
 *
 * const engine = new OnnxEngine({ modelBuffer });
 * await engine.initialize();
 * const result = await engine.analyze(signMap, { maxMoves: 10 });
 * ```
 *
 * Usage (Desktop with Tauri):
 * ```typescript
 * // Import TauriEngine from the separate subpath to avoid worker issues
 * import { TauriEngine, isTauriEnvironment } from '@kaya/ai-engine/tauri-engine';
 *
 * if (isTauriEnvironment()) {
 *   const engine = new TauriEngine({ modelPath: '/path/to/model.onnx' });
 *   await engine.initialize();
 *   const result = await engine.analyze(signMap);
 * }
 * ```
 *
 * @packageDocumentation
 */

// Core abstractions
export {
  Engine,
  isEngine,
  type BaseEngineConfig,
  type EngineAnalysisOptions,
  type EngineCapabilities,
  type EngineRuntimeInfo,
} from './base-engine';

// Engine implementations
// NOTE: TauriEngine is NOT exported here to avoid loading Tauri deps in workers
// Import it from '@kaya/ai-engine/tauri-engine' instead
export { OnnxEngine, type OnnxEngineConfig } from './onnx-engine';

// Types
export type { MoveSuggestion, AnalysisResult, AnalysisOptions, EngineConfig } from './types';
export * from './types';

// Utilities
export * from './analysis-utils';
export * from './sgf-utils';
export * from './webgpu-converter';
export * from './webnn-converter';

// High-level APIs
export * from './analyze';

// Performance Report
export * from './performance-types';
export * from './performance-report';

// GTP Protocol (Go Text Protocol)
export * from './gtp';
