import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { generateListingMeta } from '@/utilities/generateListingMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import { BudouX } from '@/components/BudouX'
import type { ArticlesSetting, Media } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

const articleTypeLabels: Record<string, string> = {
  article: '記事',
  'case-study': 'ケーススタディ',
  whitepaper: 'ホワイトペーパー',
  documentation: 'ドキュメント',
  research: 'リサーチ',
}

export default async function ArticlesPage() {
  const payload = await getPayload({ config: configPromise })
  const settings = (await getCachedGlobal('articles-settings', 1)()) as ArticlesSetting

  const articles = await payload.find({
    collection: 'articles',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
  })

  const [featured, ...rest] = articles.docs
  const heroImage = typeof settings?.heroImage === 'object' ? (settings.heroImage as Media) : null

  return (
    <article className="pt-16">
      <div className="-mt-16">
        <HeroHeaderBlock
          size="medium"
          title={settings?.pageTitle || '記事'}
          subtitle={settings?.pageSubtitle || 'デジタル戦略、技術事例、業界分析に関する深掘りコンテンツをお届けします。'}
          image={heroImage ?? null}
          headingAlignment="left"
        />
      </div>

      {/* Editorial framing */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-base md:text-lg leading-8 text-slate-700">
              <BudouX>
                リプレイのナレッジライブラリーでは、プレミアムドメインの資産価値、最新のCMS技術、デジタルブランディング戦略など、実務に直結する知見を深掘りしてお届けしています。ケーススタディや技術解説を通じて、お客様のデジタル戦略にお役立てください。
              </BudouX>
            </p>
          </div>
        </div>
      </section>

      {articles.docs.length === 0 ? (
        <div className="text-center py-20 text-slate-600">
          <p className="text-lg"><BudouX>現在公開中の記事はありません。</BudouX></p>
        </div>
      ) : (
        <>
          {/* Featured article — staged on subtle background */}
          {featured && (() => {
            const featuredImage = typeof featured.featuredImage === 'object' ? (featured.featuredImage as Media) : null
            const featuredPublishedAt = featured.publishedAt
              ? new Date(featured.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
              : null
            const featuredTypeLabel = articleTypeLabels[featured.articleType] || featured.articleType

            return (
              <section className="bg-slate-50 py-12 md:py-16">
                <div className="max-w-6xl mx-auto px-6">
                  <Link
                    href={`/articles/${featured.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden border border-slate-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--brand-alt)] transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      {featuredImage?.url && (
                        <div className="relative aspect-[16/9] md:aspect-auto md:w-1/2 overflow-hidden">
                          <Image
                            src={featuredImage.url}
                            alt={featuredImage.alt || featured.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex flex-col justify-center p-6 md:p-10 md:w-1/2">
                        <div className="flex items-center gap-3">
                          <span className="inline-block text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--brand-alt)]/10 text-[var(--brand-alt)]">
                            <BudouX>{featuredTypeLabel}</BudouX>
                          </span>
                          {featured.readingTime && (
                            <span className="text-sm text-slate-600">
                              <BudouX>{`${featured.readingTime}分で読めます`}</BudouX>
                            </span>
                          )}
                        </div>
                        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900 leading-snug group-hover:text-[var(--brand-alt)] transition-colors duration-200">
                          <BudouX>{featured.title}</BudouX>
                        </h2>
                        {featured.excerpt && (
                          <p className="mt-3 text-base text-slate-700 leading-7 line-clamp-3">
                            <BudouX>{featured.excerpt}</BudouX>
                          </p>
                        )}
                        <div className="mt-6 flex items-center justify-between">
                          {featuredPublishedAt && (
                            <time className="text-sm text-slate-600">{featuredPublishedAt}</time>
                          )}
                          <span className="text-sm font-medium text-brand-primary group-hover:text-[var(--brand-alt)] transition-colors duration-200">
                            記事を読む →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </section>
            )
          })()}

          {/* All articles — vertical list, NOT grid */}
          {rest.length > 0 && (
            <section className="bg-white py-16 md:py-24">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-8">
                  <BudouX>すべての記事</BudouX>
                </h2>
                <div>
                  {rest.map((article) => {
                    const image = typeof article.featuredImage === 'object' ? (article.featuredImage as Media) : null
                    const publishedAt = article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
                      : null
                    const typeLabel = articleTypeLabels[article.articleType] || article.articleType

                    return (
                      <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        className="group block border-b border-slate-200 py-6 md:py-8 first:pt-0 last:border-b-0"
                      >
                        <div className="flex gap-5 md:gap-8">
                          {/* Thumbnail */}
                          {image?.url && (
                            <div className="relative w-[120px] h-[80px] md:w-[200px] md:h-[130px] flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={image.url}
                                alt={image.alt || article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 120px, 200px"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex flex-col justify-center min-w-0">
                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                              <span className="text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--brand-alt)]/10 text-[var(--brand-alt)]">
                                <BudouX>{typeLabel}</BudouX>
                              </span>
                              {article.readingTime && (
                                <span className="text-sm text-slate-600">
                                  <BudouX>{`${article.readingTime}分で読めます`}</BudouX>
                                </span>
                              )}
                              <span className="hidden md:inline text-slate-300">|</span>
                              {publishedAt && (
                                <time className="text-sm text-slate-600">{publishedAt}</time>
                              )}
                            </div>
                            <h3 className="mt-2 text-lg md:text-xl font-semibold text-slate-900 group-hover:text-[var(--brand-alt)] transition-colors duration-200 leading-snug">
                              <BudouX>{article.title}</BudouX>
                            </h3>
                            {article.excerpt && (
                              <p className="hidden md:block mt-2 text-base text-slate-600 leading-7 line-clamp-2">
                                <BudouX>{article.excerpt}</BudouX>
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
        </>
      )}

      {/* CTA section — light bg since footer is dark */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-4">
            <BudouX>デジタル戦略についてのご相談</BudouX>
          </h2>
          <p className="text-base md:text-lg leading-8 text-slate-600 mb-8">
            <BudouX>ドメイン活用やCMS導入に関するお問い合わせをお待ちしております。</BudouX>
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

export function generateMetadata(): Promise<Metadata> {
  return generateListingMeta({
    globalSlug: 'articles-settings',
    fallbackTitle: '記事一覧',
    fallbackDescription: '記事・ドキュメントの一覧をご覧ください。',
  })
}
