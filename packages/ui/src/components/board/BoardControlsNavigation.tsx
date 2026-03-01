import React, { useCallback, useEffect, useState, useRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronUp,
  LuChevronDown,
  LuSkipBack,
  LuSkipForward,
  LuRewind,
  LuFastForward,
  LuCalculator,
} from 'react-icons/lu';
import { useGameTreeNavigation } from '../../contexts/selectors';
import './BoardControlsNavigation.css';

interface BoardControlsNavigationProps {
  currentPlayer: 1 | -1;
}

export const BoardControlsNavigation: React.FC<BoardControlsNavigationProps> = memo(
  ({ currentPlayer }) => {
    const { t } = useTranslation();
    const {
      goBack,
      goForward,
      goBackSteps,
      goForwardSteps,
      goToStart,
      goToEnd,
      navigateToMove,
      branchInfo,
      switchBranch,
      switchToBranchIndex,
      canGoBack,
      canGoForward,
      moveNumber,
      totalMovesInBranch,
    } = useGameTreeNavigation();

    // State for inline editing
    const [editingMove, setEditingMove] = useState(false);
    const [editingBranch, setEditingBranch] = useState(false);
    const [editValue, setEditValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when editing starts
    useEffect(() => {
      if ((editingMove || editingBranch) && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [editingMove, editingBranch]);

    const handleMoveClick = useCallback(() => {
      setEditValue(String(moveNumber));
      setEditingMove(true);
    }, [moveNumber]);

    const handleBranchClick = useCallback(() => {
      setEditValue(String(branchInfo.currentIndex));
      setEditingBranch(true);
    }, [branchInfo.currentIndex]);

    const handleEditSubmit = useCallback(() => {
      const value = parseInt(editValue, 10);
      if (!isNaN(value) && value >= 0) {
        if (editingMove) {
          navigateToMove(value);
        } else if (editingBranch) {
          // Use enhanced branch switching that works even when deep in a branch
          switchToBranchIndex(value);
        }
      }
      setEditingMove(false);
      setEditingBranch(false);
    }, [editValue, editingMove, editingBranch, navigateToMove, switchToBranchIndex]);

    const handleEditKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          handleEditSubmit();
        } else if (e.key === 'Escape') {
          setEditingMove(false);
          setEditingBranch(false);
        }
        e.stopPropagation(); // Prevent navigation shortcuts while editing
      },
      [handleEditSubmit]
    );

    const handleEditBlur = useCallback(() => {
      setEditingMove(false);
      setEditingBranch(false);
    }, []);

    return (
      <>
        {/* Branch navigation row - works even when deep in a branch */}
        {branchInfo.hasBranches && (
          <div className="branch-controls-row">
            <button
              onClick={() => switchBranch('previous')}
              title={t('boardControls.previousBranch')}
              className="branch-nav-button"
            >
              <LuChevronDown size={14} />
            </button>
            {editingBranch ? (
              <div className="branch-edit-container">
                <input
                  ref={inputRef}
                  type="number"
                  min="1"
                  max={branchInfo.totalBranches}
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  onBlur={handleEditBlur}
                  className="edit-input edit-input-small"
                />
                <span className="branch-total">/{branchInfo.totalBranches}</span>
              </div>
            ) : (
              <div
                className="branch-info-display editable-value"
                onClick={handleBranchClick}
                title={
                  branchInfo.isAtFork
                    ? t('boardControls.clickToSetBranch')
                    : `${t('boardControls.clickToSetBranch')} (${t('boardControls.movesIntoBranch', { count: branchInfo.depthFromBranchRoot })})`
                }
              >
                <span className="branch-label">{t('boardControls.branch')}</span>
                <span className="branch-current">{branchInfo.currentIndex}</span>
                <span className="branch-separator">/</span>
                <span className="branch-total">{branchInfo.totalBranches}</span>
                {!branchInfo.isAtFork && (
                  <span
                    className="branch-depth"
                    title={t('boardControls.movesIntoBranch', {
                      count: branchInfo.depthFromBranchRoot,
                    })}
                  >
                    +{branchInfo.depthFromBranchRoot}
                  </span>
                )}
                <LuCalculator className="edit-hint-icon" size={10} />
              </div>
            )}
            <button
              onClick={() => switchBranch('next')}
              title={t('boardControls.nextBranch')}
              className="branch-nav-button"
            >
              <LuChevronUp size={14} />
            </button>
          </div>
        )}

        {/* Main navigation row */}
        <div className="main-nav-row">
          <button
            onClick={goToStart}
            disabled={!canGoBack}
            title={t('boardControls.goToStart')}
            className="nav-button"
          >
            <LuSkipBack size={20} />
          </button>
          <button
            onClick={() => goBackSteps(10)}
            disabled={!canGoBack}
            title={t('boardControls.goBack10')}
            className="nav-button"
          >
            <LuRewind size={20} />
          </button>
          <button
            onClick={goBack}
            disabled={!canGoBack}
            title={t('boardControls.previousMove')}
            className="nav-button"
          >
            <LuChevronLeft size={20} />
          </button>

          <div className="move-display">
            <div className="move-number">
              {editingMove ? (
                <input
                  ref={inputRef}
                  type="number"
                  min="0"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  onBlur={handleEditBlur}
                  className="edit-input"
                />
              ) : (
                <span
                  onClick={handleMoveClick}
                  className="editable-value move-number-display"
                  title={t('boardControls.clickToJumpMove')}
                >
                  {t('boardControls.move')} {moveNumber} / {totalMovesInBranch}
                  <LuCalculator className="edit-hint-icon" size={10} />
                </span>
              )}
            </div>
            <div className="current-player">
              <div
                className="current-player-stone"
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background:
                    currentPlayer === 1
                      ? 'radial-gradient(circle at 30% 30%, #555 0%, #000 100%)'
                      : 'radial-gradient(circle at 30% 30%, #fff 0%, #f0f0f0 25%, #d5d5d5 60%, #bbb 100%)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  border:
                    currentPlayer === 1
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.1)',
                }}
              />
              {currentPlayer === 1 ? t('gameInfo.black') : t('gameInfo.white')}
            </div>
          </div>

          <button
            onClick={goForward}
            disabled={!canGoForward}
            title={t('boardControls.nextMove')}
            className="nav-button"
          >
            <LuChevronRight size={20} />
          </button>
          <button
            onClick={() => goForwardSteps(10)}
            disabled={!canGoForward}
            title={t('boardControls.goForward10')}
            className="nav-button"
          >
            <LuFastForward size={20} />
          </button>
          <button
            onClick={goToEnd}
            disabled={!canGoForward}
            title={t('boardControls.goToEnd')}
            className="nav-button"
          >
            <LuSkipForward size={20} />
          </button>
        </div>
      </>
    );
  }
);

BoardControlsNavigation.displayName = 'BoardControlsNavigation';
