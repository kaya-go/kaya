import React, { useState, useEffect, useCallback } from 'react';
import {
  GameTreeProvider,
  BoardNavigationProvider,
  GameControllerManagerProvider,
  AIEngineProvider,
  AIAnalysisProvider,
  CommentEditorProvider,
  useGameTree,
  type VersionData,
  ToastProvider,
  useToast,
  LibraryProvider,
  TauriDragProvider,
  type MobileTab,
  KeyboardShortcutsProvider,
} from '@kaya/ui';
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

  const handleAutoSaveDisabled = useCallback(() => {
    showToast('Game is too large for auto-save (max 5MB)', 'info');
  }, [showToast]);

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
  const { loadSGFAsync, exportSGF, setFileName, isDirty, setIsDirty } = useGameTree();
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

  return (
    <LibraryProvider
      onFileOpen={handleFileOpen}
      getCurrentGameContent={getCurrentGameContent}
      getIsDirty={getIsDirty}
      onSaveComplete={handleSaveComplete}
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
