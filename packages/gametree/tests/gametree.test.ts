/**
 * Unit tests for @kaya/gametree
 *
 * Minimal tests that avoid traversal methods which may have issues.
 */

import { describe, test, expect } from 'bun:test';
import { GameTree } from '../src/index';

type SGFData = Record<string, (string | number | boolean | null)[]>;

// Simple tree - no traversal needed
function createSimpleTree(): GameTree<SGFData> {
  let id = 5;
  return new GameTree<SGFData>({
    getId: () => id++,
    root: {
      id: 0,
      data: { C: ['root'] },
      parentId: null,
      children: [
        {
          id: 1,
          data: { B: ['dd'] },
          parentId: 0,
          children: [
            { id: 2, data: { W: ['pp'] }, parentId: 1, children: [] },
            { id: 3, data: { W: ['pd'] }, parentId: 1, children: [] },
          ],
        },
        {
          id: 4,
          data: { B: ['dp'] },
          parentId: 0,
          children: [],
        },
      ],
    },
  });
}

describe('GameTree Creation', () => {
  test('creates empty tree', () => {
    let id = 0;
    const tree = new GameTree<SGFData>({ getId: () => id++ });
    expect(tree.root).toBeDefined();
    expect(tree.root.children).toEqual([]);
  });

  test('creates tree with root data', () => {
    const tree = createSimpleTree();
    expect(tree.root.id).toBe(0);
    expect((tree.root.data as SGFData).C?.[0]).toBe('root');
  });
});

describe('Node Access', () => {
  test('get finds node by ID', () => {
    const tree = createSimpleTree();
    const node = tree.get(1);
    expect(node).not.toBe(null);
    expect((node!.data as SGFData).B?.[0]).toBe('dd');
  });

  test('get returns null for missing ID', () => {
    const tree = createSimpleTree();
    expect(tree.get(999)).toBe(null);
  });

  test('get returns null for null', () => {
    const tree = createSimpleTree();
    expect(tree.get(null)).toBe(null);
  });
});

describe('Mutations', () => {
  test('mutate returns new tree instance', () => {
    let id = 0;
    const tree = new GameTree<SGFData>({ getId: () => id++ });
    const newTree = tree.mutate(draft => {
      draft.appendNode(tree.root.id, { B: ['dd'] });
    });
    expect(newTree).not.toBe(tree);
  });

  test('appendNode adds child', () => {
    let id = 0;
    const tree = new GameTree<SGFData>({ getId: () => id++ });
    const newTree = tree.mutate(draft => {
      draft.appendNode(tree.root.id, { B: ['dd'] });
    });
    expect(newTree.root.children.length).toBe(1);
  });

  test('removeNode removes child', () => {
    const tree = createSimpleTree();
    const newTree = tree.mutate(draft => {
      draft.removeNode(4);
    });
    expect(newTree.root.children.length).toBe(1);
  });

  test('removeNode throws for root', () => {
    const tree = createSimpleTree();
    expect(() => {
      tree.mutate(draft => {
        draft.removeNode(0);
      });
    }).toThrow();
  });

  test('shiftNode reorders children', () => {
    const tree = createSimpleTree();
    const newTree = tree.mutate(draft => {
      draft.shiftNode(3, 'left');
    });
    const parent = newTree.get(1);
    expect(parent?.children[0].id).toBe(3);
  });
});

describe('Property Management', () => {
  test('addToProperty adds value', () => {
    const tree = createSimpleTree();
    const newTree = tree.mutate(draft => {
      draft.addToProperty(1, 'TR', 'aa');
    });
    const node = newTree.get(1);
    expect((node!.data as SGFData).TR).toContain('aa');
  });

  test('updateProperty sets values', () => {
    const tree = createSimpleTree();
    const newTree = tree.mutate(draft => {
      draft.updateProperty(1, 'C', ['comment']);
    });
    const node = newTree.get(1);
    expect((node!.data as SGFData).C).toEqual(['comment']);
  });

  test('updateProperty with null removes property', () => {
    const tree = createSimpleTree();
    const newTree = tree.mutate(draft => {
      draft.updateProperty(0, 'C', null);
    });
    expect((newTree.root.data as SGFData).C).toBe(undefined);
  });
});

describe('Navigation', () => {
  test('navigate step 0 returns same node', () => {
    const tree = createSimpleTree();
    expect(tree.navigate(1, 0)?.id).toBe(1);
  });

  test('navigate forward goes to child', () => {
    const tree = createSimpleTree();
    expect(tree.navigate(0, 1)?.id).toBe(1);
  });

  test('navigate backward goes to parent', () => {
    const tree = createSimpleTree();
    expect(tree.navigate(2, -1)?.id).toBe(1);
  });

  test('navigate respects currents', () => {
    const tree = createSimpleTree();
    const node = tree.navigate(0, 1, { 0: 4 });
    expect(node?.id).toBe(4);
  });
});

describe('Height', () => {
  test('getHeight returns correct height', () => {
    const tree = createSimpleTree();
    expect(tree.getHeight()).toBe(3);
  });
});

describe('Serialization', () => {
  test('toJSON returns root', () => {
    const tree = createSimpleTree();
    expect(tree.toJSON()).toBe(tree.root);
  });

  test('can reconstruct from JSON', () => {
    const tree = createSimpleTree();
    const json = JSON.parse(JSON.stringify(tree.toJSON()));
    const newTree = new GameTree<SGFData>({ root: json });
    expect(newTree.get(1)).not.toBe(null);
  });
});

// ============================================================================
// Immutability of the base tree
// ============================================================================

describe('Draft isolation', () => {
  test('removeNode makes the whole removed subtree unresolvable', () => {
    const tree = createSimpleTree();

    const next = tree.mutate(draft => {
      // Warm the cache for a descendant before its ancestor goes away.
      draft.get(2);
      draft.removeNode(1);
    });

    expect(next.get(1)).toBeNull();
    expect(next.get(2)).toBeNull();
    expect(next.get(3)).toBeNull();
    // The untouched branch is still there.
    expect(next.get(4)?.data.B).toEqual(['dp']);
  });

  test('the source tree keeps resolving a removed subtree', () => {
    const tree = createSimpleTree();
    tree.mutate(draft => draft.removeNode(1));

    expect(tree.get(1)?.data.B).toEqual(['dd']);
    expect(tree.get(2)?.data.W).toEqual(['pp']);
  });

  test('a merge in a draft does not alias ids on the source tree', () => {
    let nextId = 10;
    const tree = new GameTree<SGFData>({
      getId: () => nextId++,
      // Merge anything into the first child, the way a real merger would when
      // the same move is played twice.
      merger: (node, data) => ({ ...node.data, ...data }),
      root: {
        id: 0,
        data: { C: ['root'] },
        parentId: null,
        children: [{ id: 1, data: { B: ['dd'] }, parentId: 0, children: [] }],
      },
    });

    const next = tree.mutate(draft => {
      draft.UNSAFE_appendNodeWithId(0, 99, { B: ['dd'] });
    });

    // 99 never existed in the source tree and must not start resolving there.
    expect(tree.get(99)).toBeNull();
    expect(next.get(99)?.id).toBe(1);
  });
});
