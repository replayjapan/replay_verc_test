import type { Block } from 'payload'

export const ThesisStats: Block = {
  slug: 'thesisStats',
  interfaceName: 'ThesisStatsBlock',
  labels: {
    singular: 'Thesis + Stats',
    plural: 'Thesis + Stats',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
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
      name: 'body',
      type: 'textarea',
      required: true,
      label: 'Body Text',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      minRows: 2,
      maxRows: 5,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value (e.g., 2021年)' },
        { name: 'label', type: 'text', required: true, label: 'Label (e.g., 設立)' },
      ],
    },
  ],
}
