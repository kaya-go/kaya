/**
 * Shortcuts Configuration Tab
 *
 * Displays all available keyboard shortcuts and allows users to customize them.
 * Features collision detection and responsive design for mobile/tablet.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LuRotateCcw, LuKeyboard, LuTriangleAlert, LuX, LuCheck } from 'react-icons/lu';
import {
  useKeyboardShortcuts,
  type ShortcutId,
  type ShortcutCategory,
  type KeyBinding,
  bindingToDisplayString,
} from '../../contexts/KeyboardShortcutsContext';
import { type ShortcutCollision, createBindingFromEvent } from '../../hooks/useKeyboardShortcuts';
import './ShortcutsTab.css';
import './ShortcutsTabControls.css';
import './ShortcutsTabCollision.css';

interface ShortcutsTabProps {
  onClose?: () => void;
}

/** Recording state for capturing a new shortcut */
interface RecordingState {
  shortcutId: ShortcutId;
  collision: ShortcutCollision | null;
  pendingBinding: KeyBinding | null;
}

export const ShortcutsTab: React.FC<ShortcutsTabProps> = () => {
  const { t } = useTranslation();
  const {
    shortcuts,
    shortcutsByCategory,
    getBinding,
    setBinding,
    resetBinding,
    resetAllBindings,
    checkCollision,
    clearCollisionAndSetBinding,
  } = useKeyboardShortcuts();

  // Check if any shortcuts are customized
  const hasCustomizations = Object.values(shortcuts).some(s => s.isCustomized);

  const [recording, setRecording] = useState<RecordingState | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const recordingRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard capture for recording
  useEffect(() => {
    if (!recording) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Allow Escape to cancel
      if (e.key === 'Escape') {
        setRecording(null);
        return;
      }

      const binding = createBindingFromEvent(e);
      if (!binding) return;

      // Check for collision
      const collision = checkCollision(binding, recording.shortcutId);

      if (collision) {
        // Show collision dialog
        setRecording({
          ...recording,
          collision,
          pendingBinding: binding,
        });
      } else {
        // Apply the binding directly
        setBinding(recording.shortcutId, binding);
        setRecording(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [recording, checkCollision, setBinding]);

  // Focus the recording button
  useEffect(() => {
    if (recording && recordingRef.current) {
      recordingRef.current.focus();
    }
  }, [recording]);

  const startRecording = useCallback((shortcutId: ShortcutId) => {
    setRecording({
      shortcutId,
      collision: null,
      pendingBinding: null,
    });
  }, []);

  const handleResolveCollision = useCallback(
    (action: 'replace' | 'cancel') => {
      if (!recording?.collision || !recording.pendingBinding) {
        setRecording(null);
        return;
      }

      if (action === 'replace') {
        // Clear the conflicting shortcut and apply the new one in a single update
        clearCollisionAndSetBinding(
          recording.collision.existingShortcutId,
          recording.shortcutId,
          recording.pendingBinding
        );
      }

      setRecording(null);
    },
    [recording, clearCollisionAndSetBinding]
  );

  const handleResetShortcut = useCallback(
    (id: ShortcutId) => {
      resetBinding(id);
    },
    [resetBinding]
  );

  const handleResetAll = useCallback(() => {
    resetAllBindings();
    setShowResetConfirm(false);
  }, [resetAllBindings]);

  const categoryOrder: ShortcutCategory[] = ['board', 'ai', 'navigation', 'file', 'edit', 'view'];

  const getCategoryLabel = (category: ShortcutCategory): string => {
    return t(`shortcuts.categories.${category}`);
  };

  const getShortcutLabel = (id: ShortcutId): string => {
    return t(`shortcuts.actions.${id}`);
  };

  return (
    <div className="shortcuts-tab">
      <div className="shortcuts-header">
        <div className="shortcuts-header-info">
          <LuKeyboard className="shortcuts-header-icon" />
          <div>
            <h3>{t('shortcuts.title')}</h3>
            <p className="shortcuts-description">{t('shortcuts.description')}</p>
          </div>
        </div>
        <button
          className="shortcuts-reset-all"
          onClick={() => setShowResetConfirm(true)}
          title={t('shortcuts.resetAll')}
          disabled={!hasCustomizations}
        >
          <LuRotateCcw size={16} />
          {t('shortcuts.resetAll')}
        </button>
      </div>

      {/* Mobile hint */}
      <div className="shortcuts-mobile-hint">
        <LuKeyboard size={16} />
        {t('shortcuts.mobileHint')}
      </div>

      <div className="shortcuts-list">
        {categoryOrder.map(category => {
          const shortcuts = shortcutsByCategory[category];
          if (shortcuts.length === 0) return null;

          return (
            <div key={category} className="shortcuts-category">
              <h4 className="shortcuts-category-title">{getCategoryLabel(category)}</h4>
              <div className="shortcuts-category-items">
                {shortcuts.map(shortcut => {
                  const isRecording = recording?.shortcutId === shortcut.id && !recording.collision;
                  const activeBinding = getBinding(shortcut.id as ShortcutId);
                  const isDisabled = !activeBinding.key;

                  return (
                    <div
                      key={shortcut.id}
                      className={`shortcut-item ${shortcut.isCustomized ? 'customized' : ''} ${isRecording ? 'recording' : ''}`}
                    >
                      <span className="shortcut-label">
                        {getShortcutLabel(shortcut.id as ShortcutId)}
                      </span>
                      <div className="shortcut-controls">
                        <button
                          ref={isRecording ? recordingRef : undefined}
                          className={`shortcut-key ${isRecording ? 'recording' : ''} ${isDisabled ? 'disabled' : ''}`}
                          onClick={() => startRecording(shortcut.id as ShortcutId)}
                          title={
                            isRecording ? t('shortcuts.pressKey') : t('shortcuts.clickToChange')
                          }
                        >
                          {isRecording ? (
                            <span className="recording-prompt">{t('shortcuts.pressKey')}</span>
                          ) : isDisabled ? (
                            <span className="disabled-label">{t('shortcuts.disabled')}</span>
                          ) : (
                            bindingToDisplayString(activeBinding)
                          )}
                        </button>
                        {shortcut.isCustomized && (
                          <button
                            className="shortcut-reset"
                            onClick={() => handleResetShortcut(shortcut.id as ShortcutId)}
                            title={t('shortcuts.reset')}
                          >
                            <LuRotateCcw size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Collision Dialog */}
      {recording?.collision && (
        <div className="shortcuts-collision-overlay" onClick={() => setRecording(null)}>
          <div className="shortcuts-collision-dialog" onClick={e => e.stopPropagation()}>
            <div className="collision-header">
              <LuTriangleAlert className="collision-icon" />
              <h4>{t('shortcuts.collision.title')}</h4>
            </div>
            <p className="collision-message">
              {t('shortcuts.collision.message', {
                key: recording.pendingBinding
                  ? bindingToDisplayString(recording.pendingBinding)
                  : '',
                action: getShortcutLabel(recording.collision.existingShortcutId),
              })}
            </p>
            <div className="collision-actions">
              <button
                className="collision-btn cancel"
                onClick={() => handleResolveCollision('cancel')}
              >
                <LuX size={16} />
                {t('shortcuts.collision.cancel')}
              </button>
              <button
                className="collision-btn replace"
                onClick={() => handleResolveCollision('replace')}
              >
                <LuCheck size={16} />
                {t('shortcuts.collision.replace')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset All Confirmation Dialog */}
      {showResetConfirm && (
        <div className="shortcuts-collision-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="shortcuts-collision-dialog" onClick={e => e.stopPropagation()}>
            <div className="collision-header">
              <LuTriangleAlert className="collision-icon" />
              <h4>{t('shortcuts.resetConfirm.title')}</h4>
            </div>
            <p className="collision-message">{t('shortcuts.resetConfirm.message')}</p>
            <div className="collision-actions">
              <button className="collision-btn cancel" onClick={() => setShowResetConfirm(false)}>
                <LuX size={16} />
                {t('cancel')}
              </button>
              <button className="collision-btn replace" onClick={handleResetAll}>
                <LuRotateCcw size={16} />
                {t('shortcuts.resetAll')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortcutsTab;
