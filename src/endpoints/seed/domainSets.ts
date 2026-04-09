import type { Payload } from 'payload'

/**
 * Seed domain sets after domains have been created.
 * Queries existing domains by name to build membership arrays.
 * A1: 5 sets. A2: merged Hotel sets, updated existing, created new = 13 total.
 */
export async function seedDomainSets(payload: Payload): Promise<void> {
  payload.logger.info('— Seeding domain sets...')

  // Fetch all seeded domains so we can reference them by name
  const { docs: allDomains } = await payload.find({
    collection: 'domains',
    limit: 200,
    depth: 0,
  })

  const domainByName = new Map(allDomains.map((d) => [d.domainName, d.id]))

  // Helper: resolve domain names to IDs, skipping any that weren't seeded
  function resolveMemberIds(names: string[]): number[] {
    return names
      .map((name) => domainByName.get(name))
      .filter((id): id is number => id !== undefined)
  }

  const sets = [
    // ═══════════════════════════════════════════
    // EXISTING SETS (updated with A2 members)
    // ═══════════════════════════════════════════
    {
      title: 'Hotel Set',
      slug: 'hotel-set',
      policy: 'preferred_bundle' as const,
      description: '日本語ユーザーのためのホテル予約・旅行ブランドの完全パッケージ',
      members: [
        'ホテルズ.com',
        '海外ホテル.jp',
        '激安ホテル.com',
        '海外ホテル.com',
        '国内ホテル.com',
        'ニューヨークホテル.com',
        'ハワイホテル.com',
        'ホテルズ.jp',
        '激安旅行.com',
      ],
    },
    {
      title: 'Boston Set',
      slug: 'boston-set',
      policy: 'bundle_only' as const,
      description: 'ボストンと日本をつなぐ地域ブランドポートフォリオ',
      members: ['boston.jp', 'ボストン.jp'],
    },
    {
      title: 'London Set',
      slug: 'london-set',
      policy: 'bundle_only' as const,
      description: 'ロンドンと日本の文化・ビジネス交流のドメインペア',
      members: ['london.jp', 'ロンドン.jp'],
    },
    {
      title: 'Diamonds Set',
      slug: 'diamonds-set',
      policy: 'bundle_only' as const,
      description: 'ラグジュアリー・ジュエリーブランドのドメインペア',
      members: ['diamonds.jp', 'ダイヤモンド.jp'],
    },
    {
      title: 'Hip-Hop Set',
      slug: 'hiphop-set',
      policy: 'preferred_bundle' as const,
      description: '日本のヒップホップカルチャーとメディアのブランド基盤',
      members: ['ヒップホップ.jp', 'hip-hop.jp', 'hiphopjapan.com'],
    },

    // ═══════════════════════════════════════════
    // NEW SETS (A2)
    // ═══════════════════════════════════════════
    {
      title: '芸能 Entertainment Set',
      slug: 'geino-entertainment-set',
      policy: 'preferred_bundle' as const,
      description: '日本のエンターテインメント・芸能メディアのための総合ドメイン群',
      members: ['芸能界.com', 'geinokai.com', 'geinoukai.com', 'geinojin.com'],
    },
    {
      title: 'Dance Set',
      slug: 'dance-set',
      policy: 'preferred_bundle' as const,
      description: 'ダンスカルチャーとパフォーマンスアートのブランド基盤',
      members: ['dancer.jp', 'ダンサー.jp'],
    },
    {
      title: 'Los Angeles Set',
      slug: 'los-angeles-set',
      policy: 'bundle_only' as const,
      description: 'ロサンゼルスの日本語圏プレゼンスを確立するドメインセット',
      members: ['losangeles.jp', 'ロサンゼルス.jp', 'ロス.jp'],
    },
    {
      title: 'Honolulu/Waikiki Set',
      slug: 'honolulu-waikiki-set',
      policy: 'bundle_only' as const,
      description: 'ハワイ観光と日本人旅行者をつなぐドメインセット',
      members: ['honolulu.jp', 'ホノルル.jp', 'ワイキキ.jp'],
    },
    {
      title: 'New York City Set',
      slug: 'new-york-city-set',
      policy: 'bundle_only' as const,
      description: 'ニューヨークの日本語圏ブランド構築セット',
      members: ['newyorkcity.jp', 'ニューヨークシティ.jp'],
    },
    {
      title: 'Rome Set',
      slug: 'rome-set',
      policy: 'bundle_only' as const,
      description: 'ローマと日本の観光・文化交流ドメインペア',
      members: ['rome.jp', 'ローマ.jp'],
    },
    {
      title: 'Artist Set',
      slug: 'artist-set',
      policy: 'bundle_only' as const,
      description: 'アーティスト・クリエイターのプラットフォームドメインペア',
      members: ['artist.jp', 'アーティスト.jp'],
    },
    {
      title: 'Singer Set',
      slug: 'singer-set',
      policy: 'bundle_only' as const,
      description: 'シンガー・ボーカリストのブランドドメインペア',
      members: ['singer.jp', 'シンガー.jp'],
    },
  ]

  for (const s of sets) {
    const memberIds = resolveMemberIds(s.members)
    if (memberIds.length === 0) continue

    await payload.create({
      collection: 'domain-sets',
      depth: 0,
      context: { disableRevalidate: true },
      data: {
        title: s.title,
        slug: s.slug,
        policy: s.policy,
        description: s.description,
        members: memberIds,
      },
    })
  }

  payload.logger.info(`— Seeded ${sets.length} domain sets`)
}
