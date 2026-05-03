/**
 * MctsVisitsSelector - inline chip-based picker for MCTS search depth.
 *
 * Same visual language as the AnalysisBar popover, designed to be embedded
 * in settings panels (no popover, no portal).
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LuZap, LuFlame } from 'react-icons/lu';
import { VISITS_PRESETS, isExtremeVisits, visitsLabelKey } from './mcts-visits-presets';
import './MctsVisitsSelector.css';

export interface MctsVisitsSelectorProps {
  value: number;
  onChange: (visits: number) => void;
  presets?: readonly number[];
  id?: string;
}

export const MctsVisitsSelector: React.FC<MctsVisitsSelectorProps> = ({
  value,
  onChange,
  presets = VISITS_PRESETS,
  id,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mcts-visits-selector" id={id} role="radiogroup">
      {presets.map(preset => {
        const isCurrent = preset === value;
        const isFast = preset === 1;
        const isExtreme = isExtremeVisits(preset);
        return (
          <button
            key={preset}
            type="button"
            role="radio"
            aria-checked={isCurrent}
            className={`mcts-visits-selector__chip${isCurrent ? ' is-current' : ''}${isFast ? ' is-fast' : ''}${isExtreme ? ' is-extreme' : ''}`}
            onClick={() => onChange(preset)}
          >
            <span className="mcts-visits-selector__chip-value">
              {isFast && <LuZap aria-hidden />}
              {isExtreme && <LuFlame aria-hidden />} {preset}
            </span>
            <span className="mcts-visits-selector__chip-label">{t(visitsLabelKey(preset))}</span>
          </button>
        );
      })}
    </div>
  );
};
