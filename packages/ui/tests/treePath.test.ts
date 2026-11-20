/**
 * The auto-save keeps the cursor as a path of child indexes, because a reload
 * numbers nodes in file order and a saved id can name another node, or none.
 */

import { describe, test, expect } from 'bun:test';
import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { parse, sgfNodeToGameTreeNode, stringify } from '@kaya/sgf';
import type { SGFProperty } from '../src/types/game';
import {
  childIndexPath,
  nodeIdAtChildIndexPath,
  restoredCursorNodeId,
} from '../src/utils/treePath';

type Tree = GameTree<SGFProperty>;

function treeOf(sgf: string): Tree {
  const root = sgfNodeToGameTreeNode(parse(sgf)[0]) as GameTreeNode<SGFProperty>;
  return new GameTree<SGFProperty>({ root });
}

function reload(tree: Tree): Tree {
  return treeOf(stringify([tree.root]));
}

describe('auto-save cursor path', () => {
  test('a move played after a variation comes back as itself', () => {
    // A variation from the first move, then one more move on the main line:
    // that move's id is now higher than the variation's, against file order.
    let tree = treeOf('(;SZ[9];B[aa];W[bb];B[cc])');
    const [first, , third] = [...tree.listNodes()].slice(1);
    let last: number | string | null = null;
    tree = tree.mutate(draft => {
      draft.appendNode(first.id, { W: ['dd'] });
      last = draft.appendNode(third.id, { W: ['ee'] });
    });

    const path = childIndexPath(tree, last)!;
    expect(path).toEqual([0, 0, 0, 0]);

    const reloaded = reload(tree);
    const restored = reloaded.get(restoredCursorNodeId(reloaded, { currentPath: path }))!;
    expect(restored.data.W).toEqual(['ee']);
    // The id the cursor had names the variation after the reload.
    expect(reloaded.get(last!)?.data.W).toEqual(['dd']);
  });

  test('a path into a branch that is gone stops at the deepest node left', () => {
    const tree = treeOf('(;SZ[9];B[aa];W[bb])');
    expect(nodeIdAtChildIndexPath(tree, [0, 3, 0])).toBe(tree.root.children[0].id);
    expect(nodeIdAtChildIndexPath(tree, [])).toBe(tree.root.id);
  });

  test('an older save keeps its id only when the tree has that node', () => {
    const tree = treeOf('(;SZ[9];B[aa];W[bb])');
    expect(restoredCursorNodeId(tree, { currentNodeId: 2 })).toBe(2);
    expect(restoredCursorNodeId(tree, { currentNodeId: 42 })).toBe(tree.root.id);
    expect(restoredCursorNodeId(tree, {})).toBe(tree.root.id);
  });
});
