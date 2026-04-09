import type { Field } from 'payload'
import { countJapaneseCharacters } from '../utilities/japaneseCharacterCount'

/**
 * Search tab fields factory.
 * Returns an unnamed tab with searchExcerpt (textarea, 80 double-byte char limit)
 * and searchKeywords (text, comma-separated).
 *
 * Usage: Add to any collection's tabs array (before the SEO tab).
 */
export const searchTabFields: Field[] = [
  {
    name: 'searchExcerpt',
    type: 'textarea',
    admin: {
      description: 'Used by internal search — 80文字以内 (80 double-byte chars max)',
    },
    validate: (val: string | null | undefined) => {
      if (!val) return true
      const count = countJapaneseCharacters(val)
      if (count > 160) {
        return `Search excerpt is ${count} characters (max 160 half-width / 80 full-width).`
      }
      return true
    },
  },
  {
    name: 'searchKeywords',
    type: 'text',
    admin: {
      description: 'Internal search only — not visible on frontend. Comma-separated (、 or , accepted).',
    },
  },
]
