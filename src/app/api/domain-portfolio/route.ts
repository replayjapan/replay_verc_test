import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'
import type { Where } from 'payload'

import config from '@payload-config'
import { normalizePayloadDomain, transformPayloadDomainSettings } from '@/lib/domain-utils'
import type { DomainsApiResponse, PaginatedResponse } from '@/types/api-responses'
import type { Domain, DomainCategory, PayloadDomainDocument } from '@/types/domain-types'
import type { DomainsSetting } from '@/payload-types'

export async function GET(request: NextRequest): Promise<NextResponse<DomainsApiResponse>> {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get('page') || '1', 10)
    const search = searchParams.get('search')?.trim() || ''
    const sortField = searchParams.get('sort') || 'domainName'
    const direction = searchParams.get('direction') === 'desc' ? 'desc' : 'asc'
    const category = searchParams.get('category') || ''
    const status = searchParams.get('status') || ''

    const payload = await getPayload({ config })

    const rawSettings = (await payload.findGlobal({
      slug: 'domains-settings',
    })) as DomainsSetting | null

    const settings = transformPayloadDomainSettings(rawSettings)

    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })
    const locale = typeof siteSettings?.locale === 'string' ? siteSettings.locale : 'en-US'

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
      where.domainStatus = {
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
    const rawLimit = Number.parseInt(searchParams.get('limit') || '', 10)
    const limit = allowedLimits.includes(rawLimit) ? rawLimit : settings.display.perPage
    const sortPrefix = direction === 'desc' ? '-' : ''
    const validSorts = ['domainName', 'registrationDate', 'minimumOffer'] as const
    const sortTarget = validSorts.includes(sortField as typeof validSorts[number])
      ? sortField
      : 'domainName'

    const domainsResponse = await payload.find({
      collection: 'domains',
      where: where as Where,
      sort: `${sortPrefix}${sortTarget}`,
      page,
      limit,
      depth: 2,
    })

    const categoriesResponse = await payload.find({
      collection: 'domain-category',
      limit: 100,
      sort: 'name',
    })

    const featuredResponse = await payload.find({
      collection: 'domains',
      where: {
        featured: {
          equals: true,
        },
        _status: {
          equals: 'published',
        },
      },
      limit: 6,
      depth: 2,
    })

    const normalizedDomains = domainsResponse.docs.map((doc) =>
      normalizePayloadDomain(doc as PayloadDomainDocument, settings, locale),
    )

    const normalizedFeatured = settings.display.showFeatured
      ? featuredResponse.docs.map((doc) => normalizePayloadDomain(doc as PayloadDomainDocument, settings, locale))
      : []

    const categories = categoriesResponse.docs.map((category) => ({
      id: String(category.id),
      name: category.name,
      description: category.description ?? undefined,
      icon: category.icon ?? undefined,
    })) as DomainCategory[]

    const paginatedDomains: PaginatedResponse<Domain> = {
      docs: normalizedDomains,
      totalDocs: domainsResponse.totalDocs ?? normalizedDomains.length,
      limit: domainsResponse.limit ?? settings.display.perPage,
      totalPages: domainsResponse.totalPages ?? 1,
      page: domainsResponse.page ?? 1,
      pagingCounter: domainsResponse.pagingCounter ?? 1,
      hasPrevPage: Boolean(domainsResponse.hasPrevPage),
      hasNextPage: Boolean(domainsResponse.hasNextPage),
      prevPage: domainsResponse.prevPage ?? null,
      nextPage: domainsResponse.nextPage ?? null,
    }

    return NextResponse.json({
      settings,
      domainsResult: paginatedDomains,
      categories,
      featuredDomains: normalizedFeatured,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load domain data'
    console.error('domain-portfolio API error:', error)
    return NextResponse.json(
      {
        settings: transformPayloadDomainSettings(null),
        domainsResult: {
          docs: [],
          totalDocs: 0,
          limit: 0,
          totalPages: 0,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        },
        categories: [],
        featuredDomains: [],
      },
      { status: 500, statusText: message },
    )
  }
}
