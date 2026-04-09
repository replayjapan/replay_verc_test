import { getPayload } from 'payload'
import type { Metadata } from 'next'
import type { Where } from 'payload'
import { generateListingMeta } from '@/utilities/generateListingMeta'

import config from '@payload-config'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import DomainsClient from './domains-client'
import { normalizePayloadDomain, transformPayloadDomainSettings } from '@/lib/domain-utils'
import type { SetPolicy } from '@/utilities/domainSetsPolicy'
import type { PaginatedResponse, SearchParams } from '@/types/api-responses'
import type { Domain, DomainCategory, DomainSettings, PayloadDomainDocument } from '@/types/domain-types'
import type { DomainsSetting, Media } from '@/payload-types'

export interface DomainSetGroup {
  id: number | string
  title: string
  slug: string
  policy: SetPolicy
  description?: string | null
  domains: Domain[]
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export function generateMetadata(): Promise<Metadata> {
  return generateListingMeta({
    globalSlug: 'domains-settings',
    fallbackTitle: 'ドメインポートフォリオ',
    fallbackDescription: 'プレミアムドメインをご覧ください。',
  })
}

const toSearchParams = (params: Record<string, string | string[] | undefined>): SearchParams => ({
  search: typeof params.search === 'string' ? params.search : undefined,
  category: typeof params.category === 'string' ? params.category : undefined,
  sort: typeof params.sort === 'string' ? params.sort : undefined,
  direction: typeof params.direction === 'string' ? params.direction : undefined,
  page: typeof params.page === 'string' ? params.page : undefined,
  limit: typeof params.limit === 'string' ? params.limit : undefined,
  status: typeof params.status === 'string' ? params.status : undefined,
})

export default async function DomainsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const payload = await getPayload({ config })

  const rawSettings = (await payload.findGlobal({
    slug: 'domains-settings',
  })) as DomainsSetting | null

  const settings: DomainSettings = transformPayloadDomainSettings(rawSettings)

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })
  const locale = typeof siteSettings?.locale === 'string' ? siteSettings.locale : 'en-US'

  const page = Number.parseInt(typeof params.page === 'string' ? params.page : '1', 10)
  const search = typeof params.search === 'string' ? params.search.trim() : ''
  const category = typeof params.category === 'string' ? params.category : ''
  const status = typeof params.status === 'string' ? params.status : ''

  // Resolve category name → ID for Payload relationship query
  let categoryId: string | number | undefined
  if (category) {
    const categoryMatch = await payload.find({
      collection: 'domain-category',
      where: { name: { equals: category } },
      limit: 1,
    })
    categoryId = categoryMatch.docs[0]?.id
  }

  const sortField = typeof params.sort === 'string' ? params.sort : settings.display.sortField
  const direction = params.direction === 'desc' ? 'desc' : settings.display.sortDir

  const where: Record<string, unknown> = {
    _status: {
      equals: 'published',
    },
  }

  if (categoryId) {
    where.category = {
      equals: categoryId,
    }
  }

  if (status && ['open', 'not_available', 'sold', 'pending'].includes(status)) {
    where.status = {
      equals: status,
    }
  }

  if (search) {
    where.or = [
      {
        domainName: {
          contains: search,
        },
      },
      {
        description: {
          contains: search,
        },
      },
    ]
  }

  const allowedLimits = [10, 12, 25, 50]
  const rawLimit = typeof params.limit === 'string' ? Number.parseInt(params.limit, 10) : NaN
  const limit = allowedLimits.includes(rawLimit) ? rawLimit : settings.display.perPage
  const validSorts = ['domainName', 'registrationDate', 'minimumOffer'] as const
  const sortTarget = validSorts.includes(sortField as typeof validSorts[number])
    ? sortField
    : 'domainName'
  const sortPrefix = direction === 'desc' ? '-' : ''

  const [domainsResponse, categoriesResponse, featuredResponse, allDomainsResponse, setsResponse] =
    await Promise.all([
      payload.find({
        collection: 'domains',
        where: where as Where,
        sort: `${sortPrefix}${sortTarget}`,
        page,
        limit,
        depth: 2,
      }),
      payload.find({
        collection: 'domain-category',
        limit: 100,
        sort: 'name',
      }),
      settings.display.showFeatured
        ? payload.find({
            collection: 'domains',
            where: {
              featured: { equals: true },
              _status: { equals: 'published' },
            },
            limit: 6,
            depth: 2,
          })
        : Promise.resolve({ docs: [] }),
      // All published domains (for set grouping)
      payload.find({
        collection: 'domains',
        where: { _status: { equals: 'published' } },
        limit: 200,
        depth: 2,
      }),
      // All domain sets (members as IDs)
      payload.find({
        collection: 'domain-sets',
        limit: 100,
        depth: 0,
      }),
    ])

  const normalizedDomains = domainsResponse.docs.map((doc) =>
    normalizePayloadDomain(doc as PayloadDomainDocument, settings, locale),
  )

  const normalizedFeatured = settings.display.showFeatured
    ? (featuredResponse.docs as PayloadDomainDocument[]).map((doc) => normalizePayloadDomain(doc, settings, locale))
    : []

  const normalizedCategories = categoriesResponse.docs.map((category) => ({
    id: String(category.id),
    name: category.name,
    description: category.description ?? undefined,
    icon: category.icon ?? undefined,
  })) as DomainCategory[]

  // Build set groups for the "セット別表示" view
  const allNormalized = allDomainsResponse.docs.map((doc) =>
    normalizePayloadDomain(doc as PayloadDomainDocument, settings, locale),
  )
  const domainMap = new Map(allNormalized.map((d) => [String(d.id), d]))

  const memberIdSet = new Set<string>()
  const setGroups: DomainSetGroup[] = setsResponse.docs.map((set) => {
    const memberIds = (set.members ?? []).map((m) =>
      String(typeof m === 'number' ? m : m.id),
    )
    memberIds.forEach((id) => memberIdSet.add(id))
    return {
      id: set.id,
      title: set.title,
      slug: set.slug,
      policy: set.policy,
      description: set.description ?? null,
      domains: memberIds
        .map((id) => domainMap.get(id))
        .filter((d): d is Domain => d !== undefined),
    }
  })

  const ungroupedDomains = allNormalized.filter(
    (d) => !memberIdSet.has(String(d.id)),
  )

  const domainsResult: PaginatedResponse<Domain> = {
    docs: normalizedDomains,
    totalDocs: domainsResponse.totalDocs ?? normalizedDomains.length,
    totalPages: domainsResponse.totalPages ?? 1,
    page: domainsResponse.page ?? 1,
    limit: domainsResponse.limit ?? limit,
    pagingCounter: domainsResponse.pagingCounter ?? 1,
    hasPrevPage: Boolean(domainsResponse.hasPrevPage),
    hasNextPage: Boolean(domainsResponse.hasNextPage),
    prevPage: domainsResponse.prevPage ?? null,
    nextPage: domainsResponse.nextPage ?? null,
  }

  const initialData = {
    settings,
    categories: normalizedCategories,
    featuredDomains: normalizedFeatured,
    domainsResult,
    setGroups,
    ungroupedDomains,
    locale,
  }

  // HeroHeader Medium — matches About/Contact page hero height
  // -mt-16 pulls hero under nav, same as RenderBlocks does for first heroHeader
  const heroImage = rawSettings?.heroImage as Media | undefined

  return (
    <article className="pt-16">
      <div className="-mt-16">
        <HeroHeaderBlock
          size="medium"
          title={settings.pageTitle}
          subtitle={settings.pageDescription}
          image={heroImage ?? null}
          headingAlignment="left"
        />
      </div>
      <DomainsClient initialData={initialData} searchParams={toSearchParams(params)} />
    </article>
  )
}
