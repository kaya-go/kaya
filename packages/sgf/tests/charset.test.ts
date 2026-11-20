/**
 * Reading the bytes of an SGF file in the charset it names.
 *
 * Files from Chinese, Korean and Japanese servers are often GB2312, Big5,
 * EUC-KR or Shift_JIS and say so in CA. Read as UTF-8 they showed U+FFFD in
 * every name and comment, and a save wrote that loss to disk. The fixtures
 * hold the same short game in each encoding's own bytes.
 */

import { describe, test, expect } from 'bun:test';
import { readFileSync } from 'fs';
import { join } from 'path';
import { decodeSgf, parseStrict, withUtf8Charset } from '../src/index';

const fixture = (name: string) =>
  new Uint8Array(readFileSync(join(import.meta.dir, 'fixtures', 'charsets', name)));

const rootOf = (text: string) => parseStrict(text)[0];

describe('decodeSgf', () => {
  const games = {
    'gb2312.sgf': ['柯洁', '李世石', '黑先', '星位'],
    'big5.sgf': ['周俊勳', '林海峰', '黑先', '星位'],
    'euc-kr.sgf': ['이세돌', '박정환', '흑 선', '화점'],
    'shift_jis.sgf': ['井山裕太', '一力遼', '黒番。表を見よ', '星'],
    'iso-8859-1.sgf': ['Müller', 'Lefèvre', 'Partie à Zürich', 'Hoshi'],
    'utf-8.sgf': ['柯洁', '李世石', '黑先', '星位'],
  };

  for (const [name, [black, white, comment, moveComment]] of Object.entries(games)) {
    test(`reads ${name} in the charset its CA names`, () => {
      const text = decodeSgf(fixture(name));
      const root = rootOf(text);

      expect(text).not.toContain('\uFFFD');
      expect(root.data.PB).toEqual([black]);
      expect(root.data.PW).toEqual([white]);
      expect(root.data.C).toEqual([comment]);
      expect(root.children[0].data.C).toEqual([moveComment]);
    });
  }

  test('labels the text it returns UTF-8, the charset Kaya writes it in', () => {
    // A library file is stored as this text and downloaded as UTF-8 bytes:
    // a CA still naming GB2312 would make every other reader garble it.
    for (const name of Object.keys(games)) {
      expect(rootOf(decodeSgf(fixture(name))).data.CA, name).toEqual(['UTF-8']);
    }
  });

  test('takes an ArrayBuffer as well', () => {
    const bytes = fixture('gb2312.sgf');
    const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    expect(decodeSgf(buffer)).toBe(decodeSgf(bytes));
  });

  test('bytes that are valid UTF-8 are read as UTF-8, whatever CA says', () => {
    // Writers that put the FF[4] default CA[ISO-8859-1] (or any other) on UTF-8
    // text exist; Kaya read every file as UTF-8 until now and opened those
    // correctly, so it still does. A file really in GB2312 is not valid UTF-8.
    const mislabelled = new TextEncoder().encode('(;GM[1]CA[GB2312]PB[柯洁]C[Müller])');
    const root = rootOf(decodeSgf(mislabelled));

    expect(root.data.PB).toEqual(['柯洁']);
    expect(root.data.C).toEqual(['Müller']);
    expect(root.data.CA).toEqual(['UTF-8']);
  });

  test('a file with no CA, or a CA no decoder knows, falls back to UTF-8', () => {
    const latin1 = (text: string) => Uint8Array.from(text, c => c.charCodeAt(0));

    for (const sgf of ['(;GM[1]PB[M\xfcller])', '(;GM[1]CA[x-unknown]PB[M\xfcller])']) {
      expect(rootOf(decodeSgf(latin1(sgf))).data.PB, sgf).toEqual(['M\uFFFDller']);
    }
  });

  test('only the head of the file is searched for CA', () => {
    // Read as GB2312, the bytes of "Müller" would give a CJK character, not U+FFFD.
    const head = `(;GM[1]PB[M\xfcller]C[${' '.repeat(70 * 1024)}];B[aa]CA[GB2312])`;
    const bytes = Uint8Array.from(head, c => c.charCodeAt(0));
    expect(rootOf(decodeSgf(bytes)).data.PB).toEqual(['M\uFFFDller']);
  });

  test('a byte order mark wins', () => {
    const utf16 = (text: string, littleEndian: boolean) => {
      const bytes = new Uint8Array(2 + text.length * 2);
      const view = new DataView(bytes.buffer);
      view.setUint16(0, 0xfeff, littleEndian);
      for (let i = 0; i < text.length; i++)
        view.setUint16(2 + 2 * i, text.charCodeAt(i), littleEndian);
      return bytes;
    };
    const sgf = '(;GM[1]CA[UTF-16]PB[柯洁])';

    for (const littleEndian of [true, false]) {
      expect(rootOf(decodeSgf(utf16(sgf, littleEndian))).data.PB).toEqual(['柯洁']);
    }
    const utf8 = new Uint8Array([0xef, 0xbb, 0xbf, ...new TextEncoder().encode(sgf)]);
    expect(decodeSgf(utf8).startsWith('(;')).toBe(true);
  });
});

describe('withUtf8Charset', () => {
  test('labels the root UTF-8 without touching the node it was given', () => {
    const root = { id: 0, data: { GM: ['1'], CA: ['GB2312'] }, parentId: null, children: [] };
    const labelled = withUtf8Charset(root);

    expect(labelled.data.CA).toEqual(['UTF-8']);
    expect(labelled.data.GM).toEqual(['1']);
    expect(root.data.CA).toEqual(['GB2312']);
  });

  test('adds CA when the root has none, and keeps a root already UTF-8', () => {
    expect(withUtf8Charset({ data: { GM: ['1'] } }).data.CA).toEqual(['UTF-8']);

    const utf8 = { data: { CA: ['utf-8'] } };
    expect(withUtf8Charset(utf8)).toBe(utf8);
  });
});
