/**
 * Performance Report Utilities
 *
 * Shared helpers for generating performance reports from analysis data.
 */

import type { GameTree } from '@kaya/gametree';
import type { SGFProperty } from '../../types/game';
import type {
  AnalysisResult,
  PositionData as AIPositionData,
  GameInfo as AIGameInfo,
  GamePerformanceReport,
} from '@kaya/ai-engine';
import { generatePerformanceReport } from '@kaya/ai-engine';
import { generateAnalysisCacheKey } from '../../utils/aiAnalysis';
import { getPathToNode, mapAnalysisPath } from '../../utils/gameCache';
import type { TFunction } from 'i18next';
import { DEFAULT_KOMI } from '@kaya/ai-engine';

interface GameInfoInput {
  boardSize?: number;
  komi?: number;
  playerBlack?: string;
  playerWhite?: string;
  result?: string;
}

/**
 * Convert SGF coordinate to GTP coordinate
 */
export function sgfToGtp(sgf: string, boardSize: number): string {
  if (!sgf || sgf.length < 2) return 'pass';

  const x = sgf.charCodeAt(0) - 97; // 'a' = 0
  const y = sgf.charCodeAt(1) - 97;

  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) {
    return 'pass';
  }

  // GTP uses letters A-T (skipping I) for columns, numbers 1-19 for rows
  // SGF (0,0) is top-left, GTP A1 is bottom-left
  const gtpX = x < 8 ? String.fromCharCode(65 + x) : String.fromCharCode(66 + x); // Skip 'I'
  const gtpY = boardSize - y;

  return `${gtpX}${gtpY}`;
}

/**
 * Build a performance report from the game tree and analysis cache.
 */
export function buildPerformanceReport(
  gameTree: GameTree<SGFProperty>,
  rootId: number | string,
  currentNodeId: number | string | null,
  gameInfo: GameInfoInput,
  analysisCache: React.RefObject<Map<string, AnalysisResult>>,
  t: TFunction
): GamePerformanceReport | null {
  const boardSize = gameInfo.boardSize ?? 19;
  const komi = gameInfo.komi ?? DEFAULT_KOMI;

  // Step 1: Get path from root to current node
  const pathToCurrentNode = getPathToNode(gameTree, currentNodeId ?? rootId);

  // Step 2: Extend from current node to end of branch (following first child)
  const fullPath = [...pathToCurrentNode];
  let lastNode = pathToCurrentNode[pathToCurrentNode.length - 1];

  while (lastNode && lastNode.children.length > 0) {
    const nextChild = lastNode.children[0];
    fullPath.push(nextChild);
    lastNode = nextChild;
  }

  if (fullPath.length <= 1) {
    return null; // No moves to analyze
  }

  // First pass: cache keys → analysis results along the branch
  const analysisResults = mapAnalysisPath(
    gameTree,
    fullPath,
    state => {
      const cacheKey = generateAnalysisCacheKey(
        state.board.signMap,
        state.nextToPlay,
        komi,
        state.history
      );
      return analysisCache.current.get(cacheKey) ?? null;
    },
    boardSize
  );

  // Second pass: pair consecutive results into before/after move positions
  const positions: AIPositionData[] = [];

  for (let i = 1; i < fullPath.length; i++) {
    const currNode = fullPath[i];
    const nodeData = currNode.data;

    let player: 'B' | 'W' | null = null;
    let move: string | null = null;

    if (nodeData.B && nodeData.B[0]) {
      player = 'B';
      move = nodeData.B[0];
    } else if (nodeData.W && nodeData.W[0]) {
      player = 'W';
      move = nodeData.W[0];
    }

    if (!player || !move) continue;

    positions.push({
      moveNumber: i,
      nodeId: currNode.id,
      player,
      move: sgfToGtp(move, boardSize),
      analysisBeforeMove: analysisResults[i - 1],
      analysisAfterMove: analysisResults[i],
    });
  }

  if (positions.length === 0) {
    return null;
  }

  // Generate the report
  const gameInfoData: AIGameInfo = {
    blackPlayer: gameInfo.playerBlack ?? t('performanceReport.black'),
    whitePlayer: gameInfo.playerWhite ?? t('performanceReport.white'),
    boardSize,
    komi,
    result: gameInfo.result ?? '',
  };

  return generatePerformanceReport(positions, gameInfoData);
}
