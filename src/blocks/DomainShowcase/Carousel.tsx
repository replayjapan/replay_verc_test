'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PremiumDomainCard } from '@/components/domains/PremiumDomainCard/Component'
import type { DomainStatus } from '@/components/domains/StatusBadge/types'

// Duration (ms) before swipe hint fades out
const SWIPE_HINT_DURATION = 2800

export type CarouselDomain = {
  id: number | string
  domainName: string
  category?: string
  status: DomainStatus
  minimumOffer: number
  imageUrl?: string
  href: string
  featured: boolean
}

interface DomainShowcaseCarouselProps {
  domains: CarouselDomain[]
}

const GAP = 24 // gap-6 = 24px

export const DomainShowcaseCarousel: React.FC<DomainShowcaseCarouselProps> = ({ domains }) => {
  const [position, setPosition] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  // visibleCount starts at 3 (same as server) — updated to real value after mount
  const [visibleCount, setVisibleCount] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef(0)

  const total = domains.length

  // Sync visibleCount with viewport after mount — avoids server/client mismatch
  useEffect(() => {
    const update = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : Math.min(3, total))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [total])

  const getMaxPosition = useCallback(() => {
    return Math.max(0, total - visibleCount)
  }, [total, visibleCount])

  const advance = useCallback(() => {
    setPosition((prev) => (prev >= getMaxPosition() ? 0 : prev + 1))
  }, [getMaxPosition])

  const retreat = useCallback(() => {
    setPosition((prev) => (prev <= 0 ? getMaxPosition() : prev - 1))
  }, [getMaxPosition])

  // Auto-rotate every 5.5 seconds
  useEffect(() => {
    if (isPaused || total <= 3) return
    const timer = setInterval(advance, 5500)
    return () => clearInterval(timer)
  }, [advance, isPaused, total])

  // Auto-hide swipe hint after SWIPE_HINT_DURATION ms
  useEffect(() => {
    if (total <= 1) return
    const timer = setTimeout(() => setShowSwipeHint(false), SWIPE_HINT_DURATION)
    return () => clearTimeout(timer)
  }, [total])

  // Clamp position when visibleCount changes (from resize)
  useEffect(() => {
    setPosition((prev) => Math.min(prev, getMaxPosition()))
  }, [getMaxPosition])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
    setIsPaused(true)
    setShowSwipeHint(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) advance()
      else retreat()
    }
    touchStartX.current = null
    touchDeltaX.current = 0
    setIsPaused(false)
  }

  // Calculate offset using container width for precise positioning
  const getTranslateX = () => {
    const container = containerRef.current
    if (!container) return '0px'
    const containerWidth = container.offsetWidth
    const visible = visibleCount
    const cardWidth = (containerWidth - GAP * (visible - 1)) / visible
    return `-${position * (cardWidth + GAP)}px`
  }

  const showNav = total > 3
  const dotCount = getMaxPosition() + 1

  return (
    <div
      className="relative group/carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel track */}
      <div
        ref={containerRef}
        className="overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-600 ease-out"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(${getTranslateX()})`,
            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="w-full md:w-[calc((100%-48px)/3)] shrink-0"
            >
              <PremiumDomainCard
                domainName={domain.domainName}
                category={domain.category}
                status={domain.status}
                minimumOffer={domain.minimumOffer}
                imageUrl={domain.imageUrl}
                href={domain.href}
                featured={domain.featured}
                enablePriceShorthand
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile swipe hint — visible on small screens only, fades out automatically */}
      {total > 1 && (
        <div
          className={`md:hidden flex items-center justify-center gap-3 mt-4 transition-opacity duration-700 ${showSwipeHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-hidden="true"
        >
          <span className="text-slate-400 text-xs tracking-wide">←</span>
          <span className="text-slate-500 text-xs">スワイプで切り替え</span>
          <span className="text-slate-400 text-xs tracking-wide">→</span>
        </div>
      )}

      {/* Navigation arrows — inside container, overlaying card edges */}
      {showNav && (
        <>
          <button
            type="button"
            onClick={() => { retreat(); setIsPaused(true) }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 flex items-center justify-center text-slate-500 opacity-60 md:opacity-0 group-hover/carousel:opacity-100 hover:bg-white hover:text-brand-primary hover:border-brand-alt transition-all duration-300"
            aria-label="前のドメインを表示"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => { advance(); setIsPaused(true) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 flex items-center justify-center text-slate-500 opacity-60 md:opacity-0 group-hover/carousel:opacity-100 hover:bg-white hover:text-brand-primary hover:border-brand-alt transition-all duration-300"
            aria-label="次のドメインを表示"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot indicators — brand-alt active, subtle size transition */}
      {showNav && (
        <div className="flex justify-center items-center gap-2.5 mt-6">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setPosition(i); setIsPaused(true) }}
              className={`rounded-full transition-all duration-300 ${
                i === position
                  ? 'w-8 h-2.5 bg-brand-alt'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`スライド ${i + 1} を表示`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
