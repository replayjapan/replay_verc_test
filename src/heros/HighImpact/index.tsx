'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import { ButtonLink } from '@/components/Link/ButtonLink'
import type { LinkData } from '@/components/Link/StandardLink'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

// Dead code — hero removed from Pages in M22. Kept for reference.
import type { Media as MediaType } from '@/payload-types'

type HeroProps = { links?: Array<{ link?: LinkData }> | null; media?: MediaType | number | null; richText?: Parameters<typeof RichText>[0]['data'] | null }

export const HighImpactHero: React.FC<HeroProps> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="site-container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                const linkData = link as LinkData | undefined
                if (!linkData) return null
                return (
                  <li key={i}>
                    <ButtonLink link={linkData} color="brand-alt" variant="filled" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
