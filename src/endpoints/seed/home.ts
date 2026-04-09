import type { RequiredDataFromCollectionSlug } from 'payload'

type HomeArgs = {
  officeImageId: number
  teamImageId: number
  sceneImageId: number
  serviceIds?: number[]
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  officeImageId,
  teamImageId,
  sceneImageId,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    title: 'ホーム',
    layout: [
      // Block 1: Hero Header Full — carousel with 3 slides, bottom-anchored content
      {
        blockType: 'heroHeader' as const,
        size: 'full' as const,
        headingAlignment: 'left' as const,
        slides: [
          {
            image: officeImageId,
            heading: 'デジタル資産を、戦略的に。',
            subtitle:
              'rePlayは開発・マーケティング・ドメインポートフォリオを通じて、価値あるデジタルプロジェクトを構築します',
            ctaLabel: 'お問い合わせ',
            ctaUrl: '/contact',
          },
          {
            image: teamImageId,
            heading: 'プレミアムドメインの厳選管理',
            subtitle:
              '30以上の厳選ドメインを戦略的に管理。事業に最適な名前をご提案します',
            ctaLabel: 'ドメイン一覧',
            ctaUrl: '/domains',
          },
          {
            image: sceneImageId,
            heading: 'テクノロジーで、未来を設計する',
            subtitle:
              '独自フレームワーク開発からデジタル戦略まで、技術力で事業の成長を支援します',
            ctaLabel: 'サービス',
            ctaUrl: '/services',
          },
        ],
      },
      // Block 2: CapabilitiesGrid — offset heading + 2x2 items with border-l accent
      {
        blockType: 'capabilitiesGrid' as const,
        heading: '事業を支える、4つの専門領域',
        description:
          '開発からマーケティング、ドメイン管理まで。rePlay LLCは4つの専門領域を有機的に統合し、クライアントのデジタル事業を総合的に支援します。',
        items: [
          {
            title: 'プロジェクト開発',
            description:
              'Webアプリケーション・業務システムの設計から運用まで、堅牢なシステムを構築します',
          },
          {
            title: 'デジタルマーケティング',
            description:
              'データ駆動のマーケティング戦略と実行支援で、事業の成長を加速します',
          },
          {
            title: 'ドメインポートフォリオ管理',
            description:
              '30以上のプレミアムドメインの戦略的管理・提案で、最適な名前をご提供します',
          },
          {
            title: 'ツール・フレームワーク開発',
            description:
              'PL Agentをはじめとする独自開発ツールの構築で、業務効率化を実現します',
          },
        ],
      },
      // Block 3: DomainShowcase — featured domains carousel
      {
        blockName: 'Featured Domains',
        blockType: 'domainShowcase',
        sourceMode: 'featured',
        title: '厳選ドメインポートフォリオ',
        subtitle: 'rePlay LLCが管理する厳選されたプレミアムドメイン。事業ブランドに最適な名前をご提案します。',
        limit: 6,
        showViewAll: true,
      },
      // Block 4: ThesisStats — ONE seamless dark section (heading + body + stats)
      {
        blockType: 'thesisStats' as const,
        heading: '確かな実績と信頼',
        body: '2021年の設立以来、rePlay LLCは100件を超えるプロジェクトを通じてクライアントのデジタル事業を支援してきました。技術力とマーケティング知見、そして厳選されたドメインポートフォリオを武器に、長期的なパートナーシップを築いています。',
        stats: [
          { value: '2021年', label: '設立' },
          { value: '30+', label: 'ドメイン管理数' },
          { value: '100+', label: 'プロジェクト実績' },
        ],
      },
      // Block 5: CTA — inquiry invitation on light bg (before dark footer)
      {
        blockName: 'Inquiry CTA',
        blockType: 'cta',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'まずはお気軽にご相談ください', version: 1 }],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h3',
                version: 1,
              },
              {
                type: 'paragraph',
                children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'ドメインのお問い合わせはもちろん、開発・マーケティングのご相談もお待ちしております', version: 1 }],
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
        links: [
          { link: { label: 'お問い合わせ', type: 'external', externalUrl: '/contact' } },
        ],
      },
    ],
    searchExcerpt: 'プレミアム日本語ドメインポートフォリオ。厳選された.jpドメインでビジネスの成長をサポート。',
    searchKeywords: 'ドメイン、プレミアム、.jp、日本語ドメイン、rePlay',
    meta: {
      title: 'rePlay Domains | プレミアム日本語ドメイン',
      description:
        '厳選された.jpドメインポートフォリオ。ビジネスに最適なプレミアムドメインをお探しの方へ。',
    },
  }
}
