import type { Block } from 'payload'

export const CapabilitiesGrid: Block = {
  slug: 'capabilitiesGrid',
  interfaceName: 'CapabilitiesGridBlock',
  labels: {
    singular: 'Capabilities Grid',
    plural: 'Capabilities Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
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
      name: 'items',
      type: 'array',
      label: 'Capability Items',
      minRows: 2,
      maxRows: 6,
      labels: {
        singular: 'Capability',
        plural: 'Capabilities',
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
      ],
    },
  ],
}
