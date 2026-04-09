import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback]

      if (typeof fallbackData === 'string' && fallbackData.length > 0) {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
