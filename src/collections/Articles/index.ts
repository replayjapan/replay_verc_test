import type { CollectionConfig } from 'payload'

import {
  MetaImageField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { searchTabFields } from '../../fields/searchFields'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generateSlugHook, validateSlug, readingTimeHook } from '../../utilities/generateSlug'
import { revalidateArticle, revalidateDeleteArticle } from './hooks/revalidateArticle'

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', '_status', 'createdAt'],
    group: 'Articles',
    description: 'In-depth articles, documentation, and resources',
  },
  defaultSort: '-createdAt',
  hooks: {
    afterChange: [revalidateArticle],
    afterDelete: [revalidateDeleteArticle],
    beforeChange: [readingTimeHook('content')],
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
              name: 'author',
              type: 'text',
              required: true,
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Brief excerpt for article listings and SEO (1-2 sentences)',
              },
            },
            {
              name: 'takeawayHeading',
              type: 'text',
              admin: {
                description: 'Key takeaways section heading (e.g., この記事のポイント)',
              },
            },
            {
              name: 'takeaways',
              type: 'array',
              maxRows: 4,
              labels: {
                singular: 'ポイント',
                plural: 'ポイント',
              },
              admin: {
                description: 'Key takeaway points (max 4). Only renders if at least 1 item exists.',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              required: true,
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'article-categories',
              hasMany: true,
            },
            {
              name: 'tags',
              type: 'array',
              admin: {
                description: 'Tags for SEO and filtering',
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                },
              ],
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
      name: 'articleType',
      type: 'select',
      required: true,
      defaultValue: 'article',
      options: [
        { label: 'Article', value: 'article' },
        { label: 'Case Study', value: 'case-study' },
        { label: 'Whitepaper', value: 'whitepaper' },
        { label: 'Documentation', value: 'documentation' },
        { label: 'Research', value: 'research' },
      ],
      admin: {
        description: 'Content classification for organization and filtering',
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

export default Articles
