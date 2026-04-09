/**
 * Dev fallback homepage — renders at / when no homepage exists in Pages collection.
 * Uses real promoted components (PremiumDomainCard, SectionHeader) where they fit.
 * Delete this component when a real homepage is built.
 */
import { BudouX } from '@/components/BudouX'
import Link from 'next/link'
import { PremiumDomainCard } from '@/components/domains/PremiumDomainCard/Component'
import { SectionHeader } from '@/components/domains/SectionHeader/Component'

const sampleDomains = [
  {
    domainName: 'boston.jp',
    category: 'ビジネス',
    status: 'open' as const,
    minimumOffer: 500000,
    href: '/domains/boston-jp',
    featured: true,
  },
  {
    domainName: 'sakura-travel.jp',
    category: '旅行',
    status: 'open' as const,
    minimumOffer: 400000,
    href: '/domains/sakura-travel-jp',
    featured: true,
  },
  {
    domainName: 'techstack.jp',
    category: 'テクノロジー',
    status: 'open' as const,
    minimumOffer: 250000,
    href: '/domains/techstack-jp',
    featured: false,
  },
]

export function DevHomepage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-brand-primary text-white py-20">
        <div className="site-container text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/rePlay_logo_240x80.png"
            alt="rePlay Domains"
            className="mx-auto mb-8 h-16 w-auto brightness-0 invert"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            プレミアム日本語ドメイン
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            厳選された.jpドメインポートフォリオ。ビジネスに最適なドメインをお探しの方へ。
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/domains"
              className="inline-flex items-center px-6 py-3 bg-brand-alt text-brand-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              ドメイン一覧を見る
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>

      {/* Featured domains */}
      <section className="py-16">
        <div className="site-container">
          <SectionHeader
            title="注目のドメイン"
            subtitle="厳選されたプレミアムドメインをご紹介します"
            accentUnderline
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleDomains.map((domain) => (
              <PremiumDomainCard key={domain.domainName} {...domain} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/domains"
              className="text-brand-primary font-semibold hover:underline"
            >
              すべてのドメインを見る →
            </Link>
          </div>
        </div>
      </section>

      {/* About / value prop */}
      <section className="py-16 bg-gray-50">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                title="なぜrePlay Domainsを選ぶのか"
                accentUnderline
              />
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-brand-alt font-bold text-lg">✓</span>
                  <span><BudouX>厳選された日本市場向けプレミアムドメイン</BudouX></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-alt font-bold text-lg">✓</span>
                  <span><BudouX>IDN（国際化ドメイン名）対応</BudouX></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-alt font-bold text-lg">✓</span>
                  <span><BudouX>安全・迅速なドメイン移管サポート</BudouX></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-alt font-bold text-lg">✓</span>
                  <span><BudouX>セットお問い合わせによる優遇条件</BudouX></span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/tokyo_office_pix.png"
                alt="東京オフィス"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="site-container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <BudouX>お探しのドメインはありますか？</BudouX>
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            <BudouX>ポートフォリオに掲載されていないドメインについてもお気軽にご相談ください。</BudouX>
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  )
}
