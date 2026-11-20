/**
 * Every path that stores or looks up an analysis result must build the same
 * position for a node, or the result is never found again: live analysis,
 * full-game analysis, the graph and the report, and SGF `KA` persistence.
 *
 * Rectangular boards are where they drifted apart (some took the width as the
 * square size, some the height), and side to play on a node without a move
 * was ruled differently by the hand-written `KA` replay.
 */

import { describe, test, expect, beforeEach } from 'bun:test';
import type { AnalysisResult } from '@kaya/ai-engine';
import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { parse, sgfNodeToGameTreeNode, stringify } from '@kaya/sgf';
import type { TFunction } from 'i18next';
import type { GameInfo, SGFProperty } from '../src/types/game';
import {
  analysisCacheKey,
  buildAnalysisRequest,
  clearAllCaches,
  getPathToNode,
  mapAnalysisPath,
} from '../src/utils/gameCache';
import { generateAnalysisCacheKey } from '../src/utils/aiAnalysis';
import { extractAnalysisFromTree, injectAnalysisToTree } from '../src/utils/sgfAnalysis';
import { buildPerformanceReport } from '../src/components/analysis/performanceReportUtils';

type Tree = GameTree<SGFProperty>;
type Node = GameTreeNode<SGFProperty>;

function treeOf(sgf: string): Tree {
  const root = sgfNodeToGameTreeNode(parse(sgf)[0]) as Node;
  return new GameTree<SGFProperty>({ root });
}

const KOMI = 6.5;

// A branch, a comment-only node after a move, a node that sets the side to
// play, a setup node, and stones near every edge of the rectangle.
const GAMES: Array<[string, GameInfo]> = [
  [
    '(;SZ[9:13]KM[6.5];B[am];W[ia];C[after white];B[ie](;W[aa];PL[W]AB[cc];W[ec])(;W[bl]))',
    { boardSize: 9, boardHeight: 13, komi: KOMI },
  ],
  [
    '(;SZ[13:9]KM[6.5];B[ma];W[ai];C[after white];B[mi](;W[aa];PL[W]AB[cc];W[ec])(;W[la]))',
    { boardSize: 13, boardHeight: 9, komi: KOMI },
  ],
];

/** The key live analysis submits for a node. */
function liveKey(tree: Tree, node: Node, gameInfo: GameInfo): string {
  const request = buildAnalysisRequest({ gameTree: tree, currentNodeId: node.id, gameInfo });
  return generateAnalysisCacheKey(request.signMap, request.nextToPlay, KOMI, request.history);
}

function resultFor(i: number): AnalysisResult {
  return {
    winRate: i / 100,
    scoreLead: i,
    currentTurn: 'B',
    moveSuggestions: [{ move: 'A1', probability: 0.5 }],
  };
}

beforeEach(clearAllCaches);

describe.each(GAMES)('analysis keys on %s', (sgf, gameInfo) => {
  test('full-game analysis and the graph walk to the key live analysis uses', () => {
    const tree = treeOf(sgf);
    for (const node of tree.listNodes()) {
      const path = getPathToNode(tree, node.id);
      const [walked] = mapAnalysisPath(tree, path, s => analysisCacheKey(s, KOMI), gameInfo).slice(
        -1
      );
      expect(walked).toBe(liveKey(tree, node, gameInfo));
    }
  });

  test('KA written to a file reads back under the key live analysis uses', () => {
    const tree = treeOf(sgf);
    const cache = new Map<string, AnalysisResult>();
    const nodes = [...tree.listNodes()];
    nodes.forEach((node, i) => cache.set(liveKey(tree, node, gameInfo), resultFor(i)));

    const saved = stringify([injectAnalysisToTree(tree, cache, gameInfo, KOMI)]);
    expect(saved.match(/KA\[/g)).toHaveLength(nodes.length);

    clearAllCaches();
    const reloaded = treeOf(saved);
    const restored = new Map<string, AnalysisResult>();
    expect(extractAnalysisFromTree(reloaded, restored, gameInfo, KOMI)).toBe(nodes.length);

    // A comment-only node shares its position, so its key, with the move before it.
    expect([...restored.keys()].sort()).toEqual([...cache.keys()].sort());
    for (const [key, result] of cache) {
      expect(restored.get(key)?.scoreLead).toBe(result.scoreLead);
    }
  });

  test('the performance report finds the analysis of its branch', () => {
    const tree = treeOf(sgf);
    const cache = new Map<string, AnalysisResult>();
    for (const node of tree.listNodes()) {
      cache.set(liveKey(tree, node, gameInfo), resultFor(1));
    }

    const t = ((key: string) => key) as unknown as TFunction;
    const report = buildPerformanceReport(
      tree,
      tree.root.id,
      tree.root.id,
      gameInfo,
      { current: cache },
      t
    );

    expect(report).not.toBeNull();
    // Every move of the main line has its position before and after analysed.
    expect(report!.totalMoves).toBe(5);
    expect(report!.analyzedMoves).toBe(5);
  });
});
