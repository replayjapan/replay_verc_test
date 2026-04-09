import Image from 'next/image'
import Link from 'next/link'

import { BudouX } from '@/components/BudouX'
import { YouTubePlayOverlay } from '@/components/shared/YouTubePlayOverlay'
import { getYouTubeThumbnailUrl } from '@/utilities/youtubeThumb'
import type { Media, Video } from '@/payload-types'

const videoTypeLabels: Record<string, string> = {
  tutorial: 'チュートリアル',
  demo: 'デモ',
  webinar: 'ウェビナー',
  presentation: 'プレゼンテーション',
  interview: 'インタビュー',
  testimonial: '体験談',
}

interface VideoThumbnailCardProps {
  video: Video
}

/**
 * Reusable video card with YouTube-style red play overlay.
 * Used on the videos listing grid and the video item page related-videos grid.
 */
export function VideoThumbnailCard({ video }: VideoThumbnailCardProps) {
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
      className="group block border border-slate-200 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--brand-alt)] transition-all duration-200"
    >
      {/* Thumbnail with play overlay */}
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        {thumbnail?.url ? (
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : ytThumb ? (
          <Image
            src={ytThumb}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[#2a3660]" />
        )}

        <div className="absolute inset-0 bg-black/20 transition-opacity duration-200 group-hover:bg-black/30" />
        <YouTubePlayOverlay size="md" />

        {video.duration && (
          <span className="absolute bottom-2 right-2 text-xs font-medium px-2 py-0.5 rounded bg-black/70 text-white tabular-nums">
            {video.duration}
          </span>
        )}
      </div>

      {/* Card content */}
      <div className="p-5">
        <span className="inline-block text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--brand-alt)]/10 text-[var(--brand-alt)]">
          <BudouX>{typeLabel}</BudouX>
        </span>
        <h3 className="mt-3 text-lg font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-[var(--brand-alt)] transition-colors duration-200">
          <BudouX>{video.title}</BudouX>
        </h3>
        {video.description && (
          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
            <BudouX>{video.description}</BudouX>
          </p>
        )}
        {publishedDate && (
          <time className="block mt-3 text-sm text-slate-600">{publishedDate}</time>
        )}
      </div>
    </Link>
  )
}
