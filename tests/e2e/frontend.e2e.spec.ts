import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('/')

    // Page title comes from generateMeta fallback — accept either branded or default.
    await expect(page).toHaveTitle(/.+/)

    const heading = page.locator('h1').first()

    await expect(heading).toHaveText('デジタル資産を、戦略的に。')
  })
})
