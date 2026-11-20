---
date: 2026-11-20
status: shipped
scope: sgf, ui, library
---

# SGF loading: what a file holds reaches the board

## Context

A review of SGF loading found files that opened wrong without a word. Each was
re-checked with a test that fails on the old code:

| Defect                                                                                     | Effect                                                                                                         |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Compressed point lists (`AB[aa:cc]`) were never expanded; `sgfToVertex('aa:cc')` is `null` | The setup opened on an empty board, and the engine analysed that empty board                                   |
| `B[tt]` / `W[tt]` (the FF[3] pass) became the vertex `[19, 19]`                            | The move vanished from the board; the engine's "last move was a pass" input and the double-pass stop missed it |
| `parseStrict` accepted a file cut inside a value                                           | `(;GM[1];B[aa];W[bb` loaded with `W[b]`, a move never played                                                   |
| The parser skipped content after a variation                                               | `(;A[1](;B[2]);C[3])` lost `C[3]`                                                                              |
| `CA` was never read; every reader decoded UTF-8                                            | GB2312, Big5, EUC-KR, Shift_JIS files showed U+FFFD, and a save wrote the loss to disk                         |
| Shudan's column alphabet stopped at T                                                      | Boards over 19 had blank column labels                                                                         |
| `getPseudoLibertyCount` walked through an empty point it had already counted               | A capture was named "Connect" or "Turn" instead of "Take"                                                      |

## Decision

### 1. One form per property, written by the load conversion

[`sgfNodeToGameTreeNode`](../packages/sgf/src/load.ts), which every loader goes
through (`loadSGFAsync`, autosave restore), now writes:

- **Point lists one point per value.** `AB AW AE MA TR CR SQ SL DD TB TW VW`.
  Not `AR`, `LN` or `LB`: their colon joins two things, not a rectangle. A
  range whose corners are not two points each is kept as written; a point
  listed twice is kept once.
- **Bounded.** A range is cut to the board (one with no point on it is kept
  as written), and the ranges of one file may expand to a million points at
  most; past that the load is refused (`SgfValidationError`). A range is a
  few bytes and up to 52x52 points on twelve properties per node, so a crafted
  file of a megabyte otherwise expanded to hundreds of millions of values.
- **`B[tt]` / `W[tt]` as `B[]` / `W[]`** when the root `SZ` is at most 19 both
  ways (no `SZ` means 19). On a larger board `tt` is a real point. Setup
  stones and markers are not moves and are left alone. A save writes the
  FF[4] form.

`loadSGFAsync` hands `onParsed` the converted root, so analysis read from the
file's `KA` is keyed on the positions the board shows.

Alternatives: expanding in each reader (nine call sites, and setup editing
filters values by single point, so it would still miss stones inside a range);
normalizing in `parse` (it stays a faithful reader of the text, so
`stringify(parse(x))` keeps round-tripping).

### 2. `parseStrict` refuses what the parser would read wrong or drop

- **A value cut by the end of the input.** The tokenizer marks it
  (`Token.unterminated`); checking for a trailing `]` cannot work, since
  `(;C[abc\]` ends in an escaped one. `parse` keeps such a value whole (it used
  to drop its last character); `parseStrict` refuses it with its position.
- **Content after a variation inside a game tree**, refused with its position.
  Content after the last game tree is not part of a game and is still ignored.
- **A missing final `)` is accepted.** Every value read is whole, and the
  library stored content unchecked before #169 (see
  [2026-11-10](2026-11-10-sgf-import-error-surface.md)): refusing it would
  lock users out of files with no way to repair them in the app.

Strictness is a mode of the same parser (`parseChecked`, internal), not a
second pass. A real 52-file library export (games, tsumego collections, a
joseki dictionary) still loads, every file with the same tree as `parse`.

### 3. File bytes go through `decodeSgf`

[`decodeSgf`](../packages/sgf/src/charset.ts) decodes in this order:

1. A byte order mark (UTF-8, UTF-16LE/BE).
2. Bytes that are valid UTF-8 are read as UTF-8, whatever `CA` says.
3. The charset `CA` names, read from the first 64 KiB through a single-byte
   decoder (every SGF charset keeps ASCII), then `TextDecoder`, with a few
   aliases it lacks (`cp936`, `cp949`, `cp932`, ...).
4. UTF-8, lossy: no `CA`, or one no decoder knows.

Step 2 before step 3 departs from "read `CA`, fall back to UTF-8". Kaya read
every file as UTF-8 until now, so a file that declares `CA[ISO-8859-1]` (the
FF[4] default, which some writers put on every file) on UTF-8 text keeps
opening as it did. A file really in a legacy CJK charset is almost never valid
UTF-8: its lead bytes are not followed by `0x80`-`0xBF` continuation bytes.
The cost is a legacy file whose few non-ASCII bytes happen to form valid UTF-8:
it reads as UTF-8, as it did before.

The returned text has its `CA` rewritten to `UTF-8`: the library stores this
text and downloads or exports it as UTF-8 bytes, and a `CA` still naming
GB2312 would make every other reader garble it. Saving and copying label the
root `CA[UTF-8]` through `withUtf8Charset` (`exportSGF` and the `KA`-injecting
`saveSGF`), which covers pasted text and files that had no `CA`.

Readers: header Open, the board drop zone and the landing page that uses it,
library import, Tauri drops (`readFile` instead of `readTextFile`; the
capability was already granted) and ZIP import (`uint8array` instead of
JSZip's UTF-8 `string`).

### 4. Labels and liberties

- Shudan columns run A-Z without I, the alphabet of GTP and `@kaya/goboard`,
  then two letters (AA, AB, ...) so all 52 columns of the largest SGF board
  have one.
- `getPseudoLibertyCount` treats an empty neighbour as a liberty and never as
  a way into more stones. From an empty point `-sign` is `0`, so the walk
  entered stones of either colour.

## Learnings

- Bun's `TextDecoder` has the WHATWG legacy decoders (`gbk`, `big5`, `euc-kr`,
  `shift_jis`), so unit tests decode as browsers and the Tauri webviews do.
- The charset fixtures are bytes, generated with Python's codecs and kept out
  of line-ending conversion by `.gitattributes`. The Shift_JIS one holds 表,
  whose second byte is a backslash.
- Left out: `@kaya/ai-engine`'s `sgf-utils.ts` (CLI only) keeps its own replay
  without ranges or `tt`; OGS downloads stay `response.text()`, since OGS
  serves UTF-8.

## Covered by

`packages/sgf/tests/load.test.ts` (ranges, `tt`), `sgf.test.ts` (`parse`,
`parseStrict`), `charset.test.ts` (each fixture, the decode order, the head
limit, BOMs, `withUtf8Charset`), `packages/ui/tests/gameCache.test.ts` (board,
analysis request and history after load), `packages/game-library/tests/indexeddb-storage.test.ts`
(GB2312 ZIP entry), `packages/shudan/tests/helper.test.ts`,
`packages/boardmatcher/tests/boardmatcher.test.ts`, and the e2e
`sgf-load-content.e2e.ts` (range on the board, GB2312 opened and copied as
UTF-8, Shift_JIS through the library) and `sgf-load-errors.e2e.ts` (cut file).
