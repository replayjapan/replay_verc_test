'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'

import type { ImageGalleryBlock as ImageGalleryBlockProps, Media } from '@/payload-types'
import { BudouXClient } from '@/components/BudouX/client'
import { alignmentClass } from '@/utilities/alignmentClass'

const bgClasses: Record<string, string> = {
  white: 'bg-white',
  lightGray: 'bg-gray-50',
  brand: 'bg-[var(--brand-primary)] text-white',
  dark: 'bg-gray-900 text-white',
}

const colClasses: Record<string, string> = {
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const gapClasses: Record<string, string> = {
  tight: 'gap-1.5',
  normal: 'gap-4',
  wide: 'gap-8',
}

const aspectClasses: Record<string, string> = {
  original: '',
  square: 'aspect-square',
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
}

interface LightboxImage {
  url: string
  alt: string
  caption?: string
}

function LightboxOverlay({ image, onClose }: { image: LightboxImage; onClose: () => void }) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="画像プレビュー"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 z-10"
        aria-label="閉じる"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="max-w-5xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <Image src={image.url} alt={image.alt || ''} width={1200} height={800} className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg" />
        {image.caption && <p className="mt-5 text-white/80 text-center text-sm tracking-wide"><BudouXClient>{image.caption}</BudouXClient></p>}
      </div>
    </div>
  )
}

const getSpacingClass = (density?: string | null) => {
  switch (density) {
    case 'compact': return 'py-6 md:py-8'
    case 'spacious': return 'py-16 md:py-24'
    default: return ''
  }
}

export const ImageGalleryBlock: React.FC<ImageGalleryBlockProps> = ({
  sectionHeading,
  headingAlignment,
  columns,
  aspectRatio,
  gap,
  captionAlignment,
  lightbox,
  images,
  backgroundColor,
  showTopDivider,
  spacingDensity,
}) => {
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null)
  const closeLightbox = useCallback(() => setLightboxImage(null), [])

  if (!images || images.length === 0) return null

  const cols = colClasses[columns || '3'] || colClasses['3']
  const gapClass = gapClasses[gap || 'normal'] || gapClasses['normal']
  const aspect = aspectClasses[aspectRatio || '16:9'] || ''
  const captionAlign = (captionAlignment || 'left') === 'center' ? 'text-center' : 'text-left'
  const bgClass = bgClasses[backgroundColor || 'white'] || ''
  const spacingClass = getSpacingClass(spacingDensity) || 'py-20'

  return (
    <>
      <section className={`${spacingClass} ${bgClass}`}>
        {showTopDivider && <hr className="border-t border-gray-200" />}
        <div className="max-w-6xl mx-auto px-6">
          {sectionHeading && (
            <div className={`mb-12 ${alignmentClass(headingAlignment)}`}>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight"><BudouXClient>{sectionHeading}</BudouXClient></h2>
              <div className={`mt-4 w-12 h-0.5 rounded-full bg-[var(--brand-alt)] ${(headingAlignment || 'center') === 'center' ? 'mx-auto' : (headingAlignment === 'right' ? 'ml-auto' : '')}`} />
            </div>
          )}

          <div className={`grid ${cols} ${gapClass}`}>
            {images.map((item, i) => {
              const media = item.image as Media | undefined
              if (!media?.url) return null

              const lbImg: LightboxImage = { url: media.url, alt: media.alt || '', caption: item.caption || undefined }

              return (
                <div key={i} className="group">
                  <div
                    className={`relative overflow-hidden rounded-xl ${aspect || 'aspect-video'} ${lightbox ? 'cursor-pointer' : ''}`}
                    onClick={lightbox ? () => setLightboxImage(lbImg) : undefined}
                    role={lightbox ? 'button' : undefined}
                    aria-label={lightbox ? `${media.alt || ''} — クリックで拡大` : undefined}
                    tabIndex={lightbox ? 0 : undefined}
                    onKeyDown={lightbox ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxImage(lbImg) } } : undefined}
                  >
                    <Image
                      src={media.url}
                      alt={media.alt || ''}
                      fill
                      className={`object-cover transition-transform duration-500 ease-out ${lightbox ? 'group-hover:scale-[1.03]' : ''}`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {lightbox && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                          <ZoomIn className="w-4 h-4 text-gray-800" />
                        </div>
                      </div>
                    )}
                  </div>
                  {item.caption && (
                    <p className={`mt-3 text-[13px] text-slate-600 leading-relaxed ${captionAlign}`}><BudouXClient>{item.caption}</BudouXClient></p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {lightboxImage && <LightboxOverlay image={lightboxImage} onClose={closeLightbox} />}
    </>
  )
}
