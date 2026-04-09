import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  // Try slug lookup first
  const bySlug = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (bySlug.docs[0]) return bySlug.docs[0]

  // Fall back to ID lookup (redirect references pass IDs, not slugs)
  const asNumber = Number(slug)
  if (!Number.isNaN(asNumber)) {
    try {
      return await payload.findByID({ collection, id: asNumber, depth })
    } catch {
      return undefined
    }
  }

  return undefined
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (collection: Collection, slug: string) =>
  unstable_cache(async () => getDocument(collection, slug), [collection, slug], {
    tags: [`${collection}_${slug}`],
  })
