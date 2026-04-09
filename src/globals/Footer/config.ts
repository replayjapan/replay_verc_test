import type { GlobalConfig } from 'payload'

import { linkFields } from '@/fields/linkFields'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Globals',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
          admin: {
            description:
              'Unique identifier for this footer link. Used for stable test selectors (data-testid). Example: "footer-domains", "footer-contact".',
          },
        },
        ...linkFields({ group: 'footer-navigation' }),
      ],
      maxRows: 12,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
