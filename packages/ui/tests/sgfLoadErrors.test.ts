/**
 * Toast text for a file that failed to open or to enter the library.
 *
 * The label must follow what actually failed: only refused content is called
 * invalid SGF, so a read or storage failure is not blamed on the file. The
 * translator here is a stub that echoes the key, which is what the branches
 * choose; the last test checks every locale has those keys.
 */

import { describe, test, expect } from 'bun:test';
import type { TFunction } from 'i18next';
import { parseStrict } from '@kaya/sgf';
import type { ImportResult } from '@kaya/game-library';
import {
  formatImportResultError,
  formatLibraryFileImportError,
  formatSgfLoadError,
  formatZipImportError,
} from '../src/utils/sgfLoadErrors';

import en from '../../i18n/src/locales/en.json';
import zh from '../../i18n/src/locales/zh.json';
import ko from '../../i18n/src/locales/ko.json';
import ja from '../../i18n/src/locales/ja.json';
import fr from '../../i18n/src/locales/fr.json';
import de from '../../i18n/src/locales/de.json';
import es from '../../i18n/src/locales/es.json';
import it from '../../i18n/src/locales/it.json';

const used = new Set<string>();
const t = ((key: string, options?: { error?: string }) => {
  used.add(key);
  return options?.error === undefined ? key : `${key}<${options.error}>`;
}) as unknown as TFunction;

/** The error a loader gets for this content. */
function refusal(content: string): unknown {
  try {
    parseStrict(content);
  } catch (error) {
    return error;
  }
  throw new Error('content was accepted');
}

describe('formatSgfLoadError', () => {
  test('content that is not a game tree: the label alone', () => {
    expect(formatSgfLoadError(refusal('hello'), t)).toBe('toast.invalidSgfContent');
  });

  test('a parser error: the label with where it stopped', () => {
    expect(formatSgfLoadError(refusal('(;B[aa]])'), t)).toMatch(
      /^toast\.invalidSgfContentDetail<Unexpected token/
    );
  });

  test('any other failure is not called invalid SGF', () => {
    expect(formatSgfLoadError(new Error('permission denied'), t)).toBe(
      'toast.failedToLoadSgf<permission denied>'
    );
    expect(formatSgfLoadError('Error: forbidden path', t)).toBe(
      'toast.failedToLoadSgf<forbidden path>'
    );
  });
});

describe('library import errors', () => {
  test('a refused .sgf reads as invalid SGF, a storage failure as an import failure', () => {
    expect(formatLibraryFileImportError(refusal(''), t)).toBe('toast.invalidSgfContent');
    expect(formatLibraryFileImportError(new Error('quota exceeded'), t)).toBe(
      'toast.failedToImportToLibrary<quota exceeded>'
    );
  });

  test('a ZIP entry names its path', () => {
    expect(formatZipImportError({ kind: 'sgf', path: 'pro/bad.sgf', cause: refusal('x') }, t)).toBe(
      'toast.invalidSgfContent (pro/bad.sgf)'
    );
    expect(
      formatZipImportError({ kind: 'folder', path: 'pro', cause: new Error('exists') }, t)
    ).toBe('toast.failedToImportZip<pro: exists>');
    expect(formatZipImportError({ kind: 'zip', cause: new Error('not a zip') }, t)).toBe(
      'toast.failedToImportZip<not a zip>'
    );
  });

  test('a ZIP import reports nothing when all went in, and counts what it does not name', () => {
    const result = (errors: ImportResult['errors']): ImportResult => ({
      success: true,
      imported: 3,
      failed: errors.length,
      errors,
    });
    const bad = (path: string) => ({ kind: 'sgf' as const, path, cause: refusal('x') });

    expect(formatImportResultError(result([]), t)).toBeNull();
    expect(formatImportResultError(result([bad('a.sgf')]), t)).toBe(
      'toast.invalidSgfContent (a.sgf)'
    );
    expect(formatImportResultError(result([bad('a.sgf'), bad('b.sgf'), bad('c.sgf')]), t)).toBe(
      'toast.invalidSgfContent (a.sgf) (+2)'
    );
  });
});

describe('toast keys', () => {
  test('every locale has every key the formatters use', () => {
    const problems: string[] = [];
    for (const [locale, messages] of Object.entries({ en, zh, ko, ja, fr, de, es, it })) {
      const toast = (messages as { toast: Record<string, string> }).toast;
      for (const key of used) {
        if (!toast[key.replace(/^toast\./, '')]) problems.push(`${locale}: missing "${key}"`);
      }
    }
    expect(used.size).toBe(5);
    expect(problems).toEqual([]);
  });
});
