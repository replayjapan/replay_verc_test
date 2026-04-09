import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  labels: {
    singular: 'Accordion',
    plural: 'Accordions',
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
      type: 'text',
      label: 'Section Subtitle',
    },
    {
      name: 'allowMultipleOpen',
      type: 'checkbox',
      label: 'Allow Multiple Open',
      defaultValue: false,
      admin: {
        description: 'When unchecked, opening one item closes others.',
      },
    },
    {
      name: 'defaultFirstOpen',
      type: 'checkbox',
      label: 'Default First Open',
      defaultValue: false,
      admin: {
        description: 'First item starts expanded on page load.',
      },
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
      name: 'items',
      type: 'array',
      label: 'Accordion Items',
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
          required: true,
          editor: defaultLexical,
        },
        {
          name: 'category',
          type: 'text',
          label: 'Category',
          admin: {
            description: 'Optional grouping label. Items with the same category are grouped under a subheading.',
          },
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          label: 'Default Open',
          defaultValue: false,
        },
      ],
    },
  ],
}
