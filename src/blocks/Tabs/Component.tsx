'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Shield,
  Zap,
  Star,
  Globe,
  Heart,
  Bell,
  type LucideIcon,
} from 'lucide-react'
import RichText from '@/components/RichText'
import { BudouXClient } from '@/components/BudouX/client'

import type { TabsBlock as TabsBlockProps, Media } from '@/payload-types'

type TabStyle = NonNullable<TabsBlockProps['tabStyle']>
type Background = NonNullable<TabsBlockProps['background']>
type HeadingAlignment = NonNullable<TabsBlockProps['headingAlignment']>

const iconMap: Record<string, LucideIcon> = {
  Shield, Zap, Star, Globe, Heart, Bell,
}

const bgClasses: Record<Background, string> = {
  transparent: '',
  'light-gray': 'bg-slate-50',
  'brand-primary': 'bg-[var(--brand-primary)]',
  'brand-alt': 'bg-[var(--brand-alt)]',
}

const headingAlignClasses: Record<HeadingAlignment, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const colorSchemes: Record<Background, {
  heading: string; tabDefault: string; tabHover: string; content: string; imageBorder: string
  underlineActive: string; underlineBar: string; underlineBorder: string
  boxedActive: string; boxedActiveBg: string; boxedInactiveBorder: string
  pillActive: string; pillActiveBg: string; pillInactive: string
}> = {
  transparent: {
    heading: 'text-slate-900',
    tabDefault: 'text-slate-600',
    tabHover: 'hover:text-slate-700',
    content: 'text-slate-700',
    imageBorder: 'border-slate-200',
    underlineActive: 'text-slate-900',
    underlineBar: 'bg-[var(--brand-alt)]',
    underlineBorder: 'border-slate-200',
    boxedActive: 'text-slate-900',
    boxedActiveBg: 'bg-white border-slate-200 border-b-white',
    boxedInactiveBorder: 'border-slate-100',
    pillActive: 'text-white',
    pillActiveBg: 'bg-[var(--brand-primary)]',
    pillInactive: 'text-slate-700',
  },
  'light-gray': {
    heading: 'text-slate-900',
    tabDefault: 'text-slate-600',
    tabHover: 'hover:text-slate-700',
    content: 'text-slate-700',
    imageBorder: 'border-slate-200',
    underlineActive: 'text-slate-900',
    underlineBar: 'bg-[var(--brand-alt)]',
    underlineBorder: 'border-slate-300',
    boxedActive: 'text-slate-900',
    boxedActiveBg: 'bg-slate-50 border-slate-300 border-b-gray-50',
    boxedInactiveBorder: 'border-slate-200',
    pillActive: 'text-white',
    pillActiveBg: 'bg-[var(--brand-primary)]',
    pillInactive: 'text-slate-700',
  },
  'brand-primary': {
    heading: 'text-white',
    tabDefault: 'text-white/50',
    tabHover: 'hover:text-white/70',
    content: 'text-white/80',
    imageBorder: 'border-white/20',
    underlineActive: 'text-white',
    underlineBar: 'bg-[var(--brand-alt)]',
    underlineBorder: 'border-white/20',
    boxedActive: 'text-white',
    boxedActiveBg: 'bg-white/10 border-white/30 border-b-transparent',
    boxedInactiveBorder: 'border-transparent',
    pillActive: 'text-[var(--brand-primary)]',
    pillActiveBg: 'bg-white',
    pillInactive: 'text-white/60',
  },
  'brand-alt': {
    heading: 'text-slate-900',
    tabDefault: 'text-slate-700/60',
    tabHover: 'hover:text-slate-900',
    content: 'text-slate-700',
    imageBorder: 'border-gray-900/10',
    underlineActive: 'text-slate-900',
    underlineBar: 'bg-[var(--brand-primary)]',
    underlineBorder: 'border-gray-900/15',
    boxedActive: 'text-slate-900',
    boxedActiveBg: 'bg-[var(--brand-alt)] border-gray-900/20 border-b-[var(--brand-alt)]',
    boxedInactiveBorder: 'border-transparent',
    pillActive: 'text-white',
    pillActiveBg: 'bg-[var(--brand-primary)]',
    pillInactive: 'text-slate-700',
  },
}

function getTabClasses(
  style: TabStyle,
  isActive: boolean,
  colors: typeof colorSchemes['transparent'],
): string {
  const base = 'relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-200'

  if (style === 'underline') {
    return `${base} ${isActive ? colors.underlineActive : `${colors.tabDefault} ${colors.tabHover}`}`
  }

  if (style === 'boxed') {
    return `${base} border rounded-t-lg -mb-px ${isActive ? `${colors.boxedActive} ${colors.boxedActiveBg}` : `${colors.tabDefault} ${colors.boxedInactiveBorder} ${colors.tabHover}`}`
  }

  return `${base} rounded-full ${isActive ? `${colors.pillActive} ${colors.pillActiveBg}` : `${colors.pillInactive} ${colors.tabHover}`}`
}

const getSpacingClass = (density?: string | null) => {
  switch (density) {
    case 'compact': return 'py-6 md:py-8'
    case 'spacious': return 'py-16 md:py-24'
    default: return ''
  }
}

export const TabsBlock: React.FC<TabsBlockProps> = ({
  sectionHeading,
  headingAlignment: headingAlignmentProp,
  tabAlignment: tabAlignmentProp,
  tabStyle: tabStyleProp,
  background: backgroundProp,
  tabs,
  showTopDivider,
  spacingDensity,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!tabs || tabs.length < 2) return null

  const background = (backgroundProp || 'transparent') as Background
  const tabStyle = (tabStyleProp || 'underline') as TabStyle
  const headingAlignment = (headingAlignmentProp || 'center') as HeadingAlignment
  const tabAlignment = tabAlignmentProp || 'left'

  const bg = bgClasses[background]
  const colors = colorSchemes[background]
  const alignClass = tabAlignment === 'center' ? 'justify-center' : 'justify-start'
  const spacingClass = getSpacingClass(spacingDensity) || 'py-12'

  return (
    <div className={`${bg} ${spacingClass}`}>
      {showTopDivider && <hr className="border-t border-slate-200" />}
      <div className="max-w-3xl mx-auto px-6">
        {sectionHeading && (
          <h2 className={`text-2xl font-bold mb-8 ${colors.heading} ${headingAlignClasses[headingAlignment]}`}>
            <BudouXClient>{sectionHeading}</BudouXClient>
          </h2>
        )}

        <div className="relative">
          <div
            className={`flex ${alignClass} gap-1 overflow-x-auto ${
              tabStyle === 'boxed' ? `border-b ${colors.underlineBorder}` : ''
            } ${tabStyle === 'pill' ? 'gap-2 p-1 rounded-full bg-gray-100 w-fit' : ''}`}
            style={{ scrollbarWidth: 'none' }}
          >
            {tabs.map((tab, i) => {
              const IconComponent = tab.tabIcon ? iconMap[tab.tabIcon] : null
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={getTabClasses(tabStyle, i === activeIndex, colors)}
                  role="tab"
                  aria-selected={i === activeIndex}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" strokeWidth={2} />}
                  <BudouXClient>{tab.tabLabel}</BudouXClient>
                  {tabStyle === 'underline' && i === activeIndex && (
                    <span className={`absolute bottom-0 left-4 right-4 h-[3px] rounded-full ${colors.underlineBar}`} />
                  )}
                </button>
              )
            })}
          </div>

          {tabStyle === 'underline' && (
            <div className={`absolute bottom-0 left-0 right-0 h-px ${colors.underlineBorder} border-t`} />
          )}
        </div>

        <div className="mt-8 rounded-xl border border-slate-100 bg-white p-6 md:p-8">
          {tabs.map((tab, i) => {
            const tabImage = tab.tabImage as Media | undefined
            return (
              <div
                key={i}
                role="tabpanel"
                className={`transition-opacity duration-200 ${
                  i === activeIndex ? 'opacity-100' : 'hidden opacity-0'
                }`}
              >
                {tabImage?.url ? (
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className={`flex-1 text-[15px] leading-relaxed ${colors.content} [&_p]:m-0`}>
                      <RichText data={tab.tabContent} enableGutter={false} enableProse={false} />
                    </div>
                    <div className="md:w-2/5 shrink-0">
                      <Image
                        src={tabImage.url}
                        alt={tabImage.alt || tab.tabLabel}
                        width={tabImage.width || 800}
                        height={tabImage.height || 600}
                        className={`w-full rounded-lg border ${colors.imageBorder} object-cover aspect-[4/3]`}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`text-[15px] leading-relaxed ${colors.content} [&_p]:m-0`}>
                    <RichText data={tab.tabContent} enableGutter={false} enableProse={false} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
