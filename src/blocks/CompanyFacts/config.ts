import type { Block } from 'payload'

export const CompanyFacts: Block = {
  slug: 'companyFacts',
  interfaceName: 'CompanyFactsBlock',
  labels: {
    singular: 'Company Facts',
    plural: 'Company Facts',
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
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'facts',
      type: 'array',
      label: 'Facts',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Fact',
        plural: 'Facts',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label (left column)',
        },
        {
          name: 'value',
          type: 'textarea',
          required: true,
          label: 'Value (right column)',
          admin: {
            description: 'Use line breaks for multi-line values. Use • prefix for bullet list items.',
          },
        },
      ],
    },
  ],
}
