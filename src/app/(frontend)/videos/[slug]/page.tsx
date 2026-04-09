import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { BudouX } from '@/components/BudouX'
import { VideoThumbnailCard } from '@/components/videos/VideoThumbnailCard'
import { YouTubePlayOverlay } from '@/components/shared/YouTubePlayOverlay'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import VideoTranscriptAccordion from './VideoTranscriptAccordion'

import type { Media } from '@/payload-types'

const videoTypeLabels: Record<string, string> = {
  tutorial: 'チュートリアル',
  demo: 'デモ',
  webinar: 'ウェビナー',
  presentation: 'プレゼンテーション',
  interview: 'インタビュー',
  testimonial: '体験談',
}

function getVideoEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.hostname.includes('youtu.be')
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get('v')
      if (videoId) return `https://www.youtube.com/embed/${videoId}`
    }
    if (parsed.hostname.includes('vimeo.com')) {
      const videoId = parsed.pathname.split('/').filter(Boolean).pop()
      if (videoId) return `https://player.vimeo.com/video/${videoId}`
    }
  } catch {
    // invalid URL
  }
  return null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const videos = await payload.find({
    collection: 'videos',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return videos.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function VideoDetailPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const video = await queryVideoBySlug({ slug })

  if (!video) notFound()

  const thumbnail = typeof video.thumbnail === 'object' ? (video.thumbnail as Media) : null
  const embedUrl = getVideoEmbedUrl(video.videoUrl)
  const publishedDate = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null
  const typeLabel = videoTypeLabels[video.videoType] || video.videoType
  const hasTranscript = Boolean(video.transcript)

  // Extract safe iframe src from embedCode if present
  let embedIframeSrc: string | null = null
  if (video.embedCode) {
    const iframeMatch = video.embedCode.match(
      /^<iframe\s[^>]*src=["'](https:\/\/(?:www\.youtube\.com\/embed\/|player\.vimeo\.com\/video\/)[^"']+)["'][^>]*><\/iframe>$/s,
    )
    if (iframeMatch) embedIframeSrc = iframeMatch[1]
  }

  // Related videos (excluding current)
  const relatedVideos = await queryRelatedVideos({ currentId: video.id })

  const siteUrl = getServerSideURL()
  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    ...(video.description ? { description: video.description } : {}),
    ...(thumbnail?.url ? { thumbnailUrl: `${siteUrl}${thumbnail.url}` } : {}),
    ...(video.publishedAt ? { uploadDate: video.publishedAt } : {}),
    ...(video.videoUrl ? { contentUrl: video.videoUrl } : {}),
  }

  return (
    <article className="pt-16 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-6 w-full">
        <Link
          href="/videos"
          className="inline-flex items-center gap-1 text-slate-600 hover:text-[var(--brand-alt)] underline decoration-1 underline-offset-4 transition-colors duration-200 text-sm mt-6"
        >
          ← 動画一覧
        </Link>
      </div>

      {/* Video embed — dominates viewport (media-first, no header band) */}
      <section className="mt-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-200 group">
            {embedIframeSrc ? (
              <iframe
                src={embedIframeSrc}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            ) : embedUrl ? (
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            ) : thumbnail?.url ? (
              <>
                <Image
                  src={thumbnail.url}
                  alt={thumbnail.alt || video.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <YouTubePlayOverlay size="lg" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[#2a3660]" />
                <YouTubePlayOverlay size="lg" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Title + metadata + description — secondary below video */}
      <section className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-6">
          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--brand-alt)]/10 text-[var(--brand-alt)]">
              <BudouX>{typeLabel}</BudouX>
            </span>
            {video.duration && (
              <span className="text-sm text-slate-600 tabular-nums">{video.duration}</span>
            )}
            {publishedDate && (
              <>
                <span className="text-slate-300">|</span>
                <time className="text-sm text-slate-600">{publishedDate}</time>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-medium text-slate-900 tracking-[-0.03em] leading-tight">
            <BudouX>{video.title}</BudouX>
          </h1>

          {/* Description */}
          {video.description && (
            <div className="mt-6 text-base md:text-[1.0625rem] leading-8 md:leading-9 text-slate-700">
              <p>
                <BudouX>{video.description}</BudouX>
              </p>
            </div>
          )}

          {/* Transcript accordion */}
          {hasTranscript && video.transcript && (
            <div className="mt-10 pt-8 border-t border-slate-200">
              <VideoTranscriptAccordion transcript={video.transcript as DefaultTypedEditorState} />
            </div>
          )}
        </div>
      </section>

      {/* Related videos */}
      {relatedVideos.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-8">
              関連動画
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedVideos.map((relVideo) => (
                <VideoThumbnailCard key={relVideo.id} video={relVideo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA section — light bg since footer is dark */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-4">
            <BudouX>このトピックについてご相談ください</BudouX>
          </h2>
          <p className="text-base md:text-lg leading-8 text-slate-600 mb-8">
            <BudouX>デジタル戦略やコンテンツ制作に関するお問い合わせをお受けしています。</BudouX>
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
  const { slug = '' } = await paramsPromise
  const video = await queryVideoBySlug({ slug })

  if (!video) return { title: '動画が見つかりません' }

  return generateMeta({ doc: video })
}

const queryVideoBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'videos',
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
  })

  return result.docs?.[0] || null
})

const queryRelatedVideos = cache(async ({ currentId }: { currentId: number }) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'videos',
    draft: false,
    depth: 1,
    limit: 2,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' },
      id: { not_equals: currentId },
    },
    sort: '-publishedAt',
  })
  return result.docs
})
