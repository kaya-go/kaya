import { GoBoard, type Sign } from '@kaya/goboard';
import type { MCTSNode, MCTSBatchEvaluator, MCTSProgress } from './onnx-types';
import type { AnalysisResult, MoveSuggestion } from './types';

/** Parse a GTP move string (e.g. "D4", "Q16", "PASS") to board [x, y] or null for pass. */
export function parseMoveStr(move: string, size: number): [number, number] | null {
  if (!move || move === 'PASS') return null;
  const letters = 'ABCDEFGHJKLMNOPQRST';
  const x = letters.indexOf(move[0].toUpperCase());
  const y = size - parseInt(move.slice(1), 10);
  if (x < 0 || y < 0 || y >= size) return null;
  return [x, y];
}

/** Get the GTP string for the ko-forbidden vertex, or null if no ko. */
export function getKoVertex(board: GoBoard, pla: Sign, size: number): string | null {
  const koInfo = board._koInfo;
  if (!koInfo || koInfo.sign !== pla || koInfo.vertex[0] === -1) return null;
  const letters = 'ABCDEFGHJKLMNOPQRST';
  return `${letters[koInfo.vertex[0]]}${size - koInfo.vertex[1]}`;
}

/** Remove the ko-forbidden move from suggestions and renormalise probabilities. */
export function filterKoMoves(
  result: AnalysisResult,
  board: GoBoard,
  pla: Sign,
  size: number
): AnalysisResult {
  const koMove = getKoVertex(board, pla, size);
  if (!koMove) return result;
  const filtered = result.moveSuggestions.filter(s => s.move !== koMove);
  const total = filtered.reduce((sum, s) => sum + s.probability, 0);
  if (total > 0) {
    for (const s of filtered) s.probability /= total;
  }
  return { ...result, moveSuggestions: filtered };
}

/** Expand a node: create children from NN policy, skipping occupied and ko-illegal intersections. */
export function expandNode(
  node: MCTSNode,
  eval_: AnalysisResult,
  board: GoBoard,
  pla: Sign,
  size: number
): void {
  node.children = new Map();
  const koVertex = getKoVertex(board, pla, size);
  for (const suggestion of eval_.moveSuggestions) {
    const move = suggestion.move;
    if (move !== 'PASS') {
      if (koVertex && move === koVertex) continue;
      const parsed = parseMoveStr(move, size);
      if (!parsed) continue;
      // Skip occupied intersections
      const stone = board.get(parsed);
      if (stone !== 0) continue;
    }
    node.children.set(move, {
      N: 0,
      W: 0,
      S: 0,
      P: suggestion.probability,
      children: null,
      expanded: false,
      virtualLoss: 0,
    });
  }
  node.expanded = true;
}

/**
 * Run PUCT MCTS search from the given position.
 * Uses batch evaluation with virtual loss to amortize GPU sync overhead.
 */
export async function runMCTS(
  rootBoard: GoBoard,
  nextPla: Sign,
  komi: number,
  history: { color: Sign; x: number; y: number }[],
  numVisits: number,
  size: number,
  maxInferenceBatch: number,
  batchEvaluator: MCTSBatchEvaluator,
  debugLogFn: (message: string, payload?: Record<string, unknown>) => void,
  onProgress?: (progress: MCTSProgress) => void,
  signal?: AbortSignal
): Promise<AnalysisResult> {
  const CPUCT = 1.5;

  const root: MCTSNode = {
    N: 0,
    W: 0,
    S: 0,
    P: 1,
    children: null,
    expanded: false,
    virtualLoss: 0,
  };

  // Ownership accumulator: sum of ownership maps across all root evaluations
  const boardArea = size * size;
  const ownershipSum = new Float64Array(boardArea);
  let ownershipCount = 0;

  type Step = { node: MCTSNode; board: GoBoard; pla: Sign; hist: typeof history };

  let completed = 0;
  while (completed < numVisits) {
    if (signal?.aborted) break;

    const batchSize = Math.min(maxInferenceBatch, numVisits - completed);

    // Phase 1: Select up to batchSize leaves using PUCT with virtual loss
    const pending: { path: Step[]; needsEval: boolean }[] = [];

    for (let b = 0; b < batchSize; b++) {
      const path: Step[] = [{ node: root, board: rootBoard, pla: nextPla, hist: history }];

      while (true) {
        const { node, board, pla, hist } = path[path.length - 1];
        if (!node.expanded || !node.children || node.children.size === 0) break;

        const len = hist.length;
        if (len >= 2 && hist[len - 1].x < 0 && hist[len - 2].x < 0) break;

        // PUCT selection with virtual loss for path diversification
        let bestScore = -Infinity;
        let bestMove = '';
        let bestChild: MCTSNode | null = null;

        const parentN = node.N + node.virtualLoss;
        for (const [move, child] of node.children) {
          const effectiveN = child.N + child.virtualLoss;
          // Virtual visits treated as losses for current player
          const virtualW = pla === 1 ? 0 : child.virtualLoss;
          const effectiveW = child.W + virtualW;
          const q =
            effectiveN > 0
              ? pla === 1
                ? effectiveW / effectiveN
                : 1 - effectiveW / effectiveN
              : 0;
          const u = (CPUCT * child.P * Math.sqrt(Math.max(parentN, 1))) / (1 + effectiveN);
          if (q + u > bestScore) {
            bestScore = q + u;
            bestMove = move;
            bestChild = child;
          }
        }
        if (!bestChild) break;

        let newBoard: GoBoard;
        let newHist: typeof history;
        if (bestMove === 'PASS') {
          newBoard = new GoBoard(board.signMap.map(row => [...row] as Sign[]));
          newHist = [...hist.slice(-4), { color: pla, x: -1, y: -1 }];
        } else {
          const parsed = parseMoveStr(bestMove, size);
          if (!parsed) break;
          try {
            newBoard = board.makeMove(pla, parsed, {});
          } catch {
            break;
          }
          newHist = [...hist.slice(-4), { color: pla, x: parsed[0], y: parsed[1] }];
        }

        path.push({
          node: bestChild,
          board: newBoard,
          pla: (pla === 1 ? -1 : 1) as Sign,
          hist: newHist,
        });
      }

      // Apply virtual loss along path to diversify subsequent selections
      for (const step of path) step.node.virtualLoss++;

      const leaf = path[path.length - 1];
      pending.push({ path, needsEval: !leaf.node.expanded });
    }

    // Phase 2: Batch evaluate unexpanded leaves in a single call
    const toEvaluate = pending.filter(p => p.needsEval);
    const evalResults: AnalysisResult[] = [];

    if (toEvaluate.length > 0) {
      const leaves = toEvaluate.map(p => {
        const leaf = p.path[p.path.length - 1];
        return { board: leaf.board, pla: leaf.pla, komi, history: leaf.hist };
      });

      evalResults.push(...(await batchEvaluator(leaves)));
    }

    // Phase 3: Remove virtual loss, expand leaves, backup values
    let evalIdx = 0;
    for (const item of pending) {
      for (const step of item.path) step.node.virtualLoss--;

      const leaf = item.path[item.path.length - 1];
      let value: number;
      let scoreLead: number;

      if (item.needsEval && evalIdx < evalResults.length) {
        const result = evalResults[evalIdx++];
        const filtered = filterKoMoves(result, leaf.board, leaf.pla, size);
        expandNode(leaf.node, filtered, leaf.board, leaf.pla, size);
        value = filtered.winRate;
        scoreLead = filtered.scoreLead;

        // Accumulate ownership at the root level
        if (filtered.ownership) {
          for (let i = 0; i < boardArea; i++) {
            ownershipSum[i] += filtered.ownership[i];
          }
          ownershipCount++;
        }
      } else {
        value = leaf.node.N > 0 ? leaf.node.W / leaf.node.N : 0.5;
        scoreLead = leaf.node.N > 0 ? leaf.node.S / leaf.node.N : 0;
      }

      for (const step of item.path) {
        step.node.N++;
        step.node.W += value;
        step.node.S += scoreLead;
      }
    }

    completed += pending.length;

    // Emit progress after each batch
    if (onProgress && root.children && root.children.size > 0) {
      const sorted = [...root.children.entries()].sort(([, a], [, b]) => b.N - a.N);
      const [bestMove, bestChild] = sorted[0];
      onProgress({
        completedVisits: completed,
        totalVisits: numVisits,
        bestMove,
        bestMoveVisits: bestChild.N,
        winRate: root.N > 0 ? root.W / root.N : 0.5,
        scoreLead: root.N > 0 ? root.S / root.N : 0,
        topMoves: sorted.slice(0, 5).map(([move, child]) => ({
          move,
          visits: child.N,
          winRate: child.N > 0 ? child.W / child.N : 0.5,
          scoreLead: child.N > 0 ? child.S / child.N : 0,
        })),
      });

      // Yield to the event loop so progress messages can be delivered to the
      // main thread. Without this, synchronous backends (WASM) run the entire
      // loop in a tight microtask chain and all postMessage calls arrive at
      // once, preventing the UI from showing intermediate progress.
      if (completed < numVisits) {
        await new Promise<void>(resolve => setTimeout(resolve, 0));
      }
    }
  }

  // Build AnalysisResult from MCTS visit counts
  const moveSuggestions: MoveSuggestion[] = [];
  if (root.children && root.children.size > 0) {
    const totalChildVisits = [...root.children.values()].reduce((s, c) => s + c.N, 0);
    const sorted = [...root.children.entries()].sort(([, a], [, b]) => {
      // Visited children first (by visit count), then unvisited (by policy prior)
      if (a.N !== b.N) return b.N - a.N;
      return b.P - a.P;
    });
    for (const [move, child] of sorted) {
      moveSuggestions.push({
        move,
        probability: child.N > 0 && totalChildVisits > 0 ? child.N / totalChildVisits : child.P,
        winRate: child.N > 0 ? child.W / child.N : undefined,
        scoreLead: child.N > 0 ? child.S / child.N : undefined,
      });
    }
  }

  const winRate = root.N > 0 ? root.W / root.N : 0.5;
  const mctsScoreLead = root.N > 0 ? root.S / root.N : 0;
  const ownership =
    ownershipCount > 0 ? Array.from(ownershipSum, v => v / ownershipCount) : undefined;

  debugLogFn('MCTS complete', { visits: root.N, winRate, scoreLead: mctsScoreLead });

  return {
    moveSuggestions,
    winRate,
    scoreLead: mctsScoreLead,
    currentTurn: nextPla === 1 ? 'B' : 'W',
    visits: root.N,
    ownership,
  };
}
