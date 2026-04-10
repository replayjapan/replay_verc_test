import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import { BudouX } from '@/components/BudouX'
import { TakeawayCallout } from '@/components/shared/TakeawayCallout'
import type { Media } from '@/payload-types'

const articleTypeLabels: Record<string, string> = {
  article: '記事',
  'case-study': 'ケーススタディ',
  whitepaper: 'ホワイトペーパー',
  documentation: 'ドキュメント',
  research: 'リサーチ',
}

export async function generateStaticParams() {
  // Skipped to avoid Vercel build timeout (Neon Postgres in Singapore, build server in D.C.)
  // const payload = await getPayload({ config: configPromise })
  // const articles = await payload.find({
  //   collection: 'articles',
  //   draft: false,
  //   limit: 1000,
  //   overrideAccess: false,
  //   pagination: false,
  //   select: {
  //     slug: true,
  //   },
  // })
  //
  // return articles.docs.map(({ slug }) => ({ slug }))
  return []
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ArticleDetailPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const article = await queryArticleBySlug({ slug })

  if (!article) notFound()

  const image = typeof article.featuredImage === 'object' ? (article.featuredImage as Media) : null
  const publishedAt = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null
  const typeLabel = articleTypeLabels[article.articleType] || article.articleType

  const siteUrl = getServerSideURL()
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    ...(article.author ? { author: { '@type': 'Person', name: article.author } } : {}),
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    ...(image?.url ? { image: `${siteUrl}${image.url}` } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'rePlay Domains',
      url: siteUrl,
    },
  }

  // Fetch related articles (same articleType, excluding current)
  const payload = await getPayload({ config: configPromise })
  const relatedResult = await payload.find({
    collection: 'articles',
    limit: 2,
    where: {
      slug: { not_equals: slug },
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
  })
  const relatedArticles = relatedResult.docs

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Article reading layout — more breathing room than blog */}
      <div className="max-w-3xl mx-auto px-6 pb-16 md:pb-24">
        {/* Back link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1 text-slate-600 hover:text-[var(--brand-alt)] underline decoration-1 underline-offset-4 transition-colors duration-200 text-sm mt-8"
        >
          &larr; <BudouX>記事一覧</BudouX>
        </Link>

        {/* Title — larger than blog */}
        <h1 className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-slate-900 mt-8">
          <BudouX>{article.title}</BudouX>
        </h1>

        {/* Metadata band */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <span className="text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--brand-alt)]/10 text-[var(--brand-alt)]">
            <BudouX>{typeLabel}</BudouX>
          </span>
          {article.readingTime && (
            <span className="text-sm text-slate-600">
              <BudouX>{`${article.readingTime}分で読めます`}</BudouX>
            </span>
          )}
          <span className="text-slate-300">|</span>
          {publishedAt && (
            <time className="text-sm text-slate-600">{publishedAt}</time>
          )}
          {article.author && (
            <>
              <span className="text-slate-300">|</span>
              <span className="text-sm text-slate-600">{article.author}</span>
            </>
          )}
        </div>

        {/* Featured image */}
        {image?.url && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mt-10">
            <Image
              src={image.url}
              alt={image.alt || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
              priority
            />
          </div>
        )}

        {/* Takeaway callout — below image, above body */}
        <TakeawayCallout
          heading={article.takeawayHeading}
          takeaways={article.takeaways}
        />

        {/* Body content — more breathing room than blog */}
        <div className="mt-12 text-[1.0625rem] md:text-lg leading-9 md:leading-10 text-slate-800">
          <RichText data={article.content} enableGutter={false} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-14 pt-8 border-t border-slate-200">
            <h2 className="text-sm font-semibold text-slate-600 tracking-wider mb-3">
              タグ
            </h2>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((item, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:border-[var(--brand-alt)] hover:text-[var(--brand-alt)] hover:bg-[var(--brand-alt)]/10 transition-colors duration-200"
                >
                  {item.tag && <BudouX>{item.tag}</BudouX>}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related articles — vertical list */}
      {relatedArticles.length > 0 && (
        <section className="bg-white pb-16 md:pb-24 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24">
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-8">
              関連記事
            </h2>
            <div>
              {relatedArticles.map((relArticle) => {
                const relImage = typeof relArticle.featuredImage === 'object' ? (relArticle.featuredImage as Media) : null
                const relDate = relArticle.publishedAt
                  ? new Date(relArticle.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
                  : null
                const relTypeLabel = articleTypeLabels[relArticle.articleType] || relArticle.articleType

                return (
                  <Link
                    key={relArticle.id}
                    href={`/articles/${relArticle.slug}`}
                    className="group block border-b border-slate-200 py-6 md:py-8 first:pt-0 last:border-b-0"
                  >
                    <div className="flex gap-5 md:gap-8">
                      {relImage?.url && (
                        <div className="relative w-[120px] h-[80px] md:w-[200px] md:h-[130px] flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={relImage.url}
                            alt={relImage.alt || relArticle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 120px, 200px"
                          />
                        </div>
                      )}
                      <div className="flex flex-col justify-center min-w-0">
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                          <span className="text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--brand-alt)]/10 text-[var(--brand-alt)]">
                            <BudouX>{relTypeLabel}</BudouX>
                          </span>
                          {relDate && (
                            <time className="text-sm text-slate-600">{relDate}</time>
                          )}
                        </div>
                        <h3 className="mt-2 text-lg md:text-xl font-semibold text-slate-900 group-hover:text-[var(--brand-alt)] transition-colors duration-200 leading-snug">
                          <BudouX>{relArticle.title}</BudouX>
                        </h3>
                        {relArticle.excerpt && (
                          <p className="hidden md:block mt-2 text-base text-slate-600 leading-7 line-clamp-2">
                            <BudouX>{relArticle.excerpt}</BudouX>
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA section — light bg since footer is dark */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-4">
            <BudouX>デジタル戦略の実現をサポートします</BudouX>
          </h2>
          <p className="text-base md:text-lg leading-8 text-slate-600 mb-8">
            <BudouX>ドメイン戦略やCMS導入について、具体的なご相談をお受けしています。</BudouX>
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
  const article = await queryArticleBySlug({ slug })

  if (!article) return { title: '記事が見つかりません' }

  return generateMeta({ doc: article })
}

const queryArticleBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'articles',
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
  })

  return result.docs?.[0] || null
})
