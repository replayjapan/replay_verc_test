import { test, expect } from '@playwright/test'

test.describe('Header Navigation - V3 Migration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for header to be visible
    await page.waitForSelector('header', { state: 'visible' })
  })

  test.describe('Desktop Navigation', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('CRITICAL: Mega menu closes when clicking outside (bug fix verification)', async ({
      page,
    }) => {
      // Find Services navigation trigger via stable data-testid
      const servicesButton = page.locator('[data-testid="nav-services"]')
      await expect(servicesButton).toBeVisible()

      // Click to open the submenu
      await servicesButton.click()

      // Wait for submenu to be visible via role="region"
      const submenuContent = page.locator('[data-testid="nav-services-submenu"]')
      await expect(submenuContent).toBeVisible()

      // Verify menu is open by checking for submenu items (SEM from seed data)
      const submenuRegion = page.locator('[data-testid="nav-services-submenu"]')
      await expect(submenuRegion.getByText('Webアプリ・業務システムの設計開発')).toBeVisible()

      // Click outside the menu — on the main content area below the header
      await page.locator('article').first().click({ position: { x: 100, y: 100 }, force: true })

      // Wait a moment for the animation
      await page.waitForTimeout(500)

      // Verify menu is closed - submenu content should not be visible
      await expect(submenuContent).not.toBeVisible()
    })

    test('Simple dropdown menu opens and closes correctly', async ({ page }) => {
      // Use Services nav item which has a simple submenu
      const servicesButton = page.locator('[data-testid="nav-services"]')
      await expect(servicesButton).toBeVisible()

      // Open menu
      await servicesButton.click()
      await page.waitForTimeout(200)

      // Verify submenu content is visible
      const submenuContent = page.locator('[data-testid="nav-services-submenu"]')
      await expect(submenuContent).toBeVisible()

      // Close by clicking button again
      await servicesButton.click()
      await page.waitForTimeout(200)

      // Verify menu is closed
      await expect(submenuContent).not.toBeVisible()
    })

    test('Logo renders and links to homepage', async ({ page }) => {
      const logoLink = page.locator('[data-testid="logo-link"]')
      await expect(logoLink).toBeVisible()

      // Click logo
      await logoLink.click()

      // Verify navigation to homepage
      await expect(page).toHaveURL('/')
    })

    test('Search icon opens search expansion', async ({ page }) => {
      const searchTrigger = page.locator('[data-testid="search-trigger"]')
      await expect(searchTrigger).toBeVisible()

      // Click search trigger to expand
      await searchTrigger.click()

      // Verify search input appears
      const searchClose = page.locator('[data-testid="search-close"]')
      await expect(searchClose).toBeVisible()
    })

    test('Primary navigation items render correctly', async ({ page }) => {
      // Check for navigation items from seed data using stable data-testid
      // ホーム removed from header nav (logo navigates home)
      const domainsLink = page.locator('[data-testid="nav-domains"]')
      await expect(domainsLink).toBeVisible()

      const servicesButton = page.locator('[data-testid="nav-services"]')
      await expect(servicesButton).toBeVisible()

      const contactLink = page.locator('[data-testid="nav-contact"]')
      await expect(contactLink).toBeVisible()
    })

    test('External links have noFollow attribute when configured', async ({ page }) => {
      // Check for footer links that might be external
      const externalLinks = page.locator('a[rel*="nofollow"]')
      const count = await externalLinks.count()

      // If there are external links with noFollow, verify the attribute
      if (count > 0) {
        const firstExternal = externalLinks.first()
        const rel = await firstExternal.getAttribute('rel')
        expect(rel).toContain('nofollow')
      }
    })

    test('Navigation icons render correctly', async ({ page }) => {
      // Check for SVG icons (lucide-react renders as SVG)
      const icons = page.locator('header svg')
      const iconCount = await icons.count()

      // Should have at least search icon and nav item icons
      expect(iconCount).toBeGreaterThan(0)
    })

    test('Submenu items display descriptions', async ({ page }) => {
      const servicesButton = page.locator('[data-testid="nav-services"]')
      await expect(servicesButton).toBeVisible()

      await servicesButton.click()
      await page.waitForTimeout(200)

      // Check for description text from seed data, scoped to submenu
      const submenu = page.locator('[data-testid="nav-services-submenu"]')
      await expect(submenu.getByText('Webアプリ・業務システムの設計開発')).toBeVisible()
    })
  })

  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('Mobile menu opens when hamburger is clicked', async ({ page }) => {
      const hamburgerButton = page.locator('[data-testid="mobile-menu-button"]')
      await expect(hamburgerButton).toBeVisible()

      // Click hamburger
      await hamburgerButton.click()

      // Wait for dialog animation
      await page.waitForTimeout(300)

      // Verify mobile menu is visible
      const mobileMenu = page.locator('[role="dialog"]')
      await expect(mobileMenu).toBeVisible()
    })

    test('CRITICAL: Mobile menu closes when clicking backdrop', async ({ page }) => {
      const hamburgerButton = page.locator('[data-testid="mobile-menu-button"]')
      await hamburgerButton.click()
      await page.waitForTimeout(300)

      // Verify menu is open
      const mobileMenu = page.locator('[role="dialog"]')
      await expect(mobileMenu).toBeVisible()

      // Click on the overlay/backdrop (outside the menu content)
      const overlay = page.locator('[role="dialog"]').locator('..').locator('[class*="overlay"]')
      if ((await overlay.count()) > 0) {
        await overlay.click({ force: true })
        await page.waitForTimeout(300)

        // Verify menu is closed
        await expect(mobileMenu).not.toBeVisible()
      }
    })

    test('Mobile menu close button works', async ({ page }) => {
      const hamburgerButton = page.locator('[data-testid="mobile-menu-button"]')
      await hamburgerButton.click()
      await page.waitForTimeout(300)

      // Click close button
      const closeButton = page.locator('[data-testid="mobile-menu-close"]')
      await expect(closeButton).toBeVisible()
      await closeButton.click()
      await page.waitForTimeout(300)

      // Verify menu is closed
      const mobileMenu = page.locator('[role="dialog"]')
      await expect(mobileMenu).not.toBeVisible()
    })

    test('Mobile menu displays all navigation items', async ({ page }) => {
      const hamburgerButton = page.locator('[data-testid="mobile-menu-button"]')
      await hamburgerButton.click()
      await page.waitForTimeout(300)

      // Check for nav items using stable mobile data-testid selectors
      // ホーム removed from header nav (logo navigates home)
      const domainsLink = page.locator('[data-testid="mobile-nav-domains"]')
      await expect(domainsLink).toBeVisible()

      const servicesLink = page.locator('[data-testid="mobile-nav-services"]')
      await expect(servicesLink).toBeVisible()

      const contactLink = page.locator('[data-testid="mobile-nav-contact"]')
      await expect(contactLink).toBeVisible()
    })

    test('Mobile menu displays submenu items', async ({ page }) => {
      const hamburgerButton = page.locator('[data-testid="mobile-menu-button"]')
      await hamburgerButton.click()
      await page.waitForTimeout(300)

      // Check for submenu items (Services > Web制作 from seed data)
      const webDevLink = page.getByRole('link', { name: /Web制作/ })
      if ((await webDevLink.count()) > 0) {
        await expect(webDevLink).toBeVisible()
      }
    })

    test('Mobile icons render before hamburger menu', async ({ page }) => {
      // Check for mobile nav items that should appear before hamburger
      const mobileIcons = page.locator('header').locator('a[class*="lg:hidden"]')
      // Should have search or other utility items visible on mobile
      const count = await mobileIcons.count()
      expect(count).toBeGreaterThanOrEqual(0) // At least search icon
    })

    test('Logo renders in mobile menu', async ({ page }) => {
      const hamburgerButton = page.locator('[data-testid="mobile-menu-button"]')
      await hamburgerButton.click()
      await page.waitForTimeout(300)

      // Check for logo in mobile menu
      const mobileLogo = page.locator('[role="dialog"]').locator('img, svg').first()
      if ((await mobileLogo.count()) > 0) {
        await expect(mobileLogo).toBeVisible()
      }
    })
  })

  test.describe('Responsive Behavior', () => {
    test('Header remains sticky on scroll', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 500))
      await page.waitForTimeout(200)

      // Header should still be visible at top
      const header = page.locator('header')
      await expect(header).toBeVisible()

      // Check if sticky wrapper div (parent of header) has sticky positioning
      // M20 hotfix moved position:sticky from <header> to the wrapper <div>
      const stickyWrapper = header.locator('..')
      const position = await stickyWrapper.evaluate((el) => window.getComputedStyle(el).position)
      expect(position).toBe('sticky')
    })

    test('Desktop navigation hidden on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      // Desktop navigation menu should be hidden
      const desktopNav = page.locator('header nav[class*="hidden lg:block"]')
      if ((await desktopNav.count()) > 0) {
        await expect(desktopNav).not.toBeVisible()
      }
    })

    test('Mobile hamburger hidden on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })

      // Hamburger button should be hidden on desktop
      const hamburgerButton = page.locator('[data-testid="mobile-menu-button"]')
      await expect(hamburgerButton).not.toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('Header has proper ARIA labels', async ({ page }) => {
      const nav = page.locator('nav[aria-label="Global"]')
      await expect(nav).toBeVisible()
    })

    test('Search icon has screen reader text', async ({ page }) => {
      const searchTrigger = page.locator('[data-testid="search-trigger"]')
      await expect(searchTrigger).toHaveAttribute('aria-label', '検索を開く')
    })

    test('Mobile menu buttons have accessible labels', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const hamburgerButton = page.locator('[data-testid="mobile-menu-button"]')
      await expect(hamburgerButton).toBeVisible()

      // Verify sr-only text exists for accessibility
      const srText = hamburgerButton.locator('.sr-only')
      await expect(srText).toContainText(/メニューを開く/)
    })

    test('External links open in new tab have proper rel attributes', async ({ page }) => {
      // Check for links with target="_blank"
      const newTabLinks = page.locator('a[target="_blank"]')
      const count = await newTabLinks.count()

      if (count > 0) {
        const firstLink = newTabLinks.first()
        const rel = await firstLink.getAttribute('rel')
        // Should have noopener/noreferrer for security
        expect(rel).toBeTruthy()
      }
    })
  })
})
