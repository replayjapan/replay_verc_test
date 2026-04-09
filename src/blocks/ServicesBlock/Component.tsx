import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  Smartphone,
  BarChart2,
  Monitor,
  Code,
  ImageIcon,
  Globe,
  Share,
  Mail,
  Megaphone,
  Camera,
  Pen,
  Briefcase,
} from 'lucide-react'

import type { ServicesBlockType as ServicesBlockProps, Service } from '@/payload-types'
import { BudouX } from '@/components/BudouX'
import { alignmentClass } from '@/utilities/alignmentClass'
import { sanitizeUrl } from '@/utilities/sanitizeUrl'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  smartphone: Smartphone,
  barchart: BarChart2,
  monitor: Monitor,
  code: Code,
  image: ImageIcon,
  globe: Globe,
  share: Share,
  mail: Mail,
  megaphone: Megaphone,
  camera: Camera,
  pen: Pen,
  briefcase: Briefcase,
}

function getPlainText(description: unknown): string {
  if (!description || typeof description !== 'object') return ''
  const root = (description as Record<string, unknown>).root as
    | { children?: Array<{ children?: Array<{ text?: string }> }> }
    | undefined
  return root?.children?.[0]?.children?.[0]?.text || ''
}

const getSpacingClass = (density?: string | null) => {
  switch (density) {
    case 'compact': return 'py-6 md:py-8'
    case 'spacious': return 'py-16 md:py-24'
    default: return ''
  }
}

export const ServicesBlockComponent: React.FC<ServicesBlockProps> = async ({
  heading,
  headingAlignment,
  subheading,
  services: serviceRefs,
  layout = 'grid',
  showBorders = false,
  showDescriptions = true,
  showLinks = true,
  showCTA = true,
  ctaLabel,
  ctaUrl,
  showTopDivider,
  spacingDensity,
}) => {
  const payload = await getPayload({ config: configPromise })

  let services: Service[] = []

  if (serviceRefs && serviceRefs.length > 0) {
    const ids = serviceRefs.map((ref) => (typeof ref === 'object' ? ref.id : ref))
    const result = await payload.find({
      collection: 'services',
      depth: 1,
      where: { id: { in: ids } },
      limit: ids.length,
    })
    services = result.docs
  }

  if (!heading && services.length === 0) return null

  const gridColsClass =
    services.length === 1
      ? 'md:grid-cols-1 max-w-md mx-auto'
      : services.length === 2
        ? 'md:grid-cols-2 max-w-3xl mx-auto'
        : services.length === 4
          ? 'md:grid-cols-2 lg:grid-cols-4'
          : 'md:grid-cols-3'

  const spacingClass = getSpacingClass(spacingDensity) || 'py-16 md:py-20'

  return (
    <section className={`${spacingClass} px-4`}>
      {showTopDivider && <hr className="border-t border-slate-200" />}
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-start md:gap-12">
          <div className="mb-8 md:mb-0 md:w-1/3 md:shrink-0">
            {heading && (
              <h2 className={`text-2xl md:text-3xl font-semibold mb-4 text-[var(--brand-primary)] ${alignmentClass(headingAlignment)}`}>
                <BudouX>{heading}</BudouX>
              </h2>
            )}
            {subheading && (
              <p className="text-slate-700 text-base md:text-lg leading-relaxed"><BudouX>{subheading}</BudouX></p>
            )}

            {showCTA && ctaUrl && (
              <div className="mt-6">
                <Link
                  href={sanitizeUrl(ctaUrl)}
                  className="inline-flex items-center px-5 py-2 text-white rounded font-medium bg-[var(--brand-alt)] hover:bg-[var(--brand-primary)] transition-colors"
                >
                  <BudouX>{ctaLabel || 'サービス一覧'}</BudouX>
                </Link>
              </div>
            )}
          </div>

          {layout === 'grid' && (
            <div className={`grid grid-cols-1 ${gridColsClass} gap-6 md:gap-8`}>
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || Monitor

                return (
                  <div
                    key={service.id}
                    className={`text-center ${showBorders ? 'p-6 rounded-lg border border-slate-200' : ''}`}
                  >
                    <IconComponent className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 text-[var(--brand-alt)]" />
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-[var(--brand-primary)]">
                      <BudouX>{service.title}</BudouX>
                    </h3>

                    {showDescriptions && service.description && (
                      <div className="text-slate-700 text-sm md:text-base mb-2 text-left">
                        <BudouX>{getPlainText(service.description)}</BudouX>
                      </div>
                    )}

                    {showLinks && service.link_url && (
                      <Link
                        href={sanitizeUrl(service.link_url)}
                        className="inline-block text-sm font-medium text-[var(--brand-alt)] hover:text-[var(--brand-primary)] transition-colors"
                      >
                        <BudouX>{service.link_text || '詳しく見る'}</BudouX> &rarr;
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {layout === 'list' && (
            <div
              className={`space-y-6 md:space-y-8 ${services.length <= 2 ? 'mx-auto md:max-w-xl' : 'md:max-w-2xl'}`}
            >
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || Monitor

                return (
                  <div key={service.id} className="flex items-start">
                    <div className="mr-4 mt-1">
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-[var(--brand-alt)]" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-[var(--brand-primary)]">
                        <BudouX>{service.title}</BudouX>
                      </h3>

                      {showDescriptions && service.description && (
                        <div className="text-slate-700 text-sm md:text-base mb-2">
                          <BudouX>{getPlainText(service.description)}</BudouX>
                        </div>
                      )}

                      {showLinks && service.link_url && (
                        <Link
                          href={sanitizeUrl(service.link_url)}
                          className="inline-block text-sm font-medium mt-1 text-[var(--brand-alt)] hover:text-[var(--brand-primary)] transition-colors"
                        >
                          <BudouX>{service.link_text || '詳しく見る'}</BudouX> &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
