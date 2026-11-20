/**
 * Scoring mode estimates dead stones with the deadstones WebAssembly. When it
 * cannot run (the module fails to load; on a WebKit without
 * 'wasm-unsafe-eval' the desktop policy blocks it), the user is told, rather
 * than left waiting for an estimate that never comes.
 */

import { test, expect } from '@playwright/test';

test.setTimeout(15000);
test.use({ locale: 'en-US' });

test('a dead-stone estimate that fails says so, once per visit to scoring', async ({ page }) => {
  await page.route('**/*.wasm', route => route.abort());
  await page.goto('/');
  await page.locator('.shudan-vertex[data-x="3"][data-y="3"]').click();
  await page.locator('.shudan-vertex[data-x="15"][data-y="15"]').click();
  await page.locator('.gameboard-score-button').click();
  const toast = page.locator('.toast.toast-error');
  await expect(toast).toContainText('Dead stones could not be estimated');

  // Each move navigated estimates again, and fails again: no second toast.
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('span.move-number')).toHaveText('Move 1');
  await page.waitForTimeout(500);
  await expect(toast).toHaveCount(1);
});
