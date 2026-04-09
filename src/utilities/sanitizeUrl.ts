/**
 * Sanitize a CMS-supplied URL string to prevent URL-injection / click-XSS.
 *
 * Allows only these schemes:
 * - http://
 * - https://
 * - / (relative paths)
 * - mailto:
 * - tel:
 *
 * Anything else (javascript:, data:, vbscript:, file:, etc.) is rejected
 * and returns '#' as a safe fallback.
 *
 * Use this on any URL that originates from Payload content (ctaUrl, projectUrl,
 * linkUrl, etc.) before passing it to <Link href> or <a href>.
 */
export function sanitizeUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return '#'

  const trimmed = url.trim()
  if (trimmed === '') return '#'

  // Allow relative paths starting with /
  if (trimmed.startsWith('/')) return trimmed

  // Allow anchors
  if (trimmed.startsWith('#')) return trimmed

  // Allow known safe schemes (case-insensitive)
  const lowered = trimmed.toLowerCase()
  if (
    lowered.startsWith('http://') ||
    lowered.startsWith('https://') ||
    lowered.startsWith('mailto:') ||
    lowered.startsWith('tel:')
  ) {
    return trimmed
  }

  // Anything else (javascript:, data:, vbscript:, file:, etc.) is rejected
  return '#'
}
