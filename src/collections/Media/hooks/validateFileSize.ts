import type { CollectionBeforeOperationHook } from 'payload'

/** Size limits in bytes, keyed by MIME type prefix or exact match */
const SIZE_LIMITS: Record<string, number> = {
  'image/svg+xml': 500 * 1024, // 500 KB
  'application/pdf': 10 * 1024 * 1024, // 10 MB
  image: 10 * 1024 * 1024, // 10 MB (all other image types)
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(0)}MB`
  }
  return `${(bytes / 1024).toFixed(0)}KB`
}

function getLimitForMime(mimeType: string): number | null {
  // Check exact match first (e.g., image/svg+xml)
  if (SIZE_LIMITS[mimeType] !== undefined) {
    return SIZE_LIMITS[mimeType]
  }
  // Check prefix match (e.g., image)
  const prefix = mimeType.split('/')[0]
  if (SIZE_LIMITS[prefix] !== undefined) {
    return SIZE_LIMITS[prefix]
  }
  return null
}

export const validateFileSize: CollectionBeforeOperationHook = ({ req, operation }) => {
  if ((operation === 'create' || operation === 'update') && req.file) {
    const { size, mimetype } = req.file as { size: number; mimetype: string }
    const limit = getLimitForMime(mimetype)

    if (limit !== null && size > limit) {
      const limitStr = formatBytes(limit)
      throw new Error(`File size exceeds the ${limitStr} limit`)
    }
  }
}
