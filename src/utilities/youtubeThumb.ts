/**
 * Extract YouTube video ID from various URL formats and generate thumbnail URL.
 * Uses hqdefault.jpg (480×360) which is available for all public videos.
 */
export function getYouTubeThumbnailUrl(videoUrl: string | null | undefined): string | null {
  if (!videoUrl) return null

  // Match various YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = videoUrl.match(pattern)
    if (match?.[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
    }
  }

  return null
}
