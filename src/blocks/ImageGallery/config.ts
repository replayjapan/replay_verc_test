import type { Block } from 'payload'

export const ImageGallery: Block = {
  slug: 'imageGallery',
  interfaceName: 'ImageGalleryBlock',
  labels: {
    singular: 'Image Gallery',
    plural: 'Image Galleries',
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
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      required: true,
      defaultValue: '16:9',
      options: [
        { label: 'Original', value: 'original' },
        { label: 'Square (1:1)', value: 'square' },
        { label: 'Widescreen (16:9)', value: '16:9' },
        { label: 'Standard (4:3)', value: '4:3' },
      ],
    },
    {
      name: 'gap',
      type: 'select',
      label: 'Gap',
      defaultValue: 'normal',
      options: [
        { label: 'Tight', value: 'tight' },
        { label: 'Normal', value: 'normal' },
        { label: 'Wide', value: 'wide' },
      ],
    },
    {
      name: 'captionAlignment',
      type: 'select',
      label: 'Caption Alignment',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'lightbox',
      type: 'checkbox',
      label: 'Enable Lightbox',
      defaultValue: false,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'lightGray' },
        { label: 'Brand', value: 'brand' },
        { label: 'Dark', value: 'dark' },
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
      name: 'images',
      type: 'array',
      label: 'Images',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption',
        },
      ],
    },
  ],
}
