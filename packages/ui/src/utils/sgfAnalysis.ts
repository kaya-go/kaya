import { ANALYSIS_ENGINE_VERSION, type AnalysisResult, type MoveSuggestion } from '@kaya/ai-engine';
import type { SGFNodeData } from '@kaya/sgf';
import type { GameTree, GameTreeNode } from '@kaya/gametree';
import {
  analysisCacheKey,
  analysisCacheKeyAt,
  reconstructAnalysisState,
  type BoardDimensions,
} from './gameCache';
import type { SGFProperty } from '../types/game';

/**
 * Kaya Analysis Data Structure (JSON format for SGF)
 * Short keys to minimize file size.
 */
export interface KayaAnalysisData {
  /** Win Rate (0.0 to 1.0) */
  w: number;
  /** Score Lead (points, + for Black) */
  s: number;
  /** Visits (total simulations) - Optional for raw NN */
  v?: number;
  /** Moves (Suggestions) */
  m: Array<{
    /** Move coordinate (e.g., "Q16") */
    m: string;
    /** Probability (Policy) */
    p: number;
    /** Win Rate for this move (Optional) */
    w?: number;
    /** Score Lead for this move (Optional) */
    s?: number;
    /** Visits for this move (Optional) */
    v?: number;
  }>;
  /** Ownership (Optional: Compressed string) */
  o?: string;
  /**
   * ANALYSIS_ENGINE_VERSION that computed the values. Absent: 1, every KA
   * saved before 0.4.19.
   */
  e?: number;
}

/**
 * Property key for Kaya Analysis
 */
export const KAYA_ANALYSIS_PROPERTY = 'KA';

/**
 * Simple quantization and base64-like encoding for ownership maps.
 * 64 chars allows mapping -1..1 to 0..63 steps (approx 0.03 resolution)
 */
const OWNERSHIP_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+$';

/**
 * Encode ownership float array to compressed string
 */
function encodeOwnership(ownership: number[]): string {
  let result = '';
  // Simple RLE could be added, but just compact string is already ~10x smaller than JSON array
  for (const val of ownership) {
    // Map -1..1 to 0..63
    // val + 1 -> 0..2
    // * 31.5 -> 0..63
    const quantized = Math.floor((Math.max(-1, Math.min(1, val)) + 1) * 31.5);
    result += OWNERSHIP_CHARS[quantized] || '0';
  }
  return result;
}

/**
 * Decode compressed string to ownership float array
 */
function decodeOwnership(encoded: string): number[] {
  const result: number[] = [];
  for (let i = 0; i < encoded.length; i++) {
    const char = encoded[i];
    const index = OWNERSHIP_CHARS.indexOf(char);
    if (index === -1) {
      result.push(0); // Default to neutral if invalid char
      continue;
    }
    // Map 0..63 back to -1..1
    // / 31.5 -> 0..2
    // - 1 -> -1..1
    const val = index / 31.5 - 1;
    result.push(val);
  }
  return result;
}

/**
 * Serialize AnalysisResult to compressed JSON string
 */
export function serializeAnalysis(result: AnalysisResult): string {
  const data: KayaAnalysisData = {
    w: Number(result.winRate.toFixed(4)),
    s: Number(result.scoreLead.toFixed(2)),
    m: result.moveSuggestions.map(move => ({
      m: move.move,
      p: Number(move.probability.toFixed(4)),
      ...(move.winRate != null ? { w: Number(move.winRate.toFixed(4)) } : {}),
      ...(move.scoreLead != null ? { s: Number(move.scoreLead.toFixed(2)) } : {}),
      ...(move.visits != null ? { v: move.visits } : {}),
    })),
  };

  if (result.visits !== undefined) {
    data.v = result.visits;
  }

  // Add quantized ownership if available
  if (result.ownership && result.ownership.length > 0) {
    data.o = encodeOwnership(result.ownership);
  }

  // Analysis read from an older file keeps its version: saving it again must
  // not pass its values for this engine's.
  data.e = result.engineVersion ?? ANALYSIS_ENGINE_VERSION;

  return JSON.stringify(data);
}

/**
 * Parse compressed JSON string to AnalysisResult
 */
export function parseAnalysis(json: string, currentTurn: 'B' | 'W'): AnalysisResult | null {
  try {
    const data: KayaAnalysisData = JSON.parse(json);

    const moveSuggestions: MoveSuggestion[] = data.m.map(m => ({
      move: m.m,
      probability: m.p,
      ...(m.w != null ? { winRate: m.w } : {}),
      ...(m.s != null ? { scoreLead: m.s } : {}),
      ...(m.v != null ? { visits: m.v } : {}),
    }));

    const result: AnalysisResult = {
      winRate: data.w,
      scoreLead: data.s,
      visits: data.v,
      currentTurn, // Caller must provide this as it's not stored in the JSON (inferred from node)
      moveSuggestions,
      // Shown, but answers a request only when this engine version wrote it.
      engineVersion: data.e ?? 1,
    };

    // Restore ownership if present
    if (data.o) {
      result.ownership = decodeOwnership(data.o);
    }

    return result;
  } catch (e) {
    console.warn('Failed to parse Kaya Analysis data:', e);
    return null;
  }
}

/**
 * Inject analysis data into an SGF node data object (mutates the object or returns new one)
 * Note: This modifies the data object directly.
 */
export function injectAnalysisToNodeData(data: SGFNodeData, analysis: AnalysisResult): SGFNodeData {
  const newData = { ...data };
  newData[KAYA_ANALYSIS_PROPERTY] = [serializeAnalysis(analysis)];
  return newData;
}

/**
 * Copy of the tree with each node's `KA` taken from the analysis cache, or
 * dropped when the cache holds nothing for its position, so stale analysis in
 * the tree is never written back.
 *
 * Every position comes from the position cache, as live and full-game analysis
 * build theirs: the key a result was stored under is the key it is looked up
 * by, whatever the board shape, the setup nodes or the side to play.
 */
export function injectAnalysisToTree(
  tree: GameTree<SGFProperty>,
  cache: Map<string, AnalysisResult>,
  dimensions: BoardDimensions,
  komi: number
): GameTreeNode<SGFProperty> {
  const inject = (node: GameTreeNode<SGFProperty>): GameTreeNode<SGFProperty> => {
    let data: SGFNodeData = { ...node.data };
    delete data[KAYA_ANALYSIS_PROPERTY];

    const analysis = cache.get(analysisCacheKeyAt(tree, node.id, dimensions, komi));
    if (analysis) data = injectAnalysisToNodeData(data, analysis);

    return { ...node, data, children: node.children.map(inject) };
  };
  return inject(tree.root);
}

/**
 * Read the `KA` analysis stored in a tree into the analysis cache, under the
 * key of each node's position (see injectAnalysisToTree). Returns the number of
 * positions read.
 */
export function extractAnalysisFromTree(
  tree: GameTree<SGFProperty>,
  cache: Map<string, AnalysisResult>,
  dimensions: BoardDimensions,
  komi: number
): number {
  let extractedCount = 0;

  for (const node of tree.listNodes()) {
    const json = node.data[KAYA_ANALYSIS_PROPERTY]?.[0];
    if (!json) continue;

    const state = reconstructAnalysisState(tree, node.id, dimensions);
    const analysis = parseAnalysis(json, state.nextToPlay);
    if (!analysis) continue;

    cache.set(analysisCacheKey(state, komi), analysis);
    extractedCount++;
  }

  return extractedCount;
}
