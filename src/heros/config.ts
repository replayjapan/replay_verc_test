import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkFields } from '@/fields/linkFields'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        ...linkFields({ group: 'hero-ctas' }),
      ],
      maxRows: 2,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: () => false,
        description: 'Hero media is no longer used. Use HeroCarousel block instead.',
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
