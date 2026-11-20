import type { ChangeEvent } from 'react';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameTreeSelector } from '../../contexts/GameTreeContext';
import type { GameTreeContextValue } from '../../types/game';
import { useBoardTheme } from '@kaya/themes';
import { useToast } from '../ui/Toast';
import { BASE_MODELS, getModelId } from '../../hooks/game/useAIAnalysis';
import { useAutoPick } from '../../hooks/useAutoPick';

export type ConfigTab = 'analysis' | 'game' | 'theme' | 'shortcuts' | 'detection';

export function useKayaConfig() {
  const { t } = useTranslation();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [expandedModelName, setExpandedModelName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ConfigTab>('analysis');
  const {
    aiSettings,
    setAISettings,
    gameSettings,
    setGameSettings,
    isAIConfigOpen,
    setAIConfigOpen,
    configInitialTab,
    setConfigInitialTab,
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
    deleteModel,
    uploadModel,
  } = useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        aiSettings: ctx.aiSettings,
        setAISettings: ctx.setAISettings,
        gameSettings: ctx.gameSettings,
        setGameSettings: ctx.setGameSettings,
        isAIConfigOpen: ctx.isAIConfigOpen,
        setAIConfigOpen: ctx.setAIConfigOpen,
        configInitialTab: ctx.configInitialTab,
        setConfigInitialTab: ctx.setConfigInitialTab,
        modelLibrary: ctx.modelLibrary,
        selectedModelId: ctx.selectedModelId,
        setSelectedModelId: ctx.setSelectedModelId,
        downloadModel: ctx.downloadModel,
        deleteModel: ctx.deleteModel,
        uploadModel: ctx.uploadModel,
      }),
      []
    )
  );
  const { showToast } = useToast();
  const { boardTheme, setBoardTheme, availableThemes } = useBoardTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Catalog rows, grouped by network. A user file is never grouped here, even
  // when it carries a catalog network's name (the files on Hugging Face do):
  // the group renders one row per precision, so it would not be listed at all.
  const modelsByName = useMemo(() => {
    const grouped = new Map<string, typeof modelLibrary>();
    for (const model of modelLibrary) {
      if (model.isUserModel) continue;
      const existing = grouped.get(model.name) ?? [];
      existing.push(model);
      grouped.set(model.name, existing);
    }
    return grouped;
  }, [modelLibrary]);

  const userModels = useMemo(() => modelLibrary.filter(m => m.isUserModel), [modelLibrary]);

  // What auto-config would choose on this host — drives which variant the
  // model library marks as the best fit.
  const autoPick = useAutoPick();

  // Check WebNN availability (Chrome with navigator.ml)
  const [webnnAvailable, setWebnnAvailable] = useState(false);
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'ml' in navigator) {
      setWebnnAvailable(true);
    }
  }, []);

  // Track if user has manually interacted with expand/collapse
  const hasUserInteracted = useRef(false);

  // Expand the model that contains the selected variant on initial mount only
  useEffect(() => {
    if (selectedModelId && expandedModelName === null && !hasUserInteracted.current) {
      const selected = modelLibrary.find(m => m.id === selectedModelId);
      if (selected && !selected.isUserModel) {
        setExpandedModelName(selected.name);
      }
    }
  }, [selectedModelId, expandedModelName, modelLibrary]);

  const handleToggleExpand = (name: string) => {
    hasUserInteracted.current = true;
    setExpandedModelName(expandedModelName === name ? null : name);
  };

  // Resolve portal container after mount to avoid SSR issues
  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!isAIConfigOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAIConfigOpen]);

  // Close modal on Escape
  useEffect(() => {
    if (!isAIConfigOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAIConfigOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isAIConfigOpen, setAIConfigOpen]);

  // Sync active tab when modal opens with a requested initial tab
  useEffect(() => {
    if (isAIConfigOpen && configInitialTab) {
      setActiveTab(configInitialTab);
      setConfigInitialTab('analysis');
    }
  }, [isAIConfigOpen, configInitialTab, setConfigInitialTab]);

  const closeModal = () => setAIConfigOpen(false);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadModel(file);
        showToast(t('aiConfig.modelUploadedSuccess'), 'success');
      } catch (err) {
        showToast(t('aiConfig.modelUploadFailed'), 'error');
      }
    }
    // Reset input so the same file can be selected again
    event.target.value = '';
  };

  const handleDownload = async (id: string) => {
    try {
      await downloadModel(id);
      showToast(t('aiConfig.modelDownloadedSuccess'), 'success');
    } catch (err) {
      showToast(t('aiConfig.modelDownloadFailed'), 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteModel(id);
      showToast(t('aiConfig.modelDeletedSuccess'), 'success');
    } catch (err) {
      showToast(t('aiConfig.modelDeleteFailed'), 'error');
    }
  };

  const handleSelect = async (id: string) => {
    const model = modelLibrary.find(m => m.id === id);
    if (model?.isDownloaded) {
      await setSelectedModelId(id);
    }
  };

  const isAnyDownloading = modelLibrary.some(m => m.isDownloading);
  const hasAnyDownloaded = modelLibrary.some(m => m.isDownloaded);

  // Which precision the engine will actually be fastest on, from the same
  // probe the backend chain comes from. Hardcoding fp16 here (as this did)
  // recommended the slower of the two sane variants on every macOS machine.
  // Until the probe resolves there is no recommendation, so fall back to the
  // always-works precision rather than to a guess.
  const recommendedQuantization = autoPick?.quantization ?? 'fp32';

  const recommendedModelId = useMemo(() => {
    if (!BASE_MODELS.some(m => m.recommended)) return null;
    return getModelId(recommendedQuantization);
  }, [recommendedQuantization]);

  const recommendedModel = useMemo(() => {
    if (!recommendedModelId) return null;
    return modelLibrary.find(m => m.id === recommendedModelId) || null;
  }, [recommendedModelId, modelLibrary]);

  const handleDownloadRecommended = async () => {
    if (recommendedModelId) {
      try {
        await downloadModel(recommendedModelId);
      } catch (err) {
        showToast(t('aiConfig.modelDownloadFailed'), 'error');
      }
    }
  };

  return {
    t,
    portalContainer,
    activeTab,
    setActiveTab,
    closeModal,
    expandedModelName,
    handleToggleExpand,
    modelsByName,
    userModels,
    isAnyDownloading,
    hasAnyDownloaded,
    recommendedModel,
    recommendedQuantization,
    handleDownloadRecommended,
    fileInputRef,
    handleFileSelect,
    handleDownload,
    handleDelete,
    handleSelect,
    webnnAvailable,
    aiSettings,
    setAISettings,
    gameSettings,
    setGameSettings,
    isAIConfigOpen,
    setAIConfigOpen,
    selectedModelId,
    boardTheme,
    setBoardTheme,
    availableThemes,
  };
}

export type UseKayaConfigReturn = ReturnType<typeof useKayaConfig>;
