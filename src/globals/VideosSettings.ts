import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { listingPageFields } from '@/fields/listingPageFields'
import { listingSeoFields } from '@/fields/listingSeoFields'

const revalidateVideosSettings: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating videos-settings`)
    revalidateTag('global_videos-settings', 'max')
  }
  return doc
}

export const VideosSettings: GlobalConfig = {
  slug: 'videos-settings',
  label: 'Videos Settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Videos',
  },
  hooks: {
    afterChange: [revalidateVideosSettings],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            ...listingPageFields({
              title: '動画',
              subtitle: '動画コンテンツの一覧です。',
            }),
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
              admin: {
                description: 'Background image for the videos listing page header.',
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
