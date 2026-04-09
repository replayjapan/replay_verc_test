import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { BudouX } from '@/components/BudouX'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import { ListingPagination } from '@/components/shared/ListingPagination'
import { YouTubePlayOverlay } from '@/components/shared/YouTubePlayOverlay'
import { VideoThumbnailCard } from '@/components/videos/VideoThumbnailCard'
import { generateListingMeta } from '@/utilities/generateListingMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getYouTubeThumbnailUrl } from '@/utilities/youtubeThumb'
import type { Media, VideosSetting, Video } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

const videoTypeLabels: Record<string, string> = {
  tutorial: 'チュートリアル',
  demo: 'デモ',
  webinar: 'ウェビナー',
  presentation: 'プレゼンテーション',
  interview: 'インタビュー',
  testimonial: '体験談',
}

export default async function VideosPage() {
  const payload = await getPayload({ config: configPromise })
  const settings = (await getCachedGlobal('videos-settings', 1)()) as VideosSetting

  const videos = await payload.find({
    collection: 'videos',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
  })

  const [featured, ...rest] = videos.docs
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
        <>
          {/* Featured video — staged on subtle background */}
          {featured && (
            <section className="bg-slate-50 py-12 md:py-16">
              <div className="max-w-6xl mx-auto px-6">
                <FeaturedVideoCard video={featured} />
              </div>
            </section>
          )}

          {/* Remaining videos — 2-col grid */}
          {rest.length > 0 && (
            <section className="bg-white py-16 md:py-24">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-8">
                  すべての動画
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rest.map((video) => (
                    <VideoThumbnailCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
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

// ─── Featured Video Card ───────────────────────────────────────────────────

function FeaturedVideoCard({ video }: { video: Video }) {
  const thumbnail = typeof video.thumbnail === 'object' ? (video.thumbnail as Media) : null
  const ytThumb = !thumbnail?.url ? getYouTubeThumbnailUrl(video.videoUrl) : null
  const publishedDate = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null
  const typeLabel = videoTypeLabels[video.videoType] || video.videoType

  return (
    <Link
      href={`/videos/${video.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-slate-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--brand-alt)] transition-all duration-200"
    >
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail panel */}
        <div className="relative aspect-video md:aspect-auto md:w-1/2 bg-slate-100 overflow-hidden">
          {thumbnail?.url ? (
            <Image
              src={thumbnail.url}
              alt={thumbnail.alt || video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : ytThumb ? (
            <Image
              src={ytThumb}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[#2a3660]" />
          )}

          <div className="absolute inset-0 bg-black/20 transition-opacity duration-200 group-hover:bg-black/30" />
          <YouTubePlayOverlay size="lg" />

          {video.duration && (
            <span className="absolute bottom-3 right-3 text-xs font-medium px-2 py-0.5 rounded bg-black/70 text-white tabular-nums">
              {video.duration}
            </span>
          )}
        </div>

        {/* Content panel */}
        <div className="flex flex-col justify-center p-6 md:p-10 md:w-1/2">
          <div className="flex items-center gap-3">
            <span className="inline-block text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--brand-alt)]/10 text-[var(--brand-alt)]">
              <BudouX>{typeLabel}</BudouX>
            </span>
            {video.duration && (
              <span className="text-sm text-slate-600">{video.duration}</span>
            )}
          </div>
          <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-900 leading-snug group-hover:text-[var(--brand-alt)] transition-colors duration-200">
            <BudouX>{video.title}</BudouX>
          </h2>
          {video.description && (
            <p className="mt-3 text-base text-slate-700 leading-7 line-clamp-3">
              <BudouX>{video.description}</BudouX>
            </p>
          )}
          <div className="mt-6 flex items-center justify-between">
            {publishedDate && (
              <time className="text-sm text-slate-600">{publishedDate}</time>
            )}
            <span className="text-sm font-medium text-brand-primary underline decoration-1 underline-offset-4 group-hover:text-[var(--brand-alt)] transition-colors duration-200">
              動画を見る →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function generateMetadata(): Promise<Metadata> {
  return generateListingMeta({
    globalSlug: 'videos-settings',
    fallbackTitle: '動画一覧',
    fallbackDescription: '動画コンテンツの一覧をご覧ください。',
  })
}
