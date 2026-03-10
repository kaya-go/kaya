/**
 * BoardRecognitionDialog – photo → SGF import with corner dragging,
 * stone calibration, and AI-powered board detection.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  BoardCorners,
  CalibrationHint,
  Point,
  RecognitionResult,
  StoneColor,
} from '@kaya/board-recognition';
import { buildSGF, orderCorners } from '@kaya/board-recognition';
import type { GoBoard } from '@kaya/goboard';
import type { Sign, Vertex } from '@kaya/goboard';
import { BoardPreview } from './components/BoardPreview';
import { CalibrationToolbar } from './components/CalibrationToolbar';
import { PRESET_SIZES, useBoardRecognition } from './hooks/useBoardRecognition';
import { PhotoPanel } from './components/PhotoPanel';
import './styles/BoardRecognitionDialog.css';
import './styles/BoardRecognitionDialogControls.css';
import './styles/BoardRecognitionDialogCanvas.css';

export type ImportMode = 'blank' | 'merge';

export interface DeltaStone {
  x: number;
  y: number;
  color: 'black' | 'white';
  type: 'added' | 'removed';
}

interface Props {
  file: File;
  onImport: (
    stones: { x: number; y: number; color: 'black' | 'white' }[],
    boardSize: number,
    mode: ImportMode
  ) => void;
  onImportSGF?: (sgf: string) => void;
  onPlayMove?: (vertex: Vertex, sign: Sign) => void;
  currentBoard?: GoBoard;
  onClose: () => void;
}

export const BoardRecognitionDialog: React.FC<Props> = ({
  file,
  onImport,
  onImportSGF,
  onPlayMove,
  currentBoard,
  onClose,
}) => {
  const { t } = useTranslation();

  const [boardSize, setBoardSize] = useState<number | null>(19);
  const [mokuThreshold, setMokuThreshold] = useState(0.95);
  const [calibrationMode, setCalibrationMode] = useState<'black' | 'white' | 'empty' | null>(null);
  const [gridClicks, setGridClicks] = useState<Point[]>([]);
  const [settingGrid, setSettingGrid] = useState(false);
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [customSizeActive, setCustomSizeActive] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [showDelta, setShowDelta] = useState(false);
  const addMenuRef = useRef<HTMLDivElement>(null);

  const recognition = useBoardRecognition(file, boardSize, mokuThreshold, setMokuThreshold);

  const {
    rawImage,
    objectURL,
    corners,
    setCorners,
    result,
    setResult,
    analyzing,
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
    cancelReclassify,
    doReclassifyNow,
    handleMokuThresholdChange,
    commitMokuThreshold,
    rawDimsRef,
    cornersRef,
    cornersManuallySet,
    resetCornersToAuto,
  } = recognition;

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

      const baseStones = result.stones.filter(s => !updated.some(h => h.x === s.x && h.y === s.y));
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
    },
    [calibrationMode, boardSize, hints, result, setHints, setResult]
  );

  const handleImport = useCallback(
    (mode: ImportMode) => {
      if (result) onImport(result.stones, result.boardSize, mode);
    },
    [result, onImport]
  );

  const handleImportSGF = useCallback(() => {
    if (result && onImportSGF) {
      onImportSGF(buildSGF(result.boardSize, result.stones));
    }
  }, [result, onImportSGF]);

  // Compute delta between current board and detected stones
  const delta = useMemo<DeltaStone[]>(() => {
    if (!result || !currentBoard) return [];
    const bs = result.boardSize;
    if (currentBoard.width !== bs || currentBoard.height !== bs) return [];

    const stones: DeltaStone[] = [];
    // Build a lookup of detected stones
    const detectedMap = new Map<string, StoneColor>();
    for (const s of result.stones) {
      detectedMap.set(`${s.x},${s.y}`, s.color);
    }

    // Check all intersections
    for (let y = 0; y < bs; y++) {
      for (let x = 0; x < bs; x++) {
        const current = currentBoard.get([x, y]);
        const detected = detectedMap.get(`${x},${y}`) ?? null;
        const detectedSign = detected === 'black' ? 1 : detected === 'white' ? -1 : 0;

        if (current === detectedSign) continue;

        // Stone in detected but not on current board → added
        if (detectedSign !== 0 && (current === 0 || current === null)) {
          stones.push({ x, y, color: detected!, type: 'added' });
        }
        // Stone on current board but not in detected → removed
        else if ((current === 1 || current === -1) && detectedSign === 0) {
          stones.push({ x, y, color: current === 1 ? 'black' : 'white', type: 'removed' });
        }
        // Different color → show both
        else if (
          detectedSign !== 0 &&
          current !== 0 &&
          current !== null &&
          current !== detectedSign
        ) {
          stones.push({ x, y, color: current === 1 ? 'black' : 'white', type: 'removed' });
          stones.push({ x, y, color: detected!, type: 'added' });
        }
      }
    }
    return stones;
  }, [result, currentBoard]);

  const canAddAsMove = delta.length === 1 && delta[0].type === 'added';
  const deltaMove = canAddAsMove ? delta[0] : null;

  // Board size mismatch check for merge / move modes
  const sizeMismatch = !!(
    result &&
    currentBoard &&
    (currentBoard.width !== result.boardSize || currentBoard.height !== result.boardSize)
  );

  const handlePlayMove = useCallback(() => {
    if (!deltaMove || !onPlayMove) return;
    const sign: Sign = deltaMove.color === 'black' ? 1 : -1;
    onPlayMove([deltaMove.x, deltaMove.y], sign);
    onClose();
  }, [deltaMove, onPlayMove, onClose]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!addMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target as Node)) {
        setAddMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClick);
    return () => document.removeEventListener('pointerdown', handleClick);
  }, [addMenuOpen]);

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
          {mokuLoading && (
            <span className="brd-moku-status brd-moku-loading">
              {t('boardRecognition.loadingModel')}
              {mokuProgress > 0 && mokuProgress < 1 && <> ({Math.round(mokuProgress * 100)}%)</>}
            </span>
          )}
          {mokuReady && (
            <>
              <span className="brd-size-sep" />
              <span className="brd-size-label brd-threshold-label">
                {t('boardRecognition.sensitivity')}
              </span>
              <input
                type="range"
                className="brd-threshold-slider"
                min={0.01}
                max={0.99}
                step={0.01}
                value={mokuThreshold}
                onChange={e => handleMokuThresholdChange(Number(e.target.value))}
                onPointerUp={commitMokuThreshold}
                onKeyUp={commitMokuThreshold}
              />
              <span className="brd-threshold-value">{mokuThreshold.toFixed(2)}</span>
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
          <PhotoPanel
            rawImage={rawImage}
            objectURL={objectURL}
            corners={corners}
            setCorners={setCorners}
            setHints={setHints}
            setGridClicks={setGridClicks}
            setSettingGrid={setSettingGrid}
            scheduleReclassify={scheduleReclassify}
            cancelReclassify={cancelReclassify}
            rawDimsRef={rawDimsRef}
            cornersRef={cornersRef}
            cornersManuallySet={cornersManuallySet}
            resetCornersToAuto={resetCornersToAuto}
          />

          {/* Right: warped board preview */}
          <div className="brd-panel brd-panel-preview">
            <div className="brd-panel-title brd-step-title">
              <span className="brd-step-badge">2</span>
              {t('boardRecognition.stepReview')}
            </div>
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

            {/* Delta toggle + summary */}
            {delta.length > 0 && result && !analyzing && (
              <div className="brd-delta-legend">
                <button
                  className={`brd-delta-toggle${showDelta ? ' active' : ''}`}
                  onClick={() => setShowDelta(prev => !prev)}
                  title={t('boardRecognition.showDelta')}
                >
                  {t('boardRecognition.showDelta')}
                </button>
                {showDelta && (
                  <span className="brd-delta-summary">
                    {delta.filter(d => d.type === 'added').length > 0 && (
                      <span className="brd-delta-legend-item brd-delta-added">
                        <span className="brd-delta-dot" />
                        {t('boardRecognition.deltaAdded', {
                          count: delta.filter(d => d.type === 'added').length,
                        })}
                      </span>
                    )}
                    {delta.filter(d => d.type === 'removed').length > 0 && (
                      <span className="brd-delta-legend-item brd-delta-removed">
                        <span className="brd-delta-dot" />
                        {t('boardRecognition.deltaRemoved', {
                          count: delta.filter(d => d.type === 'removed').length,
                        })}
                      </span>
                    )}
                  </span>
                )}
              </div>
            )}

            {/* Grid alignment + Calibration toolbar + stats */}
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
          <span className="brd-powered-by">
            {t('boardRecognition.poweredBy')}{' '}
            <a href="https://github.com/kaya-go/moku" target="_blank" rel="noopener noreferrer">
              Moku
            </a>
          </span>
          <button className="brd-btn brd-btn-cancel" onClick={onClose}>
            {t('cancel')}
          </button>
          <div className="brd-dropdown" ref={addMenuRef}>
            <button
              className="brd-btn brd-btn-secondary"
              onClick={() => setAddMenuOpen(prev => !prev)}
              disabled={!result || analyzing}
            >
              {t('boardRecognition.addToBoard')}
              <span className="brd-dropdown-arrow">{addMenuOpen ? '▴' : '▾'}</span>
            </button>
            {addMenuOpen && (
              <div className="brd-dropdown-menu">
                <button
                  className="brd-dropdown-item"
                  onClick={() => {
                    setAddMenuOpen(false);
                    handleImport('blank');
                  }}
                >
                  {t('boardRecognition.addBlankBoard')}
                </button>
                <button
                  className={`brd-dropdown-item${sizeMismatch ? ' brd-dropdown-item-disabled' : ''}`}
                  onClick={() => {
                    if (sizeMismatch) return;
                    setAddMenuOpen(false);
                    handleImport('merge');
                  }}
                  disabled={sizeMismatch}
                  title={
                    sizeMismatch
                      ? t('boardRecognition.sizeMismatch', {
                          detected: result?.boardSize ?? '?',
                          current: `${currentBoard?.width ?? '?'}×${currentBoard?.height ?? '?'}`,
                        })
                      : undefined
                  }
                >
                  {t('boardRecognition.addMerge')}
                </button>
                {onPlayMove && currentBoard && (
                  <button
                    className={`brd-dropdown-item${!canAddAsMove || sizeMismatch ? ' brd-dropdown-item-disabled' : ''}`}
                    onClick={() => {
                      if (!canAddAsMove || sizeMismatch) return;
                      setAddMenuOpen(false);
                      handlePlayMove();
                    }}
                    disabled={!canAddAsMove || sizeMismatch}
                    title={
                      sizeMismatch
                        ? t('boardRecognition.sizeMismatch', {
                            detected: result?.boardSize ?? '?',
                            current: `${currentBoard.width}×${currentBoard.height}`,
                          })
                        : !canAddAsMove
                          ? delta.length === 0
                            ? t('boardRecognition.addAsMoveNoDelta')
                            : t('boardRecognition.addAsMoveMultiDelta', { count: delta.length })
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
          {onImportSGF && (
            <button
              className="brd-btn brd-btn-import"
              onClick={handleImportSGF}
              disabled={!result || analyzing}
            >
              {t('boardRecognition.importSGF')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
