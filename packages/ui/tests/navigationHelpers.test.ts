/**
 * Previous-fork navigation on trees built the way the app builds them, so the
 * root's id is 0. A truthy check on `parentId` stopped on the root's child:
 * the root was never reached, and a fork at move 1 could not be reached either.
 */

import { describe, test, expect } from 'bun:test';
import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { parse, sgfNodeToGameTreeNode } from '@kaya/sgf';
import type { SGFProperty } from '../src/types/game';
import { findPreviousFork } from '../src/hooks/game/navigation-helpers';

type Tree = GameTree<SGFProperty>;
type Node = GameTreeNode<SGFProperty>;

/** Parse SGF the way `useGameTreeState` does. */
function treeFromSGF(sgf: string): Tree {
  const [root] = parse(sgf);
  return new GameTree<SGFProperty>({
    root: sgfNodeToGameTreeNode(root, { value: 0 }, null) as unknown as Node,
  });
}

/** Follow first children from the root until a node plays `move`. */
function nodeOf(tree: Tree, move: string): Node {
  const visit = (node: Node): Node | null => {
    if ((node.data.B?.[0] ?? node.data.W?.[0]) === move) return node;
    for (const child of node.children) {
      const found = visit(child);
      if (found) return found;
    }
    return null;
  };
  const found = visit(tree.root);
  if (!found) throw new Error(`no node plays ${move}`);
  return found;
}

describe('findPreviousFork', () => {
  test('a line without a fork goes back to the root', () => {
    const tree = treeFromSGF('(;SZ[19];B[aa];W[bb];B[cc])');
    expect(findPreviousFork(tree, nodeOf(tree, 'cc').id)?.id).toBe(tree.root.id);
  });

  test("the root's child goes back to the root", () => {
    const tree = treeFromSGF('(;SZ[19];B[aa];W[bb])');
    expect(findPreviousFork(tree, nodeOf(tree, 'aa').id)?.id).toBe(tree.root.id);
  });

  test('a fork at move 1 is reached from inside a variation', () => {
    const tree = treeFromSGF('(;SZ[19](;B[aa];W[bb])(;B[dd];W[ee]))');
    expect(tree.root.children.length).toBe(2);
    expect(findPreviousFork(tree, nodeOf(tree, 'ee').id)?.id).toBe(tree.root.id);
  });

  test('stops on the nearest fork, not the root', () => {
    const tree = treeFromSGF('(;SZ[19];B[aa];W[bb](;B[cc];W[dd])(;B[ee]))');
    expect(findPreviousFork(tree, nodeOf(tree, 'dd').id)?.id).toBe(nodeOf(tree, 'bb').id);
  });

  test('the root stays on the root, and an unknown id gives nothing', () => {
    const tree = treeFromSGF('(;SZ[19];B[aa])');
    expect(findPreviousFork(tree, tree.root.id)?.id).toBe(tree.root.id);
    expect(findPreviousFork(tree, 9999)).toBeNull();
  });
});
