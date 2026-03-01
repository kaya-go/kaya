/**
 * Performance Report Distribution Bars
 *
 * Displays move category distribution as horizontal bar charts
 * for comparing player performance.
 */

import React from 'react';
import type { MoveCategory, MoveDistribution } from '@kaya/ai-engine';

/**
 * Get the display color for a move category
 */
export function getCategoryColor(category: MoveCategory): string {
  switch (category) {
    case 'aiMove':
      return 'var(--category-ai-move, #4a9eff)';
    case 'good':
      return 'var(--category-good, #4caf50)';
    case 'inaccuracy':
      return 'var(--category-inaccuracy, #ffc107)';
    case 'mistake':
      return 'var(--category-mistake, #ff9800)';
    case 'blunder':
      return 'var(--category-blunder, #f44336)';
    default:
      return 'var(--text-secondary)';
  }
}

/**
 * Distribution bars component
 */
export interface DistributionBarsProps {
  distribution: {
    aiMove: number;
    good: number;
    inaccuracy: number;
    mistake: number;
    blunder: number;
    total: number;
  };
  align: 'left' | 'right';
}

export const DistributionBars: React.FC<DistributionBarsProps> = ({ distribution, align }) => {
  const categories: MoveCategory[] = ['aiMove', 'good', 'inaccuracy', 'mistake', 'blunder'];
  const maxCount = Math.max(
    distribution.aiMove,
    distribution.good,
    distribution.inaccuracy,
    distribution.mistake,
    distribution.blunder,
    1 // Prevent division by zero
  );

  return (
    <div className={`distribution-bars ${align}`}>
      {categories.map((category: MoveCategory) => {
        const count = distribution[category as keyof MoveDistribution] as number;
        const percentage = distribution.total > 0 ? (count / distribution.total) * 100 : 0;
        const barWidth = (count / maxCount) * 100;

        return (
          <div key={category} className="distribution-bar-row">
            <div
              className="distribution-bar"
              style={{
                width: `${barWidth}%`,
                backgroundColor: getCategoryColor(category),
              }}
            />
            <span className="distribution-count">
              {count} ({percentage.toFixed(0)}%)
            </span>
          </div>
        );
      })}
    </div>
  );
};
