import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'servicesBlock',
  interfaceName: 'ServicesBlockType',
  labels: {
    singular: 'Services Block',
    plural: 'Services Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'headingAlignment',
      type: 'select',
      label: 'Heading Alignment',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'showBorders',
      type: 'checkbox',
      label: 'Show card borders',
      defaultValue: false,
      admin: {
        condition: (_data, siblingData) => siblingData?.layout === 'grid',
      },
    },
    {
      name: 'showDescriptions',
      type: 'checkbox',
      label: 'Show service descriptions',
      defaultValue: true,
    },
    {
      name: 'showLinks',
      type: 'checkbox',
      label: 'Show learn more links',
      defaultValue: true,
    },
    {
      name: 'showCTA',
      type: 'checkbox',
      label: 'Show CTA button',
      defaultValue: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => siblingData?.showCTA === true,
      },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      defaultValue: '/services',
      admin: {
        condition: (_data, siblingData) => siblingData?.showCTA === true,
      },
    },
    {
      name: 'showTopDivider',
      type: 'checkbox',
      label: 'Show Top Divider',
      defaultValue: false,
      admin: {
        description: 'Show a horizontal divider line above this block.',
      },
    },
    {
      name: 'spacingDensity',
      type: 'select',
      label: 'Spacing Density',
      defaultValue: 'default',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Default', value: 'default' },
        { label: 'Spacious', value: 'spacious' },
      ],
    },
  ],
}
