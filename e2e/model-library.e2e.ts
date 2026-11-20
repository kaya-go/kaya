/**
 * The AI model library stores a file once, and lists every file it stores
 *
 * The bytes here are not a network: the library only stores and lists them,
 * and the engine failing to load them afterwards is not what is tested.
 */

import { createHash } from 'node:crypto';
import { test, expect, type Page } from '@playwright/test';

test.setTimeout(20000);
test.use({ locale: 'en-US' });

const CATALOG_NETWORK = 'kata1-b28c512nbt-s12043015936-d5616446734';

const model = (name: string, content: string) => ({
  name,
  mimeType: 'application/octet-stream',
  buffer: Buffer.from(content),
});

const customModels = (page: Page) => page.locator('.user-models .model-variant-item');
const uploadInput = (page: Page) => page.locator('.model-upload-section input[type="file"]');

async function openSettings(page: Page) {
  await page.goto('/');
  await page.locator('.kaya-config-trigger').click();
  await expect(page.locator('.kaya-config-modal')).toBeVisible();
}

test.describe('AI model library', () => {
  test('the same bytes uploaded twice are stored once, whatever the filename', async ({ page }) => {
    await openSettings(page);

    await uploadInput(page).setInputFiles(model('my-net.fp16.onnx', 'first network'));
    await expect(customModels(page)).toHaveCount(1);
    await expect(customModels(page).first()).toContainText('my-net.fp16');
    await expect(customModels(page).first()).toContainText('Active');

    await uploadInput(page).setInputFiles(model('renamed-copy.onnx', 'first network'));
    await uploadInput(page).setInputFiles(model('other-net.onnx', 'second network'));
    await expect(customModels(page)).toHaveCount(2);
    await expect(customModels(page).nth(1)).toContainText('other-net');

    // The second upload of the first file selected the copy already stored.
    await uploadInput(page).setInputFiles(model('my-net.fp16.onnx', 'first network'));
    await expect(customModels(page).first()).toContainText('Active');
    await expect(customModels(page)).toHaveCount(2);

    await page.reload();
    await page.locator('.kaya-config-trigger').click();
    await expect(customModels(page)).toHaveCount(2);
  });

  test('a file named after the catalog network is listed with the custom models', async ({
    page,
  }) => {
    await openSettings(page);

    // The name the files carry on Hugging Face, where the upload section points.
    await uploadInput(page).setInputFiles(model(`${CATALOG_NETWORK}.fp16.onnx`, 'a network'));
    await expect(customModels(page)).toHaveCount(1);
    await expect(customModels(page).first()).toContainText(`${CATALOG_NETWORK}.fp16`);

    await customModels(page).first().locator('.model-action-btn.danger').click();
    await expect(customModels(page)).toHaveCount(0);
  });

  test('a file dropped on the board is stored like an upload', async ({ page }) => {
    await page.goto('/');
    const dataTransfer = await page.evaluateHandle(() => {
      const transfer = new DataTransfer();
      transfer.items.add(new File(['dropped network'], 'Dropped.FP32.ONNX'));
      return transfer;
    });
    await page.dispatchEvent('.shudan-goban', 'drop', { dataTransfer });
    await expect(page.locator('.toast.toast-success')).toHaveText(/Model uploaded/);

    await page.locator('.kaya-config-trigger').click();
    await expect(customModels(page)).toHaveCount(1);
    await expect(customModels(page).first()).toContainText('Dropped.FP32');
  });

  test('a stored row whose bytes are gone does not pass for the copy already stored', async ({
    page,
  }) => {
    const content = 'evicted network';
    const hash = createHash('sha256').update(content).digest('base64url');

    await openSettings(page);
    // What deleting a downloaded catalog model used to leave behind: its row,
    // with the hash of bytes that are no longer there.
    await page.evaluate(
      ({ hash, name }) =>
        new Promise<void>((resolve, reject) => {
          const open = indexedDB.open('KayaDB');
          open.onerror = () => reject(open.error);
          open.onsuccess = () => {
            const tx = open.result.transaction('model_metadata', 'readwrite');
            tx.objectStore('model_metadata').put(
              [{ id: 'katago-latest-fp16', name, displayName: 'KataGo', description: '', hash }],
              'model_library'
            );
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
          };
        }),
      { hash, name: CATALOG_NETWORK }
    );
    await page.reload();
    await page.locator('.kaya-config-trigger').click();

    await uploadInput(page).setInputFiles(model('evicted.onnx', content));
    await expect(customModels(page)).toHaveCount(1);
    await expect(customModels(page).first()).toContainText('Active');
  });
});

test.describe('AI model library in another language', () => {
  test.use({ locale: 'fr-FR' });

  test('a custom model is described in the interface language', async ({ page }) => {
    await openSettings(page);
    await uploadInput(page).setInputFiles(model('mon-reseau.onnx', 'a network'));
    await expect(customModels(page).first().locator('.model-variant-desc')).toHaveText(
      'Modèle importé'
    );
  });

  test('the catalog model is described in the interface language', async ({ page }) => {
    await openSettings(page);
    await expect(page.locator('.model-base-desc').first()).toHaveText(
      'Dernier checkpoint (déc. 2025)'
    );
  });
});
