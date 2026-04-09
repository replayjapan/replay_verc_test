import type { Block } from 'payload'

export const MetricsBar: Block = {
  slug: 'metricsBar',
  interfaceName: 'MetricsBarBlock',
  labels: {
    singular: 'Metrics Bar',
    plural: 'Metrics Bars',
  },
  fields: [
    {
      name: 'mode',
      type: 'radio',
      label: 'Layout Mode',
      required: true,
      defaultValue: 'bar',
      options: [
        { label: 'Bar (row of metrics)', value: 'bar' },
        { label: 'Split (big number + content)', value: 'split' },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
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
      name: 'background',
      type: 'select',
      label: 'Background',
      defaultValue: 'transparent',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'Brand Primary', value: 'brand-primary' },
        { label: 'Brand Alt', value: 'brand-alt' },
        { label: 'Light Gray', value: 'light-gray' },
      ],
    },
    {
      name: 'abbreviate',
      type: 'checkbox',
      label: 'Abbreviate Numbers',
      defaultValue: false,
      admin: {
        description: 'Shorten large numbers (5620 → 5.6K, 1200000 → 1.2M)',
      },
    },
    // Bar mode fields
    {
      name: 'items',
      type: 'array',
      label: 'Metric Items',
      minRows: 2,
      maxRows: 5,
      admin: {
        condition: (_data, siblingData) => siblingData?.mode === 'bar',
      },
      fields: [
        {
          name: 'prefix',
          type: 'text',
          label: 'Prefix',
          admin: {
            description: 'Text before the number (e.g., ¥, $, +)',
            width: '25%',
          },
        },
        {
          name: 'number',
          type: 'number',
          label: 'Number',
          required: true,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
          admin: {
            description: 'Text after the number (e.g., %, +, K)',
            width: '25%',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          admin: {
            description: 'Description below the number',
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Globe', value: 'Globe' },
            { label: 'Heart', value: 'Heart' },
            { label: 'Zap', value: 'Zap' },
            { label: 'Award', value: 'Award' },
            { label: 'Trending Up', value: 'TrendingUp' },
            { label: 'Users', value: 'Users' },
            { label: 'Star', value: 'Star' },
            { label: 'Shield', value: 'Shield' },
            { label: 'Target', value: 'Target' },
          ],
        },
      ],
    },
    // Split mode fields
    {
      name: 'bigNumberPrefix',
      type: 'text',
      label: 'Big Number Prefix',
      admin: {
        condition: (_data, siblingData) => siblingData?.mode === 'split',
        description: 'Text before the big number (e.g., ¥)',
      },
    },
    {
      name: 'bigNumber',
      type: 'number',
      label: 'Big Number',
      admin: {
        condition: (_data, siblingData) => siblingData?.mode === 'split',
      },
    },
    {
      name: 'bigNumberSuffix',
      type: 'text',
      label: 'Big Number Suffix',
      admin: {
        condition: (_data, siblingData) => siblingData?.mode === 'split',
        description: 'Text after the big number (e.g., 万, %)',
      },
    },
    {
      name: 'bigNumberAlignment',
      type: 'select',
      label: 'Big Number Alignment',
      defaultValue: 'right',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        condition: (_data, siblingData) => siblingData?.mode === 'split',
      },
    },
    {
      name: 'contentHeading',
      type: 'text',
      label: 'Content Heading',
      admin: {
        condition: (_data, siblingData) => siblingData?.mode === 'split',
      },
    },
    {
      name: 'contentText',
      type: 'textarea',
      label: 'Content Text',
      admin: {
        condition: (_data, siblingData) => siblingData?.mode === 'split',
      },
    },
    {
      name: 'contentImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Content Image',
      admin: {
        condition: (_data, siblingData) => siblingData?.mode === 'split',
      },
    },
    {
      name: 'contentSubtext',
      type: 'text',
      label: 'Content Subtext',
      admin: {
        condition: (_data, siblingData) => siblingData?.mode === 'split',
        description: 'Small footnote text (e.g., data source)',
      },
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
