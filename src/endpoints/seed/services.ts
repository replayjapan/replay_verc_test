import type { Payload } from 'payload'

import { toLexicalParagraphs } from '@/utilities/toLexicalJSON'

/**
 * Seed service categories and 4 services matching the showcase design.
 * Services: プロジェクト開発, デジタルマーケティング, ドメインポートフォリオ管理, ツール・フレームワーク開発
 */
export async function seedServices(
  payload: Payload,
  catalogImages: Record<string, number>,
): Promise<{ serviceIds: number[] }> {
  payload.logger.info('— Seeding service categories...')

  const devCat = await payload.create({
    collection: 'service-categories',
    data: { name: 'Development', slug: 'development', description: '開発・技術' },
    context: { disableRevalidate: true },
  })

  const marketingCat = await payload.create({
    collection: 'service-categories',
    data: { name: 'Marketing', slug: 'marketing', description: 'マーケティング' },
    context: { disableRevalidate: true },
  })

  payload.logger.info('— Seeding 4 services...')

  // 1. プロジェクト開発
  const development = await payload.create({
    collection: 'services',
    data: {
      title: 'プロジェクト開発',
      slug: 'development',
      sortOrder: 1,
      icon: 'code',
      category: devCat.id,
      featuredImage: catalogImages['glass-building-2'] ?? undefined,
      description: toLexicalParagraphs([
        'rePlayのプロジェクト開発は、丁寧なヒアリングから始まります。クライアントが抱える課題を正確に理解し、必要な機能を過不足なく設計することで、使いやすく、長期的に運用できるシステムを構築します。',
        '技術選定では、プロジェクトの規模と要件に最適なアーキテクチャを提案します。流行りの技術を追うのではなく、保守性と拡張性を重視した実用的な判断を行います。Next.js、Payload CMS、TypeScriptを中心とした技術スタックで、モダンなWebアプリケーションを構築します。',
        '開発後の運用・保守も継続的にサポートします。小規模な開発体制だからこそ、担当者が変わらず、プロジェクトの文脈を深く理解した対応が可能です。',
      ]),
      listingDescription:
        'Webアプリケーション・業務システムの設計・開発から運用まで、クライアントの課題に合わせたソリューションを構築します。小規模ながら、確実な品質管理と柔軟な対応力で、信頼されるシステムをお届けします。',
      deliverables: [
        { title: 'Webアプリケーション設計・開発', description: 'ビジネス要件に基づいたフルスタック開発。管理画面からフロントエンドまで一貫して対応します。' },
        { title: '業務システム・API設計', description: '社内業務の効率化や外部サービスとの連携を実現するAPI設計・構築を行います。' },
        { title: 'モバイル対応・レスポンシブ開発', description: 'あらゆるデバイスで快適に使えるインターフェースを設計・実装します。' },
        { title: '運用・保守サポート', description: 'リリース後のバグ修正、機能追加、セキュリティアップデートまで継続的にサポートします。' },
      ],
      authoritySection: {
        heading: '開発の進め方',
        items: [
          { label: '01', value: '要件定義・設計 — 事業目標を理解した上で、必要な機能と技術要件を整理。無駄のない設計を行います。' },
          { label: '02', value: '開発・テスト — 段階的な開発とテストを繰り返し、品質を保ちながら着実に進めます。' },
          { label: '03', value: '運用・改善 — リリース後も継続的にサポート。利用状況に応じた改善提案を行います。' },
        ],
      },
      ctaHeading: '開発のご相談',
      ctaText: 'プロジェクトの要件整理からお手伝いします。お気軽にご相談ください。',
      link_text: '詳しく見る',
      link_url: '/services/development',
      searchExcerpt: 'Webアプリケーション・業務システムの設計から運用まで一貫した開発支援。',
      searchKeywords: '開発、Webアプリ、システム、API、Next.js、Payload CMS',
      meta: {
        title: 'プロジェクト開発 | rePlay合同会社',
        description: 'クライアントの課題に合わせたWebアプリケーション・業務システムの設計・開発・運用を提供します。',
      },
    },
    context: { disableRevalidate: true },
  })

  // 2. デジタルマーケティング
  const marketing = await payload.create({
    collection: 'services',
    data: {
      title: 'デジタルマーケティング',
      slug: 'marketing',
      sortOrder: 2,
      icon: 'barchart',
      category: marketingCat.id,
      featuredImage: catalogImages['paint-splash-light'] ?? undefined,
      description: toLexicalParagraphs([
        '効果的なマーケティングは、正確なデータ分析から始まります。rePlayでは、アクセス解析やユーザー行動データをもとに、クライアントの事業に最適な戦略を策定します。感覚的な判断ではなく、数値に裏付けられた施策を提案します。',
        'コンテンツマーケティングでは、ターゲットとなるユーザーが本当に求めている情報を見極め、質の高いコンテンツを制作します。SEO対策とユーザー体験の両立を意識し、検索流入の獲得からコンバージョンまでの導線を設計します。',
        '施策の実行後は、定期的な効果測定と改善提案を行います。PDCAサイクルを着実に回すことで、長期的な事業成長を支援します。',
      ]),
      listingDescription:
        'データに基づいたマーケティング戦略の立案から実行まで、事業の成長を支援します。コンテンツ制作・分析・改善のサイクルを通じて、着実な成果につなげます。',
      deliverables: [
        { title: 'マーケティング戦略策定', description: '事業目標とターゲット分析に基づいた、実行可能なマーケティング計画を策定します。' },
        { title: 'コンテンツマーケティング', description: 'SEOを意識した記事制作、ランディングページ最適化、メールマーケティングの運用を支援します。' },
        { title: 'アクセス解析・効果測定', description: 'Google Analyticsをはじめとした解析ツールを活用し、施策の効果を定量的に評価・レポートします。' },
        { title: 'SNS運用・広告管理', description: 'ソーシャルメディアの運用戦略策定から、リスティング広告・SNS広告の設定・最適化まで対応します。' },
      ],
      authoritySection: {
        heading: '成果を出すサイクル',
        items: [
          { label: 'P', value: 'Plan — データ分析に基づく戦略策定' },
          { label: 'D', value: 'Do — コンテンツ制作・施策の実行' },
          { label: 'C', value: 'Check — 効果測定・定量評価' },
          { label: 'A', value: 'Act — 改善提案・次の施策へ' },
        ],
      },
      ctaHeading: 'マーケティングのご相談',
      ctaText: 'データに基づいた戦略で、事業の成長をサポートします。',
      link_text: '詳しく見る',
      link_url: '/services/marketing',
      searchExcerpt: 'データドリブンなマーケティング戦略の立案から実行まで。',
      searchKeywords: 'マーケティング、データ分析、コンテンツ、SEO、SNS',
      meta: {
        title: 'デジタルマーケティング | rePlay合同会社',
        description: 'データに基づいたマーケティング戦略の立案から実行まで、事業の成長を一貫して支援します。',
      },
    },
    context: { disableRevalidate: true },
  })

  // 3. ドメインポートフォリオ管理
  const domains = await payload.create({
    collection: 'services',
    data: {
      title: 'ドメインポートフォリオ管理',
      slug: 'domains',
      sortOrder: 3,
      icon: 'globe',
      category: devCat.id,
      featuredImage: catalogImages['glass-prisms'] ?? undefined,
      description: toLexicalParagraphs([
        'rePlayでは、30以上のプレミアムドメインを戦略的に管理・運用しています。日本市場に特化したドメインポートフォリオとして、日本語ドメイン（IDN）とローマ字ドメインのセット管理を基本方針としています。',
        'ドメインの取得・管理だけでなく、事業やブランドに最適なドメイン名の選定についてもコンサルティングを提供します。新規事業の立ち上げやブランドリニューアルの際に、適切なドメイン戦略を一緒に考えます。',
        '移管手続きや取得代行もサポートしています。ドメインの技術的な管理からDNS設定まで、安全で確実な運用体制を整えます。',
      ]),
      listingDescription:
        '30以上のプレミアムドメインを戦略的に管理・運用しています。日本語ドメイン（IDN）とローマ字ドメインのセット管理を含む、きめ細かなポートフォリオ運営で、最適な名前をご提案します。',
      deliverables: [
        { title: 'プレミアムドメインの取得・管理', description: '事業に最適なドメインの調査・取得から、更新管理・DNS設定まで一括でお任せいただけます。' },
        { title: 'IDN・ローマ字セット管理', description: '日本語ドメインとローマ字ドメインをセットで管理し、ブランドの一貫性を保ちます。' },
        { title: 'ドメイン戦略コンサルティング', description: '新規事業やブランディングに合わせた最適なドメイン選定と戦略をご提案します。' },
        { title: '移管・取得サポート', description: '既存ドメインの移管手続き、新規ドメインの取得代行をスムーズに進めます。' },
      ],
      authoritySection: {
        heading: 'ポートフォリオの特徴',
        items: [
          { label: '30+', value: '管理中のプレミアムドメイン。.jp、.com を中心に、日本市場向けの厳選ポートフォリオ。' },
          { label: 'IDN', value: '日本語ドメインとローマ字ドメインのセット管理。ブランドの一貫性を維持します。' },
          { label: '戦略的', value: '単なる保有ではなく、事業価値を見据えた選定・管理を行っています。' },
        ],
      },
      ctaHeading: 'ドメインに関するご相談',
      ctaText: 'ドメインの取得・移管・管理について、お気軽にお問い合わせください。',
      link_text: '詳しく見る',
      link_url: '/services/domains',
      searchExcerpt: 'プレミアムドメインの取得・管理・移管をサポートします。',
      searchKeywords: 'ドメイン、取得、管理、移管、プレミアム、IDN',
      meta: {
        title: 'ドメインポートフォリオ管理 | rePlay合同会社',
        description: '30以上のプレミアムドメインを戦略的に管理。日本語ドメインとローマ字ドメインのセット管理を提供します。',
      },
    },
    context: { disableRevalidate: true },
  })

  // 4. ツール・フレームワーク開発
  const tools = await payload.create({
    collection: 'services',
    data: {
      title: 'ツール・フレームワーク開発',
      slug: 'tools',
      sortOrder: 4,
      icon: 'monitor',
      category: devCat.id,
      featuredImage: catalogImages['bokeh-network-2'] ?? undefined,
      description: toLexicalParagraphs([
        'rePlayでは、日々の開発業務から得られる知見をもとに、自社ツールやフレームワークの開発を行っています。繰り返し発生する作業を自動化し、開発チームが本質的な問題解決に集中できる環境を整えます。',
        '代表的な取り組みとして、PL Agentがあります。これはAIを活用した開発アシスタントフレームワークで、プロジェクト管理・コードレビュー・ドキュメント生成などの開発ワークフローを体系化・自動化するものです。実際のプロジェクトで使いながら改善を続けています。',
        'CI/CDパイプラインの構築やテスト自動化、カスタム管理ツールの開発など、開発プロセス全体の効率化に取り組んでいます。これらのツールは社内利用を前提に開発していますが、汎用的な部分はオープンソースとして公開することも検討しています。',
      ]),
      listingDescription:
        '社内の開発プロセスを効率化するツールやフレームワークを自社開発しています。PL Agentをはじめとする自動化ツールの構築で、品質と生産性の向上を実現します。',
      deliverables: [
        { title: '開発自動化ツール構築', description: '反復的な開発タスクを自動化するスクリプトやツールを構築し、生産性を向上させます。' },
        { title: 'PL Agent（AIアシスタントフレームワーク）', description: 'AIを活用したプロジェクト管理・開発支援フレームワーク。計画策定からコード生成、品質管理まで開発ライフサイクル全体をサポートします。' },
        { title: 'CI/CD・テスト自動化', description: '継続的インテグレーション・デリバリーのパイプライン構築と、自動テスト環境の整備を行います。' },
        { title: 'カスタム管理ツール開発', description: 'プロジェクト固有の要件に合わせた管理画面やダッシュボードを設計・開発します。' },
      ],
      authoritySection: {
        heading: 'PL Agent',
        body: 'AIを活用した開発アシスタントフレームワーク。プロジェクトの計画策定から実装、品質管理まで、開発ライフサイクル全体を体系化・自動化します。',
        items: [
          { label: 'マイルストーン管理', value: 'マイルストーン計画・チェックポイント管理' },
          { label: '品質レビュー', value: 'コード品質レビュー・スタイルガイド適用' },
          { label: 'ドキュメント', value: 'ドキュメント自動生成・ハンドオフ管理' },
          { label: '視覚レビュー', value: 'スクリーンショットベースの視覚レビュー' },
        ],
      },
      ctaHeading: 'ツール開発のご相談',
      ctaText: '開発プロセスの効率化やカスタムツールの構築について、ご相談を承ります。',
      link_text: '詳しく見る',
      link_url: '/services/tools',
      searchExcerpt: '開発自動化ツールやAIアシスタントフレームワークの構築。',
      searchKeywords: 'ツール、フレームワーク、自動化、PL Agent、CI/CD',
      meta: {
        title: 'ツール・フレームワーク開発 | rePlay合同会社',
        description: '開発プロセスの効率化を支える自社ツール・フレームワークの構築。PL Agentをはじめとする自動化ツール。',
      },
    },
    context: { disableRevalidate: true },
  })

  // Set heroImage on services-settings
  if (catalogImages['bokeh-network-1']) {
    await payload.updateGlobal({
      slug: 'services-settings',
      data: {
        heroImage: catalogImages['bokeh-network-1'],
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info('— Services hero image set: bokeh-network-1')
  }

  const serviceIds = [
    development.id as number,
    marketing.id as number,
    domains.id as number,
    tools.id as number,
  ]
  payload.logger.info(`— Seeded 2 service categories and 4 services`)
  return { serviceIds }
}
