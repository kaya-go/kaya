import { AnalysisResult, MoveSuggestion } from '@kaya/ai-engine';
import { SGFNode, SGFNodeData, sgfToVertex } from '@kaya/sgf';
import { GameTreeNode } from '@kaya/gametree';
import { GoBoard, Sign } from '@kaya/goboard';
import { generateAnalysisCacheKey, AnalysisHistoryItem } from './aiAnalysis';
import { SGFProperty } from '../types/game';

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
    })),
  };

  if (result.visits !== undefined) {
    data.v = result.visits;
  }

  // Add quantized ownership if available
  if (result.ownership && result.ownership.length > 0) {
    data.o = encodeOwnership(result.ownership);
  }

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
    }));

    const result: AnalysisResult = {
      winRate: data.w,
      scoreLead: data.s,
      visits: data.v,
      currentTurn, // Caller must provide this as it's not stored in the JSON (inferred from node)
      moveSuggestions,
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
 * Recursively traverse the tree, reconstruct board state, and inject analysis data if found in cache.
 * Returns a new tree structure (cloned).
 */
export function injectAnalysisToTree(
  node: GameTreeNode<SGFProperty>,
  cache: Map<string, AnalysisResult>,
  board: GoBoard,
  komi: number,
  history: AnalysisHistoryItem[] = []
): GameTreeNode<SGFProperty> {
  // 1. Apply current node's move/setup to get new board state
  let newBoard = board;
  let newHistory = [...history];
  let color: Sign = 0;

  // Handle setup stones first (AB, AW, AE)
  // Setup stones change the board but don't add to move history
  // This must match updateAnalysisState behavior for cache key consistency
  if (node.data.AB || node.data.AW || node.data.AE) {
    // Clone board before modifying since we're using immutable pattern
    newBoard = newBoard.clone();
    for (const sgf of node.data.AE || []) {
      const v = sgfToVertex(sgf);
      if (v) newBoard.set(v, 0);
    }
    for (const sgf of node.data.AB || []) {
      const v = sgfToVertex(sgf);
      if (v) newBoard.set(v, 1);
    }
    for (const sgf of node.data.AW || []) {
      const v = sgfToVertex(sgf);
      if (v) newBoard.set(v, -1);
    }
  }

  // Handle moves (including pass moves)
  if (node.data.B) {
    const vertex = sgfToVertex(node.data.B[0]);
    if (vertex) {
      // Regular move - use consistent options with updateAnalysisState
      try {
        newBoard = newBoard.makeMove(1, vertex, { disableKoCheck: false });
        newHistory.push({ color: 1, x: vertex[0], y: vertex[1] });
      } catch {
        // Ignore invalid moves
      }
    } else if (node.data.B[0] !== undefined) {
      // Pass move (empty string -> null from sgfToVertex)
      newHistory.push({ color: 1, x: -1, y: -1 });
    }
    color = 1;
  } else if (node.data.W) {
    const vertex = sgfToVertex(node.data.W[0]);
    if (vertex) {
      // Regular move - use consistent options with updateAnalysisState
      try {
        newBoard = newBoard.makeMove(-1, vertex, { disableKoCheck: false });
        newHistory.push({ color: -1, x: vertex[0], y: vertex[1] });
      } catch {
        // Ignore invalid moves
      }
    } else if (node.data.W[0] !== undefined) {
      // Pass move (empty string -> null from sgfToVertex)
      newHistory.push({ color: -1, x: -1, y: -1 });
    }
    color = -1;
  }

  // 2. Determine next player
  // If Black played, next is White (-1). If White played, next is Black (1).
  // If no move (setup or root), default to Black (1) unless specified?
  // KataGo usually assumes Black to play if not specified, or we can infer.
  // For analysis cache key, we need to match what was used during analysis.
  // In `AIAnalysisOverlay`, `nextToPlay` is derived from `currentBoard` and `gameInfo`.

  let nextToPlay: 'B' | 'W' = 'B';
  if (color === 1) nextToPlay = 'W';
  else if (color === -1) nextToPlay = 'B';
  else {
    // If no move, check PL property first
    if (node.data.PL && node.data.PL[0]) {
      nextToPlay = node.data.PL[0] === 'W' ? 'W' : 'B';
    } else if (node.data.HA && parseInt(node.data.HA[0]) >= 2) {
      // Handicap game: White plays first after Black setup stones
      nextToPlay = 'W';
    }
    // Else default to Black
  }

  // 3. Generate cache key and look up analysis
  const cacheKey = generateAnalysisCacheKey(newBoard.signMap, nextToPlay, komi, newHistory);
  const analysis = cache.get(cacheKey);

  // 4. Clone node data and inject analysis if found
  let newData = { ...node.data };

  // Always remove existing analysis property to ensure we don't persist stale data
  // from the original tree (which serves as the "clean" state)
  delete newData[KAYA_ANALYSIS_PROPERTY];

  if (analysis) {
    newData = injectAnalysisToNodeData(newData, analysis);
  }

  // 5. Recurse for children
  const newChildren = node.children.map(child =>
    injectAnalysisToTree(child, cache, newBoard, komi, newHistory)
  );

  return {
    ...node,
    data: newData,
    children: newChildren,
  };
}

/**
 * Generic tree node interface for extraction (compatible with both SGFNode and GameTreeNode)
 */
interface ExtractableNode {
  data: SGFNodeData;
  children: ExtractableNode[];
}

/**
 * Recursively traverse the SGF tree, reconstruct board state, extract analysis data, and populate cache.
 * Returns the number of positions with analysis data found.
 * Works with both SGFNode and GameTreeNode<SGFProperty> since they have the same structure.
 */
export function extractAnalysisFromTree(
  node: ExtractableNode,
  cache: Map<string, AnalysisResult>,
  board: GoBoard,
  komi: number,
  history: AnalysisHistoryItem[] = []
): number {
  let extractedCount = 0;

  // 1. Apply current node's move/setup (including pass moves)
  let newBoard = board;
  let newHistory = [...history];
  let color: Sign = 0;

  // Handle setup stones first (AE first, then AB, AW)
  // Setup stones change the board but don't add to move history
  // This must match updateAnalysisState behavior for cache key consistency
  if (node.data.AB || node.data.AW || node.data.AE) {
    // Clone board before modifying since we're using immutable pattern
    newBoard = newBoard.clone();
    for (const sgf of node.data.AE || []) {
      const v = sgfToVertex(sgf);
      if (v) newBoard.set(v, 0);
    }
    for (const sgf of node.data.AB || []) {
      const v = sgfToVertex(sgf);
      if (v) newBoard.set(v, 1);
    }
    for (const sgf of node.data.AW || []) {
      const v = sgfToVertex(sgf);
      if (v) newBoard.set(v, -1);
    }
  }

  if (node.data.B) {
    const vertex = sgfToVertex(node.data.B[0]);
    if (vertex) {
      // Regular move - use consistent options with updateAnalysisState
      try {
        newBoard = newBoard.makeMove(1, vertex, { disableKoCheck: false });
        newHistory.push({ color: 1, x: vertex[0], y: vertex[1] });
      } catch {
        // Ignore invalid moves
      }
    } else if (node.data.B[0] !== undefined) {
      // Pass move (empty string -> null from sgfToVertex)
      newHistory.push({ color: 1, x: -1, y: -1 });
    }
    color = 1;
  } else if (node.data.W) {
    const vertex = sgfToVertex(node.data.W[0]);
    if (vertex) {
      // Regular move - use consistent options with updateAnalysisState
      try {
        newBoard = newBoard.makeMove(-1, vertex, { disableKoCheck: false });
        newHistory.push({ color: -1, x: vertex[0], y: vertex[1] });
      } catch {
        // Ignore invalid moves
      }
    } else if (node.data.W[0] !== undefined) {
      // Pass move (empty string -> null from sgfToVertex)
      newHistory.push({ color: -1, x: -1, y: -1 });
    }
    color = -1;
  }

  // 2. Determine next player
  // Match the logic in updateAnalysisState for cache key consistency
  let nextToPlay: 'B' | 'W' = 'B';
  if (color === 1) nextToPlay = 'W';
  else if (color === -1) nextToPlay = 'B';
  else if (node.data.PL && node.data.PL[0]) {
    nextToPlay = node.data.PL[0] === 'W' ? 'W' : 'B';
  } else if (node.data.HA && parseInt(node.data.HA[0]) >= 2) {
    // Handicap game: White plays first after Black setup stones
    nextToPlay = 'W';
  }

  // 3. Check for analysis property
  if (node.data[KAYA_ANALYSIS_PROPERTY] && node.data[KAYA_ANALYSIS_PROPERTY][0]) {
    const json = node.data[KAYA_ANALYSIS_PROPERTY][0];
    const analysis = parseAnalysis(json, nextToPlay);

    if (analysis) {
      const cacheKey = generateAnalysisCacheKey(newBoard.signMap, nextToPlay, komi, newHistory);
      cache.set(cacheKey, analysis);
      extractedCount++;
    }
  }

  // 4. Recurse
  for (const child of node.children) {
    extractedCount += extractAnalysisFromTree(child, cache, newBoard, komi, newHistory);
  }

  return extractedCount;
}
