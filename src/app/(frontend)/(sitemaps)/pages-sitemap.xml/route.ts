import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
        'meta.noIndex': {
          not_equals: true,
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/`,
        lastmod: dateFallback,
        changefreq: 'monthly' as const,
        priority: 1.0,
      },
      {
        loc: `${SITE_URL}/domains`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.8,
      },
      {
        loc: `${SITE_URL}/posts`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.5,
      },
      {
        loc: `${SITE_URL}/services`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.5,
      },
      {
        loc: `${SITE_URL}/videos`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.5,
      },
      {
        loc: `${SITE_URL}/portfolio`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.5,
      },
      {
        loc: `${SITE_URL}/articles`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.5,
      },
      {
        loc: `${SITE_URL}/search`,
        lastmod: dateFallback,
        changefreq: 'monthly' as const,
        priority: 0.3,
      },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => ({
            loc: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
            lastmod: page.updatedAt || dateFallback,
            changefreq: 'monthly' as const,
            priority: 0.5,
          }))
      : []

    // Merge defaults with pages, dedup by loc (pages take precedence for home)
    const locSet = new Set(sitemap.map((entry) => entry.loc))
    const uniqueDefaults = defaultSitemap.filter((entry) => !locSet.has(entry.loc))

    return [...uniqueDefaults, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
