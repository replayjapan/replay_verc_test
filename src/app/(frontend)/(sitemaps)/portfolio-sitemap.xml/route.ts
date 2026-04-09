import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getPortfolioSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()

    const results = await payload.find({
      collection: 'portfolios',
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

    const sitemap = results.docs
      ? results.docs
          .filter((doc) => Boolean(doc?.slug))
          .map((doc) => ({
            loc: `${SITE_URL}/portfolio/${doc?.slug}`,
            lastmod: doc.updatedAt || dateFallback,
            changefreq: 'weekly' as const,
            priority: 0.7,
          }))
      : []

    return sitemap
  },
  ['portfolio-sitemap'],
  {
    tags: ['portfolio-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPortfolioSitemap()

  return getServerSideSitemap(sitemap)
}
