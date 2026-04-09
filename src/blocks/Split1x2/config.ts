import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Split1x2: Block = {
  slug: 'split1x2',
  interfaceName: 'Split1x2Block',
  labels: {
    singular: '1/3 + 2/3 Split Section',
    plural: '1/3 + 2/3 Split Sections',
  },
  fields: [
    {
      name: 'smallColumnPosition',
      type: 'select',
      options: [
        { label: 'Left Side', value: 'left' },
        { label: 'Right Side', value: 'right' },
      ],
      defaultValue: 'left',
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
      name: 'smallColumnDisplayType',
      type: 'select',
      options: [
        { label: 'Background Image with Overlay', value: 'backgroundImage' },
        { label: 'Image with Text', value: 'image' },
        { label: 'Text Only', value: 'textOnly' },
      ],
      defaultValue: 'image',
    },
    {
      name: 'smallColumnImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_data, siblingData) =>
          siblingData?.smallColumnDisplayType === 'backgroundImage' ||
          siblingData?.smallColumnDisplayType === 'image',
      },
    },
    {
      name: 'smallColumnRoundedCorners',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (_data, siblingData) => siblingData?.smallColumnDisplayType === 'image',
      },
    },
    {
      name: 'smallColumnTitle',
      type: 'text',
    },
    {
      name: 'smallColumnSubtitle',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => siblingData?.smallColumnDisplayType !== 'backgroundImage',
      },
    },
    {
      name: 'smallColumnDescription',
      type: 'textarea',
      admin: {
        condition: (_data, siblingData) => siblingData?.smallColumnDisplayType !== 'backgroundImage',
      },
    },
    {
      name: 'largeColumnHeader',
      type: 'text',
      required: true,
    },
    {
      name: 'largeColumnSubheader',
      type: 'text',
    },
    {
      name: 'largeColumnDescription',
      type: 'richText',
      editor: defaultLexical,
      required: true,
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
