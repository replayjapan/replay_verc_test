import type { Block } from 'payload'
import { linkFields } from '@/fields/linkFields'

export const HeroCarousel: Block = {
  slug: 'heroCarousel',
  interfaceName: 'HeroCarouselBlock',
  labels: {
    singular: 'Hero Carousel',
    plural: 'Hero Carousels',
  },
  fields: [
    {
      name: 'useSharedContent',
      type: 'checkbox',
      label: 'Use shared content for all slides',
      defaultValue: false,
    },
    {
      name: 'textAlignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'sharedContent',
      type: 'group',
      label: 'Shared Content',
      admin: {
        condition: (_data, siblingData) => siblingData?.useSharedContent === true,
        description: 'This content will be used for all slides',
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
          required: true,
        },
        ...linkFields({ group: 'hero-ctas', prefix: 'primary', label: 'Primary CTA', labelRequired: false, dbName: 'sc_pri_link' }),
        ...linkFields({ group: 'hero-ctas', prefix: 'secondary', label: 'Secondary CTA', labelRequired: false, dbName: 'sc_sec_link' }),
      ],
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Carousel Slides',
      minRows: 1,
      maxRows: 3,
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            condition: (_data, _siblingData, { blockData }) => !blockData?.useSharedContent,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            condition: (_data, _siblingData, { blockData }) => !blockData?.useSharedContent,
          },
        },
        ...linkFields({ group: 'hero-ctas', prefix: 'primary', label: 'Primary CTA', labelRequired: false, dbName: 'sl_pri_link' }),
        ...linkFields({ group: 'hero-ctas', prefix: 'secondary', label: 'Secondary CTA', labelRequired: false, dbName: 'sl_sec_link' }),
      ],
    },
    {
      name: 'height',
      type: 'select',
      options: [
        { label: 'Standard (600px)', value: 'standard' },
        { label: 'Tall (700px)', value: 'tall' },
        { label: 'Short (500px)', value: 'short' },
      ],
      defaultValue: 'standard',
    },
    {
      name: 'showArrows',
      type: 'checkbox',
      label: 'Show Navigation Arrows',
      defaultValue: true,
    },
  ],
}
