import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Accordion } from '../../blocks/Accordion/config'
import { ActionCardGrid } from '../../blocks/ActionCardGrid/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { CapabilitiesGrid } from '../../blocks/CapabilitiesGrid/config'
import { ClientLogos } from '../../blocks/ClientLogos/config'
import { CompanyFacts } from '../../blocks/CompanyFacts/config'
import { ContactInfo } from '../../blocks/ContactInfo/config'
import { CenteredContent } from '../../blocks/CenteredContent/config'
import { Code } from '../../blocks/Code/config'
import { Content } from '../../blocks/Content/config'
import { DomainShowcase } from '../../blocks/DomainShowcase/config'
import { FormBlock } from '../../blocks/Form/config'
import { HeroCarousel } from '../../blocks/HeroCarousel/config'
import { HeroHeader } from '../../blocks/HeroHeader/config'
import { ImageGallery } from '../../blocks/ImageGallery/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { MetricsBar } from '../../blocks/MetricsBar/config'
import { PortfolioCards } from '../../blocks/PortfolioCards/config'
import { Notice } from '../../blocks/Notice/config'
import { ServicesBlock } from '../../blocks/ServicesBlock/config'
import { Split1x2 } from '../../blocks/Split1x2/config'
import { SplitSection } from '../../blocks/SplitSection/config'
import { Tabs } from '../../blocks/Tabs/config'
import { ThesisStats } from '../../blocks/ThesisStats/config'
import { slugField } from 'payload'
import { searchTabFields } from '../../fields/searchFields'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaImageField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Accordion,
                ActionCardGrid,
                Archive,
                CallToAction,
                CapabilitiesGrid,
                CenteredContent,
                ClientLogos,
                CompanyFacts,
                ContactInfo,
                Code,
                Content,
                DomainShowcase,
                FormBlock,
                HeroCarousel,
                HeroHeader,
                ImageGallery,
                MediaBlock,
                MetricsBar,
                Notice,
                PortfolioCards,
                ServicesBlock,
                Split1x2,
                SplitSection,
                Tabs,
                ThesisStats,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
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
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
