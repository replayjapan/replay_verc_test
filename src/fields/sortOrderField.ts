import type { NumberField } from 'payload'

/**
 * Reusable sort order field for any collection that needs admin-controlled display order.
 * Lower numbers appear first. Items without a sort order appear last.
 *
 * Usage:
 *   import { sortOrderField } from '@/fields/sortOrderField'
 *   fields: [sortOrderField, ...]
 *
 * Query:
 *   sort: 'sortOrder'
 */
export const sortOrderField: NumberField = {
  name: 'sortOrder',
  type: 'number',
  defaultValue: 0,
  admin: {
    position: 'sidebar',
    description: 'Display order (lower = first). Default: 0.',
  },
  index: true,
}
