import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

/**
 * Integration tests for sitemap infrastructure.
 * Validates the generated static files (sitemap.xml, robots.txt)
 * and the route handler source files for correctness.
 */

const publicDir = path.resolve(process.cwd(), 'public')
const sitemapsDir = path.resolve(
  process.cwd(),
  'src/app/(frontend)/(sitemaps)',
)

describe('Sitemap Infrastructure', () => {
  describe('Generated sitemap.xml (static index)', () => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml')

    it('sitemap.xml exists in public/', () => {
      expect(fs.existsSync(sitemapPath)).toBe(true)
    })

    it('references pages-sitemap.xml', () => {
      const content = fs.readFileSync(sitemapPath, 'utf-8')
      expect(content).toContain('pages-sitemap.xml')
    })

    it('references posts-sitemap.xml', () => {
      const content = fs.readFileSync(sitemapPath, 'utf-8')
      expect(content).toContain('posts-sitemap.xml')
    })

    it('references domains-sitemap.xml', () => {
      const content = fs.readFileSync(sitemapPath, 'utf-8')
      expect(content).toContain('domains-sitemap.xml')
    })

    it('does not reference stale or dev sitemaps', () => {
      const content = fs.readFileSync(sitemapPath, 'utf-8')
      expect(content).not.toContain('styleguide')
      expect(content).not.toContain('admin')
    })
  })

  describe('Generated robots.txt', () => {
    const robotsPath = path.join(publicDir, 'robots.txt')

    it('robots.txt exists in public/', () => {
      expect(fs.existsSync(robotsPath)).toBe(true)
    })

    it('disallows /admin/*', () => {
      const content = fs.readFileSync(robotsPath, 'utf-8')
      expect(content).toContain('Disallow: /admin/*')
    })

    it('disallows /api/*', () => {
      const content = fs.readFileSync(robotsPath, 'utf-8')
      expect(content).toContain('Disallow: /api/*')
    })

    it('disallows /next/*', () => {
      const content = fs.readFileSync(robotsPath, 'utf-8')
      expect(content).toContain('Disallow: /next/*')
    })

    it('disallows /styleguide/*', () => {
      const content = fs.readFileSync(robotsPath, 'utf-8')
      expect(content).toContain('Disallow: /styleguide/*')
    })

    it('references all three collection sitemaps', () => {
      const content = fs.readFileSync(robotsPath, 'utf-8')
      expect(content).toContain('pages-sitemap.xml')
      expect(content).toContain('posts-sitemap.xml')
      expect(content).toContain('domains-sitemap.xml')
    })
  })

  describe('Sitemap route handler source files', () => {
    it('domains-sitemap.xml route handler exists', () => {
      const routePath = path.join(
        sitemapsDir,
        'domains-sitemap.xml',
        'route.ts',
      )
      expect(fs.existsSync(routePath)).toBe(true)
    })

    it('pages-sitemap.xml route handler exists', () => {
      const routePath = path.join(
        sitemapsDir,
        'pages-sitemap.xml',
        'route.ts',
      )
      expect(fs.existsSync(routePath)).toBe(true)
    })

    it('posts-sitemap.xml route handler exists', () => {
      const routePath = path.join(
        sitemapsDir,
        'posts-sitemap.xml',
        'route.ts',
      )
      expect(fs.existsSync(routePath)).toBe(true)
    })

    it('domains route handler filters out not_available domains', () => {
      const routePath = path.join(
        sitemapsDir,
        'domains-sitemap.xml',
        'route.ts',
      )
      const content = fs.readFileSync(routePath, 'utf-8')
      expect(content).toContain("not_equals: 'not_available'")
    })

    it('domains route handler uses unstable_cache with domains-sitemap tag', () => {
      const routePath = path.join(
        sitemapsDir,
        'domains-sitemap.xml',
        'route.ts',
      )
      const content = fs.readFileSync(routePath, 'utf-8')
      expect(content).toContain("tags: ['domains-sitemap']")
    })

    it('domains route handler sets correct priority and changefreq', () => {
      const routePath = path.join(
        sitemapsDir,
        'domains-sitemap.xml',
        'route.ts',
      )
      const content = fs.readFileSync(routePath, 'utf-8')
      expect(content).toContain("changefreq: 'weekly'")
      expect(content).toContain('priority: 0.7')
    })

    it('pages route handler includes homepage with priority 1.0', () => {
      const routePath = path.join(
        sitemapsDir,
        'pages-sitemap.xml',
        'route.ts',
      )
      const content = fs.readFileSync(routePath, 'utf-8')
      expect(content).toContain('priority: 1.0')
    })

    it('pages route handler includes /domains listing page', () => {
      const routePath = path.join(
        sitemapsDir,
        'pages-sitemap.xml',
        'route.ts',
      )
      const content = fs.readFileSync(routePath, 'utf-8')
      expect(content).toContain('/domains')
      expect(content).toContain('priority: 0.8')
    })

    it('pages route handler includes /posts listing page', () => {
      const routePath = path.join(
        sitemapsDir,
        'pages-sitemap.xml',
        'route.ts',
      )
      const content = fs.readFileSync(routePath, 'utf-8')
      expect(content).toContain('/posts')
    })

    it('no route handler imports from @payloadcms directly (uses payload)', () => {
      const handlers = ['domains-sitemap.xml', 'pages-sitemap.xml', 'posts-sitemap.xml']
      for (const handler of handlers) {
        const routePath = path.join(sitemapsDir, handler, 'route.ts')
        const content = fs.readFileSync(routePath, 'utf-8')
        expect(content).not.toContain('@payloadcms/')
      }
    })
  })

  describe('next-sitemap.config.cjs', () => {
    const configPath = path.resolve(process.cwd(), 'next-sitemap.config.cjs')

    it('config file exists', () => {
      expect(fs.existsSync(configPath)).toBe(true)
    })

    it('excludes dev routes from sitemap', () => {
      const content = fs.readFileSync(configPath, 'utf-8')
      expect(content).toContain('/admin/*')
      expect(content).toContain('/next/*')
      expect(content).toContain('/styleguide/*')
      expect(content).toContain('/api/*')
    })

    it('lists all three collection sitemaps in additionalSitemaps', () => {
      const content = fs.readFileSync(configPath, 'utf-8')
      expect(content).toContain('pages-sitemap.xml')
      expect(content).toContain('posts-sitemap.xml')
      expect(content).toContain('domains-sitemap.xml')
    })
  })
})
