import type { Block } from 'payload'
import { linkFields } from '@/fields/linkFields'

export const ActionCardGrid: Block = {
  slug: 'actionCardGrid',
  interfaceName: 'ActionCardGridBlock',
  labels: {
    singular: 'Action Card Grid',
    plural: 'Action Card Grids',
  },
  fields: [
    {
      name: 'sectionHeading',
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
      name: 'sectionSubtitle',
      type: 'textarea',
      label: 'Section Subtitle',
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      required: true,
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'cardStyle',
      type: 'select',
      label: 'Card Style',
      required: true,
      defaultValue: 'bordered',
      options: [
        { label: 'Bordered', value: 'bordered' },
        { label: 'Filled', value: 'filled' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'sectionAlignment',
      type: 'select',
      label: 'Section Alignment',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'cardAlignment',
      type: 'select',
      label: 'Card Text Alignment',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'sectionBackground',
      type: 'select',
      label: 'Section Background',
      defaultValue: 'transparent',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'Light Gray', value: 'light-gray' },
        { label: 'Brand Primary', value: 'brand-primary' },
        { label: 'Brand Alt', value: 'brand-alt' },
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
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'mediaType',
          type: 'radio',
          label: 'Media Type',
          required: true,
          defaultValue: 'icon',
          options: [
            { label: 'Icon', value: 'icon' },
            { label: 'Image', value: 'image' },
          ],
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Globe', value: 'Globe' },
            { label: 'Shield', value: 'Shield' },
            { label: 'Bar Chart', value: 'BarChart3' },
            { label: 'Zap', value: 'Zap' },
            { label: 'Lock', value: 'Lock' },
            { label: 'Headphones', value: 'Headphones' },
            { label: 'Trending Up', value: 'TrendingUp' },
            { label: 'Search', value: 'Search' },
            { label: 'Message', value: 'MessageSquare' },
            { label: 'Check Circle', value: 'CheckCircle' },
            { label: 'Star', value: 'Star' },
            { label: 'Users', value: 'Users' },
          ],
          admin: {
            condition: (_data, siblingData) => siblingData?.mediaType === 'icon',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          admin: {
            condition: (_data, siblingData) => siblingData?.mediaType === 'image',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        ...linkFields(),
      ],
    },
  ],
}
