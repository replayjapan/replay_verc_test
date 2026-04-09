import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getDomainsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()

    const results = await payload.find({
      collection: 'domains',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
        domainStatus: {
          not_equals: 'not_available',
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
          .filter((domain) => Boolean(domain?.slug))
          .map((domain) => ({
            loc: `${SITE_URL}/domains/${domain?.slug}`,
            lastmod: domain.updatedAt || dateFallback,
            changefreq: 'weekly' as const,
            priority: 0.7,
          }))
      : []

    return sitemap
  },
  ['domains-sitemap'],
  {
    tags: ['domains-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getDomainsSitemap()

  return getServerSideSitemap(sitemap)
}
