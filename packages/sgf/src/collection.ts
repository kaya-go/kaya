/**
 * @kaya/sgf - A collection: one file holding several game trees.
 *
 * Kaya opens the first game of a file. Writing the file back with that game
 * alone loses the others, so a save puts the edited game in the place of the
 * first one and keeps the rest of the text as it is.
 */

import { tokenizeIter } from './parser';

/**
 * The collection with its first game tree replaced by `game`, everything else
 * kept character for character, damaged or not: re-reading the other games
 * would reformat them, and a tolerant read would drop what it cannot read.
 *
 * The first game tree is the one `parse` reads first: from the first "("
 * outside any value to the ")" that closes it, or to the end of the text if
 * none does. When no other game tree follows, the result is `game` alone.
 */
export function replaceFirstGame(collection: string, game: string): string {
  let start = -1;
  let end = -1;
  let depth = 0;
  let hasMore = false;

  for (const token of tokenizeIter(collection)) {
    if (token.type !== 'parenthesis') continue;

    if (end !== -1) {
      // The parser stops at a ")" between game trees; a "(" starts the next.
      hasMore = token.value === '(';
      break;
    }
    if (token.value === '(') {
      if (start === -1) start = token.pos;
      depth++;
    } else if (depth === 0) {
      break; // A ")" before any game tree: the parser reads nothing past it
    } else if (--depth === 0) {
      end = token.pos + 1;
    }
  }

  if (!hasMore) return game;
  // Without its trailing line break, so saving again does not add one each time.
  return `${collection.slice(0, start)}${game.trimEnd()}${collection.slice(end)}`;
}
