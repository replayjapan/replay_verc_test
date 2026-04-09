'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import RichText from '@/components/RichText'

import type { AccordionBlock as AccordionBlockProps } from '@/payload-types'
import { BudouXClient } from '@/components/BudouX/client'
import { alignmentClass } from '@/utilities/alignmentClass'

type Background = NonNullable<AccordionBlockProps['background']>

interface CategoryGroup {
  category: string | null
  items: { item: NonNullable<AccordionBlockProps['items']>[number]; globalIndex: number }[]
}

function groupByCategory(items: NonNullable<AccordionBlockProps['items']>): CategoryGroup[] {
  const hasAnyCategory = items.some((item) => item.category)
  if (!hasAnyCategory) {
    return [{ category: null, items: items.map((item, i) => ({ item, globalIndex: i })) }]
  }

  const groups: CategoryGroup[] = []
  let currentCategory: string | null = null
  let currentGroup: CategoryGroup | null = null

  items.forEach((item, i) => {
    const cat = item.category || null
    if (cat !== currentCategory || !currentGroup) {
      currentGroup = { category: cat, items: [] }
      groups.push(currentGroup)
      currentCategory = cat
    }
    currentGroup.items.push({ item, globalIndex: i })
  })

  return groups
}

const bgClasses: Record<Background, string> = {
  transparent: '',
  'light-gray': 'bg-slate-50',
  'brand-primary': 'bg-[var(--brand-primary)]',
  'brand-alt': 'bg-[var(--brand-alt)]',
}

const textClasses: Record<Background, {
  heading: string; subtitle: string; itemTitle: string; content: string
  border: string; chevron: string; categoryLabel: string; categoryRule: string; categoryAccent: string
}> = {
  transparent: {
    heading: 'text-slate-900',
    subtitle: 'text-slate-600',
    itemTitle: 'text-slate-900',
    content: 'text-slate-700',
    border: 'border-slate-200',
    chevron: 'text-slate-500',
    categoryLabel: 'text-slate-600',
    categoryRule: 'border-slate-200',
    categoryAccent: 'bg-[var(--brand-alt)]',
  },
  'light-gray': {
    heading: 'text-slate-900',
    subtitle: 'text-slate-600',
    itemTitle: 'text-slate-900',
    content: 'text-slate-700',
    border: 'border-slate-200',
    chevron: 'text-slate-500',
    categoryLabel: 'text-slate-600',
    categoryRule: 'border-slate-300',
    categoryAccent: 'bg-[var(--brand-alt)]',
  },
  'brand-primary': {
    heading: 'text-white',
    subtitle: 'text-white/70',
    itemTitle: 'text-white',
    content: 'text-white/80',
    border: 'border-white/20',
    chevron: 'text-white/60',
    categoryLabel: 'text-white/60',
    categoryRule: 'border-white/15',
    categoryAccent: 'bg-[var(--brand-alt)]',
  },
  'brand-alt': {
    heading: 'text-slate-900',
    subtitle: 'text-slate-700',
    itemTitle: 'text-slate-900',
    content: 'text-slate-700',
    border: 'border-slate-900/15',
    chevron: 'text-slate-700',
    categoryLabel: 'text-slate-700',
    categoryRule: 'border-slate-900/10',
    categoryAccent: 'bg-[var(--brand-primary)]',
  },
}

function AccordionItemPanel({
  title,
  content,
  isOpen,
  onToggle,
  colors,
}: {
  title: string
  content: NonNullable<AccordionBlockProps['items']>[number]['content']
  isOpen: boolean
  onToggle: () => void
  colors: typeof textClasses['transparent']
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<string>(isOpen ? 'none' : '0px')

  useEffect(() => {
    if (isOpen) {
      const el = contentRef.current
      if (el) {
        setMaxHeight(`${el.scrollHeight}px`)
        const timer = setTimeout(() => setMaxHeight('none'), 300)
        return () => clearTimeout(timer)
      }
    } else {
      const el = contentRef.current
      if (el) {
        setMaxHeight(`${el.scrollHeight}px`)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setMaxHeight('0px')
          })
        })
      }
    }
  }, [isOpen])

  return (
    <div className={`border-b ${colors.border} last:border-b-0`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 px-1 text-left group"
        aria-expanded={isOpen}
        role="button"
      >
        <span className={`font-semibold text-lg leading-snug ${colors.itemTitle} group-hover:opacity-80 transition-opacity`}>
          <BudouXClient>{title}</BudouXClient>
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 ${colors.chevron} transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        ref={contentRef}
        role="region"
        style={{ maxHeight, overflow: 'hidden', transition: maxHeight === 'none' ? 'none' : 'max-height 300ms ease-in-out' }}
      >
        <div className={`pb-4 px-1 text-[14px] leading-relaxed ${colors.content} [&_p]:m-0`}>
          <RichText data={content} enableGutter={false} enableProse={false} />
        </div>
      </div>
    </div>
  )
}

const getSpacingClass = (density?: string | null) => {
  switch (density) {
    case 'compact': return 'py-6 md:py-8'
    case 'spacious': return 'py-16 md:py-24'
    default: return ''
  }
}

export const AccordionBlock: React.FC<AccordionBlockProps> = ({
  sectionHeading,
  sectionSubtitle,
  headingAlignment,
  allowMultipleOpen,
  defaultFirstOpen,
  background: backgroundProp,
  items,
  showTopDivider,
  spacingDensity,
}) => {
  const background = (backgroundProp || 'transparent') as Background

  const getInitialOpen = useCallback((): Set<number> => {
    const initial = new Set<number>()
    if (items) {
      items.forEach((item, i) => {
        if (item.defaultOpen) initial.add(i)
      })
    }
    if (defaultFirstOpen && initial.size === 0) {
      initial.add(0)
    }
    return initial
  }, [items, defaultFirstOpen])

  const [openItems, setOpenItems] = useState<Set<number>>(getInitialOpen)

  if (!items || items.length === 0) return null

  const handleToggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        if (!allowMultipleOpen) {
          next.clear()
        }
        next.add(index)
      }
      return next
    })
  }

  const bg = bgClasses[background]
  const colors = textClasses[background]
  const spacingClass = getSpacingClass(spacingDensity) || 'py-12'

  return (
    <div className={`${bg} ${spacingClass}`}>
      {showTopDivider && <hr className="border-t border-slate-200" />}
      <div className="max-w-3xl mx-auto px-6">
        {sectionHeading && (
          <div className={`mb-8 ${alignmentClass(headingAlignment)}`}>
            <h2 className={`text-2xl font-bold ${colors.heading}`}><BudouXClient>{sectionHeading}</BudouXClient></h2>
            {sectionSubtitle && (
              <p className={`mt-2 text-sm ${colors.subtitle}`}><BudouXClient>{sectionSubtitle}</BudouXClient></p>
            )}
          </div>
        )}

        <div>
          {groupByCategory(items).map((group, gi) => (
            <div key={gi}>
              {group.category && (
                <div className={`flex items-center gap-3 ${gi > 0 ? 'mt-10' : ''} mb-2 px-1`}>
                  <span className={`w-0.75 h-5 rounded-sm ${colors.categoryAccent} shrink-0`} />
                  <span className={`text-[13px] font-semibold tracking-wide ${colors.categoryLabel} shrink-0`}>
                    <BudouXClient>{group.category}</BudouXClient>
                  </span>
                  <span className={`flex-1 border-t ${colors.categoryRule}`} />
                </div>
              )}
              <div className={`border-t ${colors.border}`}>
                {group.items.map(({ item, globalIndex }) => (
                  <AccordionItemPanel
                    key={globalIndex}
                    title={item.title}
                    content={item.content}
                    isOpen={openItems.has(globalIndex)}
                    onToggle={() => handleToggle(globalIndex)}
                    colors={colors}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
