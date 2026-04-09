import React from 'react'
import Image from 'next/image'

import type { Media } from '@/payload-types'
import { BudouX } from '@/components/BudouX'
import { FullCarousel } from './FullCarousel'
import type { Slide } from './FullCarousel'

type HeroHeaderSize = 'full' | 'medium' | 'short'

type HeroHeaderProps = {
  size?: string | null
  title?: string | null
  subtitle?: string | null
  image?: Media | number | null
  headingAlignment?: string | null
  slides?: Slide[] | null
  children?: React.ReactNode
  childrenPosition?: 'above' | 'below'
  blockType?: 'heroHeader'
  blockName?: string | null
}

// ─── Medium/Short: Static Header (server component) ────────────────────────

const sizeClasses: Record<string, string> = {
  medium: 'h-[320px] md:h-[400px]',
  short: 'h-[200px] md:h-[260px]',
}

const paddingClasses: Record<string, string> = {
  medium: 'pb-10 md:pb-14',
  short: 'pb-6 md:pb-8',
}

const titleClasses: Record<string, string> = {
  medium: 'text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-4xl',
  short: 'text-2xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] max-w-4xl',
}

const subtitleClasses: Record<string, string> = {
  medium: 'mt-4 text-base md:text-lg leading-7 max-w-3xl text-white/88',
  short: 'mt-3 text-sm md:text-base leading-6 max-w-3xl text-white/88',
}

function StaticHeader({
  size,
  title,
  subtitle,
  image,
  headingAlignment,
  children,
  childrenPosition = 'below',
}: {
  size: string
  title?: string | null
  subtitle?: string | null
  image?: Media | undefined
  headingAlignment?: string | null
  children?: React.ReactNode
  childrenPosition?: 'above' | 'below'
}) {
  const hasImage = Boolean(image?.url)
  const alignment = headingAlignment === 'center' ? 'text-center mx-auto' : headingAlignment === 'right' ? 'text-right ml-auto' : 'text-left'

  return (
    <section
      className={`relative overflow-hidden text-white ${sizeClasses[size] || sizeClasses.medium}${hasImage ? '' : ' bg-[var(--brand-primary)]'}`}
    >
      {hasImage && image?.url && (
        <>
          <Image
            src={image.url}
            alt={image.alt || ''}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </>
      )}

      <div
        className={`relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-end ${paddingClasses[size] || paddingClasses.medium}`}
      >
        <div className={alignment}>
          {children && childrenPosition === 'above' && children}

          {title && (
            <h1 className={titleClasses[size] || titleClasses.medium}>
              <BudouX>{title}</BudouX>
            </h1>
          )}

          {subtitle && (
            <p className={subtitleClasses[size] || subtitleClasses.medium}>
              <BudouX>{subtitle}</BudouX>
            </p>
          )}

          {children && childrenPosition === 'below' && (
            <div className="mt-5">{children}</div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Main Component (server component) ──────────────────────────────────────

export const HeroHeaderBlock: React.FC<HeroHeaderProps> = (props) => {
  const size = (props.size || 'medium') as HeroHeaderSize

  // Full size → carousel (client component)
  if (size === 'full' && props.slides && props.slides.length > 0) {
    return <FullCarousel slides={props.slides} />
  }

  // Medium/Short → static header (server rendered)
  return (
    <StaticHeader
      size={size}
      title={props.title}
      subtitle={props.subtitle}
      image={props.image as Media | undefined}
      headingAlignment={props.headingAlignment}
      childrenPosition={props.childrenPosition}
    >
      {props.children}
    </StaticHeader>
  )
}
