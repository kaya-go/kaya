/**
 * @kaya/sgf - Type definitions for SGF (Smart Game Format)
 */

// ============================================================================
// Types
// ============================================================================

/**
 * SGF Node structure matching @sabaki/immutable-gametree compatibility
 */
export interface SGFNode {
  id: number | string | null;
  data: SGFNodeData;
  parentId: number | string | null;
  children: SGFNode[];
}

/**
 * SGF properties dictionary
 * Keys are uppercase property identifiers (e.g., "B", "W", "C", "SZ")
 * Values are arrays of strings
 */
export interface SGFNodeData {
  [property: string]: string[];
}

/**
 * Token types from SGF lexer
 */
export type TokenType = 'parenthesis' | 'semicolon' | 'prop_ident' | 'c_value_type' | 'invalid';

/**
 * Token object from tokenizer
 */
export interface Token {
  type: TokenType;
  value: string;
  row: number;
  col: number;
  pos: number;
  progress: number;
}

/**
 * Options for parsing SGF
 */
export interface ParseOptions {
  /** ID generation function */
  getId?: () => number | string;
  /** Dictionary to store all nodes by ID */
  dictionary?: { [id: string]: SGFNode } | null;
  /** Progress callback (0-1) */
  onProgress?: (args: { progress: number }) => void;
  /** Node creation callback */
  onNodeCreated?: (args: { node: SGFNode }) => void;
}

/**
 * Options for stringifying SGF
 */
export interface StringifyOptions {
  /** Line break character(s) */
  linebreak?: string;
  /** Indentation string */
  indent?: string;
  /** Current indentation level (internal) */
  level?: number;
}

/**
 * Vertex coordinate [x, y]
 */
export type Vertex = [number, number];

/**
 * Game tree node structure (compatible with @kaya/gametree)
 * This version has recursive children for initial SGF parsing
 */
export interface GameTreeNodeRecursive<T> {
  id: number | string;
  data: T;
  parentId: number | string | null;
  children: GameTreeNodeRecursive<T>[];
}

/**
 * Game metadata extracted from SGF root node.
 *
 * Covers the FF[4] game-info properties plus Go's `HA` / `KM`.
 * `boardSize` / `boardHeight` come from root `SZ` and are not editable
 * through a GameInfo patch (`SZ` changes the board, not the info panel).
 */
export interface GameInfo {
  playerBlack?: string;
  playerWhite?: string;
  rankBlack?: string;
  rankWhite?: string;
  teamBlack?: string;
  teamWhite?: string;
  gameName?: string;
  eventName?: string;
  round?: string;
  komi?: number;
  handicap?: number;
  /** Board width. For a square board this is the whole story. */
  boardSize: number;
  /** Set only for a rectangular board (SGF `SZ[width:height]`). */
  boardHeight?: number;
  date?: string;
  result?: string;
  rules?: string;
  /** Main time limit in seconds (SGF `TM`). Overtime lives in `overtime`. */
  timeControl?: string;
  overtime?: string;
  place?: string;
  annotator?: string;
  source?: string;
  copyright?: string;
  user?: string;
  opening?: string;
  gameComment?: string;
}

/** Fields `updateGameInfo` may change. Absent key = leave unchanged. */
export type GameInfoMutable = Omit<GameInfo, 'boardSize' | 'boardHeight'>;

/**
 * A partial GameInfo write. `undefined` (or a missing key) leaves the SGF
 * property as-is; `null` or `''` (and handicap `0`) removes it.
 */
export type GameInfoPatch = {
  [K in keyof GameInfoMutable]?: GameInfoMutable[K] | null;
};

/** One SGF property mutation produced by `gameInfoToPropertyWrites`. */
export interface SGFPropertyWrite {
  ident: string;
  /** `null` deletes the property. */
  values: string[] | null;
}

/**
 * SGF Marker type (for board annotations)
 */
export interface SGFMarker {
  type: 'circle' | 'cross' | 'triangle' | 'square' | 'point' | 'label';
  label?: string;
}

/**
 * Internal options type with required fields (used by parser)
 */
export interface RequiredParseOptions {
  getId: () => number | string;
  dictionary: { [id: string]: SGFNode } | null;
  onProgress: (args: { progress: number }) => void;
  onNodeCreated: (args: { node: SGFNode }) => void;
}
