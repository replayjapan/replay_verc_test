import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { listingSeoFields } from '@/fields/listingSeoFields'

export const DomainPortfolioSettings: GlobalConfig = {
  slug: 'domains-settings',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Domain Portfolio',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            {
              name: 'pageTitle',
              type: 'text',
              required: true,
              defaultValue: 'ドメインポートフォリオ',
            },
            {
              name: 'pageDesc',
              type: 'textarea',
              defaultValue: 'プレミアムドメインをご覧ください。',
            },
            {
              name: 'premiumTitle',
              type: 'text',
              defaultValue: '注目のドメイン',
              admin: {
                description: 'Heading for the featured/premium domains section.',
              },
            },
            {
              name: 'premiumSubtitle',
              type: 'text',
              defaultValue: '厳選されたプレミアムドメインをご紹介します',
              admin: {
                description: 'Subtitle below the premium heading.',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Background image for the Domains listing page hero header.',
              },
            },
            {
              name: 'defaultImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Fallback image used for domains without a featured image.',
              },
            },
            {
              name: 'disclaimer',
              type: 'textarea',
              defaultValue: '※ 表示金額は最低希望価格です。実際の取引金額はご相談の上で決定します。ドメインの移管には別途手数料がかかる場合があります。',
              admin: {
                description: 'Legal disclaimer shown at the bottom of domain pages.',
              },
            },
            {
              name: 'display',
              type: 'group',
              fields: [
                {
                  name: 'perPage',
                  type: 'number',
                  defaultValue: 12,
                  min: 1,
                },
                {
                  name: 'sortField',
                  type: 'select',
                  defaultValue: 'domainName',
                  options: [
                    { label: 'Domain Name', value: 'domainName' },
                    { label: 'Registration Date', value: 'registrationDate' },
                  ],
                },
                {
                  name: 'sortDir',
                  type: 'select',
                  defaultValue: 'asc',
                  options: [
                    { label: 'Ascending', value: 'asc' },
                    { label: 'Descending', value: 'desc' },
                  ],
                },
                {
                  name: 'showFeatured',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'enablePriceShorthand',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'When enabled, formats prices with Japanese shorthand (万/億). Example: 5,000,000円 → 500万円',
                  },
                },
              ],
            },
            {
              name: 'currency',
              type: 'group',
              fields: [
                {
                  name: 'code',
                  type: 'select',
                  defaultValue: 'JPY',
                  options: [
                    { label: 'USD ($)', value: 'USD' },
                    { label: 'JPY (¥)', value: 'JPY' },
                  ],
                },
                {
                  name: 'showDecimals',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Only applies when currency code is USD.',
                  },
                },
              ],
            },
            {
              name: 'defaults',
              type: 'group',
              fields: [
                {
                  name: 'richSummaryBullets',
                  type: 'array',
                  maxRows: 4,
                  fields: [
                    {
                      name: 'bullet',
                      type: 'text',
                      required: true,
                    },
                  ],
                  defaultValue: [
                    { bullet: 'プレミアムドメインは信頼性と権威を即座に確立します。' },
                    { bullet: '覚えやすい名前はダイレクトトラフィックとコンバージョンを向上させます。' },
                  ],
                },
                {
                  name: 'useCases',
                  type: 'array',
                  maxRows: 4,
                  fields: [
                    {
                      name: 'useCase',
                      type: 'text',
                      required: true,
                    },
                  ],
                  defaultValue: [
                    { useCase: '新商品・サービスのブランドローンチに。' },
                    { useCase: '検索トラフィックをメインサイトにリダイレクト。' },
                  ],
                },
              ],
            },
            {
              name: 'contactForm',
              type: 'group',
              fields: [
                {
                  name: 'enableContactForm',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'formTemplate',
                  type: 'relationship',
                  relationTo: 'forms',
                  admin: {
                    condition: (_, siblingData) => Boolean(siblingData?.enableContactForm),
                  },
                },
                {
                  name: 'formHeading',
                  type: 'text',
                  defaultValue: 'オーナーに連絡',
                  admin: {
                    condition: (_, siblingData) => Boolean(siblingData?.enableContactForm),
                  },
                },
                {
                  name: 'formDescription',
                  type: 'textarea',
                  defaultValue: 'ご質問やオファーをお送りください。1営業日以内にご連絡いたします。',
                  admin: {
                    condition: (_, siblingData) => Boolean(siblingData?.enableContactForm),
                  },
                },
              ],
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

export default DomainPortfolioSettings
