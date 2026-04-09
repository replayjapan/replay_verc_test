'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { Media } from '@/payload-types'
import { BudouXClient } from '@/components/BudouX/client'
import { sanitizeUrl } from '@/utilities/sanitizeUrl'

export type Slide = {
  image: Media | number | null
  heading: string
  subtitle?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  id?: string | null
}

export function FullCarousel({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pointerStartX = useRef<number | null>(null)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrent(index)
        setIsTransitioning(false)
      }, 300)
    },
    [isTransitioning],
  )

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo, slides.length])

  const goPrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo, slides.length])

  useEffect(() => {
    timerRef.current = setTimeout(goNext, 5000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, goNext])

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return
    const delta = e.clientX - pointerStartX.current
    if (delta > 48) goPrev()
    else if (delta < -48) goNext()
    pointerStartX.current = null
  }

  const slide = slides[current]

  return (
    <section
      className="group/hero relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Background images — cross-fade */}
      {slides.map((s, i) => {
        const img = s.image as Media | undefined
        if (!img?.url) return null
        return (
          <div
            key={img.url}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={img.url}
              alt={img.alt || ''}
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        )
      })}

      {/* Dark overlay — gradient stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />

      {/* Content — bottom-anchored */}
      <div className="relative z-20 w-full pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="transition-opacity duration-300"
            style={{ opacity: isTransitioning ? 0 : 1 }}
          >
            {slide?.heading && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1.02] text-white mb-6 max-w-4xl text-balance">
                <BudouXClient>{slide.heading}</BudouXClient>
              </h1>
            )}
            {slide?.subtitle && (
              <p className="text-base md:text-lg leading-8 text-white/88 max-w-xl mb-8">
                <BudouXClient>{slide.subtitle}</BudouXClient>
              </p>
            )}
            {slide?.ctaLabel && slide?.ctaUrl && (
              <Link
                href={sanitizeUrl(slide.ctaUrl)}
                className="inline-block bg-[var(--brand-alt)] text-[var(--brand-primary)] font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-[var(--brand-primary)] transition-colors duration-200 text-base"
              >
                {slide.ctaLabel}
              </Link>
            )}
          </div>

          {/* Dot navigation — bar style */}
          {slides.length > 1 && (
            <div className="flex items-center gap-3 mt-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`スライド ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-[var(--brand-alt)]'
                      : 'w-4 bg-white/50 hover:bg-[var(--brand-alt)]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Arrow buttons — appear on hover */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="前のスライド"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm
              flex items-center justify-center
              text-white opacity-60 md:opacity-0 group-hover/hero:opacity-100 hover:opacity-100 focus:opacity-100
              hover:bg-[var(--brand-alt)] hover:text-[var(--brand-primary)]
              transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="次のスライド"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm
              flex items-center justify-center
              text-white opacity-60 md:opacity-0 group-hover/hero:opacity-100 hover:opacity-100 focus:opacity-100
              hover:bg-[var(--brand-alt)] hover:text-[var(--brand-primary)]
              transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </section>
  )
}
