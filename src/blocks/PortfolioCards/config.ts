import type { Block } from 'payload'

export const PortfolioCards: Block = {
  slug: 'portfolioCards',
  interfaceName: 'PortfolioCardsBlock',
  labels: {
    singular: 'Portfolio Cards',
    plural: 'Portfolio Cards',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
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
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'projects',
      type: 'array',
      label: 'Projects',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Project', plural: 'Projects' },
      fields: [
        { name: 'domain', type: 'text', required: true, label: 'Domain Name' },
        { name: 'url', type: 'text', label: 'URL' },
        { name: 'description', type: 'textarea', label: 'Description' },
      ],
    },
  ],
}
