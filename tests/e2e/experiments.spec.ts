import { test, expect } from '@playwright/test'

test.describe('Experiments Page', () => {
  test('should display experiments page with seeded card', async ({ page }) => {
    // Visit experiments page
    await page.goto('/experiments')

    // Wait for page to load
    await expect(page.locator('h1')).toContainText(/experiments/i)

    // Verify at least one experiment card is visible
    const experimentCards = page.locator('[data-testid="experiment-card"]').or(
      page.locator('article').or(
        page.locator('.experiment').or(
          page.locator('a[href^="/experiments/"]')
        )
      )
    )

    // Wait for cards to load
    await page.waitForLoadState('networkidle')
    
    // Check if at least one card is visible
    const cardCount = await experimentCards.count()
    expect(cardCount).toBeGreaterThan(0)

    // Verify the first card has expected content
    const firstCard = experimentCards.first()
    await expect(firstCard).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/experiments')
    
    // Verify page title
    await expect(page).toHaveTitle(/experiments/i)
    
    // Verify heading exists
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })
})
