import type { CollectionConfig } from 'payload'

import {
  MetaImageField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { defaultLexical } from '@/fields/defaultLexical'

import { searchTabFields } from '../../fields/searchFields'
import { generateDomainSlug } from './hooks/generateDomainSlug'
import { revalidateDomains, revalidateDeleteDomains } from './hooks/revalidateDomains'

export const Domains: CollectionConfig = {
  slug: 'domains',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['domainName', 'slug', 'featured', 'domainStatus', 'minimumOffer', 'updatedAt'],
    group: 'Domain Portfolio',
    useAsTitle: 'domainName',
  },
  hooks: {
    beforeChange: [generateDomainSlug],
    afterChange: [revalidateDomains],
    afterDelete: [revalidateDeleteDomains],
  },
  fields: [
    {
      name: 'domainName',
      type: 'text',
      required: true,
      admin: {
        description: 'Full domain name including extension (example.com or ボストン.jp).',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional featured image displayed across listings and detail pages.',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Short pitch shown on cards, tables, and detail hero.',
              },
            },
            {
              name: 'richSummaryTitle',
              type: 'text',
              defaultValue: 'このドメインについて',
              admin: {
                description: 'Headline for the rich summary section on the detail page.',
              },
            },
            {
              name: 'richSummaryIntro',
              type: 'richText',
              editor: defaultLexical,
              admin: {
                description: 'Rich introductory paragraph for the summary section.',
              },
            },
            {
              name: 'richSummaryBullets',
              type: 'array',
              maxRows: 4,
              labels: {
                plural: 'Rich Summary Bullets',
                singular: 'Bullet',
              },
              admin: {
                description: 'Bullet points displayed in the rich summary section (defaults to global settings if empty).',
              },
              fields: [
                {
                  name: 'bullet',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'useCasesTitle',
              type: 'text',
              defaultValue: 'このドメインの活用シーン',
              admin: {
                description: 'Headline for the use cases section on the detail page.',
              },
            },
            {
              name: 'useCasesSummary',
              type: 'richText',
              editor: defaultLexical,
              admin: {
                description: 'Rich introductory paragraph for the use cases section.',
              },
            },
            {
              name: 'useCases',
              type: 'array',
              maxRows: 4,
              labels: {
                plural: 'Use Cases',
                singular: 'Use Case',
              },
              admin: {
                description: 'Use case items for the detail page (defaults to global settings if empty).',
              },
              fields: [
                {
                  name: 'useCase',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'domain-category',
            },
            {
              name: 'domainASCII',
              type: 'text',
              admin: {
                description:
                  'ASCII/punycode form of the domain (e.g. boston.jp or xn--eckwd4c7c.jp). Auto-filled from domain name if empty.',
              },
            },
            {
              name: 'domainUnicode',
              type: 'text',
              admin: {
                description:
                  'Unicode display form for IDN domains (e.g. ボストン.jp). Leave empty for ASCII-only domains.',
              },
            },
            {
              name: 'extension',
              type: 'text',
              admin: {
                description: 'Domain extension without leading period (auto-filled from domain name).',
              },
              hooks: {
                beforeValidate: [
                  ({ data, value }) => {
                    if (value || !data?.domainName) {
                      return value
                    }

                    const parts = (data.domainName as string).split('.')

                    if (parts.length < 2) {
                      return value
                    }

                    const extension = parts[parts.length - 1]

                    return extension
                  },
                ],
              },
            },
            {
              name: 'domainScript',
              type: 'select',
              defaultValue: 'latin',
              options: [
                { label: 'Latin', value: 'latin' },
                { label: 'Japanese', value: 'japanese' },
              ],
              admin: {
                description: 'Script used in the domain name — affects display formatting.',
              },
            },
            {
              name: 'domainStatus',
              label: 'Status',
              type: 'select',
              required: true,
              defaultValue: 'open',
              options: [
                { label: '受付中 (Open)', value: 'open' },
                { label: '非公開 (Not Available)', value: 'not_available' },
                { label: '売却済 (Sold)', value: 'sold' },
                { label: '保留中 (Pending)', value: 'pending' },
              ],
            },
            {
              name: 'minimumOffer',
              type: 'number',
              required: true,
              admin: {
                description: 'Minimum acceptable offer used in pricing displays and inquiry forms.',
              },
            },
            {
              name: 'registrationDate',
              type: 'date',
              defaultValue: () => new Date().toISOString(),
              admin: {
                description: 'Registration date displayed on detail views and used to calculate age.',
                date: {
                  pickerAppearance: 'dayOnly',
                  displayFormat: 'MMM d, yyyy',
                },
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Include this domain in featured carousels and hero sections.',
              },
            },
          ],
        },
        {
          label: 'Search',
          fields: searchTabFields,
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            {
              name: 'title',
              type: 'text',
              label: 'Meta Title',
              admin: {
                description: 'SEO meta title with Japanese character counting.',
                components: {
                  Field: '@/components/CustomSeoFieldVariants#CustomSeoTitleField',
                },
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Meta Description',
              admin: {
                description: 'SEO meta description with Japanese character counting.',
                components: {
                  Field: '@/components/CustomSeoFieldVariants#CustomSeoDescriptionField',
                },
              },
            },
            MetaImageField({
              relationTo: 'media',
            }),
            {
              name: 'ogTitle',
              type: 'text',
              label: 'Open Graph Title',
              admin: {
                description: 'OG title for social sharing with Japanese character counting.',
                components: {
                  Field: '@/components/CustomSeoFieldVariants#CustomSeoOgTitleField',
                },
              },
            },
            {
              name: 'ogDescription',
              type: 'textarea',
              label: 'Open Graph Description',
              admin: {
                description: 'OG description for social sharing with Japanese character counting.',
                components: {
                  Field: '@/components/CustomSeoFieldVariants#CustomSeoOgDescriptionField',
                },
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Open Graph Image',
              admin: {
                description: 'Image for social sharing. Recommended size: 1200x630px.',
              },
            },
            {
              name: 'noIndex',
              type: 'checkbox',
              label: 'No Index',
              defaultValue: false,
              admin: {
                description: 'When checked, this page will have a noindex meta tag and be excluded from sitemaps.',
              },
            },
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData?._status === 'published' && !value) {
              return new Date()
            }

            return value
          },
        ],
      },
    },
    {
      name: 'slugOverride',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional manual slug override (still normalized to latin-only, no periods).',
      },
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-generated latin-only slug. Use slugOverride to customize.',
      },
    },
    {
      name: 'slugLock',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        hidden: true,
        position: 'sidebar',
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

export default Domains
