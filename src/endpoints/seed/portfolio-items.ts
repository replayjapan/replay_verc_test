import type { Payload } from 'payload'

import { toLexicalJSON } from '@/utilities/toLexicalJSON'

type SeedPortfolioArgs = {
  teamImageId: number
  officeImageId: number
  sceneImageId: number
  portraitImageId: number
  catalogImages: Record<string, number>
}

export async function seedPortfolioItems(
  payload: Payload,
  imageIds: SeedPortfolioArgs,
): Promise<void> {
  const { teamImageId, officeImageId, sceneImageId, catalogImages } = imageIds

  payload.logger.info('— Seeding portfolio items...')

  // 1. Coopervise.com — digital marketing agency site
  await payload.create({
    collection: 'portfolios',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'Coopervise.com',
      slug: 'coopervise-com',
      _status: 'published',
      client: 'Coopervise',
      summary:
        'デジタルマーケティングエージェンシーのコーポレートサイト。サービス紹介、実績紹介、お問い合わせフォームを備えた多言語対応サイト。',
      description: toLexicalJSON(
        'デジタルマーケティングエージェンシーのコーポレートサイト。サービス紹介、実績紹介、お問い合わせフォームを備えた多言語対応サイト。クライアントのブランドアイデンティティを反映したデザインと、高速なページ表示を実現するモダンなアーキテクチャを採用しています。',
      ),
      featuredImage: officeImageId,
      gallery: [
        { image: catalogImages['glass-building-2'] ?? officeImageId, caption: 'トップページ — ブランドカラーとヒーローセクション' },
        { image: catalogImages['light-trails'] ?? sceneImageId, caption: 'サービス紹介ページ — 事業領域の視覚化' },
        { image: catalogImages['paint-splash-light'] ?? teamImageId, caption: 'お問い合わせフォーム — コンバージョン最適化' },
      ],
      technologies: [
        { name: 'Next.js' },
        { name: 'Payload CMS' },
        { name: 'Tailwind CSS' },
      ],
      searchExcerpt: 'マーケティングエージェンシーのコーポレートサイト制作。多言語対応。',
      searchKeywords: 'Coopervise、コーポレートサイト、マーケティング、多言語',
      meta: {
        title: 'Coopervise.com — デジタルマーケティングエージェンシーサイト',
        description:
          'デジタルマーケティングエージェンシーCooperviseのコーポレートサイト。多言語対応のモダンなウェブサイト。',
      },
    },
  })

  // 2. Salsa.jp — dance community/event platform
  const salsaImage = catalogImages['sakura-portrait'] ?? sceneImageId
  await payload.create({
    collection: 'portfolios',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'Salsa.jp',
      slug: 'salsa-jp',
      _status: 'published',
      client: 'rePlay',
      summary:
        'サルサダンスコミュニティのためのプラットフォーム。イベント情報、教室検索、ダンサープロフィールを掲載。',
      description: toLexicalJSON(
        'サルサダンスコミュニティのためのプラットフォーム。イベント情報、教室検索、ダンサープロフィールを掲載。全国のサルサイベントやレッスン情報を一元管理し、コミュニティの活性化を支援しています。',
      ),
      featuredImage: salsaImage,
      technologies: [{ name: 'Next.js' }, { name: 'TypeScript' }],
      searchExcerpt: 'サルサダンスコミュニティ向けイベント・教室検索プラットフォーム。',
      searchKeywords: 'サルサ、ダンス、イベント、教室、コミュニティ',
      meta: {
        title: 'Salsa.jp — サルサダンスコミュニティプラットフォーム',
        description:
          'サルサダンスのイベント情報、教室検索、ダンサープロフィールを掲載するコミュニティプラットフォーム。',
      },
    },
  })

  // 3. ShibuyaUniversity.com — education platform
  const shibuyaImage = catalogImages['glass-prisms'] ?? teamImageId
  await payload.create({
    collection: 'portfolios',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'ShibuyaUniversity.com',
      slug: 'shibuya-university-com',
      _status: 'published',
      client: 'rePlay',
      summary:
        '渋谷を拠点とした教育プラットフォーム。オンラインコース、ワークショップ、コミュニティイベントの情報を提供。',
      description: toLexicalJSON(
        '渋谷を拠点とした教育プラットフォーム。オンラインコース、ワークショップ、コミュニティイベントの情報を提供。学びの場をオンラインとオフラインで結びつけ、多様な学習体験を実現しています。',
      ),
      featuredImage: shibuyaImage,
      technologies: [{ name: 'React' }, { name: 'Node.js' }],
      searchExcerpt: '渋谷発の教育プラットフォーム。コース・ワークショップ情報を提供。',
      searchKeywords: '教育、渋谷、オンラインコース、ワークショップ、プラットフォーム',
      meta: {
        title: 'ShibuyaUniversity.com — 教育プラットフォーム',
        description:
          '渋谷を拠点とした教育プラットフォーム。オンラインコースやワークショップの情報を提供。',
      },
    },
  })

  // 4. London.jp — city guide/travel portal
  const londonImage = catalogImages['light-trails']
  await payload.create({
    collection: 'portfolios',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'London.jp',
      slug: 'london-jp',
      _status: 'published',
      client: 'rePlay',
      summary:
        'ロンドンと日本をつなぐシティガイド。旅行情報、文化イベント、ビジネスディレクトリを掲載。',
      description: toLexicalJSON(
        'ロンドンと日本をつなぐシティガイド。旅行情報、文化イベント、ビジネスディレクトリを掲載。ロンドン在住の日本人やロンドンに関心を持つ方々に向けた総合情報ポータルです。',
      ),
      featuredImage: londonImage,
      technologies: [{ name: 'Next.js' }, { name: 'Payload CMS' }],
      searchExcerpt: 'ロンドンと日本をつなぐシティガイド・旅行情報ポータル。',
      searchKeywords: 'ロンドン、旅行、シティガイド、文化イベント、ビジネス',
      meta: {
        title: 'London.jp — ロンドン・日本シティガイド',
        description:
          'ロンドンと日本をつなぐシティガイド。旅行情報、文化イベント、ビジネスディレクトリを掲載するポータルサイト。',
      },
    },
  })

  payload.logger.info('— Seeded 4 portfolio items')
}
