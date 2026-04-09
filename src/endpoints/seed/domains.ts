import type { Payload } from 'payload'

import { toASCII } from '@/utilities/idn'
import { toLexicalJSON } from '@/utilities/toLexicalJSON'

type SeedDomainsArgs = {
  sceneImageId: number
  /** Image IDs from public/image-fix/ catalog, keyed by filename without extension */
  catalogImages: Record<string, number>
}

/**
 * Seed 47 domains with categories.
 * 6 are featured (A1) with full content following content governance rules.
 * 33 additional domains (A2) imported from Codex-generated content.
 * Content reality level: illustrative — describes plausible potential, not current operations.
 */
export async function seedDomains(
  payload: Payload,
  { sceneImageId, catalogImages }: SeedDomainsArgs,
): Promise<void> {
  payload.logger.info('— Seeding domain categories...')

  const categoryMap = new Map<string, number>()
  const categories = [
    'ホテル・宿泊',
    'ラグジュアリー',
    '旅行・観光',
    '音楽・エンターテインメント',
    'ファッション・スポーツ',
    '人材・ビジネス',
    'ショッピング・EC',
    'ダンス・パフォーマンス',
    'アート・クリエイティブ',
    'テクノロジー・教育',
  ]

  for (const name of categories) {
    const doc = await payload.create({
      collection: 'domain-category',
      data: { name },
      context: { disableRevalidate: true },
    })
    categoryMap.set(name, doc.id as number)
  }

  payload.logger.info('— Seeding domains...')

  const img = (key: string): number | undefined => catalogImages[key]

  const domains = [
    // ═══════════════════════════════════════════
    // FEATURED DOMAINS (6)
    // ═══════════════════════════════════════════

    // 1. アニメ.com — Trophy tier, standalone
    {
      domainName: 'アニメ.com',
      description:
        '日本が世界に広めた「アニメ」という言葉をそのままドメインにした、カテゴリーを代表するブランド資産。配信プラットフォーム、メディア、ECサイトなど、アニメ産業に関わるあらゆる事業の中核として機能し得るドメインです。日本語話者にとって直感的で、グローバル市場でも高い認知度を持つ名称です。',
      registrationDate: '2005-09-18T00:00:00.000Z',
      status: 'open' as const,
      slug: 'anime-com-idn',
      category: '音楽・エンターテインメント',
      minimumOffer: 50000000,
      featured: true,
      domainScript: 'japanese' as const,
      featuredImage: img('koi-splash'),
      idnDisplay: 'アニメ.com',
      richSummaryTitle: 'カテゴリーを定義するドメイン',
      richSummaryIntro:
        '「アニメ」は日本語から世界共通語となった数少ない言葉のひとつです。アニメ.comは、その言葉をドメインとして保有できる唯一の存在です。アニメ配信サービス、関連グッズのECサイト、ファンコミュニティ、ニュースメディアなど、アニメ産業に関わるあらゆる事業の中核ブランドとして機能する可能性を持っています。日本国内のファン層はもちろん、海外のアニメ市場へのリーチにも適しており、ブランドの信頼性と記憶性を兼ね備えています。',
      richSummaryBullets: [
        'アニメ産業全体をカバーする汎用性',
        '日本語・英語圏の両方で即座に認識される名称',
        '配信・EC・メディア・コミュニティなど多様な活用',
        'カテゴリーキーワードとしての強い訴求力',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'アニメ.comは、アニメ産業に関わるブランドや事業にとって理想的な基盤となり得るドメインです。',
      useCases: [
        'アニメ配信・ストリーミングサービス',
        'アニメグッズ・フィギュアのECサイト',
        'アニメニュース・レビューメディア',
        'ファンコミュニティ・イベントプラットフォーム',
      ],
      searchExcerpt: 'アニメ産業のブランド基盤となるカテゴリー定義ドメイン。配信・EC・メディアなど幅広い活用が可能。',
      searchKeywords: 'アニメ、anime、ドメイン、配信、メディア、エンターテインメント',
      seoTitle: 'アニメ.com — カテゴリーを代表するプレミアムドメイン',
      seoDescription: '日本発のグローバルキーワード「アニメ」のドメイン。配信・EC・メディア事業の中核ブランドに。',
      ogTitle: 'アニメ.com｜rePlay Domains',
      ogDescription: 'アニメ産業のブランド基盤となるプレミアムドメイン',
    },

    // 2. ホテルズ.com — Premium tier, Hotel .com Set member
    {
      domainName: 'ホテルズ.com',
      description:
        '日本語で「ホテルズ」と直接入力できる.comドメイン。ホテル予約サービス、宿泊比較サイト、旅行プラットフォームなど、宿泊業界のオンラインブランド構築に適しています。日本語話者にとって自然な響きを持ち、ホテル関連サービスとの結びつきが明確なドメインです。',
      registrationDate: '2006-02-02T00:00:00.000Z',
      status: 'open' as const,
      slug: 'hotels-com',
      category: 'ホテル・宿泊',
      minimumOffer: 15000000,
      featured: true,
      domainScript: 'japanese' as const,
      featuredImage: img('hallway-sunset'),
      idnDisplay: 'ホテルズ.com',
      richSummaryTitle: '宿泊ブランドのためのドメイン',
      richSummaryIntro:
        'ホテルズ.comは、日本語で「ホテルズ」と直感的に入力できる.comドメインです。ホテル予約プラットフォーム、宿泊施設の比較サイト、法人向け出張手配サービスなど、宿泊業界に関わるオンライン事業のブランド基盤として適しています。「ホテル」という日本語の複数形として自然に機能し、サービスの内容を名称だけで伝えることができます。Hotel .comセットの一部として、関連ドメインとの連携によるブランド展開も可能です。',
      richSummaryBullets: [
        'ホテル・宿泊サービスとの直接的な関連性',
        '日本語入力で自然にアクセスできる利便性',
        '.comの国際的な信頼性',
        'Hotel .comセットとしてのブランド展開',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ホテルズ.comは、宿泊・旅行業界でブランドを構築したい事業者に適したドメインです。',
      useCases: [
        'ホテル予約・比較プラットフォーム',
        '旅行代理店のオンライン窓口',
        '法人向け出張手配サービス',
        '宿泊施設レビュー・ガイドメディア',
      ],
      searchExcerpt: '日本語で直感的に入力できるホテル予約ドメイン。宿泊業界のオンラインブランド構築に最適。',
      searchKeywords: 'ホテルズ、ホテル、予約、宿泊、hotels、旅行',
      seoTitle: 'ホテルズ.com — 宿泊ブランドのためのプレミアムドメイン',
      seoDescription: '日本語入力対応の.comホテルドメイン。予約サイト・比較サービス・旅行プラットフォームの基盤に。',
      ogTitle: 'ホテルズ.com｜rePlay Domains',
      ogDescription: '宿泊業界のオンラインブランド構築に適したプレミアムドメイン',
    },

    // 3. princess.jp — Niche tier, standalone (no IDN pair)
    {
      domainName: 'princess.jp',
      description:
        '「プリンセス」というブランドイメージを.jpドメインで直接表現できる、ライフスタイル・ファッション領域に適したドメイン。女性向けブランド、キッズ向けプロダクト、ウェディング、ジュエリーなど、エレガンスや特別感を打ち出したい事業に自然にフィットします。短く覚えやすい英単語で、日本市場でも広く認知されています。',
      registrationDate: '2008-07-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'princess-jp',
      category: 'ラグジュアリー',
      minimumOffer: 10000000,
      featured: true,
      domainScript: 'latin' as const,
      featuredImage: img('sakura-portrait'),
      richSummaryTitle: 'エレガンスを表現するドメイン',
      richSummaryIntro:
        'princess.jpは、「プリンセス」という世界共通のブランドイメージを日本の.jpドメインで表現できる資産です。女性向けファッション、ジュエリー、ウェディングサービス、キッズブランドなど、特別感やエレガンスを重視する事業に自然にフィットします。「princess」は日本語としても定着した英単語であり、ターゲット層に直感的に響く名称です。個別でのお問い合わせが可能なドメインのため、単独での活用に適しています。',
      richSummaryBullets: [
        '女性向け・キッズ向けブランドとの高い親和性',
        '日本語圏でも認知度の高い英単語',
        '.jpの国内信頼性とブランド力',
        '個別お問い合わせ対応ドメイン',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'princess.jpは、エレガンスや特別感を打ち出したいブランドに適したドメインです。',
      useCases: [
        '女性向けファッション・コスメブランド',
        'ウェディング・ブライダルサービス',
        'キッズ向けプロダクト・エンターテインメント',
        'ジュエリー・アクセサリーブランド',
      ],
      searchExcerpt: 'エレガンスと特別感を表現する.jpドメイン。ファッション・ウェディング・キッズブランドに最適。',
      searchKeywords: 'princess、プリンセス、ファッション、ウェディング、ブランド、ジュエリー',
      seoTitle: 'princess.jp — エレガンスを表現するプレミアムドメイン',
      seoDescription: 'ファッション・ウェディング・キッズブランドに適した.jpドメイン。プリンセスの世界観をオンラインで。',
      ogTitle: 'princess.jp｜rePlay Domains',
      ogDescription: 'エレガンスと特別感を持つプレミアム.jpドメイン',
    },

    // 4. honolulu.jp — Geographic set, Honolulu/Waikiki Set
    {
      domainName: 'honolulu.jp',
      description:
        'ハワイの州都ホノルルの名を持つ.jpドメイン。日本人旅行者向けのハワイ情報サイト、現地ツアー会社、不動産、ウェディングサービスなど、ホノルルと日本をつなぐ事業に適しています。日本人旅行者にとって馴染み深い地名であり、地名ドメインとしてのブランド価値が明確です。',
      registrationDate: '2023-05-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'honolulu-jp',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: true,
      domainScript: 'latin' as const,
      featuredImage: img('origami-ocean'),
      richSummaryTitle: 'ハワイと日本をつなぐドメイン',
      richSummaryIntro:
        'honolulu.jpは、ハワイ・ホノルルの地名を.jpドメインで展開できる地域ブランドです。日本人旅行者向けのハワイ情報ポータル、現地ツアー・アクティビティの予約サービス、ハワイ不動産の情報サイト、ウェディング・ハネムーン企画など、ホノルルに関わる事業のオンラインプレゼンスに適しています。Honolulu/Waikikiセットの一部として、関連ドメインとの組み合わせによるブランド展開も想定できます。',
      richSummaryBullets: [
        '日本人旅行者市場との強い関連性',
        'ハワイ関連事業のブランド基盤',
        '地名ドメインとしての明確な位置づけ',
        'Honolulu/Waikikiセットとの連携',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'honolulu.jpは、ハワイと日本の接点を持つ事業に適したドメインです。',
      useCases: [
        '日本人向けハワイ旅行情報サイト',
        '現地ツアー・アクティビティ予約',
        'ハワイ不動産・移住情報',
        'ウェディング・ハネムーンサービス',
      ],
      searchExcerpt: 'ハワイ・ホノルルの地名を持つ.jpドメイン。日本人旅行者向けサービスのブランド基盤に。',
      searchKeywords: 'ホノルル、ハワイ、honolulu、hawaii、旅行、観光、ウェディング',
      seoTitle: 'honolulu.jp — ハワイと日本をつなぐプレミアムドメイン',
      seoDescription: 'ハワイ・ホノルルの地名ドメイン。旅行情報、不動産、ウェディングなどハワイ関連事業に。',
      ogTitle: 'honolulu.jp｜rePlay Domains',
      ogDescription: 'ハワイと日本をつなぐ地域ブランドドメイン',
    },

    // 5. london.jp — Geographic set, London Set (has IDN pair ロンドン.jp)
    {
      domainName: 'london.jp',
      description:
        'イギリスの首都ロンドンの名を持つ.jpドメイン。日本人向けのロンドン旅行ガイド、留学支援、ビジネス情報、文化交流メディアなど、ロンドンと日本をつなぐ事業のオンラインプレゼンスに適しています。ロンドン.jpとのセットで、日英両方のアクセスパターンをカバーできます。',
      registrationDate: '2016-12-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'london-jp',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: true,
      domainScript: 'latin' as const,
      featuredImage: img('light-trails'),
      richSummaryTitle: 'ロンドンと日本の架け橋となるドメイン',
      richSummaryIntro:
        'london.jpは、イギリスの首都ロンドンの名を日本の.jpドメインで展開できるブランド資産です。日本人旅行者向けのロンドン情報ポータル、留学・語学研修の支援サイト、日英ビジネス情報、文化交流メディアなど、ロンドンと日本の接点を持つ事業に適しています。IDNペアのロンドン.jpと組み合わせることで、英字入力・日本語入力のどちらからもアクセスできるブランド基盤を構築できます。Londonセットとしてのセット販売となります。',
      richSummaryBullets: [
        '日英文化・ビジネス交流のブランド基盤',
        'ロンドン.jpとのIDNペアでアクセス網を拡大',
        '旅行・留学・ビジネスの多角的な活用',
        'Londonセットとしてのセット販売',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'london.jpは、ロンドンに関わる日本語圏のオンライン事業に適したドメインです。',
      useCases: [
        '日本人向けロンドン旅行ガイド',
        '留学・語学研修の案内サイト',
        '日英ビジネスディレクトリ',
        '文化交流・イベント情報メディア',
      ],
      searchExcerpt: 'ロンドンの地名を持つ.jpドメイン。旅行・留学・ビジネスなど日英交流の事業基盤に。',
      searchKeywords: 'ロンドン、london、イギリス、旅行、留学、ビジネス',
      seoTitle: 'london.jp — ロンドンと日本をつなぐプレミアムドメイン',
      seoDescription: 'ロンドンの地名ドメイン。旅行・留学・ビジネス情報など日英交流のオンライン基盤に。',
      ogTitle: 'london.jp｜rePlay Domains',
      ogDescription: 'ロンドンと日本の文化・ビジネス交流ドメイン',
    },

    // 6. diamonds.jp — Premium tier, Diamonds Set
    {
      domainName: 'diamonds.jp',
      description:
        '「ダイヤモンド」を英語で表現した.jpドメイン。ジュエリーブランド、婚約指輪・結婚指輪の専門サイト、宝石鑑定サービス、ラグジュアリーギフトなど、高級感と信頼性が求められるオンラインブランドに適しています。短く明快な英単語で、日本市場でも高い認知度を持つドメインです。',
      registrationDate: '2024-01-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'diamonds-jp',
      category: 'ラグジュアリー',
      minimumOffer: 15000000,
      featured: true,
      domainScript: 'latin' as const,
      featuredImage: img('glass-prisms'),
      richSummaryTitle: 'ラグジュアリーブランドのためのドメイン',
      richSummaryIntro:
        'diamonds.jpは、「ダイヤモンド」という普遍的な高級イメージを.jpドメインで表現できるブランド資産です。ジュエリーブランドのECサイト、婚約指輪・結婚指輪の専門サイト、宝石鑑定・買取サービス、ラグジュアリーギフトのオンラインショップなど、高級感と信頼性を重視する事業に適しています。「diamonds」は日本語圏でも広く理解される英単語であり、ブランドの格を名称だけで伝えることができます。Diamondsセットの一部として、関連ドメインとのブランド展開も可能です。',
      richSummaryBullets: [
        'ジュエリー・高級品市場との直接的な関連性',
        '高級感と信頼性を名称で即座に表現',
        '.jpの国内ブランド力との組み合わせ',
        'Diamondsセットとしてのブランド展開',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'diamonds.jpは、ラグジュアリー市場でオンラインプレゼンスを構築したい事業者に適したドメインです。',
      useCases: [
        'ジュエリーブランドのECサイト',
        '婚約指輪・結婚指輪の専門サイト',
        '宝石鑑定・買取サービス',
        'ラグジュアリーギフトのオンラインショップ',
      ],
      searchExcerpt: 'ジュエリー・高級品ブランドのための.jpドメイン。婚約指輪・宝石鑑定・ラグジュアリーギフトに。',
      searchKeywords: 'diamonds、ダイヤモンド、ジュエリー、婚約指輪、宝石、ラグジュアリー',
      seoTitle: 'diamonds.jp — ラグジュアリーブランドのためのプレミアムドメイン',
      seoDescription: 'ダイヤモンドの名を持つ.jpドメイン。ジュエリー・婚約指輪・高級品ブランドのオンライン基盤に。',
      ogTitle: 'diamonds.jp｜rePlay Domains',
      ogDescription: 'ラグジュアリー市場のオンラインブランドドメイン',
    },

    // ═══════════════════════════════════════════
    // NON-FEATURED DOMAINS (9)
    // ═══════════════════════════════════════════

    {
      domainName: 'boston.jp',
      description:
        'ボストンの地名を.jpドメインで展開できるブランド資産。日本人旅行者向けの観光情報、教育・留学支援、ビジネスディレクトリなど、ボストンと日本をつなぐ事業に適したドメインです。',
      registrationDate: '2011-11-08T00:00:00.000Z',
      status: 'open' as const,
      slug: 'boston-jp',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'latin' as const,
      featuredImage: sceneImageId,
      richSummaryTitle: 'ボストンと日本をつなぐドメイン',
      richSummaryIntro:
        'boston.jpは、米国ボストンの地名を.jpドメインで展開できるブランド資産です。MIT・ハーバードなど名門大学が集まる学術都市との接点を持つ事業に適しています。',
      richSummaryBullets: ['観光情報', '教育・留学支援', 'ビジネスディレクトリ', 'イベント情報'],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary: 'boston.jpは、ボストンと日本の接点を持つ事業に適したドメインです。',
      useCases: ['観光案内', '教育ポータル', 'ビジネスディレクトリ', '不動産情報'],
      seoTitle: 'boston.jp — ボストン地名ドメイン',
      seoDescription: 'ボストンの地名を持つ.jpドメイン。観光・教育・ビジネス情報に。',
      ogTitle: 'boston.jp｜rePlay Domains',
      ogDescription: 'ボストンと日本をつなぐ地域ドメイン',
      searchExcerpt: 'ボストンの地名を持つ.jpドメイン。観光・教育・ビジネスの事業基盤に。',
    },
    {
      domainName: 'ボストン.jp',
      description:
        'ボストンの日本語表記をドメインにした、日本語話者に自然なIDNドメイン。在住日本人向けの生活情報、コミュニティ、教育相談など地域密着のサービスに適しています。',
      registrationDate: '2006-01-02T00:00:00.000Z',
      status: 'open' as const,
      slug: 'boston-jp-ja',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ボストン.jp',
      richSummaryTitle: 'ボストン日本語ドメイン',
      richSummaryIntro:
        'ボストン.jpは、日本語入力で直接アクセスできるIDNドメインです。在住日本人向けの生活情報サイトやコミュニティの基盤に適しています。',
      richSummaryBullets: ['日本語入力対応', '在住日本人向け', 'コミュニティ基盤', '生活情報'],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary: 'ボストン.jpは、日本語ドメインとして在住日本人コミュニティに適しています。',
      useCases: ['日本人向けサービス', '生活情報', 'コミュニティサイト', '教育相談'],
      seoTitle: 'ボストン.jp — 日本語IDNドメイン',
      seoDescription: 'ボストン在住日本人のための日本語ドメイン',
      ogTitle: 'ボストン.jp｜rePlay Domains',
      ogDescription: '在住日本人向けの日本語ドメイン',
      searchExcerpt: '日本語入力対応のボストンIDNドメイン。在住日本人コミュニティの基盤に。',
    },
    {
      domainName: 'ロンドン.jp',
      description:
        'ロンドンの日本語表記をドメインにしたIDNドメイン。在英日本人の生活情報、コミュニティ、ビジネスネットワークの基盤に適しています。london.jpとのペアでLondonセットを構成します。',
      registrationDate: '2023-05-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'london-jp-ja',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ロンドン.jp',
      richSummaryTitle: 'ロンドン日本語ドメイン',
      richSummaryIntro:
        'ロンドン.jpは、日本語入力でアクセスできるIDNドメインです。london.jpとのペアで、在英日本人コミュニティや文化交流のブランド基盤となります。',
      richSummaryBullets: ['london.jpとのIDNペア', '在英日本人向け', 'コミュニティ基盤', '日英文化交流'],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary: 'ロンドン.jpは、在英日本人コミュニティ向けのブランドドメインです。',
      useCases: ['日本人向けサービス', '現地情報', 'コミュニティ', '移住支援'],
      seoTitle: 'ロンドン.jp — 日本語IDNドメイン',
      seoDescription: 'ロンドン在住日本人のための日本語ドメイン',
      ogTitle: 'ロンドン.jp｜rePlay Domains',
      ogDescription: '在英日本人の日本語ドメイン',
      searchExcerpt: '日本語入力対応のロンドンIDNドメイン。在英日本人コミュニティの基盤に。',
    },
    {
      domainName: 'rome.jp',
      description:
        'ローマの地名を.jpドメインで展開できるブランド資産。日本人旅行者向けのイタリア旅行情報、グルメガイド、文化交流メディアに適したドメインです。',
      registrationDate: '2007-07-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'rome-jp',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: 'ローマと日本をつなぐドメイン',
      richSummaryIntro:
        'rome.jpは、永遠の都ローマの地名を日本の.jpドメインで展開できる地域ブランドです。日本人旅行者向けの情報発信に適しています。',
      richSummaryBullets: ['観光情報', 'グルメガイド', '美術館案内', 'イベント情報'],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary: 'rome.jpは、イタリア旅行関連の事業に適したドメインです。',
      useCases: ['観光案内', 'ホテル予約', 'レストランガイド', 'ツアー企画'],
      seoTitle: 'rome.jp — ローマ地名ドメイン',
      seoDescription: 'ローマの地名を持つ.jpドメイン。旅行・グルメ・文化情報に。',
      ogTitle: 'rome.jp｜rePlay Domains',
      ogDescription: 'ローマと日本をつなぐ地域ドメイン',
      searchExcerpt: 'ローマの地名を持つ.jpドメイン。イタリア旅行情報・グルメガイドに。',
    },
    {
      domainName: '海外ホテル.jp',
      description:
        '「海外ホテル」という検索意図を直接表現するIDNドメイン。海外宿泊施設の予約サービスや比較サイトのブランド基盤に適しています。',
      registrationDate: '2006-02-02T00:00:00.000Z',
      status: 'open' as const,
      slug: 'kaigai-hotel-jp',
      category: 'ホテル・宿泊',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: '海外ホテル.jp',
      richSummaryTitle: '海外宿泊サービスのドメイン',
      richSummaryIntro:
        '海外ホテル.jpは、「海外ホテル」という明確なキーワードをドメインに持つIDN資産です。海外宿泊の予約・比較サービスに適しています。',
      richSummaryBullets: ['キーワードドメイン', '海外宿泊との直接的関連', '日本語入力対応', 'Hotel .comセット連携'],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary: '海外ホテル.jpは、海外宿泊サービスのブランド基盤に適したドメインです。',
      useCases: ['ホテル予約', 'ビジネス出張', '海外旅行', '団体旅行手配'],
      seoTitle: '海外ホテル.jp — 宿泊IDNドメイン',
      seoDescription: '海外ホテルの予約・比較サービスに適した日本語ドメイン',
      ogTitle: '海外ホテル.jp｜rePlay Domains',
      ogDescription: '海外宿泊サービスのためのIDNドメイン',
      searchExcerpt: '「海外ホテル」のキーワードIDNドメイン。宿泊予約・比較サービスの基盤に。',
    },
    {
      domainName: '激安ホテル.com',
      description:
        '「激安ホテル」という価格訴求キーワードをドメインに持つIDN資産。格安宿泊の予約・比較サービスやバジェット旅行メディアのブランド基盤に適しています。',
      registrationDate: '2006-02-04T00:00:00.000Z',
      status: 'open' as const,
      slug: 'gekiyasu-hotel',
      category: 'ホテル・宿泊',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: '激安ホテル.com',
      richSummaryTitle: '格安宿泊のドメイン',
      richSummaryIntro:
        '激安ホテル.comは、「激安ホテル」という強い価格訴求力を持つキーワードドメインです。バジェット旅行者向けのサービスに適しています。',
      richSummaryBullets: ['価格訴求キーワード', 'バジェット旅行市場', '.comの国際性', 'Hotel .comセット連携'],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary: '激安ホテル.comは、格安宿泊市場でのブランド構築に適したドメインです。',
      useCases: ['格安宿泊予約', 'ビジネスホテル比較', 'バジェット旅行ガイド', '民泊サービス'],
      seoTitle: '激安ホテル.com — 格安宿泊ドメイン',
      seoDescription: '格安ホテルの予約・比較に適したキーワードドメイン',
      ogTitle: '激安ホテル.com｜rePlay Domains',
      ogDescription: '格安宿泊サービスのためのキーワードドメイン',
      searchExcerpt: '格安ホテルのキーワードIDNドメイン。バジェット宿泊サービスの基盤に。',
    },
    {
      domainName: 'paradise.jp',
      description:
        '「パラダイス」という楽園イメージを.jpドメインで表現できる資産。リゾート、旅行、ウェルネス、エンターテインメントなど、非日常の体験を提供する事業に適しています。',
      registrationDate: '2011-05-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'paradise-jp',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '楽園ブランドのドメイン',
      richSummaryIntro:
        'paradise.jpは、「パラダイス」という普遍的な楽園イメージを.jpドメインで表現できる資産です。リゾートや非日常体験のブランドに適しています。',
      richSummaryBullets: ['リゾート・旅行市場', '楽園イメージの訴求力', '.jpの国内信頼性', '多業種での活用'],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary: 'paradise.jpは、非日常の体験を提供する事業のブランドドメインです。',
      useCases: ['リゾート予約', 'ウェルネス・スパ', 'エンターテインメント', 'ウェディング'],
      seoTitle: 'paradise.jp — 楽園ブランドドメイン',
      seoDescription: 'リゾート・旅行・ウェルネス事業に適した.jpドメイン',
      ogTitle: 'paradise.jp｜rePlay Domains',
      ogDescription: '楽園イメージのブランドドメイン',
      searchExcerpt: '楽園イメージの.jpドメイン。リゾート・ウェルネス・エンターテインメントに。',
    },
    {
      domainName: 'ヒップホップ.jp',
      description:
        'ヒップホップ文化の日本語ドメイン。MC、DJ、ダンス、グラフィティなど、日本のHIPHOPカルチャー全体をカバーするメディアやコミュニティの基盤に適しています。',
      registrationDate: '2006-06-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'hiphop-jp',
      category: '音楽・エンターテインメント',
      minimumOffer: 3000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ヒップホップ.jp',
      richSummaryTitle: 'ヒップホップ文化の日本語ドメイン',
      richSummaryIntro:
        'ヒップホップ.jpは、HIPHOPカルチャーを日本語ドメインで表現するIDN資産です。音楽、ダンス、アートなどの情報発信基盤に適しています。',
      richSummaryBullets: ['HIPHOPカルチャー全体をカバー', '音楽・ダンス・アート', 'Hip-Hopセット連携', 'コミュニティ基盤'],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary: 'ヒップホップ.jpは、日本のHIPHOP文化に関わる事業に適したドメインです。',
      useCases: ['音楽メディア', 'イベント企画', 'アーティスト管理', 'ストリートカルチャー'],
      seoTitle: 'ヒップホップ.jp — HIPHOP文化ドメイン',
      seoDescription: '日本のHIPHOPカルチャーのメディア・コミュニティ基盤に',
      ogTitle: 'ヒップホップ.jp｜rePlay Domains',
      ogDescription: 'HIPHOP文化のIDNドメイン',
      searchExcerpt: 'ヒップホップ文化の日本語ドメイン。音楽・ダンス・アートの情報基盤に。',
    },

    // ═══════════════════════════════════════════
    // A2 DOMAINS (33) — Codex-generated content
    // ═══════════════════════════════════════════

    // Hotel .com Set additions
    {
      domainName: '海外ホテル.com',
      description:
        '「海外ホテル」と日本語でそのまま届く.comドメインです。渡航先別の宿泊予約、出張者向けホテル手配、都市比較メディアなど、海外滞在の計画段階から使い道を描きやすく、比較と予約の流れを名前の時点で整理できます。',
      registrationDate: '2006-02-02T00:00:00.000Z',
      status: 'open' as const,
      slug: 'kaigai-hotel-com-idn',
      category: 'ホテル・宿泊',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: '海外ホテル.com',
      richSummaryTitle: '海外宿泊の入口をつくる名前',
      richSummaryIntro:
        '海外ホテル.comは、行き先が決まる前の比較段階から、予約直前の宿探しまでを一続きで受け止めやすいドメインです。海外旅行メディア、都市別ホテルガイド、法人出張の手配窓口など、宿泊を軸にした案内役として自然に機能します。',
      richSummaryBullets: [
        '渡航先別の宿選びへ話をつなげやすい',
        '比較サービスの輪郭が名前だけで立つ',
        '日本語入力のまま覚えやすい.com',
        '旅行者にも出張者にも向き合える',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '海外宿泊にまつわる案内、比較、予約導線をまとめる場として組み立てやすいドメインです。',
      useCases: [
        '海外ホテル予約サービス',
        '都市別の宿泊比較メディア',
        '法人出張のホテル手配窓口',
        '長期滞在者向け宿情報サイト',
      ],
      searchExcerpt: '海外で泊まる場所を探す。その行為をまっすぐ受け止める一語。',
      searchKeywords: '海外ホテル、海外宿泊、ホテル予約、出張手配、travel hotel、hotel',
      seoTitle: '海外ホテル.com — 海外宿泊の案内軸になるドメイン',
      seoDescription:
        '海外ホテル予約、都市別比較、出張手配など、海外宿泊の入口をつくりやすい日本語.comドメイン。',
      ogTitle: '海外ホテル.com｜rePlay Domains',
      ogDescription: '海外宿泊の比較と予約導線を描きやすいドメイン',
    },
    {
      domainName: '国内ホテル.com',
      description:
        '国内旅行や近距離の週末滞在を想起させやすい、日本語の意図が明快な.comドメインです。地域別の宿検索、温泉旅館とホテルの比較、法人出張の手配窓口など、国内宿泊に絞ったサービスの土台として名前のわかりやすさがそのまま効きます。',
      registrationDate: '2006-02-02T00:00:00.000Z',
      status: 'open' as const,
      slug: 'kokunai-hotel-com-idn',
      category: 'ホテル・宿泊',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: '国内ホテル.com',
      richSummaryTitle: '国内宿泊の比較に素直なドメイン',
      richSummaryIntro:
        '国内ホテル.comは、旅行先を日本国内に絞って宿を探す場面と相性の良い名前です。エリア別予約、温泉地ガイド、出張者向け宿泊手配まで、国内移動に寄り添うサービスの出発点として置きやすい一件です。',
      richSummaryBullets: [
        '国内旅行の文脈がひと目で伝わる',
        '旅館とホテルの横断比較も組みやすい',
        '日本語検索の感覚に沿いやすい',
        '週末旅行から出張まで幅を持たせられる',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '国内の宿泊ニーズに絞った比較や案内を、無理なく一つに束ねやすい名前です。',
      useCases: [
        '国内ホテル予約サイト',
        '温泉地と都市ホテルの比較メディア',
        '法人出張向け宿泊手配サービス',
        'エリア別宿泊ガイド',
      ],
      searchExcerpt: '国内で泊まる先を探す人に、そのまま届く日本語.com。',
      searchKeywords: '国内ホテル、宿泊予約、温泉旅行、出張ホテル、hotel、国内宿',
      seoTitle: '国内ホテル.com — 国内宿泊の導線をつくるドメイン',
      seoDescription:
        '国内旅行、温泉地比較、出張手配など、国内宿泊サービスの名前として整理しやすい日本語.comドメイン。',
      ogTitle: '国内ホテル.com｜rePlay Domains',
      ogDescription: '国内宿泊の比較と予約に軸を置けるドメイン',
    },
    {
      domainName: 'ニューヨークホテル.com',
      description:
        '都市名と宿泊用途が一体になった、訴求先の見えやすい日本語.comです。ニューヨーク旅行のホテル予約、エリア別の宿比較、出張者向け滞在案内など、マンハッタンやブルックリンといった具体的な街区情報へ展開しやすく、名前だけで目的地が定まります。',
      registrationDate: '2006-02-02T00:00:00.000Z',
      status: 'open' as const,
      slug: 'newyork-hotel-com-idn',
      category: 'ホテル・宿泊',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ニューヨークホテル.com',
      richSummaryTitle: '都市別宿泊サービスに切れ味のある名前',
      richSummaryIntro:
        'ニューヨークホテル.comは、都市名を含むことで利用シーンをすぐ具体化できるドメインです。観光客向けの滞在ガイドから、出張者向けの立地比較まで、ニューヨーク滞在に必要な情報を束ねる窓口として収まりが良くなります。',
      richSummaryBullets: [
        '目的地が先に見えるので迷いにくい',
        '街区別の比較企画へ広げやすい名称',
        '旅行者にも出張者にも説明しやすい',
        '日本語で覚えたままアクセスを促せる',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ニューヨーク滞在を前提にした宿泊案内や予約導線に、そのまま置きやすいドメインです。',
      useCases: [
        'ニューヨークのホテル予約サイト',
        'エリア別宿泊比較メディア',
        '出張者向け滞在ガイド',
        '長期滞在者向けホテル案内',
      ],
      searchExcerpt: '街の名前まで入っているから、使い道が最初からぶれません。',
      searchKeywords: 'ニューヨークホテル、ニューヨーク宿泊、海外ホテル、NY hotel、出張ホテル、旅行',
      seoTitle: 'ニューヨークホテル.com — 目的地が明快な宿泊ドメイン',
      seoDescription:
        'ニューヨーク旅行や出張の宿泊案内、エリア別比較、予約導線づくりに向く日本語.comドメイン。',
      ogTitle: 'ニューヨークホテル.com｜rePlay Domains',
      ogDescription: 'ニューヨーク滞在の宿探しに焦点を合わせやすいドメイン',
    },
    {
      domainName: 'ハワイホテル.com',
      description:
        '旅先としての期待感が強い「ハワイ」と、目的のはっきりした「ホテル」がそのまま並ぶ日本語.comです。リゾート滞在の予約窓口、島別ホテル比較、家族旅行やハネムーン向けの宿案内など、非日常の滞在体験を組み立てるサービスにきれいにつながります。',
      registrationDate: '2006-02-02T00:00:00.000Z',
      status: 'open' as const,
      slug: 'hawaii-hotel-com-idn',
      category: 'ホテル・宿泊',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ハワイホテル.com',
      richSummaryTitle: 'ハワイ滞在の入口として扱いやすい名前',
      richSummaryIntro:
        'ハワイホテル.comは、目的地の高揚感と宿泊ニーズを一度に受け止められるドメインです。オアフ島中心のホテル比較、リゾート予約、滞在スタイル別の案内など、旅の空気感を崩さずに情報設計できます。',
      richSummaryBullets: [
        'リゾート滞在の文脈が自然に立ち上がる',
        '島別や目的別の比較にも展開しやすい',
        '日本語話者へ直感的に伝わる並び',
        '家族旅行からハネムーンまで広げられる',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ハワイでの滞在先を探す人へ、予約や比較の導線をつくりやすいドメインです。',
      useCases: [
        'ハワイのホテル予約サービス',
        '島別リゾート比較メディア',
        '家族旅行向け宿泊ガイド',
        'ハネムーン向け滞在案内',
      ],
      searchExcerpt: 'ハワイでどこに泊まるか。その問いに正面から応える名前。',
      searchKeywords: 'ハワイホテル、ハワイ宿泊、リゾート予約、家族旅行、hawaii hotel、travel',
      seoTitle: 'ハワイホテル.com — リゾート滞在を伝えやすいドメイン',
      seoDescription:
        'ハワイのホテル予約、島別比較、家族旅行やハネムーン向け案内に展開しやすい日本語.comドメイン。',
      ogTitle: 'ハワイホテル.com｜rePlay Domains',
      ogDescription: 'ハワイ滞在の予約と比較に焦点を置けるドメイン',
    },

    // Hotel .jp Set
    {
      domainName: 'ホテルズ.jp',
      description:
        '「ホテルズ」を.jpで押さえた、国内向けの受け皿として扱いやすいドメインです。宿泊予約、ホテル比較、法人出張の手配、チェーン横断のレビュー企画まで、サービス名としての収まりが良く、英語由来でも日本語の会話にそのまま馴染みます。',
      registrationDate: '2006-02-03T00:00:00.000Z',
      status: 'open' as const,
      slug: 'hotels-jp-idn',
      category: 'ホテル・宿泊',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ホテルズ.jp',
      richSummaryTitle: '国内向けホテルブランドを置きやすい一件',
      richSummaryIntro:
        'ホテルズ.jpは、日本市場に向けてホテル関連サービスを立ち上げる際に使い道の広い名前です。予約、比較、レビュー、法人手配といった複数の切り口を持たせても無理がなく、短く覚えやすい響きが残ります。',
      richSummaryBullets: [
        'ホテル関連だとすぐ伝わる表記',
        '予約にも比較にも転びすぎない名前',
        '日本語入力の流れで扱いやすい',
        '法人利用まで視野を広げられる',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ホテル領域の予約、比較、案内を束ねる総合的な窓口として組み立てやすいドメインです。',
      useCases: [
        'ホテル予約プラットフォーム',
        '宿泊比較サイト',
        '法人出張手配サービス',
        'ホテルレビュー・ガイドメディア',
      ],
      searchExcerpt: 'ホテルという用途を、短くやわらかく受け止める.jp。',
      searchKeywords: 'ホテルズ、ホテル予約、宿泊比較、出張手配、hotels、hotel',
      seoTitle: 'ホテルズ.jp — 国内向けホテルサービスの起点になるドメイン',
      seoDescription:
        'ホテル予約、比較、レビュー、法人手配など、ホテル関連サービスの名前として収まりの良い.jpドメイン。',
      ogTitle: 'ホテルズ.jp｜rePlay Domains',
      ogDescription: 'ホテル関連サービスを総合的に展開しやすいドメイン',
    },

    // 芸能 Entertainment Set
    {
      domainName: '芸能界.com',
      description:
        'ニュースでも週刊誌でも繰り返し使われる「芸能界」を、そのままドメインにした一件です。芸能ニュース、人物データベース、番組解説、業界コラムなど、表舞台と舞台裏の両方を扱うメディアに厚みを持たせやすく、言葉自体の浸透度が強い支えになります。',
      registrationDate: '2005-08-15T00:00:00.000Z',
      status: 'open' as const,
      slug: 'geinokai-com-idn',
      category: '音楽・エンターテインメント',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: '芸能界.com',
      richSummaryTitle: '芸能メディアの看板になりやすい名前',
      richSummaryIntro:
        '芸能界.comは、芸能そのものではなく、業界全体の動きや人物相関まで視野に入れた企画と相性の良いドメインです。ニュース速報だけでなく、俳優・タレント・制作側を横断する編集方針にも収まりが出ます。',
      richSummaryBullets: [
        '芸能ニュースの看板として据えやすい',
        '人物情報や番組解説にも広げられる',
        '日本語の会話そのままで記憶に残る',
        '業界全体を見渡す視点を置きやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '芸能ニュースから人物アーカイブまで、芸能領域を広く扱う編集拠点として組み立てやすいドメインです。',
      useCases: [
        '芸能ニュースメディア',
        'タレント・俳優データベース',
        '番組解説・レビューサイト',
        '業界コラム・インタビュー媒体',
      ],
      searchExcerpt: '芸能の話ではなく、芸能界そのものを扱うための名前。',
      searchKeywords: '芸能界、芸能ニュース、タレント、俳優、エンタメ、media',
      seoTitle: '芸能界.com — 芸能領域を広く扱えるドメイン',
      seoDescription:
        '芸能ニュース、人物データベース、番組解説、業界コラムなどを展開しやすい日本語.comドメイン。',
      ogTitle: '芸能界.com｜rePlay Domains',
      ogDescription: '芸能メディアの軸に据えやすいドメイン',
    },
    {
      domainName: 'geinokai.com',
      description:
        '日本語の「芸能界」をローマ字で表した、海外向け発信にも視野を持てる.comドメインです。日本の芸能ニュースを英字で届けるメディア、タレント情報のアーカイブ、カルチャー解説サイトなど、日本のエンターテインメントを外へ紹介する文脈に置きやすい名前です。',
      registrationDate: '2004-05-18T00:00:00.000Z',
      status: 'open' as const,
      slug: 'geinokai-com',
      category: '音楽・エンターテインメント',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '芸能カルチャーを英字で開くドメイン',
      richSummaryIntro:
        'geinokai.comは、日本語由来の概念をローマ字で見せることで、日本カルチャーへの関心を持つ層に向けた発信をつくりやすいドメインです。国内向け日本語運用に限らず、バイリンガル編集や海外読者向けの入口としても整理しやすくなります。',
      richSummaryBullets: [
        '日本の芸能文脈を英字で示せる',
        '海外向けカルチャー解説にも置きやすい',
        '.comらしい軽さで覚えてもらいやすい',
        'ニュース以外の読み物企画にも伸ばせる',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '日本の芸能カルチャーを、英字やバイリンガルで紹介する場としてまとめやすい名前です。',
      useCases: [
        '英字の芸能カルチャーメディア',
        'タレント情報アーカイブ',
        '日本ドラマ・番組解説サイト',
        '海外ファン向けニュースレター拠点',
      ],
      searchExcerpt: '日本の芸能を、英字の入口から見せたいときの一手。',
      searchKeywords: 'geinokai、芸能界、日本カルチャー、entertainment、talent、media',
      seoTitle: 'geinokai.com — 日本の芸能カルチャーを英字で伝えるドメイン',
      seoDescription:
        '日本の芸能ニュース、タレント情報、カルチャー解説を英字やバイリンガルで展開しやすい.comドメイン。',
      ogTitle: 'geinokai.com｜rePlay Domains',
      ogDescription: '日本の芸能カルチャーを英字で開くドメイン',
    },
    {
      domainName: 'geinoukai.com',
      description:
        '長音を反映したローマ字表記で、日本語の響きをより丁寧に残した.comドメインです。日本の芸能やテレビ文化を海外へ紹介する読み物、人物名鑑、サブカルチャー解説など、和製のニュアンスを残したまま英字運用したい企画にしっくりきます。',
      registrationDate: '2004-05-18T00:00:00.000Z',
      status: 'open' as const,
      slug: 'geinoukai-com',
      category: '音楽・エンターテインメント',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '日本語の響きを残せる英字ドメイン',
      richSummaryIntro:
        'geinoukai.comは、単なる英訳ではなく、日本語の音を意識した見せ方を選びたい企画で効く名前です。カルチャー紹介、人物解説、番組史のアーカイブなど、和製エンタメの空気を保ちながら外に開く導線をつくれます。',
      richSummaryBullets: [
        '日本語の発音ニュアンスを残しやすい',
        'サブカルチャー文脈にもよくなじむ',
        '翻訳しきらない魅力を表現しやすい',
        '読み物中心の編集方針とも相性が良い',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '日本語の音感を残したまま、日本の芸能文化を紹介する場として展開しやすいドメインです。',
      useCases: [
        '日本芸能のカルチャー解説メディア',
        '人物名鑑サイト',
        'テレビ番組史アーカイブ',
        '海外ファン向けコラムサイト',
      ],
      searchExcerpt: '英訳では出ない、日本語の響きを残したいときの表記。',
      searchKeywords: 'geinoukai、芸能界、日本文化、テレビ、エンタメ、japan entertainment',
      seoTitle: 'geinoukai.com — 日本語の響きを残して使える芸能ドメイン',
      seoDescription:
        '日本の芸能文化、人物解説、番組史などを英字で紹介する際に、日本語の音感を保ちやすい.comドメイン。',
      ogTitle: 'geinoukai.com｜rePlay Domains',
      ogDescription: '日本語の響きを残した英字の芸能ドメイン',
    },
    {
      domainName: 'geinojin.com',
      description:
        '「芸能人」という主語が先に立つため、人物中心の編集やサービスに向く.comドメインです。俳優やタレントのプロフィール、出演作まとめ、インタビュー、ランキング企画など、作品より人を軸に見せたいメディアの輪郭をつくりやすくなります。',
      registrationDate: '2004-05-18T00:00:00.000Z',
      status: 'open' as const,
      slug: 'geinojin-com',
      category: '音楽・エンターテインメント',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '人物起点の芸能メディアに向く名前',
      richSummaryIntro:
        'geinojin.comは、業界全体ではなく、一人ひとりの人物に焦点を当てる企画で使いやすいドメインです。プロフィール集約、出演履歴、インタビュー、トピック解説など、人物ベースの導線を素直に設計できます。',
      richSummaryBullets: [
        '人を主役にした編集方針が立てやすい',
        'プロフィールや出演歴の整理と相性が良い',
        '英字でも意味の輪郭を保ちやすい',
        'ファン向け読み物へ発展させやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '俳優、タレント、著名人を人物単位で見せる媒体やサービスに、そのまま使いやすい名前です。',
      useCases: [
        '芸能人プロフィールメディア',
        '出演作品データベース',
        'インタビュー・特集サイト',
        '人物ランキング・話題まとめ',
      ],
      searchExcerpt: '作品より人を見せたい。そんな企画に向く主語の強さがあります。',
      searchKeywords: 'geinojin、芸能人、タレント、俳優、プロフィール、entertainment',
      seoTitle: 'geinojin.com — 人物起点の芸能サービスを組みやすいドメイン',
      seoDescription:
        '芸能人のプロフィール、出演作品、インタビュー、ランキング企画などを人物中心で展開しやすい.comドメイン。',
      ogTitle: 'geinojin.com｜rePlay Domains',
      ogDescription: '人物軸の芸能メディアに収まりの良いドメイン',
    },

    // Dance Set
    {
      domainName: 'dancer.jp',
      description:
        '職能としての「ダンサー」をそのまま示せる、用途の切れ味がある.jpドメインです。ダンサー向けキャスティング、プロフィール掲載、レッスン案内、映像ポートフォリオなど、踊る人そのものを主役に据えるサービスや媒体に自然な説得力が生まれます。',
      registrationDate: '2013-07-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'dancer-jp',
      category: 'ダンス・パフォーマンス',
      minimumOffer: 5000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '踊る人を中心に据えられるドメイン',
      richSummaryIntro:
        'dancer.jpは、ジャンル名ではなく人を指す言葉だからこそ、プロフィールや仕事導線をまとめやすい名前です。出演者検索、レッスン講師紹介、オーディション告知など、個人と機会をつなぐ場に置きやすくなります。',
      richSummaryBullets: [
        '職能名なので対象がひと目で定まる',
        'ポートフォリオにも募集告知にも広げやすい',
        '.jpで国内向けの文脈を持たせやすい',
        'ジャンル横断のダンサー紹介にも使える',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ダンサー本人、制作側、学び手を結ぶ情報設計に向いたドメインです。',
      useCases: [
        'ダンサーのポートフォリオ掲載サイト',
        'キャスティング・ブッキング窓口',
        'レッスン講師紹介サービス',
        'オーディション情報メディア',
      ],
      searchExcerpt: '踊りのジャンルではなく、踊る人そのものを看板にできる.jp。',
      searchKeywords: 'dancer、ダンサー、キャスティング、レッスン、ポートフォリオ、dance',
      seoTitle: 'dancer.jp — ダンサーを主役に据えやすいドメイン',
      seoDescription:
        'ダンサーのプロフィール、キャスティング、講師紹介、オーディション告知などに向く.jpドメイン。',
      ogTitle: 'dancer.jp｜rePlay Domains',
      ogDescription: 'ダンサー本人を中心にした導線を描きやすいドメイン',
    },
    {
      domainName: 'ダンサー.jp',
      description:
        '日本語で「ダンサー」と直接届くため、説明なしでも対象が伝わる.jpドメインです。国内向けの出演者紹介、イベント出演募集、キッズから大人までのレッスン案内など、日本語話者に向けたダンス関連サービスの拠点としてすっきり収まります。',
      registrationDate: '2017-05-17T00:00:00.000Z',
      status: 'open' as const,
      slug: 'dancer-jp-idn',
      category: 'ダンス・パフォーマンス',
      minimumOffer: 5000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ダンサー.jp',
      richSummaryTitle: '日本語でまっすぐ届くダンサードメイン',
      richSummaryIntro:
        'ダンサー.jpは、日本語話者に向けてダンサー関連の情報を見せたいときに、入り口のわかりやすさが強い一件です。出演者の紹介、地域別スクール案内、イベント募集など、国内利用を前提とした設計で扱いやすくなります。',
      richSummaryBullets: [
        '日本語のまま対象が明快に伝わる',
        '地域別や世代別の導線も組み立てやすい',
        '講師紹介や募集告知にも使い分けやすい',
        '初見でも内容を想像しやすい名前',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '国内向けのダンサー紹介、学習、募集の場として組み立てやすいドメインです。',
      useCases: [
        'ダンサー紹介サイト',
        '地域別ダンススクール案内',
        'イベント出演募集ページ',
        'キッズ・学生向けレッスン情報',
      ],
      searchExcerpt: '日本語でそのまま届くから、国内向けの導線が迷いません。',
      searchKeywords: 'ダンサー、ダンス、出演募集、講師紹介、スクール、performance',
      seoTitle: 'ダンサー.jp — 国内向けダンス導線をつくりやすいドメイン',
      seoDescription:
        'ダンサー紹介、スクール案内、イベント募集など、日本語でわかりやすく展開できる.jpドメイン。',
      ogTitle: 'ダンサー.jp｜rePlay Domains',
      ogDescription: '日本語でダンサー関連の情報を届けやすいドメイン',
    },
    {
      domainName: 'salsa.jp',
      description:
        '音楽、ダンス、社交の空気を一語で呼び込める.jpドメインです。サルサダンスのレッスン、イベントカレンダー、初心者向けガイド、ラテンカルチャーの読み物など、熱量はありつつ閉じすぎないコミュニティ設計に向いており、短さも強みとして残ります。',
      registrationDate: '2012-10-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'salsa-jp',
      category: 'ダンス・パフォーマンス',
      minimumOffer: 5000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: 'サルサカルチャーを軽やかに受け止める名前',
      richSummaryIntro:
        'salsa.jpは、ダンスジャンル名でありながら、音楽や交流の雰囲気まで含めて見せやすいドメインです。レッスン案内だけでなく、イベント情報やカルチャー記事までまとめる場として余白があります。',
      richSummaryBullets: [
        'ジャンル名そのものなので印象が直球',
        '初心者向け導線からイベント案内まで広げられる',
        'ラテン音楽の文脈も受け止めやすい',
        '短く発音しやすく記憶に残りやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'サルサダンスと周辺カルチャーを横断して見せるための起点として扱いやすいドメインです。',
      useCases: [
        'サルサダンススクール案内',
        'イベントカレンダーサイト',
        '初心者向け入門メディア',
        'ラテンカルチャーの読み物サイト',
      ],
      searchExcerpt: '踊りだけで終わらない。音楽と交流まで含めて開ける一語。',
      searchKeywords: 'salsa、サルサ、ダンス、ラテン音楽、イベント、lesson',
      seoTitle: 'salsa.jp — サルサカルチャーをまとめやすいドメイン',
      seoDescription:
        'サルサダンスのレッスン、イベント、初心者向け案内、ラテンカルチャー記事などに向く.jpドメイン。',
      ogTitle: 'salsa.jp｜rePlay Domains',
      ogDescription: 'サルサダンスと音楽文化を広く扱いやすいドメイン',
    },
    {
      domainName: 'ベリーダンス.com',
      description:
        'ジャンル名がそのまま用途になる、狙いのはっきりした日本語.comです。教室案内、講師紹介、発表会の告知、衣装や音楽の読み物など、ベリーダンスに関わる学びと表現を一つに束ねやすく、初心者にも経験者にも内容が伝わりやすい名前です。',
      registrationDate: '2005-08-14T00:00:00.000Z',
      status: 'open' as const,
      slug: 'bellydance-com-idn',
      category: 'ダンス・パフォーマンス',
      minimumOffer: 3000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ベリーダンス.com',
      richSummaryTitle: '学びと舞台発表をつなぎやすいドメイン',
      richSummaryIntro:
        'ベリーダンス.comは、ダンスジャンル名をそのまま掲げることで、教室運営からイベント案内まで一貫した導線をつくりやすい名前です。レッスン情報、講師紹介、衣装や楽曲の話題まで、周辺情報も自然に載せられます。',
      richSummaryBullets: [
        'ジャンル名なので入口が非常に明快',
        'レッスン案内と発表会告知を並べやすい',
        '衣装や音楽の読み物にもつなげられる',
        '初心者向け導線を組み立てやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ベリーダンス教室やイベント、関連情報をまとめる場として扱いやすいドメインです。',
      useCases: [
        'ベリーダンス教室案内',
        '講師・出演者紹介サイト',
        '発表会・ショーの告知ページ',
        '衣装や楽曲の読み物メディア',
      ],
      searchExcerpt: '習う、観る、準備する。その一連をまとめやすいジャンル名。',
      searchKeywords: 'ベリーダンス、ダンス教室、講師紹介、発表会、衣装、performance',
      seoTitle: 'ベリーダンス.com — 教室と舞台発表を見せやすいドメイン',
      seoDescription:
        '教室案内、講師紹介、発表会告知、衣装や音楽の読み物など、ベリーダンス関連の発信に向く日本語.comドメイン。',
      ogTitle: 'ベリーダンス.com｜rePlay Domains',
      ogDescription: 'ベリーダンスの学びと表現をまとめやすいドメイン',
    },

    // Los Angeles Set
    {
      domainName: 'losangeles.jp',
      description:
        '都市名そのものの強さを活かしながら、日本語圏向けの案内窓口をつくりやすい.jpドメインです。旅行情報、留学サポート、現地生活ガイド、日米ビジネスの接点づくりなど、ロサンゼルスに向かう理由が複数ある都市だからこそ、広がりのある編集ができます。',
      registrationDate: '2007-07-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'losangeles-jp',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: 'ロサンゼルスとの接点を広く受け止める名前',
      richSummaryIntro:
        'losangeles.jpは、観光だけでなく、留学、居住、仕事、カルチャーまで複数の目的を束ねやすい都市ドメインです。日本語圏に向けた地域ガイドやサービス紹介の軸として、過不足のない広さを持っています。',
      richSummaryBullets: [
        '都市名だけで用途の幅を確保できる',
        '旅行と生活情報の両方を載せやすい',
        '英字表記で国際都市の印象を保てる',
        '日本向けの地域窓口として扱いやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ロサンゼルスに向かう日本語話者へ、観光から生活情報まで案内する土台として使いやすいドメインです。',
      useCases: [
        'ロサンゼルス旅行ガイド',
        '留学・語学学校案内',
        '現地生活情報メディア',
        '日米ビジネスディレクトリ',
      ],
      searchExcerpt: '観光都市であり、暮らす街でもある。その両方を受け止める名前。',
      searchKeywords: 'losangeles、ロサンゼルス、旅行、留学、生活情報、business',
      seoTitle: 'losangeles.jp — ロサンゼルスの日本語圏導線をつくるドメイン',
      seoDescription:
        '旅行、留学、生活情報、日米ビジネス案内など、ロサンゼルス関連の日本語向け発信に向く.jpドメイン。',
      ogTitle: 'losangeles.jp｜rePlay Domains',
      ogDescription: 'ロサンゼルスと日本語圏をつなぐ案内軸にしやすいドメイン',
    },
    {
      domainName: 'ロサンゼルス.jp',
      description:
        '日本語表記のまま都市名を打ち出せるため、初見でも内容が伝わりやすい.jpドメインです。観光情報、現地イベント、日本人向け生活ガイド、学校や住まいの案内など、日本語話者に寄せたロサンゼルス情報の拠点として素直に育てやすい名前です。',
      registrationDate: '2006-04-17T00:00:00.000Z',
      status: 'open' as const,
      slug: 'losangeles-jp-idn',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ロサンゼルス.jp',
      richSummaryTitle: '日本語で都市の魅力を伝えやすいドメイン',
      richSummaryIntro:
        'ロサンゼルス.jpは、日本語でそのまま都市名を掲げられるため、旅行者にも在住検討者にも入りやすい名前です。エリア別ガイド、生活支援、イベント案内など、日本語で読ませたい情報を無理なく整理できます。',
      richSummaryBullets: [
        '日本語で都市名がそのまま届く',
        '生活情報にも観光案内にも寄せやすい',
        'エリア別の細かな導線を設計しやすい',
        '現地日本語サービスの窓口にも向く',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '日本語でロサンゼルス関連の情報やサービスをまとめる足場として扱いやすいドメインです。',
      useCases: [
        '日本語のロサンゼルス旅行ガイド',
        '現地イベント情報サイト',
        '在住者向け生活サポート案内',
        '学校・住まい情報メディア',
      ],
      searchExcerpt: '都市名を日本語でまっすぐ掲げたいとき、強い迷いのなさがあります。',
      searchKeywords: 'ロサンゼルス、LA、旅行、生活情報、日本人向け、留学',
      seoTitle: 'ロサンゼルス.jp — 日本語で都市情報を届けやすいドメイン',
      seoDescription:
        '旅行、イベント、生活支援、学校や住まいの案内など、ロサンゼルス情報を日本語で展開しやすい.jpドメイン。',
      ogTitle: 'ロサンゼルス.jp｜rePlay Domains',
      ogDescription: '日本語でロサンゼルス情報を整理しやすいドメイン',
    },
    {
      domainName: 'ロス.jp',
      description:
        '会話で使われる短い呼び名だからこそ、軽快さのある入口をつくれる.jpドメインです。ロサンゼルス旅行の速報、現地カルチャーの話題、若い層向けの街案内、SNS連動型のメディアなど、少しフットワークの軽い企画に置くと響きの良さが前に出ます。',
      registrationDate: '2007-07-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'los-jp-idn',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ロス.jp',
      richSummaryTitle: '軽やかな都市メディアに向く短い名前',
      richSummaryIntro:
        'ロス.jpは、正式名称よりも会話に近い距離感でロサンゼルスを見せたいときに効くドメインです。速報性のある話題、カルチャー紹介、若い旅行者向けのガイドなど、親しみを先に立てる企画と相性が出ます。',
      richSummaryBullets: [
        '短くて口に出しやすい呼び名',
        'カルチャー寄りの企画にも合わせやすい',
        'SNS発信と並べたときの軽さがある',
        '若い旅行者向けにも距離が近い',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ロサンゼルスを親しみやすく見せる、軽快なメディアや案内窓口として使いやすいドメインです。',
      useCases: [
        'ロサンゼルスのカルチャーメディア',
        '若年層向け旅行ガイド',
        '現地イベント速報サイト',
        'SNS連動型の街情報ページ',
      ],
      searchExcerpt: '正式名ではなく、呼び名で街を見せたい企画に。',
      searchKeywords: 'ロス、LA、ロサンゼルス、カルチャー、旅行、イベント',
      seoTitle: 'ロス.jp — 親しみのある都市メディアをつくりやすいドメイン',
      seoDescription:
        'ロサンゼルスのカルチャー、旅行、イベント速報などを、軽やかな呼び名で展開しやすい.jpドメイン。',
      ogTitle: 'ロス.jp｜rePlay Domains',
      ogDescription: 'ロサンゼルスを親しみやすく見せる短いドメイン',
    },

    // Honolulu/Waikiki Set additions
    {
      domainName: 'ホノルル.jp',
      description:
        '日本語で地名をそのまま掲げられるため、旅の目的地としての印象がすぐ立ち上がる.jpドメインです。観光ガイド、現地ツアー案内、長期滞在者向け情報、ウェディングや家族旅行の相談窓口など、ハワイ関連でもホノルルに焦点を合わせた企画に輪郭が出ます。',
      registrationDate: '2006-04-13T00:00:00.000Z',
      status: 'open' as const,
      slug: 'honolulu-jp-idn',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ホノルル.jp',
      richSummaryTitle: 'ホノルルを日本語で案内するための一件',
      richSummaryIntro:
        'ホノルル.jpは、日本語話者に向けてホノルルの情報を整理するうえで入り口の明快さが強いドメインです。旅行前の下調べから現地滞在中の案内まで、街の情報を一つに束ねる場として素直に使えます。',
      richSummaryBullets: [
        '目的地が日本語でそのまま伝わる',
        '観光と滞在情報の両方を載せやすい',
        '家族旅行や挙式相談にも広げられる',
        '現地サービスの案内窓口にも置ける',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ホノルル滞在に関わる情報やサービスを、日本語でまとめる拠点として組み立てやすいドメインです。',
      useCases: [
        'ホノルル旅行ガイド',
        '現地ツアー・アクティビティ案内',
        '長期滞在者向け生活情報',
        'ハワイ挙式・家族旅行相談窓口',
      ],
      searchExcerpt: 'ホノルルの名を、日本語で正面から掲げられる.jp。',
      searchKeywords: 'ホノルル、ハワイ、旅行、現地ツアー、ウェディング、hawaii',
      seoTitle: 'ホノルル.jp — 日本語でホノルル情報を届けやすいドメイン',
      seoDescription:
        '観光ガイド、現地ツアー、長期滞在情報、ウェディング相談など、ホノルル関連の日本語向け発信に向く.jpドメイン。',
      ogTitle: 'ホノルル.jp｜rePlay Domains',
      ogDescription: 'ホノルルの日本語案内拠点をつくりやすいドメイン',
    },
    {
      domainName: 'ワイキキ.jp',
      description:
        'ホノルル全体よりも滞在シーンが具体的に浮かぶ地名で、リゾート情報に絞り込みやすい.jpドメインです。ホテル周辺ガイド、ビーチアクティビティ、ショッピング案内、家族旅行の散策情報など、現地での過ごし方を細かく見せる企画にぴったりはまります。',
      registrationDate: '2006-04-13T00:00:00.000Z',
      status: 'open' as const,
      slug: 'waikiki-jp-idn',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ワイキキ.jp',
      richSummaryTitle: '滞在体験の具体像を描きやすい地名ドメイン',
      richSummaryIntro:
        'ワイキキ.jpは、街名というより滞在エリア名としての具体性が強く、旅行中の行動に近い情報をまとめやすいドメインです。宿周辺の案内、海辺の過ごし方、買い物や食事の紹介など、現地密着の編集とよく合います。',
      richSummaryBullets: [
        '滞在エリアが先に浮かぶ名前',
        'ホテル周辺情報との相性が良い',
        'リゾート気分を崩さず見せやすい',
        '家族旅行にも個人旅にも開きやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ワイキキ滞在中の行動や選択を支える、現地密着型の案内拠点として使いやすいドメインです。',
      useCases: [
        'ワイキキ周辺ガイド',
        'ビーチアクティビティ案内',
        'ショッピング・グルメ情報',
        'ホテル周辺の散策メディア',
      ],
      searchExcerpt: '街ではなく、滞在の肌触りまで伝わる地名です。',
      searchKeywords: 'ワイキキ、ハワイ、ビーチ、観光、ショッピング、waikiki',
      seoTitle: 'ワイキキ.jp — 滞在エリア情報を具体的に見せやすいドメイン',
      seoDescription:
        'ホテル周辺ガイド、ビーチアクティビティ、ショッピング、グルメ情報など、ワイキキ滞在の案内に向く.jpドメイン。',
      ogTitle: 'ワイキキ.jp｜rePlay Domains',
      ogDescription: 'ワイキキ滞在の体験設計を見せやすいドメイン',
    },

    // New York City Set
    {
      domainName: 'newyorkcity.jp',
      description:
        '単なる「New York」ではなく「New York City」と言い切ることで、都市の輪郭をより明確に示せる.jpドメインです。観光ガイド、留学情報、文化イベント、ビジネス案内など、州ではなく街としてのニューヨークを扱いたい企画に筋の通った名前になります。',
      registrationDate: '2008-07-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'newyorkcity-jp',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '都市としてのニューヨークを示しやすい名前',
      richSummaryIntro:
        'newyorkcity.jpは、広い地名ではなく都市の生活圏を前提に情報設計したい場面で効くドメインです。観光と文化だけでなく、居住、仕事、学びまで含めた街の解像度を保ちやすくなります。',
      richSummaryBullets: [
        '都市名の範囲が明確でぶれにくい',
        '旅行情報に加えて生活情報も載せやすい',
        '英字表記で地名の力をそのまま生かせる',
        'イベントやカルチャー企画にも広がる',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ニューヨーク市を前提にした日本語向け案内やメディアの起点として扱いやすいドメインです。',
      useCases: [
        'ニューヨーク市旅行ガイド',
        '留学・居住情報メディア',
        '文化イベント案内サイト',
        '日米ビジネス情報ページ',
      ],
      searchExcerpt: '州ではなく、街としてのニューヨークを扱うための表記。',
      searchKeywords: 'newyorkcity、ニューヨークシティ、旅行、留学、文化、business',
      seoTitle: 'newyorkcity.jp — 都市としてのニューヨークを見せやすいドメイン',
      seoDescription:
        '旅行、留学、生活、文化イベントなど、ニューヨーク市に焦点を合わせた日本語向け発信に向く.jpドメイン。',
      ogTitle: 'newyorkcity.jp｜rePlay Domains',
      ogDescription: 'ニューヨーク市の解像度を保って発信しやすいドメイン',
    },
    {
      domainName: 'ニューヨークシティ.jp',
      description:
        '日本語で都市名をフルに示せるため、旅行ガイドより一歩広く、街そのものを扱う企画に向く.jpドメインです。観光、生活、学校、文化施設、長期滞在の情報など、点ではなく都市の全体像を見せたい場面で名前がしっかり支えになります。',
      registrationDate: '2006-02-02T00:00:00.000Z',
      status: 'open' as const,
      slug: 'newyorkcity-jp-idn',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ニューヨークシティ.jp',
      richSummaryTitle: '街全体を見せる編集に向く都市ドメイン',
      richSummaryIntro:
        'ニューヨークシティ.jpは、目的地としての派手さだけでなく、都市の機能や暮らしまで含めて伝えたいときに収まりの良い名前です。観光情報、学校案内、生活支援、文化施設の紹介などを一つの流れで組み立てられます。',
      richSummaryBullets: [
        '日本語で都市名を正確に示せる',
        '観光だけで終わらない広がりを持てる',
        '長期滞在向けの情報も置きやすい',
        '街の全体像を見せる媒体に向いている',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ニューヨーク市を日本語で総合的に案内する場として、無理なく設計できるドメインです。',
      useCases: [
        '日本語のニューヨーク市ガイド',
        '長期滞在者向け生活情報',
        '学校・文化施設案内',
        '都市カルチャーの編集メディア',
      ],
      searchExcerpt: '都市の全体像まで届けたいなら、フルネームが効きます。',
      searchKeywords: 'ニューヨークシティ、ニューヨーク、旅行、生活情報、学校、文化施設',
      seoTitle: 'ニューヨークシティ.jp — 都市全体を日本語で案内しやすいドメイン',
      seoDescription:
        '観光、生活、学校、文化施設、長期滞在情報など、ニューヨーク市全体を日本語で見せやすい.jpドメイン。',
      ogTitle: 'ニューヨークシティ.jp｜rePlay Domains',
      ogDescription: 'ニューヨーク市を日本語で総合的に見せやすいドメイン',
    },

    // Diamonds Set addition
    {
      domainName: 'ダイヤモンド.jp',
      description:
        '硬さ、輝き、希少感というイメージが一語で立ち上がる、日本語の.jpドメインです。ジュエリー販売、婚約指輪の比較、宝石鑑定、記念日のギフト提案など、商品そのものへの信頼や期待を名前の段階から整えやすく、語感の強さも残ります。',
      registrationDate: '2006-07-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'diamond-jp-idn',
      category: 'ラグジュアリー',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ダイヤモンド.jp',
      richSummaryTitle: '高価格帯の商材を受け止めやすい名前',
      richSummaryIntro:
        'ダイヤモンド.jpは、宝石名そのものを日本語で掲げられるため、商品の説得力を最短距離で伝えやすいドメインです。ジュエリーECから鑑定相談まで、華やかさだけでなく慎重さも伴う購買文脈に置きやすくなります。',
      richSummaryBullets: [
        '宝石名そのものの強さを使える',
        '婚約指輪や記念日需要にもつながりやすい',
        '日本語で高級商材を見せやすい',
        '鑑定や解説メディアにも転じられる',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ジュエリー販売から鑑定相談まで、ダイヤモンドに関わる情報と商流をまとめやすいドメインです。',
      useCases: [
        'ダイヤモンドジュエリーEC',
        '婚約指輪の比較ガイド',
        '宝石鑑定・査定相談サイト',
        '記念日向けギフト提案メディア',
      ],
      searchExcerpt: '宝石名をそのまま掲げると、言い換えでは出ない重みが残ります。',
      searchKeywords: 'ダイヤモンド、ジュエリー、婚約指輪、宝石鑑定、ギフト、diamond',
      seoTitle: 'ダイヤモンド.jp — 宝石名の強さを生かせるラグジュアリードメイン',
      seoDescription:
        'ジュエリーEC、婚約指輪比較、宝石鑑定、ギフト提案など、ダイヤモンド関連事業に向く日本語.jpドメイン。',
      ogTitle: 'ダイヤモンド.jp｜rePlay Domains',
      ogDescription: '宝石名そのものを日本語で掲げられるドメイン',
    },

    // Hip-Hop Set additions
    {
      domainName: 'hip-hop.jp',
      description:
        '音楽ジャンル名としての強さに加え、ファッションやダンスまで含む文化圏を示せる.jpドメインです。レビュー、リリース情報、イベント告知、ストリートカルチャーの読み物など、音源紹介だけに閉じないメディアやコミュニティの軸に据えやすい一件です。',
      registrationDate: '2007-07-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'hip-hop-jp',
      category: '音楽・エンターテインメント',
      minimumOffer: 3000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '音楽とカルチャーの両方を抱えられる名前',
      richSummaryIntro:
        'hip-hop.jpは、ジャンル名をそのまま掲げながら、音楽以外の周辺文化にも広がりを持たせやすいドメインです。楽曲紹介、イベント、ファッション、ダンスの話題まで、同じ温度感で並べやすくなります。',
      richSummaryBullets: [
        'ジャンル名そのものが看板になる',
        '音楽以外のストリート文脈も扱いやすい',
        '英字表記でカルチャーの空気を保てる',
        'メディアにもコミュニティにも寄せやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ヒップホップの音楽と周辺カルチャーを横断して扱う起点として設計しやすいドメインです。',
      useCases: [
        'ヒップホップニュースメディア',
        '新譜・レビューサイト',
        'イベント告知プラットフォーム',
        'ストリートカルチャーの読み物サイト',
      ],
      searchExcerpt: '音楽名であり、文化名でもある。その広さを抱えられる.jp。',
      searchKeywords: 'hip-hop、ヒップホップ、ラップ、ストリートカルチャー、音楽、media',
      seoTitle: 'hip-hop.jp — ヒップホップ文化を横断して見せやすいドメイン',
      seoDescription:
        '新譜紹介、イベント告知、レビュー、ストリートカルチャー記事など、ヒップホップ関連の発信に向く.jpドメイン。',
      ogTitle: 'hip-hop.jp｜rePlay Domains',
      ogDescription: 'ヒップホップの音楽と文化を広く扱いやすいドメイン',
    },
    {
      domainName: 'hiphopjapan.com',
      description:
        '日本のヒップホップを外に向けて見せるとき、意味がひと目で通る.comドメインです。国内アーティストの紹介、英語併記のニュース、イベントアーカイブ、シーン解説など、日本発のラップカルチャーを文脈ごと伝える媒体にまとまりが生まれます。',
      registrationDate: '1999-12-12T00:00:00.000Z',
      status: 'open' as const,
      slug: 'hiphopjapan-com',
      category: '音楽・エンターテインメント',
      minimumOffer: 3000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '日本のヒップホップを外へ開くための名前',
      richSummaryIntro:
        'hiphopjapan.comは、ジャンル名と国名が並ぶことで、対象と視点が非常にわかりやすいドメインです。国内シーンの紹介、英語併記の読み物、海外読者向けのアーカイブなど、対外的な入口として整理しやすくなります。',
      richSummaryBullets: [
        '日本のシーンだと一目で伝わる',
        '英語併記の編集とも相性が良い',
        'アーティスト紹介から歴史整理まで広げられる',
        '.comで外向きの窓口をつくりやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '日本のヒップホップを国内外へ紹介する媒体やアーカイブの出発点として使いやすいドメインです。',
      useCases: [
        '日本のヒップホップ紹介メディア',
        '英語併記のニュースサイト',
        'イベント・リリースアーカイブ',
        '国内アーティストの特集ページ',
      ],
      searchExcerpt: '日本のヒップホップを、言い訳なく正面から見せる.com。',
      searchKeywords: 'hiphopjapan、日本のヒップホップ、ラップ、artist、music、culture',
      seoTitle: 'hiphopjapan.com — 日本のヒップホップを外に伝えやすいドメイン',
      seoDescription:
        '国内アーティスト紹介、英語併記ニュース、イベントアーカイブなど、日本のヒップホップ発信に向く.comドメイン。',
      ogTitle: 'hiphopjapan.com｜rePlay Domains',
      ogDescription: '日本のヒップホップシーンを外へ開くドメイン',
    },

    // Artist Set
    {
      domainName: 'artist.jp',
      description:
        '分野を限定せず、それでも創作の主役が誰かは明確に示せる.jpドメインです。作品ポートフォリオ、作家紹介、コミッション受付、展示情報の集約など、音楽家だけでなくイラストレーターや写真家まで含むクリエイターの出発点として使いやすい広さがあります。',
      registrationDate: '2017-05-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'artist-jp',
      category: 'アート・クリエイティブ',
      minimumOffer: 5000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '創作者を広く受け止めるドメイン',
      richSummaryIntro:
        'artist.jpは、表現分野を一つに絞らず、創作する人そのものを前に出したいときに扱いやすい名前です。個人ポートフォリオにも、複数作家を束ねるプラットフォームにも展開の余地があります。',
      richSummaryBullets: [
        '分野横断でクリエイターを扱える',
        '作品紹介にも依頼受付にもなじむ',
        '.jpで国内向けの信頼感を整えやすい',
        '個人運用から掲載型まで幅を持てる',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '創作者の作品発表、紹介、依頼導線をまとめる場として設計しやすいドメインです。',
      useCases: [
        'アーティストのポートフォリオサイト',
        '作家掲載型プラットフォーム',
        'コミッション受付ページ',
        '展示・販売情報の案内サイト',
      ],
      searchExcerpt: '音楽家にも、写真家にも、イラストレーターにも開ける一語。',
      searchKeywords: 'artist、アーティスト、ポートフォリオ、作家、展示、creative',
      seoTitle: 'artist.jp — 創作者の発信と依頼導線を組みやすいドメイン',
      seoDescription:
        'ポートフォリオ、作家紹介、コミッション受付、展示案内など、アーティスト関連の発信に向く.jpドメイン。',
      ogTitle: 'artist.jp｜rePlay Domains',
      ogDescription: '分野横断で創作者を受け止めやすいドメイン',
    },
    {
      domainName: 'アーティスト.jp',
      description:
        '日本語で「アーティスト」と言い切れるため、対象の広さと親しみやすさを両立しやすい.jpドメインです。作品紹介、出演者一覧、作家インタビュー、制作依頼の窓口など、国内ユーザー向けに創作者の活動を整理して見せる場として滑り出しが良くなります。',
      registrationDate: '2017-05-17T00:00:00.000Z',
      status: 'open' as const,
      slug: 'artist-jp-idn',
      category: 'アート・クリエイティブ',
      minimumOffer: 5000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'アーティスト.jp',
      richSummaryTitle: '日本語で創作者を掲げやすいドメイン',
      richSummaryIntro:
        'アーティスト.jpは、日本語でのわかりやすさを優先しながら、分野を限定しすぎない柔らかさも持つ名前です。個人作家の紹介から、複数名を束ねる掲載型サイトまで、国内向け企画を組み立てやすくなります。',
      richSummaryBullets: [
        '日本語で対象が自然に伝わる',
        '音楽以外の作家にも広く開ける',
        'インタビューや特集企画とも相性が良い',
        '依頼導線を置いても不自然になりにくい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '日本語で創作者の活動を見せたい媒体や掲載サービスの土台として使いやすいドメインです。',
      useCases: [
        'アーティスト紹介サイト',
        '作品掲載型ポータル',
        '制作依頼の窓口ページ',
        'インタビュー・特集メディア',
      ],
      searchExcerpt: '日本語で創作者を掲げると、入口の迷いがぐっと減ります。',
      searchKeywords: 'アーティスト、作家、作品紹介、依頼受付、インタビュー、creative',
      seoTitle: 'アーティスト.jp — 日本語で創作者の導線をつくりやすいドメイン',
      seoDescription:
        '作品紹介、掲載型ポータル、制作依頼、インタビュー企画など、日本語向けアーティスト発信に向く.jpドメイン。',
      ogTitle: 'アーティスト.jp｜rePlay Domains',
      ogDescription: '日本語で創作者の活動を見せやすいドメイン',
    },

    // Singer Set
    {
      domainName: 'singer.jp',
      description:
        '職能を一語で示せるので、ボーカル中心のサービスや媒体に照準を合わせやすい.jpドメインです。シンガーのプロフィール掲載、ボイストレーニング案内、オーディション情報、ライブ出演者紹介など、歌う人を軸にした導線をシンプルに組み立てられます。',
      registrationDate: '2008-12-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'singer-jp',
      category: '音楽・エンターテインメント',
      minimumOffer: 5000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '歌い手を主役に置けるドメイン',
      richSummaryIntro:
        'singer.jpは、バンドや楽曲ではなく、歌う人そのものに焦点を当てたい企画で使いやすい名前です。プロフィール、出演情報、学習支援まで、ボーカリストの活動を複数の角度から整理できます。',
      richSummaryBullets: [
        '職能名だから対象がぶれにくい',
        '講師紹介やオーディション情報にも使える',
        '英字でも日本で意味が通りやすい',
        '個人活動から掲載型まで広げられる',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'シンガーの紹介、学習、出演機会の案内をまとめる起点として扱いやすいドメインです。',
      useCases: [
        'シンガープロフィール掲載サイト',
        'ボイストレーニング案内',
        'オーディション情報ページ',
        'ライブ出演者紹介メディア',
      ],
      searchExcerpt: '歌そのものではなく、歌う人を看板にしたいときの.jp。',
      searchKeywords: 'singer、シンガー、ボーカル、歌手、オーディション、music',
      seoTitle: 'singer.jp — 歌い手を主役に据えやすいドメイン',
      seoDescription:
        'シンガー紹介、ボイストレーニング、オーディション案内、出演者掲載などに向く.jpドメイン。',
      ogTitle: 'singer.jp｜rePlay Domains',
      ogDescription: '歌う人に焦点を当てた導線をつくりやすいドメイン',
    },
    {
      domainName: 'シンガー.jp',
      description:
        '日本語で「シンガー」と示せるため、音楽経験の浅い層にも入りやすい.jpドメインです。歌手の紹介、キッズ向けボーカル教室、配信者のボイスブランディング、オーディション告知など、国内向けのわかりやすさを優先した企画にしっかりはまります。',
      registrationDate: '2008-12-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'singer-jp-idn',
      category: '音楽・エンターテインメント',
      minimumOffer: 5000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'シンガー.jp',
      richSummaryTitle: '日本語で歌い手の活動を見せやすい名前',
      richSummaryIntro:
        'シンガー.jpは、日本語のわかりやすさを活かして、歌う人に関わる情報やサービスを集めやすいドメインです。レッスン、紹介、募集、配信支援など、国内ユーザー向けの入口を素直に設計できます。',
      richSummaryBullets: [
        '日本語なので初見でも内容を想像しやすい',
        '子ども向け教室の案内にも使いやすい',
        '配信や発声トレーニングにも広げられる',
        'オーディション募集とも並べやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '歌手やボーカル志向のユーザーに向けた紹介と学習の導線をまとめやすいドメインです。',
      useCases: [
        '歌手紹介サイト',
        'ボーカル教室案内',
        '配信者向けボイスブランディング情報',
        'オーディション募集ページ',
      ],
      searchExcerpt: '歌い手を日本語で掲げると、入口のやさしさが変わります。',
      searchKeywords: 'シンガー、歌手、ボーカル、レッスン、オーディション、配信',
      seoTitle: 'シンガー.jp — 日本語で歌い手向け導線をつくりやすいドメイン',
      seoDescription:
        '歌手紹介、ボーカル教室、配信者向け情報、オーディション告知など、日本語向けに展開しやすい.jpドメイン。',
      ogTitle: 'シンガー.jp｜rePlay Domains',
      ogDescription: '日本語で歌い手の活動や学びを見せやすいドメイン',
    },

    // Rome Set addition
    {
      domainName: 'ローマ.jp',
      description:
        '歴史都市としての厚みと、旅先としての華やかさを日本語でそのまま示せる.jpドメインです。遺跡巡りのガイド、美術館案内、食文化の紹介、ハネムーン向けの滞在提案など、ローマの時間の重なりを伝える企画に静かな説得力が生まれます。',
      registrationDate: '2006-04-17T00:00:00.000Z',
      status: 'open' as const,
      slug: 'rome-jp-idn',
      category: '旅行・観光',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'ローマ.jp',
      richSummaryTitle: '歴史と旅情を同時に見せやすい都市ドメイン',
      richSummaryIntro:
        'ローマ.jpは、日本語で都市名を掲げながら、観光だけに閉じず文化や食まで含めた案内に広げやすい名前です。遺跡、美術、宗教建築、街歩きといった複数の魅力を一つの流れでまとめられます。',
      richSummaryBullets: [
        '歴史都市としての印象が自然に立つ',
        '美術館や遺跡の案内とも結びつきやすい',
        '街歩きや食の企画も載せやすい',
        '日本語で旅情を伝えやすい名前',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'ローマ観光や文化体験を日本語で丁寧に案内する起点として使いやすいドメインです。',
      useCases: [
        'ローマ旅行ガイド',
        '遺跡・美術館案内メディア',
        '街歩きとグルメの情報サイト',
        'ハネムーン向け滞在提案ページ',
      ],
      searchExcerpt: '遺跡も美術も食もある街だから、名前だけで企画が膨らみます。',
      searchKeywords: 'ローマ、イタリア、旅行、美術館、遺跡、グルメ',
      seoTitle: 'ローマ.jp — 歴史都市ローマを日本語で見せやすいドメイン',
      seoDescription:
        '旅行ガイド、遺跡案内、美術館情報、グルメ紹介など、ローマ関連の日本語向け発信に向く.jpドメイン。',
      ogTitle: 'ローマ.jp｜rePlay Domains',
      ogDescription: 'ローマの歴史と旅情を日本語で伝えやすいドメイン',
    },

    // Standalone domains
    {
      domainName: 'セール.com',
      description:
        '売る理由が先に立つ、強い一語です。セール.comは、期間限定の値引き情報、ブランド横断のキャンペーン集約、アウトレット告知、ECの特設導線など、購買のきっかけをつくる企画に切れ味を与え、名前そのものが行動を促すフックになります。',
      registrationDate: '2005-09-03T00:00:00.000Z',
      status: 'open' as const,
      slug: 'sale-com-idn',
      category: 'ショッピング・EC',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'セール.com',
      richSummaryTitle: '買う理由を先に提示できるドメイン',
      richSummaryIntro:
        'セール.comは、価格訴求だけでなく、時期や企画の熱量まで含めて伝えられる短い名前です。総合セール情報、ブランド横断イベント、会員向け特設ページなど、ECや販促の入口として置いたときの即効性が際立ちます。',
      richSummaryBullets: [
        '一語で購買の空気をつくりやすい',
        '期間限定企画の看板として強く働く',
        'モール型にも単独ブランドにも展開できる',
        '覚えやすく広告導線にも乗せやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '値引きや販促を中心にしたEC企画を、短く強い名前で束ねたい場面に向くドメインです。',
      useCases: [
        '総合セール情報サイト',
        'ECブランドのキャンペーン特設ページ',
        'アウトレット・在庫一掃企画',
        '会員向け限定オファーの導線',
      ],
      searchExcerpt: '「安い」ではなく、「今買う理由」をつくる一語。',
      searchKeywords: 'セール、sale、EC、キャンペーン、アウトレット、ショッピング',
      seoTitle: 'セール.com — ECと販促企画に切れ味を与えるドメイン',
      seoDescription:
        '総合セール情報、ECキャンペーン、アウトレット企画、限定オファー導線などに向く日本語.comドメイン。',
      ogTitle: 'セール.com｜rePlay Domains',
      ogDescription: '購買のきっかけをつくる短く強いドメイン',
    },
    {
      domainName: '派遣.com',
      description:
        '人手を動かす二文字は、想像以上に重い。派遣.comは、求人一覧だけで終わらず、人材派遣会社の窓口、職種別エントリー導線、短期案件の特集、企業向けの人員相談ページまで、就業と配置の両面を整理できる名前として力を発揮します。',
      registrationDate: '2005-09-18T00:00:00.000Z',
      status: 'open' as const,
      slug: 'haken-com-idn',
      category: '人材・ビジネス',
      minimumOffer: 50000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: '派遣.com',
      richSummaryTitle: '就業と配置の両方を受け止めるドメイン',
      richSummaryIntro:
        '派遣.comは、働く人の募集だけでなく、企業側の人員ニーズまで一つの言葉でつなげられるドメインです。短期、単発、専門職、紹介予定派遣など、雇用形態ごとの導線を整理するときにも名前の強さがそのまま効きます。',
      richSummaryBullets: [
        '業種横断で人材領域をまとめやすい',
        '求職者向けと企業向けの両面を持てる',
        '雇用形態の整理に名前が負けにくい',
        '短く強く記憶に残る日本語.com',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '派遣人材の募集、案件紹介、企業相談を一体で見せる起点として扱いやすいドメインです。',
      useCases: [
        '人材派遣会社の公式窓口',
        '職種別エントリーサイト',
        '短期・単発案件の特集ページ',
        '企業向け人員相談サービス',
      ],
      searchExcerpt: '募集ではなく、配置まで見据えた人材領域のど真ん中。',
      searchKeywords: '派遣、人材派遣、求人、スタッフ、短期案件、HR',
      seoTitle: '派遣.com — 人材配置の中心線を引けるドメイン',
      seoDescription:
        '人材派遣会社、職種別エントリー、短期案件特集、企業向け人員相談などに向く日本語.comドメイン。',
      ogTitle: '派遣.com｜rePlay Domains',
      ogDescription: '人材派遣の募集と配置を一体で見せやすいドメイン',
    },

    // Reggae Set
    {
      domainName: 'レゲエ.com',
      description:
        '音楽ジャンル名であり、ライフスタイルの気分まで含んだ「レゲエ」をそのまま掲げられる.comです。新譜紹介、フェス案内、サウンドシステム文化の解説、ダンスホール寄りの企画まで、単なる音源紹介で終わらない媒体の軸として温度を保ちやすい名前です。',
      registrationDate: '2005-08-14T00:00:00.000Z',
      status: 'open' as const,
      slug: 'reggae-com-idn',
      category: '音楽・エンターテインメント',
      minimumOffer: 1500000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: 'レゲエ.com',
      richSummaryTitle: '音楽とカルチャーを同時に抱えられるドメイン',
      richSummaryIntro:
        'レゲエ.comは、ジャンル名そのものの認知が高く、音楽だけでなく現場の空気感まで含めて見せやすいドメインです。レビュー、フェス情報、カルチャー解説など、熱量のある読み物やコミュニティ導線に向いています。',
      richSummaryBullets: [
        'ジャンル名の親しみがそのまま効く',
        'ライブやフェスの案内にもつなげやすい',
        '音楽史や文化解説も載せやすい',
        'コミュニティ色のある運用にも向いている',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'レゲエ音楽と周辺カルチャーを横断して見せるメディアや案内窓口に向くドメインです。',
      useCases: [
        'レゲエニュースメディア',
        'フェス・ライブ情報サイト',
        'サウンドシステム文化の解説ページ',
        'DJ・セレクター紹介メディア',
      ],
      searchExcerpt: '音楽名であり、現場の空気でもある。その両方を乗せられる。',
      searchKeywords: 'レゲエ、reggae、フェス、ダンスホール、DJ、music',
      seoTitle: 'レゲエ.com — レゲエ文化を広く見せやすいドメイン',
      seoDescription:
        '新譜紹介、フェス情報、カルチャー解説、DJ紹介など、レゲエ関連の発信に向く日本語.comドメイン。',
      ogTitle: 'レゲエ.com｜rePlay Domains',
      ogDescription: 'レゲエ音楽と周辺カルチャーを広く扱いやすいドメイン',
    },
    {
      domainName: '激安旅行.com',
      description:
        '価格感が最初に伝わるので、用途がぶれにくい日本語.comです。格安ツアー、LCC活用術、ホテルと航空券の組み合わせ提案、学生や若年層向けの旅メディアなど、費用を起点に旅を組み立てる企画にすばやく輪郭を与えます。',
      registrationDate: '2006-02-04T00:00:00.000Z',
      status: 'open' as const,
      slug: 'gekiyasu-travel-com-idn',
      category: '旅行・観光',
      minimumOffer: 15000000,
      featured: false,
      domainScript: 'japanese' as const,
      idnDisplay: '激安旅行.com',
      richSummaryTitle: '価格起点の旅行導線をつくりやすい名前',
      richSummaryIntro:
        '激安旅行.comは、安く移動し泊まることを前提にした旅の比較や提案に向くドメインです。LCC、宿泊、学生旅行、直前予約など、予算に敏感な層へ向けた企画をまとめやすくなります。',
      richSummaryBullets: [
        '価格重視の旅だとすぐ伝わる',
        '航空券と宿泊の比較企画にも広げやすい',
        '若年層向けメディアにも合わせやすい',
        '短期旅行の提案ページにも置きやすい',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        '予算を起点にした旅行比較や企画特集をまとめる場として使いやすいドメインです。',
      useCases: [
        '格安旅行の比較サイト',
        'LCC活用ガイド',
        '学生旅行向けメディア',
        '直前予約の特集ページ',
      ],
      searchExcerpt: '安く行く方法から逆算して旅を組みたい人に、まっすぐ届く。',
      searchKeywords: '激安旅行、格安ツアー、LCC、旅行比較、学生旅行、travel',
      seoTitle: '激安旅行.com — 価格起点の旅企画をまとめやすいドメイン',
      seoDescription:
        '格安ツアー、LCC活用、学生旅行、直前予約など、価格重視の旅行情報に向く日本語.comドメイン。',
      ogTitle: '激安旅行.com｜rePlay Domains',
      ogDescription: '予算重視の旅行導線をつくりやすいドメイン',
    },
    {
      domainName: 'sneakers.jp',
      description:
        '商品名の枠を超えて、ファッションとカルチャーの接点まで抱えられる.jpドメインです。新作紹介、限定モデルの読み物、コーディネート提案、リセール市場の解説など、スニーカーを履き物としてだけでなくスタイルとして見せたい企画に力を発揮します。',
      registrationDate: '2008-08-01T00:00:00.000Z',
      status: 'open' as const,
      slug: 'sneakers-jp',
      category: 'ファッション・スポーツ',
      minimumOffer: 10000000,
      featured: false,
      domainScript: 'latin' as const,
      richSummaryTitle: '履き物以上の文脈を載せやすいドメイン',
      richSummaryIntro:
        'sneakers.jpは、商品の紹介だけでなく、コーディネートやカルチャー記事までまとめやすい名前です。ブランド横断のメディアにも、特定ショップの編集色を持つECにも展開しやすい余白があります。',
      richSummaryBullets: [
        '商品紹介とスタイル提案を両立しやすい',
        '限定モデルや発売情報とも相性が良い',
        'ファッション寄りにもスポーツ寄りにも寄せられる',
        '短く覚えやすい英字名',
      ],
      useCasesTitle: '想定される活用シーン',
      useCasesSummary:
        'スニーカーを軸にしたメディア、EC、読み物を横断的に組み立てやすいドメインです。',
      useCases: [
        'スニーカー特化EC',
        '新作・発売情報メディア',
        'コーディネート提案サイト',
        'リセール市場の解説ページ',
      ],
      searchExcerpt: '靴の話で終わらず、スタイルの話まで広げられる名前。',
      searchKeywords: 'sneakers、スニーカー、ファッション、新作、コーディネート、shoes',
      seoTitle: 'sneakers.jp — スニーカーカルチャーを見せやすいドメイン',
      seoDescription:
        '新作紹介、限定モデル、コーデ提案、リセール解説など、スニーカー領域の発信やECに向く.jpドメイン。',
      ogTitle: 'sneakers.jp｜rePlay Domains',
      ogDescription: 'スニーカーをファッションと文化の両面で見せやすいドメイン',
    },
  ]

  // Create domains sequentially to ensure slug uniqueness checks work correctly
  for (const d of domains) {
    const ascii = toASCII(d.domainName)
    const extension = d.domainName.split('.').pop()
    const categoryId = categoryMap.get(d.category)
    const domainData = {
      domainName: d.domainName,
      domainASCII: ascii,
      description: d.description,
      extension,
      domainStatus: d.status,
      minimumOffer: d.minimumOffer,
      featured: d.featured,
      registrationDate: d.registrationDate,
      _status: 'published' as const,
      slugOverride: d.slug,
      slugLock: false,
      domainScript: d.domainScript,
      ...(d.idnDisplay ? { domainUnicode: d.idnDisplay } : {}),
      ...(d.featuredImage ? { featuredImage: d.featuredImage } : {}),
      ...(categoryId ? { category: categoryId } : {}),
      ...(d.richSummaryTitle ? { richSummaryTitle: d.richSummaryTitle } : {}),
      ...(d.richSummaryIntro ? { richSummaryIntro: toLexicalJSON(d.richSummaryIntro) } : {}),
      ...(d.richSummaryBullets.length
        ? { richSummaryBullets: d.richSummaryBullets.filter(Boolean).map((bullet) => ({ bullet })) }
        : {}),
      ...(d.useCasesTitle ? { useCasesTitle: d.useCasesTitle } : {}),
      ...(d.useCasesSummary ? { useCasesSummary: toLexicalJSON(d.useCasesSummary) } : {}),
      ...(d.useCases.length
        ? { useCases: d.useCases.filter(Boolean).map((useCase) => ({ useCase })) }
        : {}),
      searchExcerpt: d.searchExcerpt ?? d.description,
      searchKeywords: d.searchKeywords ?? d.domainName,
      meta: {
        title: d.seoTitle,
        description: d.seoDescription,
        ogTitle: d.ogTitle,
        ogDescription: d.ogDescription,
      },
    }

    payload.logger.info(
      `[seed:domain] ${d.domainName} slug=${d.slug} featuredImage=${String(
        d.featuredImage,
      )} category=${String(categoryId)} metaImage=omitted ogImage=omitted richSummaryBulletsUndefined=${String(
        !d.richSummaryBullets,
      )} useCasesUndefined=${String(!d.useCases)} statusKey=${String(
        'status' in domainData,
      )} domainStatusKey=${String('domainStatus' in domainData)}`,
    )

    await payload.create({
      collection: 'domains',
      depth: 0,
      context: { disableRevalidate: true },
      data: domainData,
    })
  }

  payload.logger.info(`— Seeded ${domains.length} domains across ${categories.length} categories`)
}
