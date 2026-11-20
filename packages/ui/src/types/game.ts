import { GameTree, GameTreeNode } from '@kaya/gametree';
import { GoBoard, Vertex, Sign } from '@kaya/goboard';
import { Marker } from '@kaya/shudan';
import { GameInfo as SGFGameInfo, type GameInfoPatch } from '@kaya/sgf';
import { AnalysisResult } from '@kaya/ai-engine';

import type { ConfigTab } from '../components/ai/useKayaConfig';
import type { StoredModelMetadata } from '../services/modelStorage';

export interface SGFProperty {
  [key: string]: string[];
}

export type GameInfo = SGFGameInfo;
export type { GameInfoPatch };

export interface NewGameConfig {
  boardSize: number;
  playerBlack?: string;
  playerWhite?: string;
  rankBlack?: string;
  rankWhite?: string;
  komi?: number;
  handicap?: number;
}

export interface ScoreData {
  blackTerritory: number;
  whiteTerritory: number;
  blackCaptures: number;
  whiteCaptures: number;
  blackDeadStones: number;
  whiteDeadStones: number;
  komi: number;
}

export interface AISettings {
  minProb: number; // 0.0 to 1.0
  maxTopMoves: number; // Maximum number of top moves to display (1-10)
  /**
   * Backend for AI inference. Default is 'auto' — Kaya probes the host and
   * picks the best available chain.
   * - 'auto': Auto-pick (probeEnvironment + pickConfig). Recommended.
   * - 'native': Native ONNX Runtime via Tauri (fastest, desktop only)
   * - 'native-cpu': Native ONNX Runtime CPU only (desktop only)
   * - 'webgpu': WebGPU backend (requires WebGPU-converted model for speed)
   * - 'webnn': WebNN backend (Chrome, delegates to browser ML stack)
   * - 'wasm': WebAssembly backend (CPU, most compatible)
   * - 'webgl': Deprecated, falls back to wasm
   */
  backend: 'auto' | 'native' | 'native-cpu' | 'webgpu' | 'webnn' | 'webgl' | 'wasm';
  saveAnalysisToSgf: boolean;
  /** Number of MCTS visits per position (1 = policy-only, >1 enables tree search) */
  numVisits: number;
  /**
   * Number of MCTS visits per position for full-game (batch) analysis.
   *
   * Decoupled from `numVisits` because the two regimes have different
   * cost/quality tradeoffs: live analysis runs once per nav and benefits
   * from deeper search; full-game runs N times (one per move) so a
   * shallower default keeps total runtime reasonable. Default is 10 — a
   * compromise that gives meaningful winrate swings without exploding
   * runtime on a 250-move game.
   */
  fullGameNumVisits: number;
  /**
   * Batch size for WebGPU graph capture (1–8, default 8).
   * Lower values use less GPU memory at the cost of analysis throughput.
   */
  webgpuBatchSize: number;
  /** Metric shown on heatmap circles: policy probability, win rate, or score lead */
  heatMapMetric: 'policy' | 'winRate' | 'scoreLead';
}

/**
 * Game-related settings (non-AI)
 */
export interface GameSettings {
  /** Enable fuzzy stone placement for a more natural board appearance */
  fuzzyStonePlacement: boolean;
  /** Show board coordinates (A-T, 1-19) */
  showCoordinates: boolean;
  /** Show the board controls section (captures, navigation buttons) */
  showBoardControls: boolean;
  /**
   * Problem (tsumego) mode. When enabled, opening an SGF never auto-advances
   * to the end of the main line — single-problem files open at the root so the
   * solution stays hidden until the user steps through it. Collections still
   * open at the first problem. See `determineStartNode`.
   */
  problemMode: boolean;
  /**
   * Text-size multiplier for the move comment panel (1 = default).
   * Clamped to [COMMENT_FONT_SCALE_MIN, COMMENT_FONT_SCALE_MAX].
   */
  commentFontScale: number;
  /** Source of the Moku detection ONNX model: 'default' or 'custom' */
  detectionModelSource: 'default' | 'custom';
  /** Name of the uploaded custom detection model file (display only) */
  customDetectionModelName?: string;
}

export interface AIModel extends Pick<
  StoredModelMetadata,
  'id' | 'name' | 'quantization' | 'date' | 'size'
> {
  /**
   * Model payload or a lazy-load key:
   * - User-uploaded: `File` (browser) or `ArrayBuffer` (Tauri).
   * - Library model: storage id (`string`); bytes are loaded on demand.
   */
  data: File | ArrayBuffer | string;
}

/** Runtime library row: persisted metadata plus download progress. */
export interface AIModelEntry extends StoredModelMetadata {
  /** Whether the model is downloaded and available locally */
  isDownloaded: boolean;
  /** Whether this is currently downloading */
  isDownloading?: boolean;
  /** Download progress (0-100) */
  downloadProgress?: number;
}

export interface GameTreeContextValue {
  // Game tree state
  gameTree: GameTree<SGFProperty> | null;
  currentNodeId: number | string | null;
  rootId: number | string | null;

  // Derived state
  currentBoard: GoBoard;
  /** Side to play at currentNode — from position-cache replay (same as AI nextToPlay). */
  currentPlayer: 1 | -1;
  currentNode: GameTreeNode<SGFProperty> | null;
  nextMoveNode: GameTreeNode<SGFProperty> | null;
  gameInfo: GameInfo;
  markerMap: (Marker | null)[][] | null;

  // AI Model
  customAIModel: AIModel | null;
  isModelLoaded: boolean;
  aiSettings: AISettings;
  setAISettings: (settings: Partial<AISettings>) => void;
  isAIConfigOpen: boolean;
  setAIConfigOpen: (isOpen: boolean) => void;
  configInitialTab: ConfigTab;
  setConfigInitialTab: (tab: ConfigTab) => void;
  analysisCache: React.MutableRefObject<Map<string, AnalysisResult>>;
  analysisCacheSize: number;
  /**
   * Bumped whenever results land in or leave `analysisCache`, which is mutated
   * in place. A result that replaces another under its key changes no size.
   */
  analysisRevision: number;
  updateAnalysisCacheSize: () => void;

  // Game Settings (non-AI)
  gameSettings: GameSettings;
  setGameSettings: (settings: Partial<GameSettings>) => void;

  // Model Library
  modelLibrary: AIModelEntry[];
  selectedModelId: string | null;
  setSelectedModelId: (id: string | null) => void;
  downloadModel: (id: string) => Promise<void>;
  deleteModel: (id: string) => Promise<void>;
  uploadModel: (file: File) => Promise<void>;

  // Position in tree
  moveNumber: number;
  totalMovesInBranch: number;
  variations: Array<{ nodeId: number | string; move: string }>;
  canGoBack: boolean;
  canGoForward: boolean;

  // Move info
  moveName: string | null;
  moveUrl: string | null;
  patternMatchingEnabled: boolean;
  setPatternMatchingEnabled: (enabled: boolean) => void;
  togglePatternMatching: () => void;

  // Navigation
  navigate: (nodeId: number | string) => void;
  navigateForward: (steps?: number) => void;
  navigateBackward: (steps?: number) => void;
  navigateToStart: () => void;
  navigateToEnd: () => void;
  navigateToNextFork: () => void;
  navigateToPreviousFork: () => void;
  navigateToMainLine: () => void;
  navigateToMove: (moveNumber: number) => void;
  navigateUp: () => void;
  navigateDown: () => void;
  goToPreviousSibling: () => void;
  goToNextSibling: () => void;
  goToSiblingIndex: (index: number) => void;
  siblingInfo: { hasSiblings: boolean; currentIndex: number; totalSiblings: number };
  // Enhanced branch navigation (works even when not at the fork point)
  branchInfo: {
    hasBranches: boolean;
    currentIndex: number;
    totalBranches: number;
    isAtFork: boolean;
    depthFromBranchRoot: number;
    forkNodeId: number | string | null;
    branchRootId: number | string | null;
  };
  switchBranch: (direction: 'next' | 'previous') => void;
  switchToBranchIndex: (index: number) => void;

  // Game actions
  makeMove: (vertex: Vertex, sign: Sign) => void;
  createNewGame: (config?: NewGameConfig) => void;
  saveSGF: () => string;
  updateGameInfo: (info: GameInfoPatch) => void;

  // Editing
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  toggleEditMode: () => void;
  editTool: string;
  setEditTool: (tool: string) => void;
  stoneToolColor: Sign;
  setStoneToolColor: (color: Sign) => void;
  addSetupStone: (vertex: Vertex, sign: Sign) => void;
  addSetupPosition: (
    blackCoords: string[],
    whiteCoords: string[],
    comment?: string,
    clearCoords?: string[]
  ) => void;
  addMarker: (vertex: Vertex, marker: Marker | null | string) => void;
  setNodeName: (name: string) => void;
  /** Sets the comment of `nodeId`, the current node by default. */
  setNodeComment: (comment: string, nodeId?: number | string) => void;
  deleteNode: () => void;
  deleteContinuation: () => void;
  cutNode: () => void;
  copyNode: () => void;
  pasteNode: () => void;
  flattenVariations: () => void;
  makeMainVariation: () => void;
  shiftVariation: (direction: 'left' | 'right') => void;

  // Scoring
  scoreMode: boolean;
  setScoreMode: (mode: boolean) => void;
  scoreData: ScoreData | null;
  deadStones: Set<string>;
  toggleDeadStone: (vertex: Vertex | Vertex[], targetDead?: boolean) => void;
  autoScore: () => void;
  resetScore: () => void;
  territoryMap: number[][] | null;

  // Analysis
  analysisMode: boolean;
  setAnalysisMode: (enabled: boolean) => void;
  analysisResult: any;
  setAnalysisResult: (result: any) => void;
  isAnalyzing: boolean;
  winRate: number | null;
  scoreLead: number | null;
  bestMove: Vertex | null;
  engineState: string;
  showOwnership: boolean;
  toggleOwnership: () => void;
  showTopMoves: boolean;
  toggleTopMoves: () => void;
  showAnalysisBar: boolean;
  setShowAnalysisBar: (show: boolean) => void;
  toggleShowAnalysisBar: () => void;

  // Metadata
  filename: string | null;
  setFilename: (name: string | null) => void;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;

  // Aliases for backward compatibility
  gameId: string;
  setFileName: (name: string | null) => void;
  goToNode: (nodeId: number | string) => void;
  playMove: (vertex: Vertex, sign: Sign) => void;
  resign: (player?: string | number) => void;
  goBack: () => void;
  goForward: () => void;
  goBackSteps: (steps: number) => void;
  goForwardSteps: (steps: number) => void;
  goToStart: () => void;
  goToEnd: () => void;
  scoringMode: boolean;
  toggleScoringMode: () => void;
  autoEstimateDeadStones: () => void;
  clearDeadStones: () => void;
  isEstimating: boolean;
  estimationMode: boolean;
  toggleEstimationMode: () => void;
  toggleAnalysisMode: () => void;
  updateComment: (comment: string) => void;
  editPlayMode: boolean;
  setEditPlayMode: (mode: boolean) => void;
  copiedBranch: any;
  copyBranch: () => void;
  pasteBranch: () => void;
  deleteBranch: () => void;
  removeMarker: (vertex: Vertex) => void;
  clearAllMarkersAndLabels: () => void;
  clearSetupStones: () => void;
  loadSGFAsync: (sgfContent: string) => Promise<void>;
  exportSGF: () => string;
  newGame: (config?: NewGameConfig) => void;
  fileName: string | null;
  isSaving: boolean;
  lastSaveTime: Date | null;
  triggerAutoSave: () => void;
  isLoadingSGF: boolean;
  /** Translation key of the loading step, or '' */
  loadingMessage: string;
  toggleDeadStones: (vertex: Vertex | Vertex[], targetDead?: boolean) => void;
  placeStoneDirect: (vertex: Vertex, sign: Sign) => void;
  removeSetupStone: (vertex: Vertex) => void;

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Branch management
  deleteOtherBranches: () => void;
}
