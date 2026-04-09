import React from 'react'
import { BudouX } from '@/components/BudouX'

type CapabilityItem = {
  title: string
  description: string
  id?: string | null
}

type CapabilitiesGridProps = {
  heading: string
  headingAlignment?: string | null
  description?: string | null
  items?: CapabilityItem[] | null
  blockType?: 'capabilitiesGrid'
  blockName?: string | null
}

export const CapabilitiesGridBlock: React.FC<CapabilitiesGridProps> = ({
  heading,
  description,
  items,
}) => {
  if (!items || items.length === 0) return null

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
          {/* Left: Heading (2/5) */}
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-slate-900 mb-6">
              <BudouX>{heading}</BudouX>
            </h2>
            {description && (
              <p className="text-base md:text-lg leading-8 text-slate-700 max-w-sm">
                <BudouX>{description}</BudouX>
              </p>
            )}
          </div>

          {/* Right: Capabilities 2x2 grid (3/5) */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {items.map((item, i) => (
              <div key={item.id ?? i} className="pl-4 border-l-2 border-[var(--brand-alt)]">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-[-0.01em]">
                  <BudouX>{item.title}</BudouX>
                </h3>
                <p className="text-base leading-7 text-slate-700">
                  <BudouX>{item.description}</BudouX>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
