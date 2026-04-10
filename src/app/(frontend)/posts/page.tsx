import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BudouX } from '@/components/BudouX'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import { generateListingMeta } from '@/utilities/generateListingMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Pagination } from '@/components/Pagination'
import type { PostsSetting, Media, Category } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const settings = (await getCachedGlobal('posts-settings', 1)()) as PostsSetting

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      heroImage: true,
      meta: true,
      publishedAt: true,
    },
  })

  const [featured, ...rest] = posts.docs
  const heroImage = typeof settings?.heroImage === 'object' ? (settings.heroImage as Media) : null

  return (
    <article className="pt-16">
      <div className="-mt-16">
        <HeroHeaderBlock
          size="medium"
          title={settings?.pageTitle || 'ブログ'}
          subtitle={settings?.pageSubtitle || 'ドメイン管理、Web開発、デジタルマーケティングに関する最新の知見をお届けします。'}
          image={heroImage ?? null}
          headingAlignment="left"
        />
      </div>

      {posts.docs.length === 0 ? (
        <div className="text-center py-20 text-slate-600">
          <p className="text-lg"><BudouX>現在公開中の記事はありません。</BudouX></p>
        </div>
      ) : (
        <>
          {/* Featured post — staged on subtle background */}
          {featured && (
            <section className="bg-slate-50 py-12 md:py-16">
              <div className="max-w-6xl mx-auto px-6">
                <FeaturedPost post={featured} />
              </div>
            </section>
          )}

          {/* Recent posts grid */}
          {rest.length > 0 && (
            <section className="bg-white py-16 md:py-24">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-8">
                  最新の記事
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rest.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
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
            <BudouX>記事についてのご質問はありますか？</BudouX>
          </h2>
          <p className="text-base md:text-lg leading-8 text-slate-600 mb-8">
            <BudouX>ドメイン管理やデジタルマーケティングに関するご相談をお受けしています。</BudouX>
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-primary text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-brand-alt hover:text-brand-primary transition-colors duration-200 text-base"
          >
            お問い合わせページへ
          </Link>
        </div>
      </section>

      {posts.totalPages > 1 && posts.page && (
        <div className="max-w-6xl mx-auto px-6 py-10">
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        </div>
      )}
    </article>
  )
}

// ─── Featured Post ─────────────────────────────────────────────────────────

function FeaturedPost({ post }: { post: Record<string, unknown> }) {
  const title = post.title as string
  const slug = post.slug as string | undefined
  const categories = post.categories as (Category | number)[] | null | undefined
  const meta = post.meta as { image?: Media | number | null; description?: string | null } | null | undefined
  const heroImage = post.heroImage as Media | number | null | undefined

  const image = getPostImage(meta?.image, heroImage)
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt as string).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <Link
      href={`/posts/${slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-slate-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--brand-alt)] transition-all duration-200"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image panel */}
        <div className="relative aspect-[16/9] md:aspect-auto md:w-1/2 overflow-hidden bg-slate-100">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[#2a3660] flex items-center justify-center">
              <span className="text-white/20 text-7xl font-bold select-none">B</span>
            </div>
          )}
        </div>

        {/* Content panel */}
        <div className="flex flex-col justify-center p-6 md:p-8 md:w-1/2">
          {categories && Array.isArray(categories) && categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {categories.map((cat, i) => {
                if (typeof cat !== 'object') return null
                return (
                  <span key={i} className="text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--brand-alt)]/10 text-[var(--brand-alt)]">
                    {(cat as Category).title}
                  </span>
                )
              })}
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug group-hover:text-[var(--brand-alt)] transition-colors duration-200">
            <BudouX>{title}</BudouX>
          </h2>
          {meta?.description && (
            <p className="mt-3 text-base text-slate-600 leading-7 line-clamp-3">
              <BudouX>{meta.description}</BudouX>
            </p>
          )}
          <div className="mt-5 flex items-center justify-between">
            {publishedDate && (
              <time className="text-sm text-slate-600">{publishedDate}</time>
            )}
            <span className="text-sm font-medium text-brand-primary group-hover:text-[var(--brand-alt)] transition-colors duration-200">
              記事を読む →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Post Card ─────────────────────────────────────────────────────────────

function PostCard({ post }: { post: Record<string, unknown> }) {
  const title = post.title as string
  const slug = post.slug as string | undefined
  const categories = post.categories as (Category | number)[] | null | undefined
  const meta = post.meta as { image?: Media | number | null; description?: string | null } | null | undefined
  const heroImage = post.heroImage as Media | number | null | undefined

  const image = getPostImage(meta?.image, heroImage)
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt as string).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <Link
      href={`/posts/${slug}`}
      className="group block border border-slate-200 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-slate-300 text-4xl font-bold select-none">B</span>
          </div>
        )}
      </div>
      <div className="p-5">
        {categories && Array.isArray(categories) && categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {categories.slice(0, 2).map((cat, i) => {
              if (typeof cat !== 'object') return null
              return (
                <span key={i} className="text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--brand-alt)]/10 text-[var(--brand-alt)]">
                  {(cat as Category).title}
                </span>
              )
            })}
          </div>
        )}
        <h3 className="text-lg font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-[var(--brand-alt)] transition-colors duration-200">
          <BudouX>{title}</BudouX>
        </h3>
        {meta?.description && (
          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
            <BudouX>{meta.description}</BudouX>
          </p>
        )}
        {publishedDate && (
          <time className="block mt-3 text-sm text-slate-600">{publishedDate}</time>
        )}
      </div>
    </Link>
  )
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function getPostImage(metaImage?: Media | number | null, heroImage?: Media | number | null): Media | null {
  if (metaImage && typeof metaImage === 'object' && (metaImage as Media).url) return metaImage as Media
  if (heroImage && typeof heroImage === 'object' && (heroImage as Media).url) return heroImage as Media
  return null
}

export function generateMetadata(): Promise<Metadata> {
  return generateListingMeta({
    globalSlug: 'posts-settings',
    fallbackTitle: 'ブログ記事',
    fallbackDescription: 'ブログ記事の一覧をご覧ください。',
  })
}
