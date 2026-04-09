import type { Metadata } from 'next'

import type { Media, Config, SiteSetting } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getCachedGlobal } from './getGlobals'

interface MetaDoc {
  slug?: string | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: Media | Config['db']['defaultIDType'] | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImage?: Media | Config['db']['defaultIDType'] | null
    noIndex?: boolean | null
  } | null
}

const TITLE_SUFFIX = 'rePlay Domains'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return null
}

export const generateMeta = async (args: {
  doc: MetaDoc | null
}): Promise<Metadata> => {
  const { doc } = args

  const siteSettings = (await getCachedGlobal('site-settings', 1)()) as SiteSetting

  // OG image fallback chain: ogImage → meta.image → SiteSettings.defaultOgImage → static fallback
  let ogImageUrl = getImageURL(doc?.meta?.ogImage) || getImageURL(doc?.meta?.image)

  if (!ogImageUrl) {
    ogImageUrl = getImageURL(siteSettings?.defaultOgImage as Media | null)
  }

  if (!ogImageUrl) {
    ogImageUrl = `${getServerSideURL()}/website-template-OG.webp`
  }

  const title = doc?.meta?.title
    ? `${doc.meta.title} | ${TITLE_SUFFIX}`
    : TITLE_SUFFIX

  // OG title/description fallback: doc fields → SiteSettings defaults → meta fields
  const ogTitle = doc?.meta?.ogTitle || siteSettings?.defaultOgTitle || title
  const ogDescription = doc?.meta?.ogDescription || siteSettings?.defaultOgDescription || doc?.meta?.description || siteSettings?.siteDescription || ''

  const metadata: Metadata = {
    description: doc?.meta?.description || siteSettings?.siteDescription || undefined,
    openGraph: mergeOpenGraph({
      description: ogDescription,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
            },
          ]
        : undefined,
      title: ogTitle,
      url: Array.isArray(doc?.slug)
        ? `/${doc.slug.join('/')}`
        : doc?.slug
          ? `/${doc.slug}`
          : '/',
    }),
    title,
  }

  if (doc?.meta?.noIndex) {
    metadata.robots = 'noindex'
  }

  return metadata
}
