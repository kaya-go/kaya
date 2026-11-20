/**
 * What happens to a recognised board once the user picks an import action.
 * The header's Scan board and a photo dropped on the app share it.
 */

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Sign, Vertex } from '@kaya/goboard';
import { vertexToSGF } from '@kaya/sgf';
import { useGameTreeSelector } from '../../../../contexts/GameTreeContext';
import { useLibrary } from '../../../../contexts/LibraryContext';
import type { GameTreeContextValue } from '../../../../types/game';
import { useToast } from '../../../ui/Toast';
import { formatSgfLoadError } from '../../../../utils/sgfLoadErrors';

type RecognizedStone = { x: number; y: number; color: 'black' | 'white' };

interface Options {
  /** Closes the recognition dialog. */
  close: () => void;
  /** Brings the board into view; the phone landing page has none on screen. */
  onNavigateToBoard?: () => void;
}

export function useRecognitionImport({ close, onNavigateToBoard }: Options) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { checkUnsavedChanges, clearLoadedFile } = useLibrary();
  const { addSetupPosition, loadSGFAsync, setFileName, playMove } = useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        addSetupPosition: ctx.addSetupPosition,
        loadSGFAsync: ctx.loadSGFAsync,
        setFileName: ctx.setFileName,
        playMove: ctx.playMove,
      }),
      []
    )
  );

  /** Adds the stones to the current game as a setup node. */
  const importStones = useCallback(
    (stones: RecognizedStone[], boardSize: number, mode: 'blank' | 'merge') => {
      close();
      const coord = (x: number, y: number) => vertexToSGF([x, y]);
      const black = stones.filter(s => s.color === 'black').map(s => coord(s.x, s.y));
      const white = stones.filter(s => s.color === 'white').map(s => coord(s.x, s.y));

      // 'blank' clears every intersection first, so the position starts empty.
      let clear: string[] | undefined;
      if (mode === 'blank') {
        clear = [];
        for (let x = 0; x < boardSize; x++) {
          for (let y = 0; y < boardSize; y++) clear.push(coord(x, y));
        }
      }

      const comment = t('boardRecognition.importComment', {
        size: boardSize,
        count: stones.length,
      });
      addSetupPosition(black, white, comment, clear);
      onNavigateToBoard?.();
    },
    [addSetupPosition, close, onNavigateToBoard, t]
  );

  /**
   * Opens the recognised board as a new game. It replaces the current one, so
   * it asks about unsaved changes first, like every other way to open a game.
   */
  const importAsGame = useCallback(
    async (sgf: string) => {
      close();
      if (!(await checkUnsavedChanges())) return;
      try {
        await loadSGFAsync(sgf);
        setFileName('scan.sgf');
        clearLoadedFile();
        onNavigateToBoard?.();
      } catch (error) {
        showToast(formatSgfLoadError(error, t), 'error');
      }
    },
    [
      checkUnsavedChanges,
      clearLoadedFile,
      close,
      loadSGFAsync,
      onNavigateToBoard,
      setFileName,
      showToast,
      t,
    ]
  );

  /** Plays the move the dialog found between the current board and the photo. */
  const playFoundMove = useCallback(
    (vertex: Vertex, sign: Sign) => {
      playMove(vertex, sign);
      onNavigateToBoard?.();
    },
    [playMove, onNavigateToBoard]
  );

  return { importStones, importAsGame, playFoundMove };
}
