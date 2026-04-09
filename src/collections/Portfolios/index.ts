import type { CollectionConfig } from 'payload'

import {
  MetaImageField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { defaultLexical } from '../../fields/defaultLexical'
import { searchTabFields } from '../../fields/searchFields'
import { generateSlugHook, validateSlug, readingTimeHook } from '../../utilities/generateSlug'
import { validateUrl } from '../../utilities/validators'
import { revalidatePortfolio, revalidateDeletePortfolio } from './hooks/revalidatePortfolio'

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', '_status', 'createdAt'],
    group: 'Portfolio',
    description: 'Portfolio project showcases',
  },
  defaultSort: '-createdAt',
  hooks: {
    afterChange: [revalidatePortfolio],
    afterDelete: [revalidateDeletePortfolio],
    beforeChange: [readingTimeHook('description')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [generateSlugHook('title')],
      },
      validate: (val: string | null | undefined) => validateSlug(val as string),
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'client',
              type: 'text',
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Brief project summary for grid displays (1-2 sentences)',
              },
            },
            {
              name: 'description',
              type: 'richText',
              editor: defaultLexical,
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'gallery',
              type: 'array',
              admin: {
                description: 'Additional project images with optional captions',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
            {
              name: 'technologies',
              type: 'array',
              admin: {
                description: 'Technologies, tools, or skills used in this project',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'projectUrl',
              type: 'text',
              admin: {
                description: 'Link to the live project (optional)',
              },
              validate: validateUrl,
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'portfolio-categories',
              hasMany: true,
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
      name: 'readingTime',
      type: 'number',
      admin: {
        description: 'Estimated reading time in minutes (auto-calculated)',
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

export default Portfolios
