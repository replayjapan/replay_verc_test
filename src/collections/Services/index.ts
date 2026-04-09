import type { CollectionConfig } from 'payload'

import {
  MetaImageField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { defaultLexical } from '../../fields/defaultLexical'
import { searchTabFields } from '../../fields/searchFields'
import { generateSlugHook, validateSlug } from '../../utilities/generateSlug'
import { sortOrderField } from '../../fields/sortOrderField'
import { revalidateService, revalidateDeleteService } from './hooks/revalidateService'

import { Accordion } from '../../blocks/Accordion/config'
import { ActionCardGrid } from '../../blocks/ActionCardGrid/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { CenteredContent } from '../../blocks/CenteredContent/config'
import { Content } from '../../blocks/Content/config'
import { HeroCarousel } from '../../blocks/HeroCarousel/config'
import { ImageGallery } from '../../blocks/ImageGallery/config'
import { MetricsBar } from '../../blocks/MetricsBar/config'
import { Notice } from '../../blocks/Notice/config'
import { Split1x2 } from '../../blocks/Split1x2/config'
import { SplitSection } from '../../blocks/SplitSection/config'
import { Tabs } from '../../blocks/Tabs/config'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'icon'],
    group: 'Services',
    description: 'Services offered by your company',
  },
  defaultSort: '-createdAt',
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateDeleteService],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    sortOrderField,
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (auto-generated from title)',
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
              type: 'richText',
              editor: defaultLexical,
            },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Smartphone', value: 'smartphone' },
                { label: 'Bar Chart', value: 'barchart' },
                { label: 'Monitor', value: 'monitor' },
                { label: 'Code', value: 'code' },
                { label: 'Image', value: 'image' },
                { label: 'Globe', value: 'globe' },
                { label: 'Share', value: 'share' },
                { label: 'Mail', value: 'mail' },
                { label: 'Megaphone', value: 'megaphone' },
                { label: 'Camera', value: 'camera' },
                { label: 'Pen', value: 'pen' },
                { label: 'Briefcase', value: 'briefcase' },
              ],
              admin: {
                description: 'Lucide icon name to display with this service',
              },
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'service-categories',
              hasMany: false,
            },
            {
              name: 'link_text',
              type: 'text',
              defaultValue: '詳しく見る',
            },
            {
              name: 'link_url',
              type: 'text',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'listingDescription',
              type: 'textarea',
              admin: {
                description: 'Short description shown on the services listing page (2-3 sentences).',
              },
            },
            {
              name: 'deliverables',
              type: 'array',
              label: 'Deliverables / Capabilities',
              maxRows: 8,
              labels: {
                singular: 'Deliverable',
                plural: 'Deliverables',
              },
              admin: {
                description: 'Key deliverables or capabilities listed on both listing and detail pages.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'Optional detail shown on the service detail page.',
                  },
                },
              ],
            },
            {
              name: 'authoritySection',
              type: 'group',
              label: 'Authority Section',
              admin: {
                description: 'Dark band on the detail page — process steps, stats, or feature callout.',
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                },
                {
                  name: 'body',
                  type: 'textarea',
                  admin: {
                    description: 'Optional supporting text below the heading.',
                  },
                },
                {
                  name: 'items',
                  type: 'array',
                  maxRows: 6,
                  labels: {
                    singular: 'Item',
                    plural: 'Items',
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'ctaHeading',
              type: 'text',
              admin: {
                description: 'CTA section heading on the detail page (e.g., "開発のご相談").',
              },
            },
            {
              name: 'ctaText',
              type: 'textarea',
              admin: {
                description: 'CTA section body text.',
              },
            },
          ],
        },
        {
          label: 'Page Layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Accordion,
                ActionCardGrid,
                CallToAction,
                CenteredContent,
                Content,
                HeroCarousel,
                ImageGallery,
                MetricsBar,
                Notice,
                Split1x2,
                SplitSection,
                Tabs,
              ],
              admin: {
                initCollapsed: true,
                description: 'Optional block layout for the service detail page. When present, blocks render below the service header.',
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
  ],
}

export default Services
