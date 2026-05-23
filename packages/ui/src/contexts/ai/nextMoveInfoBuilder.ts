import type { MoveSuggestion } from '@kaya/ai-engine';
import type { GoBoard } from '@kaya/goboard';
import { sgfToVertex } from '@kaya/sgf';
import { vertexToGTP } from '../../utils/gtpUtils';
import type { NextMoveInfo } from '../ai-analysis-types';

interface NodeLike {
  data: { B?: string[]; W?: string[] };
  children: NodeLike[];
}

interface GameTreeLike {
  get(id: string | number): NodeLike | null | undefined;
}

interface MCTSProgressLike {
  topMoves: Array<{ move: string; winRate: number; scoreLead: number }>;
}

interface AnalysisResultLike {
  moveSuggestions?: unknown;
}

/**
 * Locate the move actually played in the game (first child of current node),
 * and resolve it to a vertex + player.
 */
export function computeNextMoveVertex(
  gameTree: GameTreeLike | null | undefined,
  currentNodeId: string | number | null
): { vertex: [number, number]; player: 1 | -1 } | null {
  if (!gameTree || currentNodeId === null) return null;
  const currentNode = gameTree.get(currentNodeId);
  if (!currentNode || currentNode.children.length === 0) return null;
  const nextNode = currentNode.children[0];
  if (!nextNode) return null;
  const moveData = nextNode.data.B?.[0] || nextNode.data.W?.[0];
  if (!moveData) return null;
  const vertex = sgfToVertex(moveData);
  if (!vertex || vertex[0] < 0) return null;
  const player: 1 | -1 = nextNode.data.B ? 1 : -1;
  return { vertex: vertex as [number, number], player };
}

/**
 * Compare the played next move against the AI's suggestions and compute
 * per-move stats (rank, deltas). Falls back through MCTS progress, then
 * the final analysis result.
 */
export function computeNextMoveInfo(args: {
  nextMoveVertex: { vertex: [number, number]; player: 1 | -1 } | null;
  currentBoard: GoBoard;
  mctsProgress: MCTSProgressLike | null | undefined;
  analysisResult: AnalysisResultLike | null | undefined;
}): NextMoveInfo | null {
  const { nextMoveVertex, currentBoard, mctsProgress, analysisResult } = args;
  if (!nextMoveVertex) return null;
  const boardSize = currentBoard.signMap.length;
  const gtp = vertexToGTP(nextMoveVertex.vertex, boardSize);
  if (gtp === 'PASS') return null;

  // Check in MCTS progress topMoves (during live analysis)
  if (mctsProgress && mctsProgress.topMoves.length > 0) {
    const topMoves = mctsProgress.topMoves;
    const idx = topMoves.findIndex(m => m.move === gtp);
    const best = topMoves[0];
    if (idx >= 0) {
      const played = topMoves[idx];
      return {
        vertex: nextMoveVertex.vertex,
        player: nextMoveVertex.player,
        gtp,
        isTopMove: true,
        rank: idx,
        winRate: played.winRate,
        scoreLead: played.scoreLead,
        deltaWinRate: played.winRate - best.winRate,
        deltaScoreLead: played.scoreLead - best.scoreLead,
      };
    }
    // Not in live topMoves — fall through to check analysisResult
  }

  // Check in final analysis result moveSuggestions
  if (analysisResult?.moveSuggestions) {
    const suggestions = analysisResult.moveSuggestions as MoveSuggestion[];
    const idx = suggestions.findIndex(s => s.move === gtp);
    const best = suggestions[0];
    if (idx >= 0) {
      const played = suggestions[idx];
      return {
        vertex: nextMoveVertex.vertex,
        player: nextMoveVertex.player,
        gtp,
        isTopMove: true,
        rank: idx,
        winRate: played.winRate,
        scoreLead: played.scoreLead,
        deltaWinRate:
          played.winRate != null && best?.winRate != null
            ? played.winRate - best.winRate
            : undefined,
        deltaScoreLead:
          played.scoreLead != null && best?.scoreLead != null
            ? played.scoreLead - best.scoreLead
            : undefined,
      };
    }
    return {
      vertex: nextMoveVertex.vertex,
      player: nextMoveVertex.player,
      gtp,
      isTopMove: false,
      rank: -1,
    };
  }

  return {
    vertex: nextMoveVertex.vertex,
    player: nextMoveVertex.player,
    gtp,
    isTopMove: false,
    rank: -1,
  };
}
