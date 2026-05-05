/**
 * High-level analysis functions with integrated post-processing
 */

import type { SignMap } from '@kaya/goboard';
import type { AnalysisResult, MoveSuggestion } from './types';
import type { Engine } from './base-engine';
import {
  parseSGF,
  reconstructBoard,
  navigateToMove,
  type ParsedSGF,
  type BoardState,
} from './sgf-utils';
import { calculateCurrentTurn, processAnalysis, type ProcessedAnalysis } from './analysis-utils';

/**
 * Extended analysis result with processed score leads and win rates
 */
export interface ExtendedAnalysisResult extends AnalysisResult {
  /** Processed analysis with consistent win rates and score leads */
  processed: ProcessedAnalysis;
  /** Board state information */
  boardInfo: {
    /** Number of stones on the board */
    moveCount: number;
    /** Move number in the game */
    moveNumber: number;
    /** Total moves in the game */
    totalMoves?: number;
  };
}

/**
 * SGF Analysis Result
 */
export interface SGFAnalysisResult {
  /** File information */
  file: {
    /** Board size */
    boardSize: number;
    /** Total moves in main line */
    totalMoves: number;
    /** Move number analyzed */
    analyzedMove: number;
  };
  /** Extended analysis result */
  analysis: ExtendedAnalysisResult;
}

/**
 * Analyze a board position with integrated post-processing
 *
 * This is the recommended high-level API that:
 * - Performs neural network analysis
 * - Processes results with correct win rate calculations
 * - Returns consistent score leads and win rates
 *
 * @param engine - AI engine instance (must be initialized)
 * @param signMap - Board position as SignMap
 * @param options - Analysis options
 * @returns Extended analysis result with processed data
 */
export async function analyzePosition(
  engine: Engine,
  signMap: SignMap,
  options: {
    maxMoves?: number;
    moveNumber?: number;
    totalMoves?: number;
  } = {}
): Promise<ExtendedAnalysisResult> {
  const { maxMoves = 10, moveNumber = 0, totalMoves } = options;

  // Get raw analysis from engine
  const rawAnalysis = await engine.analyze(signMap, { maxMoves });

  // Calculate actual turn (needed for correct processing)
  const actualCurrentTurn = rawAnalysis.currentTurn;

  // Process analysis results using utility functions. Pass the engine's
  // winRate so MCTS-derived W/N (or the value head with numVisits=1) is
  // used directly rather than re-derived from scoreLead.
  const processed = processAnalysis(rawAnalysis.scoreLead, actualCurrentTurn, rawAnalysis.winRate);

  // Count stones on board
  let moveCount = 0;
  for (const row of signMap) {
    for (const cell of row) {
      if (cell !== 0) moveCount++;
    }
  }

  return {
    ...rawAnalysis,
    processed,
    boardInfo: {
      moveCount,
      moveNumber,
      totalMoves,
    },
  };
}

/**
 * Analyze a position from an SGF file
 *
 * This is a convenience function that:
 * - Parses the SGF content
 * - Reconstructs the board at the specified move
 * - Performs the analysis
 * - Returns comprehensive results
 *
 * @param engine - AI engine instance (must be initialized)
 * @param sgfContent - SGF file content
 * @param options - Analysis options
 * @returns SGF analysis result
 */
export async function analyzeSGF(
  engine: Engine,
  sgfContent: string,
  options: {
    /** Move number to analyze (0 = start, undefined = last move) */
    moveNumber?: number;
    /** Maximum number of move suggestions to return */
    maxMoves?: number;
  } = {}
): Promise<SGFAnalysisResult> {
  const { moveNumber: requestedMove, maxMoves = 10 } = options;

  // Parse SGF
  const parsed = parseSGF(sgfContent);
  const { rootNode, gameTree, boardSize, totalMoves } = parsed;

  // Determine target move
  const targetMove = requestedMove !== undefined ? requestedMove : totalMoves;

  // Validate move number
  if (targetMove < 0) {
    throw new Error(`Invalid move number: ${targetMove}`);
  }
  if (targetMove > totalMoves) {
    throw new Error(`Move ${targetMove} exceeds total moves (${totalMoves})`);
  }

  // Navigate to target move
  const targetNode = navigateToMove(gameTree, rootNode, targetMove);

  // Reconstruct board state
  const { board, moveCount, explicitTurn } = reconstructBoard(gameTree, targetNode.id, boardSize);

  // Calculate actual turn
  const actualCurrentTurn = calculateCurrentTurn(targetMove, explicitTurn);

  // Analyze position
  const analysis = await analyzePosition(engine, board.signMap, {
    maxMoves,
    moveNumber: targetMove,
    totalMoves,
  });

  return {
    file: {
      boardSize,
      totalMoves,
      analyzedMove: targetMove,
    },
    analysis,
  };
}
