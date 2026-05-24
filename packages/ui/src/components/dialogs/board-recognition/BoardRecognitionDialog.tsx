/**
 * BoardRecognitionDialog – photo → SGF import with corner dragging,
 * stone calibration, and AI-powered board detection.
 */
import React, { useCallback, useMemo, useState } from 'react';
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
import { BoardSizeSelector } from './components/BoardSizeSelector';
import { ImportDropdown } from './components/ImportDropdown';
import { MobileTabs, type MobileTab } from './components/MobileTabs';
import { useBoardRecognition } from './hooks/useBoardRecognition';
import { DEFAULT_THRESHOLD } from '@kaya/board-recognition';
import { PhotoPanel } from './components/PhotoPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { SensitivitySlider } from './components/SensitivitySlider';
import { useLayoutMode } from '../../../hooks/useMediaQuery';
import { useGameTree } from '../../../contexts/GameTreeContext';
import { computeDeltaStones, type DeltaStone } from './utils/deltaStones';
import './styles/BoardRecognitionDialog.css';
import './styles/BoardRecognitionDialogControls.css';
import './styles/BoardRecognitionDialogCanvas.css';

export type ImportMode = 'blank' | 'merge';

export type { DeltaStone } from './utils/deltaStones';

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
  const [mokuThreshold, setMokuThreshold] = useState(1 - DEFAULT_THRESHOLD);
  const [calibrationMode, setCalibrationMode] = useState<'black' | 'white' | 'empty' | null>(null);
  const [gridClicks, setGridClicks] = useState<Point[]>([]);
  const [settingGrid, setSettingGrid] = useState(false);
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [customSizeActive, setCustomSizeActive] = useState(false);
  const [showDelta, setShowDelta] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('photo');
  const layoutMode = useLayoutMode();
  const isMobile = layoutMode === 'mobile';
  const { gameSettings, setAIConfigOpen, setConfigInitialTab } = useGameTree();

  const recognition = useBoardRecognition(
    file,
    boardSize,
    mokuThreshold,
    setMokuThreshold,
    gameSettings.detectionModelSource
  );

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

  const delta = useMemo<DeltaStone[]>(
    () => computeDeltaStones(result, currentBoard),
    [result, currentBoard]
  );

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
          <div className="brd-header-actions">
            <button
              className="brd-model-settings-btn"
              onClick={() => {
                setConfigInitialTab('detection');
                setAIConfigOpen(true);
                onClose();
              }}
              title={t('detectionConfig.modelSettingsLink')}
            >
              ⚙
            </button>
            <button className="brd-close" onClick={onClose} aria-label={t('close')}>
              ✕
            </button>
          </div>
        </div>

        {/* Board size + sensitivity slider */}
        <div className="brd-size-row">
          <BoardSizeSelector
            boardSize={boardSize}
            setBoardSize={setBoardSize}
            customSizeInput={customSizeInput}
            setCustomSizeInput={setCustomSizeInput}
            customSizeActive={customSizeActive}
            setCustomSizeActive={setCustomSizeActive}
          />
          {mokuLoading && (
            <span className="brd-moku-status brd-moku-loading">
              {mokuProgress >= 1
                ? t('boardRecognition.initializingModel')
                : t('boardRecognition.loadingModel')}
              {mokuProgress > 0 && mokuProgress < 1 && <> ({Math.round(mokuProgress * 100)}%)</>}
            </span>
          )}
          {mokuReady && (
            <SensitivitySlider
              variant="desktop"
              mokuThreshold={mokuThreshold}
              handleMokuThresholdChange={handleMokuThresholdChange}
              commitMokuThreshold={commitMokuThreshold}
            />
          )}
        </div>

        {/* Progress bar for model download / indeterminate for session init */}
        {mokuLoading && mokuProgress > 0 && (
          <div className="brd-progress-bar-wrap">
            {mokuProgress < 1 ? (
              <div className="brd-progress-bar" style={{ width: `${mokuProgress * 100}%` }} />
            ) : (
              <div className="brd-progress-bar brd-progress-bar--indeterminate" />
            )}
          </div>
        )}

        {loadError && <div className="brd-error">{loadError}</div>}

        {isMobile && <MobileTabs mobileTab={mobileTab} setMobileTab={setMobileTab} />}

        <div className="brd-body">
          {/* Left / Tab 1: original image with draggable corners */}
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
            hasResult={result != null}
            analyzing={analyzing}
            className={isMobile && mobileTab !== 'photo' ? 'brd-mobile-hidden' : undefined}
          />

          {/* Right / Tab 2: warped board preview */}
          <PreviewPanel
            isMobile={isMobile}
            isVisible={mobileTab === 'preview'}
            result={result}
            analyzing={analyzing}
            mokuLoading={mokuLoading}
            boardSize={boardSize}
            objectURL={objectURL}
            corners={corners}
            mokuReady={mokuReady}
            mokuThreshold={mokuThreshold}
            handleMokuThresholdChange={handleMokuThresholdChange}
            commitMokuThreshold={commitMokuThreshold}
            hints={hints}
            calibrationMode={calibrationMode}
            onPreviewClick={onPreviewClick}
            gridCorners={gridCorners}
            settingGrid={settingGrid}
            gridClicks={gridClicks}
            onGridClick={onGridClick}
            canAddAsMove={canAddAsMove}
            deltaMove={deltaMove}
            delta={delta}
            showDelta={showDelta}
            setShowDelta={setShowDelta}
            setCalibrationMode={setCalibrationMode}
            toggleGridMode={toggleGridMode}
            resetGrid={resetGrid}
            onResetCalibration={() => {
              setHints([]);
              if (corners) doReclassifyNow(corners, gridCornersRef.current, []);
            }}
            setSettingGrid={setSettingGrid}
            setGridClicks={setGridClicks}
          />
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
          <ImportDropdown
            result={result}
            analyzing={analyzing}
            currentBoard={currentBoard}
            sizeMismatch={sizeMismatch}
            delta={delta}
            canAddAsMove={canAddAsMove}
            deltaMove={deltaMove}
            showPlayMove={!!onPlayMove}
            onImport={handleImport}
            onPlayMove={handlePlayMove}
          />
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
