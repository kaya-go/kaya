import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  useGameTree,
  useLibraryPanel,
  useGameInfoEditMode,
  useKeyboardShortcuts,
  useLayoutMode,
  usePwaInstall,
  type GameTreeGraphRef,
  type MobileTab,
} from '@kaya/ui';

interface UseAppContentStateOptions {
  onMobileTabChange?: (tab: MobileTab) => void;
}

export function useAppContentState({ onMobileTabChange }: UseAppContentStateOptions) {
  // Library panel state
  const { showLibrary, setShowLibrary, toggleLibrary } = useLibraryPanel();

  // Ref for game tree graph to control centering
  const gameTreeRef = useRef<GameTreeGraphRef>(null);

  // Load saved layout preference from localStorage
  const [treeLayoutHorizontal, setTreeLayoutHorizontal] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('kaya-tree-layout-horizontal');
      return saved !== null ? saved === 'true' : false; // Default: vertical
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

  // Save layout preference when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('kaya-tree-layout-horizontal', String(treeLayoutHorizontal));
    }
  }, [treeLayoutHorizontal]);

  // Save minimap preference when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('kaya-tree-show-minimap', String(showMinimap));
    }
  }, [showMinimap]);

  const { moveName, moveUrl, patternMatchingEnabled, togglePatternMatching } = useGameTree();

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

  // Game info editor state for header actions
  const { isEditMode: gameInfoEditMode, toggleEditMode: toggleGameInfoEditMode } =
    useGameInfoEditMode();
  const { matchesShortcut, getBinding, bindingToDisplayString } = useKeyboardShortcuts();

  // PWA install prompt
  const pwaInstall = usePwaInstall();

  // About dialog state
  const [showAboutDialog, setShowAboutDialog] = useState(false);

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
      // Toggle header
      if (matchesShortcut(e, 'view.toggleHeader')) {
        e.preventDefault();
        setShowHeader(prev => !prev);
        return;
      }
      // Toggle sidebar
      if (matchesShortcut(e, 'view.toggleSidebar')) {
        e.preventDefault();
        setShowSidebar(prev => !prev);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [matchesShortcut]);

  // Landing page state
  const layoutMode = useLayoutMode();
  const isMobile = layoutMode === 'mobile';
  const [hasStarted, setHasStarted] = useState(false);

  // Track if library should be opened after transition from landing page
  const [pendingOpenLibrary, setPendingOpenLibrary] = useState(false);

  // Game state check for Landing Page
  const { gameTree, rootId, createNewGame, filename } = useGameTree();

  // Determine if there is a saved game state
  // We consider a game "saved" if there are moves played (more than just root)
  // OR if there is a filename associated with it (loaded file)
  const hasSavedGame = useMemo(() => {
    if (filename && filename !== 'Untitled Game.sgf') return true;
    if (gameTree && rootId !== null) {
      const root = gameTree.get(rootId);
      // If root has children (moves) or if it's not a fresh empty game
      if (root && (root.children.length > 0 || root.data.annotated)) {
        return true;
      }
    }
    return false;
  }, [gameTree, rootId, filename]);

  // If not mobile, always consider started
  useEffect(() => {
    if (!isMobile) {
      setHasStarted(true);
    }
  }, [isMobile]);

  // Open library after transition from landing page
  useEffect(() => {
    if (hasStarted && pendingOpenLibrary) {
      setPendingOpenLibrary(false);
      // On mobile, switch to library tab; on desktop, show library panel
      if (isMobile && onMobileTabChange) {
        onMobileTabChange('library');
      } else {
        setShowLibrary(true);
      }
    }
  }, [hasStarted, pendingOpenLibrary, setShowLibrary, isMobile, onMobileTabChange]);

  const handleNewGame = useCallback(() => {
    createNewGame(); // Actually start a new game
    setHasStarted(true);
    // On mobile, switch to board tab
    if (isMobile && onMobileTabChange) {
      onMobileTabChange('board');
    }
  }, [createNewGame, isMobile, onMobileTabChange]);

  const handleContinue = useCallback(() => {
    setHasStarted(true);
    // On mobile, switch to board tab
    if (isMobile && onMobileTabChange) {
      onMobileTabChange('board');
    }
  }, [isMobile, onMobileTabChange]);

  const handleOpenLibrary = useCallback(() => {
    setPendingOpenLibrary(true);
    setHasStarted(true);
  }, []);

  const handleGoHome = useCallback(() => {
    if (isMobile) {
      setHasStarted(false);
    }
  }, [isMobile]);

  const handleNavigateToBoard = useCallback(() => {
    setHasStarted(true);
    if (isMobile && onMobileTabChange) {
      onMobileTabChange('board');
    }
  }, [isMobile, onMobileTabChange]);

  const { loadSGFAsync, setFileName } = useGameTree();
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
    isMobile,
    hasStarted,
    hasSavedGame,
    handleNewGame,
    handleContinue,
    handleOpenLibrary,
    handleGoHome,
    handleNavigateToBoard,
    handleFileDrop,
    showHeader,
    setShowHeader,
    showSidebar,
    setShowSidebar,
    gameInfoEditMode,
    toggleGameInfoEditMode,
    getBinding,
    bindingToDisplayString,
    pwaInstall,
  };
}
