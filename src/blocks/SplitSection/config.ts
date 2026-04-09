import type { Block } from 'payload'
import { linkFields } from '@/fields/linkFields'

export const SplitSection: Block = {
  slug: 'splitSection',
  interfaceName: 'SplitSectionBlock',
  labels: {
    singular: 'Split Section',
    plural: 'Split Sections',
  },
  fields: [
    {
      name: 'title',
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'layoutStyle',
      type: 'radio',
      options: [
        { label: 'Standard (with padding)', value: 'standard' },
        { label: 'Full Bleed (edge-to-edge image)', value: 'fullBleed' },
      ],
      defaultValue: 'standard',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'lightGray' },
        { label: 'Light Blue', value: 'lightBlue' },
        { label: 'Light Beige', value: 'lightBeige' },
      ],
      defaultValue: 'white',
    },
    ...linkFields({ group: 'block-ctas', prefix: 'primary', label: 'Primary CTA', labelRequired: false }),
    ...linkFields({ group: 'block-ctas', prefix: 'secondary', label: 'Secondary CTA', labelRequired: false }),
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
