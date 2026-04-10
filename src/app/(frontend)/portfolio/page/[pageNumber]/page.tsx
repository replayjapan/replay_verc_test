import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { BudouX } from '@/components/BudouX'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import { ListingPagination } from '@/components/shared/ListingPagination'
import { PortfolioCard } from '@/components/portfolio/PortfolioCard'
import { generateListingMeta } from '@/utilities/generateListingMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Media, PortfoliosSetting } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

const PAGE_LIMIT = 12

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function PortfolioPaginatedPage({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise

  const sanitizedPageNumber = Number(pageNumber)

  // Validate: must be a positive integer
  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 1) {
    notFound()
  }

  // Canonical: page 1 lives at /portfolio
  if (sanitizedPageNumber === 1) {
    redirect('/portfolio')
  }

  const payload = await getPayload({ config: configPromise })
  const settings = (await getCachedGlobal('portfolios-settings', 1)()) as PortfoliosSetting

  const portfolios = await payload.find({
    collection: 'portfolios',
    depth: 1,
    limit: PAGE_LIMIT,
    page: sanitizedPageNumber,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
  })

  // Page exceeds available pages
  if (sanitizedPageNumber > (portfolios.totalPages || 1)) {
    notFound()
  }

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
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-8">
              すべてのプロジェクト
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {portfolios.docs.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  const base = await generateListingMeta({
    globalSlug: 'portfolios-settings',
    fallbackTitle: 'ポートフォリオ',
    fallbackDescription: '制作実績の一覧をご覧ください。',
  })

  return {
    ...base,
    title: `${base.title ?? 'ポートフォリオ'} — ページ ${pageNumber}`,
  }
}

export async function generateStaticParams() {
  // Skipped to avoid Vercel build timeout (Neon Postgres in Singapore, build server in D.C.)
  // const payload = await getPayload({ config: configPromise })
  // const { totalDocs } = await payload.count({
  //   collection: 'portfolios',
  //   overrideAccess: false,
  //   where: {
  //     _status: { equals: 'published' },
  //   },
  // })
  //
  // const totalPages = Math.ceil(totalDocs / PAGE_LIMIT)
  //
  // const pages: { pageNumber: string }[] = []
  // // Start from page 2 — page 1 is canonical at /portfolio
  // for (let i = 2; i <= totalPages; i++) {
  //   pages.push({ pageNumber: String(i) })
  // }
  //
  // return pages
  return []
}
