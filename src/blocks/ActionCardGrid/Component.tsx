import React from 'react'
import {
  Globe,
  Shield,
  BarChart3,
  Zap,
  Lock,
  Headphones,
  TrendingUp,
  Search,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  type LucideIcon,
} from 'lucide-react'

import Image from 'next/image'

import type { ActionCardGridBlock as ActionCardGridBlockProps, Media } from '@/payload-types'
import { BudouX } from '@/components/BudouX'
import { StandardLink } from '@/components/Link/StandardLink'
import type { LinkData } from '@/components/Link/StandardLink'

const iconMap: Record<string, LucideIcon> = {
  Globe, Shield, BarChart3, Zap, Lock, Headphones, TrendingUp,
  Search, MessageSquare, CheckCircle, Star, Users,
}

const bgClasses: Record<string, string> = {
  transparent: '',
  'light-gray': 'bg-slate-50',
  'brand-primary': 'bg-[var(--brand-primary)]',
  'brand-alt': 'bg-[var(--brand-alt)]',
}

const colClasses: Record<string, string> = {
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const sectionAlignClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

function isDark(bg: string | null | undefined): boolean {
  return bg === 'brand-primary'
}

const getSpacingClass = (density?: string | null) => {
  switch (density) {
    case 'compact': return 'py-6 md:py-8'
    case 'spacious': return 'py-16 md:py-24'
    default: return ''
  }
}

export const ActionCardGridBlock: React.FC<ActionCardGridBlockProps> = ({
  sectionHeading,
  sectionSubtitle,
  columns,
  cardStyle,
  sectionAlignment,
  headingAlignment,
  cardAlignment,
  sectionBackground,
  cards,
  showTopDivider,
  spacingDensity,
}) => {
  if (!cards || cards.length === 0) return null

  const dark = isDark(sectionBackground)
  const bg = bgClasses[sectionBackground || 'transparent'] || ''
  const cols = colClasses[columns || '3'] || colClasses['3']
  const secAlign = sectionAlignClasses[headingAlignment || sectionAlignment || 'center'] || ''
  const cardAlign = (cardAlignment || 'center') === 'center' ? 'text-center items-center' : 'text-left items-start'
  const style = cardStyle || 'bordered'
  const spacingClass = getSpacingClass(spacingDensity) || 'py-12 md:py-16'

  return (
    <section className={`${spacingClass} ${bg}`}>
      {showTopDivider && <hr className="border-t border-slate-200" />}
      <div className="max-w-6xl mx-auto px-6">
        {(sectionHeading || sectionSubtitle) && (
          <div className={`mb-14 ${secAlign}`}>
            {sectionHeading && (
              <h2 className={`text-3xl font-bold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
                <BudouX>{sectionHeading}</BudouX>
              </h2>
            )}
            {sectionSubtitle && (
              <p className={`mt-3 text-lg ${dark ? 'text-white/60' : 'text-slate-600'}`}><BudouX>{sectionSubtitle}</BudouX></p>
            )}
            {(sectionAlignment || 'center') === 'center' && (
              <div className="mt-6 mx-auto w-12 h-0.5 rounded-full bg-[var(--brand-alt)]" />
            )}
          </div>
        )}

        <div className={`grid ${cols} gap-6`}>
          {cards.map((card, i) => {
            const IconComponent = card.icon ? iconMap[card.icon] : null
            const cardImage = card.image as Media | undefined

            let cardClasses = `group/card flex flex-col gap-5 p-7 rounded-2xl h-full transition-all duration-300 ease-out ${cardAlign}`
            if (style === 'bordered') {
              cardClasses += ' border border-slate-200 hover:border-[var(--brand-alt)] hover:-translate-y-1'
            } else if (style === 'filled') {
              cardClasses += dark
                ? ' bg-white/[0.07] backdrop-blur-sm hover:bg-white/[0.12] hover:-translate-y-1'
                : ' bg-slate-50/80 hover:bg-white hover:border hover:border-slate-200 hover:-translate-y-1'
            } else {
              cardClasses += ' hover:bg-slate-50/60 hover:-translate-y-0.5'
            }

            const titleColor = dark && style !== 'bordered' ? 'text-white' : 'text-slate-900'
            const descColor = dark && style !== 'bordered' ? 'text-white/70' : 'text-slate-600'

            const linkData = card.link as LinkData | undefined
            const hasLink = linkData?.label && (linkData.type === 'internal' ? linkData.internalDoc : linkData.externalUrl)

            return (
              <div key={i} className={cardClasses}>
                {card.mediaType === 'icon' && IconComponent && (
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110 ${
                    dark && style !== 'bordered'
                      ? 'bg-[var(--brand-alt)]/20 text-[var(--brand-alt)]'
                      : 'bg-[var(--brand-primary)]/[0.06] text-[var(--brand-primary)]'
                  }`}>
                    <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                )}

                {card.mediaType === 'image' && cardImage?.url && (
                  <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden">
                    <Image
                      src={cardImage.url}
                      alt={cardImage.alt || ''}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className={`text-[17px] font-semibold leading-snug ${titleColor}`}>{card.title && <BudouX>{card.title}</BudouX>}</h3>
                  {card.description && (
                    <p className={`text-[14px] leading-relaxed ${descColor}`}><BudouX>{card.description}</BudouX></p>
                  )}
                </div>

                {hasLink && linkData && (
                  <div className="mt-auto pt-1">
                    <StandardLink
                      link={linkData}
                      className={`inline-flex items-center gap-1.5 text-[13px] font-medium transition-all duration-200 ${
                        dark && style !== 'bordered'
                          ? 'text-[var(--brand-alt)] hover:text-white'
                          : 'text-[var(--brand-alt)] hover:text-[var(--brand-primary)]'
                      }`}
                    >
                      {linkData.label}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/card:translate-x-0.5" />
                    </StandardLink>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
