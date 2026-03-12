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
 *
 * @param maxMctsBatch - Max visits per loop iteration before yielding for progress.
 *   Caps batch size independently of maxInferenceBatch so that backends with
 *   unbounded inference batch (e.g. WASM) still emit incremental progress.
 * @param includeMove - GTP move (e.g. "D4") to force-visit so it always has
 *   MCTS statistics in the result. Used to evaluate the actually-played move.
 */
export async function runMCTS(
  rootBoard: GoBoard,
  nextPla: Sign,
  komi: number,
  history: { color: Sign; x: number; y: number }[],
  numVisits: number,
  size: number,
  maxInferenceBatch: number,
  maxMctsBatch: number,
  batchEvaluator: MCTSBatchEvaluator,
  debugLogFn: (message: string, payload?: Record<string, unknown>) => void,
  onProgress?: (progress: MCTSProgress) => void,
  signal?: AbortSignal,
  includeMove?: string
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

  // Emit initial progress (0/N) so the UI updates immediately
  if (onProgress) {
    onProgress({
      completedVisits: 0,
      totalVisits: numVisits,
      bestMove: '',
      bestMoveVisits: 0,
      winRate: 0.5,
      scoreLead: 0,
      topMoves: [],
    });
  }

  let completed = 0;
  while (completed < numVisits) {
    if (signal?.aborted) break;

    const batchSize = Math.min(maxMctsBatch, maxInferenceBatch, numVisits - completed);

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
      let progressTopMoves = sorted.slice(0, 5);

      // Append includeMove if it's not already in the top 5
      if (
        includeMove &&
        !progressTopMoves.some(([m]) => m === includeMove) &&
        root.children!.has(includeMove)
      ) {
        const child = root.children!.get(includeMove)!;
        progressTopMoves.push([includeMove, child]);
      }

      onProgress({
        completedVisits: completed,
        totalVisits: numVisits,
        bestMove,
        bestMoveVisits: bestChild.N,
        winRate: root.N > 0 ? root.W / root.N : 0.5,
        scoreLead: root.N > 0 ? root.S / root.N : 0,
        topMoves: progressTopMoves.map(([move, child]) => ({
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

  // Force additional visits through includeMove if it has insufficient statistics.
  // This ensures the actually-played move always has winRate/scoreLead data.
  if (
    includeMove &&
    root.children &&
    root.children.has(includeMove) &&
    numVisits > 1 &&
    !signal?.aborted
  ) {
    const minVisits = Math.max(3, Math.ceil(numVisits * 0.05));
    const includedChild = root.children.get(includeMove)!;
    if (includedChild.N < minVisits) {
      const extraNeeded = minVisits - includedChild.N;
      debugLogFn('includeMove forced visits', {
        move: includeMove,
        existing: includedChild.N,
        extra: extraNeeded,
      });

      for (let e = 0; e < extraNeeded && !signal?.aborted; e++) {
        // Force select includeMove at root, then normal PUCT below
        const path: Step[] = [{ node: root, board: rootBoard, pla: nextPla, hist: history }];

        // First step: forced selection of includeMove
        const parsed = parseMoveStr(includeMove, size);
        let childBoard: GoBoard;
        let childHist: typeof history;
        if (includeMove === 'PASS') {
          childBoard = new GoBoard(rootBoard.signMap.map(row => [...row] as Sign[]));
          childHist = [...history.slice(-4), { color: nextPla, x: -1, y: -1 }];
        } else if (parsed) {
          try {
            childBoard = rootBoard.makeMove(nextPla, parsed, {});
          } catch {
            break; // illegal move, stop forced visits
          }
          childHist = [...history.slice(-4), { color: nextPla, x: parsed[0], y: parsed[1] }];
        } else {
          break;
        }

        const childPla = (nextPla === 1 ? -1 : 1) as Sign;
        path.push({
          node: includedChild,
          board: childBoard,
          pla: childPla,
          hist: childHist,
        });

        // Continue with normal PUCT from the child node downward
        let cur = path[path.length - 1];
        while (true) {
          const { node, board, pla, hist } = cur;
          if (!node.expanded || !node.children || node.children.size === 0) break;
          const len = hist.length;
          if (len >= 2 && hist[len - 1].x < 0 && hist[len - 2].x < 0) break;

          let bestScore = -Infinity;
          let bestMv = '';
          let bestCh: MCTSNode | null = null;
          const parentN = node.N;
          for (const [mv, ch] of node.children) {
            const q = ch.N > 0 ? (pla === 1 ? ch.W / ch.N : 1 - ch.W / ch.N) : 0;
            const u = (1.5 * ch.P * Math.sqrt(Math.max(parentN, 1))) / (1 + ch.N);
            if (q + u > bestScore) {
              bestScore = q + u;
              bestMv = mv;
              bestCh = ch;
            }
          }
          if (!bestCh) break;

          let nb: GoBoard;
          let nh: typeof history;
          if (bestMv === 'PASS') {
            nb = new GoBoard(board.signMap.map(row => [...row] as Sign[]));
            nh = [...hist.slice(-4), { color: pla, x: -1, y: -1 }];
          } else {
            const p2 = parseMoveStr(bestMv, size);
            if (!p2) break;
            try {
              nb = board.makeMove(pla, p2, {});
            } catch {
              break;
            }
            nh = [...hist.slice(-4), { color: pla, x: p2[0], y: p2[1] }];
          }
          path.push({
            node: bestCh,
            board: nb,
            pla: (pla === 1 ? -1 : 1) as Sign,
            hist: nh,
          });
          cur = path[path.length - 1];
        }

        // Evaluate leaf if unexpanded
        const leaf = path[path.length - 1];
        let value: number;
        let sl: number;
        if (!leaf.node.expanded) {
          const [evalResult] = await batchEvaluator([
            { board: leaf.board, pla: leaf.pla, komi, history: leaf.hist },
          ]);
          const filtered = filterKoMoves(evalResult, leaf.board, leaf.pla, size);
          expandNode(leaf.node, filtered, leaf.board, leaf.pla, size);
          value = filtered.winRate;
          sl = filtered.scoreLead;
        } else {
          value = leaf.node.N > 0 ? leaf.node.W / leaf.node.N : 0.5;
          sl = leaf.node.N > 0 ? leaf.node.S / leaf.node.N : 0;
        }

        // Backup
        for (const step of path) {
          step.node.N++;
          step.node.W += value;
          step.node.S += sl;
        }
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
    const rootWinRate = root.N > 0 ? root.W / root.N : 0.5;
    const rootScoreLead = root.N > 0 ? root.S / root.N : 0;

    for (const [move, child] of sorted) {
      moveSuggestions.push({
        move,
        probability: child.N > 0 && totalChildVisits > 0 ? child.N / totalChildVisits : child.P,
        winRate: child.N > 0 ? child.W / child.N : rootWinRate,
        scoreLead: child.N > 0 ? child.S / child.N : rootScoreLead,
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
