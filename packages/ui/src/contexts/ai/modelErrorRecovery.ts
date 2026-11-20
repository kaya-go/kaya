import type { ModelQuantization } from '../../services/modelStorage';
import type { TFunction } from 'i18next';
import { QUANT_LABELS } from './engineHelpers';

interface ModelLibraryEntry {
  id: string;
  name: string;
  isDownloaded: boolean;
  quantization?: ModelQuantization;
}

type ToastFn = (
  message: string,
  type: 'success' | 'error' | 'info',
  action?: { label: string; onClick: () => void }
) => void;

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
  t: TFunction
): void {
  const isFp16Error = /float16|fp16|Float16/.test(errorMessage);

  const current = selectedModelId ? modelLibrary.find(m => m.id === selectedModelId) : undefined;
  if (current?.quantization) {
    const currentQuant = current.quantization;
    const alternatives: ModelQuantization[] = (
      ['fp32', 'uint8', 'fp16'] as ModelQuantization[]
    ).filter(q => q !== currentQuant);

    for (const alt of alternatives) {
      const altModel = modelLibrary.find(
        m => m.name === current.name && m.quantization === alt && m.isDownloaded
      );
      if (altModel) {
        showToast(
          isFp16Error
            ? t('aiConfig.modelIncompatible', { quant: QUANT_LABELS[currentQuant] })
            : t('aiConfig.allBackendsFailed'),
          'error',
          {
            label: t('aiConfig.switchToModel', { quant: QUANT_LABELS[alt] }),
            onClick: () => setSelectedModelId(altModel.id),
          }
        );
        return;
      }
    }

    const fp32Model = modelLibrary.find(
      m => m.name === current.name && m.quantization === 'fp32' && !m.isDownloaded
    );
    if (fp32Model) {
      showToast(
        isFp16Error
          ? t('aiConfig.modelIncompatible', { quant: QUANT_LABELS[currentQuant] })
          : t('aiConfig.allBackendsFailed'),
        'error',
        {
          label: t('aiConfig.downloadAndSwitch', { quant: QUANT_LABELS['fp32'] }),
          onClick: async () => {
            try {
              await downloadModel(fp32Model.id);
              setSelectedModelId(fp32Model.id);
            } catch {
              showToast(t('aiConfig.modelDownloadFailed'), 'error');
            }
          },
        }
      );
      return;
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
