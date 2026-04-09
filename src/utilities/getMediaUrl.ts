/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 *
 * For same-origin Payload media (e.g., /api/media/file/...), returns relative URLs
 * which are resolved by the browser to the correct domain/port. This approach:
 * - Works in development regardless of port (3000, 3002, etc.)
 * - Works in production on any domain
 * - Follows Next.js best practices for local assets
 * - Avoids hardcoded localhost URLs
 *
 * External/CDN URLs (starting with http:// or https://) are returned as-is.
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) {
    return ''
  }

  const normalizedCacheTag = cacheTag ? encodeURIComponent(cacheTag) : ''

  const appendCache = (value: string) => {
    if (!normalizedCacheTag) {
      return value
    }

    const separator = value.includes('?') ? '&' : '?'
    return `${value}${separator}v=${normalizedCacheTag}`
  }

  // If already an absolute URL (e.g., CDN), return as-is with cache tag
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return appendCache(url)
  }

  // For Payload API media (same-origin), use relative URLs
  // Browser automatically resolves to correct port/domain at runtime
  const normalizedPath = url.startsWith('/') ? url : `/${url}`
  return appendCache(normalizedPath)
}
