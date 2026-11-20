/**
 * Content already stored in the library: opened, and written back.
 *
 * v0.4.18 and earlier stored and opened files that `parseStrict` now refuses
 * (a value cut by the end of the file, content after a variation). A new file
 * is refused for them, and its owner still has it; a stored one would be lost
 * to the user, so it opens without the parts that cannot be read, with a
 * warning. See specs/2026-11-20-library-stored-content.md.
 */

import {
  isSgfValidationError,
  labelUtf8,
  parseTolerant,
  replaceFirstGame,
  stringify,
  type SgfDefect,
} from '@kaya/sgf';

/**
 * Open stored content with `open`, the editor's strict loader. If the loader
 * refuses it for what a tolerant read can leave out, open what that read holds
 * instead, and return what was left out; an empty list means the content
 * opened as it is. Any other failure is the loader's, rethrown.
 *
 * Strict first, so a sound file costs one parse; only a refused one is read
 * again. The stored text is left as it is: a save writes the game shown.
 */
export async function openStoredGame(
  content: string,
  open: (content: string) => void | Promise<void>
): Promise<SgfDefect[]> {
  try {
    await open(content);
    return [];
  } catch (error) {
    if (!isSgfValidationError(error)) throw error;

    let repaired;
    try {
      repaired = parseTolerant(content);
    } catch {
      throw error;
    }
    // Refused for something else (not a game tree, too many points): as it was.
    if (repaired.defects.length === 0) throw error;

    await open(stringify(repaired.nodes));
    return repaired.defects;
  }
}

/**
 * The text to store when the game shown is saved over the stored file it was
 * opened from. The editor opens the first game of a file, so the other games
 * of a collection are written back as they are stored, every CA saying UTF-8.
 */
export function storedGameSave(stored: string, game: string): string {
  return labelUtf8(replaceFirstGame(stored, game));
}
