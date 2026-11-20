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
import { INVALID_SGF_CONTENT, parseStrict, parseTolerant } from '@kaya/sgf';
import type { ImportResult } from '@kaya/game-library';
import {
  formatDuplicateError,
  formatImportResultError,
  formatImportResultWarning,
  formatLibraryFileImportError,
  formatOpenedWithDefects,
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
const t = ((key: string, options?: Record<string, string>) => {
  used.add(key);
  const values = Object.values(options ?? {});
  return values.length === 0 ? key : `${key}<${values.join('|')}>`;
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
      withDefects: [],
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

describe('stored content opened or imported without what cannot be read', () => {
  test('a ZIP import names the first entry stored with defects and counts the others', () => {
    const result = (withDefects: string[]): ImportResult => ({
      success: true,
      imported: 3,
      failed: 0,
      errors: [],
      withDefects,
    });
    expect(formatImportResultWarning(result([]), t)).toBeNull();
    expect(formatImportResultWarning(result(['old/cut.sgf', 'b.sgf']), t)).toBe(
      'toast.importedWithDefects<old/cut.sgf> (+1)'
    );
  });

  test('a file opened without a part says where it was', () => {
    const defects = parseTolerant('(;GM[1](;B[aa])X[1](;B[bb])Y[2])').defects;
    expect(formatOpenedWithDefects([], t)).toBeNull();
    expect(formatOpenedWithDefects(defects, t)).toBe(
      'toast.openedWithDefects<Unexpected content after a variation at 1:16> (+1)'
    );
  });

  test('a duplication names the first item it could not copy', () => {
    expect(formatDuplicateError({ copies: [], failures: [] }, t)).toBeNull();
    const failures = [
      { name: 'notes.sgf', cause: refusal('notes') },
      { name: 'b.sgf', cause: new Error('quota exceeded') },
    ];
    expect(formatDuplicateError({ copies: [], failures }, t)).toBe(
      `toast.failedToDuplicate<notes.sgf|${INVALID_SGF_CONTENT}> (+1)`
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
    expect(used.size).toBe(8);
    expect(problems).toEqual([]);
  });
});
