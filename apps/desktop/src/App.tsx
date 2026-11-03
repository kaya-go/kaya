import React, { useState, useEffect, useCallback } from 'react';
import {
  GameTreeProvider,
  BoardNavigationProvider,
  GameControllerManagerProvider,
  AIEngineProvider,
  AIAnalysisProvider,
  CommentEditorProvider,
  useGameTreeSelector,
  type VersionData,
  ToastProvider,
  useToast,
  LibraryProvider,
  TauriDragProvider,
  type MobileTab,
  KeyboardShortcutsProvider,
  setSoundInitErrorHandler,
  type GameTreeContextValue,
} from '@kaya/ui';
import { useTranslation } from 'react-i18next';
import { Updater } from './Updater';
import { AppContent } from './AppContent';

function App() {
  const [versionData, setVersionData] = useState<VersionData | undefined>(undefined);

  useEffect(() => {
    // For desktop app, version.json is in the dist root
    fetch('/version.json')
      .then(res => res.json())
      .then(data => {
        console.log('Version info:', data);
        setVersionData(data);
      })
      .catch(err => {
        console.warn('Could not load version info:', err);
      });
  }, []);

  return (
    <>
      <Updater />
      <ToastProvider>
        <AppWithToast versionData={versionData} />
      </ToastProvider>
    </>
  );
}

function AppWithToast({ versionData }: { versionData: VersionData | undefined }) {
  const { showToast } = useToast();
  const { t } = useTranslation();

  const handleAutoSaveDisabled = useCallback(() => {
    showToast('Game is too large for auto-save (max 5MB)', 'info');
  }, [showToast]);

  // Register sound error handler — auto-disables sound and shows toast with copy button
  useEffect(() => {
    setSoundInitErrorHandler(error => {
      const errorDetails = [
        `Sound Error: ${error.message}`,
        `Backend: ${error.backend}`,
        `Platform: ${error.platform}`,
      ].join('\n');

      showToast(t('sound.initError'), 'error', {
        label: t('sound.copyError'),
        onClick: () => {
          navigator.clipboard.writeText(errorDetails).then(
            () => showToast(t('sound.errorCopied'), 'success'),
            () => {}
          );
        },
      });
    });
    return () => setSoundInitErrorHandler(null);
  }, [showToast, t]);

  return (
    <KeyboardShortcutsProvider>
      <GameControllerManagerProvider>
        <GameTreeProvider onAutoSaveDisabled={handleAutoSaveDisabled}>
          <AIEngineProvider>
            <AIAnalysisProvider>
              <BoardNavigationProvider>
                <LibraryProviderWrapper versionData={versionData} />
              </BoardNavigationProvider>
            </AIAnalysisProvider>
          </AIEngineProvider>
        </GameTreeProvider>
      </GameControllerManagerProvider>
    </KeyboardShortcutsProvider>
  );
}

function LibraryProviderWrapper({ versionData }: { versionData: VersionData | undefined }) {
  const { loadSGFAsync, exportSGF, setFileName, isDirty, setIsDirty } = useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        loadSGFAsync: ctx.loadSGFAsync,
        exportSGF: ctx.exportSGF,
        setFileName: ctx.setFileName,
        isDirty: ctx.isDirty,
        setIsDirty: ctx.setIsDirty,
      }),
      []
    )
  );
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('board');

  // Callback when a file is opened from the library
  const handleFileOpen = useCallback(
    (content: string, name: string) => {
      loadSGFAsync(content);
      setFileName(name);
      // Switch to board view on mobile when a file is loaded
      setActiveMobileTab('board');
    },
    [loadSGFAsync, setFileName]
  );

  // Get current game content for saving to library
  const getCurrentGameContent = useCallback(() => {
    return exportSGF();
  }, [exportSGF]);

  // Check if there are unsaved changes
  const getIsDirty = useCallback(() => isDirty, [isDirty]);

  // Reset dirty state after save
  const handleSaveComplete = useCallback(() => {
    setIsDirty(false);
  }, [setIsDirty]);

  // Keep header filename in sync when the open library file is renamed in the panel
  const handleLoadedFileRenamed = useCallback(
    (newName: string) => {
      setFileName(newName);
    },
    [setFileName]
  );

  return (
    <LibraryProvider
      onFileOpen={handleFileOpen}
      getCurrentGameContent={getCurrentGameContent}
      getIsDirty={getIsDirty}
      onSaveComplete={handleSaveComplete}
      onLoadedFileRenamed={handleLoadedFileRenamed}
    >
      <CommentEditorProvider>
        <TauriDragProvider>
          <AppContent
            versionData={versionData}
            activeMobileTab={activeMobileTab}
            onMobileTabChange={setActiveMobileTab}
          />
        </TauriDragProvider>
      </CommentEditorProvider>
    </LibraryProvider>
  );
}

export default App;
