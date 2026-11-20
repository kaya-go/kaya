/**
 * Select All (Cmd+A / Ctrl+A) selects the text the user is in: a text field,
 * or a block of text such as the game info. Elsewhere it used to select the
 * whole interface, headers, tree labels and buttons included.
 */

import { test, expect, type Page } from '@playwright/test';

test.setTimeout(15000);
test.use({ locale: 'en-US' });

const selectedText = (page: Page) => page.evaluate(() => document.getSelection()?.toString() ?? '');

test.describe('Select All', () => {
  test('outside a text field or block of text, it selects nothing', async ({ page }) => {
    await page.goto('/');
    await page.locator('.shudan-vertex[data-x="3"][data-y="3"]').click();
    await page.keyboard.press('ControlOrMeta+a');
    expect(await selectedText(page)).toBe('');
  });

  test('in the game info, it selects the game info and nothing else', async ({ page }) => {
    await page.goto('/');
    const info = page.locator('.game-info-display');
    await expect(info).toContainText('6.5');
    // The caret in the game info, where a click or a drag leaves it.
    await info.evaluate(el => document.getSelection()?.collapse(el, 0));
    await page.keyboard.press('ControlOrMeta+a');
    const text = await selectedText(page);
    expect(text).toContain('6.5'); // the komi
    expect(text).not.toMatch(/game tree/i);
  });

  test('in a text field, it selects the text of the field', async ({ page }) => {
    await page.goto('/');
    await page.locator('.comment-edit-button').click();
    const textarea = page.locator('.comment-textarea');
    await textarea.fill('one two three');
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('replaced');
    await expect(textarea).toHaveValue('replaced');
  });

  test('on a slider, which holds no text, it selects nothing', async ({ page }) => {
    await page.goto('/');
    await page.locator('.kaya-config-trigger').click();
    await page.locator('.kaya-config-modal input[type="range"]').first().focus();
    await page.keyboard.press('ControlOrMeta+a');
    expect(await selectedText(page)).toBe('');
  });
});
