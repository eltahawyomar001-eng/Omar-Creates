import { test, expect } from '@playwright/test'

test.describe('Waitlist Flow', () => {
  test('should open waitlist dialog, submit email, and show success toast', async ({ page }) => {
    // Visit home page
    await page.goto('/')

    // Wait for page to load
    await expect(page.locator('h1')).toBeVisible()

    // Find and click the "Join Waitlist" button
    const joinButton = page.getByRole('button', { name: /join.*waitlist/i })
    await expect(joinButton).toBeVisible()
    await joinButton.click()

    // Verify dialog opened
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // Fill in email (use a unique test email)
    const emailInput = dialog.getByRole('textbox', { name: /email/i })
    const testEmail = `test-${Date.now()}@example.com`
    await emailInput.fill(testEmail)

    // Submit the form
    const submitButton = dialog.getByRole('button', { name: /join.*waitlist/i })
    await submitButton.click()

    // Wait for success toast
    const successToast = page.locator('text=/thanks for joining/i')
    await expect(successToast).toBeVisible({ timeout: 5000 })

    // Verify dialog closed
    await expect(dialog).not.toBeVisible()
  })
})
