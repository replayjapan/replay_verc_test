'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useDebounce } from '@/utilities/useDebounce'
import { getClientSideURL } from '@/utilities/getURL'
import { trackSearchQuery, trackSearchNoResults, trackSearchResultClick } from '@/utilities/searchAnalytics'
import { BudouXClient } from '@/components/BudouX/client'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'

/** Collection type labels in Japanese */
const TYPE_LABELS: Record<string, string> = {
  pages: 'ページ',
  domains: 'ドメイン',
  posts: 'ブログ',
  services: 'サービス',
  videos: '動画',
  portfolios: 'ポートフォリオ',
  articles: '記事',
}

/** Muted badge colors per type */
const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  pages: { bg: 'bg-slate-100', text: 'text-slate-600' },
  domains: { bg: 'bg-amber-50', text: 'text-amber-700' },
  posts: { bg: 'bg-sky-50', text: 'text-sky-700' },
  services: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  videos: { bg: 'bg-violet-50', text: 'text-violet-700' },
  portfolios: { bg: 'bg-rose-50', text: 'text-rose-700' },
  articles: { bg: 'bg-indigo-50', text: 'text-indigo-700' },
}

/** Filter tabs */
const FILTER_TABS = [
  { key: '', label: 'すべて' },
  { key: 'pages', label: 'ページ' },
  { key: 'domains', label: 'ドメイン' },
  { key: 'posts', label: 'ブログ' },
  { key: 'services', label: 'サービス' },
  { key: 'videos', label: '動画' },
  { key: 'portfolios', label: 'ポートフォリオ' },
  { key: 'articles', label: '記事' },
]

const RESULTS_PER_PAGE = 10

interface SearchResult {
  id: string
  title: string
  slug: string
  searchExcerpt?: string
  searchKeywords?: string
  priority?: number
  featured?: boolean
  contentImage?: { url?: string; alt?: string } | string | null
  doc: {
    relationTo: string
    value: string
  }
  meta?: {
    title?: string
    description?: string
    image?: { url?: string; alt?: string } | string
  }
}

const DIVERSITY_CAP = 5

/** Rank results: featured first, title matches above keyword matches, diversity cap per collection */
function rankResults(results: SearchResult[], query: string): SearchResult[] {
  const lowerQ = query.toLowerCase()

  // Score each result
  const scored = results.map((r) => {
    let score = r.priority || 0
    if (r.featured) score += 100
    if (r.title.toLowerCase().includes(lowerQ)) score += 50
    if (r.slug?.toLowerCase().includes(lowerQ)) score += 30
    return { result: r, score }
  })

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score)

  // Apply diversity cap: max DIVERSITY_CAP per collection in first page
  const collectionCounts: Record<string, number> = {}
  const ranked: SearchResult[] = []
  const deferred: SearchResult[] = []

  for (const { result } of scored) {
    const col = result.doc?.relationTo || ''
    const count = collectionCounts[col] || 0
    if (count < DIVERSITY_CAP) {
      ranked.push(result)
      collectionCounts[col] = count + 1
    } else {
      deferred.push(result)
    }
  }

  return [...ranked, ...deferred]
}

interface SearchPageClientProps {
  initialQuery: string
  initialType: string
  initialPage: number
}

/** Resolve URL for a search result based on its collection type */
function resolveResultUrl(result: SearchResult): string {
  const collection = result.doc?.relationTo || ''
  const slug = result.slug || ''

  switch (collection) {
    case 'pages':
      return slug === 'home' ? '/' : `/${slug}`
    case 'domains':
      return `/domains/${slug}`
    case 'posts':
      return `/posts/${slug}`
    case 'services':
      return `/services/${slug}`
    case 'videos':
      return `/videos/${slug}`
    case 'portfolios':
      return `/portfolio/${slug}`
    case 'articles':
      return `/articles/${slug}`
    default:
      return `/${slug}`
  }
}

export function SearchPageClient({ initialQuery, initialType, initialPage }: SearchPageClientProps) {
  const [query, setQuery] = useState(initialQuery)
  const [activeType, setActiveType] = useState(initialType)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [results, setResults] = useState<SearchResult[]>([])
  const [totalDocs, setTotalDocs] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(!!initialQuery)
  const [includeDomains, setIncludeDomains] = useState(false)

  const debouncedQuery = useDebounce(query, 300)
  const urlSearchParams = useSearchParams()

  // Sync query from URL when header search navigates to /search?q=...
  useEffect(() => {
    const urlQ = urlSearchParams?.get('q') || ''
    const urlType = urlSearchParams?.get('type') || ''
    if (urlQ && urlQ !== query) {
      setQuery(urlQ)
    }
    if (urlType !== activeType) {
      setActiveType(urlType)
    }
  }, [urlSearchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update URL params without navigation — uses history API directly
  // to avoid Next.js router.replace() which triggers server component
  // re-renders and causes visible page jumps when clicking filter tabs.
  const updateUrl = useCallback((q: string, type: string, page: number) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (type) params.set('type', type)
    if (page > 1) params.set('page', String(page))
    const search = params.toString()
    window.history.replaceState(null, '', `/search${search ? `?${search}` : ''}`)
  }, [])

  // Fetch search results
  const fetchResults = useCallback(async (q: string, type: string, page: number, domains: boolean) => {
    if (!q.trim()) {
      setResults([])
      setTotalDocs(0)
      setTotalPages(0)
      return
    }

    setLoading(true)
    try {
      const baseUrl = getClientSideURL()
      // Payload's like/contains operators are unreliable on the search
      // collection with SQLite — they return all records regardless of
      // query. Fetch all records and filter client-side instead.
      const params = new URLSearchParams({
        depth: '1',
        limit: '200',
        page: '1',
        sort: '-priority',
      })

      const res = await fetch(`${baseUrl}/api/search?${params.toString()}`, {
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Search failed')

      const data = await res.json()
      const allDocs: SearchResult[] = data.docs || []

      // Client-side text matching — case-insensitive substring search
      const lowerQ = q.toLowerCase()
      const textMatched = allDocs.filter((r) => {
        const fields = [
          r.title,
          r.slug,
          r.searchExcerpt,
          r.searchKeywords,
          r.meta?.title,
          r.meta?.description,
        ]
        return fields.some((f) => f && f.toLowerCase().includes(lowerQ))
      })

      // Filter by collection type if active, otherwise exclude domains unless toggled on
      let filtered: SearchResult[]
      if (type) {
        filtered = textMatched.filter((r) => r.doc?.relationTo === type)
      } else if (!domains) {
        filtered = textMatched.filter((r) => r.doc?.relationTo !== 'domains')
      } else {
        filtered = textMatched
      }

      // Rank: featured first, title matches above keyword matches, diversity cap
      const ranked = rankResults(filtered, q)

      // Paginate client-side
      const startIdx = (page - 1) * RESULTS_PER_PAGE
      const paged = ranked.slice(startIdx, startIdx + RESULTS_PER_PAGE)
      const clientTotalPages = Math.ceil(ranked.length / RESULTS_PER_PAGE)

      setResults(paged)
      setTotalDocs(ranked.length)
      setTotalPages(clientTotalPages)
      setHasSearched(true)

      // GTM events
      if (data.totalDocs > 0) {
        trackSearchQuery(q, data.totalDocs, 'page')
      } else {
        trackSearchNoResults(q)
      }
    } catch {
      setResults([])
      setTotalDocs(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch when debounced query, type, page, or domain toggle changes
  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery, activeType, currentPage, includeDomains)
      updateUrl(debouncedQuery, activeType, currentPage)
    }
  }, [debouncedQuery, activeType, currentPage, includeDomains, fetchResults, updateUrl])

  // Reset page when type changes
  const handleTypeChange = (type: string) => {
    setActiveType(type)
    setCurrentPage(1)
  }

  const handleResultClick = (result: SearchResult, index: number) => {
    const collection = result.doc?.relationTo || 'unknown'
    trackSearchResultClick(query, index + 1, collection, result.title)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header with search input as children */}
      <HeroHeaderBlock
        title="サイト内検索"
        subtitle="ドメイン、サービス、ブログ記事など、サイト内のコンテンツを検索できます。"
        size="medium"
        headingAlignment="left"
      >
        <div className="relative max-w-2xl">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="キーワードを入力..."
            className="w-full bg-white text-slate-900 rounded-lg pl-12 pr-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-[var(--brand-alt)] transition-shadow placeholder:text-slate-400"
          />
        </div>
      </HeroHeaderBlock>

      {/* Domain toggle */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-2">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeDomains}
              onChange={(e) => setIncludeDomains(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[var(--brand-alt)] focus:ring-[var(--brand-alt)]"
            />
            <BudouXClient>ドメインを含む</BudouXClient>
          </label>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto -mb-px">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTypeChange(tab.key)}
                className={`
                  flex-shrink-0 px-4 py-3.5 text-sm font-medium
                  border-b-2 transition-all duration-150
                  ${activeType === tab.key
                    ? 'border-[var(--brand-alt)] text-[var(--brand-primary)] bg-amber-50/60'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                <BudouXClient>{tab.label}</BudouXClient>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3 text-slate-600">
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[var(--brand-alt)] animate-spin" />
              <span className="text-sm">検索中...</span>
            </div>
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-5">
              <Search size={24} className="text-slate-300" />
            </div>
            <div className="text-slate-700 font-semibold text-base mb-1.5">
              <BudouXClient>検索結果がありません</BudouXClient>
            </div>
            <div className="text-slate-600 text-sm max-w-xs mb-6">
              <BudouXClient>別のキーワードやカテゴリーでお試しください</BudouXClient>
            </div>
            <button
              onClick={() => setQuery('')}
              className="text-sm text-[var(--brand-primary)] hover:text-[var(--brand-alt)] transition-colors duration-200"
            >
              検索をクリア
            </button>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            {/* Result count */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-semibold text-[var(--brand-primary)] bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
                {totalDocs}件
              </span>
              <span className="text-sm text-slate-600">
                <BudouXClient>{`「${debouncedQuery}」の検索結果`}</BudouXClient>
              </span>
            </div>

            {/* Result cards */}
            <div className="space-y-3">
              {results.map((result, index) => {
                const collection = result.doc?.relationTo || ''
                const colors = TYPE_COLORS[collection] || { bg: 'bg-slate-100', text: 'text-slate-600' }
                const label = TYPE_LABELS[collection] || collection
                const href = resolveResultUrl(result)
                const contentImg = typeof result.contentImage === 'object' && result.contentImage ? result.contentImage.url : undefined
                const metaImg = typeof result.meta?.image === 'object' ? result.meta.image?.url : undefined
                const imageUrl = contentImg || metaImg

                return (
                  <a
                    key={result.id}
                    href={href}
                    onClick={() => handleResultClick(result, index)}
                    className="group flex border border-slate-200 rounded-xl overflow-hidden
                      hover:border-[var(--brand-alt)] hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                  >
                    {/* Thumbnail or icon panel */}
                    <div className="flex-shrink-0 w-[90px] sm:w-[112px] relative bg-slate-50">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="112px"
                        />
                      ) : (
                        <div className={`absolute inset-0 flex items-center justify-center ${colors.bg}`}>
                          <span className={`${colors.text} opacity-50 text-2xl font-bold`}>
                            {label.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Left accent bar on hover */}
                    <div className="w-[3px] flex-shrink-0 bg-slate-100 group-hover:bg-[var(--brand-alt)] transition-colors duration-200" />

                    {/* Content */}
                    <div className="flex-1 px-4 py-3.5 min-w-0 flex flex-col justify-center gap-1">
                      <span className={`self-start px-2 py-0.5 text-[10px] font-semibold
                        tracking-[0.06em] rounded-full ${colors.bg} ${colors.text}`}>
                        {label}
                      </span>
                      <h3 className="text-sm sm:text-[15px] font-semibold text-slate-900
                        leading-snug tracking-[-0.01em]
                        group-hover:text-[var(--brand-primary)] transition-colors duration-150
                        line-clamp-1">
                        <BudouXClient>{result.title}</BudouXClient>
                      </h3>
                      {(result.searchExcerpt || result.meta?.description) && (
                        <p className="text-[12px] sm:text-[13px] text-slate-600
                          leading-relaxed line-clamp-2">
                          <BudouXClient>{result.searchExcerpt || result.meta?.description || ''}</BudouXClient>
                        </p>
                      )}
                    </div>

                    {/* Right arrow indicator */}
                    <div className="flex-shrink-0 flex items-center pr-4 text-slate-200 group-hover:text-[var(--brand-alt)] transition-colors duration-200">
                      <ChevronRight size={16} />
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg
                    border border-slate-200 text-slate-500
                    hover:bg-slate-50 hover:text-slate-700
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition-colors duration-150"
                  aria-label="前のページ"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                  .map((p, idx, arr) => (
                    <React.Fragment key={p}>
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <span className="text-slate-300 text-sm px-1">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(p)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium
                          transition-colors duration-150
                          ${p === currentPage
                            ? 'bg-brand-primary text-white'
                            : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg
                    border border-slate-200 text-slate-500
                    hover:bg-slate-50 hover:text-slate-700
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition-colors duration-150"
                  aria-label="次のページ"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}

        {!loading && !hasSearched && (
          <div className="flex flex-col items-center justify-center py-16 md:py-24">
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-3">
              <BudouXClient>何をお探しですか？</BudouXClient>
            </h2>
            <p className="text-slate-600 text-base mb-10">
              <BudouXClient>キーワードを入力するか、カテゴリーを選択してください</BudouXClient>
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-lg">
              {['ドメイン', '開発', 'マーケティング', 'tokyo', 'premium', '.jp'].map((pill) => (
                <button
                  key={pill}
                  onClick={() => { setQuery(pill); setCurrentPage(1) }}
                  className="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-[var(--brand-primary)] hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Light CTA section before footer */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
            <BudouXClient>お探しのコンテンツが見つからない場合は、お気軽にお問い合わせください。</BudouXClient>
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--brand-alt)] hover:text-[var(--brand-primary)] transition-colors duration-200"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  )
}
