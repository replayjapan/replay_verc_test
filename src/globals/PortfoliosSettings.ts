import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { listingPageFields } from '@/fields/listingPageFields'
import { listingSeoFields } from '@/fields/listingSeoFields'

const revalidatePortfoliosSettings: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating portfolios-settings`)
    revalidateTag('global_portfolios-settings', 'max')
  }
  return doc
}

export const PortfoliosSettings: GlobalConfig = {
  slug: 'portfolios-settings',
  label: 'Portfolio Settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Portfolio',
  },
  hooks: {
    afterChange: [revalidatePortfoliosSettings],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            ...listingPageFields({
              title: 'ポートフォリオ',
              subtitle: '制作実績の一覧です。',
            }),
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
              admin: {
                description: 'Background image for the portfolio listing page header.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: listingSeoFields(),
        },
      ],
    },
  ],
}
