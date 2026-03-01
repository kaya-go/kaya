import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { type AISettings } from '../../types/game';
import { AnalysisResult } from '@kaya/ai-engine';
import { useModelLibrary } from './useModelLibrary';
import {
  loadAISettings,
  saveAISettings,
  parseGTPVertex,
  type PendingAnalysisAction,
  type UseAIAnalysisProps,
} from './ai-analysis-types';

// Re-export types and constants for backward compatibility
export type {
  ModelQuantization,
  BaseModelDefinition,
  QuantizationVariant,
} from './ai-analysis-types';
export { BASE_MODELS, QUANTIZATION_OPTIONS, getModelId, parseModelId } from './ai-analysis-types';

export function useAIAnalysis({ currentBoard }: UseAIAnalysisProps) {
  // Delegate model library management to sub-hook
  const {
    customAIModel,
    setCustomAIModel: handleSetCustomAIModel,
    isModelLoaded,
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
    deleteModel,
    uploadModel,
  } = useModelLibrary();

  const [isAIConfigOpen, setAIConfigOpen] = useState(false);
  const [analysisMode, setAnalysisMode] = useState(false);
  const [pendingAnalysisAction, setPendingAnalysisAction] = useState<PendingAnalysisAction>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResultState, setAnalysisResultState] = useState<any | null>(null);
  const [aiSettings, setAISettingsState] = useState<AISettings>(loadAISettings);

  const setAnalysisResult = useCallback((result: any | null) => {
    setAnalysisResultState(result);
  }, []);
  const analysisResult = analysisResultState;
  const [engineState, setEngineState] = useState<string>('ready');

  // Analysis cache (persisted across renders)
  const analysisCache = useRef<Map<string, AnalysisResult>>(new Map());
  const [analysisCacheSize, setAnalysisCacheSize] = useState<number>(0);

  const updateAnalysisCacheSize = useCallback(() => {
    setAnalysisCacheSize(analysisCache.current.size);
  }, []);

  const setAISettings = useCallback((settings: Partial<AISettings>) => {
    setAISettingsState(prev => {
      const newSettings = { ...prev, ...settings };
      saveAISettings(newSettings);
      return newSettings;
    });
  }, []);

  // Ownership heatmap state
  const [showOwnership, setShowOwnership] = useState(false);
  // Top moves heatmap state (default OFF - user must enable)
  const [showTopMoves, setShowTopMoves] = useState(false);
  // Analysis bar visibility (independent from analysisMode which controls engine)
  const [showAnalysisBar, setShowAnalysisBar] = useState(false);

  // Helper to check if any analysis feature is active
  const checkShouldDisableAnalysis = useCallback(
    (newShowOwnership: boolean, newShowTopMoves: boolean, newShowAnalysisBar: boolean) => {
      return !newShowOwnership && !newShowTopMoves && !newShowAnalysisBar;
    },
    []
  );

  // Check if any model is downloaded
  const hasAnyDownloadedModel = useMemo(
    () => modelLibrary.some(m => m.isDownloaded),
    [modelLibrary]
  );

  // Effect to trigger pending analysis action after a model is downloaded
  useEffect(() => {
    if (hasAnyDownloadedModel && pendingAnalysisAction) {
      const action = pendingAnalysisAction;
      setPendingAnalysisAction(null);

      if (action === 'analysisBar') {
        setShowAnalysisBar(true);
        setShowTopMoves(true);
        setAnalysisMode(true);
      } else if (action === 'ownership') {
        setShowOwnership(true);
        setAnalysisMode(true);
      } else if (action === 'topMoves') {
        setShowTopMoves(true);
        setAnalysisMode(true);
      }
    }
  }, [hasAnyDownloadedModel, pendingAnalysisAction]);

  const toggleOwnership = useCallback(() => {
    if (!showOwnership && !hasAnyDownloadedModel) {
      setPendingAnalysisAction('ownership');
      setAIConfigOpen(true);
      return;
    }

    setShowOwnership(prev => {
      const newValue = !prev;
      if (newValue && !analysisMode) {
        setAnalysisMode(true);
      } else if (!newValue && analysisMode) {
        if (checkShouldDisableAnalysis(!prev, showTopMoves, showAnalysisBar)) {
          setAnalysisMode(false);
        }
      }
      return newValue;
    });
  }, [
    analysisMode,
    setAnalysisMode,
    showTopMoves,
    showAnalysisBar,
    showOwnership,
    hasAnyDownloadedModel,
    setAIConfigOpen,
    checkShouldDisableAnalysis,
  ]);

  const toggleTopMoves = useCallback(() => {
    if (!showTopMoves && !hasAnyDownloadedModel) {
      setPendingAnalysisAction('topMoves');
      setAIConfigOpen(true);
      return;
    }

    setShowTopMoves(prev => {
      const newValue = !prev;
      if (newValue && !analysisMode) {
        setAnalysisMode(true);
      } else if (!newValue && analysisMode) {
        if (checkShouldDisableAnalysis(showOwnership, !prev, showAnalysisBar)) {
          setAnalysisMode(false);
        }
      }
      return newValue;
    });
  }, [
    analysisMode,
    setAnalysisMode,
    showOwnership,
    showAnalysisBar,
    showTopMoves,
    hasAnyDownloadedModel,
    setAIConfigOpen,
    checkShouldDisableAnalysis,
  ]);

  const toggleShowAnalysisBar = useCallback(() => {
    if (!showAnalysisBar && !hasAnyDownloadedModel) {
      setPendingAnalysisAction('analysisBar');
      setAIConfigOpen(true);
      return;
    }

    setShowAnalysisBar(prev => {
      const newValue = !prev;
      setShowTopMoves(newValue);
      if (newValue && !analysisMode) {
        setAnalysisMode(true);
      } else if (!newValue && analysisMode) {
        if (checkShouldDisableAnalysis(showOwnership, false, false)) {
          setAnalysisMode(false);
        }
      }
      return newValue;
    });
  }, [
    analysisMode,
    setAnalysisMode,
    showOwnership,
    showAnalysisBar,
    hasAnyDownloadedModel,
    setAIConfigOpen,
    checkShouldDisableAnalysis,
  ]);

  const winRate = useMemo(() => analysisResult?.winRate ?? null, [analysisResult]);
  const scoreLead = useMemo(() => analysisResult?.scoreLead ?? null, [analysisResult]);
  const bestMove = useMemo(() => {
    if (!analysisResult?.moveSuggestions?.[0]?.move) return null;
    return parseGTPVertex(analysisResult.moveSuggestions[0].move, currentBoard.width);
  }, [analysisResult, currentBoard.width]);

  return {
    customAIModel,
    setCustomAIModel: handleSetCustomAIModel,
    isModelLoaded,
    isAIConfigOpen,
    setAIConfigOpen,
    analysisMode,
    setAnalysisMode,
    isAnalyzing,
    setIsAnalyzing,
    analysisResult,
    setAnalysisResult,
    showOwnership,
    toggleOwnership,
    showTopMoves,
    toggleTopMoves,
    showAnalysisBar,
    setShowAnalysisBar,
    toggleShowAnalysisBar,
    aiSettings,
    setAISettings,
    winRate,
    scoreLead,
    bestMove,
    engineState,
    analysisCache,
    analysisCacheSize,
    updateAnalysisCacheSize,
    // Model Library
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
    deleteModel,
    uploadModel,
  };
}
