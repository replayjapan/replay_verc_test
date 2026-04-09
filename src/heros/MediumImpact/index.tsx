import React from 'react'

import { ButtonLink } from '@/components/Link/ButtonLink'
import type { LinkData } from '@/components/Link/StandardLink'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

// Dead code — hero removed from Pages in M22. Kept for reference.
import type { Media as MediaType } from '@/payload-types'

type HeroProps = { links?: Array<{ link?: LinkData }> | null; media?: MediaType | number | null; richText?: Parameters<typeof RichText>[0]['data'] | null }

export const MediumImpactHero: React.FC<HeroProps> = ({ links, media, richText }) => {
  return (
    <div className="">
      <div className="site-container mb-8">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
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
      <div className="site-container ">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
