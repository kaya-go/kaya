import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import {
  LuLibrary,
  LuPanelRight,
  LuGitBranch,
  LuInfo,
  LuMessageSquare,
  LuChartLine,
} from 'react-icons/lu';
import { useLayoutMode, useOrientation } from '../../hooks/useMediaQuery';
import type { MobileTab } from './MobileTabBar';
import { useLayoutPanels } from './useLayoutPanels';
import { CollapsibleSectionHeader } from './CollapsibleSectionHeader';
import { ResizableLayoutMobile } from './ResizableLayoutMobile';
import './ResizableLayout.css';
import './ResizableLayoutMobile.css';

interface ResizableLayoutProps {
  libraryContent?: React.ReactNode;
  analysisGraphContent?: React.ReactNode;
  boardContent?: React.ReactNode;
  gameTreeContent?: React.ReactNode;
  gameInfoContent?: React.ReactNode;
  commentContent?: React.ReactNode;
  gameTreeHeaderActions?: React.ReactNode;
  gameInfoHeaderActions?: React.ReactNode;
  commentHeaderActions?: React.ReactNode;
  showLibrary?: boolean;
  showSidebar?: boolean;
  onToggleLibrary?: () => void;
  onToggleSidebar?: () => void;
  /** Controlled active tab for mobile */
  activeMobileTab?: MobileTab;
  /** Callback for mobile tab change */
  onMobileTabChange?: (tab: MobileTab) => void;
}

export const ResizableLayout: React.FC<ResizableLayoutProps> = ({
  libraryContent,
  analysisGraphContent,
  boardContent,
  gameTreeContent,
  gameInfoContent,
  commentContent,
  gameTreeHeaderActions,
  gameInfoHeaderActions,
  commentHeaderActions,
  showLibrary = false,
  showSidebar = true,
  onToggleLibrary,
  onToggleSidebar,
  activeMobileTab,
  onMobileTabChange,
}) => {
  const { t } = useTranslation();

  // Detect layout mode (mobile/tablet/desktop)
  const layoutMode = useLayoutMode();
  const orientation = useOrientation();
  // Treat tablet as mobile for layout purposes (use tabs instead of panels)
  const isMobile = layoutMode === 'mobile' || layoutMode === 'tablet';
  const isLandscape = orientation === 'landscape';

  // Mobile tab state (controlled or uncontrolled)
  const [internalActiveTab, setInternalActiveTab] = useState<MobileTab>('board');
  const activeTab = activeMobileTab ?? internalActiveTab;
  const handleTabChange = onMobileTabChange ?? setInternalActiveTab;

  // Panel visibility and sizing from extracted hook
  const {
    panelVisibility,
    leftPanelVisibility,
    togglePanel,
    toggleLeftPanel,
    visibleLeftPanelCount,
    getDefaultSize,
    getLeftPanelSize,
  } = useLayoutPanels();

  // =========================
  // Mobile Layout
  // =========================
  if (isMobile) {
    return (
      <ResizableLayoutMobile
        boardContent={boardContent}
        gameTreeContent={gameTreeContent}
        gameInfoContent={gameInfoContent}
        commentContent={commentContent}
        libraryContent={libraryContent}
        analysisGraphContent={analysisGraphContent}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isLandscape={isLandscape}
      />
    );
  }

  // =========================
  // Desktop/Tablet Layout
  // =========================
  return (
    <PanelGroup
      direction="horizontal"
      id="main-layout"
      autoSaveId="kaya-main-layout"
      className="panel-group"
    >
      {/* Left panel (Library + Analysis Graph) - always rendered when content exists */}
      {(libraryContent || analysisGraphContent) && (
        <>
          {showLibrary ? (
            <Panel
              id="left-panel"
              order={1}
              defaultSize={25}
              minSize={10}
              maxSize={50}
              className="panel left-panel-container"
            >
              <PanelGroup
                direction="vertical"
                id="left-panel-group"
                autoSaveId="kaya-left-panel-group"
              >
                {/* Library Section */}
                {leftPanelVisibility.library && libraryContent ? (
                  <>
                    <Panel
                      id="library-section"
                      order={1}
                      defaultSize={getLeftPanelSize(leftPanelVisibility.library)}
                      minSize={15}
                      className="panel library-section"
                    >
                      <div className="left-panel-section">
                        <CollapsibleSectionHeader
                          title={t('panels.library')}
                          icon={<LuLibrary size={14} />}
                          isVisible={leftPanelVisibility.library}
                          onToggle={() => toggleLeftPanel('library')}
                        />
                        <div className="left-panel-section-content">{libraryContent}</div>
                      </div>
                    </Panel>
                    {leftPanelVisibility.analysisGraph && analysisGraphContent && (
                      <PanelResizeHandle className="resize-handle resize-handle-horizontal" />
                    )}
                  </>
                ) : libraryContent ? (
                  <div className="collapsed-section-bar">
                    <CollapsibleSectionHeader
                      title={t('panels.library')}
                      icon={<LuLibrary size={14} />}
                      isVisible={false}
                      onToggle={() => toggleLeftPanel('library')}
                    />
                  </div>
                ) : null}

                {/* Analysis Graph Section */}
                {leftPanelVisibility.analysisGraph && analysisGraphContent ? (
                  <Panel
                    id="analysis-graph-section"
                    order={2}
                    defaultSize={visibleLeftPanelCount === 2 ? 40 : 100}
                    minSize={15}
                    className="panel analysis-graph-section"
                  >
                    <div className="left-panel-section">
                      <CollapsibleSectionHeader
                        title={t('panels.analysis')}
                        icon={<LuChartLine size={14} />}
                        isVisible={leftPanelVisibility.analysisGraph}
                        onToggle={() => toggleLeftPanel('analysisGraph')}
                      />
                      <div className="left-panel-section-content">{analysisGraphContent}</div>
                    </div>
                  </Panel>
                ) : analysisGraphContent ? (
                  <div className="collapsed-section-bar">
                    <CollapsibleSectionHeader
                      title={t('panels.analysis')}
                      icon={<LuChartLine size={14} />}
                      isVisible={false}
                      onToggle={() => toggleLeftPanel('analysisGraph')}
                    />
                  </div>
                ) : null}
              </PanelGroup>
            </Panel>
          ) : (
            <div
              className="library-collapsed-indicator"
              onClick={onToggleLibrary}
              title={t('panels.showLibrary')}
            >
              <LuLibrary size={16} />
            </div>
          )}
          {showLibrary && <PanelResizeHandle className="resize-handle resize-handle-vertical" />}
        </>
      )}

      {/* Main board area */}
      <Panel
        id="board-panel"
        order={2}
        defaultSize={showSidebar ? 75 : 100}
        minSize={30}
        className="panel board-panel"
      >
        {boardContent || <div className="placeholder">Board Placeholder</div>}
      </Panel>

      {showSidebar ? (
        <>
          {/* Vertical resize handle */}
          <PanelResizeHandle className="resize-handle resize-handle-vertical" />

          {/* Sidebar with three vertical sections */}
          <Panel
            id="sidebar-panel"
            order={3}
            defaultSize={25}
            minSize={20}
            maxSize={50}
            className="panel sidebar-panel"
          >
            <PanelGroup direction="vertical" id="sidebar-group" autoSaveId="kaya-sidebar-group">
              {/* Game Tree Section */}
              {panelVisibility.gameTree ? (
                <>
                  <Panel
                    id="game-tree-panel"
                    order={1}
                    defaultSize={getDefaultSize(panelVisibility.gameTree, 'gameTree')}
                    minSize={10}
                    className="panel game-tree-section"
                  >
                    <div className="sidebar-section">
                      <CollapsibleSectionHeader
                        title={t('panels.gameTree')}
                        icon={<LuGitBranch size={14} />}
                        isVisible={panelVisibility.gameTree}
                        onToggle={() => togglePanel('gameTree')}
                        headerActions={gameTreeHeaderActions}
                      />
                      <div className="sidebar-section-content">
                        {gameTreeContent || <div className="placeholder">Tree Placeholder</div>}
                      </div>
                    </div>
                  </Panel>
                  {(panelVisibility.gameInfo || panelVisibility.comment) && (
                    <PanelResizeHandle className="resize-handle resize-handle-horizontal" />
                  )}
                </>
              ) : (
                <div className="collapsed-section-bar">
                  <CollapsibleSectionHeader
                    title={t('panels.gameTree')}
                    icon={<LuGitBranch size={14} />}
                    isVisible={false}
                    onToggle={() => togglePanel('gameTree')}
                  />
                </div>
              )}

              {/* Game Info Section */}
              {panelVisibility.gameInfo ? (
                <>
                  <Panel
                    id="game-info-panel"
                    order={2}
                    defaultSize={getDefaultSize(panelVisibility.gameInfo, 'gameInfo')}
                    minSize={10}
                    className="panel game-info-section"
                  >
                    <div className="sidebar-section">
                      <CollapsibleSectionHeader
                        title={t('panels.gameInfo')}
                        icon={<LuInfo size={14} />}
                        isVisible={panelVisibility.gameInfo}
                        onToggle={() => togglePanel('gameInfo')}
                        headerActions={gameInfoHeaderActions}
                      />
                      <div className="sidebar-section-content">
                        {gameInfoContent || <div className="placeholder">Game Info</div>}
                      </div>
                    </div>
                  </Panel>
                  {panelVisibility.comment && (
                    <PanelResizeHandle className="resize-handle resize-handle-horizontal" />
                  )}
                </>
              ) : (
                <div className="collapsed-section-bar">
                  <CollapsibleSectionHeader
                    title={t('panels.gameInfo')}
                    icon={<LuInfo size={14} />}
                    isVisible={false}
                    onToggle={() => togglePanel('gameInfo')}
                  />
                </div>
              )}

              {/* Comment Section */}
              {panelVisibility.comment ? (
                <Panel
                  id="comment-panel"
                  order={3}
                  defaultSize={getDefaultSize(panelVisibility.comment, 'comment')}
                  minSize={10}
                  className="panel comments-section"
                >
                  <div className="sidebar-section">
                    <CollapsibleSectionHeader
                      title={t('panels.comment')}
                      icon={<LuMessageSquare size={14} />}
                      isVisible={panelVisibility.comment}
                      onToggle={() => togglePanel('comment')}
                      headerActions={commentHeaderActions}
                    />
                    <div className="sidebar-section-content">
                      {commentContent || <div className="placeholder">Comments</div>}
                    </div>
                  </div>
                </Panel>
              ) : (
                <div className="collapsed-section-bar">
                  <CollapsibleSectionHeader
                    title={t('panels.comment')}
                    icon={<LuMessageSquare size={14} />}
                    isVisible={false}
                    onToggle={() => togglePanel('comment')}
                  />
                </div>
              )}
            </PanelGroup>
          </Panel>
        </>
      ) : (
        /* Collapsed sidebar indicator */
        <div
          className="sidebar-collapsed-indicator"
          onClick={onToggleSidebar}
          title={t('panels.showSidebar')}
        >
          <LuPanelRight size={16} />
        </div>
      )}
    </PanelGroup>
  );
};
