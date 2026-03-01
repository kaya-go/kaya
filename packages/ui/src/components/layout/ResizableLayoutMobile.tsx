import React from 'react';
import { LuLibrary, LuGitBranch, LuInfo, LuMessageSquare, LuBrain } from 'react-icons/lu';
import { MobileTabBar, type MobileTab } from './MobileTabBar';

interface ResizableLayoutMobileProps {
  boardContent?: React.ReactNode;
  gameTreeContent?: React.ReactNode;
  gameInfoContent?: React.ReactNode;
  commentContent?: React.ReactNode;
  libraryContent?: React.ReactNode;
  analysisGraphContent?: React.ReactNode;
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  isLandscape: boolean;
}

export const ResizableLayoutMobile: React.FC<ResizableLayoutMobileProps> = ({
  boardContent,
  gameTreeContent,
  gameInfoContent,
  commentContent,
  libraryContent,
  analysisGraphContent,
  activeTab,
  onTabChange,
  isLandscape,
}) => {
  return (
    <div className={`mobile-layout ${isLandscape ? 'mobile-landscape' : 'mobile-portrait'} `}>
      <div className="mobile-layout-content">
        {/* Board Panel - always rendered, hidden if not active */}
        <div
          className="mobile-panel mobile-board-panel"
          style={{ display: activeTab === 'board' ? 'flex' : 'none' }}
        >
          <div className="mobile-panel-content">{boardContent}</div>
        </div>

        {/* Info Panel */}
        <div
          className="mobile-panel mobile-info-panel"
          style={{ display: activeTab === 'info' ? 'flex' : 'none' }}
        >
          <div className="mobile-panel-header">
            <LuInfo size={16} />
            <span>Game Info</span>
          </div>
          <div className="mobile-panel-content mobile-info-content">
            <div className="mobile-info-section">
              {gameInfoContent || <div className="placeholder">Game Info</div>}
            </div>
            <div className="mobile-comment-section">
              <div className="mobile-section-title">
                <LuMessageSquare size={14} />
                <span>Comments</span>
              </div>
              {commentContent || <div className="placeholder">Comments</div>}
            </div>
          </div>
        </div>

        {/* Tree Panel */}
        <div
          className="mobile-panel mobile-tree-panel"
          style={{ display: activeTab === 'tree' ? 'flex' : 'none' }}
        >
          <div className="mobile-panel-header">
            <LuGitBranch size={16} />
            <span>Game Tree</span>
          </div>
          <div className="mobile-panel-content">
            {gameTreeContent || <div className="placeholder">Game Tree</div>}
          </div>
        </div>

        {/* AI Analysis Panel */}
        {analysisGraphContent && (
          <div
            className="mobile-panel mobile-analysis-panel"
            style={{ display: activeTab === 'analysis' ? 'flex' : 'none' }}
          >
            <div className="mobile-panel-header">
              <LuBrain size={16} />
              <span>Analysis</span>
            </div>
            <div className="mobile-panel-content">{analysisGraphContent}</div>
          </div>
        )}

        {/* Library Panel */}
        <div
          className="mobile-panel mobile-library-panel"
          style={{ display: activeTab === 'library' ? 'flex' : 'none' }}
        >
          <div className="mobile-panel-header">
            <LuLibrary size={16} />
            <span>Library</span>
          </div>
          <div className="mobile-panel-content">
            {libraryContent || <div className="placeholder">Library</div>}
          </div>
        </div>
      </div>
      <MobileTabBar
        activeTab={activeTab}
        onTabChange={onTabChange}
        showAnalysis={!!analysisGraphContent}
      />
    </div>
  );
};
