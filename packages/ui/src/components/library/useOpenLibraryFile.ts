/**
 * Open a library file in the editor, with a toast when it cannot be loaded.
 *
 * A file stored before the library required a game tree can hold anything;
 * the editor refuses it, and the library must not then show it as the open file.
 * One stored with parts that cannot be read opens without them, and says so.
 */

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { LibraryItemId } from '@kaya/game-library';
import { useLibrary } from '../../contexts/LibraryContext';
import { useToast } from '../ui/Toast';
import { formatOpenedWithDefects, formatSgfLoadError } from '../../utils/sgfLoadErrors';

export function useOpenLibraryFile(): (id: LibraryItemId) => void {
  const { openFile } = useLibrary();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useCallback(
    (id: LibraryItemId) => {
      openFile(id).then(
        defects => {
          const warning = formatOpenedWithDefects(defects, t);
          if (warning) showToast(warning, 'info');
        },
        error => showToast(formatSgfLoadError(error, t), 'error')
      );
    },
    [openFile, showToast, t]
  );
}
