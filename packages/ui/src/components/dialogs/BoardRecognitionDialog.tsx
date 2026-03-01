/**
 * BoardRecognitionDialog – photo → SGF import with corner dragging,
 * stone calibration, and AI-powered board detection.
 */
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  BoardCorners,
  CalibrationHint,
  Point,
  RecognitionResult,
  StoneColor,
} from '@kaya/board-recognition';
import { buildSGF, orderCorners } from '@kaya/board-recognition';
import { BoardPreview } from './BoardPreview';
import { CalibrationToolbar } from './CalibrationToolbar';
import { PRESET_SIZES, useBoardRecognition } from './useBoardRecognition';
import { useCanvasInteraction } from './useCanvasInteraction';
import './BoardRecognitionDialog.css';
import './BoardRecognitionDialogControls.css';
import './BoardRecognitionDialogCanvas.css';

interface Props {
  file: File;
  onImport: (sgf: string, filename: string) => void;
  onClose: () => void;
}

export const BoardRecognitionDialog: React.FC<Props> = ({ file, onImport, onClose }) => {
  const { t } = useTranslation();

  const [boardSize, setBoardSize] = useState<number | null>(19);
  const [detectionBackend, setDetectionBackend] = useState<'classic' | 'moku'>('moku');
  const [mokuThreshold, setMokuThreshold] = useState(0.05);
  const [calibrationMode, setCalibrationMode] = useState<'black' | 'white' | 'empty' | null>(null);
  const [gridClicks, setGridClicks] = useState<Point[]>([]);
  const [settingGrid, setSettingGrid] = useState(false);
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [customSizeActive, setCustomSizeActive] = useState(false);

  const recognition = useBoardRecognition(
    file,
    boardSize,
    detectionBackend,
    mokuThreshold,
    setMokuThreshold
  );

  const {
    rawImage,
    objectURL,
    corners,
    setCorners,
    result,
    setResult,
    analyzing,
    warping,
    loadError,
    mokuReady,
    mokuLoading,
    mokuProgress,
    gridCorners,
    setGridCorners,
    gridCornersRef,
    hints,
    setHints,
    scheduleReclassify,
    reclassifyWithHints,
    doReclassifyNow,
    handleMokuThresholdChange,
    rawDimsRef,
    cornersRef,
  } = recognition;

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
      rawDimsRef,
      cornersRef,
    });

  const onGridClick = useCallback(
    (warpX: number, warpY: number) => {
      const pt: Point = [warpX, warpY];

      if (gridCorners) {
        let bestIdx = 0,
          bestDist = Infinity;
        for (let i = 0; i < 4; i++) {
          const d = Math.hypot(warpX - gridCorners[i][0], warpY - gridCorners[i][1]);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        }
        const updated = [...gridCorners] as BoardCorners;
        updated[bestIdx] = pt;
        setGridCorners(updated);
        gridCornersRef.current = updated;
        setHints([]);
        if (corners) doReclassifyNow(corners, updated, []);
        return;
      }

      const next = [...gridClicks, pt];
      if (next.length >= 4) {
        const ordered = orderCorners(next.slice(0, 4));
        setGridCorners(ordered);
        gridCornersRef.current = ordered;
        setGridClicks([]);
        setHints([]);
        if (corners) doReclassifyNow(corners, ordered, []);
      } else {
        setGridClicks(next);
      }
    },
    [gridClicks, gridCorners, corners, doReclassifyNow, setGridCorners, gridCornersRef, setHints]
  );

  const toggleGridMode = useCallback(() => {
    setSettingGrid(prev => !prev);
    setGridClicks([]);
    if (!settingGrid) setCalibrationMode(null);
  }, [settingGrid]);

  const resetGrid = useCallback(() => {
    setGridCorners(null);
    gridCornersRef.current = null;
    setGridClicks([]);
    setSettingGrid(false);
    setHints([]);
    if (corners) doReclassifyNow(corners, null, []);
  }, [corners, doReclassifyNow, setGridCorners, gridCornersRef, setHints]);

  const onPreviewClick = useCallback(
    (col: number, row: number) => {
      if (!calibrationMode || !boardSize || !result) return;

      const color: StoneColor | 'empty' = calibrationMode;
      const newHint: CalibrationHint = { x: col, y: row, color };

      const updated = hints.filter(h => !(h.x === col && h.y === row));
      updated.push(newHint);
      setHints(updated);

      if (detectionBackend === 'moku') {
        const baseStones = result.stones.filter(
          s => !updated.some(h => h.x === s.x && h.y === s.y)
        );
        const addedStones = updated
          .filter(h => h.color !== 'empty')
          .map(h => ({ x: h.x, y: h.y, color: h.color as StoneColor }));
        const newStones = [...baseStones, ...addedStones];
        const newResult: RecognitionResult = {
          ...result,
          stones: newStones,
          sgf: buildSGF(result.boardSize, newStones),
        };
        setResult(newResult);
      } else {
        reclassifyWithHints(updated);
      }
    },
    [
      calibrationMode,
      boardSize,
      hints,
      reclassifyWithHints,
      detectionBackend,
      result,
      setHints,
      setResult,
    ]
  );

  const handleImport = useCallback(() => {
    if (result) onImport(result.sgf, `${file.name.replace(/\.[^.]+$/, '')}.sgf`);
  }, [result, file.name, onImport]);

  const isCustomSize =
    customSizeActive || (boardSize !== null && !PRESET_SIZES.includes(boardSize));

  return (
    <div
      className="brd-overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="brd-dialog">
        {/* Header */}
        <div className="brd-header">
          <h2 className="brd-title">{t('boardRecognition.title')}</h2>
          <button className="brd-close" onClick={onClose} aria-label={t('close')}>
            ✕
          </button>
        </div>

        {/* Board size + backend selector */}
        <div className="brd-size-row">
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
          <span className="brd-size-sep" />
          <span className="brd-size-label">{t('boardRecognition.backend')}</span>
          <button
            className={`brd-size-btn${detectionBackend === 'moku' ? ' active' : ''}`}
            onClick={() => setDetectionBackend('moku')}
          >
            {t('boardRecognition.backendMoku')}
          </button>
          <button
            className={`brd-size-btn${detectionBackend === 'classic' ? ' active' : ''}`}
            onClick={() => setDetectionBackend('classic')}
          >
            {t('boardRecognition.backendClassic')}
          </button>
          {detectionBackend === 'moku' && (
            <>
              {mokuLoading && (
                <span className="brd-moku-status brd-moku-loading">
                  {t('boardRecognition.loadingModel')}
                  {mokuProgress > 0 && mokuProgress < 1 && (
                    <> ({Math.round(mokuProgress * 100)}%)</>
                  )}
                </span>
              )}
              {mokuReady && (
                <>
                  <span className="brd-size-label brd-threshold-label">
                    {t('boardRecognition.threshold')}
                  </span>
                  <input
                    type="range"
                    className="brd-threshold-slider"
                    min={0.01}
                    max={0.99}
                    step={0.01}
                    value={mokuThreshold}
                    onChange={e => handleMokuThresholdChange(Number(e.target.value))}
                  />
                  <span className="brd-threshold-value">{mokuThreshold.toFixed(2)}</span>
                </>
              )}
            </>
          )}
        </div>
        {/* Progress bar for model download */}
        {mokuLoading && mokuProgress > 0 && mokuProgress < 1 && (
          <div className="brd-progress-bar-wrap">
            <div className="brd-progress-bar" style={{ width: `${mokuProgress * 100}%` }} />
          </div>
        )}

        {loadError && <div className="brd-error">{loadError}</div>}

        <div className="brd-body">
          {/* Left: original image with draggable corners */}
          <div className="brd-panel brd-panel-photo">
            <div className="brd-panel-title">{t('boardRecognition.photo')}</div>
            <div className={`brd-canvas-wrap${warping ? ' warping' : ''}`} ref={containerRef}>
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
            </div>
            {corners && <div className="brd-hint">{t('boardRecognition.dragHint')}</div>}
          </div>

          {/* Right: warped board preview */}
          <div className="brd-panel brd-panel-preview">
            <div className="brd-panel-title">{t('boardRecognition.preview')}</div>
            <div className="brd-preview-wrap">
              {analyzing && !(detectionBackend === 'moku' && result) && (
                <div className="brd-analyzing">
                  <div className="brd-spinner" />
                  <span>{t('boardRecognition.analyzing')}</span>
                </div>
              )}
              {!analyzing && !boardSize && (
                <div className="brd-placeholder">{t('boardRecognition.chooseSizeFirst')}</div>
              )}
              {((!analyzing && boardSize) || (analyzing && detectionBackend === 'moku')) &&
                result && (
                  <>
                    <BoardPreview
                      result={result}
                      hints={hints}
                      calibrationMode={calibrationMode}
                      onIntersectionClick={onPreviewClick}
                      gridCorners={gridCorners}
                      settingGrid={settingGrid}
                      gridClicks={gridClicks}
                      onGridClick={onGridClick}
                    />
                    {(analyzing || warping) && detectionBackend === 'moku' && (
                      <div className="brd-moku-overlay-spinner" />
                    )}
                  </>
                )}
            </div>

            {/* Grid alignment + Calibration toolbar + stats */}
            {result && !analyzing && (
              <CalibrationToolbar
                result={result}
                detectionBackend={detectionBackend}
                calibrationMode={calibrationMode}
                setCalibrationMode={setCalibrationMode}
                settingGrid={settingGrid}
                toggleGridMode={toggleGridMode}
                resetGrid={resetGrid}
                gridCorners={gridCorners}
                gridClicks={gridClicks}
                hints={hints}
                onResetCalibration={() => {
                  setHints([]);
                  if (corners) doReclassifyNow(corners, gridCornersRef.current, []);
                }}
                setSettingGrid={setSettingGrid}
                setGridClicks={setGridClicks}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="brd-footer">
          <button className="brd-btn brd-btn-cancel" onClick={onClose}>
            {t('cancel')}
          </button>
          <button
            className="brd-btn brd-btn-import"
            onClick={handleImport}
            disabled={!result || analyzing}
          >
            {t('boardRecognition.importSGF')}
          </button>
        </div>
      </div>
    </div>
  );
};
