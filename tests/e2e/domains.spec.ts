import { test, expect } from '@playwright/test'

test.describe('Domain Listing — /domains', () => {
  test('renders page heading and table container (desktop)', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/domains')

    // Page heading from DomainSettings
    const heading = page.locator('h2').first()
    await expect(heading).toBeVisible()

    // "すべてのドメイン" section heading (use role to avoid strict mode on substring)
    await expect(page.getByRole('heading', { name: 'すべてのドメイン' })).toBeVisible()

    // Domain table should be present inside the white card container
    const tableContainer = page.locator('.rounded-xl.border.border-slate-200.bg-white')
    await expect(tableContainer.first()).toBeVisible()

    expect(errors).toHaveLength(0)
  })

  test('renders page heading (mobile)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    })
    const page = await context.newPage()

    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/domains')

    const heading = page.locator('h2').first()
    await expect(heading).toBeVisible()

    expect(errors).toHaveLength(0)

    await context.close()
  })
})

test.describe('Domain Detail — /domains/boston-jp (requires seed data)', () => {
  test('renders domain name and key sections (desktop)', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    const response = await page.goto('/domains/boston-jp')

    // If page returns 404, skip — seed data not present
    if (response && response.status() === 404) {
      test.skip(true, 'Seed data not present — boston-jp not found')
      return
    }

    // Domain name should appear in the summary card
    await expect(page.getByText('boston.jp').first()).toBeVisible()

    // Back navigation
    await expect(page.getByText('ドメイン一覧に戻る')).toBeVisible()

    // Sidebar heading
    await expect(page.getByText('このドメインを取得する')).toBeVisible()

    expect(errors).toHaveLength(0)
  })

  test('renders domain name (mobile)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    })
    const page = await context.newPage()

    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    const response = await page.goto('/domains/boston-jp')

    if (response && response.status() === 404) {
      test.skip(true, 'Seed data not present — boston-jp not found')
      await context.close()
      return
    }

    // Domain name should be visible
    await expect(page.getByText('boston.jp').first()).toBeVisible()

    expect(errors).toHaveLength(0)

    await context.close()
  })
})
