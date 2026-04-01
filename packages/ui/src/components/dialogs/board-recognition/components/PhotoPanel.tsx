import React, { SetStateAction, Dispatch, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCanvasInteraction } from '../hooks/useCanvasInteraction';
import type { BoardCorners, RawImage } from '@kaya/board-recognition';

/** Check if any corner point falls outside the image bounds. */
function hasOutOfBoundsCorners(
  corners: BoardCorners | null,
  rawDims: { width: number; height: number }
): boolean {
  if (!corners) return false;
  return corners.some(
    ([x, y]) => x < -0.5 || y < -0.5 || x > rawDims.width + 0.5 || y > rawDims.height + 0.5
  );
}

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

  const cornersOutOfBounds = useMemo(
    () => hasOutOfBoundsCorners(corners, rawDimsRef.current),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [corners]
  );
  const [fitAll, setFitAll] = useState(false);
  // Auto-enable fitAll when corners go out of bounds
  const effectiveFitAll = fitAll || cornersOutOfBounds;

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
      fitAll: effectiveFitAll,
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
        {cornersOutOfBounds && (
          <button
            className="brd-fit-toggle-btn"
            onClick={() => setFitAll(f => !f)}
            title={effectiveFitAll ? t('boardRecognition.fitImage') : t('boardRecognition.fitAll')}
          >
            {effectiveFitAll ? t('boardRecognition.fitImage') : t('boardRecognition.fitAll')}
          </button>
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
