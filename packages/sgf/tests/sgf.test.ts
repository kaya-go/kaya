/**
 * Unit tests for @kaya/sgf
 *
 * Covers parsing, stringifying and the round trip between them — a game saved
 * and reloaded must come back the same, including the parts that are easy to
 * lose: empty nodes, whitespace inside comments, and rectangular board sizes.
 */

import { describe, test, expect } from 'bun:test';
import {
  parse,
  stringify,
  sgfNodeToGameTreeNode,
  tokenize,
  extractGameInfo,
  gameInfoToPropertyWrites,
  parseVertex,
  stringifyVertex,
  escapeString,
  unescapeString,
  parseDates,
  stringifyDates,
} from '../src/index';
import type { SGFNodeData } from '../src/index';

/** Strips the pretty-printing so shape can be compared, not indentation. */
const compact = (sgfText: string) => sgfText.replace(/\n\s*/g, '');

const countNodes = (node: { children: unknown[] }): number =>
  1 +
  (node.children as { children: unknown[] }[]).reduce((sum, child) => sum + countNodes(child), 0);

describe('parse', () => {
  test('reads properties and a linear sequence', () => {
    const [root] = parse('(;GM[1]FF[4]SZ[19];B[pd];W[dp])');

    expect(root.data.GM).toEqual(['1']);
    expect(root.data.SZ).toEqual(['19']);
    expect(countNodes(root)).toBe(3);
  });

  test('reads variations as siblings', () => {
    const [root] = parse('(;B[hh](;W[ii])(;W[hi]C[comment]))');

    expect(root.children).toHaveLength(2);
    expect(root.children[1].data.C).toEqual(['comment']);
  });

  test('accepts a pass as an empty move property', () => {
    const [root] = parse('(;GM[1];B[];W[bb])');
    expect(root.children[0].data.B).toEqual(['']);
  });
});

describe('stringify', () => {
  test('wraps a single node in parentheses', () => {
    // Without the outer parens the result is not valid SGF and cannot be
    // parsed back.
    const [root] = parse('(;GM[1];B[aa])');
    const text = stringify(root);

    expect(compact(text)).toBe('(;GM[1];B[aa])');
    expect(countNodes(parse(text)[0])).toBe(2);
  });

  test('keeps a node that carries no properties', () => {
    const text = stringify(parse('(;GM[1];B[aa];;W[bb])'));
    expect(compact(text)).toBe('(;GM[1];B[aa];;W[bb])');
  });

  test('writes each game of a collection as its own tree', () => {
    const text = stringify(parse('(;GM[1];B[aa])(;GM[1];B[bb])'));
    expect(compact(text)).toBe('(;GM[1];B[aa])(;GM[1];B[bb])');
  });
});

describe('round trip', () => {
  const samples = [
    '(;GM[1]FF[4]CA[UTF-8]SZ[19];B[pd];W[dp];B[pp];W[dd])',
    '(;B[dd]SZ[19]PB[Black]PW[White];W[dq](;B[pq]C[Variation 1])(;B[pd]C[Variation 2]))',
    '(;GM[1];B[aa];;W[bb])',
    '(;GM[1]SZ[9:13];B[am])',
  ];

  for (const sample of samples) {
    test(`is stable for ${sample.slice(0, 40)}…`, () => {
      const once = stringify(parse(sample));
      const twice = stringify(parse(once));

      expect(compact(once)).toBe(sample);
      expect(twice).toBe(once);
    });
  }

  test('preserves whitespace inside a comment', () => {
    // Loading a game runs every value through sgfNodeToGameTreeNode, which
    // used to trim them all: a comment lost its leading and trailing
    // whitespace a little more with each load/save cycle.
    const text = '(;GM[1];B[aa]C[  padded comment  ])';
    const counter = { value: 0 };
    const converted = sgfNodeToGameTreeNode(parse(text)[0], null, counter);

    expect((converted.children[0].data as SGFNodeData).C).toEqual(['  padded comment  ']);
  });

  test('still strips values corrupted by a stringified object', () => {
    // Brackets inside a property value are escaped in SGF.
    const counter = { value: 0 };
    const converted = sgfNodeToGameTreeNode(
      parse('(;GM[1]C[ \\[object Object\\] note ])')[0],
      null,
      counter
    );

    expect((converted.data as SGFNodeData).C).toEqual(['note']);
  });

  test('preserves an escaped closing bracket', () => {
    const [root] = parse('(;GM[1]C[bracket \\] inside])');
    expect(root.data.C).toEqual(['bracket ] inside']);
    expect(compact(stringify([root]))).toBe('(;GM[1]C[bracket \\] inside])');
  });
});

describe('extractGameInfo', () => {
  test('reads a square board size', () => {
    expect(extractGameInfo(parse('(;GM[1]SZ[13])')[0]).boardSize).toBe(13);
  });

  test('defaults to 19 when SZ is missing or unusable', () => {
    expect(extractGameInfo(parse('(;GM[1])')[0]).boardSize).toBe(19);
    expect(extractGameInfo(parse('(;GM[1]SZ[nonsense])')[0]).boardSize).toBe(19);
  });

  test('reads a rectangular board as width and height', () => {
    // SZ[9:13] used to be read as 9 by parseInt, so the board was rebuilt
    // square and every move below row 9 was silently dropped.
    const info = extractGameInfo(parse('(;GM[1]SZ[9:13])')[0]);

    expect(info.boardSize).toBe(9);
    expect(info.boardHeight).toBe(13);
  });

  test('leaves boardHeight unset for an explicitly square SZ', () => {
    expect(extractGameInfo(parse('(;GM[1]SZ[19:19])')[0]).boardHeight).toBeUndefined();
  });

  test('reads the usual metadata', () => {
    const info = extractGameInfo(
      parse('(;GM[1]PB[Lee Sedol]PW[AlphaGo]BR[9p]KM[7.5]HA[0]DT[2016-03-09]RE[W+R])')[0]
    );

    expect(info.playerBlack).toBe('Lee Sedol');
    expect(info.playerWhite).toBe('AlphaGo');
    expect(info.rankBlack).toBe('9p');
    expect(info.komi).toBe(7.5);
    expect(info.handicap).toBe(0);
    expect(info.date).toBe('2016-03-09');
    expect(info.result).toBe('W+R');
  });

  test('reads the rest of the FF[4] game-info set and keeps TM/OT separate', () => {
    const info = extractGameInfo(
      parse(
        '(;GM[1]SZ[19]EV[Honinbo]RO[Final]GN[Title]PC[Tokyo]BT[Japan]WT[Korea]RU[Japanese]TM[600]OT[3x30 byo-yomi]AN[Alpha]SO[https://example.com]CP[c]US[Beta]ON[Kobayashi]GC[note]HA[2])'
      )[0]
    );

    expect(info.eventName).toBe('Honinbo');
    expect(info.round).toBe('Final');
    expect(info.gameName).toBe('Title');
    expect(info.place).toBe('Tokyo');
    expect(info.teamBlack).toBe('Japan');
    expect(info.teamWhite).toBe('Korea');
    expect(info.rules).toBe('Japanese');
    expect(info.timeControl).toBe('600');
    expect(info.overtime).toBe('3x30 byo-yomi');
    expect(info.annotator).toBe('Alpha');
    expect(info.source).toBe('https://example.com');
    expect(info.copyright).toBe('c');
    expect(info.user).toBe('Beta');
    expect(info.opening).toBe('Kobayashi');
    expect(info.gameComment).toBe('note');
    expect(info.handicap).toBe(2);
  });
});

describe('gameInfoToPropertyWrites', () => {
  test('writes present string and numeric fields, including place/rules/time/handicap', () => {
    const writes = gameInfoToPropertyWrites({
      place: 'OGS',
      rules: 'Chinese',
      timeControl: '900',
      overtime: '5x30 byo-yomi',
      handicap: 2,
      komi: 6.5,
      eventName: 'Kisei',
    });

    const byIdent = Object.fromEntries(writes.map(w => [w.ident, w.values]));
    expect(byIdent.PC).toEqual(['OGS']);
    expect(byIdent.RU).toEqual(['Chinese']);
    expect(byIdent.TM).toEqual(['900']);
    expect(byIdent.OT).toEqual(['5x30 byo-yomi']);
    expect(byIdent.HA).toEqual(['2']);
    expect(byIdent.KM).toEqual(['6.5']);
    expect(byIdent.EV).toEqual(['Kisei']);
    expect(writes.some(w => w.ident === 'PB')).toBe(false);
  });

  test('treats an empty or null value as a delete, and handicap 0 removes HA', () => {
    const writes = gameInfoToPropertyWrites({
      place: '',
      result: null,
      handicap: 0,
    });

    expect(writes).toEqual([
      { ident: 'RE', values: null },
      { ident: 'PC', values: null },
      { ident: 'HA', values: null },
    ]);
  });

  test('leaves a property alone when its value is undefined', () => {
    // A spread or an optional variable yields a present-but-undefined key.
    expect(gameInfoToPropertyWrites({ playerBlack: undefined, komi: undefined })).toEqual([]);
  });

  test('drops writes that would leave the current root as it is', () => {
    const root = parse('(;GM[1]PB[Lee]PC[Seoul]KM[6.5])')[0];
    const writes = gameInfoToPropertyWrites(
      { playerBlack: 'Lee', place: 'Busan', komi: 6.5, result: '', round: null },
      root.data
    );

    expect(writes).toEqual([{ ident: 'PC', values: ['Busan'] }]);
  });
});

describe('helpers', () => {
  test('converts between vertices and SGF coordinates', () => {
    expect(parseVertex('dd')).toEqual([3, 3]);
    expect(stringifyVertex([3, 3])).toBe('dd');
    expect(stringifyVertex(parseVertex('as'))).toBe('as');
  });

  test('escapes and unescapes brackets', () => {
    expect(escapeString('hello]world')).toBe('hello\\]world');
    expect(unescapeString('hello\\]world')).toBe('hello]world');
  });

  test('round-trips SGF date lists', () => {
    const dates = parseDates('2024-01-01,02');
    expect(dates).toHaveLength(2);
    expect(stringifyDates(dates)).toBe('2024-01-01,02');
  });
});

describe('tokenize', () => {
  test('emits the structural tokens of a game', () => {
    const tokens = tokenize('(;B[aa];W[bb])');
    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.map(t => t.type)).toContain('parenthesis');
  });
});
