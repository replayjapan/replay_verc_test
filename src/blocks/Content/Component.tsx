import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { StandardLink } from '@/components/Link/StandardLink'
import type { LinkData } from '@/components/Link/StandardLink'

const bgClasses: Record<string, string> = {
  white: 'bg-white',
  lightGray: 'bg-slate-50',
  brand: 'bg-[var(--brand-primary)] text-white',
  dark: 'bg-[var(--brand-primary)] text-white',
}

const getSpacingClass = (density?: string | null) => {
  switch (density) {
    case 'compact': return 'my-6 md:my-8'
    case 'spacious': return 'my-16 md:my-24'
    default: return ''
  }
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, backgroundColor, showTopDivider, spacingDensity } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const bgClass = bgClasses[backgroundColor || 'white'] || ''
  const spacingClass = getSpacingClass(spacingDensity) || 'my-16'

  return (
    <div className={bgClass}>
      {showTopDivider && <hr className="border-t border-slate-200" />}
      <div className={`site-container ${spacingClass}`}>
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col
              const linkData = link as LinkData | undefined

              return (
                <div
                  className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                    'md:col-span-2': size !== 'full',
                    '[&_h3]:border-t [&_h3]:border-slate-200 [&_h3]:pt-6 [&_h3]:mt-6 [&_h3:first-child]:border-t-0 [&_h3:first-child]:pt-0 [&_h3:first-child]:mt-0':
                      columns && columns.length > 1 && index > 0,
                  })}
                  key={index}
                >
                  {richText && <RichText data={richText} enableGutter={false} />}

                  {enableLink && linkData && <StandardLink link={linkData} />}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
