/**
 * What loading a game does to its properties beyond parsing them.
 *
 * Every loader turns the parsed tree into game tree nodes through
 * `sgfNodeToGameTreeNode`, and every reader after it (board replay, analysis,
 * setup editing, markers) handles one point per value. So the conversion
 * writes each property in that one form.
 */

import { describe, test, expect } from 'bun:test';
import { parse, sgfNodeToGameTreeNode, type SGFNodeData } from '../src/index';

const load = (sgf: string) => sgfNodeToGameTreeNode(parse(sgf)[0]);
const dataOf = (node: { data: unknown }) => node.data as SGFNodeData;

describe('loading expands compressed point lists', () => {
  test('a rectangle of setup stones becomes one value per point', () => {
    const root = dataOf(load('(;GM[1]SZ[19]AB[aa:cc]AW[dd]AE[ee:ef])'));

    expect(root.AB).toEqual(['aa', 'ab', 'ac', 'ba', 'bb', 'bc', 'ca', 'cb', 'cc']);
    expect(root.AW).toEqual(['dd']);
    expect(root.AE).toEqual(['ee', 'ef']);
  });

  test('the corners may come in any order', () => {
    expect(dataOf(load('(;AB[ba:ab])')).AB).toEqual(['aa', 'ab', 'ba', 'bb']);
  });

  test('a point listed twice is kept once', () => {
    expect(dataOf(load('(;AB[aa:ab][ab][ac])')).AB).toEqual(['aa', 'ab', 'ac']);
  });

  test('every node of the tree, markers included', () => {
    const root = load('(;GM[1];B[pd](;AW[aa:ab]TR[cc:cd])(;SQ[dd:ed]CR[ff]MA[gg:gh]))');
    const [first, second] = root.children[0].children;

    expect(dataOf(first).AW).toEqual(['aa', 'ab']);
    expect(dataOf(first).TR).toEqual(['cc', 'cd']);
    expect(dataOf(second).SQ).toEqual(['dd', 'ed']);
    expect(dataOf(second).CR).toEqual(['ff']);
    expect(dataOf(second).MA).toEqual(['gg', 'gh']);
  });

  test('arrows, lines and labels keep their colon', () => {
    // In these the colon joins two different things, not a rectangle.
    const root = dataOf(load('(;AR[aa:cc]LN[dd:ff]LB[gg:A:B])'));

    expect(root.AR).toEqual(['aa:cc']);
    expect(root.LN).toEqual(['dd:ff']);
    expect(root.LB).toEqual(['gg:A:B']);
  });

  test('a range that is not two points is kept as written', () => {
    expect(dataOf(load('(;AB[a:cc][aa:][dd])')).AB).toEqual(['a:cc', 'aa:', 'dd']);
  });
});

describe('loading reads B[tt] and W[tt] as a pass on boards up to 19x19', () => {
  // FF[3] wrote a pass as "tt", which is off the board up to 19x19 and a real
  // point beyond. FF[4] readers must take it as a pass where it cannot be a point.
  const moves = (sgf: string) => {
    const root = load(sgf);
    const first = root.children[0];
    return [dataOf(first).B, dataOf(first.children[0]).W];
  };

  test('19x19, smaller boards, and a game with no SZ', () => {
    for (const size of ['SZ[19]', 'SZ[13]', 'SZ[9:13]', '']) {
      expect(moves(`(;GM[1]${size};B[tt];W[tt])`), size).toEqual([[''], ['']]);
    }
  });

  test('a board larger than 19 keeps tt as the point it is', () => {
    for (const size of ['SZ[21]', 'SZ[19:21]', 'SZ[25]']) {
      expect(moves(`(;GM[1]${size};B[tt];W[tt])`), size).toEqual([['tt'], ['tt']]);
    }
  });

  test('only moves: a setup stone or a marker at tt is not a pass', () => {
    const root = dataOf(load('(;GM[1]SZ[19]AB[tt]TR[tt])'));
    expect(root.AB).toEqual(['tt']);
    expect(root.TR).toEqual(['tt']);
  });
});
