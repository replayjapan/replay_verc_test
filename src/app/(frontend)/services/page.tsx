import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { generateListingMeta } from '@/utilities/generateListingMeta'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import { BudouX } from '@/components/BudouX'
import type { Media, Service, ServicesSetting } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Deliverable = {
  title: string
  description?: string | null
  id?: string | null
}

const process = [
  {
    step: '01',
    title: '相談内容を整理する',
    text: '今どの段階なのか、何を決める必要があるのかを最初に明確にします。',
  },
  {
    step: '02',
    title: '必要な範囲を決める',
    text: '開発だけで進むのか、運用やネーミングまで含めるのかを現実的に整理します。',
  },
  {
    step: '03',
    title: '短い単位で進める',
    text: '長く止まらないように、確認と実装を短いサイクルで進めます。',
  },
  {
    step: '04',
    title: '公開後も改善する',
    text: '公開後の数字や反応を見ながら、必要な改善につなげます。',
  },
]

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })
  const settings = (await payload.findGlobal({
    slug: 'services-settings',
  })) as ServicesSetting

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 50,
    sort: 'sortOrder',
    overrideAccess: false,
  })

  const docs = services.docs as Service[]
  const heroImage = typeof settings?.heroImage === 'object' ? (settings.heroImage as Media) : null

  if (docs.length === 0) {
    return (
      <article className="pt-16">
        <div className="-mt-16">
          <HeroHeaderBlock
            size="medium"
            title={settings?.pageTitle || '事業内容'}
            subtitle={settings?.pageSubtitle || ''}
            image={heroImage ?? null}
            headingAlignment="left"
          />
        </div>
        <div className="text-center py-16 text-slate-600">
          <p className="text-lg"><BudouX>現在サービスは登録されていません。</BudouX></p>
        </div>
      </article>
    )
  }

  const featured = docs[0]
  const rest = docs.slice(1)
  const featuredImage = typeof featured.featuredImage === 'object' ? (featured.featuredImage as Media) : null
  const featuredDeliverables = (featured.deliverables ?? []) as Deliverable[]

  return (
    <article className="pt-16">
      <div className="-mt-16">
        <HeroHeaderBlock
          size="medium"
          title={settings?.pageTitle || '事業内容'}
          subtitle={settings?.pageSubtitle || ''}
          image={heroImage ?? null}
          headingAlignment="left"
        />
      </div>

      {/* Editorial thesis — frames the firm's approach */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-slate-900 mb-6">
            <BudouX>経験に基づく、実務的な支援</BudouX>
          </h2>
          <p className="text-base md:text-lg leading-8 text-slate-900 max-w-3xl">
            <BudouX>
              rePlayはプロジェクト単位で動く開発・マーケティング会社です。大規模な組織ではありませんが、だからこそクライアントの課題に直接向き合い、柔軟で確実な対応ができます。以下の4つの領域で、実績に裏打ちされたサービスを提供しています。
            </BudouX>
          </p>
        </div>
      </section>

      {/* Featured service — first service gets prominence */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {featuredImage?.url && (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={featuredImage.url}
                  alt={featuredImage.alt || featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="border-l-4 border-brand-alt pl-6 md:pl-8">
              <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.02em] text-slate-900 mb-4">
                <BudouX>{featured.title}</BudouX>
              </h2>
              {featured.listingDescription && (
                <p className="text-base leading-8 text-slate-900 mb-6">
                  <BudouX>{featured.listingDescription}</BudouX>
                </p>
              )}
              {featuredDeliverables.length > 0 && (
                <ul className="space-y-2 mb-8">
                  {featuredDeliverables.map((item) => (
                    <li
                      key={item.id ?? item.title}
                      className="text-sm text-slate-700 flex items-start gap-2"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-brand-alt flex-none" />
                      {item.title}
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={`/services/${featured.slug}`}
                className="inline-block bg-brand-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-alt hover:text-brand-primary transition-colors duration-200 text-sm"
              >
                詳しく見る →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining services — alternating image/text layout */}
      {rest.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 space-y-16 md:space-y-24">
            {rest.map((service, index) => {
              const image = typeof service.featuredImage === 'object' ? (service.featuredImage as Media) : null
              const deliverables = (service.deliverables ?? []) as Deliverable[]
              const imageOnRight = index % 2 === 0

              return (
                <div
                  key={service.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
                >
                  {image?.url && (
                    <div
                      className={`relative aspect-[4/3] rounded-lg overflow-hidden ${
                        imageOnRight ? 'md:order-2' : 'md:order-1'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <div
                    className={`border-l-4 border-brand-alt pl-6 md:pl-8 ${
                      image?.url ? (imageOnRight ? 'md:order-1' : 'md:order-2') : ''
                    }`}
                  >
                    <h3 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-4">
                      <BudouX>{service.title}</BudouX>
                    </h3>
                    {service.listingDescription && (
                      <p className="text-base leading-7 text-slate-900 mb-6">
                        <BudouX>{service.listingDescription}</BudouX>
                      </p>
                    )}
                    {deliverables.length > 0 && (
                      <ul className="space-y-2 mb-8">
                        {deliverables.map((item) => (
                          <li
                            key={item.id ?? item.title}
                            className="text-sm text-slate-700 flex items-start gap-2"
                          >
                            <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-brand-alt flex-none" />
                            {item.title}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-block bg-brand-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-alt hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      詳しく見る →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Process — 進め方 (dark authority section) */}
      <section className="bg-brand-primary text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05]">
                <BudouX>進め方</BudouX>
              </h2>
              <p className="mt-6 text-base md:text-lg leading-8 text-white/88">
                <BudouX>何を提供するかだけでなく、どう進むかを最初に明確にします。</BudouX>
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {process.map((item) => (
                <div key={item.step} className="border-t border-white/10 pt-6">
                  <p className="text-sm text-brand-alt leading-6 font-semibold">{item.step}</p>
                  <h3 className="mt-2 text-lg md:text-xl font-semibold tracking-[-0.01em] leading-[1.25]">
                    <BudouX>{item.title}</BudouX>
                  </h3>
                  <p className="mt-3 text-sm md:text-base leading-7 text-slate-300">
                    <BudouX>{item.text}</BudouX>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.02em] text-slate-900 mb-4">
            <BudouX>サービスについてのご相談</BudouX>
          </h2>
          <p className="text-base leading-7 text-slate-600 mb-8 max-w-xl mx-auto">
            <BudouX>プロジェクトのご依頼・ご質問はお気軽にお問い合わせください。</BudouX>
          </p>
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

export function generateMetadata(): Promise<Metadata> {
  return generateListingMeta({
    globalSlug: 'services-settings',
    fallbackTitle: 'サービス一覧',
    fallbackDescription: '提供しているサービスの一覧をご覧ください。',
  })
}
