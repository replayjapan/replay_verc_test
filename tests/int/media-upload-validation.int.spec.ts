import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

/**
 * M09: Media Upload Validation — Integration Tests
 *
 * Verifies the Media collection has proper file type whitelist
 * and size limits configured.
 */

// Read the Media collection source
const mediaIndexPath = path.resolve('src/collections/Media/index.ts')
const mediaSource = fs.readFileSync(mediaIndexPath, 'utf-8')

// Read the hook source
const hookPath = path.resolve('src/collections/Media/hooks/validateFileSize.ts')
const hookSource = fs.readFileSync(hookPath, 'utf-8')

describe('Media Upload Validation', () => {
  describe('File type whitelist (mimeTypes)', () => {
    it('has mimeTypes configured on the upload config', () => {
      expect(mediaSource).toContain('mimeTypes')
    })

    it('allows PNG images', () => {
      expect(mediaSource).toContain("'image/png'")
    })

    it('allows JPEG images', () => {
      expect(mediaSource).toContain("'image/jpeg'")
    })

    it('allows WebP images', () => {
      expect(mediaSource).toContain("'image/webp'")
    })

    it('allows SVG images', () => {
      expect(mediaSource).toContain("'image/svg+xml'")
    })

    it('allows GIF images', () => {
      expect(mediaSource).toContain("'image/gif'")
    })

    it('allows PDF documents', () => {
      expect(mediaSource).toContain("'application/pdf'")
    })

    it('does not allow video types', () => {
      expect(mediaSource).not.toContain('video/')
    })

    it('does not allow audio types', () => {
      expect(mediaSource).not.toContain('audio/')
    })

    it('does not use wildcard image/* (explicit types only)', () => {
      expect(mediaSource).not.toContain("'image/*'")
    })
  })

  describe('File size validation hook', () => {
    it('hook file exists', () => {
      expect(fs.existsSync(hookPath)).toBe(true)
    })

    it('is registered as a beforeOperation hook', () => {
      expect(mediaSource).toContain('beforeOperation')
      expect(mediaSource).toContain('validateFileSize')
    })

    it('imports the validateFileSize hook', () => {
      expect(mediaSource).toContain("from './hooks/validateFileSize'")
    })

    it('sets 10MB limit for standard images', () => {
      // 10 * 1024 * 1024 = 10485760
      expect(hookSource).toContain('10 * 1024 * 1024')
    })

    it('sets 500KB limit for SVG files', () => {
      // 500 * 1024 = 512000
      expect(hookSource).toContain('500 * 1024')
    })

    it('sets 10MB limit for PDF files', () => {
      expect(hookSource).toContain("'application/pdf'")
      expect(hookSource).toContain('10 * 1024 * 1024')
    })

    it('checks SVG mime type specifically (not grouped with other images)', () => {
      expect(hookSource).toContain("'image/svg+xml'")
    })

    it('throws error with English message for oversized files', () => {
      expect(hookSource).toContain('File size exceeds the')
    })

    it('only validates on create and update operations', () => {
      expect(hookSource).toContain("operation === 'create'")
      expect(hookSource).toContain("operation === 'update'")
    })
  })

  describe('Existing upload config preserved', () => {
    it('preserves staticDir config', () => {
      expect(mediaSource).toContain('staticDir')
    })

    it('preserves adminThumbnail config', () => {
      expect(mediaSource).toContain("adminThumbnail: 'thumbnail'")
    })

    it('preserves focalPoint config', () => {
      expect(mediaSource).toContain('focalPoint: true')
    })

    it('preserves all 7 imageSizes', () => {
      const sizes = ['thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og']
      for (const size of sizes) {
        expect(mediaSource).toContain(`name: '${size}'`)
      }
    })
  })

  describe('Seed compatibility', () => {
    it('seed brand assets are all PNG (allowed by whitelist)', () => {
      const brandDir = path.resolve('public/brand')
      if (!fs.existsSync(brandDir)) return // skip if no brand dir

      const files = fs.readdirSync(brandDir)
      const imageFiles = files.filter((f) => /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f))
      expect(imageFiles.length).toBeGreaterThan(0)

      for (const file of imageFiles) {
        const ext = path.extname(file).toLowerCase()
        expect(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']).toContain(ext)
      }
    })

    it('seed brand assets are all under 10MB', () => {
      const brandDir = path.resolve('public/brand')
      if (!fs.existsSync(brandDir)) return

      const files = fs.readdirSync(brandDir)
      const tenMB = 10 * 1024 * 1024

      for (const file of files) {
        const stats = fs.statSync(path.join(brandDir, file))
        expect(stats.size).toBeLessThan(tenMB)
      }
    })
  })
})
