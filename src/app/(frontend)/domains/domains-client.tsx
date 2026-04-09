'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Layers, List } from 'lucide-react'
import { SectionHeader } from '@/components/domains/SectionHeader/Component'
import { DomainFilters } from '@/components/domains/DomainFilters/Component'
import { DomainTable } from '@/components/domains/DomainTable/Component'
import { Pagination } from '@/components/domains/Pagination/Component'
import { DomainShowcaseCarousel } from '@/blocks/DomainShowcase/Carousel'
import type { CarouselDomain } from '@/blocks/DomainShowcase/Carousel'
import { POLICY_LABELS } from '@/utilities/domainSetsPolicy'
import type { SetPolicy } from '@/utilities/domainSetsPolicy'
import type { DomainStatus } from '@/components/domains/StatusBadge/types'
import type { SortOption } from '@/components/domains/DomainFilters/types'
import type { DomainTableRow } from '@/components/domains/DomainTable/types'
import { calculateDomainAge } from '@/lib/domain-utils'
import type { PaginatedResponse, SearchParams } from '@/types/api-responses'
import type { Domain, DomainCategory, DomainSettings } from '@/types/domain-types'
import { BudouXClient } from '@/components/BudouX/client'

interface DomainSetGroup {
  id: number | string
  title: string
  slug: string
  policy: SetPolicy
  description?: string | null
  domains: Domain[]
}

interface DomainsClientInitialData {
  settings: DomainSettings
  categories: DomainCategory[]
  featuredDomains: Domain[]
  domainsResult?: PaginatedResponse<Domain>
  setGroups: DomainSetGroup[]
  ungroupedDomains: Domain[]
  locale: string
}

interface DomainsClientProps {
  initialData: DomainsClientInitialData
  searchParams: SearchParams
}

/** Map Domain to DomainTableRow for the table primitive */
function toDomainTableRow(domain: Domain): DomainTableRow {
  return {
    id: domain.id,
    domainName: domain.domainName,
    category: domain.category?.name ?? '',
    registrationDate: domain.registrationDate ?? '',
    ageYears: calculateDomainAge(domain.registrationDate ?? undefined) ?? 0,
    minimumOffer: domain.minimumOffer,
    status: domain.status as DomainStatus,
    href: `/domains/${domain.slug}`,
  }
}

/** Map URL sort+direction params to the SortOption union */
function toSortOption(sort: string, direction: string): SortOption {
  if (sort === 'registrationDate') {
    return direction === 'desc' ? 'age_desc' : 'age_asc'
  }
  if (sort === 'minimumOffer') {
    return direction === 'desc' ? 'price_desc' : 'price_asc'
  }
  return direction === 'desc' ? 'domain_desc' : 'domain_asc'
}

/** Map SortOption back to URL params */
function fromSortOption(option: SortOption): { sort: string; direction: string } {
  switch (option) {
    case 'domain_asc':
      return { sort: 'domainName', direction: 'asc' }
    case 'domain_desc':
      return { sort: 'domainName', direction: 'desc' }
    case 'age_asc':
      return { sort: 'registrationDate', direction: 'asc' }
    case 'age_desc':
      return { sort: 'registrationDate', direction: 'desc' }
    case 'price_asc':
      return { sort: 'minimumOffer', direction: 'asc' }
    case 'price_desc':
      return { sort: 'minimumOffer', direction: 'desc' }
  }
}

export const DomainsClient: React.FC<DomainsClientProps> = ({ initialData, searchParams }) => {
  const urlSearchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [data, setData] = useState<DomainsClientInitialData & { domainsResult?: PaginatedResponse<Domain> }>(initialData)
  const [isLoading, setIsLoading] = useState(!initialData.domainsResult)
  const [isRefetching, setIsRefetching] = useState(false)

  const currentSearch = urlSearchParams?.get('search') ?? searchParams.search ?? ''
  const currentCategory = urlSearchParams?.get('category') ?? searchParams.category ?? ''
  const currentStatus = urlSearchParams?.get('status') ?? searchParams.status ?? 'all'
  const currentSort = urlSearchParams?.get('sort') ?? searchParams.sort ?? 'domainName'
  const currentDirection = urlSearchParams?.get('direction') ?? searchParams.direction ?? 'asc'
  const currentPage = urlSearchParams?.get('page') ?? searchParams.page ?? '1'
  const currentLimit = urlSearchParams?.get('limit') ?? searchParams.limit ?? ''

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    if (currentSearch) params.set('search', currentSearch)
    if (currentCategory) params.set('category', currentCategory)
    if (currentStatus && currentStatus !== 'all') params.set('status', currentStatus)
    if (currentSort && currentSort !== 'domainName') params.set('sort', currentSort)
    if (currentDirection && currentDirection !== 'asc') params.set('direction', currentDirection)
    if (currentPage && currentPage !== '1') params.set('page', currentPage)
    if (currentLimit) params.set('limit', currentLimit)
    return params.toString()
  }, [currentCategory, currentDirection, currentLimit, currentPage, currentSearch, currentSort, currentStatus])

  // Track the initial queryString to skip the redundant first fetch
  const [initialQueryString] = useState(queryString)
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false)

  useEffect(() => {
    if (!urlSearchParams) return

    // Skip the initial mount fetch when server already provided data
    // and URL params haven't changed from the initial load
    if (initialData.domainsResult && !hasFetchedOnce && queryString === initialQueryString) {
      setHasFetchedOnce(true)
      return
    }
    setHasFetchedOnce(true)

    const controller = new AbortController()

    const fetchData = async () => {
      if (!initialData.domainsResult) {
        setIsLoading(true)
      } else {
        setIsRefetching(true)
      }

      try {
        const response = await fetch(`/api/domain-portfolio?${queryString}`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Failed to fetch domains.')
        const apiData = (await response.json()) as Omit<
          DomainsClientInitialData,
          'setGroups' | 'ungroupedDomains'
        > & { domainsResult: PaginatedResponse<Domain> }
        if (!controller.signal.aborted) {
          // Preserve set groups from initial server render (API doesn't return them)
          setData((prev) => ({
            ...apiData,
            setGroups: prev.setGroups,
            ungroupedDomains: prev.ungroupedDomains,
          }))
        }
      } catch (error) {
        if (!controller.signal.aborted) console.error(error)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
          setIsRefetching(false)
        }
      }
    }

    fetchData()
    return () => controller.abort()
  }, [initialData.domainsResult, queryString, urlSearchParams, hasFetchedOnce, initialQueryString])

  const [viewMode, setViewMode] = useState<'list' | 'sets'>('list')
  const { domainsResult, settings, categories, featuredDomains, setGroups, ungroupedDomains } = data

  /** Update a single URL param and reset to page 1 */
  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(urlSearchParams?.toString() ?? '')
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      const next = params.toString()
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false })
    },
    [pathname, router, urlSearchParams],
  )

  /** Update multiple URL params at once */
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(urlSearchParams?.toString() ?? '')
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      }
      params.delete('page')
      const next = params.toString()
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false })
    },
    [pathname, router, urlSearchParams],
  )

  // DomainFilters callbacks
  const handleSearchChange = useCallback(
    (query: string) => updateParam('search', query || null),
    [updateParam],
  )
  const handleCategoryChange = useCallback(
    (cat: string) => updateParam('category', cat || null),
    [updateParam],
  )
  const handleStatusChange = useCallback(
    (status: DomainStatus | 'all') => updateParam('status', status === 'all' ? null : status),
    [updateParam],
  )
  const handleSortChange = useCallback(
    (option: SortOption) => {
      const { sort, direction } = fromSortOption(option)
      updateParams({ sort, direction })
    },
    [updateParams],
  )
  const handleFilterReset = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  // Pagination callbacks
  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(urlSearchParams?.toString() ?? '')
      if (page > 1) {
        params.set('page', String(page))
      } else {
        params.delete('page')
      }
      const next = params.toString()
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false })
    },
    [pathname, router, urlSearchParams],
  )
  const handlePageSizeChange = useCallback(
    (size: number) => {
      const params = new URLSearchParams(urlSearchParams?.toString() ?? '')
      params.set('limit', String(size))
      params.delete('page')
      const next = params.toString()
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false })
    },
    [pathname, router, urlSearchParams],
  )

  if (isLoading && !domainsResult) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center text-slate-600">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-primary" />
          <p className="text-sm"><BudouXClient>読み込み中...</BudouXClient></p>
        </div>
      </div>
    )
  }

  const result = domainsResult ?? {
    docs: [],
    totalDocs: 0,
    totalPages: 0,
    hasPrevPage: false,
    hasNextPage: false,
    limit: settings.display.perPage,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    nextPage: null,
  }

  const tableRows = result.docs.map(toDomainTableRow)
  const categoryNames = categories.map((c) => c.name)
  const currencyLower = settings.currency.code.toLowerCase() as 'jpy' | 'usd'
  const sortOption = toSortOption(currentSort, currentDirection)

  return (
    <div className="min-h-screen">
      {/* Premium domains section — white background */}
      {featuredDomains.length > 0 && settings.display.showFeatured && (
        <section className="py-8 px-6 bg-white">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              title={settings.premiumTitle}
              subtitle={settings.premiumSubtitle}
              accentUnderline
            />
            <DomainShowcaseCarousel
              domains={featuredDomains.map((domain): CarouselDomain => ({
                id: domain.id,
                domainName: domain.domainName,
                category: domain.category?.name,
                status: domain.status as DomainStatus,
                minimumOffer: domain.minimumOffer,
                imageUrl: domain.featuredImage?.url,
                href: `/domains/${domain.slug}`,
                featured: Boolean(domain.featured),
              }))}
            />
          </div>
        </section>
      )}

      {/* All domains section — slate-50 background with border separator */}
      <section className="py-12 px-6 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <SectionHeader
              title="すべてのドメイン"
              subtitle="ポートフォリオ内のすべてのドメインを検索・フィルタリング"
            />

            {/* View toggle — only show if sets exist */}
            {(setGroups.length > 0 || ungroupedDomains.length > 0) && (
              <div className="flex rounded-lg border border-slate-200 bg-white overflow-hidden text-sm mb-4">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-brand-primary text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <BudouXClient>一覧表示</BudouXClient>
                </button>
                <button
                  onClick={() => setViewMode('sets')}
                  className={`flex items-center gap-1.5 px-3 py-2 transition-colors ${
                    viewMode === 'sets'
                      ? 'bg-brand-primary text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <BudouXClient>セット別表示</BudouXClient>
                </button>
              </div>
            )}
          </div>

          {viewMode === 'list' ? (
            /* Flat list view (existing behavior) */
            <div className="mt-6 rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="p-6 pb-4">
                <DomainFilters
                  categories={categoryNames}
                  selectedCategory={currentCategory}
                  selectedStatus={currentStatus as DomainStatus | 'all'}
                  selectedSort={sortOption}
                  searchQuery={currentSearch}
                  onSearchChange={handleSearchChange}
                  onCategoryChange={handleCategoryChange}
                  onStatusChange={handleStatusChange}
                  onSortChange={handleSortChange}
                  onReset={handleFilterReset}
                />
              </div>

              {isRefetching && (
                <div className="text-center text-xs text-slate-600 tracking-wide py-2">
                  <BudouXClient>更新中...</BudouXClient>
                </div>
              )}

              <DomainTable rows={tableRows} currency={currencyLower} enablePriceShorthand={settings.display.enablePriceShorthand} />

              {result.totalPages > 1 && (
                <div className="border-t border-slate-100 p-6">
                  <Pagination
                    currentPage={result.page}
                    totalPages={result.totalPages}
                    totalItems={result.totalDocs}
                    pageSize={result.limit}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                  />
                </div>
              )}
            </div>
          ) : (
            /* Grouped-by-set view */
            <div className="mt-6 space-y-6">
              {setGroups.map((group) => (
                <div
                  key={group.id}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                >
                  <div className="p-5 border-b border-slate-100">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-brand-primary" />
                        <h3 className="text-lg font-bold text-slate-900">
                          {group.title}
                        </h3>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {POLICY_LABELS[group.policy]}
                      </span>
                    </div>
                    {group.description && (
                      <p className="text-sm text-slate-600 mt-1 ml-6">
                        <BudouXClient>{group.description}</BudouXClient>
                      </p>
                    )}
                  </div>
                  <DomainTable
                    rows={group.domains.map(toDomainTableRow)}
                    currency={currencyLower}
                  />
                </div>
              ))}

              {ungroupedDomains.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="p-5 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900"><BudouXClient>未分類</BudouXClient></h3>
                    <p className="text-sm text-slate-600 mt-1">
                      <BudouXClient>セットに含まれていないドメイン</BudouXClient>
                    </p>
                  </div>
                  <DomainTable
                    rows={ungroupedDomains.map(toDomainTableRow)}
                    currency={currencyLower}
                  />
                </div>
              )}

              {setGroups.length === 0 && ungroupedDomains.length === 0 && (
                <div className="text-center py-12 text-slate-600">
                  <p className="text-lg mb-1"><BudouXClient>セットが登録されていません</BudouXClient></p>
                </div>
              )}
            </div>
          )}

          {settings.disclaimer && (
            <p className="text-xs text-slate-600 text-center mt-6">{settings.disclaimer}</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default DomainsClient
