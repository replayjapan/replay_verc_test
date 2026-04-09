import type { Payload } from 'payload'

export async function seedVideoItems(payload: Payload): Promise<void> {
  payload.logger.info('— Seeding video items...')

  // 1. ウェブ開発入門 — tutorial
  await payload.create({
    collection: 'videos',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'ウェブ開発入門',
      slug: 'web-development-introduction',
      _status: 'published',
      description:
        'ウェブ開発の基本概念を解説する入門チュートリアル。HTML、CSS、JavaScriptの役割と関係性について学びます。',
      videoUrl: 'https://www.youtube.com/watch?v=qaB5HF4ax9M',
      duration: '15:30',
      videoType: 'tutorial',
      publishedAt: '2025-03-10T10:00:00.000Z',
      searchExcerpt: 'ウェブ開発の基本を学ぶ入門チュートリアル。',
      searchKeywords: 'ウェブ開発、入門、HTML、CSS、JavaScript',
      meta: {
        title: 'ウェブ開発入門 — 基本概念チュートリアル',
        description:
          'ウェブ開発の基本概念を解説する入門チュートリアル。初心者向けの内容です。',
      },
    },
  })

  // 2. フロントエンド開発の基礎 — tutorial
  await payload.create({
    collection: 'videos',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'フロントエンド開発の基礎',
      slug: 'frontend-development-basics',
      _status: 'published',
      description:
        'フロントエンド開発に必要な基礎知識を紹介するチュートリアル。コンポーネント設計やレスポンシブデザインの考え方を解説します。',
      videoUrl: 'https://www.youtube.com/watch?v=5DP0az1q_8M',
      duration: '22:45',
      videoType: 'tutorial',
      publishedAt: '2025-04-15T09:00:00.000Z',
      searchExcerpt: 'フロントエンド開発の基礎知識を紹介するチュートリアル。',
      searchKeywords: 'フロントエンド、コンポーネント、レスポンシブ、基礎',
      meta: {
        title: 'フロントエンド開発の基礎 — コンポーネント設計入門',
        description:
          'フロントエンド開発の基礎知識を紹介。コンポーネント設計やレスポンシブデザインを解説します。',
      },
    },
  })

  // 3. CMS開発の実践ガイド — tutorial
  await payload.create({
    collection: 'videos',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'CMS開発の実践ガイド',
      slug: 'cms-development-guide',
      _status: 'published',
      description:
        'ヘッドレスCMSを活用したサイト構築の実践的なガイド。コンテンツモデリングやAPI連携のポイントを解説します。',
      videoUrl: 'https://www.youtube.com/watch?v=8TZMtslA3UY',
      duration: '31:20',
      videoType: 'tutorial',
      publishedAt: '2025-06-01T14:00:00.000Z',
      searchExcerpt: 'ヘッドレスCMSを活用したサイト構築の実践ガイド。',
      searchKeywords: 'CMS、ヘッドレス、コンテンツモデリング、API',
      meta: {
        title: 'CMS開発の実践ガイド — ヘッドレスCMS活用術',
        description:
          'ヘッドレスCMSを活用したサイト構築について、コンテンツモデリングやAPI連携を解説する実践ガイド。',
      },
    },
  })

  // 4. 日本語ウェブデザインの特徴 — presentation
  await payload.create({
    collection: 'videos',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: '日本語ウェブデザインの特徴',
      slug: 'japanese-web-design-features',
      _status: 'published',
      description:
        '日本語タイポグラフィとウェブデザインの特徴について解説するプレゼンテーション。文字組みや縦書き対応の課題を紹介します。',
      videoUrl: 'https://www.youtube.com/watch?v=z0V7SLJ26eQ',
      duration: '18:15',
      videoType: 'presentation',
      publishedAt: '2025-07-20T11:00:00.000Z',
      searchExcerpt: '日本語タイポグラフィとウェブデザインの特徴を解説。',
      searchKeywords: '日本語、タイポグラフィ、ウェブデザイン、文字組み',
      meta: {
        title: '日本語ウェブデザインの特徴 — タイポグラフィと文字組み',
        description:
          '日本語タイポグラフィとウェブデザインの特徴を解説するプレゼンテーション。',
      },
    },
  })

  // 5. モダンウェブアーキテクチャ概論 — webinar
  await payload.create({
    collection: 'videos',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'モダンウェブアーキテクチャ概論',
      slug: 'modern-web-architecture-overview',
      _status: 'published',
      description:
        'モダンウェブアーキテクチャの全体像を俯瞰するウェビナー。JAMstack、マイクロサービス、エッジコンピューティングなどのトレンドを紹介します。',
      videoUrl: 'https://www.youtube.com/watch?v=qwEKpbEjUHY',
      duration: '45:00',
      videoType: 'webinar',
      publishedAt: '2025-09-05T15:00:00.000Z',
      searchExcerpt: 'モダンウェブアーキテクチャの全体像を俯瞰するウェビナー。',
      searchKeywords: 'アーキテクチャ、JAMstack、マイクロサービス、ウェビナー',
      meta: {
        title: 'モダンウェブアーキテクチャ概論 — 最新トレンド解説',
        description:
          'モダンウェブアーキテクチャの全体像を俯瞰するウェビナー。最新トレンドを紹介します。',
      },
    },
  })

  payload.logger.info('— Seeded 5 video items')
}
