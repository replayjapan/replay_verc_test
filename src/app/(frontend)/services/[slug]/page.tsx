import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { ArrowLeft } from 'lucide-react'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import RichText from '@/components/RichText'
import { BudouX } from '@/components/BudouX'
import type { Media, ServiceCategory } from '@/payload-types'

type Deliverable = {
  title: string
  description?: string | null
  id?: string | null
}

type AuthorityItem = {
  label: string
  value: string
  id?: string | null
}

export async function generateStaticParams() {
  // Skipped to avoid Vercel build timeout (Neon Postgres in Singapore, build server in D.C.)
  // const payload = await getPayload({ config: configPromise })
  // const services = await payload.find({
  //   collection: 'services',
  //   limit: 1000,
  //   overrideAccess: false,
  //   pagination: false,
  //   select: {
  //     slug: true,
  //   },
  // })
  //
  // return services.docs.map(({ slug }) => ({ slug }))
  return []
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ServiceDetailPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const service = await queryServiceBySlug({ slug })

  if (!service) notFound()

  const category = typeof service.category === 'object' ? (service.category as ServiceCategory) : null
  const heroImage = typeof service.featuredImage === 'object' ? (service.featuredImage as Media) : null
  const deliverables = (service.deliverables ?? []) as Deliverable[]
  const authorityItems = (service.authoritySection?.items ?? []) as AuthorityItem[]
  const hasAuthority = service.authoritySection?.heading || authorityItems.length > 0

  // JSON-LD structured data
  const siteUrl = getServerSideURL()
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    ...(service.listingDescription ? { description: service.listingDescription } : {}),
    provider: {
      '@type': 'Organization',
      name: 'rePlay Domains',
      url: siteUrl,
    },
  }

  return (
    <article className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Short hero header with back nav */}
      <div className="-mt-16">
        <HeroHeaderBlock
          size="short"
          title={service.title}
          subtitle={category?.name ?? undefined}
          image={heroImage}
          headingAlignment="left"
          childrenPosition="above"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-brand-alt transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            サービス一覧に戻る
          </Link>
        </HeroHeaderBlock>
      </div>

      {/* Editorial explanation — reading section */}
      {service.description && (
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <RichText
              className="max-w-none prose-lg prose-slate [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-8 [&_p]:text-slate-900 [&_p+p]:mt-6"
              data={service.description}
              enableGutter={false}
            />
          </div>
        </section>
      )}

      {/* Dark authority section — unique per service */}
      {hasAuthority && (
        <section className="bg-brand-primary text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6">
            {service.authoritySection?.heading && (
              <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.025em] leading-[1.05] mb-8">
                <BudouX>{service.authoritySection.heading}</BudouX>
              </h2>
            )}

            {service.authoritySection?.body && (
              <p className="text-base leading-7 text-slate-200 mb-6">
                <BudouX>{service.authoritySection.body}</BudouX>
              </p>
            )}

            {authorityItems.length > 0 && (
              <div className={`grid gap-6 md:gap-8 ${
                authorityItems.length <= 3 ? 'grid-cols-1 md:grid-cols-3' :
                authorityItems.length === 4 ? 'grid-cols-2 md:grid-cols-4' :
                'grid-cols-2 md:grid-cols-3'
              }`}>
                {authorityItems.map((item) => {
                  // Check if label is a step number (01, 02, etc.) or a short stat
                  const isStepNumber = /^\d{2}$/.test(item.label)
                  const isShortStat = item.label.length <= 4 && !isStepNumber

                  // Split value into title + description if it contains " — "
                  const dashIndex = item.value.indexOf(' — ')
                  const hasDescription = dashIndex > -1
                  const itemTitle = hasDescription ? item.value.slice(0, dashIndex) : null
                  const itemDesc = hasDescription ? item.value.slice(dashIndex + 3) : item.value

                  return (
                    <div key={item.id ?? item.label}>
                      {isStepNumber && (
                        <span className="text-brand-alt text-sm font-semibold tracking-wide">
                          {item.label}
                        </span>
                      )}
                      {isShortStat && (
                        <span className="text-brand-alt text-3xl md:text-4xl font-medium">
                          {item.label}
                        </span>
                      )}
                      {!isStepNumber && !isShortStat && (
                        <span className="text-brand-alt text-2xl md:text-3xl font-medium">
                          {item.label}
                        </span>
                      )}
                      {itemTitle && (
                        <h3 className="text-lg font-medium mt-2 mb-2">
                          <BudouX>{itemTitle}</BudouX>
                        </h3>
                      )}
                      <p className={`text-sm leading-6 text-slate-300 ${isStepNumber ? 'mt-2' : 'mt-2'}`}>
                        <BudouX>{itemDesc}</BudouX>
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Deliverables list — border-left accent */}
      {deliverables.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="border-l-4 border-brand-alt pl-6 md:pl-8">
              <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.02em] text-slate-900 mb-6">
                <BudouX>主な対応領域</BudouX>
              </h2>
              <dl className="space-y-5">
                {deliverables.map((item) => (
                  <div key={item.id ?? item.title}>
                    <dt className="font-medium text-slate-900">
                      <BudouX>{item.title}</BudouX>
                    </dt>
                    {item.description && (
                      <dd className="text-sm text-slate-700 mt-1">
                        <BudouX>{item.description}</BudouX>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* CTA section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.02em] text-slate-900 mb-4">
            <BudouX>{service.ctaHeading || 'サービスについてのご相談'}</BudouX>
          </h2>
          {service.ctaText && (
            <p className="text-base leading-7 text-slate-600 mb-8 max-w-xl mx-auto">
              <BudouX>{service.ctaText}</BudouX>
            </p>
          )}
          <Link
            href="/contact"
            className="inline-block bg-brand-primary text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-brand-alt hover:text-brand-primary transition-colors duration-200 text-base"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const service = await queryServiceBySlug({ slug })

  if (!service) return { title: 'サービスが見つかりません' }

  return generateMeta({ doc: service })
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    limit: 1,
    depth: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
