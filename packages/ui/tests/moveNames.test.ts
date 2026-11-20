/**
 * The engine names moves on the square of the board's longer side (row =
 * side − y), and `KA` keeps that naming. The board labels its rows by its own
 * height (shudan's defaultCoordY), so on a board wider than tall the two
 * disagree: on SZ[13:9] the bottom-left point is A5 to the engine and A1 on
 * the board. A name shown to the user is the board's.
 */

import { describe, test, expect, beforeEach } from 'bun:test';
import type { AnalysisResult } from '@kaya/ai-engine';
import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { parse, sgfNodeToGameTreeNode } from '@kaya/sgf';
import type { TFunction } from 'i18next';
import type { GameInfo, SGFProperty } from '../src/types/game';
import {
  analysisBoardSize,
  analysisCacheKey,
  clearAllCaches,
  getPathToNode,
  mapAnalysisPath,
} from '../src/utils/gameCache';
import { boardMoveName } from '../src/utils/gtpUtils';
import { computeNextMoveInfo } from '../src/contexts/ai/nextMoveInfoBuilder';
import { buildPerformanceReport } from '../src/components/analysis/performanceReportUtils';

// [width, height, the bottom-left point as the engine names it, as the board does]
const BOARDS: Array<[number, number, string, string]> = [
  [13, 9, 'A5', 'A1'],
  [9, 13, 'A1', 'A1'],
  [9, 9, 'A1', 'A1'],
];

describe.each(BOARDS)('move names on %d×%d', (width, height, engineName, boardName) => {
  const gameInfo: GameInfo = { boardSize: width, boardHeight: height, komi: 6.5 };
  const size = analysisBoardSize(gameInfo);

  beforeEach(clearAllCaches);

  test('a name the engine gives is shown as the board labels the point', () => {
    expect(boardMoveName(engineName, size, height)).toBe(boardName);
    expect(boardMoveName('PASS', size, height)).toBe('PASS');
    expect(boardMoveName('pass', size, height)).toBe('pass');
  });

  test('the analysis bar shows the played move by the board label', () => {
    const info = computeNextMoveInfo({
      nextMoveVertex: { vertex: [0, height - 1], player: 1 },
      analysisSize: size,
      boardHeight: height,
      mctsProgress: null,
      analysisResult: {
        moveSuggestions: [
          { move: 'C3', probability: 0.6 },
          { move: engineName, probability: 0.4 },
        ],
      },
    });
    // Matched against the engine's names, shown by the board's.
    expect(info?.rank).toBe(1);
    expect(info?.gtp).toBe(engineName);
    expect(info?.label).toBe(boardName);
  });

  test('the key mistakes name both moves by the board labels', () => {
    // Black plays the bottom-left corner while the engine only wants the
    // top-left one: a blunder.
    const sgf = `(;SZ[${width === height ? width : `${width}:${height}`}]KM[6.5];B[a${String.fromCharCode(96 + height)}];W[ca])`;
    const root = sgfNodeToGameTreeNode(parse(sgf)[0]) as GameTreeNode<SGFProperty>;
    const tree = new GameTree<SGFProperty>({ root });
    const topLeft = `A${size}`;
    const cache = new Map<string, AnalysisResult>();
    const path = getPathToNode(tree, [...tree.listNodes()].pop()!.id);
    mapAnalysisPath(
      tree,
      path,
      state =>
        cache.set(analysisCacheKey(state, 6.5), {
          winRate: 0.5,
          scoreLead: 0,
          currentTurn: state.nextToPlay,
          moveSuggestions: [
            { move: topLeft, probability: 0.99 },
            { move: 'C3', probability: 0.01 },
          ],
        }),
      gameInfo
    );

    const t = ((key: string) => key) as unknown as TFunction;
    const report = buildPerformanceReport(
      tree,
      tree.root.id,
      tree.root.id,
      gameInfo,
      { current: cache },
      t
    );
    const mistake = report?.keyMistakes.find(m => m.player === 'B');
    expect(mistake?.playedMove).toBe(boardName);
    expect(mistake?.bestMove).toBe(`A${height}`);
  });
});
