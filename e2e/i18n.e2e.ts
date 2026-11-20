/**
 * Messages that were English in every language: the library's folder and
 * delete dialogs, and the unsupported-drop warning (an alert, now a toast)
 */

import { test, expect } from '@playwright/test';

test.setTimeout(20000);
test.use({ locale: 'fr-FR' });

test('the library names a new folder and asks to delete it in the UI language', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('.library-btn[title="Nouveau dossier"]').click();
  const input = page.locator('.library-dialog-input');
  await expect(input).toHaveValue('Nouveau dossier');
  await page.locator('.library-dialog-btn.primary').click();

  const row = page.locator('.library-tree-node', { hasText: 'Nouveau dossier' });
  await expect(row).toBeVisible();
  await row.click({ button: 'right' });
  await page.locator('.library-context-menu-item', { hasText: 'Supprimer' }).click();

  const dialog = page.locator('.library-dialog.danger');
  await expect(dialog.locator('.library-dialog-title')).toHaveText('Supprimer le dossier');
  await expect(dialog.locator('.library-dialog-message')).toHaveText(
    'Supprimer le dossier "Nouveau dossier" et tout son contenu ?'
  );
});

test('a file the app cannot open is refused in a toast, not a browser alert', async ({ page }) => {
  const alerts: string[] = [];
  page.on('dialog', dialog => {
    alerts.push(dialog.message());
    void dialog.dismiss();
  });
  await page.goto('/');
  await expect(page.locator('.shudan-goban')).toBeVisible();

  const dataTransfer = await page.evaluateHandle(() => {
    const data = new DataTransfer();
    data.items.add(new File(['club notes'], 'notes.txt', { type: 'text/plain' }));
    return data;
  });
  await page.dispatchEvent('.app-dropzone-wrapper', 'drop', { dataTransfer });

  await expect(page.locator('.toast.toast-error')).toContainText('.sgf');
  await expect(page.locator('.toast.toast-error')).toContainText('Déposez');
  expect(alerts).toEqual([]);
});
