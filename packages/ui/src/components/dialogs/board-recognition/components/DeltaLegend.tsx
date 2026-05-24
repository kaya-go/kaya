/**
 * DeltaLegend – toggle button + per-type counts for the "show delta against
 * current board" overlay in the preview panel.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { DeltaStone } from '../utils/deltaStones';

interface Props {
  delta: DeltaStone[];
  showDelta: boolean;
  setShowDelta: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeltaLegend: React.FC<Props> = ({ delta, showDelta, setShowDelta }) => {
  const { t } = useTranslation();

  const addedCount = delta.filter(d => d.type === 'added').length;
  const removedCount = delta.filter(d => d.type === 'removed').length;

  return (
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
          {addedCount > 0 && (
            <span className="brd-delta-legend-item brd-delta-added">
              <span className="brd-delta-dot" />
              {t('boardRecognition.deltaAdded', { count: addedCount })}
            </span>
          )}
          {removedCount > 0 && (
            <span className="brd-delta-legend-item brd-delta-removed">
              <span className="brd-delta-dot" />
              {t('boardRecognition.deltaRemoved', { count: removedCount })}
            </span>
          )}
        </span>
      )}
    </div>
  );
};
