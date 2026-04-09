import React from 'react'
import Image from 'next/image'
import {
  Globe,
  Heart,
  Zap,
  Award,
  TrendingUp,
  Users,
  Star,
  Shield,
  Target,
  type LucideIcon,
} from 'lucide-react'

import type { MetricsBarBlock as MetricsBarBlockProps, Media } from '@/payload-types'
import { BudouX } from '@/components/BudouX'
import { alignmentClass } from '@/utilities/alignmentClass'

const iconMap: Record<string, LucideIcon> = {
  Globe, Heart, Zap, Award, TrendingUp, Users, Star, Shield, Target,
}

const bgClasses: Record<string, string> = {
  transparent: '',
  'brand-primary': 'bg-[var(--brand-primary)]',
  'brand-alt': 'bg-[var(--brand-alt)]',
  'light-gray': 'bg-slate-50',
}

function isDark(bg: string | null | undefined): boolean {
  return bg === 'brand-primary'
}

function abbreviateNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return n.toLocaleString()
}

function formatNumber(n: number, abbr: boolean): string {
  if (abbr) return abbreviateNumber(n)
  return String(n)
}

const getSpacingClass = (density?: string | null) => {
  switch (density) {
    case 'compact': return 'py-6 md:py-8'
    case 'spacious': return 'py-16 md:py-24'
    default: return ''
  }
}

export const MetricsBarBlock: React.FC<MetricsBarBlockProps> = ({
  mode,
  sectionHeading,
  headingAlignment,
  background,
  abbreviate,
  items,
  bigNumberPrefix,
  bigNumber,
  bigNumberSuffix,
  bigNumberAlignment,
  contentHeading,
  contentText,
  contentImage,
  contentSubtext,
  showTopDivider,
  spacingDensity,
}) => {
  const dark = isDark(background)
  const bg = bgClasses[background || 'transparent'] || ''
  const abbr = abbreviate || false

  if (mode === 'bar' && (!items || items.length === 0)) return null
  if (mode === 'split' && (bigNumber === undefined || bigNumber === null)) return null

  const contentMedia = contentImage as Media | undefined
  const hasImage = mode === 'split' && contentMedia?.url
  const defaultSpacing = hasImage ? 'py-0' : 'py-20'
  const spacingClass = getSpacingClass(spacingDensity) || defaultSpacing

  return (
    <section className={`${spacingClass} ${bg} overflow-hidden`}>
      {showTopDivider && <hr className="border-t border-gray-200" />}
      <div className={hasImage ? '' : 'max-w-6xl mx-auto px-6'}>
        {sectionHeading && (
          <div className={`mb-12 ${alignmentClass(headingAlignment)} ${hasImage ? 'max-w-6xl mx-auto px-6 pt-20' : ''}`}>
            <h2 className={`text-3xl font-bold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
              <BudouX>{sectionHeading}</BudouX>
            </h2>
            <div className={`mt-4 w-12 h-0.5 rounded-full bg-[var(--brand-alt)] ${(headingAlignment || 'center') === 'center' ? 'mx-auto' : (headingAlignment === 'right' ? 'ml-auto' : '')}`} />
          </div>
        )}

        {mode === 'bar' && items && (
          <div className={`grid gap-4 ${
            items.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
            items.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
            items.length >= 5 ? 'grid-cols-2 md:grid-cols-5' :
            'grid-cols-2 md:grid-cols-4'
          }`}>
            {items.map((item, i) => {
              const IconComponent = item.icon ? iconMap[item.icon] : null
              return (
                <div key={i} className="flex flex-col items-center text-center gap-3 py-6">
                  {IconComponent && (
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      dark ? 'bg-[var(--brand-alt)]/20 text-[var(--brand-alt)]' : 'bg-[var(--brand-primary)]/[0.06] text-[var(--brand-primary)]'
                    }`}>
                      <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                  )}
                  <div className={`text-4xl font-bold tracking-tight tabular-nums ${dark ? 'text-white' : 'text-slate-900'}`}>
                    {item.prefix && <span className="text-2xl font-semibold opacity-70">{item.prefix}</span>}
                    {formatNumber(item.number, abbr)}
                    {item.suffix && <span className="text-2xl font-semibold opacity-70">{item.suffix}</span>}
                  </div>
                  <div className={`text-[13px] font-medium tracking-wide ${dark ? 'text-white/50' : 'text-slate-500'}`}>
                    {item.label && <BudouX>{item.label}</BudouX>}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {mode === 'split' && bigNumber != null && (
          <div className={hasImage ? 'max-w-6xl mx-auto' : ''}>
            <div className={`grid grid-cols-1 md:grid-cols-2 items-stretch ${hasImage ? '' : 'gap-12'}`}>
              {/* Big Number */}
              <div className={`flex flex-col px-6 py-10 md:py-16 ${
                (bigNumberAlignment || 'right') === 'center'
                  ? 'text-center justify-center'
                  : 'text-right justify-end'
              }`}>
                <div className={`text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter ${dark ? 'text-white' : 'text-slate-900'}`}>
                  {bigNumberPrefix && <span className="text-4xl md:text-5xl font-semibold opacity-60">{bigNumberPrefix}</span>}
                  {formatNumber(bigNumber, abbr)}
                  {bigNumberSuffix && <span className="text-4xl md:text-5xl font-semibold opacity-60">{bigNumberSuffix}</span>}
                </div>
              </div>

              {/* Content */}
              {hasImage && contentMedia?.url ? (
                <div className="relative overflow-hidden md:rounded-none min-h-[240px]">
                  <Image src={contentMedia.url} alt={contentMedia.alt || ''} fill className="object-cover" sizes="50vw" />
                  {(contentHeading || contentText || contentSubtext) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                      {contentHeading && <h3 className="text-xl font-bold text-white mb-1"><BudouX>{contentHeading}</BudouX></h3>}
                      {contentText && <p className="text-sm text-white/80 leading-relaxed line-clamp-3"><BudouX>{contentText}</BudouX></p>}
                      {contentSubtext && <p className="text-xs text-white/50 mt-2"><BudouX>{contentSubtext}</BudouX></p>}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col justify-center px-6 py-10 md:py-16 space-y-4">
                  {contentHeading && <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}><BudouX>{contentHeading}</BudouX></h3>}
                  {contentText && <p className={`text-[14px] leading-relaxed ${dark ? 'text-white/70' : 'text-slate-500'}`}><BudouX>{contentText}</BudouX></p>}
                  {contentSubtext && <p className={`text-xs ${dark ? 'text-white/40' : 'text-gray-400'}`}><BudouX>{contentSubtext}</BudouX></p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
