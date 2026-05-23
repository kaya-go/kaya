import type { ModelQuantization } from '../../hooks/game/ai-analysis-types';
import { parseModelId, getModelId } from '../../hooks/game/useAIAnalysis';
import { QUANT_LABELS } from './engineHelpers';

interface ModelLibraryEntry {
  id: string;
  isDownloaded: boolean;
  baseModelIndex?: number;
  quantization?: ModelQuantization;
}

type ToastFn = (
  message: string,
  type: 'success' | 'error' | 'info',
  action?: { label: string; onClick: () => void }
) => void;

type TFn = (key: string, opts?: Record<string, string>) => string;

/**
 * When all backends fail for a model, surface a recovery toast that
 * either suggests an alternative quantization (downloaded if possible,
 * else offers to download fp32) or offers to open the settings panel.
 */
export function showModelErrorRecoveryToast(
  errorMessage: string,
  selectedModelId: string | null,
  modelLibrary: ModelLibraryEntry[],
  setSelectedModelId: (id: string | null) => void,
  downloadModel: (id: string) => Promise<void>,
  setAIConfigOpen: (open: boolean) => void,
  showToast: ToastFn,
  t: TFn
): void {
  const isFp16Error = /float16|fp16|Float16/.test(errorMessage);

  if (selectedModelId) {
    const parsed = parseModelId(selectedModelId);
    if (parsed) {
      const currentQuant = parsed.quantization;
      const alternatives: ModelQuantization[] = (
        ['fp32', 'uint8', 'fp16'] as ModelQuantization[]
      ).filter(q => q !== currentQuant);

      for (const alt of alternatives) {
        const altId = getModelId(parsed.baseModelIndex, alt);
        const altModel = modelLibrary.find(m => m.id === altId);
        if (altModel?.isDownloaded) {
          showToast(
            isFp16Error
              ? t('aiConfig.modelIncompatible', { quant: QUANT_LABELS[currentQuant] })
              : t('aiConfig.allBackendsFailed'),
            'error',
            {
              label: t('aiConfig.switchToModel', { quant: QUANT_LABELS[alt] }),
              onClick: () => setSelectedModelId(altId),
            }
          );
          return;
        }
      }

      const fp32Id = getModelId(parsed.baseModelIndex, 'fp32');
      const fp32Model = modelLibrary.find(m => m.id === fp32Id);
      if (fp32Model && !fp32Model.isDownloaded) {
        showToast(
          isFp16Error
            ? t('aiConfig.modelIncompatible', { quant: QUANT_LABELS[currentQuant] })
            : t('aiConfig.allBackendsFailed'),
          'error',
          {
            label: t('aiConfig.downloadAndSwitch', { quant: QUANT_LABELS['fp32'] }),
            onClick: async () => {
              try {
                await downloadModel(fp32Id);
                setSelectedModelId(fp32Id);
              } catch {
                showToast(t('aiConfig.modelDownloadFailed'), 'error');
              }
            },
          }
        );
        return;
      }
    }
  }

  showToast(
    isFp16Error ? t('aiConfig.modelIncompatibleGeneric') : t('aiConfig.allBackendsFailed'),
    'error',
    {
      label: t('aiConfig.openSettings'),
      onClick: () => setAIConfigOpen(true),
    }
  );
}
