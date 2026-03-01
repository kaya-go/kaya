import { useState, useEffect, useCallback } from 'react';

// Storage keys for panel visibility
const STORAGE_KEY = 'kaya-sidebar-panels';
const LEFT_PANEL_STORAGE_KEY = 'kaya-left-panels';

export interface SidebarPanelVisibility {
  gameTree: boolean;
  gameInfo: boolean;
  comment: boolean;
}

export interface LeftPanelVisibility {
  library: boolean;
  analysisGraph: boolean;
}

const DEFAULT_VISIBILITY: SidebarPanelVisibility = {
  gameTree: true,
  gameInfo: true,
  comment: true,
};

const DEFAULT_LEFT_VISIBILITY: LeftPanelVisibility = {
  library: true,
  analysisGraph: true,
};

export function useLayoutPanels() {
  // Load initial visibility from localStorage (right sidebar)
  const [panelVisibility, setPanelVisibility] = useState<SidebarPanelVisibility>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_VISIBILITY, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore parse errors
    }
    return DEFAULT_VISIBILITY;
  });

  // Load initial visibility for left panel sections
  const [leftPanelVisibility, setLeftPanelVisibility] = useState<LeftPanelVisibility>(() => {
    try {
      const saved = localStorage.getItem(LEFT_PANEL_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_LEFT_VISIBILITY, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore parse errors
    }
    return DEFAULT_LEFT_VISIBILITY;
  });

  // Save visibility to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(panelVisibility));
  }, [panelVisibility]);

  useEffect(() => {
    localStorage.setItem(LEFT_PANEL_STORAGE_KEY, JSON.stringify(leftPanelVisibility));
  }, [leftPanelVisibility]);

  const togglePanel = useCallback((panel: keyof SidebarPanelVisibility) => {
    setPanelVisibility(prev => ({ ...prev, [panel]: !prev[panel] }));
  }, []);

  const toggleLeftPanel = useCallback((panel: keyof LeftPanelVisibility) => {
    setLeftPanelVisibility(prev => ({ ...prev, [panel]: !prev[panel] }));
  }, []);

  // Count visible panels for sizing (right sidebar)
  const visiblePanelCount = [
    panelVisibility.gameTree,
    panelVisibility.gameInfo,
    panelVisibility.comment,
  ].filter(Boolean).length;

  // Calculate default sizes based on visible panels
  // Game Tree: 50%, Game Info: 35%, Comment: 15% when all visible
  const getDefaultSize = (isVisible: boolean, panelName?: 'gameTree' | 'gameInfo' | 'comment') => {
    if (!isVisible) return 0;
    if (visiblePanelCount === 1) return 100;
    if (visiblePanelCount === 2) {
      return 50;
    }
    switch (panelName) {
      case 'gameTree':
        return 50;
      case 'gameInfo':
        return 35;
      case 'comment':
        return 15;
      default:
        return 100 / visiblePanelCount;
    }
  };

  // Count visible left panels for sizing
  const visibleLeftPanelCount = [
    leftPanelVisibility.library,
    leftPanelVisibility.analysisGraph,
  ].filter(Boolean).length;

  const getLeftPanelSize = (isVisible: boolean) => {
    if (!isVisible) return 0;
    return visibleLeftPanelCount === 2 ? 60 : 100;
  };

  return {
    panelVisibility,
    leftPanelVisibility,
    togglePanel,
    toggleLeftPanel,
    visiblePanelCount,
    visibleLeftPanelCount,
    getDefaultSize,
    getLeftPanelSize,
  };
}
