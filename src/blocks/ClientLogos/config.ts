import type { Block } from 'payload'

export const ClientLogos: Block = {
  slug: 'clientLogos',
  interfaceName: 'ClientLogosBlock',
  labels: {
    singular: 'Client Logos',
    plural: 'Client Logos',
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
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'clients',
      type: 'array',
      label: 'Clients',
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Client', plural: 'Clients' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo Image' },
      ],
    },
  ],
}
