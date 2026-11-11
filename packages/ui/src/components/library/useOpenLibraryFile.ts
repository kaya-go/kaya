/**
 * Open a library file in the editor, with a toast when it cannot be loaded.
 *
 * A file stored before the library required a game tree can hold anything;
 * the editor refuses it, and the library must not then show it as the open file.
 */

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { LibraryItemId } from '@kaya/game-library';
import { useLibrary } from '../../contexts/LibraryContext';
import { useToast } from '../ui/Toast';
import { formatSgfLoadError } from '../../utils/sgfLoadErrors';

export function useOpenLibraryFile(): (id: LibraryItemId) => void {
  const { openFile } = useLibrary();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useCallback(
    (id: LibraryItemId) => {
      openFile(id).catch(error => showToast(formatSgfLoadError(error, t), 'error'));
    },
    [openFile, showToast, t]
  );
}
