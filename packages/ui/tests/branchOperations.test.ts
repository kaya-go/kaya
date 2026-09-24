/**
 * Tests for the pure branch operations behind the game tree branch menu.
 *
 * Trees are built from SGF with the same parser the app uses, so node ids
 * start at 0 on the root. That matters: a truthiness check on `parentId` used
 * to treat every child of the root as the root, which made Make Main, Delete
 * and Cut silently do nothing on a variation that splits at move 1.
 *
 * See specs/2026-09-24-gametree-branch-management.md.
 */

import { describe, test, expect } from 'bun:test';
import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { parse, sgfNodeToGameTreeNode } from '@kaya/sgf';
import type { SGFProperty } from '../src/types/game';
import {
  copyBranch,
  cutBranch,
  deleteBranch,
  deleteContinuation,
  deleteOtherBranches,
  hasOtherBranches,
  isOnMainLine,
  makeMainLine,
  pasteBranch,
} from '../src/hooks/game/branchOperations';

type Tree = GameTree<SGFProperty>;
type Node = GameTreeNode<SGFProperty>;

/** Parse SGF the way `useGameTreeState` does. */
function treeFromSGF(sgf: string): Tree {
  const [root] = parse(sgf);
  return new GameTree<SGFProperty>({
    root: sgfNodeToGameTreeNode(root, { value: 0 }, null) as unknown as Node,
  });
}

const moveOf = (node: Node): string => node.data.B?.[0] ?? node.data.W?.[0] ?? '';

/** Every root-to-leaf line as its moves, in children order (main line first). */
function lines(tree: Tree): string[] {
  const out: string[] = [];
  const walk = (node: Node, path: string[]): void => {
    const next = node.parentId == null ? path : [...path, moveOf(node)];
    if (node.children.length === 0) out.push(next.join(' '));
    for (const child of node.children) walk(child, next);
  };
  walk(tree.root, []);
  return out;
}

/** The node reached by following `moves` ("aa bb") from the root. */
function nodeAt(tree: Tree, moves: string): Node {
  let node = tree.root;
  for (const move of moves.split(' ').filter(Boolean)) {
    const child = node.children.find(c => moveOf(c) === move);
    if (!child) throw new Error(`no move ${move} under ${moveOf(node) || 'root'}`);
    node = child;
  }
  return tree.get(node.id)!;
}

function allIds(tree: Tree): Array<number | string> {
  const ids: Array<number | string> = [];
  const walk = (node: Node): void => {
    ids.push(node.id);
    node.children.forEach(walk);
  };
  walk(tree.root);
  return ids;
}

/** Two variations that split at move 1. */
const SPLIT_AT_MOVE_1 = '(;SZ[19](;B[aa];W[bb])(;B[cc];W[dd]))';

/** Splits at move 1 (aa / gg) and again at moves 2 and 3 under aa. */
const NESTED = '(;SZ[19](;B[aa](;W[bb];B[cc])(;W[dd](;B[ee])(;B[ff])))(;B[gg]))';

describe('parser fixture', () => {
  test('the root id is 0', () => {
    expect(treeFromSGF(SPLIT_AT_MOVE_1).root.id).toBe(0);
  });
});

describe('makeMainLine', () => {
  test('promotes a variation that splits at move 1', () => {
    const tree = treeFromSGF(SPLIT_AT_MOVE_1);
    const result = makeMainLine(tree, nodeAt(tree, 'cc dd').id);
    expect(result).not.toBeNull();
    expect(lines(result!)).toEqual(['cc dd', 'aa bb']);
    expect(isOnMainLine(result!, nodeAt(result!, 'cc dd').id)).toBe(true);
  });

  test('promotes every fork on the path, not just the nearest', () => {
    const tree = treeFromSGF(NESTED);
    const result = makeMainLine(tree, nodeAt(tree, 'gg').id);
    expect(lines(result!)[0]).toBe('gg');

    const deep = makeMainLine(tree, nodeAt(tree, 'aa dd ff').id);
    expect(lines(deep!)).toEqual(['aa dd ff', 'aa dd ee', 'aa bb cc', 'gg']);
  });

  test('is a no-op on a node already on the main line', () => {
    const tree = treeFromSGF(NESTED);
    expect(isOnMainLine(tree, nodeAt(tree, 'aa bb cc').id)).toBe(true);
    expect(makeMainLine(tree, nodeAt(tree, 'aa bb cc').id)).toBeNull();
    expect(makeMainLine(tree, nodeAt(tree, 'aa').id)).toBeNull();
    expect(makeMainLine(tree, tree.root.id)).toBeNull();
  });

  test('leaves the source tree untouched', () => {
    const tree = treeFromSGF(SPLIT_AT_MOVE_1);
    makeMainLine(tree, nodeAt(tree, 'cc').id);
    expect(lines(tree)).toEqual(['aa bb', 'cc dd']);
  });
});

describe('deleteBranch', () => {
  test('deletes a move-1 node and moves the cursor to the root', () => {
    const tree = treeFromSGF(SPLIT_AT_MOVE_1);
    const edit = deleteBranch(tree, nodeAt(tree, 'cc').id);
    expect(edit).not.toBeNull();
    expect(lines(edit!.tree)).toEqual(['aa bb']);
    expect(edit!.currentNodeId).toBe(tree.root.id);
    expect(lines(tree)).toEqual(['aa bb', 'cc dd']);
  });

  test('refuses the root', () => {
    const tree = treeFromSGF(SPLIT_AT_MOVE_1);
    expect(deleteBranch(tree, tree.root.id)).toBeNull();
  });
});

describe('copyBranch / cutBranch / pasteBranch', () => {
  test('cut removes a move-1 branch and returns it for the clipboard', () => {
    const tree = treeFromSGF(SPLIT_AT_MOVE_1);
    const cut = cutBranch(tree, nodeAt(tree, 'cc').id);
    expect(cut).not.toBeNull();
    expect(lines(cut!.tree)).toEqual(['aa bb']);
    expect(cut!.currentNodeId).toBe(tree.root.id);
    expect(moveOf(cut!.branch)).toBe('cc');
    expect(cut!.branch.children.map(moveOf)).toEqual(['dd']);
  });

  test('cut then paste restores the branch as a new variation with fresh ids', () => {
    const tree = treeFromSGF(SPLIT_AT_MOVE_1);
    const cut = cutBranch(tree, nodeAt(tree, 'cc').id)!;
    const pasted = pasteBranch(cut.tree, cut.currentNodeId, cut.branch);
    expect(pasted).not.toBeNull();
    expect(lines(pasted!)).toEqual(['aa bb', 'cc dd']);

    const ids = allIds(pasted!);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('paste appends a copy of the subtree under the current node', () => {
    const tree = treeFromSGF(SPLIT_AT_MOVE_1);
    const branch = copyBranch(tree, nodeAt(tree, 'cc').id)!;
    const pasted = pasteBranch(tree, nodeAt(tree, 'aa bb').id, branch);
    expect(lines(pasted!)).toEqual(['aa bb cc dd', 'cc dd']);
    expect(lines(tree)).toEqual(['aa bb', 'cc dd']);

    const ids = allIds(pasted!);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('copy and cut refuse the root', () => {
    const tree = treeFromSGF(SPLIT_AT_MOVE_1);
    expect(copyBranch(tree, tree.root.id)).toBeNull();
    expect(cutBranch(tree, tree.root.id)).toBeNull();
  });
});

describe('deleteContinuation', () => {
  test('keeps the position and drops every line after it', () => {
    const tree = treeFromSGF(NESTED);
    const aa = nodeAt(tree, 'aa');
    const result = deleteContinuation(tree, aa.id);
    expect(lines(result!)).toEqual(['aa', 'gg']);
    expect(result!.get(aa.id)).not.toBeNull();
    expect(lines(tree)).toEqual(['aa bb cc', 'aa dd ee', 'aa dd ff', 'gg']);
  });

  test('works on the root', () => {
    const tree = treeFromSGF(SPLIT_AT_MOVE_1);
    expect(lines(deleteContinuation(tree, tree.root.id)!)).toEqual(['']);
  });

  test('is a no-op on a leaf', () => {
    const tree = treeFromSGF(SPLIT_AT_MOVE_1);
    expect(deleteContinuation(tree, nodeAt(tree, 'aa bb').id)).toBeNull();
  });
});

describe('deleteOtherBranches', () => {
  test('keeps the path to the node and everything below it', () => {
    const tree = treeFromSGF(NESTED);
    const dd = nodeAt(tree, 'aa dd');
    expect(hasOtherBranches(tree, dd.id)).toBe(true);

    const result = deleteOtherBranches(tree, dd.id);
    expect(lines(result!)).toEqual(['aa dd ee', 'aa dd ff']);
    expect(hasOtherBranches(result!, dd.id)).toBe(false);
    expect(deleteOtherBranches(result!, dd.id)).toBeNull();
  });

  test('prunes the other move-1 variation', () => {
    const tree = treeFromSGF(NESTED);
    expect(lines(deleteOtherBranches(tree, nodeAt(tree, 'gg').id)!)).toEqual(['gg']);
  });

  test('is a no-op on the root', () => {
    const tree = treeFromSGF(NESTED);
    expect(hasOtherBranches(tree, tree.root.id)).toBe(false);
    expect(deleteOtherBranches(tree, tree.root.id)).toBeNull();
  });
});
