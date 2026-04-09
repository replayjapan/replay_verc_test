import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { BudouX } from '@/components/BudouX'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import { ListingPagination } from '@/components/shared/ListingPagination'
import { PortfolioCard } from '@/components/portfolio/PortfolioCard'
import { generateListingMeta } from '@/utilities/generateListingMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Media, Portfolio, PortfoliosSetting } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PortfolioPage() {
  const payload = await getPayload({ config: configPromise })
  const settings = (await getCachedGlobal('portfolios-settings', 1)()) as PortfoliosSetting

  const portfolios = await payload.find({
    collection: 'portfolios',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
  })

  const [featured, ...rest] = portfolios.docs
  const heroImage = typeof settings?.heroImage === 'object' ? (settings.heroImage as Media) : null

  return (
    <article className="pt-16">
      <div className="-mt-16">
        <HeroHeaderBlock
          size="medium"
          title={settings?.pageTitle || 'ポートフォリオ'}
          subtitle={
            settings?.pageSubtitle ||
            'rePlayが手がけた実際のプロジェクトをご紹介します。'
          }
          image={heroImage ?? null}
          headingAlignment="left"
        />
      </div>

      {portfolios.docs.length === 0 ? (
        <div className="text-center py-20 text-slate-600">
          <p className="text-lg">
            <BudouX>現在公開中のプロジェクトはありません。</BudouX>
          </p>
        </div>
      ) : (
        <>
          {/* Featured project — the slate-50 field IS the staging */}
          {featured && (
            <section className="bg-slate-50 py-16 md:py-24">
              <div className="max-w-6xl mx-auto px-6">
                <FeaturedProjectCard featured={featured} />
              </div>
            </section>
          )}

          {/* Remaining projects — 3-col grid */}
          {rest.length > 0 && (
            <section className="bg-white py-16 md:py-24">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-slate-900 mb-10 md:mb-12">
                  すべてのプロジェクト
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {rest.map((project) => (
                    <PortfolioCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Pagination — renders nothing if totalPages ≤ 1 */}
      <ListingPagination
        basePath="/portfolio"
        page={portfolios.page || 1}
        totalPages={portfolios.totalPages}
      />

      {/* CTA section — light bg since footer is dark */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-4">
            <BudouX>プロジェクトのご相談</BudouX>
          </h2>
          <p className="text-base md:text-lg leading-8 text-slate-600 mb-8">
            <BudouX>
              Web開発やデジタル戦略に関するプロジェクトのご相談をお受けしています。
            </BudouX>
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-primary text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-brand-alt hover:text-brand-primary transition-colors duration-200 text-base"
          >
            お問い合わせページへ
          </Link>
        </div>
      </section>
    </article>
  )
}

// ─── Featured Project Card ─────────────────────────────────────────────────

function FeaturedProjectCard({ featured }: { featured: Portfolio }) {
  const image = typeof featured.featuredImage === 'object' ? (featured.featuredImage as Media) : null
  const technologies = featured.technologies || []
  const visibleTech = technologies.slice(0, 5)
  const projectUrlDisplay = featured.projectUrl
    ? featured.projectUrl.replace(/^https?:\/\//, '')
    : null

  return (
    <Link
      href={`/portfolio/${featured.slug}`}
      className="group block"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Image panel — full-bleed, no card border */}
        <div className="relative aspect-[4/3] md:aspect-[3/2] md:col-span-7 bg-slate-100 overflow-hidden rounded-sm">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || featured.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[#2a3660]" />
          )}
        </div>

        {/* Content panel — typographic staging, no card */}
        <div className="md:col-span-5 md:pr-4">
          {featured.client && (
            <span className="inline-block text-[11px] font-semibold tracking-[0.12em] text-[var(--brand-alt)]">
              <BudouX>{featured.client}</BudouX>
            </span>
          )}
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-slate-900 group-hover:text-[var(--brand-alt)] transition-colors duration-200">
            <BudouX>{featured.title}</BudouX>
          </h2>
          {featured.summary && (
            <p className="mt-5 text-base md:text-lg text-slate-700 leading-8 line-clamp-3">
              <BudouX>{featured.summary}</BudouX>
            </p>
          )}

          {visibleTech.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {visibleTech.map((tech, i) => (
                <span
                  key={tech.id || i}
                  className="text-[11px] px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-4">
            {projectUrlDisplay ? (
              <span className="text-sm text-slate-600 truncate">{projectUrlDisplay}</span>
            ) : (
              <span />
            )}
            <span className="text-sm font-medium text-brand-primary underline decoration-1 underline-offset-4 group-hover:text-[var(--brand-alt)] transition-colors duration-200 whitespace-nowrap">
              詳しく見る →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function generateMetadata(): Promise<Metadata> {
  return generateListingMeta({
    globalSlug: 'portfolios-settings',
    fallbackTitle: 'ポートフォリオ',
    fallbackDescription: '制作実績の一覧をご覧ください。',
  })
}
