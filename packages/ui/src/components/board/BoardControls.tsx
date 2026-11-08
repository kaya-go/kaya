/**
 * BoardControls - Control bar below the Go board
 *
 * Displays:
 * - Captures for both players
 * - Player names and ranks
 * - Pass button
 * - Resign button
 * - Navigation controls
 * - Current player indicator
 */

import React, { useCallback, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameTreeBoard, useGameTreeActions } from '../../contexts/selectors';
import { ConfirmationDialog } from '../dialogs/ConfirmationDialog';
import { BoardControlsNavigation } from './BoardControlsNavigation';
import './BoardControls.css';

export const BoardControls: React.FC = memo(() => {
  const { t } = useTranslation();

  const { currentBoard, currentPlayer, gameInfo } = useGameTreeBoard();
  const { playMove, resign } = useGameTreeActions();
  const [showResignConfirm, setShowResignConfirm] = useState(false);

  // Get captures from current board
  const capturesBlack = currentBoard.getCaptures(1);
  const capturesWhite = currentBoard.getCaptures(-1);

  // Player names with defaults
  const playerBlack = gameInfo.playerBlack || t('gameInfo.black');
  const playerWhite = gameInfo.playerWhite || t('gameInfo.white');
  const rankBlack = gameInfo.rankBlack;
  const rankWhite = gameInfo.rankWhite;

  const handlePass = useCallback(() => {
    // Pass is represented by empty coordinate
    const passVertex: [number, number] = [-1, -1];
    playMove(passVertex, currentPlayer);
  }, [playMove, currentPlayer]);

  const handleResign = useCallback(() => {
    setShowResignConfirm(true);
  }, []);

  const handleResignConfirm = useCallback(() => {
    resign(currentPlayer);
    setShowResignConfirm(false);
  }, [currentPlayer, resign]);

  const handleResignCancel = useCallback(() => {
    setShowResignConfirm(false);
  }, []);

  return (
    <div className="board-controls">
      {/* Left: Black player info */}
      <div className="player-info player-black">
        <div
          className={`player-indicator ${currentPlayer === 1 ? 'active' : ''}`}
          style={{
            background: 'radial-gradient(circle at 35% 35%, #555 0%, #222 30%, #000 100%)',
          }}
        />
        <div className="player-details">
          <div className="player-name">
            {playerBlack}
            {rankBlack && <span className="player-rank"> ({rankBlack})</span>}
          </div>
          <div className="player-captures">
            {capturesBlack} {t('boardControls.captured')}
          </div>
        </div>
      </div>

      {/* Center: Navigation controls */}
      <div className="navigation-section">
        <BoardControlsNavigation currentPlayer={currentPlayer} />
      </div>

      {/* Right: White player info */}
      <div className="player-info player-white">
        <div className="player-details">
          <div className="player-name">
            {playerWhite}
            {rankWhite && <span className="player-rank"> ({rankWhite})</span>}
          </div>
          <div className="player-captures">
            {capturesWhite} {t('boardControls.captured')}
          </div>
        </div>
        <div
          className={`player-indicator ${currentPlayer === -1 ? 'active' : ''}`}
          style={{
            background:
              'radial-gradient(circle at 30% 30%, #fff 0%, #f0f0f0 25%, #d5d5d5 60%, #bbb 100%)',
          }}
        />
      </div>

      {/* Resign Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showResignConfirm}
        title={t('boardControls.resignGame')}
        message={t('boardControls.resignConfirm', {
          player: currentPlayer === 1 ? t('gameInfo.black') : t('gameInfo.white'),
        })}
        confirmLabel={t('boardControls.resign')}
        cancelLabel={t('cancel')}
        onConfirm={handleResignConfirm}
        onCancel={handleResignCancel}
      />
    </div>
  );
});
