import type { Field } from 'payload'

/**
 * SEO fields for collection listing page settings globals.
 * Pattern B: CustomSeoFieldVariants with Japanese character counting.
 */
export const listingSeoFields = (): Field[] => [
  {
    name: 'seoTitle',
    type: 'text',
    label: 'Meta Title',
    admin: {
      description: 'SEO meta title for the listing page. Japanese character counting.',
      components: {
        Field: '@/components/CustomSeoFieldVariants#CustomSeoTitleField',
      },
    },
  },
  {
    name: 'seoDescription',
    type: 'textarea',
    label: 'Meta Description',
    admin: {
      description: 'SEO meta description for the listing page. Japanese character counting.',
      components: {
        Field: '@/components/CustomSeoFieldVariants#CustomSeoDescriptionField',
      },
    },
  },
  {
    name: 'ogTitle',
    type: 'text',
    label: 'Open Graph Title',
    admin: {
      description: 'OG title for social sharing. Japanese character counting.',
      components: {
        Field: '@/components/CustomSeoFieldVariants#CustomSeoOgTitleField',
      },
    },
  },
  {
    name: 'ogDescription',
    type: 'textarea',
    label: 'Open Graph Description',
    admin: {
      description: 'OG description for social sharing. Japanese character counting.',
      components: {
        Field: '@/components/CustomSeoFieldVariants#CustomSeoOgDescriptionField',
      },
    },
  },
  {
    name: 'ogImage',
    type: 'upload',
    relationTo: 'media',
    label: 'Open Graph Image',
    admin: {
      description: 'Image for social sharing. Recommended size: 1200x630px.',
    },
  },
  {
    name: 'noIndex',
    type: 'checkbox',
    label: 'No Index',
    defaultValue: false,
    admin: {
      description: 'When checked, this listing page will have a noindex meta tag.',
    },
  },
]
