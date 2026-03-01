import React from 'react';
import {
  Header,
  ResizableLayout,
  GameBoard,
  GameTreeGraph,
  GameTreeControls,
  AppDropZone,
  GameInfoEditor,
  GameInfoHeaderActions,
  CommentEditor,
  CommentHeaderActions,
  LoadingOverlay,
  StatusBar,
  ScoreEstimator,
  AnalysisPanel,
  LandingPage,
  AboutDialog,
  LibraryPanel,
  type VersionData,
  type MobileTab,
} from '@kaya/ui';
import { useAppContentState } from './useAppContentState';

export function AppContent({
  versionData,
  activeMobileTab,
  onMobileTabChange,
}: {
  versionData: VersionData | undefined;
  activeMobileTab?: MobileTab;
  onMobileTabChange?: (tab: MobileTab) => void;
}) {
  const {
    showAboutDialog,
    setShowAboutDialog,
    showLibrary,
    toggleLibrary,
    gameTreeRef,
    treeLayoutHorizontal,
    setTreeLayoutHorizontal,
    showMinimap,
    setShowMinimap,
    moveName,
    moveUrl,
    patternMatchingEnabled,
    togglePatternMatching,
    scoringMode,
    deadStones,
    gameInfo,
    isMobileOrTablet,
    hasStarted,
    hasSavedGame,
    handleNewGame,
    handleContinue,
    handleOpenLibrary,
    handleGoHome,
    handleFileDrop,
    scoreData,
    setScoreData,
    showHeader,
    setShowHeader,
    showSidebar,
    setShowSidebar,
    gameInfoEditMode,
    toggleGameInfoEditMode,
    getBinding,
    bindingToDisplayString,
  } = useAppContentState({ onMobileTabChange });

  // Show landing page on mobile/tablet layout
  if (isMobileOrTablet && !hasStarted) {
    return (
      <LandingPage
        onNewGame={handleNewGame}
        onContinue={handleContinue}
        onOpenLibrary={handleOpenLibrary}
        onFileDrop={handleFileDrop}
        version={versionData?.version}
        hasSavedGame={hasSavedGame}
      />
    );
  }

  return (
    <AppDropZone>
      <div className="app">
        {showHeader ? (
          <Header
            showThemeToggle={true}
            showLibrary={showLibrary}
            showSidebar={showSidebar}
            onToggleLibrary={toggleLibrary}
            onToggleSidebar={() => setShowSidebar(prev => !prev)}
            onHide={() => setShowHeader(false)}
            onGoHome={handleGoHome}
          />
        ) : (
          <div
            onClick={() => setShowHeader(true)}
            title={`Show Menu (${bindingToDisplayString(getBinding('view.toggleHeader'))})`}
            style={{
              height: '12px',
              width: '100%',
              background: 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--border-color)',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'background-color 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
            }}
          >
            <div
              style={{
                width: '48px',
                height: '4px',
                borderRadius: '2px',
                background: 'var(--border-color)',
                opacity: 0.6,
              }}
            />
          </div>
        )}
        <div className="app-main">
          <ResizableLayout
            showLibrary={showLibrary}
            onToggleLibrary={toggleLibrary}
            libraryContent={<LibraryPanel />}
            analysisGraphContent={<AnalysisPanel />}
            showSidebar={showSidebar}
            onToggleSidebar={() => setShowSidebar(prev => !prev)}
            activeMobileTab={activeMobileTab}
            onMobileTabChange={onMobileTabChange}
            boardContent={<GameBoard onScoreData={setScoreData} />}
            gameTreeContent={
              scoringMode && scoreData ? (
                <div style={{ padding: '1rem' }}>
                  <ScoreEstimator
                    scoreData={scoreData}
                    deadStones={deadStones}
                    playerBlack={gameInfo.playerBlack}
                    playerWhite={gameInfo.playerWhite}
                    rankBlack={gameInfo.rankBlack}
                    rankWhite={gameInfo.rankWhite}
                  />
                </div>
              ) : (
                <GameTreeGraph
                  ref={gameTreeRef}
                  horizontal={treeLayoutHorizontal}
                  onLayoutChange={setTreeLayoutHorizontal}
                  showMinimap={showMinimap}
                />
              )
            }
            gameTreeHeaderActions={
              scoringMode ? null : (
                <GameTreeControls
                  horizontal={treeLayoutHorizontal}
                  onToggleLayout={() => setTreeLayoutHorizontal(h => !h)}
                  showMinimap={showMinimap}
                  onToggleMinimap={() => setShowMinimap(m => !m)}
                  onCenterOnCurrentNode={() => gameTreeRef.current?.centerOnCurrentNode()}
                />
              )
            }
            gameInfoHeaderActions={
              <GameInfoHeaderActions
                isEditMode={gameInfoEditMode}
                onToggle={toggleGameInfoEditMode}
              />
            }
            commentHeaderActions={<CommentHeaderActions />}
            gameInfoContent={
              <GameInfoEditor
                isEditMode={gameInfoEditMode}
                onEditModeChange={toggleGameInfoEditMode}
              />
            }
            commentContent={<CommentEditor />}
          />
        </div>
        <LoadingOverlay />
        <StatusBar
          versionData={versionData}
          moveName={moveName}
          moveUrl={moveUrl}
          patternMatchingEnabled={patternMatchingEnabled}
          onTogglePatternMatching={togglePatternMatching}
          onShowAbout={() => setShowAboutDialog(true)}
        />
        <AboutDialog
          isOpen={showAboutDialog}
          onClose={() => setShowAboutDialog(false)}
          versionData={versionData}
        />
      </div>
    </AppDropZone>
  );
}
