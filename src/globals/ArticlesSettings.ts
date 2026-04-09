import type { GlobalConfig } from 'payload'

import { listingPageFields } from '@/fields/listingPageFields'
import { listingSeoFields } from '@/fields/listingSeoFields'

export const ArticlesSettings: GlobalConfig = {
  slug: 'articles-settings',
  label: 'Articles Settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Articles',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            ...listingPageFields({
              title: '記事',
              subtitle: 'デジタル戦略、技術事例、業界分析に関する深掘りコンテンツをお届けします。',
            }),
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
              admin: {
                description: 'Background image for the articles listing page header.',
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
