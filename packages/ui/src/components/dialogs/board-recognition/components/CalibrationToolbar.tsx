/**
 * CalibrationToolbar – displays stone counts, grid alignment controls,
 * and calibration mode buttons for the board recognition dialog.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import type {
  BoardCorners,
  CalibrationHint,
  Point,
  RecognitionResult,
} from '@kaya/board-recognition';

type CalibrationMode = 'black' | 'white' | 'empty' | null;

interface CalibrationToolbarProps {
  result: RecognitionResult;
  calibrationMode: CalibrationMode;
  setCalibrationMode: React.Dispatch<React.SetStateAction<CalibrationMode>>;
  settingGrid: boolean;
  toggleGridMode: () => void;
  resetGrid: () => void;
  gridCorners: BoardCorners | null;
  gridClicks: Point[];
  hints: CalibrationHint[];
  onResetCalibration: () => void;
  setSettingGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setGridClicks: React.Dispatch<React.SetStateAction<Point[]>>;
}

export const CalibrationToolbar: React.FC<CalibrationToolbarProps> = ({
  result,
  calibrationMode,
  setCalibrationMode,
  settingGrid,
  toggleGridMode,
  resetGrid,
  gridCorners,
  gridClicks,
  hints,
  onResetCalibration,
  setSettingGrid,
  setGridClicks,
}) => {
  const { t } = useTranslation();

  return (
    <div className="brd-calibration-area">
      {!result.cornersDetected && (
        <span className="brd-warn">{t('boardRecognition.cornersManual')}</span>
      )}
      <div className="brd-calibration-row">
        <span className="brd-calibration-label">{t('boardRecognition.calibrate')}</span>
        <button
          className={`brd-cal-btn brd-cal-black${calibrationMode === 'black' ? ' active' : ''}`}
          onClick={() => {
            setCalibrationMode(calibrationMode === 'black' ? null : 'black');
            setSettingGrid(false);
            setGridClicks([]);
          }}
          title={t('boardRecognition.markBlack')}
        >
          ●
        </button>
        <button
          className={`brd-cal-btn brd-cal-white${calibrationMode === 'white' ? ' active' : ''}`}
          onClick={() => {
            setCalibrationMode(calibrationMode === 'white' ? null : 'white');
            setSettingGrid(false);
            setGridClicks([]);
          }}
          title={t('boardRecognition.markWhite')}
        >
          ○
        </button>
        <button
          className={`brd-cal-btn brd-cal-empty${calibrationMode === 'empty' ? ' active' : ''}`}
          onClick={() => {
            setCalibrationMode(calibrationMode === 'empty' ? null : 'empty');
            setSettingGrid(false);
            setGridClicks([]);
          }}
          title={t('boardRecognition.markEmpty')}
        >
          ✕
        </button>
        {hints.length > 0 && (
          <button
            className="brd-cal-btn brd-cal-reset"
            onClick={onResetCalibration}
            title={t('boardRecognition.resetCalibration')}
          >
            ↺
          </button>
        )}
      </div>
      {settingGrid && (
        <div className="brd-hint">
          {gridCorners
            ? t('boardRecognition.gridFineTuneHint')
            : t('boardRecognition.gridClickHint', { count: gridClicks.length })}
        </div>
      )}
      {calibrationMode && !settingGrid && (
        <div className="brd-hint">{t('boardRecognition.calibrateHint')}</div>
      )}
    </div>
  );
};
