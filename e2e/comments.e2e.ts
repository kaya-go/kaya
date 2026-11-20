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

  test('a remote image is a link, and nothing is fetched from its host', async ({ page }) => {
    // A comment comes from a file anyone can send: an image loaded on display
    // would tell its host the reader's IP address and when they opened it.
    const fetched: string[] = [];
    page.on('request', request => {
      if (request.url().includes('images.example.test')) fetched.push(request.url());
    });
    await page.goto('/');
    await page.locator('.comment-edit-button').click();
    await page
      .locator('.comment-textarea')
      .fill('The shape: ![the joseki](https://images.example.test/joseki.png)');
    await page.keyboard.press('Enter');

    const comment = page.locator('.comment-markdown');
    const link = comment.locator('a[href="https://images.example.test/joseki.png"]');
    await expect(link).toHaveText('the joseki');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(comment.locator('img')).toHaveCount(0);
    expect(fetched).toEqual([]);
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

  test('a comment typed in one game is not saved into the next one', async ({ page }) => {
    await page.goto('/');
    await page.locator('.comment-edit-button').click();
    await page.locator('.comment-textarea').fill('Notes on game A');

    // The new game opens on its root too, node 0 like the one being edited.
    await page.locator('.quick-new-button').click();
    await expect(page.locator('.comment-textarea')).toHaveCount(0);

    // Leaving the root used to save game A's text as game B's root comment.
    await page.locator('.shudan-vertex[data-x="3"][data-y="3"]').click();
    await page.keyboard.press('Home');
    await expect(page.locator('.comment-markdown')).toHaveCount(0);
  });

  test('undo while typing keeps the redo history and the comment', async ({ page }) => {
    await page.goto('/');
    const vertex = (x: number, y: number) =>
      page.locator(`.shudan-vertex[data-x="${x}"][data-y="${y}"]`);
    const moveNumber = page.locator('span.move-number');
    const comment = page.locator('.comment-markdown');
    await vertex(3, 3).click();
    await vertex(15, 15).click();
    await vertex(3, 15).click();
    await expect(vertex(3, 15)).toHaveClass(/shudan-sign_1/);

    // Back to the first move, and type a comment there without saving.
    await page.keyboard.press('ArrowLeft');
    await expect(moveNumber).toHaveText('Move 2');
    await page.keyboard.press('ArrowLeft');
    await expect(moveNumber).toHaveText('Move 1');
    await page.locator('.gameboard-edit-button').click();
    await page.locator('.comment-edit-button').click();
    await page.locator('.comment-textarea').fill('Black takes the corner');

    // Undo takes back the third move and returns to where it was played.
    const undo = page.locator('.edit-toolbar-button[title="Undo"]');
    const redo = page.locator('.edit-toolbar-button[title="Redo"]');
    await undo.click();
    await expect(moveNumber).toHaveText('Move 2');
    await page.keyboard.press('End');
    await expect(vertex(3, 15)).not.toHaveClass(/shudan-sign_1/);
    // Saved after the undo, the comment was a new edit that cleared Redo.
    await expect(redo).toBeEnabled();
    await page.keyboard.press('ArrowLeft');
    await expect(moveNumber).toHaveText('Move 1');
    await expect(comment).toHaveText('Black takes the corner');

    // Redo brings the move back, and the comment is in that state too.
    await redo.click();
    await expect(comment).toHaveText('Black takes the corner');
    await page.keyboard.press('End');
    await expect(vertex(3, 15)).toHaveClass(/shudan-sign_1/);
  });
});
