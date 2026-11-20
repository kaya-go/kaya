/**
 * SGF `KA` keeps per-move visits, so analysis loaded from a file tells the
 * analysis queue which moves the search explored, as a fresh result does.
 */

import { describe, test, expect, beforeEach } from 'bun:test';
import {
  ANALYSIS_ENGINE_VERSION,
  AnalysisQueue,
  type AnalysisResult,
  type Engine,
} from '@kaya/ai-engine';
import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { parse, sgfNodeToGameTreeNode, stringify } from '@kaya/sgf';
import type { SGFProperty } from '../src/types/game';
import { buildAnalysisRequest, clearAllCaches } from '../src/utils/gameCache';
import {
  extractAnalysisFromTree,
  injectAnalysisToTree,
  parseAnalysis,
  serializeAnalysis,
} from '../src/utils/sgfAnalysis';

describe('KA per-move visits', () => {
  test('round-trip, including a move the search never visited', () => {
    const result: AnalysisResult = {
      moveSuggestions: [
        { move: 'D4', probability: 0.8, winRate: 0.55, scoreLead: 1.5, visits: 31 },
        { move: 'Q16', probability: 0.2, winRate: 0.5, scoreLead: 0.4, visits: 0 },
      ],
      winRate: 0.55,
      scoreLead: 1.5,
      currentTurn: 'B',
      visits: 32,
    };
    const parsed = parseAnalysis(serializeAnalysis(result), 'B');
    expect(parsed?.moveSuggestions.map(m => m.visits)).toEqual([31, 0]);
  });

  test('a file written without per-move visits loads them as unknown', () => {
    const json = JSON.stringify({ w: 0.55, s: 1.5, v: 32, m: [{ m: 'D4', p: 0.8, w: 0.55 }] });
    const parsed = parseAnalysis(json, 'B');
    expect(parsed?.moveSuggestions[0].visits).toBeUndefined();
  });
});

/**
 * `KA` records the engine version that computed it. Analysis saved before the
 * komi parity input (no `e`) loads and shows, but every request runs again, and
 * saving the game keeps it marked as old until a new result replaces it.
 */
describe('KA engine version', () => {
  const fresh: AnalysisResult = {
    moveSuggestions: [{ move: 'E5', probability: 0.9 }],
    winRate: 0.4,
    scoreLead: -0.9,
    currentTurn: 'B',
    visits: 10,
  };

  test('a fresh result is written with the current version', () => {
    expect(JSON.parse(serializeAnalysis(fresh)).e).toBe(ANALYSIS_ENGINE_VERSION);
    expect(parseAnalysis(serializeAnalysis(fresh), 'B')?.engineVersion).toBe(
      ANALYSIS_ENGINE_VERSION
    );
  });

  test('KA without a version is version 1, and stays so through a save', () => {
    const old = parseAnalysis(JSON.stringify({ w: 0.9, s: 6, v: 10, m: [] }), 'B')!;
    expect(old.engineVersion).toBe(1);
    expect(parseAnalysis(serializeAnalysis(old), 'B')?.engineVersion).toBe(1);
  });

  describe('a 9x9 game analysed by 0.4.18, opened now', () => {
    const OLD_KA = (w: number) =>
      `KA[${JSON.stringify({ w, s: 6, v: 10, m: [] }).replace(/]/g, '\\]')}]`;
    const SGF = `(;SZ[9]KM[7.5];B[ee]${OLD_KA(0.91)};W[cc]${OLD_KA(0.92)};B[gg]${OLD_KA(0.93)})`;
    const GAME = { boardSize: 9, komi: 7.5 };

    beforeEach(clearAllCaches);

    function open(sgf: string) {
      const root = sgfNodeToGameTreeNode(parse(sgf)[0]) as GameTreeNode<SGFProperty>;
      const tree = new GameTree<SGFProperty>({ root });
      const cache = new Map<string, AnalysisResult>();
      extractAnalysisFromTree(tree, cache, GAME, 7.5);
      const runs: number[] = [];
      const engine = {
        analyze: async (_: unknown, options: { numVisits: number }) => {
          runs.push(options.numVisits);
          return { ...fresh, visits: options.numVisits };
        },
      } as unknown as Engine;
      const queue = new AnalysisQueue(engine, { cacheRef: { current: cache } });
      const nodes = [...tree.listNodes()].slice(1);
      const ask = (node: GameTreeNode<SGFProperty>) =>
        buildAnalysisRequest({
          gameTree: tree,
          currentNodeId: node.id,
          gameInfo: GAME,
          overrides: { numVisits: 10 },
        });
      return { tree, cache, queue, nodes, ask, runs };
    }

    test('shows the old values, answers nothing, and is saved as old', async () => {
      const { tree, cache, queue, nodes, ask, runs } = open(SGF);

      // The graph and the report read the map: the old values are there.
      expect([...cache.values()].map(r => r.winRate)).toEqual([0.91, 0.92, 0.93]);
      // Full-game analysis finds nothing to skip.
      for (const node of nodes) expect(queue.peek(ask(node))).toBeNull();

      // Live analysis of the second move replaces its entry.
      await queue.submit(ask(nodes[1])).result;
      expect(runs).toEqual([10]);

      const saved = stringify([injectAnalysisToTree(tree, cache, GAME, 7.5)]);

      // Reopened, the other two are still old, and only the new result answers.
      clearAllCaches();
      const again = open(saved);
      const versions = again.nodes.map(n => JSON.parse(n.data.KA![0]).e);
      expect(versions).toEqual([1, ANALYSIS_ENGINE_VERSION, 1]);
      expect(again.nodes.map(n => again.queue.peek(again.ask(n)) !== null)).toEqual([
        false,
        true,
        false,
      ]);
    });
  });
});
