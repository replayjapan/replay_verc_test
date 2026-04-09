import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Notice: Block = {
  slug: 'notice',
  interfaceName: 'NoticeBlock',
  labels: {
    singular: 'Notice',
    plural: 'Notices',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Variant',
      required: true,
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Success', value: 'success' },
        { label: 'Tip', value: 'tip' },
        { label: 'Slim Banner', value: 'slim' },
      ],
    },
    {
      name: 'useCustomStyle',
      type: 'checkbox',
      label: 'Use Custom Style',
      defaultValue: false,
      admin: {
        description: 'Override variant defaults with custom background color and icon.',
      },
    },
    {
      name: 'customBackgroundColor',
      type: 'text',
      label: 'Custom Background Color',
      admin: {
        description: 'Hex color (e.g., #FEF3C7)',
        condition: (_data, siblingData) => siblingData?.useCustomStyle === true,
      },
    },
    {
      name: 'customIcon',
      type: 'select',
      label: 'Custom Icon',
      options: [
        { label: 'Info', value: 'Info' },
        { label: 'Alert Triangle', value: 'AlertTriangle' },
        { label: 'Check Circle', value: 'CheckCircle' },
        { label: 'Lightbulb', value: 'Lightbulb' },
        { label: 'Star', value: 'Star' },
        { label: 'Bell', value: 'Bell' },
        { label: 'Shield', value: 'Shield' },
        { label: 'Zap', value: 'Zap' },
        { label: 'Heart', value: 'Heart' },
      ],
      admin: {
        condition: (_data, siblingData) => siblingData?.useCustomStyle === true,
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
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
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      editor: defaultLexical,
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      label: 'Dismissible',
      defaultValue: false,
      admin: {
        description: 'Adds a close button so users can dismiss the notice.',
      },
    },
  ],
}
