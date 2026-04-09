import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'
import { linkFields } from '@/fields/linkFields'

export const CenteredContent: Block = {
  slug: 'centeredContent',
  interfaceName: 'CenteredContentBlock',
  labels: {
    singular: 'Centered Content',
    plural: 'Centered Content Blocks',
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
      name: 'content',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'alignment',
      type: 'select',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
      ],
      defaultValue: 'center',
    },
    {
      name: 'width',
      type: 'select',
      options: [
        { label: 'Narrow (600px)', value: 'narrow' },
        { label: 'Medium (800px)', value: 'medium' },
        { label: 'Wide (1000px)', value: 'wide' },
        { label: 'Full Width (1140px)', value: 'full' },
      ],
      defaultValue: 'medium',
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
