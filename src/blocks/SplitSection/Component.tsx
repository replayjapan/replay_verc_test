import React from 'react'
import Image from 'next/image'

import type { SplitSectionBlock as SplitSectionBlockProps, Media } from '@/payload-types'
import { BudouX } from '@/components/BudouX'
import { alignmentClass } from '@/utilities/alignmentClass'
import { ButtonLink } from '@/components/Link/ButtonLink'
import type { LinkData } from '@/components/Link/StandardLink'

const bgClasses: Record<string, string> = {
  white: 'bg-white',
  lightGray: 'bg-slate-100',
  lightBlue: 'bg-blue-50',
  lightBeige: 'bg-amber-50',
}

const getSpacingClass = (density?: string | null) => {
  switch (density) {
    case 'compact': return 'py-6 md:py-8'
    case 'spacious': return 'py-16 md:py-24'
    default: return ''
  }
}

export const SplitSectionBlock: React.FC<SplitSectionBlockProps> = ({
  title,
  description,
  image,
  imagePosition = 'left',
  layoutStyle = 'standard',
  backgroundColor = 'white',
  headingAlignment,
  primaryLink,
  secondaryLink,
  showTopDivider,
  spacingDensity,
}) => {
  if (!title || !description) return null

  const sectionImage = image as Media | undefined
  if (!sectionImage?.url) return null

  const bgClass = bgClasses[backgroundColor || 'white'] || 'bg-white'
  const pLink = primaryLink as LinkData | undefined
  const sLink = secondaryLink as LinkData | undefined

  const ctaBlock = (pLink?.label || sLink?.label) ? (
    <div className="flex flex-wrap gap-4">
      {pLink?.label && (
        <ButtonLink link={pLink} color="brand-alt" variant="filled" />
      )}
      {sLink?.label && (
        <ButtonLink link={sLink} color="brand-primary" variant="outline" />
      )}
    </div>
  ) : null

  const spacingClass = getSpacingClass(spacingDensity)

  if (layoutStyle === 'fullBleed') {
    return (
      <section className={bgClass}>
        {showTopDivider && <hr className="border-t border-slate-200" />}
        <div
          className={`flex flex-col lg:flex-row ${imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}
        >
          <div className="w-full lg:w-1/2 relative">
            <div className="h-[400px] lg:h-[500px] w-full relative">
              <Image
                src={sectionImage.url}
                alt={sectionImage.alt || ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center">
            <div className="p-8 md:p-12 lg:p-16 max-w-xl mx-auto lg:mx-0">
              <h2 className={`text-3xl md:text-4xl font-semibold mb-4 text-[var(--brand-primary)] ${alignmentClass(headingAlignment)}`}>
                <BudouX>{title}</BudouX>
              </h2>
              <p className="text-lg mb-8 leading-relaxed text-slate-700">{typeof description === 'string' ? <BudouX>{description}</BudouX> : description}</p>
              {ctaBlock}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`${spacingClass || 'py-8'} ${bgClass}`}>
      {showTopDivider && <hr className="border-t border-slate-200" />}
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col gap-8 md:gap-12 items-center ${
            imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }`}
        >
          <div className="w-full lg:w-1/2">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg border border-slate-200">
              <Image
                src={sectionImage.url}
                alt={sectionImage.alt || ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="max-w-xl mx-auto lg:mx-0">
              <h2 className={`text-3xl md:text-4xl font-semibold mb-4 text-[var(--brand-primary)] ${alignmentClass(headingAlignment)}`}>
                <BudouX>{title}</BudouX>
              </h2>
              <p className="text-lg mb-8 leading-relaxed text-slate-700">{typeof description === 'string' ? <BudouX>{description}</BudouX> : description}</p>
              {ctaBlock}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
