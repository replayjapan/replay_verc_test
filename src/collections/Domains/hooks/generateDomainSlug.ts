import type { CollectionBeforeChangeHook, Payload } from 'payload'

/**
 * Normalize a string to a valid domain slug: [a-z0-9-] only.
 * Periods become hyphens. All non-latin chars stripped.
 * Duplicate hyphens collapsed. Leading/trailing hyphens trimmed.
 */
const normalizeDomainSlug = (input: string): string =>
  input
    .toLowerCase()
    .replace(/\./g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')

async function ensureUniqueSlug(
  slug: string,
  payload: Payload,
  currentId?: number | string,
): Promise<string> {
  let candidate = slug
  let suffix = 1

  for (;;) {
    const existing = await payload.find({
      collection: 'domains',
      where: {
        slug: { equals: candidate },
        ...(currentId ? { id: { not_equals: currentId } } : {}),
      },
      limit: 1,
      depth: 0,
    })

    if (existing.docs.length === 0) return candidate

    suffix++
    candidate = `${slug}-${suffix}`
  }
}

/**
 * Domain slug generation hook (beforeChange).
 *
 * Strategy:
 * 1. Auto-fill domainASCII from domainName if not provided
 * 2. If slugOverride is set → use it (normalized)
 * 3. If slugLock is true (auto mode) → compute from domainASCII:
 *    - Replace periods with hyphens
 *    - If IDN (xn-- in ASCII or non-ASCII in Unicode), append -idn
 *    - Normalize to [a-z0-9-]
 * 4. Ensure uniqueness by appending -2, -3, … on collision
 */
export const generateDomainSlug: CollectionBeforeChangeHook = async ({
  data,
  req: { payload },
  operation,
  originalDoc,
}) => {
  if (!data) return data

  // Auto-fill domainASCII from domainName if not set
  if (!data.domainASCII && data.domainName) {
    data.domainASCII = (data.domainName as string).toLowerCase()
  }

  // Only auto-generate when slugLock is true (default) or on create without slug
  const shouldGenerate = operation === 'create' || !data.slug || data.slugLock !== false

  if (!shouldGenerate) {
    // User manually set slug (unlocked) — just normalize
    if (typeof data.slug === 'string') {
      data.slug = normalizeDomainSlug(data.slug)
    }
    return data
  }

  let baseSlug: string | undefined

  // Priority 1: slugOverride
  if (typeof data.slugOverride === 'string' && data.slugOverride.trim().length > 0) {
    baseSlug = normalizeDomainSlug(data.slugOverride)
  }
  // Priority 2: domainASCII
  else if (typeof data.domainASCII === 'string' && data.domainASCII.length > 0) {
    baseSlug = normalizeDomainSlug(data.domainASCII)

    const isIDN =
      data.domainASCII.includes('xn--') ||
      (typeof data.domainUnicode === 'string' && /[^\x00-\x7F]/.test(data.domainUnicode))

    if (isIDN) {
      baseSlug = `${baseSlug}-idn`
    }
  }
  // Priority 3: domainName fallback
  else if (typeof data.domainName === 'string' && data.domainName.length > 0) {
    baseSlug = normalizeDomainSlug(data.domainName)
  }

  if (baseSlug) {
    data.slug = await ensureUniqueSlug(baseSlug, payload, originalDoc?.id)
  }

  return data
}
