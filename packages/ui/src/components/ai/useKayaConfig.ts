import type { ChangeEvent } from 'react';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameTree } from '../../contexts/GameTreeContext';
import { useBoardTheme } from '@kaya/themes';
import { useToast } from '../ui/Toast';
import { isTauriApp } from '@kaya/platform';
import { BASE_MODELS, parseModelId, getModelId } from '../../hooks/game/useAIAnalysis';

export type ConfigTab = 'analysis' | 'game' | 'theme' | 'shortcuts';

export function useKayaConfig() {
  const { t } = useTranslation();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [expandedModelIndex, setExpandedModelIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<ConfigTab>('analysis');
  const {
    aiSettings,
    setAISettings,
    gameSettings,
    setGameSettings,
    isAIConfigOpen,
    setAIConfigOpen,
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
    deleteModel,
    uploadModel,
  } = useGameTree();
  const { showToast } = useToast();
  const { boardTheme, setBoardTheme, availableThemes } = useBoardTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Group models by base model index for hierarchical display
  const modelsByBase = useMemo(() => {
    const grouped = new Map<number, typeof modelLibrary>();
    for (const model of modelLibrary) {
      if (model.baseModelIndex !== undefined) {
        const existing = grouped.get(model.baseModelIndex) || [];
        existing.push(model);
        grouped.set(model.baseModelIndex, existing);
      }
    }
    return grouped;
  }, [modelLibrary]);

  // Get user-uploaded models (those without baseModelIndex)
  const userModels = useMemo(
    () => modelLibrary.filter(m => m.baseModelIndex === undefined),
    [modelLibrary]
  );

  // Check if PyTorch GPU engine is available (Linux with ROCm/CUDA only)
  const [pytorchAvailable, setPytorchAvailable] = useState(false);
  // Check WebNN availability (Chrome with navigator.ml)
  const [webnnAvailable, setWebnnAvailable] = useState(false);
  useEffect(() => {
    if (isTauriApp()) {
      import('@kaya/ai-engine/pytorch-tauri-engine')
        .then(({ isPyTorchAvailable }) => {
          isPyTorchAvailable().then(setPytorchAvailable);
        })
        .catch(() => {});
    }
    if (typeof navigator !== 'undefined' && 'ml' in navigator) {
      setWebnnAvailable(true);
    }
  }, []);

  // Track if user has manually interacted with expand/collapse
  const hasUserInteracted = useRef(false);

  // Expand the model that contains the selected variant on initial mount only
  useEffect(() => {
    if (selectedModelId && expandedModelIndex === null && !hasUserInteracted.current) {
      const parsed = parseModelId(selectedModelId);
      if (parsed) {
        setExpandedModelIndex(parsed.baseModelIndex);
      }
    }
  }, [selectedModelId, expandedModelIndex]);

  const handleToggleExpand = (baseIndex: number) => {
    hasUserInteracted.current = true;
    setExpandedModelIndex(expandedModelIndex === baseIndex ? null : baseIndex);
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

  // Get the recommended model's default variant ID (fp16 for best GPU memory efficiency)
  const recommendedModelId = useMemo(() => {
    const recommendedBase = BASE_MODELS.findIndex(m => m.recommended);
    if (recommendedBase >= 0) {
      return getModelId(recommendedBase, 'fp16');
    }
    return null;
  }, []);

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
    expandedModelIndex,
    handleToggleExpand,
    modelsByBase,
    userModels,
    isAnyDownloading,
    hasAnyDownloaded,
    recommendedModel,
    handleDownloadRecommended,
    fileInputRef,
    handleFileSelect,
    handleDownload,
    handleDelete,
    handleSelect,
    pytorchAvailable,
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
