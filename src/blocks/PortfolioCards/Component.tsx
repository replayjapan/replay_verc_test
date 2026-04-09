import React from 'react'
import Link from 'next/link'
import { BudouX } from '@/components/BudouX'
import { sanitizeUrl } from '@/utilities/sanitizeUrl'

type Project = {
  domain: string
  url?: string | null
  description?: string | null
  id?: string | null
}

type PortfolioCardsProps = {
  heading?: string | null
  headingAlignment?: string | null
  description?: string | null
  projects?: Project[] | null
  blockType?: 'portfolioCards'
  blockName?: string | null
}

export const PortfolioCardsBlock: React.FC<PortfolioCardsProps> = ({
  heading,
  description,
  projects,
}) => {
  if (!projects || projects.length === 0) return null

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-3xl">
            {heading && (
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-slate-900">
                <BudouX>{heading}</BudouX>
              </h2>
            )}
            {description && (
              <p className="mt-6 text-base md:text-lg leading-8 text-slate-700">
                <BudouX>{description}</BudouX>
              </p>
            )}
          </div>

          <div className="space-y-8">
            {projects.map((project, i) => (
              <div key={project.id ?? i} className="bg-slate-50 p-6">
                <h3 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] leading-[1.15] text-slate-900">
                  {project.url ? (
                    <Link
                      href={sanitizeUrl(project.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--brand-primary)] underline decoration-1 underline-offset-4 hover:text-[var(--brand-alt)] transition-colors duration-200"
                    >
                      {project.domain}
                    </Link>
                  ) : (
                    project.domain
                  )}
                </h3>
                {project.description && (
                  <p className="mt-4 text-base leading-7 text-slate-700">
                    <BudouX>{project.description}</BudouX>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
