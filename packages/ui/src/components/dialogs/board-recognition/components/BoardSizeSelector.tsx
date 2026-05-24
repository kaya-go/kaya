/**
 * BoardSizeSelector – preset size buttons (9/13/19) plus a custom numeric
 * input. Returns a fragment so it slots into the parent `brd-size-row` flex
 * container alongside the model loading status and sensitivity slider.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PRESET_SIZES } from '../hooks/useBoardRecognition';

interface Props {
  boardSize: number | null;
  setBoardSize: React.Dispatch<React.SetStateAction<number | null>>;
  customSizeInput: string;
  setCustomSizeInput: React.Dispatch<React.SetStateAction<string>>;
  customSizeActive: boolean;
  setCustomSizeActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BoardSizeSelector: React.FC<Props> = ({
  boardSize,
  setBoardSize,
  customSizeInput,
  setCustomSizeInput,
  customSizeActive,
  setCustomSizeActive,
}) => {
  const { t } = useTranslation();

  const isCustomSize =
    customSizeActive || (boardSize !== null && !PRESET_SIZES.includes(boardSize));

  return (
    <>
      <span className="brd-size-label">{t('boardRecognition.selectSize')}</span>
      {PRESET_SIZES.map(s => (
        <button
          key={s}
          className={`brd-size-btn${boardSize === s && !isCustomSize ? ' active' : ''}`}
          onClick={() => {
            setBoardSize(s);
            setCustomSizeActive(false);
            setCustomSizeInput('');
          }}
        >
          {s}×{s}
        </button>
      ))}
      <input
        type="number"
        className={`brd-size-custom-input brd-size-custom-input-inline${isCustomSize ? ' active' : ''}`}
        min={2}
        max={52}
        placeholder={t('boardRecognition.customSize')}
        value={
          isCustomSize
            ? customSizeInput ||
              (boardSize && !PRESET_SIZES.includes(boardSize) ? String(boardSize) : '')
            : ''
        }
        onFocus={() => setCustomSizeActive(true)}
        onBlur={() => {
          if (!customSizeInput) setCustomSizeActive(false);
        }}
        onChange={e => {
          const val = e.target.value;
          setCustomSizeInput(val);
          setCustomSizeActive(true);
          const n = parseInt(val, 10);
          if (n >= 2 && n <= 52) setBoardSize(n);
        }}
      />
    </>
  );
};
