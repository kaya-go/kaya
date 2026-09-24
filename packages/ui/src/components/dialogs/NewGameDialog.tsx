/**
 * NewGameDialog - Modal dialog for configuring a new game
 *
 * Allows user to configure:
 * - Board size (9, 13, 19)
 * - Player names
 * - Player ranks
 * - Komi
 * - Handicap
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';
import './NewGameDialog.css';

interface NewGameConfig {
  boardSize: number;
  playerBlack: string;
  playerWhite: string;
  rankBlack: string;
  rankWhite: string;
  komi: number;
  handicap: number;
}

interface NewGameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (config: NewGameConfig) => void;
}

export const NewGameDialog: React.FC<NewGameDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();
  useCloseOnBack(isOpen, onClose);
  const [boardSize, setBoardSize] = useState<number>(19);
  const [playerBlack, setPlayerBlack] = useState<string>('Black');
  const [playerWhite, setPlayerWhite] = useState<string>('White');
  const [rankBlack, setRankBlack] = useState<string>('');
  const [rankWhite, setRankWhite] = useState<string>('');
  const [komi, setKomi] = useState<number>(6.5);
  const [handicap, setHandicap] = useState<number>(0);

  const handleConfirm = () => {
    onConfirm({
      boardSize,
      playerBlack,
      playerWhite,
      rankBlack,
      rankWhite,
      komi,
      handicap,
    });
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="new-game-overlay visible" onClick={handleOverlayClick} onWheel={handleWheel}>
      <div className="new-game-dialog" onClick={e => e.stopPropagation()}>
        <h2>{t('newGame')}</h2>

        <div className="form-section">
          <h3>{t('boardSettings')}</h3>

          <div className="form-row">
            <label htmlFor="board-size">{t('boardSize')}</label>
            <div className="board-size-options">
              {[9, 13, 19].map(size => (
                <button
                  key={size}
                  type="button"
                  className={`size-button ${boardSize === size ? 'active' : ''}`}
                  onClick={() => setBoardSize(size)}
                >
                  {size}×{size}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="komi">{t('komi')}</label>
            <input
              id="komi"
              type="number"
              step="0.5"
              value={komi}
              onChange={e => setKomi(parseFloat(e.target.value))}
            />
          </div>

          <div className="form-row">
            <label htmlFor="handicap">{t('handicap')}</label>
            <input
              id="handicap"
              type="number"
              min="0"
              max="9"
              value={handicap}
              onChange={e => setHandicap(parseInt(e.target.value, 10))}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>{t('players')}</h3>

          <div className="player-row">
            <div className="form-row">
              <label htmlFor="player-black">{t('black')}</label>
              <input
                id="player-black"
                type="text"
                value={playerBlack}
                onChange={e => setPlayerBlack(e.target.value)}
                placeholder={t('playerName')}
              />
            </div>

            <div className="form-row">
              <label htmlFor="rank-black">{t('rank')}</label>
              <input
                id="rank-black"
                type="text"
                value={rankBlack}
                onChange={e => setRankBlack(e.target.value)}
                placeholder={t('rankPlaceholder')}
              />
            </div>
          </div>

          <div className="player-row">
            <div className="form-row">
              <label htmlFor="player-white">{t('white')}</label>
              <input
                id="player-white"
                type="text"
                value={playerWhite}
                onChange={e => setPlayerWhite(e.target.value)}
                placeholder={t('playerName')}
              />
            </div>

            <div className="form-row">
              <label htmlFor="rank-white">{t('rank')}</label>
              <input
                id="rank-white"
                type="text"
                value={rankWhite}
                onChange={e => setRankWhite(e.target.value)}
                placeholder={t('rankPlaceholder')}
              />
            </div>
          </div>
        </div>

        <div className="dialog-buttons">
          <button type="button" className="cancel-button" onClick={onClose}>
            {t('cancel')}
          </button>
          <button type="button" className="confirm-button" onClick={handleConfirm}>
            {t('createGame')}
          </button>
        </div>
      </div>
    </div>
  );
};
