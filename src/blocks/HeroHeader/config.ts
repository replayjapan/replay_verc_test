import type { Block, GroupField } from 'payload'
import { linkFields } from '@/fields/linkFields'

const ctaFields = linkFields({
  group: 'hero-ctas',
  prefix: 'primary',
  label: 'Primary CTA',
  labelRequired: false,
  dbName: 'hh_pri_link',
})

// Add condition so CTA only shows when size is NOT 'full' (full uses per-slide CTAs)
const ctaGroup = ctaFields[0] as GroupField
ctaGroup.admin = {
  ...ctaGroup.admin,
  condition: (_data, _siblingData, { blockData }) =>
    blockData?.size === 'full' ? false : true,
}

export const HeroHeader: Block = {
  slug: 'heroHeader',
  interfaceName: 'HeroHeaderBlock',
  labels: {
    singular: 'Hero Header',
    plural: 'Hero Headers',
  },
  fields: [
    {
      name: 'size',
      type: 'select',
      label: 'Header Size',
      required: true,
      defaultValue: 'medium',
      options: [
        { label: 'Full (immersive carousel)', value: 'full' },
        { label: 'Medium (standard page header)', value: 'medium' },
        { label: 'Short (detail/item pages)', value: 'short' },
      ],
      admin: {
        description: 'Full = carousel hero with slides. Medium/Short = fixed height static header.',
      },
    },
    // Static fields for medium/short
    {
      name: 'title',
      type: 'text',
      label: 'Heading',
      required: true,
      admin: {
        condition: (_data, _siblingData, { blockData }) => blockData?.size !== 'full',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      admin: {
        condition: (_data, _siblingData, { blockData }) => blockData?.size !== 'full',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        description: 'Optional. Uses solid brand-primary background when empty.',
        condition: (_data, _siblingData, { blockData }) => blockData?.size !== 'full',
      },
    },
    {
      name: 'headingAlignment',
      type: 'select',
      label: 'Heading Alignment',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    // Carousel slides for full size
    {
      name: 'slides',
      type: 'array',
      label: 'Carousel Slides',
      minRows: 1,
      maxRows: 5,
      labels: { singular: 'Slide', plural: 'Slides' },
      admin: {
        condition: (_data, _siblingData, { blockData }) => blockData?.size === 'full',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Slide Image',
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Slide Heading',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Slide Subtitle',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA Button Label',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'CTA Button URL',
        },
      ],
    },
    ctaGroup,
  ],
}
