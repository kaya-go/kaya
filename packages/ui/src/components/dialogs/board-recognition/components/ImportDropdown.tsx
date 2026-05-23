import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { RecognitionResult } from '@kaya/board-recognition';
import type { GoBoard } from '@kaya/goboard';
import type { DeltaStone } from '../utils/deltaStones';
import type { ImportMode } from '../BoardRecognitionDialog';

interface Props {
  result: RecognitionResult | null;
  analyzing: boolean;
  currentBoard?: GoBoard;
  sizeMismatch: boolean;
  delta: DeltaStone[];
  canAddAsMove: boolean;
  deltaMove: DeltaStone | null;
  showPlayMove: boolean;
  onImport: (mode: ImportMode) => void;
  onPlayMove: () => void;
}

export const ImportDropdown: React.FC<Props> = ({
  result,
  analyzing,
  currentBoard,
  sizeMismatch,
  delta,
  canAddAsMove,
  deltaMove,
  showPlayMove,
  onImport,
  onPlayMove,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClick);
    return () => document.removeEventListener('pointerdown', handleClick);
  }, [open]);

  const sizeMismatchTitle = sizeMismatch
    ? t('boardRecognition.sizeMismatch', {
        detected: String(result?.boardSize ?? '?'),
        current: `${currentBoard?.width ?? '?'}×${currentBoard?.height ?? '?'}`,
      })
    : undefined;

  return (
    <div className="brd-dropdown" ref={ref}>
      <button
        className="brd-btn brd-btn-secondary"
        onClick={() => setOpen(prev => !prev)}
        disabled={!result || analyzing}
      >
        {t('boardRecognition.addToBoard')}
        <span className="brd-dropdown-arrow">{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <div className="brd-dropdown-menu">
          <button
            className="brd-dropdown-item"
            onClick={() => {
              setOpen(false);
              onImport('blank');
            }}
          >
            {t('boardRecognition.addBlankBoard')}
          </button>
          <button
            className={`brd-dropdown-item${sizeMismatch ? ' brd-dropdown-item-disabled' : ''}`}
            onClick={() => {
              if (sizeMismatch) return;
              setOpen(false);
              onImport('merge');
            }}
            disabled={sizeMismatch}
            title={sizeMismatchTitle}
          >
            {t('boardRecognition.addMerge')}
          </button>
          {showPlayMove && currentBoard && (
            <button
              className={`brd-dropdown-item${!canAddAsMove || sizeMismatch ? ' brd-dropdown-item-disabled' : ''}`}
              onClick={() => {
                if (!canAddAsMove || sizeMismatch) return;
                setOpen(false);
                onPlayMove();
              }}
              disabled={!canAddAsMove || sizeMismatch}
              title={
                sizeMismatch
                  ? sizeMismatchTitle
                  : !canAddAsMove
                    ? delta.length === 0
                      ? t('boardRecognition.addAsMoveNoDelta')
                      : t('boardRecognition.addAsMoveMultiDelta', { count: String(delta.length) })
                    : undefined
              }
            >
              {t('boardRecognition.addAsMove')}
              {deltaMove && (
                <span className="brd-dropdown-item-badge">
                  {deltaMove.color === 'black' ? '●' : '○'}
                </span>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
