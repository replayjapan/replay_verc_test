import { test, expect } from '@playwright/test'

test.describe('Styleguide — Foundation', () => {
  test('renders heading and foundation section (desktop)', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/styleguide')

    const h1 = page.locator('h1')
    await expect(h1).toContainText('Styleguide')

    await expect(page.getByText('Foundation')).toBeVisible()
    await expect(page.getByText('Brand Primary:')).toBeVisible()
    await expect(page.getByText('Brand Alt:')).toBeVisible()
    await expect(page.getByText('Language:')).toBeVisible()

    expect(errors).toHaveLength(0)
  })

  test('renders heading and foundation section (mobile)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    })
    const page = await context.newPage()

    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/styleguide')

    const h1 = page.locator('h1')
    await expect(h1).toContainText('Styleguide')

    await expect(page.getByText('Foundation')).toBeVisible()

    expect(errors).toHaveLength(0)

    await context.close()
  })
})

test.describe('Styleguide — Domains', () => {
  test('renders heading and slug strategy note (desktop)', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/styleguide/domains')

    const h1 = page.locator('h1')
    await expect(h1).toContainText('Domains')

    await expect(page.getByText('Slug strategy: latin-only, no periods')).toBeVisible()

    expect(errors).toHaveLength(0)
  })

  test('renders heading (mobile)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    })
    const page = await context.newPage()

    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/styleguide/domains')

    const h1 = page.locator('h1')
    await expect(h1).toContainText('Domains')

    expect(errors).toHaveLength(0)

    await context.close()
  })
})
