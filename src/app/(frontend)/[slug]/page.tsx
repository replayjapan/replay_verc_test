import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { DevHomepage } from '@/components/DevHomepage'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'
import type { SiteSetting, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  // Skipped to avoid Vercel build timeout (Neon Postgres in Singapore, build server in D.C.)
  // const payload = await getPayload({ config: configPromise })
  // const pages = await payload.find({
  //   collection: 'pages',
  //   draft: false,
  //   limit: 1000,
  //   overrideAccess: false,
  //   pagination: false,
  //   select: {
  //     slug: true,
  //   },
  // })
  //
  // const params = pages.docs
  //   ?.filter((doc) => {
  //     return doc.slug !== 'home'
  //   })
  //   .map(({ slug }) => {
  //     return { slug }
  //   })
  //
  // return params
  return []
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  const page = await queryPageBySlug({
    slug,
  })

  // Dev fallback: render DevHomepage when no home page exists in Pages collection.
  // Delete this block when a real homepage is built.
  if (!page && slug === 'home') {
    return <DevHomepage />
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = page

  // Organization JSON-LD on homepage only
  let organizationJsonLd: Record<string, unknown> | null = null
  if (slug === 'home') {
    const siteSettings = (await getCachedGlobal('site-settings', 1)()) as SiteSetting
    const siteUrl = getServerSideURL()
    const logo = typeof siteSettings?.logo === 'object' ? (siteSettings.logo as Media) : null

    organizationJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteSettings?.siteName || 'rePlay Domains',
      url: siteUrl,
      ...(logo?.url ? { logo: `${siteUrl}${logo.url}` } : {}),
      ...(siteSettings?.siteDescription ? { description: siteSettings.siteDescription } : {}),
    }
  }

  return (
    <article className="pt-16">
      {organizationJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      )}
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
