import type { CollectionSlug, Field } from 'payload'

import { validateUrl } from '@/utilities/validators'

/** Collection sets per CTA group — static at config time */
const groupCollections: Record<string, CollectionSlug[]> = {
  'header-navigation': ['pages', 'posts', 'domains', 'services', 'videos', 'portfolios', 'articles'],
  'footer-navigation': ['pages', 'services'],
  'hero-ctas': ['pages', 'services', 'domains'],
  'block-ctas': ['pages', 'services', 'domains'],
  'rich-text-links': ['pages', 'posts', 'domains', 'services', 'videos', 'portfolios', 'articles'],
}

const allCollections: CollectionSlug[] = ['pages', 'posts', 'domains', 'services', 'videos', 'portfolios', 'articles']

type LinkFieldsOptions = {
  /** CTA group slug — filters available collections for internal links */
  group?: string
  /** Field name prefix for namespacing (e.g., 'primary' → 'primaryLink') */
  prefix?: string
  /** Override the group field label */
  label?: string
  /** Whether the label field is required */
  labelRequired?: boolean
  /** Override the DB table/column name prefix to avoid the 63-char identifier limit */
  dbName?: string
}

/**
 * Standard link field factory with Default/Advanced tabs.
 *
 * Default tab: label, type (internal/external), document picker, URL, newTab, anchor, ariaLabel
 * Advanced tab: nofollow, noreferrer, sponsored, UTM fields
 *
 * The `group` parameter filters which collections appear in the internal link picker.
 * Without a group, all 7 routable collections are available.
 */
export const linkFields = (options?: LinkFieldsOptions): Field[] => {
  const prefix = options?.prefix ?? ''
  const group = options?.group
  const label = options?.label ?? 'Link'
  const labelRequired = options?.labelRequired ?? true

  const nameWithPrefix = (name: string) =>
    prefix ? `${prefix}${name.charAt(0).toUpperCase()}${name.slice(1)}` : name

  const collections = group && groupCollections[group]
    ? groupCollections[group]
    : allCollections

  const dbName = options?.dbName

  return [
    {
      name: nameWithPrefix('link'),
      type: 'group',
      label,
      ...(dbName ? { dbName } : {}),
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Default',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Display Text',
                  required: labelRequired,
                },
                {
                  name: 'type',
                  type: 'radio',
                  label: 'Link Type',
                  defaultValue: 'internal',
                  ...(dbName ? { enumName: `enum_${dbName}_type` } : {}),
                  options: [
                    { label: 'Internal', value: 'internal' },
                    { label: 'External', value: 'external' },
                  ],
                  admin: {
                    layout: 'horizontal',
                  },
                },
                {
                  name: 'internalDoc',
                  type: 'relationship',
                  label: 'Link to',
                  relationTo: collections,
                  admin: {
                    condition: (_data, siblingData) => siblingData?.type === 'internal',
                    description: 'Choose a page or content to link to.',
                  },
                },
                {
                  name: 'externalUrl',
                  type: 'text',
                  label: 'External URL',
                  validate: validateUrl,
                  admin: {
                    condition: (_data, siblingData) => siblingData?.type === 'external',
                    description: 'Full URL including https://',
                  },
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab',
                  defaultValue: false,
                },
                {
                  name: 'anchor',
                  type: 'text',
                  label: 'Anchor / Hash',
                  admin: {
                    description: 'Appends #section to the URL (e.g., "pricing" → /page#pricing).',
                  },
                },
                {
                  name: 'ariaLabel',
                  type: 'text',
                  label: 'Aria Label',
                  admin: {
                    description: 'Accessibility label override for screen readers.',
                  },
                },
              ],
            },
            {
              label: 'Advanced',
              fields: [
                {
                  name: 'nofollow',
                  type: 'checkbox',
                  label: 'Add rel="nofollow"',
                  defaultValue: false,
                },
                {
                  name: 'noreferrer',
                  type: 'checkbox',
                  label: 'Add rel="noreferrer"',
                  defaultValue: false,
                },
                {
                  name: 'sponsored',
                  type: 'checkbox',
                  label: 'Add rel="sponsored"',
                  defaultValue: false,
                },
                {
                  name: 'utmSource',
                  type: 'text',
                  label: 'UTM Source',
                  admin: {
                    description: 'Campaign source (e.g., "newsletter", "google").',
                  },
                },
                {
                  name: 'utmMedium',
                  type: 'text',
                  label: 'UTM Medium',
                  admin: {
                    description: 'Campaign medium (e.g., "email", "cpc").',
                  },
                },
                {
                  name: 'utmCampaign',
                  type: 'text',
                  label: 'UTM Campaign',
                  admin: {
                    description: 'Campaign name (e.g., "spring-sale").',
                  },
                },
                {
                  name: 'utmContent',
                  type: 'text',
                  label: 'UTM Content',
                  admin: {
                    description: 'Campaign content identifier for A/B testing.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]
}
