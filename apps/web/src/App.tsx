import React, { useState, useEffect, useCallback } from 'react';
import {
  GameTreeProvider,
  BoardNavigationProvider,
  GameControllerManagerProvider,
  CommentEditorProvider,
  useGameTree,
  type VersionData,
  ToastProvider,
  useToast,
  LibraryProvider,
  AIEngineProvider,
  AIAnalysisProvider,
  type MobileTab,
  KeyboardShortcutsProvider,
} from '@kaya/ui';
import WebUpdater from './WebUpdater';
import AppContent from './AppContent';

function App() {
  const [versionData, setVersionData] = useState<VersionData | undefined>(undefined);

  useEffect(() => {
    // Load version data - use VITE_ASSET_PREFIX for GitHub Pages compatibility
    // Add cache-busting parameter to ensure we get the fresh version
    const baseUrl = import.meta.env.VITE_ASSET_PREFIX || '/';
    fetch(`${baseUrl}version.json?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => setVersionData(data))
      .catch(() => console.warn('Could not load version info'));
  }, []);

  return (
    <ToastProvider>
      <AppWithToast versionData={versionData} />
      <WebUpdater currentVersion={versionData} />
    </ToastProvider>
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

// Define mobile tab type locally since we can't easily import it from the component file due to circular dependency risk
// or simply use string and cast it.

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
        <AppContent
          versionData={versionData}
          activeMobileTab={activeMobileTab}
          onMobileTabChange={setActiveMobileTab}
        />
      </CommentEditorProvider>
    </LibraryProvider>
  );
}

export default App;
