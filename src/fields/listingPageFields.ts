import type { Field, RichTextField } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

/**
 * Page content fields for collection listing page settings globals.
 * Controls the heading, subtitle, and optional rich intro shown on the listing page.
 */
export const listingPageFields = (defaults: {
  title: string
  subtitle: string
}): Field[] => {
  const pageIntroField: RichTextField = {
    name: 'pageIntro',
    type: 'richText',
    label: 'Page Introduction',
    editor: defaultLexical,
    admin: {
      description: 'Rich introductory text displayed below the subtitle. Recommended 200-300 Japanese characters.',
    },
  }

  return [
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Page Title',
      defaultValue: defaults.title,
      admin: {
        description: 'The heading displayed at the top of the listing page.',
      },
    },
    {
      name: 'pageSubtitle',
      type: 'textarea',
      label: 'Page Subtitle',
      defaultValue: defaults.subtitle,
      admin: {
        description: 'The subtitle or description text displayed below the heading.',
      },
    },
    pageIntroField,
  ]
}
