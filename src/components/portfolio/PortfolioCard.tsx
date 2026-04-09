import Image from 'next/image'
import Link from 'next/link'

import { BudouX } from '@/components/BudouX'
import type { Media, Portfolio } from '@/payload-types'

interface PortfolioCardProps {
  project: Portfolio
}

/**
 * Reusable portfolio card.
 * Used on the portfolio listing grid and the portfolio item page related-projects grid.
 */
export function PortfolioCard({ project }: PortfolioCardProps) {
  const image = typeof project.featuredImage === 'object' ? (project.featuredImage as Media) : null
  const publishedDate = project.publishedAt
    ? new Date(project.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const technologies = project.technologies || []
  const visibleTech = technologies.slice(0, 4)
  const overflowCount = technologies.length - visibleTech.length

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block border border-slate-200 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--brand-alt)] transition-all duration-200"
    >
      {/* Featured image */}
      <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[#2a3660]" />
        )}
      </div>

      {/* Card content */}
      <div className="p-5">
        {project.client && (
          <span className="block text-[11px] font-semibold tracking-wide text-slate-600">
            <BudouX>{project.client}</BudouX>
          </span>
        )}
        <h3 className="mt-2 text-lg font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-[var(--brand-alt)] transition-colors duration-200">
          <BudouX>{project.title}</BudouX>
        </h3>
        {project.summary && (
          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
            <BudouX>{project.summary}</BudouX>
          </p>
        )}

        {visibleTech.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {visibleTech.map((tech, i) => (
              <span
                key={tech.id || i}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600"
              >
                {tech.name}
              </span>
            ))}
            {overflowCount > 0 && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                +{overflowCount}
              </span>
            )}
          </div>
        )}

        {publishedDate && (
          <time
            className="block mt-3 text-sm text-slate-600"
            dateTime={project.publishedAt ?? undefined}
          >
            {publishedDate}
          </time>
        )}
      </div>
    </Link>
  )
}
