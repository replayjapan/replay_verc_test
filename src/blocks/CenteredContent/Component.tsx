import React from 'react'

import type { CenteredContentBlock as CenteredContentBlockProps } from '@/payload-types'
import { BudouX } from '@/components/BudouX'
import { alignmentClass } from '@/utilities/alignmentClass'
import RichText from '@/components/RichText'
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

const widthClasses: Record<string, string> = {
  narrow: 'max-w-xl',
  medium: 'max-w-3xl',
  wide: 'max-w-4xl',
  full: 'max-w-7xl',
}

export const CenteredContentBlock: React.FC<CenteredContentBlockProps> = ({
  heading,
  subheading,
  content,
  alignment,
  headingAlignment,
  width,
  backgroundColor,
  primaryLink,
  secondaryLink,
  showTopDivider,
  spacingDensity,
}) => {
  if (!heading) return null

  const bgClass = bgClasses[backgroundColor || 'white'] || 'bg-white'
  const widthClass = widthClasses[width || 'medium'] || 'max-w-3xl'
  const alignClass = alignment === 'center' ? 'text-center' : 'text-left'
  const spacingClass = getSpacingClass(spacingDensity) || 'py-8 md:py-14'

  const pLink = primaryLink as LinkData | undefined
  const sLink = secondaryLink as LinkData | undefined

  return (
    <section className={`${bgClass} ${spacingClass}`}>
      {showTopDivider && <hr className="border-t border-slate-200" />}
      <div className="container mx-auto px-4">
        <div className={`${widthClass} mx-auto ${alignClass}`}>
          <h2 className={`text-3xl md:text-4xl font-semibold mb-4 text-[var(--brand-primary)] ${alignmentClass(headingAlignment)}`}>
            <BudouX>{heading}</BudouX>
          </h2>

          {subheading && (
            <p className="text-xl md:text-2xl mb-8 text-slate-700"><BudouX>{subheading}</BudouX></p>
          )}

          {content && (
            <div className="mb-8">
              <RichText
                className="prose mx-auto max-w-none"
                data={content}
                enableGutter={false}
                enableProse={true}
              />
            </div>
          )}

          {(pLink?.label || sLink?.label) && (
            <div
              className={`flex flex-wrap gap-4 mt-8 ${alignment === 'center' ? 'justify-center' : 'justify-start'}`}
            >
              {pLink?.label && (
                <ButtonLink link={pLink} color="brand-alt" variant="filled" />
              )}

              {sLink?.label && (
                <ButtonLink link={sLink} color="brand-primary" variant="outline" />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
