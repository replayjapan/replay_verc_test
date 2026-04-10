import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post, Media, Category } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ReadingProgressBar } from '@/components/ReadingProgressBar'
import { CopyLinkButton } from '@/components/CopyLinkButton'
import { BudouX } from '@/components/BudouX'
import { TakeawayCallout } from '@/components/shared/TakeawayCallout'
import { formatAuthors } from '@/utilities/formatAuthors'

export async function generateStaticParams() {
  // Skipped to avoid Vercel build timeout (Neon Postgres in Singapore, build server in D.C.)
  // const payload = await getPayload({ config: configPromise })
  // const posts = await payload.find({
  //   collection: 'posts',
  //   draft: false,
  //   limit: 1000,
  //   overrideAccess: false,
  //   pagination: false,
  //   select: {
  //     slug: true,
  //   },
  // })
  //
  // return posts.docs.map(({ slug }) => ({ slug }))
  return []
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function PostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  const hasTags = post.tags && post.tags.length > 0
  const hasAuthors = post.populatedAuthors && post.populatedAuthors.length > 0
  const hasRelatedPosts = post.relatedPosts && post.relatedPosts.length > 0

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const heroImage = post.heroImage && typeof post.heroImage === 'object'
    ? (post.heroImage as Media)
    : null

  const categories = post.categories as (Category | number)[] | null | undefined

  return (
    <article className="bg-white">
      <ReadingProgressBar />
      <PageClient />

      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Reading-first layout — no header band */}
      <div className="max-w-3xl mx-auto px-6 pb-16 md:pb-24">
        {/* Back link */}
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-slate-600 hover:text-[var(--brand-alt)] underline decoration-1 underline-offset-4 transition-colors duration-200 text-sm mt-8"
        >
          &larr; <BudouX>ブログ一覧</BudouX>
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mt-8">
          <BudouX>{post.title}</BudouX>
        </h1>

        {/* Metadata band */}
        <div className="flex flex-wrap items-center gap-3 mt-5">
          {publishedDate && (
            <time className="text-sm text-slate-600">{publishedDate}</time>
          )}
          {categories && Array.isArray(categories) && categories.length > 0 && (
            <>
              <span className="text-slate-300">|</span>
              {categories.map((cat, i) => {
                if (typeof cat !== 'object') return null
                return (
                  <span key={i} className="text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--brand-alt)]/10 text-[var(--brand-alt)]">
                    {(cat as Category).title}
                  </span>
                )
              })}
            </>
          )}
          {hasAuthors && (
            <>
              <span className="text-slate-300">|</span>
              <span className="text-sm text-slate-600">
                {formatAuthors(post.populatedAuthors!)}
              </span>
            </>
          )}
        </div>

        {/* Featured image */}
        {heroImage?.url && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mt-8">
            <Image
              src={heroImage.url}
              alt={heroImage.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
              priority
            />
          </div>
        )}

        {/* Takeaway callout — below image, above body */}
        <TakeawayCallout
          heading={post.takeawayHeading}
          takeaways={post.takeaways}
        />

        {/* Body content */}
        <div className="mt-10 text-base md:text-[1.0625rem] leading-8 md:leading-9 text-slate-800">
          <RichText data={post.content} enableGutter={false} />
        </div>

        {/* Tags */}
        {hasTags && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-sm font-semibold text-slate-600 tracking-wider mb-3">
              タグ
            </h2>
            <div className="flex flex-wrap gap-2">
              {post.tags!.map((item, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:border-[var(--brand-alt)] hover:text-[var(--brand-alt)] hover:bg-[var(--brand-alt)]/10 transition-colors duration-200"
                >
                  #{item.tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-8 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 font-medium">
              <BudouX>この記事をシェア</BudouX>
            </span>
            <CopyLinkButton />
          </div>
        </div>
      </div>

      {/* Related posts — wider container */}
      {hasRelatedPosts && (
        <section className="bg-white pb-16 md:pb-24 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24">
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-8">
              関連記事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(post.relatedPosts!.filter((p) => typeof p === 'object') as Post[]).map((relPost) => {
                const relImage = relPost.heroImage && typeof relPost.heroImage === 'object'
                  ? (relPost.heroImage as Media)
                  : null
                return (
                  <Link
                    key={relPost.id}
                    href={`/posts/${relPost.slug}`}
                    className="group block border border-slate-200 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                  >
                    {relImage?.url && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={relImage.url}
                          alt={relImage.alt || relPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-[var(--brand-alt)] transition-colors duration-200">
                        <BudouX>{relPost.title}</BudouX>
                      </h3>
                      {relPost.meta?.description && (
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                          <BudouX>{relPost.meta.description}</BudouX>
                        </p>
                      )}
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
            <BudouX>この記事についてご質問はありますか？</BudouX>
          </h2>
          <p className="text-base md:text-lg leading-8 text-slate-600 mb-8">
            <BudouX>お気軽にお問い合わせください。</BudouX>
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
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
