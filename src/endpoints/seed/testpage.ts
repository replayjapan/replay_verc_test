import type { RequiredDataFromCollectionSlug } from 'payload'

type TestpageArgs = {
  teamImageId: number
  ogImageId: number
  portraitImageId: number
  aboutPageId: number
  homePageId: number
}

export const testpage: (args: TestpageArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  teamImageId,
  ogImageId,
  portraitImageId,
  aboutPageId,
  homePageId,
}) => {
  return {
    slug: 'testpage',
    _status: 'published',
    title: 'rePlay特徴',
    layout: [
      // Block 1: HeroCarousel
      {
        blockType: 'heroCarousel',
        useSharedContent: true,
        textAlignment: 'center',
        height: 'standard',
        showArrows: true,
        slides: [{ image: teamImageId }],
        sharedContent: {
          title: 'rePlay: 東京発のデジタルチーム',
          description: '情熱を持って、人々のために創る',
          primaryLink: { label: 'お問い合わせ', type: 'external', externalUrl: '/contact' },
          secondaryLink: { label: 'rePlayについて', type: 'external', externalUrl: '/about' },
        },
      },
      // Block 2: ActionCardGrid
      {
        blockType: 'actionCardGrid',
        sectionHeading: '株式会社テクノフューチャー',
        sectionSubtitle: '多くの企業様にご利用いただいています',
        columns: '3',
        cardStyle: 'bordered',
        sectionAlignment: 'center',
        cardAlignment: 'center',
        sectionBackground: 'transparent',
        cards: [
          {
            mediaType: 'image',
            image: ogImageId,
            title: '株式会社テクノフューチャー',
            description:
              'ブランド価値の高いドメインへの移行により、オーガニック検索流入が40%増加しました。',
            link: {
              label: 'About rePlay',
              type: 'internal',
              internalDoc: { relationTo: 'pages', value: aboutPageId },
              newTab: false,
              nofollow: false,
              noreferrer: false,
            },
          },
          {
            mediaType: 'image',
            image: teamImageId,
            title: 'ブランド価値の高いドメインへの移行により、',
            description:
              'ブランド価値の高いドメインへの移行により、オーガニック検索流入が40%増加しました。',
            link: {
              label: 'Home is here',
              type: 'internal',
              internalDoc: { relationTo: 'pages', value: homePageId },
              newTab: false,
              nofollow: false,
              noreferrer: false,
            },
          },
          {
            mediaType: 'image',
            image: portraitImageId,
            title: 'ブランド価値の高いドメインへの移行により、',
            description:
              'ブランド価値の高いドメインへの移行により、オーガニック検索流入が40%増加しました。',
            link: {
              label: 'Another',
              type: 'internal',
              internalDoc: { relationTo: 'pages', value: aboutPageId },
              newTab: false,
              nofollow: false,
              noreferrer: false,
            },
          },
        ],
      },
      // Block 3: MetricsBar (split mode)
      {
        blockType: 'metricsBar',
        mode: 'split',
        sectionHeading: '案件専門！！',
        background: 'light-gray',
        abbreviate: false,
        bigNumber: 428,
        bigNumberSuffix: '万案件',
        bigNumberAlignment: 'center',
        contentHeading: 'We get stuff done',
        contentText:
          'ブランド価値の高いドメインへの移行により、オーガニック検索流入が40%増加しました。',
        contentImage: portraitImageId,
        contentSubtext: 'Yup us',
      },
      // Block 4: Notice
      {
        blockType: 'notice',
        variant: 'info',
        useCustomStyle: false,
        title: 'ドメイン移管について',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'ドメインの移管には通常5〜7営業日かかります。移管手続き中はDNS設定の変更はお控えください。',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        dismissible: false,
      },
      // Block 5: Accordion
      {
        blockType: 'accordion',
        sectionHeading: 'よくある質問',
        sectionSubtitle: 'ドメイン取引に関する一般的なご質問にお答えします',
        allowMultipleOpen: true,
        defaultFirstOpen: true,
        background: 'transparent',
        items: [
          {
            title: 'ドメインの移管にはどのくらい時間がかかりますか？',
            category: 'ドメインに関するFAQ',
            content: {
              root: {
                type: 'root',
                children: [{ type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'ドメインの移管は通常5〜7営業日で完了します。国際ドメインの場合、レジストラによっては最大14日かかることがあります。移管手続き中はDNS設定の変更を控えていただくようお願いしております。移管が完了すると、新しいレジストラの管理画面からDNS設定やWhois情報の管理が可能になります。なお、移管には認証コード（Auth Code）が必要となりますので、現在のレジストラから事前に取得しておいてください。移管費用はドメインの種類によって異なりますが、通常は1年分の更新料金が含まれます。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 }],
                direction: 'ltr', format: '', indent: 0, version: 1,
              },
            },
            defaultOpen: false,
          },
          {
            title: '支払い方法にはどのようなものがありますか？',
            category: '取引に関するFAQ',
            content: {
              root: {
                type: 'root',
                children: [{ type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'クレジットカード（Visa、Mastercard、JCB）、銀行振込、PayPalに対応しています。高額ドメインの場合はエスクローサービスもご利用いただけます。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 }],
                direction: 'ltr', format: '', indent: 0, version: 1,
              },
            },
            defaultOpen: false,
          },
        ],
      },
      // Block 6: Tabs
      {
        blockType: 'tabs',
        sectionHeading: 'サービス内容',
        headingAlignment: 'center',
        tabAlignment: 'left',
        tabStyle: 'underline',
        background: 'transparent',
        tabs: [
          {
            tabLabel: 'ドメイン取引',
            tabContent: {
              root: {
                type: 'root',
                children: [{ type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'プレミアムドメインの取引仲介サービスを提供しています。国内外のドメイン市場に精通した専門スタッフが、最適な条件でのお取引をサポートします。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 }],
                direction: 'ltr', format: '', indent: 0, version: 1,
              },
            },
          },
          {
            tabLabel: 'ドメイン管理',
            tabContent: {
              root: {
                type: 'root',
                children: [{ type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'DNS設定、Whois情報管理、自動更新設定など、ドメインの包括的な管理サービスを提供。複数ドメインの一括管理にも対応しています。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 }],
                direction: 'ltr', format: '', indent: 0, version: 1,
              },
            },
          },
          {
            tabLabel: 'コンサルティング',
            tabContent: {
              root: {
                type: 'root',
                children: [{ type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'ドメイン投資戦略、ブランド保護、ポートフォリオ最適化など、ドメインに関するあらゆるご相談に対応。業界15年以上の経験を持つコンサルタントがサポートします。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 }],
                direction: 'ltr', format: '', indent: 0, version: 1,
              },
            },
          },
        ],
      },
      // Block 7: ImageGallery
      {
        blockType: 'imageGallery',
        sectionHeading: 'チームギャラリー',
        columns: '3',
        aspectRatio: '16:9',
        gap: 'normal',
        captionAlignment: 'center',
        lightbox: true,
        images: [
          { image: ogImageId },
          { image: teamImageId },
          { image: portraitImageId },
        ],
      },
    ],
    searchExcerpt: 'rePlayの特徴とサービスを紹介するテストページ。各種ブロックのデモンストレーション。',
    searchKeywords: 'テスト、特徴、ブロック、デモ',
    meta: {},
  }
}
