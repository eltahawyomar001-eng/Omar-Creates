import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('home page should have no critical a11y violations', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    // Filter for critical and serious violations only
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )

    expect(criticalViolations).toEqual([])
  })

  test('experiments page should have no critical a11y violations', async ({ page }) => {
    await page.goto('/experiments')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )

    expect(criticalViolations).toEqual([])
  })

  test('waitlist dialog should have no critical a11y violations', async ({ page }) => {
    await page.goto('/')
    
    // Open waitlist dialog
    const joinButton = page.getByRole('button', { name: /join.*waitlist/i })
    await joinButton.click()
    
    // Wait for dialog to be visible
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )

    expect(criticalViolations).toEqual([])
  })

  test('contact sheet should have no critical a11y violations', async ({ page }) => {
    await page.goto('/')
    
    // Open contact sheet
    const contactButton = page.getByRole('button', { name: /contact/i })
    if (await contactButton.isVisible()) {
      await contactButton.click()
      
      // Wait for sheet to be visible
      await page.waitForTimeout(500) // Wait for animation

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      const criticalViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(criticalViolations).toEqual([])
    }
  })
})
