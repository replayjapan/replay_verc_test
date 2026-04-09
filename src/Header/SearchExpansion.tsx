'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/utilities/useDebounce'
import { getClientSideURL } from '@/utilities/getURL'
import { trackSearchQuery, trackSearchNoResults, trackSearchResultClick } from '@/utilities/searchAnalytics'
import { BudouXClient } from '@/components/BudouX/client'

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

/** Muted badge colors */
const TYPE_COLORS: Record<string, { bg: string; text: string; stripe: string }> = {
  pages: { bg: 'bg-slate-100', text: 'text-slate-600', stripe: '#64748b' },
  domains: { bg: 'bg-amber-50', text: 'text-amber-700', stripe: '#d97706' },
  posts: { bg: 'bg-sky-50', text: 'text-sky-700', stripe: '#0284c7' },
  services: { bg: 'bg-emerald-50', text: 'text-emerald-700', stripe: '#059669' },
  videos: { bg: 'bg-violet-50', text: 'text-violet-700', stripe: '#7c3aed' },
  portfolios: { bg: 'bg-rose-50', text: 'text-rose-700', stripe: '#e11d48' },
  articles: { bg: 'bg-indigo-50', text: 'text-indigo-700', stripe: '#4f46e5' },
}

interface Suggestion {
  id: string
  title: string
  slug: string
  searchExcerpt?: string
  searchKeywords?: string
  doc: { relationTo: string; value: string }
}

/** Resolve URL for a suggestion */
function resolveUrl(collection: string, slug: string): string {
  switch (collection) {
    case 'pages': return slug === 'home' ? '/' : `/${slug}`
    case 'domains': return `/domains/${slug}`
    case 'posts': return `/posts/${slug}`
    case 'services': return `/services/${slug}`
    case 'videos': return `/videos/${slug}`
    case 'portfolios': return `/portfolio/${slug}`
    case 'articles': return `/articles/${slug}`
    default: return `/${slug}`
  }
}

/** Truncate for suggestion excerpt */
function truncate(text: string, maxChars: number): string {
  if (!text) return ''
  let count = 0
  let i = 0
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0
    const w =
      (code >= 0x3000 && code <= 0x303f) ||
      (code >= 0x3040 && code <= 0x309f) ||
      (code >= 0x30a0 && code <= 0x30ff) ||
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0xff00 && code <= 0xffef)
        ? 2 : 1
    if (count + w > maxChars * 2) return text.slice(0, i) + '…'
    count += w
    i += char.length
  }
  return text
}

interface SearchExpansionProps {
  visible: boolean
}

export function SearchExpansion({ visible }: SearchExpansionProps) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(query, 300)

  const expand = useCallback(() => {
    setExpanded(true)
  }, [])

  const collapse = useCallback(() => {
    setExpanded(false)
    setQuery('')
    setSuggestions([])
    setShowDropdown(false)
    setActiveIndex(-1)
  }, [])

  // Focus input when expanded
  useEffect(() => {
    if (expanded) {
      const timer = setTimeout(() => inputRef.current?.focus(), 250)
      return () => clearTimeout(timer)
    }
  }, [expanded])

  // Click-outside collapse — works on mobile where the overlay has no bare area to click
  useEffect(() => {
    if (!expanded) return
    const handleDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        collapse()
      }
    }
    document.addEventListener('mousedown', handleDocClick)
    return () => document.removeEventListener('mousedown', handleDocClick)
  }, [expanded, collapse])

  // Fetch suggestions on debounced query
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }

    const fetchSuggestions = async () => {
      try {
        const baseUrl = getClientSideURL()
        // Payload's like/contains operators are unreliable on the search
        // collection with SQLite. Fetch all and filter client-side.
        const params = new URLSearchParams({
          depth: '0',
          limit: '200',
          sort: '-priority',
        })
        const res = await fetch(`${baseUrl}/api/search?${params}`, { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        const allDocs: Suggestion[] = data.docs || []
        const lowerQ = debouncedQuery.toLowerCase()
        const matched = allDocs.filter((r) => {
          // Exclude domains from header suggestions — users have /domains for that
          if (r.doc?.relationTo === 'domains') return false
          const fields = [r.title, r.slug, r.searchExcerpt, r.searchKeywords]
          return fields.some((f) => f && f.toLowerCase().includes(lowerQ))
        })
        setSuggestions(matched.slice(0, 6))
        setShowDropdown(true)
        setActiveIndex(-1)
      } catch {
        setSuggestions([])
      }
    }

    fetchSuggestions()
  }, [debouncedQuery])

  const navigateToSearch = useCallback(() => {
    if (!query.trim()) return
    trackSearchQuery(query, suggestions.length, 'header')
    if (suggestions.length === 0) trackSearchNoResults(query)
    collapse()
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }, [query, suggestions, collapse, router])

  const selectSuggestion = useCallback((suggestion: Suggestion, index: number) => {
    const collection = suggestion.doc?.relationTo || ''
    trackSearchResultClick(query, index + 1, collection, suggestion.title)
    collapse()
    router.push(resolveUrl(collection, suggestion.slug))
  }, [query, collapse, router])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      collapse()
      return
    }
    if (e.key === 'Enter') {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        selectSuggestion(suggestions[activeIndex], activeIndex)
      } else {
        navigateToSearch()
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => Math.max(prev - 1, -1))
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Search trigger */}
      <button
        onClick={expand}
        className="text-gray-700 hover:text-brand-alt transition-colors duration-200"
        style={{
          opacity: expanded ? 0 : 1,
          pointerEvents: expanded ? 'none' : 'auto',
          transform: expanded ? 'scale(0.7)' : 'scale(1)',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        aria-label="検索を開く"
        data-testid="search-trigger"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">検索</span>
      </button>

      {/* Expanded search overlay — absolute over the nav area */}
      {expanded && (
        <div
          className="absolute inset-y-0 left-0 right-0 flex items-center z-50 bg-white/95 backdrop-blur-sm px-4 lg:px-8"
          style={{ animation: 'searchFadeIn 250ms ease-out forwards' }}
        >
          {/* Input */}
          <div ref={containerRef} className="flex-1 relative max-w-xl ml-auto">
            <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--brand-alt)', opacity: 0.7 }}>
              <Search size={16} strokeWidth={2.5} />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="検索..."
              className="w-full h-[42px] pl-11 pr-11 text-[14px] tracking-[-0.01em]
                bg-gray-50/80 border border-gray-200 rounded-full outline-none
                focus:bg-white focus:border-gray-300
                transition-all duration-200
                placeholder:text-gray-400"
              style={{ boxShadow: '0 1px 3px -1px rgba(27, 36, 63, 0.06)' }}
            />
            <button
              onClick={collapse}
              className="absolute right-1.5 top-1/2 -translate-y-1/2
                w-7 h-7 flex items-center justify-center
                text-gray-400 hover:text-gray-700
                rounded-full hover:bg-gray-200/50
                transition-colors duration-150"
              aria-label="検索を閉じる"
              data-testid="search-close"
            >
              <X size={14} strokeWidth={2.5} />
            </button>

            {/* Suggestion dropdown */}
            {showDropdown && suggestions.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-2 z-50
                  bg-white border border-gray-200 rounded-xl overflow-hidden"
                style={{
                  boxShadow: '0 12px 40px -8px rgba(27, 36, 63, 0.12), 0 4px 12px -4px rgba(27, 36, 63, 0.05)',
                  animation: 'ddReveal 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              >
                <ul role="listbox" className="py-1">
                  {suggestions.map((s, index) => {
                    const collection = s.doc?.relationTo || ''
                    const colors = TYPE_COLORS[collection] || { bg: 'bg-gray-100', text: 'text-gray-600', stripe: '#64748b' }
                    const label = TYPE_LABELS[collection] || collection
                    const isActive = index === activeIndex

                    return (
                      <li
                        key={s.id}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => selectSuggestion(s, index)}
                        className={`relative flex items-start gap-3 pl-5 pr-4 py-3 cursor-pointer
                          transition-colors duration-100
                          ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50/60'}`}
                      >
                        {/* Left accent stripe */}
                        <div
                          className="absolute left-0 top-2 bottom-2 rounded-r-full transition-all duration-150"
                          style={{
                            width: isActive ? '3px' : '2px',
                            backgroundColor: colors.stripe,
                            opacity: isActive ? 1 : 0.5,
                          }}
                        />
                        {/* Badge */}
                        <span className={`flex-shrink-0 mt-0.5 px-1.5 py-[2px] text-[10px] font-semibold
                          tracking-[0.04em] rounded ${colors.bg} ${colors.text}`}>
                          {label}
                        </span>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-semibold text-gray-900 leading-snug tracking-[-0.01em]">
                            {s.title}
                          </div>
                          {s.searchExcerpt && (
                            <div className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">
                              {truncate(s.searchExcerpt, 40)}
                            </div>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
                {/* Keyboard hints */}
                <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-5
                  text-[10px] text-gray-400 tracking-wide">
                  <span className="flex items-center gap-1.5">
                    <kbd className="inline-flex items-center justify-center w-5 h-4
                      bg-gray-100 border border-gray-200 rounded text-[9px] font-mono text-gray-500">↑</kbd>
                    <kbd className="inline-flex items-center justify-center w-5 h-4
                      bg-gray-100 border border-gray-200 rounded text-[9px] font-mono text-gray-500">↓</kbd>
                    <span className="ml-0.5"><BudouXClient>移動</BudouXClient></span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="inline-flex items-center justify-center px-1.5 h-4
                      bg-gray-100 border border-gray-200 rounded text-[9px] font-mono text-gray-500">Enter</kbd>
                    <span><BudouXClient>選択</BudouXClient></span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="inline-flex items-center justify-center px-1.5 h-4
                      bg-gray-100 border border-gray-200 rounded text-[9px] font-mono text-gray-500">Esc</kbd>
                    <span><BudouXClient>閉じる</BudouXClient></span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes searchFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ddReveal {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}
