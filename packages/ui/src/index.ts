// Theme system
export { ThemeProvider, useTheme } from './contexts/ThemeContext';
export type { Theme, ThemeContextType } from './contexts/ThemeContext';

// Board theme system - re-exported from @kaya/themes
export { BoardThemeProvider, useBoardTheme } from '@kaya/themes';
export type { BuiltInThemeId, ResolvedBoardTheme } from '@kaya/themes';

// Keyboard shortcuts context
export {
  KeyboardShortcutsProvider,
  useKeyboardShortcutsContext,
  useKeyboardShortcuts,
} from './contexts/KeyboardShortcutsContext';
export type { ShortcutId, ShortcutCategory, KeyBinding } from './contexts/KeyboardShortcutsContext';

// Keyboard shortcuts utilities (for direct use without context)
export {
  bindingToDisplayString,
  eventMatchesBinding,
  createBindingFromEvent,
} from './hooks/useKeyboardShortcuts';

// Game tree context
export { GameTreeProvider, useGameTree } from './contexts/GameTreeContext';
export type {
  GameTreeContextValue,
  GameInfo,
  SGFProperty,
  NewGameConfig,
} from './contexts/GameTreeContext';

// AI Engine Context (engine lifecycle management)
export { AIEngineProvider, useAIEngine } from './contexts/AIEngineContext';
export type { AIEngineContextValue } from './contexts/AIEngineContext';

// AI Analysis Context (analysis logic, caching, UI state)
export {
  AIAnalysisProvider,
  useAIAnalysis as useAIAnalysisContext,
} from './contexts/AIAnalysisContext';
export type { AIAnalysisContextValue } from './contexts/AIAnalysisContext';

// Optimized context selectors (use these instead of useGameTree for better performance)
export {
  useGameTreeSelector,
  useGameTreeCore,
  useGameTreeNavigation,
  useGameTreeBoard,
  useGameTreeEdit,
  useGameTreeScore,
  useGameTreeAI,
  useGameTreeFile,
  useCurrentNodeId,
  useEditModeSelector,
  useScoreMode,
  useAnalysisMode,
} from './contexts/GameTreeContext';

// Board navigation context
export { BoardNavigationProvider, useBoardNavigation } from './contexts/BoardNavigationContext';

// Tauri drag context (for native file drag-drop)
export { TauriDragProvider, useTauriDrag } from './contexts/TauriDragContext';

// Layout components
export { ResizableLayout } from './components/layout/ResizableLayout';
export { Header } from './components/layout/Header';
export { MobileTabBar } from './components/layout/MobileTabBar';
export type { MobileTab } from './components/layout/MobileTabBar';
export { MobileMenu } from './components/layout/MobileMenu'; // Added import
export { LandingPage } from './components/layout/LandingPage';
export type { LandingPageProps } from './components/layout/LandingPage';
export { GameBoard } from './components/board/GameBoard';
export { GameTreeGraph } from './components/gametree/GameTreeGraphReactFlow';
export type {
  GameTreeGraphProps,
  GameTreeGraphRef,
} from './components/gametree/GameTreeGraphReactFlow';
export { GameTreeLayoutToggle } from './components/gametree/GameTreeLayoutToggle';
export { GameTreeControls } from './components/gametree/GameTreeControls';
export { BoardControls } from './components/board/BoardControls';
export { AppDropZone } from './components/file/AppDropZone';
export {
  GameInfoEditor,
  GameInfoHeaderActions,
  useGameInfoEditMode,
} from './components/editors/GameInfoEditor';
export { NewGameDialog } from './components/dialogs/NewGameDialog';
export { SaveFileDialog } from './components/dialogs/SaveFileDialog';
export { SaveToLibraryDialog } from './components/dialogs/SaveToLibraryDialog';
export { AboutDialog } from './components/dialogs/AboutDialog';
export {
  CommentEditor,
  CommentHeaderActions,
  CommentEditorProvider,
  useCommentEditorState,
} from './components/editors/CommentEditor';
export { LoadingOverlay } from './components/ui/LoadingOverlay';
export { SaveStatus } from './components/ui/SaveStatus';
export { ScoreEstimator } from './components/board/ScoreEstimator';
export type { ScoreData } from './components/board/ScoreEstimator';
export { useAIAnalysis } from './components/ai/AIAnalysisOverlay';
export { AnalysisGraphPanel } from './components/analysis/AnalysisGraphPanel';
export type { AnalysisGraphPanelProps } from './components/analysis/AnalysisGraphPanel';
export { AnalysisPanel } from './components/analysis/AnalysisPanel';
export type { AnalysisPanelProps, AnalysisPanelTab } from './components/analysis/AnalysisPanel';
export { PerformanceReportTab } from './components/analysis/PerformanceReportTab';
export { AnalysisChart } from './components/analysis/AnalysisChart';
export type { AnalysisChartProps, AnalysisDataPoint } from './components/analysis/AnalysisChart';
export { EditToolbar } from './components/editors/EditToolbar';
export { CollapsiblePanel } from './components/layout/CollapsiblePanel';
export { ToastContainer, useToast, ToastProvider } from './components/ui/Toast';
export type { ToastMessage } from './components/ui/Toast';
export { StatusBar } from './components/layout/StatusBar';
export type { VersionData } from './components/layout/StatusBar';

// File utilities
export { saveFile, isTauriApp, setTauriSaveAPI } from '@kaya/platform';
export { setTauriClipboardAPI } from '@kaya/platform';
export type { TauriSaveAPI } from '@kaya/platform';
export { readClipboardText, writeClipboardText } from '@kaya/platform';

// Hooks
export { useGameSounds } from './useGameSounds';
export { useGamepads } from './useGamepads';
export type { GamepadInfo } from './useGamepads';
export { useGameController } from './useGameController';
export type { GameControllerState } from './useGameController';
export { useFuzzyPlacement } from './useFuzzyPlacement';

// Responsive/Mobile hooks
export {
  useMediaQuery,
  useLayoutMode,
  useIsTouchDevice,
  useResponsive,
  BREAKPOINTS,
} from './hooks/useMediaQuery';
export type { LayoutMode } from './hooks/useMediaQuery';

// Swipe gesture hooks
export { useSwipeGesture, useBoardSwipeNavigation } from './hooks/useSwipeGesture';
export type {
  SwipeDirection,
  SwipeConfig,
  SwipeEvent,
  SwipeHandlers,
} from './hooks/useSwipeGesture';

// External links (opens URLs in default browser in Tauri)
export { useExternalLinks } from './hooks/useExternalLinks';

// Game controller management
export {
  GameControllerManagerProvider,
  useGameControllerManager,
} from './components/gamepad/GameControllerManager';

// Components
export { GamepadIndicator } from './components/gamepad/GamepadIndicator';

// Library management
export { LibraryProvider, useLibrary } from './contexts/LibraryContext';
export type { LibraryContextValue, LibraryProviderProps } from './contexts/LibraryContext';
export { LibraryPanel } from './components/library';
export type { LibraryPanelProps } from './components/library';
export { useLibraryPanel } from './hooks/useLibraryPanel';
export * from '@kaya/game-library';

// Scoring utilities
export { calculateTerritory, countDeadStones } from './services/scoring';

// Sound file paths (apps need to copy these files)
export { SOUND_FILES, type SoundType } from './services/sounds';

// AI Engine utilities
export { WorkerEngine, AbortedError } from './workers/WorkerEngine';
export {
  createEngine,
  isNativeEngineAvailable,
  getEngineDescription,
  type CreateEngineOptions,
} from './workers/engineFactory';

// i18n (internationalization) - re-exported from @kaya/i18n
export {
  i18n,
  locales,
  defaultLocale,
  detectLocale,
  loadLocale,
  getLocale,
  I18nProvider,
  useI18n,
} from '@kaya/i18n';
export type { Locale } from '@kaya/i18n';
export { LanguageSwitcher } from './components/ui/LanguageSwitcher';
// Re-export useTranslation from react-i18next for convenience
export { useTranslation } from 'react-i18next';

// Note: CSS files are copied to dist/ during build
// Apps should import them directly from @kaya/ui/dist/assets/ui.css
