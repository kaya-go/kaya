/**
 * PreviewPanel – right-side (or mobile tab 2) panel containing the warped
 * board preview, per-state spinners/placeholders, delta legend, and
 * calibration toolbar. Mirrors the structure of the left-side PhotoPanel.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import type {
  BoardCorners,
  CalibrationHint,
  Point,
  RecognitionResult,
} from '@kaya/board-recognition';
import { BoardPreview } from './BoardPreview';
import { CalibrationToolbar } from './CalibrationToolbar';
import { DeltaLegend } from './DeltaLegend';
import { SensitivitySlider } from './SensitivitySlider';
import type { DeltaStone } from '../utils/deltaStones';

type CalibrationMode = 'black' | 'white' | 'empty' | null;

interface Props {
  isMobile: boolean;
  isVisible: boolean;

  result: RecognitionResult | null;
  analyzing: boolean;
  mokuLoading: boolean;
  boardSize: number | null;
  objectURL: string | null;
  corners: BoardCorners | null;

  // Sensitivity slider (mobile)
  mokuReady: boolean;
  mokuThreshold: number;
  handleMokuThresholdChange: (value: number) => void;
  commitMokuThreshold: () => void;

  // Preview interactions
  hints: CalibrationHint[];
  calibrationMode: CalibrationMode;
  onPreviewClick: (col: number, row: number) => void;
  gridCorners: BoardCorners | null;
  settingGrid: boolean;
  gridClicks: Point[];
  onGridClick: (warpX: number, warpY: number) => void;

  // Delta
  canAddAsMove: boolean;
  deltaMove: DeltaStone | null;
  delta: DeltaStone[];
  showDelta: boolean;
  setShowDelta: React.Dispatch<React.SetStateAction<boolean>>;

  // Calibration toolbar
  setCalibrationMode: React.Dispatch<React.SetStateAction<CalibrationMode>>;
  toggleGridMode: () => void;
  resetGrid: () => void;
  onResetCalibration: () => void;
  setSettingGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setGridClicks: React.Dispatch<React.SetStateAction<Point[]>>;
}

export const PreviewPanel: React.FC<Props> = ({
  isMobile,
  isVisible,
  result,
  analyzing,
  mokuLoading,
  boardSize,
  objectURL,
  corners,
  mokuReady,
  mokuThreshold,
  handleMokuThresholdChange,
  commitMokuThreshold,
  hints,
  calibrationMode,
  onPreviewClick,
  gridCorners,
  settingGrid,
  gridClicks,
  onGridClick,
  canAddAsMove,
  deltaMove,
  delta,
  showDelta,
  setShowDelta,
  setCalibrationMode,
  toggleGridMode,
  resetGrid,
  onResetCalibration,
  setSettingGrid,
  setGridClicks,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`brd-panel brd-panel-preview${isMobile && !isVisible ? ' brd-mobile-hidden' : ''}`}
    >
      {!isMobile && (
        <div className="brd-panel-title brd-step-title">
          <span className="brd-step-badge">2</span>
          {t('boardRecognition.stepReview')}
          {result && !analyzing && (
            <span className="brd-panel-stats">
              <span className="brd-stat black">
                ● {result.stones.filter(s => s.color === 'black').length}
              </span>
              <span className="brd-stat white">
                ○ {result.stones.filter(s => s.color === 'white').length}
              </span>
            </span>
          )}
        </div>
      )}
      {isMobile && result && !analyzing && (
        <div className="brd-mobile-preview-bar">
          <span className="brd-mobile-counts">
            <span className="brd-stat black">
              ● {result.stones.filter(s => s.color === 'black').length}
            </span>
            <span className="brd-stat white">
              ○ {result.stones.filter(s => s.color === 'white').length}
            </span>
          </span>
          {mokuReady && (
            <span className="brd-mobile-sensitivity">
              <SensitivitySlider
                variant="mobile"
                mokuThreshold={mokuThreshold}
                handleMokuThresholdChange={handleMokuThresholdChange}
                commitMokuThreshold={commitMokuThreshold}
              />
            </span>
          )}
        </div>
      )}
      <div className="brd-preview-wrap">
        {analyzing && !result && (
          <div className="brd-analyzing">
            <div className="brd-spinner" />
            <span>{t('boardRecognition.analyzing')}</span>
          </div>
        )}
        {!analyzing && !result && mokuLoading && (
          <div className="brd-analyzing">
            <div className="brd-spinner" />
            <span>{t('boardRecognition.loadingModel')}</span>
          </div>
        )}
        {!analyzing && !boardSize && (
          <div className="brd-placeholder">{t('boardRecognition.chooseSizeFirst')}</div>
        )}
        {((!analyzing && boardSize) || analyzing) && result && (
          <>
            <BoardPreview
              result={result}
              objectURL={objectURL}
              corners={corners}
              hints={hints}
              calibrationMode={calibrationMode}
              onIntersectionClick={onPreviewClick}
              gridCorners={gridCorners}
              settingGrid={settingGrid}
              gridClicks={gridClicks}
              onGridClick={onGridClick}
              moveMarker={canAddAsMove ? deltaMove : undefined}
              delta={showDelta ? delta : undefined}
            />
            {analyzing && <div className="brd-moku-overlay-spinner" />}
          </>
        )}
      </div>

      {delta.length > 0 && result && !analyzing && (
        <DeltaLegend delta={delta} showDelta={showDelta} setShowDelta={setShowDelta} />
      )}

      {result && !analyzing && (
        <CalibrationToolbar
          result={result}
          calibrationMode={calibrationMode}
          setCalibrationMode={setCalibrationMode}
          settingGrid={settingGrid}
          toggleGridMode={toggleGridMode}
          resetGrid={resetGrid}
          gridCorners={gridCorners}
          gridClicks={gridClicks}
          hints={hints}
          onResetCalibration={onResetCalibration}
          setSettingGrid={setSettingGrid}
          setGridClicks={setGridClicks}
        />
      )}
    </div>
  );
};
