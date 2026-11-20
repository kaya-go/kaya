/**
 * @kaya/sgf - Turning the bytes of an SGF file into text, and labelling the
 * text Kaya writes.
 *
 * FF[4] names the charset of a file in the root's CA property. Files from
 * Chinese, Korean and Japanese servers are often GB2312/GBK, Big5, EUC-KR or
 * Shift_JIS. Kaya keeps a game as a string and always writes it as UTF-8, so
 * what it reads and what it writes both say CA[UTF-8].
 */

import type { SGFNodeData } from './types';

/** CA is a root property: it is looked for in this many bytes from the start. */
const HEAD_LENGTH = 64 * 1024;

/** `CA[...]` as a property: not preceded by a letter (so not `XCA[`). */
const CA_PROPERTY = /(^|[^A-Za-z])CA\s*\[([^\]]*)\]/;

/** Names some writers use that `TextDecoder` does not know. */
const CHARSET_ALIASES: Record<string, string> = {
  cp936: 'gbk',
  ms936: 'gbk',
  cp949: 'euc-kr',
  uhc: 'euc-kr',
  cp932: 'shift_jis',
  cp950: 'big5',
};

const isUtf8Label = (label: string) => /^utf-?8$/i.test(label.trim());

/**
 * Decode an SGF file. In order:
 *
 * 1. A byte order mark names the encoding (UTF-8, UTF-16LE, UTF-16BE).
 * 2. Bytes that are valid UTF-8 are read as UTF-8, whatever CA says. Kaya read
 *    every file as UTF-8 before, so a file that declares CA[ISO-8859-1] on
 *    UTF-8 text keeps opening as it did; a file really in a legacy CJK charset
 *    is almost never valid UTF-8.
 * 3. Otherwise the charset CA names, read from the ASCII head of the file.
 * 4. Otherwise (no CA, or one no decoder knows) UTF-8, lossy.
 *
 * The CA of the returned text is rewritten to UTF-8: the text is stored and
 * written as UTF-8 from here on, and a CA still naming GB2312 would make every
 * other reader garble it.
 */
export function decodeSgf(input: ArrayBuffer | Uint8Array): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  return labelUtf8(decode(bytes));
}

function decode(bytes: Uint8Array): string {
  const bom = byteOrderMark(bytes);
  // The decoder drops the mark itself.
  if (bom) return new TextDecoder(bom).decode(bytes);

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    // Not UTF-8: read the charset the file declares.
  }

  return (declaredDecoder(bytes) ?? new TextDecoder('utf-8')).decode(bytes);
}

function byteOrderMark(bytes: Uint8Array): string | null {
  if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) return 'utf-8';
  if (bytes[0] === 0xff && bytes[1] === 0xfe) return 'utf-16le';
  if (bytes[0] === 0xfe && bytes[1] === 0xff) return 'utf-16be';
  return null;
}

function declaredDecoder(bytes: Uint8Array): TextDecoder | null {
  // Every charset an SGF file uses keeps ASCII as is, so the property reads
  // the same through a single-byte decoder whatever the file's charset.
  const head = new TextDecoder('windows-1252').decode(bytes.subarray(0, HEAD_LENGTH));
  const label = CA_PROPERTY.exec(head)?.[2].trim().toLowerCase();
  if (!label) return null;

  try {
    return new TextDecoder(CHARSET_ALIASES[label] ?? label);
  } catch {
    return null; // A name TextDecoder does not know (RangeError)
  }
}

/** Rewrite the CA of decoded text to UTF-8, if it names another charset. */
function labelUtf8(text: string): string {
  const match = CA_PROPERTY.exec(text.slice(0, HEAD_LENGTH));
  if (!match || isUtf8Label(match[2])) return text;

  const start = match.index + match[1].length;
  const end = match.index + match[0].length;
  return `${text.slice(0, start)}CA[UTF-8]${text.slice(end)}`;
}

/**
 * The root to write: a copy whose CA says UTF-8, the charset every Kaya write
 * uses (a file saved, copied, or stored in the library). The node given is
 * left as it is; a root already labelled UTF-8 is returned unchanged.
 */
export function withUtf8Charset<T extends { data: SGFNodeData }>(root: T): T {
  const charset = root.data.CA?.[0];
  if (charset !== undefined && isUtf8Label(charset)) return root;
  return { ...root, data: { ...root.data, CA: ['UTF-8'] } };
}
