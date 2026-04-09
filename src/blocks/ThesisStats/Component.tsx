import React from 'react'
import { BudouX } from '@/components/BudouX'

type Stat = { value: string; label: string; id?: string | null }

type ThesisStatsProps = {
  heading: string
  headingAlignment?: string | null
  body: string
  stats?: Stat[] | null
  blockType?: 'thesisStats'
  blockName?: string | null
}

export const ThesisStatsBlock: React.FC<ThesisStatsProps> = ({
  heading,
  body,
  stats,
}) => {
  return (
    <section className="bg-[var(--brand-primary)] py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-white mb-6">
          <BudouX>{heading}</BudouX>
        </h2>
        <p className="text-base md:text-lg leading-8 text-white/88 max-w-3xl">
          <BudouX>{body}</BudouX>
        </p>

        {stats && stats.length > 0 && (
          <div className={`grid ${({ 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' } as Record<number, string>)[stats.length] || 'grid-cols-3'} gap-8 border-t border-white/10 pt-10 mt-10`}>
            {stats.map((stat, i) => (
              <div key={stat.id ?? i}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
