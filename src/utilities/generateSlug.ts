/**
 * Utility functions for generating slugs from titles
 * Adapted from replay-domains — enforces Latin-only slugs
 * Supports bilingual reading-time calculation (Japanese + English)
 */

import type { CollectionBeforeChangeHook, FieldHook } from 'payload'
import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

interface SerializedLexicalNodeWithChildren extends SerializedLexicalNode {
  children?: SerializedLexicalNodeWithChildren[]
  text?: string
}

// Function to detect if text contains Japanese characters
export const containsJapanese = (text: string): boolean => {
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/
  return japaneseRegex.test(text)
}

// Generate slug from title — always Latin-only
// Japanese-only titles produce empty string (admin must enter slug manually)
export const generateSlugFromTitle = (title: string): string => {
  if (!title) return ''

  return title
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove everything except lowercase letters, numbers, hyphens
    .replace(/[^a-z0-9-]/g, '')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Limit length for SEO
    .substring(0, 60)
}

// Validate slug — Latin-only: lowercase letters, numbers, hyphens
export const validateSlug = (slug: string): string | true => {
  if (!slug) return 'Slug is required'

  const pattern = /^[a-z0-9-]+$/
  if (!pattern.test(slug)) {
    return 'Slug must contain only lowercase letters, numbers, and hyphens'
  }

  if (slug.length > 80) return 'Slug must be 80 characters or less'
  if (slug.startsWith('-') || slug.endsWith('-')) return 'Slug cannot start or end with a hyphen'
  if (slug.includes('--')) return 'Slug cannot contain consecutive hyphens'

  return true
}

// Hook for auto-generating slug from title field
export const generateSlugHook = (titleFieldName: string = 'title'): FieldHook => {
  return ({ value, data }) => {
    // If slug is manually set, don't override it
    if (value) return value

    // Generate from title if available
    if (data?.[titleFieldName]) {
      return generateSlugFromTitle(data[titleFieldName] as string)
    }

    return value
  }
}

// Collection-level beforeChange hook factory for auto-calculating reading time
export const readingTimeHook = (contentField: string): CollectionBeforeChangeHook => {
  return ({ data, operation }) => {
    if ((operation === 'create' || operation === 'update') && data?.[contentField]) {
      data.readingTime = calculateReadingTime(data[contentField])
    }
    return data
  }
}

// Calculate reading time for content (works with Japanese and English)
export const calculateReadingTime = (content: SerializedEditorState): number => {
  if (!content?.root?.children) return 0

  // Extract plain text from rich text content
  const extractText = (node: SerializedLexicalNodeWithChildren): string => {
    if (node.type === 'text') {
      return node.text || ''
    }

    if (node.children) {
      return node.children.map(extractText).join('')
    }

    return ''
  }

  const rootChildren = content.root.children as SerializedLexicalNodeWithChildren[]
  const plainText = rootChildren.map(extractText).join(' ')

  if (!plainText.trim()) return 0

  const hasJapanese = containsJapanese(plainText)

  if (hasJapanese) {
    // Japanese reading time: ~400-500 characters per minute
    const charCount = plainText.length
    return Math.ceil(charCount / 450)
  } else {
    // English reading time: ~200-250 words per minute
    const wordCount = plainText.split(/\s+/).filter((word: string) => word.length > 0).length
    return Math.ceil(wordCount / 225)
  }
}
