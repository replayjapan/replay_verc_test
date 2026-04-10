import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { BudouX } from '@/components/BudouX'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import { ListingPagination } from '@/components/shared/ListingPagination'
import { VideoThumbnailCard } from '@/components/videos/VideoThumbnailCard'
import { generateListingMeta } from '@/utilities/generateListingMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Media, VideosSetting } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 600

const PAGE_LIMIT = 12

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function VideosPaginatedPage({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise

  const sanitizedPageNumber = Number(pageNumber)

  // Validate: must be a positive integer
  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 1) {
    notFound()
  }

  // Canonical: page 1 lives at /videos
  if (sanitizedPageNumber === 1) {
    redirect('/videos')
  }

  const payload = await getPayload({ config: configPromise })
  const settings = (await getCachedGlobal('videos-settings', 1)()) as VideosSetting

  const videos = await payload.find({
    collection: 'videos',
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
  if (sanitizedPageNumber > (videos.totalPages || 1)) {
    notFound()
  }

  const heroImage = typeof settings?.heroImage === 'object' ? (settings.heroImage as Media) : null

  return (
    <article className="pt-16">
      <div className="-mt-16">
        <HeroHeaderBlock
          size="medium"
          title={settings?.pageTitle || '動画'}
          subtitle={
            settings?.pageSubtitle ||
            'デジタル戦略やWeb技術に関する動画コンテンツをご覧いただけます。'
          }
          image={heroImage ?? null}
          headingAlignment="left"
        />
      </div>

      {videos.docs.length === 0 ? (
        <div className="text-center py-20 text-slate-600">
          <p className="text-lg">
            <BudouX>現在公開中の動画はありません。</BudouX>
          </p>
        </div>
      ) : (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-8">
              すべての動画
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.docs.map((video) => (
                <VideoThumbnailCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pagination — renders nothing if totalPages ≤ 1 */}
      <ListingPagination basePath="/videos" page={videos.page || 1} totalPages={videos.totalPages} />

      {/* CTA section — light bg since footer is dark */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-4">
            <BudouX>動画制作やデジタル戦略のご相談</BudouX>
          </h2>
          <p className="text-base md:text-lg leading-8 text-slate-600 mb-8">
            <BudouX>
              コンテンツ制作やデジタルマーケティングに関するお問い合わせをお待ちしております。
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
    globalSlug: 'videos-settings',
    fallbackTitle: '動画一覧',
    fallbackDescription: '動画コンテンツの一覧をご覧ください。',
  })

  return {
    ...base,
    title: `${base.title ?? '動画一覧'} — ページ ${pageNumber}`,
  }
}

export async function generateStaticParams() {
  // Skipped to avoid Vercel build timeout (Neon Postgres in Singapore, build server in D.C.)
  // const payload = await getPayload({ config: configPromise })
  // const { totalDocs } = await payload.count({
  //   collection: 'videos',
  //   overrideAccess: false,
  //   where: {
  //     _status: { equals: 'published' },
  //   },
  // })
  //
  // const totalPages = Math.ceil(totalDocs / PAGE_LIMIT)
  //
  // const pages: { pageNumber: string }[] = []
  // // Start from page 2 — page 1 is canonical at /videos
  // for (let i = 2; i <= totalPages; i++) {
  //   pages.push({ pageNumber: String(i) })
  // }
  //
  // return pages
  return []
}
