import React from 'react'
import { BudouX } from '@/components/BudouX'

type Fact = {
  label: string
  value: string
  id?: string | null
}

type CompanyFactsProps = {
  heading?: string | null
  headingAlignment?: string | null
  facts?: Fact[] | null
  blockType?: 'companyFacts'
  blockName?: string | null
}

export const CompanyFactsBlock: React.FC<CompanyFactsProps> = ({
  heading,
  facts,
}) => {
  if (!facts || facts.length === 0) return null

  return (
    <section className="bg-[var(--brand-primary)] text-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6">
        {heading && (
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] mb-10 text-center">
            <span className="text-[var(--brand-alt)]">
              <BudouX>{heading}</BudouX>
            </span>
          </h2>
        )}
        <dl className="divide-y divide-white/10 border-t border-b border-white/10">
          {facts.map((fact, i) => {
            const lines = fact.value.split('\n').filter(Boolean)
            const isList = lines.length > 1 && lines.some((l) => l.startsWith('•'))

            return (
              <div key={fact.id ?? i} className="flex flex-col sm:flex-row py-5 sm:py-4">
                <dt className="text-sm font-semibold text-slate-300 sm:w-40 md:w-48 flex-none mb-1 sm:mb-0 sm:py-1">
                  {fact.label}
                </dt>
                <dd className="text-base text-white/88 leading-7 sm:py-1">
                  {isList ? (
                    <ul className="space-y-1">
                      {lines.map((line, li) => (
                        <li key={li} className="flex items-start gap-2">
                          <span className="mt-2.5 block h-1 w-1 rounded-full bg-[var(--brand-alt)] flex-none" />
                          {line.replace(/^•\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    lines.map((line, li) => (
                      <React.Fragment key={li}>
                        {li > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
