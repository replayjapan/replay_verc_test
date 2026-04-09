import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Tabs: Block = {
  slug: 'tabs',
  interfaceName: 'TabsBlock',
  labels: {
    singular: 'Tabs',
    plural: 'Tabs',
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
      name: 'tabAlignment',
      type: 'select',
      label: 'Tab Alignment',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'tabStyle',
      type: 'select',
      label: 'Tab Style',
      defaultValue: 'underline',
      options: [
        { label: 'Underline', value: 'underline' },
        { label: 'Boxed', value: 'boxed' },
        { label: 'Pill', value: 'pill' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      label: 'Background',
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
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      minRows: 2,
      maxRows: 6,
      fields: [
        {
          name: 'tabLabel',
          type: 'text',
          label: 'Tab Label',
          required: true,
        },
        {
          name: 'tabContent',
          type: 'richText',
          label: 'Tab Content',
          required: true,
          editor: defaultLexical,
        },
        {
          name: 'tabIcon',
          type: 'select',
          label: 'Tab Icon',
          options: [
            { label: 'Shield', value: 'Shield' },
            { label: 'Zap', value: 'Zap' },
            { label: 'Star', value: 'Star' },
            { label: 'Globe', value: 'Globe' },
            { label: 'Heart', value: 'Heart' },
            { label: 'Bell', value: 'Bell' },
          ],
        },
        {
          name: 'tabImage',
          type: 'upload',
          label: 'Tab Image',
          relationTo: 'media',
          admin: {
            description: 'Optional image displayed alongside tab content.',
          },
        },
      ],
    },
  ],
}
