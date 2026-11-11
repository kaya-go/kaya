/**
 * Toast text for a game file that failed to open or to enter the library.
 *
 * The text follows the error's class and `ImportError.kind`, never its
 * message: parser and storage messages are English and can change. A message
 * is only ever shown as the detail after a translated label.
 */

import type { TFunction } from 'i18next';
import { INVALID_SGF_CONTENT, isSgfValidationError } from '@kaya/sgf';
import type { ImportError, ImportResult } from '@kaya/game-library';

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
  const message = formatZipImportError(first, t);
  return others.length > 0 ? `${message} (+${others.length})` : message;
}
