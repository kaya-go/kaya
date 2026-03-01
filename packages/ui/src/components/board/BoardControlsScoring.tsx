import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LuCalculator, LuLoader, LuX } from 'react-icons/lu';
import { useGameTreeScore } from '../../contexts/selectors';

export const BoardControlsScoring: React.FC = memo(() => {
  const { t } = useTranslation();
  const { clearDeadStones, autoEstimateDeadStones, toggleScoringMode, isEstimating } =
    useGameTreeScore();

  return (
    <div className="scoring-controls-row">
      <button
        onClick={clearDeadStones}
        title={t('scoring.clearAllDeadStones')}
        className="scoring-button"
      >
        {t('scoring.clear')}
      </button>
      <button
        onClick={autoEstimateDeadStones}
        disabled={isEstimating}
        title={t('scoring.autoEstimateDescription')}
        className="scoring-button scoring-auto"
      >
        {isEstimating ? (
          <>
            <LuLoader size={18} className="spinner" />
            {t('scoring.estimating')}
          </>
        ) : (
          <>
            <LuCalculator size={18} />
            {t('scoring.autoEstimate')}
          </>
        )}
      </button>
      <button
        onClick={toggleScoringMode}
        title={t('scoring.exitScoringMode')}
        className="scoring-button scoring-done"
      >
        <LuX size={18} />
        {t('scoring.done')}
      </button>
    </div>
  );
});

BoardControlsScoring.displayName = 'BoardControlsScoring';
