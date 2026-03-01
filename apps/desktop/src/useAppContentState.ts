import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  useGameTree,
  useLibraryPanel,
  useGameInfoEditMode,
  useKeyboardShortcuts,
  useExternalLinks,
  useLayoutMode,
  type GameTreeGraphRef,
  type MobileTab,
  type ScoreData,
} from '@kaya/ui';
import { listen } from '@tauri-apps/api/event';
import { analytics } from './analytics';

interface UseAppContentStateOptions {
  onMobileTabChange?: (tab: MobileTab) => void;
}

export function useAppContentState({ onMobileTabChange }: UseAppContentStateOptions) {
  // Enable external links to open in default browser
  useExternalLinks();

  // About dialog state
  const [showAboutDialog, setShowAboutDialog] = useState(false);

  // Listen for menu event to show about dialog
  useEffect(() => {
    const unlisten = listen('show-about', () => {
      setShowAboutDialog(true);
    });
    return () => {
      unlisten.then(u => u());
    };
  }, []);

  // Library panel state
  const { showLibrary, setShowLibrary, toggleLibrary } = useLibraryPanel();

  // Ref for game tree graph to control centering
  const gameTreeRef = useRef<GameTreeGraphRef>(null);

  // Load saved layout preference from localStorage
  const [treeLayoutHorizontal, setTreeLayoutHorizontal] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('kaya-tree-layout-horizontal');
      return saved !== null ? saved === 'true' : false;
    }
    return false;
  });

  // Load saved minimap preference from localStorage
  const [showMinimap, setShowMinimap] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('kaya-tree-show-minimap');
      return saved === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('kaya-tree-layout-horizontal', String(treeLayoutHorizontal));
    }
  }, [treeLayoutHorizontal]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('kaya-tree-show-minimap', String(showMinimap));
    }
  }, [showMinimap]);

  // Track initial page view
  useEffect(() => {
    analytics.pageView('Home');
  }, []);

  const {
    moveName,
    moveUrl,
    patternMatchingEnabled,
    togglePatternMatching,
    scoringMode,
    deadStones,
    gameInfo,
    gameTree,
    rootId,
    createNewGame,
    filename,
    loadSGFAsync,
    setFileName,
  } = useGameTree();

  // Layout mode for responsive landing page
  const layoutMode = useLayoutMode();
  const isMobileOrTablet = layoutMode === 'mobile' || layoutMode === 'tablet';

  // Initialize hasStarted based on layout - mobile/tablet starts with landing page
  const [hasStarted, setHasStarted] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
    return !isSmallScreen;
  });

  // Track if library should be opened after transition from landing page
  const [pendingOpenLibrary, setPendingOpenLibrary] = useState(false);

  // Determine if there is a saved game state
  const hasSavedGame = useMemo(() => {
    if (filename && filename !== 'Untitled Game.sgf') return true;
    if (gameTree && rootId !== null) {
      const root = gameTree.get(rootId);
      if (root && (root.children.length > 0 || root.data.annotated)) {
        return true;
      }
    }
    return false;
  }, [gameTree, rootId, filename]);

  // If desktop layout (large screen), always consider started
  useEffect(() => {
    if (!isMobileOrTablet) {
      setHasStarted(true);
    }
  }, [isMobileOrTablet]);

  // Open library after transition from landing page
  useEffect(() => {
    if (hasStarted && pendingOpenLibrary) {
      setPendingOpenLibrary(false);
      if (isMobileOrTablet && onMobileTabChange) {
        onMobileTabChange('library');
      } else {
        setShowLibrary(true);
      }
    }
  }, [hasStarted, pendingOpenLibrary, setShowLibrary, isMobileOrTablet, onMobileTabChange]);

  const handleNewGame = useCallback(() => {
    createNewGame();
    setHasStarted(true);
    if (isMobileOrTablet && onMobileTabChange) {
      onMobileTabChange('board');
    }
  }, [createNewGame, isMobileOrTablet, onMobileTabChange]);

  const handleContinue = useCallback(() => {
    setHasStarted(true);
    if (isMobileOrTablet && onMobileTabChange) {
      onMobileTabChange('board');
    }
  }, [isMobileOrTablet, onMobileTabChange]);

  const handleOpenLibrary = useCallback(() => {
    setPendingOpenLibrary(true);
    setHasStarted(true);
  }, []);

  const handleGoHome = useCallback(() => {
    setHasStarted(false);
  }, []);

  const handleFileDrop = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = e => {
        const content = e.target?.result as string;
        if (content) {
          loadSGFAsync(content);
          setFileName(file.name);
          setHasStarted(true);
        }
      };
      reader.readAsText(file);
    },
    [loadSGFAsync, setFileName]
  );

  const [scoreData, setScoreData] = useState<ScoreData | null>(null);

  // Header visibility state
  const [showHeader, setShowHeader] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('kaya-show-header');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  // Sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('kaya-show-sidebar');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  const { isEditMode: gameInfoEditMode, toggleEditMode: toggleGameInfoEditMode } =
    useGameInfoEditMode();
  const { matchesShortcut, getBinding, bindingToDisplayString } = useKeyboardShortcuts();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('kaya-show-header', String(showHeader));
    }
  }, [showHeader]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('kaya-show-sidebar', String(showSidebar));
    }
  }, [showSidebar]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (matchesShortcut(e, 'view.toggleHeader')) {
        e.preventDefault();
        setShowHeader(prev => !prev);
        return;
      }
      if (matchesShortcut(e, 'view.toggleSidebar')) {
        e.preventDefault();
        setShowSidebar(prev => !prev);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [matchesShortcut]);

  return {
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
  };
}
