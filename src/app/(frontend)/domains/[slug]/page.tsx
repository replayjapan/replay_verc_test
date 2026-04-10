import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import type { Where } from 'payload'

import config from '@payload-config'
import DomainDetailClient from './domain-detail-client'
import { normalizePayloadDomain, transformPayloadDomainSettings } from '@/lib/domain-utils'
import { getStrictestPolicy } from '@/utilities/domainSetsPolicy'
import { generateMeta } from '@/utilities/generateMeta'
import type { DomainsSetting } from '@/payload-types'
import type { DomainSettings, PayloadDomainDocument } from '@/types/domain-types'
import type { SetInfo } from '@/components/domains/SetsMembershipPanel/types'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const domainResponse = await payload.find({
    collection: 'domains',
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
    limit: 1,
  })

  const doc = domainResponse.docs[0]

  if (!doc) {
    return {
      title: 'Domain not found',
    }
  }

  return generateMeta({ doc })
}

export default async function DomainPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const domainResponse = await payload.find({
    collection: 'domains',
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
    limit: 1,
  })

  const rawDomain = domainResponse.docs[0] as PayloadDomainDocument | undefined

  if (!rawDomain) {
    notFound()
  }

  const rawSettings = (await payload.findGlobal({
    slug: 'domains-settings',
  })) as DomainsSetting | null

  const settings: DomainSettings = transformPayloadDomainSettings(rawSettings)

  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  const locale = typeof siteSettings?.locale === 'string' ? siteSettings.locale : 'en-US'

  const domain = normalizePayloadDomain(rawDomain as PayloadDomainDocument, settings, locale)

  // Query domain sets containing this domain
  const setsResponse = await payload.find({
    collection: 'domain-sets',
    where: { members: { equals: rawDomain.id } },
    depth: 0,
    limit: 50,
  })

  const domainSets: SetInfo[] = setsResponse.docs.map((set) => ({
    id: set.id,
    title: set.title,
    slug: set.slug,
    policy: set.policy,
    description: set.description ?? null,
  }))

  const { strictestPolicy, isBundleOnly, sortedSets } = getStrictestPolicy(domainSets)

  const orFilters: Where[] = []
  if (domain.category?.id) {
    orFilters.push({
      category: {
        equals: domain.category.id,
      },
    })
  }
  if (domain.extension) {
    orFilters.push({
      extension: {
        equals: domain.extension,
      },
    })
  }

  const similarWhere: Where = {
    _status: {
      equals: 'published',
    },
    id: {
      not_equals: domain.id,
    },
  }

  if (orFilters.length) {
    similarWhere.or = orFilters
  }

  const similarResponse = orFilters.length
    ? await payload.find({
        collection: 'domains',
        where: similarWhere,
        depth: 1,
        limit: 3,
      })
    : { docs: [] }

  const similarDomains = (similarResponse.docs as PayloadDomainDocument[]).map((doc) =>
    normalizePayloadDomain(doc, settings, locale),
  )

  return (
    <DomainDetailClient
      domain={domain}
      domainSets={sortedSets}
      isBundleOnly={isBundleOnly}
      locale={locale}
      settings={settings}
      similarDomains={similarDomains}
      strictestPolicy={strictestPolicy}
    />
  )
}
