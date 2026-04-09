import type { GlobalConfig } from 'payload'

import { listingPageFields } from '@/fields/listingPageFields'
import { listingSeoFields } from '@/fields/listingSeoFields'

export const ServicesSettings: GlobalConfig = {
  slug: 'services-settings',
  label: 'Services Settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Services',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            ...listingPageFields({
              title: '事業内容',
              subtitle: 'rePlayは東京を拠点に、プロジェクト開発からデジタルマーケティング、ドメインポートフォリオの戦略的管理まで、一貫した支援を提供します。',
            }),
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
              admin: {
                description: 'Background image for the services listing page header.',
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
