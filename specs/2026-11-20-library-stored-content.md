---
date: 2026-11-20
status: shipped
scope: sgf, library
---

# Stored library games open, copy, restore; saves keep a collection

## Context

A pre-release review of 0.4.19 found three defects around content already in
the library. The first two come from
[2026-11-20-sgf-loading-defects](2026-11-20-sgf-loading-defects.md) (#236);
the third is older.

| Defect                                                                                                                 | Effect                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `parseStrict` refuses a value cut by the end of the file and content after a variation; v0.4.18 stored and opened both | Such a file in the library no longer opened, could not be duplicated, stopped a folder duplication halfway, and failed when a v0.4.18 ZIP backup was restored |
| `decodeSgf` relabelled only the first `CA`                                                                             | A two-game GB2312 collection was stored as UTF-8 text with game 2 still saying `CA[gb2312]`; another reader honouring it garbled the game                     |
| The editor opens the first game of a file, and Save wrote that game alone over the library file                        | The other games of a collection were lost on the first save                                                                                                   |

Examples v0.4.18 opened and main refused: `(;GM[1](;B[aa])(;B[bb]);W[cc])`
(opened without `W[cc]`), `(;GM[1];B[aa];W[bb` (opened as `W[b]`) and
`(;GM[1]C[path C:\])` (the `\]` escapes the bracket, so the value runs to the
end of the file).

## Decision

### 1. Stored content opens through a tolerant read, with a warning

The user decided: content already in the library opens through a tolerant
fallback with a visible warning; a new file keeps #236's strict refusal.

[`parseTolerant`](../packages/sgf/src/validation.ts) is a third mode of the
same parser (`parseChecked` takes an `onDefect` callback: `parseStrict`'s
throws, `parseTolerant`'s records). It refuses what `parseStrict` refuses
for not being a game tree at all, and leaves out, returning an `SgfDefect`
for each:

- **A value cut by the end of the input**, with its property if it had no
  other value. `W[bb` must not open as `W[b]` (v0.4.18) or `W[bb]` (a move
  that may never have been played), and an empty `W` key would still read as a
  white move. Whole values before it in the same property are kept
  (`AB[aa][bb][c` keeps `aa` and `bb`). A cut comment goes too:
  `C[path C:\])` opens with no comment.
- **Content after a variation**, skipped as v0.4.18 skipped it, one defect
  per skipped run.

Where it applies, all for content that was in a library:

| Path                                            | Check                                                                                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Open from the library                           | Strict first; on an `SgfValidationError`, the tolerant read, its text opened and an info toast naming the first defect |
| Duplicate a file or folder                      | `createFile({ validation: 'tolerant' })`: the copy is the stored text, byte for byte                                   |
| ZIP import                                      | Tolerant, stored as written; an info toast names the first entry with defects                                          |
| Save over the open library file                 | `updateFile(..., { validation: 'tolerant' })`, since the other games of a collection are kept as stored                |
| Header Open, drop, paste, `.sgf` library import | Strict, unchanged                                                                                                      |

The stored text is never rewritten by an open: a save writes the game shown.

**Open** is strict first ([`openStoredGame`](../packages/ui/src/utils/storedGame.ts)),
so a sound file costs one parse; only a refused one is read again. The
fallback lives in `LibraryContext.openFile`, so neither app's `onFileOpen`
changed.

**Duplication** never stops halfway: each file and subfolder is attempted,
failures (content that is not a game, a storage error) are collected, the
rest is still copied, and a toast names the first failure and counts the
others. Before, the first `createFile` that threw left a half-copied folder
and an unhandled rejection.

**ZIP import is tolerant** (decided here, not by the user). A ZIP is how a
library is backed up and moved (Export Library), and the library now
knowingly holds content `parseStrict` refuses, which the export writes as is.
A strict import would make Kaya unable to restore its own backup, made today
or by v0.4.18, and the games would be unreachable in Kaya by any path: the
reasoning that already accepts a missing final `)`. An arbitrary ZIP from the
web goes through the same rule; what #236 guards against (a move never
played on the board) cannot come back, since the open leaves the cut value
out. A single `.sgf` stays strict: its owner sees the refusal at once and
still has the file.

### 2. Every `CA` is relabelled

[`labelUtf8`](../packages/sgf/src/charset.ts) rewrites every `CA` value of the
decoded text, not only the first one in the first 64 KiB. It walks the
tokenizer, so `CA[GB2312\]` inside a comment is left alone, and it skips a
value cut by the end of the input: rewriting `CA[gb2` to `CA[UTF-8]` would
close the cut file and let `parseStrict` accept it. A regex pass over the
whole text first spares the tokenizer every file whose `CA` labels all say
UTF-8.

### 3. A save puts the edited game in the place of the first one

[`replaceFirstGame`](../packages/sgf/src/collection.ts) finds the first game
tree through the tokenizer (first `(` outside a value to its matching `)`, or
to the end of the text) and replaces that span. Everything else is kept
character for character, damaged games included. With no other game tree
after it, the result is the new game alone, as before. The save then runs
`labelUtf8`, so a collection stored with a stale `CA` on game 2 is fixed on
its next save.

## Alternatives

- **Stringify the whole collection on save.** Reformats the other games, and
  a tolerant read drops what it cannot read from a damaged game 2 without the
  user ever opening it.
- **Read every library file tolerantly up front.** One extra full parse on
  every open, for a case that only concerns old files.
- **Copy without any check.** Also copies content that is not a game at all
  (stored before #169); the tolerant check refuses only that.
- **Strict ZIP import.** See above: a backup could not be restored.

## Open questions

- Kaya opens only the first game of a collection, without saying the file
  holds more. Letting the user pick a game, or at least telling them, is a
  product decision.
- Save As / export to a file on disk (desktop) still writes the game shown
  only. It is a new file the user names, so nothing is overwritten unless the
  user picks the original collection's path.

## Covered by

`packages/sgf/tests/sgf.test.ts` (`parseTolerant`), `charset.test.ts`
(two-game GB2312 collection, `labelUtf8`), `collection.test.ts`
(`replaceFirstGame`), `packages/game-library/tests/indexeddb-storage.test.ts`
(tolerant create and update, a v0.4.18 backup restored), `utils.test.ts`,
`packages/ui/tests/storedGame.test.ts` (open fallback, save over a
collection), `sgfLoadErrors.test.ts` (toasts, all locales), and the e2e
`library-stored-content.e2e.ts` (open, folder duplicate, ZIP restore, save
over a collection).
