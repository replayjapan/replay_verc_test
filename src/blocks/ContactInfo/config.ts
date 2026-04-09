import type { Block } from 'payload'

export const ContactInfo: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
  labels: {
    singular: 'Contact Info',
    plural: 'Contact Info',
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      label: 'Company Name',
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
      label: 'Company Description',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'emailNote',
      type: 'text',
      label: 'Email / Contact Note',
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Business Hours',
    },
  ],
}
