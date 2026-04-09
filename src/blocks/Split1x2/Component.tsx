import React from 'react'
import Image from 'next/image'

import type { Split1X2Block as Split1x2BlockProps, Media } from '@/payload-types'
import { BudouX } from '@/components/BudouX'
import { alignmentClass } from '@/utilities/alignmentClass'
import RichText from '@/components/RichText'

const bgClasses: Record<string, string> = {
  white: 'bg-white',
  lightGray: 'bg-gray-100',
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

export const Split1x2Block: React.FC<Split1x2BlockProps> = ({
  smallColumnPosition = 'left',
  headingAlignment,
  smallColumnDisplayType = 'image',
  smallColumnImage,
  smallColumnRoundedCorners = false,
  smallColumnTitle,
  smallColumnSubtitle,
  smallColumnDescription,
  largeColumnHeader,
  largeColumnSubheader,
  largeColumnDescription,
  backgroundColor = 'white',
  showTopDivider,
  spacingDensity,
}) => {
  if (!largeColumnHeader) return null

  const bgClass = bgClasses[backgroundColor || 'white'] || 'bg-white'
  const isSmallColumnLeft = smallColumnPosition === 'left'
  const spacingClass = getSpacingClass(spacingDensity) || 'py-16'

  const image = smallColumnImage as Media | undefined
  const imageUrl = image?.url || ''
  const imageAlt = image?.alt || smallColumnTitle || ''

  return (
    <section className={`${spacingClass} ${bgClass}`}>
      {showTopDivider && <hr className="border-t border-gray-200" />}
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${isSmallColumnLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12`}
        >
          {/* 1/3 Column */}
          <div className="md:w-1/3">
            {smallColumnDisplayType === 'backgroundImage' && (
              <div className="relative w-full h-64 md:h-full overflow-hidden rounded-lg">
                {imageUrl && (
                  <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-end p-6">
                  {smallColumnTitle && (
                    <h3 className="text-white text-2xl font-bold"><BudouX>{smallColumnTitle}</BudouX></h3>
                  )}
                </div>
              </div>
            )}

            {smallColumnDisplayType === 'image' && (
              <div className="space-y-4">
                {imageUrl && (
                  <div
                    className={`aspect-square overflow-hidden ${smallColumnRoundedCorners ? 'rounded-lg' : ''}`}
                  >
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                {smallColumnTitle && (
                  <h3 className="text-xl font-bold mt-4 text-[var(--brand-primary)]">
                    <BudouX>{smallColumnTitle}</BudouX>
                  </h3>
                )}
                {smallColumnSubtitle && <p className="text-slate-700"><BudouX>{smallColumnSubtitle}</BudouX></p>}
                {smallColumnDescription && (
                  <p className="text-gray-700"><BudouX>{smallColumnDescription}</BudouX></p>
                )}
              </div>
            )}

            {smallColumnDisplayType === 'textOnly' && (
              <div className="space-y-4 pt-6">
                {smallColumnTitle && (
                  <h3 className="text-2xl font-bold text-[var(--brand-primary)]">
                    <BudouX>{smallColumnTitle}</BudouX>
                  </h3>
                )}
                {smallColumnSubtitle && (
                  <p className="text-xl text-slate-700"><BudouX>{smallColumnSubtitle}</BudouX></p>
                )}
                {smallColumnDescription && (
                  <p className="text-gray-700"><BudouX>{smallColumnDescription}</BudouX></p>
                )}
              </div>
            )}
          </div>

          {/* 2/3 Column */}
          <div className="md:w-2/3">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-[var(--brand-primary)] ${alignmentClass(headingAlignment)}`}>
              <BudouX>{largeColumnHeader}</BudouX>
            </h2>
            {largeColumnSubheader && (
              <p className="text-xl text-slate-700 mb-6"><BudouX>{largeColumnSubheader}</BudouX></p>
            )}
            {largeColumnDescription && (
              <RichText
                className="prose prose-lg max-w-none"
                data={largeColumnDescription}
                enableGutter={false}
                enableProse={true}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
