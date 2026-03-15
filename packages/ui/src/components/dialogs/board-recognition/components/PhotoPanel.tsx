import React, { SetStateAction, Dispatch } from 'react';
import { useTranslation } from 'react-i18next';
import { useCanvasInteraction } from '../hooks/useCanvasInteraction';
import type { BoardCorners, RawImage } from '@kaya/board-recognition';

interface PhotoPanelProps {
  rawImage: RawImage | null;
  objectURL: string | null;
  corners: BoardCorners | null;
  setCorners: Dispatch<SetStateAction<BoardCorners | null>>;
  setHints: Dispatch<SetStateAction<any[]>>;
  setGridClicks: Dispatch<SetStateAction<any[]>>;
  setSettingGrid: Dispatch<SetStateAction<boolean>>;
  scheduleReclassify: (newCorners: BoardCorners) => void;
  cancelReclassify: () => void;
  rawDimsRef: React.MutableRefObject<{ width: number; height: number }>;
  cornersRef: React.MutableRefObject<BoardCorners | null>;
  cornersManuallySet: boolean;
  resetCornersToAuto: () => void;
  hasResult: boolean;
  analyzing: boolean;
  className?: string;
}

export const PhotoPanel: React.FC<PhotoPanelProps> = ({
  rawImage,
  objectURL,
  corners,
  setCorners,
  setHints,
  setGridClicks,
  setSettingGrid,
  scheduleReclassify,
  cancelReclassify,
  rawDimsRef,
  cornersRef,
  cornersManuallySet,
  resetCornersToAuto,
  hasResult,
  analyzing,
  className,
}) => {
  const { t } = useTranslation();

  const { canvasRef, containerRef, onPointerDown, onPointerMove, onPointerUp } =
    useCanvasInteraction({
      rawImage,
      objectURL,
      corners,
      setCorners,
      setHints,
      setGridClicks,
      setSettingGrid,
      scheduleReclassify,
      cancelReclassify,
      rawDimsRef,
      cornersRef,
    });

  return (
    <div className={`brd-panel brd-panel-photo${className ? ` ${className}` : ''}`}>
      <div className="brd-panel-title brd-step-title">
        <span className="brd-step-badge">1</span>
        {t('boardRecognition.stepCorners')}
      </div>
      <div className="brd-canvas-wrap" ref={containerRef}>
        {objectURL ? (
          <canvas
            ref={canvasRef}
            className="brd-canvas"
            style={{
              cursor: corners ? 'crosshair' : 'default',
              touchAction: 'none',
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          />
        ) : (
          <div className="brd-placeholder">{t('loading.loading')}</div>
        )}
        {analyzing && !corners && objectURL && (
          <div className="brd-photo-analyzing">
            <div className="brd-spinner" />
          </div>
        )}
      </div>
      <div className="brd-corner-actions">
        {corners && <div className="brd-hint">{t('boardRecognition.dragHint')}</div>}
        <div className="brd-corner-actions-btns">
          {hasResult && (
            <span
              className={`brd-corners-status ${cornersManuallySet ? 'brd-corners-manual' : 'brd-corners-auto'}`}
            >
              {cornersManuallySet
                ? t('boardRecognition.cornersAdjusted')
                : t('boardRecognition.cornersAutoDetected')}
            </span>
          )}
          {cornersManuallySet && (
            <button
              className="brd-reset-corners-btn"
              onClick={resetCornersToAuto}
              title={t('boardRecognition.resetCorners')}
            >
              ↺ {t('boardRecognition.resetCorners')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
