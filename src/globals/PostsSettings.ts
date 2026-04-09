import type { GlobalConfig } from 'payload'

import { listingPageFields } from '@/fields/listingPageFields'
import { listingSeoFields } from '@/fields/listingSeoFields'

export const PostsSettings: GlobalConfig = {
  slug: 'posts-settings',
  label: 'Posts Settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Posts',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            ...listingPageFields({
              title: 'ブログ',
              subtitle: 'ドメイン管理、Web開発、デジタルマーケティングに関する最新の知見をお届けします。',
            }),
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
              admin: {
                description: 'Background image for the blog listing page header.',
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
