/**
 * GameBoardActionBar - Top action buttons for the board
 *
 * Pass, resign, scoring, analysis, navigation, edit mode toggles,
 * show next move, and AI suggest move.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LuSkipForward,
  LuFlag,
  LuCalculator,
  LuGamepad2,
  LuPencil,
  LuBot,
  LuBrain,
  LuEye,
  LuEyeOff,
  LuLoader,
} from 'react-icons/lu';
import { useKeyboardShortcuts } from '../../contexts/KeyboardShortcutsContext';

interface GameBoardActionBarProps {
  onPass: () => void;
  onResign: () => void;
  onToggleScoringMode: () => void;
  onToggleAnalysisBar: () => void;
  onToggleNavigationMode: () => void;
  onToggleEditMode: () => void;
  onToggleNextMove: () => void;
  onSuggestMove: () => void;
  scoringMode: boolean;
  editMode: boolean;
  showAnalysisBar: boolean;
  navigationMode: boolean;
  showNextMove: boolean;
  isModelLoaded: boolean;
  isGeneratingMove: boolean;
}

export const GameBoardActionBar: React.FC<GameBoardActionBarProps> = ({
  onPass,
  onResign,
  onToggleScoringMode,
  onToggleAnalysisBar,
  onToggleNavigationMode,
  onToggleEditMode,
  onToggleNextMove,
  onSuggestMove,
  scoringMode,
  editMode,
  showAnalysisBar,
  navigationMode,
  showNextMove,
  isModelLoaded,
  isGeneratingMove,
}) => {
  const { t } = useTranslation();
  const { bindingToDisplayString, getBinding } = useKeyboardShortcuts();

  return (
    <div className="gameboard-actions-bar">
      <button
        onClick={onPass}
        className="gameboard-action-button gameboard-pass-button"
        title={t('gameboardActions.pass')}
        disabled={scoringMode || editMode}
      >
        <LuSkipForward size={16} />
        <span className="btn-text">{t('gameboardActions.pass')}</span>
      </button>
      <button
        onClick={onResign}
        className="gameboard-action-button gameboard-resign-button"
        title={t('gameboardActions.resign')}
        disabled={scoringMode || editMode}
      >
        <LuFlag size={16} />
        <span className="btn-text">{t('gameboardActions.resign')}</span>
      </button>
      <div className="gameboard-actions-spacer" />
      <button
        onClick={onToggleScoringMode}
        className={`gameboard-action-button gameboard-score-button ${scoringMode ? 'active' : ''}`}
        title={
          scoringMode
            ? `${t('gameboardActions.exitScoringMode')} (${bindingToDisplayString(getBinding('board.toggleScoringMode'))})`
            : `${t('gameboardActions.enterScoringMode')} (${bindingToDisplayString(getBinding('board.toggleScoringMode'))})`
        }
      >
        <LuCalculator size={16} />
        <span className="btn-text">
          {scoringMode ? t('gameboardActions.scoring') : t('gameboardActions.score')}
        </span>
      </button>
      <button
        onClick={onToggleAnalysisBar}
        className={`gameboard-action-button gameboard-analysis-button ${showAnalysisBar ? 'active' : ''}`}
        title={
          showAnalysisBar
            ? `${t('gameboardActions.hideAnalysis')} (${bindingToDisplayString(getBinding('board.toggleAnalysis'))})`
            : `${t('gameboardActions.showAnalysis')} (${bindingToDisplayString(getBinding('board.toggleAnalysis'))})`
        }
      >
        <LuBrain size={16} />
        <span className="btn-text">
          {showAnalysisBar ? t('gameboardActions.analysis') : t('gameboardActions.analyze')}
        </span>
      </button>
      <button
        onClick={onToggleNavigationMode}
        className={`gameboard-action-button gameboard-navigation-button ${navigationMode ? 'active' : ''}`}
        title={
          navigationMode
            ? `${t('gameboardActions.exitNavigationMode')} (${bindingToDisplayString(getBinding('board.toggleNavigationMode'))})`
            : `${t('gameboardActions.enterNavigationMode')} (${bindingToDisplayString(getBinding('board.toggleNavigationMode'))})`
        }
      >
        <LuGamepad2 size={16} />
        <span className="btn-text">{t('gameboardActions.navigate')}</span>
      </button>
      <button
        onClick={onToggleEditMode}
        className={`gameboard-action-button gameboard-edit-button ${editMode ? 'active' : ''}`}
        title={
          editMode
            ? `${t('gameboardActions.exitEditMode')} (${bindingToDisplayString(getBinding('board.toggleEditMode'))})`
            : `${t('gameboardActions.enterEditMode')} (${bindingToDisplayString(getBinding('board.toggleEditMode'))})`
        }
      >
        <LuPencil size={16} />
        <span className="btn-text">{t('gameboardActions.edit')}</span>
      </button>
      <button
        onClick={onToggleNextMove}
        className={`gameboard-action-button gameboard-next-move-button ${showNextMove ? 'active' : ''}`}
        title={
          showNextMove
            ? `${t('gameboardActions.hideNextMove')} (${bindingToDisplayString(getBinding('board.toggleNextMove'))})`
            : `${t('gameboardActions.showNextMove')} (${bindingToDisplayString(getBinding('board.toggleNextMove'))})`
        }
      >
        {showNextMove ? <LuEyeOff size={16} /> : <LuEye size={16} />}
        <span className="btn-text">
          {showNextMove ? t('gameboardActions.hide') : t('gameboardActions.show')}
        </span>
      </button>
      {isModelLoaded && (
        <button
          onClick={onSuggestMove}
          disabled={isGeneratingMove || scoringMode || editMode}
          className="gameboard-action-button gameboard-suggest-move-button"
          title={`${t('gameboardActions.suggestMoveTitle')} (${bindingToDisplayString(getBinding('ai.suggestMove'))})`}
        >
          {isGeneratingMove ? <LuLoader size={16} className="spinner" /> : <LuBot size={16} />}
          <span className="btn-text">
            {isGeneratingMove
              ? t('gameboardActions.suggesting')
              : t('gameboardActions.suggestMove')}
          </span>
        </button>
      )}
    </div>
  );
};
