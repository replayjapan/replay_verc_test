import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { ButtonLink } from '@/components/Link/ButtonLink'
import type { LinkData } from '@/components/Link/StandardLink'

const bgClasses: Record<string, string> = {
  white: 'bg-white',
  lightGray: 'bg-slate-50',
  lightBlue: 'bg-blue-50',
  lightBeige: 'bg-amber-50',
}

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  backgroundColor,
  showTopDivider,
}) => {
  if (!richText && (!links || links.length === 0)) return null

  const bgClass = bgClasses[backgroundColor || 'lightGray'] || bgClasses['lightGray']

  return (
    <div className={bgClass}>
      {showTopDivider && <hr className="border-t border-slate-200" />}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {richText && (
            <RichText
              className="mb-0 [&_h3]:text-2xl [&_h3]:md:text-3xl [&_h3]:font-medium [&_h3]:tracking-[-0.02em] [&_h3]:text-slate-900 [&_h3]:mb-4 [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-8 [&_p]:text-slate-700 [&_p]:mb-8"
              data={richText}
              enableGutter={false}
            />
          )}
          {links && links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {links.map(({ link }, i) => {
                const linkData = link as LinkData | undefined
                if (!linkData) return null
                return (
                  <ButtonLink
                    key={i}
                    link={linkData}
                    size="default"
                    color="brand-primary"
                    variant="filled"
                  />
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
