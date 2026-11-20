/**
 * Toast text for a game file that failed to open or to enter the library, or
 * that a stored file opened or entered it without parts that cannot be read.
 *
 * The text follows the error's class and `ImportError.kind`, never its
 * message: parser and storage messages are English and can change. A message
 * is only ever shown as the detail after a translated label.
 */

import type { TFunction } from 'i18next';
import { INVALID_SGF_CONTENT, isSgfValidationError, type SgfDefect } from '@kaya/sgf';
import type { ImportError, ImportResult } from '@kaya/game-library';
import type { DuplicateResult } from '../contexts/library-types';

/** The first of a list named, the others counted. */
function withOthers(message: string, others: unknown[]): string {
  return others.length > 0 ? `${message} (+${others.length})` : message;
}

function errorDetail(error: unknown): string {
  const detail = error instanceof Error ? error.message || error.name : String(error);
  return detail.replace(/^Error:\s*/, '');
}

/** A file that failed to open in the editor. */
export function formatSgfLoadError(error: unknown, t: TFunction): string {
  const detail = errorDetail(error);
  // Reading the file or building its tree can fail too; only a refused
  // content is called invalid SGF.
  if (!isSgfValidationError(error)) {
    return t('toast.failedToLoadSgf', { error: detail });
  }
  return detail === INVALID_SGF_CONTENT
    ? t('toast.invalidSgfContent')
    : t('toast.invalidSgfContentDetail', { error: detail });
}

/** A single .sgf that failed to enter the library. */
export function formatLibraryFileImportError(error: unknown, t: TFunction): string {
  if (isSgfValidationError(error)) return formatSgfLoadError(error, t);
  return t('toast.failedToImportToLibrary', { error: errorDetail(error) });
}

/** One failure of a ZIP import. */
export function formatZipImportError(error: ImportError, t: TFunction): string {
  switch (error.kind) {
    case 'sgf':
      return `${formatLibraryFileImportError(error.cause, t)} (${error.path})`;
    case 'folder':
      return t('toast.failedToImportZip', {
        error: `${error.path}: ${errorDetail(error.cause)}`,
      });
    case 'zip':
      return t('toast.failedToImportZip', { error: errorDetail(error.cause) });
  }
}

/**
 * Toast text for a finished ZIP import, or null when every entry went in.
 * Names the first failure and counts the others.
 */
export function formatImportResultError(result: ImportResult, t: TFunction): string | null {
  const [first, ...others] = result.errors;
  if (!first) return null;
  return withOthers(formatZipImportError(first, t), others);
}

/**
 * Warning for a finished ZIP import that stored entries with parts that
 * cannot be read, or null when there were none.
 */
export function formatImportResultWarning(result: ImportResult, t: TFunction): string | null {
  const [first, ...others] = result.withDefects;
  if (!first) return null;
  return withOthers(t('toast.importedWithDefects', { path: first }), others);
}

/**
 * Warning for a stored file that opened without parts that cannot be read,
 * or null when it opened as it is.
 */
export function formatOpenedWithDefects(defects: SgfDefect[], t: TFunction): string | null {
  const [first, ...others] = defects;
  if (!first) return null;
  return withOthers(t('toast.openedWithDefects', { error: first.message }), others);
}

/** Error for the items a duplication could not copy, or null when it copied all. */
export function formatDuplicateError(result: DuplicateResult, t: TFunction): string | null {
  const [first, ...others] = result.failures;
  if (!first) return null;
  const message = t('toast.failedToDuplicate', {
    name: first.name,
    error: errorDetail(first.cause),
  });
  return withOthers(message, others);
}
