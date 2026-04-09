'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { HeroCarouselBlock as HeroCarouselBlockProps } from '@/payload-types'
import { BudouXClient } from '@/components/BudouX/client'
import type { Media } from '@/payload-types'
import { ButtonLink } from '@/components/Link/ButtonLink'
import type { LinkData } from '@/components/Link/StandardLink'

const heightMap: Record<string, number> = {
  standard: 600,
  tall: 700,
  short: 500,
}

export const HeroCarouselBlock: React.FC<HeroCarouselBlockProps> = ({
  slides,
  useSharedContent = false,
  sharedContent,
  textAlignment = 'left',
  height = 'standard',
  showArrows = true,
}) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !slides || slides.length <= 1) return

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [mounted, slides])

  if (!slides || slides.length === 0) return null

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }

  const goToSlide = (index: number) => {
    setActiveSlide(index)
  }

  const alignmentClasses: Record<string, string> = {
    center: 'text-center mx-auto md:max-w-3xl',
    right: 'text-right ml-auto md:max-w-xl',
    left: 'text-left md:max-w-xl',
  }

  const align = alignmentClasses[textAlignment || 'left'] || alignmentClasses.left

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: `${heightMap[height || 'standard'] || 600}px` }}
    >
      <div className="relative h-full w-full">
        {slides.map((slide, index) => {
          const title = useSharedContent ? sharedContent?.title : slide.title
          const description = useSharedContent ? sharedContent?.description : slide.description
          const pLink = (useSharedContent ? sharedContent?.primaryLink : slide.primaryLink) as LinkData | undefined
          const sLink = (useSharedContent ? sharedContent?.secondaryLink : slide.secondaryLink) as LinkData | undefined

          const slideImage = slide.image as Media | undefined
          if (!slideImage?.url) return null

          return (
            <div
              key={index}
              className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
                index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="absolute inset-0 z-10 bg-black/40 md:bg-black/30" />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <Image
                src={slideImage.url}
                alt={slideImage.alt || ''}
                fill
                className="object-cover"
                priority={index === 0}
              />

              <div className="absolute inset-0 z-20 flex items-center pointer-events-auto">
                <div className="container mx-auto px-6">
                  <div className={`max-w-lg ${align}`}>
                    {title && (
                      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"><BudouXClient>{title}</BudouXClient></h1>
                    )}

                    {description && (
                      <p className="text-xl text-white mb-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"><BudouXClient>{description}</BudouXClient></p>
                    )}

                    <div
                      className={`flex flex-wrap gap-4 ${textAlignment === 'center' ? 'justify-center' : ''}`}
                    >
                      {pLink?.label && (
                        <ButtonLink
                          link={pLink}
                          color="brand-alt"
                          variant="filled"
                          size="default"
                        />
                      )}

                      {sLink?.label && (
                        <ButtonLink
                          link={sLink}
                          color="white"
                          variant="outline"
                          size="default"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation rendered only after client mount to prevent hydration mismatch on mobile */}
      {mounted && showArrows && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 opacity-60 md:opacity-0 md:hover:opacity-100 flex items-center justify-center w-11 h-11 rounded-full bg-black/40 text-white hover:bg-black/65 transition-all border border-white/20"
            aria-label="前のスライド"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 opacity-60 md:opacity-0 md:hover:opacity-100 flex items-center justify-center w-11 h-11 rounded-full bg-black/40 text-white hover:bg-black/65 transition-all border border-white/20"
            aria-label="次のスライド"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </>
      )}

      {mounted && slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center">
          <div className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'w-5 h-3 bg-white'
                    : 'w-3 h-3 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`スライド ${index + 1} に移動`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
