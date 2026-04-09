import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { BudouX } from '@/components/BudouX'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import { PortfolioCard } from '@/components/portfolio/PortfolioCard'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import { sanitizeUrl } from '@/utilities/sanitizeUrl'
import type { Media } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const portfolios = await payload.find({
    collection: 'portfolios',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return portfolios.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function PortfolioDetailPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const project = await queryPortfolioBySlug({ slug })

  if (!project) notFound()

  const featuredImage =
    typeof project.featuredImage === 'object' ? (project.featuredImage as Media) : null
  const publishedDate = project.publishedAt
    ? new Date(project.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const gallery = project.gallery || []
  const technologies = project.technologies || []
  const projectUrlDisplay = project.projectUrl
    ? project.projectUrl.replace(/^https?:\/\//, '')
    : null

  const galleryGridClass =
    gallery.length === 1
      ? 'grid-cols-1'
      : gallery.length === 3
        ? 'grid-cols-1 md:grid-cols-3'
        : 'grid-cols-1 md:grid-cols-2'

  const relatedProjects = await queryRelatedProjects({ currentId: project.id })

  return (
    <article className="pt-16">
      <div className="-mt-16">
        <HeroHeaderBlock
          size="short"
          title={project.title}
          image={featuredImage ?? null}
          headingAlignment="left"
        />
      </div>

      {/* Project info section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-[var(--brand-alt)] underline decoration-1 underline-offset-4 transition-colors duration-200 text-sm mb-8"
          >
            ← ポートフォリオ一覧
          </Link>

          {/* Client + completion date row */}
          {(project.client || publishedDate) && (
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {project.client && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-600">クライアント</span>
                  <span className="text-sm text-slate-900">
                    <BudouX>{project.client}</BudouX>
                  </span>
                </div>
              )}
              {project.client && publishedDate && (
                <span className="text-slate-300" aria-hidden="true">|</span>
              )}
              {publishedDate && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-600">完了日</span>
                  <time
                    className="text-sm text-slate-900"
                    dateTime={project.publishedAt ?? undefined}
                  >
                    {publishedDate}
                  </time>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {project.description && (
            <div className="text-base md:text-[1.0625rem] leading-8 md:leading-9 text-slate-800 mb-10">
              <RichText data={project.description} enableGutter={false} />
            </div>
          )}

          {/* Project gallery */}
          {gallery.length > 0 && (
            <div className="mb-10">
              <h2 className="text-sm font-semibold text-slate-600 tracking-wider mb-4">
                プロジェクトギャラリー
              </h2>
              <div className={`grid ${galleryGridClass} gap-4`}>
                {gallery.map((item, index) => {
                  const galleryImage =
                    typeof item.image === 'object' ? (item.image as Media) : null
                  if (!galleryImage?.url) return null
                  return (
                    <figure
                      key={item.id || index}
                      className="rounded-xl overflow-hidden border border-slate-200"
                    >
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={galleryImage.url}
                          alt={galleryImage.alt || item.caption || project.title}
                          fill
                          className="object-cover"
                          sizes={
                            gallery.length === 1
                              ? '(max-width: 768px) 100vw, 896px'
                              : gallery.length === 3
                                ? '(max-width: 768px) 100vw, 33vw'
                                : '(max-width: 768px) 100vw, 50vw'
                          }
                        />
                      </div>
                      {item.caption && (
                        <figcaption className="bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800">
                          <BudouX>{item.caption}</BudouX>
                        </figcaption>
                      )}
                    </figure>
                  )
                })}
              </div>
            </div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-slate-600 tracking-wider mb-3">
                使用技術
              </h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, i) => (
                  <span
                    key={tech.id || i}
                    className="text-sm px-3 py-1 rounded-full border border-slate-200 text-slate-700 hover:border-[var(--brand-alt)] hover:text-[var(--brand-alt)] hover:bg-[var(--brand-alt)]/10 transition-colors duration-200"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project URL */}
          {project.projectUrl && projectUrlDisplay && (
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h2 className="text-sm font-semibold text-slate-600 tracking-wider mb-4">
                プロジェクトリンク
              </h2>
              <Link
                href={sanitizeUrl(project.projectUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-alt hover:text-brand-primary transition-colors duration-200 text-sm"
              >
                {projectUrlDisplay} を見る
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-slate-900 mb-10 md:mb-12">
              その他のプロジェクト
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relProject) => (
                <PortfolioCard key={relProject.id} project={relProject} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA section — light bg since footer is dark */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-4">
            <BudouX>同様のプロジェクトをお考えですか？</BudouX>
          </h2>
          <p className="text-base md:text-lg leading-8 text-slate-600 mb-8">
            <BudouX>Web開発やデジタル戦略に関するご相談をお受けしています。</BudouX>
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-primary text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-brand-alt hover:text-brand-primary transition-colors duration-200 text-base"
          >
            お問い合わせページへ
          </Link>
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const project = await queryPortfolioBySlug({ slug })

  if (!project) return { title: 'プロジェクトが見つかりません' }

  return generateMeta({ doc: project })
}

const queryPortfolioBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'portfolios',
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
  })

  return result.docs?.[0] || null
})

const queryRelatedProjects = cache(async ({ currentId }: { currentId: number }) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'portfolios',
    draft: false,
    depth: 1,
    limit: 2,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' },
      id: { not_equals: currentId },
    },
    sort: '-publishedAt',
  })
  return result.docs
})
