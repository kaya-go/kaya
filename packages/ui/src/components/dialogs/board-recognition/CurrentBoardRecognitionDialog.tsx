import React, { useCallback } from 'react';
import { useGameTreeSelector } from '../../../contexts/GameTreeContext';
import type { GameTreeContextValue } from '../../../types/game';
import { BoardRecognitionDialog } from './BoardRecognitionDialog';
import { useRecognitionImport } from './hooks/useRecognitionImport';

interface Props {
  file: File;
  onClose: () => void;
  /** Brings the board into view after an import; the phone landing page has none. */
  onNavigateToBoard?: () => void;
}

/**
 * The dialog fed with the current board, importing into the current game.
 * Subscribing here, only while the dialog is open, spares its parents from
 * re-rendering on every navigation.
 */
export const CurrentBoardRecognitionDialog: React.FC<Props> = ({
  file,
  onClose,
  onNavigateToBoard,
}) => {
  const currentBoard = useGameTreeSelector(
    useCallback((ctx: GameTreeContextValue) => ctx.currentBoard, [])
  );
  const { importStones, importAsGame, playFoundMove } = useRecognitionImport({
    close: onClose,
    onNavigateToBoard,
  });
  return (
    <BoardRecognitionDialog
      file={file}
      currentBoard={currentBoard}
      onImport={importStones}
      onImportSGF={importAsGame}
      onPlayMove={playFoundMove}
      onClose={onClose}
    />
  );
};
