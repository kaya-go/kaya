/**
 * Tests for the position cache behind board navigation and AI analysis.
 *
 * A wrong key or a missing invalidation does not fail loudly here: the board is
 * just quietly wrong. From #164 until the unified cache, reads and writes used
 * different keys, so the cache never hit and hid that undo and game info edits
 * never invalidated it. See specs/2026-11-05-position-cache-tree-identity.md.
 */

import { describe, test, expect, beforeEach } from 'bun:test';
import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { parse, sgfNodeToGameTreeNode } from '@kaya/sgf';
import type { SGFProperty } from '../src/types/game';
import {
  clearAllCaches,
  mapAnalysisPath,
  reconstructAnalysisState,
  reconstructBoard,
} from '../src/utils/gameCache';
import {
  createInitialAnalysisState,
  updateAnalysisState,
  type AnalysisState,
} from '../src/utils/aiAnalysis';

type Tree = GameTree<SGFProperty>;
type Node = GameTreeNode<SGFProperty>;

function treeOf(sgf: string): Tree {
  const root = sgfNodeToGameTreeNode(parse(sgf)[0]) as Node;
  return new GameTree<SGFProperty>({ root });
}

function mainLine(tree: Tree): Node[] {
  const nodes: Node[] = [tree.root];
  while (nodes[nodes.length - 1].children.length > 0) {
    nodes.push(nodes[nodes.length - 1].children[0]);
  }
  return nodes;
}

/** What the position is, replayed from the root with no cache involved. */
function replay(nodes: Node[], size: number): AnalysisState {
  return nodes.reduce(
    (state, node, i) => updateAnalysisState(state, node, i),
    createInitialAnalysisState(size)
  );
}

function expectSamePosition(actual: AnalysisState, expected: AnalysisState): void {
  expect(actual.board.equals(expected.board)).toBe(true);
  expect(actual.history).toEqual(expected.history);
  expect(actual.nextToPlay).toBe(expected.nextToPlay);
}

// A capture, a ko, a pass, a setup node and a comment-only node.
const GAME =
  '(;SZ[9];B[ba];W[ca];B[ab];W[db];B[bc];W[cc];B[cb];W[bb];B[ee];W[cb];B[];W[fe]' +
  ';AB[aa][hh]AE[ee];C[note];B[gg])';

beforeEach(clearAllCaches);

describe('position cache', () => {
  test('a second read of a node hits the cache', () => {
    const tree = treeOf(GAME);
    const id = mainLine(tree)[5].id;
    expect(reconstructBoard(tree, id, 9)).toBe(reconstructBoard(tree, id, 9));
  });

  test('every node matches a clean replay, in any reading order', () => {
    const tree = treeOf(GAME);
    const nodes = mainLine(tree);
    const order = [...nodes.keys(), ...[...nodes.keys()].reverse()];
    for (const i of order) {
      const expected = replay(nodes.slice(0, i + 1), 9);
      expectSamePosition(reconstructAnalysisState(tree, nodes[i].id, 9), expected);
      expect(reconstructBoard(tree, nodes[i].id, 9).equals(expected.board)).toBe(true);
    }
  });

  test('the sample game does reach a ko and a capture', () => {
    const nodes = mainLine(treeOf(GAME));
    const koAt = nodes.findIndex((_, i) => {
      const { board } = replay(nodes.slice(0, i + 1), 9);
      return board._koInfo.sign !== 0;
    });
    expect(koAt).toBeGreaterThan(0);
    const { board } = replay(nodes, 9);
    expect(board.getCaptures(1) + board.getCaptures(-1)).toBeGreaterThan(0);
  });

  test('mapAnalysisPath agrees with a clean replay and seeds correct entries', () => {
    const tree = treeOf(GAME);
    const nodes = mainLine(tree);

    mapAnalysisPath(
      tree,
      nodes,
      (state, i) => expectSamePosition(state, replay(nodes.slice(0, i + 1), 9)),
      9
    );

    // The walk keeps mutating its working state after writing an entry.
    for (let i = 0; i < nodes.length; i++) {
      expectSamePosition(
        reconstructAnalysisState(tree, nodes[i].id, 9),
        replay(nodes.slice(0, i + 1), 9)
      );
    }
  });

  test('a caller can change the state it gets without touching the cache', () => {
    const tree = treeOf(GAME);
    const id = mainLine(tree)[5].id;
    const expected = reconstructAnalysisState(tree, id, 9);

    const owned = reconstructAnalysisState(tree, id, 9);
    owned.board.makeMove(1, [8, 8], { mutate: true });
    owned.history.push({ color: 1, x: 8, y: 8 });
    owned.nextToPlay = owned.nextToPlay === 'B' ? 'W' : 'B';

    expectSamePosition(reconstructAnalysisState(tree, id, 9), expected);
  });

  test('a rectangular board keeps its width and height', () => {
    const tree = treeOf('(;SZ[9:13];B[ak])');
    const board = reconstructBoard(tree, mainLine(tree)[1].id, 9, 13);
    expect([board.width, board.height]).toEqual([9, 13]);
    expect(board.get([0, 10])).toBe(1);
  });
});

describe('position cache across trees', () => {
  test('undo and redo of a setup stone show the tree they restore', () => {
    const before = treeOf('(;SZ[9];B[aa];W[bb])');
    const id = before.root.children[0].id;
    const after = before.mutate(draft => draft.updateProperty(id, 'AB', ['ee']));

    expect(reconstructBoard(after, id, 9).get([4, 4])).toBe(1);
    expect(reconstructBoard(before, id, 9).get([4, 4])).toBe(0); // undo
    expect(reconstructBoard(after, id, 9).get([4, 4])).toBe(1); // redo
  });

  test('an edit reaches the descendants of the edited node', () => {
    const before = treeOf('(;SZ[9];B[aa];W[bb];B[cc])');
    const nodes = mainLine(before);
    expect(reconstructBoard(before, nodes[3].id, 9).get([4, 4])).toBe(0);

    const after = before.mutate(draft => draft.updateProperty(nodes[1].id, 'AB', ['ee']));
    expect(reconstructBoard(after, nodes[3].id, 9).get([4, 4])).toBe(1);
  });

  test('a handicap edit on the root changes who plays next', () => {
    const before = treeOf('(;SZ[9];B[aa])');
    const rootId = before.root.id;
    expect(reconstructAnalysisState(before, rootId, 9).nextToPlay).toBe('B');

    const after = before.mutate(draft => draft.updateProperty(rootId, 'HA', ['2']));
    expect(reconstructAnalysisState(after, rootId, 9).nextToPlay).toBe('W');
  });

  test('a walk over another tree leaves no entries for the current one', () => {
    const before = treeOf('(;SZ[9];B[aa];W[bb])');
    const id = before.root.children[0].id;
    const after = before.mutate(draft => draft.updateProperty(id, 'AB', ['ee']));

    mapAnalysisPath(after, mainLine(after), () => undefined, 9);
    expect(reconstructBoard(before, id, 9).get([4, 4])).toBe(0);
  });

  test('a new game reusing node ids does not read the previous one', () => {
    const first = treeOf('(;SZ[9];B[aa])');
    const second = treeOf('(;SZ[9];B[bb])');
    const id = first.root.children[0].id;
    expect(second.root.children[0].id).toBe(id);

    expect(reconstructBoard(first, id, 9).get([0, 0])).toBe(1);
    const board = reconstructBoard(second, id, 9);
    expect(board.get([0, 0])).toBe(0);
    expect(board.get([1, 1])).toBe(1);
  });
});
