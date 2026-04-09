import type { Block } from 'payload'

export const DomainShowcase: Block = {
  slug: 'domainShowcase',
  interfaceName: 'DomainShowcaseBlock',
  labels: {
    singular: 'Domain Showcase',
    plural: 'Domain Showcases',
  },
  fields: [
    {
      name: 'sourceMode',
      type: 'select',
      required: true,
      defaultValue: 'featured',
      label: 'Source Mode',
      options: [
        { label: 'Featured Domains', value: 'featured' },
        { label: 'By Category', value: 'category' },
        { label: 'Manual Selection', value: 'manual' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 12,
      admin: {
        step: 1,
        condition: (_data, siblingData) =>
          siblingData?.sourceMode === 'featured' || siblingData?.sourceMode === 'category',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'domain-category',
      hasMany: true,
      label: 'Categories',
      admin: {
        condition: (_data, siblingData) => siblingData?.sourceMode === 'category',
      },
    },
    {
      name: 'selectedDomains',
      type: 'relationship',
      relationTo: 'domains',
      hasMany: true,
      label: 'Domains',
      admin: {
        condition: (_data, siblingData) => siblingData?.sourceMode === 'manual',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading',
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
      name: 'subtitle',
      type: 'text',
      label: 'Section Subheading',
    },
    {
      name: 'showViewAll',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show "View All" link',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'lightGray' },
        { label: 'Brand', value: 'brand' },
        { label: 'Dark', value: 'dark' },
      ],
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
