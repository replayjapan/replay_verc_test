import type { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'searchExcerpt',
    type: 'textarea',
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'searchKeywords',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'featured',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'contentImage',
    label: 'Content Image',
    type: 'upload',
    relationTo: 'media',
    admin: {
      readOnly: true,
      description: 'Primary content image (featuredImage, thumbnail, etc.) synced from source collection.',
    },
  },
  {
    name: 'meta',
    label: 'Meta',
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: 'Title',
      },
      {
        type: 'text',
        name: 'description',
        label: 'Description',
      },
      {
        name: 'image',
        label: 'Image',
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: 'Categories',
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
      },
      {
        name: 'categoryID',
        type: 'text',
      },
      {
        name: 'title',
        type: 'text',
      },
    ],
  },
]
