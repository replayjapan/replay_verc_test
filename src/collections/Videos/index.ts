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
import { generateSlugHook, validateSlug } from '../../utilities/generateSlug'
import { validateUrl } from '../../utilities/validators'
import { revalidateVideo, revalidateDeleteVideo } from './hooks/revalidateVideo'

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'duration', '_status', 'createdAt'],
    group: 'Videos',
    description: 'Video content, tutorials, and presentations',
  },
  defaultSort: '-createdAt',
  hooks: {
    afterChange: [revalidateVideo],
    afterDelete: [revalidateDeleteVideo],
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
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'videoUrl',
              type: 'text',
              required: true,
              admin: {
                description: 'Video URL (YouTube, Vimeo, etc.)',
              },
              validate: validateUrl,
            },
            {
              name: 'embedCode',
              type: 'textarea',
              admin: {
                description: 'Optional embed code for non-standard sources (TikTok, Instagram)',
              },
            },
            {
              name: 'duration',
              type: 'text',
              admin: {
                description: 'Video duration (e.g., "5:30", "1h 15m")',
                placeholder: '5:30',
              },
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'transcript',
              type: 'richText',
              editor: defaultLexical,
              admin: {
                description: 'Optional video transcript for accessibility',
              },
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'video-categories',
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
      name: 'videoType',
      type: 'select',
      required: true,
      defaultValue: 'tutorial',
      options: [
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Demo', value: 'demo' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Presentation', value: 'presentation' },
        { label: 'Interview', value: 'interview' },
        { label: 'Testimonial', value: 'testimonial' },
      ],
      admin: {
        description: 'Type of video for organization and filtering',
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

export default Videos
