import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Where } from 'payload'

import type { DomainShowcaseBlock as DomainShowcaseBlockProps, Domain } from '@/payload-types'
import { BudouX } from '@/components/BudouX'
import { alignmentClass } from '@/utilities/alignmentClass'
import { SectionHeader } from '@/components/domains/SectionHeader/Component'
import { DomainShowcaseCarousel } from './Carousel'
import type { CarouselDomain } from './Carousel'
import type { DomainStatus } from '@/components/domains/StatusBadge/types'

const bgClasses: Record<string, string> = {
  white: 'bg-white',
  lightGray: 'bg-slate-50',
  brand: 'bg-[var(--brand-primary)] text-white',
  dark: 'bg-slate-900 text-white',
}

const getSpacingClass = (density?: string | null) => {
  switch (density) {
    case 'compact': return 'py-6 md:py-8'
    case 'spacious': return 'py-16 md:py-24'
    default: return ''
  }
}

export const DomainShowcaseBlock: React.FC<DomainShowcaseBlockProps> = async ({
  sourceMode,
  limit: limitFromProps,
  categories,
  selectedDomains,
  title,
  subtitle,
  headingAlignment,
  showViewAll,
  backgroundColor,
  showTopDivider,
  spacingDensity,
}) => {
  const payload = await getPayload({ config: configPromise })

  let domains: Domain[] = []

  if (sourceMode === 'featured') {
    const result = await payload.find({
      collection: 'domains',
      depth: 1,
      limit: limitFromProps || 6,
      sort: '-featured',
      where: {
        status: { equals: 'open' },
        _status: { equals: 'published' },
        featured: { equals: true },
      },
    })
    domains = result.docs
  } else if (sourceMode === 'category') {
    const categoryIds = (categories || []).map((cat) =>
      typeof cat === 'object' ? cat.id : cat,
    )

    const where: Where = {
      status: { equals: 'open' },
      _status: { equals: 'published' },
    }

    if (categoryIds.length > 0) {
      where.category = { in: categoryIds }
    }

    const result = await payload.find({
      collection: 'domains',
      depth: 1,
      limit: limitFromProps || 6,
      sort: '-featured',
      where,
    })
    domains = result.docs
  } else if (sourceMode === 'manual') {
    if (selectedDomains?.length) {
      domains = selectedDomains
        .map((d) => (typeof d === 'object' ? d : null))
        .filter((d): d is Domain => d !== null)
    }
  }

  if (!domains.length) return null

  const bgClass = bgClasses[backgroundColor || 'white'] || ''
  const spacingClass = getSpacingClass(spacingDensity)

  // Serialize domain data for the client carousel component
  const carouselDomains: CarouselDomain[] = domains.map((domain) => {
    const category =
      typeof domain.category === 'object' && domain.category !== null
        ? domain.category.name
        : undefined

    const featuredImage =
      typeof domain.featuredImage === 'object' && domain.featuredImage !== null
        ? domain.featuredImage.url ?? undefined
        : undefined

    return {
      id: domain.id,
      domainName: domain.domainName,
      category,
      status: domain.status as DomainStatus,
      minimumOffer: domain.minimumOffer,
      imageUrl: featuredImage,
      href: `/domains/${domain.slug}`,
      featured: Boolean(domain.featured),
    }
  })

  return (
    <div className={bgClass}>
      {showTopDivider && <hr className="border-t border-slate-200" />}
      <div className={`site-container ${spacingClass || 'my-16'}`}>
        {title && (
          <SectionHeader title={title} subtitle={subtitle ?? undefined} accentUnderline className={alignmentClass(headingAlignment)} />
        )}
        <DomainShowcaseCarousel domains={carouselDomains} />
        {showViewAll && (
          <div className="text-center mt-8">
            <Link href="/domains" className="text-brand-primary font-semibold hover:underline">
              <BudouX>すべてのドメインを見る</BudouX> &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
