import React, { useCallback } from 'react';
import { useGameTreeSelector } from '../../../contexts/GameTreeContext';
import type { GameTreeContextValue } from '../../../types/game';
import { BoardRecognitionDialog } from './BoardRecognitionDialog';

type Props = Omit<React.ComponentProps<typeof BoardRecognitionDialog>, 'currentBoard'>;

/**
 * The dialog fed with the current board. Subscribing here, only while the dialog
 * is open, spares its parents from re-rendering on every navigation.
 */
export const CurrentBoardRecognitionDialog: React.FC<Props> = props => {
  const currentBoard = useGameTreeSelector(
    useCallback((ctx: GameTreeContextValue) => ctx.currentBoard, [])
  );
  return <BoardRecognitionDialog {...props} currentBoard={currentBoard} />;
};
