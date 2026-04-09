import type { Metadata } from 'next'
import type { Config, Media } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getCachedGlobal } from './getGlobals'

type GlobalSlug = keyof Config['globals']

interface ListingSettings {
  seoTitle?: string | null
  seoDescription?: string | null
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: Media | Config['db']['defaultIDType'] | null
  noIndex?: boolean | null
}

/**
 * Generate metadata for a collection listing page from its settings global.
 * Falls back to hardcoded defaults if settings fields are empty.
 */
export async function generateListingMeta(args: {
  globalSlug: GlobalSlug
  fallbackTitle: string
  fallbackDescription: string
}): Promise<Metadata> {
  const { globalSlug, fallbackTitle, fallbackDescription } = args
  const settings = (await getCachedGlobal(globalSlug, 1)()) as ListingSettings | null

  const title = settings?.seoTitle || fallbackTitle
  const description = settings?.seoDescription || fallbackDescription

  const serverUrl = getServerSideURL()
  let ogImageUrl: string | undefined
  if (settings?.ogImage && typeof settings.ogImage === 'object' && 'url' in settings.ogImage) {
    ogImageUrl = `${serverUrl}${settings.ogImage.url}`
  }

  const metadata: Metadata = {
    title,
    description,
    openGraph: mergeOpenGraph({
      title: settings?.ogTitle || title,
      description: settings?.ogDescription || description,
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    }),
  }

  if (settings?.noIndex) {
    metadata.robots = 'noindex'
  }

  return metadata
}
