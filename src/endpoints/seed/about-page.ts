import type { RequiredDataFromCollectionSlug } from 'payload'

import { markdownToLexical } from '@/utilities/markdownToLexical'

type AboutArgs = {
  portraitImageId: number
  teamImageId: number
  officeImageId: number
  sceneImageId: number
  catalogImages?: Record<string, number>
}

export const aboutPage: (args: AboutArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  catalogImages,
}) => {
  return {
    slug: 'about',
    _status: 'published',
    title: 'About rePlay',
    layout: [
      // Block 1: Hero Header with hallway-sunset image
      {
        blockType: 'heroHeader' as const,
        size: 'medium' as const,
        title: '会社概要',
        subtitle:
          'rePlay合同会社は、プロジェクト開発・デジタルマーケティング・ドメインポートフォリオ管理を軸に、デジタル事業を支援する東京の会社です。',
        headingAlignment: 'left' as const,
        ...(catalogImages?.['hallway-sunset'] ? { image: catalogImages['hallway-sunset'] } : {}),
      },
      // Block 2: Content (2-col) — editorial split with border-t value propositions
      {
        blockName: 'Editorial Split',
        blockType: 'content',
        backgroundColor: 'white',
        spacingDensity: 'spacious',
        columns: [
          {
            size: 'half',
            richText: markdownToLexical(
              '## 経験と実務で、デジタルを支える\n\nrePlay合同会社は、2021年12月に設立された開発・マーケティング会社です。Webサイトやシステムの構築、デジタルマーケティングの支援、プレミアムドメインの運用管理を中心に、事業に必要なデジタル実務を横断して扱っています。',
            ),
            enableLink: false,
            link: { label: '' },
          },
          {
            size: 'half',
            richText: markdownToLexical(
              '### 開発と運用の距離が近い\n\n相談段階の背景を保ったまま、設計から公開後の改善まで継続して対応します。\n\n### 領域をまたいで整理できる\n\nWeb制作、マーケティング、ドメイン活用を別々にせず、事業の文脈として整理します。\n\n### 少数体制で直接進める\n\n大きなチームを介さず、必要な判断を早く行いながら柔軟に進めます。',
            ),
            enableLink: false,
            link: { label: '' },
          },
        ],
      },
      // Block 3: CenteredContent — company story on light bg
      {
        blockName: 'Company Story',
        blockType: 'centeredContent',
        heading: '経験と実務で、デジタルを支える',
        subheading: '',
        content: markdownToLexical(
          'rePlay合同会社は2021年12月に設立された、プロジェクトベースの開発・マーケティング会社です。少数精鋭の体制で、クライアントとの直接的なやり取りを重視しています。大きな組織を介さず、意思決定と実行のスピードを保ちながら、柔軟にプロジェクトへ対応します。実績のある技術と地道な運用の積み重ねで、クライアントのデジタル事業を着実に前へ進めます。',
        ),
        alignment: 'left',
        width: 'full',
        backgroundColor: 'lightGray',
      },
      // Block 4: CompanyFacts — dark dl with key-value pairs
      {
        blockType: 'companyFacts' as const,
        heading: '会社概要',
        facts: [
          { label: '会社名', value: 'rePlay合同会社' },
          { label: '設立', value: '2021年12月' },
          { label: '資本金', value: '１００万円' },
          { label: '所在地', value: '〒105-0013 東京都港区浜松町2-2-15 浜松町ダイヤビル2F' },
          { label: 'TEL', value: '03-6868-5609' },
          {
            label: '事業内容',
            value:
              '• プロジェクト開発\n• デジタルマーケティング\n• ドメインポートフォリオ管理\n• ツール・フレームワーク開発',
          },
        ],
      },
      // Block 5: ClientLogos — 6-col logo grid
      {
        blockType: 'clientLogos' as const,
        heading: '主なクライアント',
        subtitle: '国内外のブランドと直接取引を重ねてきました。',
        clients: [
          { name: 'Google' },
          { name: 'Moomin' },
          { name: 'Ashley Madison' },
          { name: 'TMJ' },
          { name: 'HBH' },
          { name: 'MJS' },
        ],
      },
      // Block 6: PortfolioCards — bg-slate-50 project cards with linked domains
      {
        blockType: 'portfolioCards' as const,
        heading: '関わったプロジェクト',
        description: '構想から実装、運用まで。rePlayが設計や制作に関わったプロジェクトです。',
        projects: [
          {
            domain: 'Coopervise.com',
            url: 'https://coopervise.com',
            description: 'デジタルサービス・コンサルティング企業のWebサイト',
          },
          {
            domain: 'Salsa.jp',
            url: 'https://salsa.jp',
            description: 'ダンス・音楽コミュニティのためのプラットフォーム',
          },
          {
            domain: 'ShibuyaUniversity.com',
            url: 'https://shibuyauniversity.com',
            description: '教育・学習関連のWebプロジェクト',
          },
          {
            domain: 'London.jp',
            url: 'https://london.jp',
            description: 'ロンドンに関する日本語情報・コンテンツサイト',
          },
        ],
      },
      // Block 7: CTA — inquiry on light bg before footer
      {
        blockName: 'Inquiry CTA',
        blockType: 'cta',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'お問い合わせ', version: 1 }],
                direction: 'ltr', format: '', indent: 0, tag: 'h3', version: 1,
              },
              {
                type: 'paragraph',
                children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '事業に関するご相談をお受けしています。', version: 1 }],
                direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1,
              },
            ],
            direction: 'ltr', format: '', indent: 0, version: 1,
          },
        },
        links: [
          { link: { label: 'お問い合わせページへ', type: 'external', externalUrl: '/contact' } },
        ],
      },
    ],
    searchExcerpt: '東京拠点の小規模デジタルカンパニー。プレミアムドメイン運営とデジタルサービスを提供。',
    searchKeywords: 'rePlay、会社概要、東京、デジタルマーケティング、チーム、Coopervise',
    meta: {
      title: 'rePlayについて | rePlay合同会社 東京',
      description:
        '東京を拠点とするrePlay合同会社の会社概要。元GroupMマーケターによるデジタルサービスとプレミアムドメインポートフォリオ。',
    },
  }
}
