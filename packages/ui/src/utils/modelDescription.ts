import type { TFunction } from 'i18next';
import type { StoredModelMetadata } from '../services/modelStorage';

/**
 * The description the model library shows for a model. A custom model's is
 * translated here, at display time: what is stored is not, and rows uploaded
 * before 0.5.0 hold the English "User uploaded model".
 */
export function modelDescription(
  model: Pick<StoredModelMetadata, 'description' | 'isUserModel'>,
  t: TFunction
): string {
  return model.isUserModel ? t('aiConfig.customModelDescription') : model.description;
}
