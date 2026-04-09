import type { Field } from 'payload'
import { countJapaneseCharacters } from '@/utilities/japaneseCharacterCount'

/**
 * Custom SEO Meta Title field with Japanese character counting
 */
export const seoMetaTitleField = (limit: number = 60): Field => ({
  name: 'metaTitle',
  type: 'text',
  label: 'Meta Title',
  admin: {
    description: `SEO meta title. Limit: ${limit} characters (full-width = 2).`,
  },
  validate: (value: string | null | undefined) => {
    if (!value || typeof value !== 'string') return true

    const count = countJapaneseCharacters(value)
    if (count > limit) {
      return `Meta title is ${count} characters (${count - limit} over limit of ${limit})`
    }

    return true
  },
})

/**
 * Custom SEO Meta Description field with Japanese character counting
 */
export const seoMetaDescriptionField = (limit: number = 160): Field => ({
  name: 'metaDescription',
  type: 'textarea',
  label: 'Meta Description',
  admin: {
    description: `SEO meta description. Limit: ${limit} characters (full-width = 2).`,
  },
  validate: (value: string | null | undefined) => {
    if (!value || typeof value !== 'string') return true

    const count = countJapaneseCharacters(value)
    if (count > limit) {
      return `Meta description is ${count} characters (${count - limit} over limit of ${limit})`
    }

    return true
  },
})

/**
 * Custom Open Graph Title field with Japanese character counting
 */
export const seoOgTitleField = (limit: number = 60): Field => ({
  name: 'ogTitle',
  type: 'text',
  label: 'Open Graph Title',
  admin: {
    description: `OG title for social sharing. Limit: ${limit} characters (full-width = 2).`,
  },
  validate: (value: string | null | undefined) => {
    if (!value || typeof value !== 'string') return true

    const count = countJapaneseCharacters(value)
    if (count > limit) {
      return `Open Graph title is ${count} characters (${count - limit} over limit of ${limit})`
    }

    return true
  },
})

/**
 * Custom Open Graph Description field with Japanese character counting
 */
export const seoOgDescriptionField = (limit: number = 160): Field => ({
  name: 'ogDescription',
  type: 'textarea',
  label: 'Open Graph Description',
  admin: {
    description: `OG description for social sharing. Limit: ${limit} characters (full-width = 2).`,
  },
  validate: (value: string | null | undefined) => {
    if (!value || typeof value !== 'string') return true

    const count = countJapaneseCharacters(value)
    if (count > limit) {
      return `Open Graph description is ${count} characters (${count - limit} over limit of ${limit})`
    }

    return true
  },
})

/**
 * Complete SEO fields group with Japanese character counting
 */
export const seoFieldsGroup = (
  options: {
    metaTitleLimit?: number
    metaDescriptionLimit?: number
    ogTitleLimit?: number
    ogDescriptionLimit?: number
  } = {},
): Field => ({
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    seoMetaTitleField(options.metaTitleLimit ?? 60),
    seoMetaDescriptionField(options.metaDescriptionLimit ?? 160),
    seoOgTitleField(options.ogTitleLimit ?? 60),
    seoOgDescriptionField(options.ogDescriptionLimit ?? 160),
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph Image',
      admin: {
        description: 'Image for social sharing. Recommended size: 1200x630px.',
      },
    },
  ],
})
