/**
 * ScoreEstimator Component
 *
 * Displays score estimation with result banner, totals, breakdown, and actions.
 * Result (who won) is the hero element at top. Score details are collapsible on mobile.
 * Action buttons (Clear, Auto-estimate, Done) are integrated in the panel.
 */

import React, { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuCalculator, LuLoader, LuX, LuChevronDown, LuChevronUp, LuTrophy } from 'react-icons/lu';
import { useLayoutMode } from '../../hooks/useMediaQuery';
import './ScoreEstimator.css';

export interface ScoreData {
  blackTerritory: number;
  whiteTerritory: number;
  blackCaptures: number;
  whiteCaptures: number;
  blackDeadStones: number;
  whiteDeadStones: number;
  komi: number;
}

interface ScoreEstimatorProps {
  scoreData: ScoreData;
  deadStones: Set<string>;
  playerBlack?: string;
  playerWhite?: string;
  onClear: () => void;
  onAutoEstimate: () => void;
  onDone: () => void;
  isEstimating: boolean;
}

export const ScoreEstimator: React.FC<ScoreEstimatorProps> = memo(
  ({
    scoreData,
    deadStones,
    playerBlack,
    playerWhite,
    onClear,
    onAutoEstimate,
    onDone,
    isEstimating,
  }) => {
    const { t } = useTranslation();
    const layoutMode = useLayoutMode();
    const isCompact = layoutMode === 'mobile' || layoutMode === 'tablet';
    const [showDetails, setShowDetails] = useState(!isCompact);

    const finalScore = useMemo(() => {
      const {
        blackTerritory,
        whiteTerritory,
        blackCaptures,
        whiteCaptures,
        blackDeadStones,
        whiteDeadStones,
        komi,
      } = scoreData;

      const blackScore = blackTerritory + blackCaptures + whiteDeadStones;
      const whiteScore = whiteTerritory + whiteCaptures + blackDeadStones + komi;

      const difference = blackScore - whiteScore;
      const winner = difference > 0 ? 'Black' : difference < 0 ? 'White' : 'Jigo';
      const margin = Math.abs(difference);

      return { blackScore, whiteScore, winner, margin };
    }, [scoreData]);

    const blackName = playerBlack || t('gameInfo.black');
    const whiteName = playerWhite || t('gameInfo.white');

    return (
      <div className="score-estimator">
        {/* Hero: Result banner */}
        <div
          className={`score-result-banner ${finalScore.winner === 'Black' ? 'winner-black' : finalScore.winner === 'White' ? 'winner-white' : ''}`}
        >
          <span className="score-result-text">
            {finalScore.winner !== 'Jigo' && <LuTrophy className="score-result-icon" />}
            {finalScore.winner === 'Jigo'
              ? t('scoring.jigo')
              : t('scoring.winsBy', {
                  player: finalScore.winner === 'Black' ? blackName : whiteName,
                  points: finalScore.margin,
                })}
          </span>
        </div>

        {/* Primary: Total scores side by side */}
        <div className="score-totals-row">
          <div className="score-total-player black">
            <span className="score-stone black-stone" />
            <span className="score-total-name">{blackName}</span>
            <span className="score-total-value">{finalScore.blackScore}</span>
          </div>
          <div className="score-total-divider" />
          <div className="score-total-player white">
            <span className="score-stone white-stone" />
            <span className="score-total-name">{whiteName}</span>
            <span className="score-total-value">{finalScore.whiteScore}</span>
          </div>
        </div>

        {/* Secondary: Score breakdown (collapsible on mobile) */}
        <div className="score-details-section">
          <button
            className="score-details-toggle"
            onClick={() => setShowDetails(!showDetails)}
            type="button"
          >
            <span>{t('scoring.details')}</span>
            {showDetails ? <LuChevronUp size={14} /> : <LuChevronDown size={14} />}
          </button>

          {showDetails && (
            <div className="score-details-grid">
              <div className="score-detail-header" />
              <div className="score-detail-header">{t('gameInfo.black')}</div>
              <div className="score-detail-header">{t('gameInfo.white')}</div>

              <div className="score-detail-label">{t('scoring.territory')}</div>
              <div className="score-detail-value">{scoreData.blackTerritory}</div>
              <div className="score-detail-value">{scoreData.whiteTerritory}</div>

              <div className="score-detail-label">{t('scoring.captures')}</div>
              <div className="score-detail-value">{scoreData.blackCaptures}</div>
              <div className="score-detail-value">{scoreData.whiteCaptures}</div>

              <div className="score-detail-label">{t('scoring.deadStones')}</div>
              <div className="score-detail-value">{scoreData.whiteDeadStones}</div>
              <div className="score-detail-value">{scoreData.blackDeadStones}</div>

              <div className="score-detail-label">{t('scoring.komi')}</div>
              <div className="score-detail-value score-detail-muted">&mdash;</div>
              <div className="score-detail-value">{scoreData.komi}</div>
            </div>
          )}
        </div>

        {/* Actions + help */}
        <div className="score-actions">
          <button
            onClick={onAutoEstimate}
            disabled={isEstimating}
            title={t('scoring.autoEstimateDescription')}
            className="score-action-btn score-action-auto"
          >
            {isEstimating ? (
              <>
                <LuLoader size={16} className="score-spinner" />
                <span>{t('scoring.estimating')}</span>
              </>
            ) : (
              <>
                <LuCalculator size={16} />
                <span>{t('scoring.autoEstimate')}</span>
              </>
            )}
          </button>
          <button
            onClick={onClear}
            title={t('scoring.clearAllDeadStones')}
            className="score-action-btn"
          >
            {t('scoring.clear')}
          </button>
          <button
            onClick={onDone}
            title={t('scoring.exitScoringMode')}
            className="score-action-btn score-action-done"
          >
            <LuX size={16} />
            <span>{t('scoring.done')}</span>
          </button>
        </div>

        <div className="score-help">
          {t('scoring.clickToToggle')} &middot;{' '}
          {t('scoring.markedAsDead', { count: deadStones.size })}
        </div>
      </div>
    );
  }
);

ScoreEstimator.displayName = 'ScoreEstimator';
