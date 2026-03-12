/**
 * AI Engine Types
 */

/**
 * Represents a move suggestion from the AI
 */
export interface MoveSuggestion {
  /** Move coordinate in GTP format (e.g., "D4", "Q16") */
  move: string;
  /** Policy network probability (0.0 to 1.0) */
  probability: number;
  /** Win rate for this move (0.0 to 1.0, from Black's perspective) — available after MCTS */
  winRate?: number;
  /** Score lead for this move (positive = Black leads) — available after MCTS */
  scoreLead?: number;
}

/**
 * Analysis result for a board position
 */
export interface AnalysisResult {
  /** Ordered list of move suggestions (best moves first) */
  moveSuggestions: MoveSuggestion[];
  /** Black's win rate (0.0 to 1.0), always from Black's perspective */
  winRate: number;
  /** Overall score lead estimate (Positive = Black leads, Negative = White leads) */
  scoreLead: number;
  /** Current turn ('B' for Black, 'W' for White) */
  currentTurn: 'B' | 'W';
  /** Total visits/simulations performed */
  visits?: number;
  /** Ownership map (size*size array, values -1 to 1 from Black's perspective) */
  ownership?: number[];
}

/**
 * Analysis configuration options
 */
export interface AnalysisOptions {
  /** Maximum number of visits/simulations */
  maxVisits?: number;
  /** Maximum time in seconds */
  maxTime?: number;
  /** Number of top moves to analyze */
  numMoves?: number;
  /** Include principal variations in results */
  includePv?: boolean;
}

/**
 * AI Engine configuration
 */
export interface EngineConfig {
  /** Path to KataGo model (for future native implementation) */
  modelPath?: string;
  /** Path to KataGo config file (for future native implementation) */
  configPath?: string;
  /** Default analysis options */
  defaultOptions?: AnalysisOptions;
}
