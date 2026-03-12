/**
 * Base AI Engine Abstraction
 *
 * This module provides the core abstraction layer for AI engines.
 * All engine implementations must implement the Engine interface.
 */

import type { SignMap } from '@kaya/goboard';
import type { AnalysisResult } from './types';

/**
 * Base configuration for all AI engines
 */
export interface BaseEngineConfig {
  /**
   * Maximum number of move suggestions to return
   * @default 10
   */
  maxMoves?: number;

  /**
   * Enable position caching to avoid recomputing the same positions
   * @default true
   */
  enableCache?: boolean;

  /**
   * Maximum number of positions to cache
   * @default 1000
   */
  maxCacheSize?: number;

  /**
   * Custom cache key generator function
   * If not provided, a default hash function will be used
   */
  cacheKeyFn?: (signMap: SignMap) => string;
}

/**
 * Analysis options that can be passed to analyze()
 */
export interface EngineAnalysisOptions {
  /**
   * Maximum number of move suggestions to return
   * Overrides the engine's default maxMoves
   */
  maxMoves?: number;

  /**
   * Force analysis even if result is cached
   * @default false
   */
  skipCache?: boolean;

  /**
   * Additional engine-specific options
   */
  [key: string]: any;
}

/**
 * Engine capabilities and metadata
 */
export interface EngineCapabilities {
  /** Name of the engine */
  name: string;

  /** Engine version */
  version: string;

  /** Supported board sizes (empty array = all sizes) */
  supportedBoardSizes: number[];

  /** Whether the engine supports multiple analyses in parallel */
  supportsParallel: boolean;

  /** Whether the engine provides principal variations */
  providesPV: boolean;

  /** Whether the engine provides win rate estimates */
  providesWinRate: boolean;

  /** Whether the engine provides score lead estimates */
  providesScoreLead: boolean;

  /** Engine-specific metadata */
  metadata?: Record<string, any>;
}

/**
 * Runtime information about the engine
 */
export interface EngineRuntimeInfo {
  /** The backend actually used */
  backend: string;
  /** Input data type (float32 or float16) */
  inputDataType: 'float32' | 'float16';
}

/**
 * Abstract base class for AI engines
 *
 * All engine implementations should extend this class and implement
 * the required abstract methods.
 */
export abstract class Engine {
  protected config: BaseEngineConfig;
  protected cache: Map<string, AnalysisResult>;
  protected initialized: boolean = false;

  constructor(config: BaseEngineConfig = {}) {
    this.config = {
      maxMoves: 10,
      enableCache: true,
      maxCacheSize: 1000,
      ...config,
    };
    this.cache = new Map();
  }

  /**
   * Initialize the engine
   * This is called before the first analysis
   * @throws Error if initialization fails
   */
  abstract initialize(): Promise<void>;

  /**
   * Perform analysis on a board position
   * This is the core method that each engine must implement
   *
   * @param signMap - Board position to analyze
   * @param options - Engine-specific analysis options
   * @returns Analysis result
   */
  protected abstract analyzePosition(
    signMap: SignMap,
    options: EngineAnalysisOptions
  ): Promise<AnalysisResult>;

  /**
   * Perform batch analysis on multiple board positions
   * Default implementation calls analyzePosition sequentially
   * Override this for optimized batch processing
   */
  async analyzeBatch(
    inputs: { signMap: SignMap; options?: EngineAnalysisOptions }[]
  ): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    for (const input of inputs) {
      results.push(await this.analyze(input.signMap, input.options));
    }
    return results;
  }

  /**
   * Get engine capabilities and metadata
   */
  abstract getCapabilities(): EngineCapabilities;

  /**
   * Get runtime information about the engine (backend used, fallbacks, etc.)
   * Override this in subclasses that support fallback detection
   */
  getRuntimeInfo(): EngineRuntimeInfo {
    return {
      backend: 'unknown',
      inputDataType: 'float32',
    };
  }

  /**
   * Cleanup resources used by the engine
   * Override this method if your engine needs cleanup
   */
  async dispose(): Promise<void> {
    this.cache.clear();
    this.initialized = false;
  }

  /**
   * Public analyze method with caching support
   *
   * @param signMap - Board position to analyze
   * @param options - Analysis options
   * @returns Analysis result (from cache or fresh analysis)
   */
  async analyze(signMap: SignMap, options: EngineAnalysisOptions = {}): Promise<AnalysisResult> {
    // Ensure engine is initialized
    if (!this.initialized) {
      await this.initialize();
      this.initialized = true;
    }

    // Validate board size
    const capabilities = this.getCapabilities();
    const boardSize = signMap.length;
    if (
      capabilities.supportedBoardSizes.length > 0 &&
      !capabilities.supportedBoardSizes.includes(boardSize)
    ) {
      throw new Error(
        `Engine ${capabilities.name} does not support board size ${boardSize}. ` +
          `Supported sizes: ${capabilities.supportedBoardSizes.join(', ')}`
      );
    }

    // Check cache if enabled
    const useCache = this.config.enableCache && !options.skipCache;
    if (useCache) {
      const cacheKey = this.getCacheKey(signMap, options);
      const cached = this.cache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Perform analysis
    const result = await this.analyzePosition(signMap, {
      maxMoves: options.maxMoves ?? this.config.maxMoves,
      ...options,
    });

    // Store in cache
    if (useCache) {
      const cacheKey = this.getCacheKey(signMap, options);
      this.cache.set(cacheKey, result);

      // Evict oldest entry if cache is full
      if (this.cache.size > (this.config.maxCacheSize ?? 1000)) {
        const firstKey = this.cache.keys().next().value;
        if (firstKey) {
          this.cache.delete(firstKey);
        }
      }
    }

    return result;
  }

  /**
   * Generate a move for the current position
   * Returns the best move as a GTP coordinate string (e.g., "D4", "Q16", "PASS")
   *
   * Default implementation uses analyze() and returns the top move suggestion.
   * Engines can override this for specialized move generation logic.
   *
   * @param signMap - Board position to generate a move for
   * @param options - Analysis options
   * @returns Move in GTP coordinate format
   */
  async generateMove(signMap: SignMap, options: EngineAnalysisOptions = {}): Promise<string> {
    const result = await this.analyze(signMap, options);
    return result.moveSuggestions[0]?.move ?? 'PASS';
  }

  /**
   * Analyze multiple positions (batch analysis)
   *
   * @param positions - Array of board positions to analyze
   * @param options - Analysis options
   * @returns Array of analysis results
   */
  async analyzeMany(
    positions: SignMap[],
    options: EngineAnalysisOptions = {}
  ): Promise<AnalysisResult[]> {
    const capabilities = this.getCapabilities();

    // If engine supports parallel analysis, override this method
    if (capabilities.supportsParallel) {
      // Default implementation: analyze sequentially
      // Subclasses can override for true parallelism
      return Promise.all(positions.map(pos => this.analyze(pos, options)));
    }

    // Sequential analysis
    const results: AnalysisResult[] = [];
    for (const position of positions) {
      results.push(await this.analyze(position, options));
    }
    return results;
  }

  /**
   * Clear the analysis cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; maxSize: number; hitRate?: number } {
    return {
      size: this.cache.size,
      maxSize: this.config.maxCacheSize ?? 1000,
    };
  }

  /**
   * Check if engine is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Generate cache key for a board position and options
   * Includes all analysis-relevant fields: signMap, nextToPlay, komi, and history
   */
  protected getCacheKey(signMap: SignMap, options: EngineAnalysisOptions = {}): string {
    if (this.config.cacheKeyFn) {
      return this.config.cacheKeyFn(signMap);
    }

    // Include all analysis-relevant fields in the cache key
    // The NN uses history as input features, so different histories produce different results
    const boardHash = this.defaultHashSignMap(signMap);
    const nextToPlay = options.nextToPlay ?? 'B';
    const komi = options.komi ?? 7.5;

    // Only include the last 5 moves of history (what the NN actually uses)
    const history = options.history || [];
    const last5Moves = history.slice(-5).map((m: any) => `${m.color}:${m.x},${m.y}`);

    const numVisits = (options as any).numVisits ?? 1;

    return JSON.stringify({
      board: boardHash,
      nextToPlay,
      komi,
      history: last5Moves,
      numVisits,
    });
  }

  /**
   * Default hash function for SignMap
   * Creates a string representation of the board state
   */
  private defaultHashSignMap(signMap: SignMap): string {
    const rows = signMap.map(row => row.join(',')).join(';');
    return `${signMap.length}:${rows}`;
  }
}

/**
 * Type guard to check if an object is an Engine
 */
export function isEngine(obj: any): obj is Engine {
  return (
    obj &&
    typeof obj.initialize === 'function' &&
    typeof obj.analyze === 'function' &&
    typeof obj.getCapabilities === 'function'
  );
}
