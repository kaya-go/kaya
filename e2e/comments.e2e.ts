/**
 * Comment editing tests
 * Covers regression for issue #25
 */

import { test, expect } from '@playwright/test';

test.setTimeout(10000);

test.describe('Comment Editing', () => {
  test('can edit and save comments', async ({ page }) => {
    await page.goto('/');

    // Click the edit comment button
    const editButton = page.locator('.comment-edit-button');
    await expect(editButton).toBeVisible();
    await editButton.click();

    // Verify we're in editing mode - textarea should appear
    const textarea = page.locator('.comment-textarea');
    await expect(textarea).toBeVisible();

    // Type a comment
    const testComment = 'Test comment from e2e';
    await textarea.fill(testComment);

    // Save using the save button
    const saveButton = page.locator('.comment-save-button');
    await expect(saveButton).toBeVisible();
    await saveButton.click();

    // Verify we exited edit mode (textarea should be gone)
    await expect(textarea).not.toBeVisible();

    // Verify the comment was saved (should appear in markdown display)
    await expect(page.locator('.comment-markdown')).toContainText(testComment);
  });

  test('can cancel comment editing with Escape', async ({ page }) => {
    await page.goto('/');

    // Enter edit mode
    await page.locator('.comment-edit-button').click();
    const textarea = page.locator('.comment-textarea');
    await expect(textarea).toBeVisible();

    // Type something
    await textarea.fill('This should be cancelled');

    // Press Escape to cancel
    await page.keyboard.press('Escape');

    // Verify we exited edit mode
    await expect(textarea).not.toBeVisible();
  });

  test('Enter key saves comment', async ({ page }) => {
    await page.goto('/');

    // Enter edit mode
    await page.locator('.comment-edit-button').click();
    const textarea = page.locator('.comment-textarea');
    await expect(textarea).toBeVisible();

    // Type a comment and press Enter to save
    const testComment = 'Saved with Enter key';
    await textarea.fill(testComment);
    await page.keyboard.press('Enter');

    // Verify we exited edit mode and comment was saved
    await expect(textarea).not.toBeVisible();
    await expect(page.locator('.comment-markdown')).toContainText(testComment);
  });
});

test.describe('Comment typed on a node the user leaves', () => {
  test('playing the next move keeps the comment typed on the previous one', async ({ page }) => {
    await page.goto('/');
    await page.locator('.shudan-vertex[data-x="3"][data-y="3"]').click();

    await page.locator('.comment-edit-button').click();
    await page.locator('.comment-textarea').fill('Black takes the corner');
    // Play the reply without saving: the click on the board leaves the node.
    await page.locator('.shudan-vertex[data-x="15"][data-y="15"]').click();
    await expect(page.locator('.comment-textarea')).toHaveCount(0);

    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.comment-markdown')).toContainText('Black takes the corner');
  });
});
