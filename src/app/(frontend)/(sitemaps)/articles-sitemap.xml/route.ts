import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getArticlesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()

    const results = await payload.find({
      collection: 'articles',
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
            loc: `${SITE_URL}/articles/${doc?.slug}`,
            lastmod: doc.updatedAt || dateFallback,
            changefreq: 'weekly' as const,
            priority: 0.7,
          }))
      : []

    return sitemap
  },
  ['articles-sitemap'],
  {
    tags: ['articles-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getArticlesSitemap()

  return getServerSideSitemap(sitemap)
}
