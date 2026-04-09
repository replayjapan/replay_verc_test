'use client'

import Link from 'next/link'
import React, { useMemo } from 'react'

import RichText from '@/components/RichText'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import { BackNav } from '@/components/domains/BackNav/Component'
import { DomainSummaryCard } from '@/components/domains/DomainSummaryCard/Component'
import { InquiryFormCard } from '@/components/domains/InquiryFormCard/Component'
import { Money } from '@/components/domains/Money/Component'
import { RichSummaryCard } from '@/components/domains/RichSummaryCard/Component'
import { SetsMembershipPanel } from '@/components/domains/SetsMembershipPanel/Component'
import { StatusBadge } from '@/components/domains/StatusBadge/Component'
import { calculateDomainAge } from '@/lib/domain-utils'
import { formatDate } from '@/utilities/formatDate'
import { formatPriceShorthand } from '@/utilities/formatPrice'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { DomainStatus } from '@/components/domains/StatusBadge/types'
import type { SetInfo } from '@/components/domains/SetsMembershipPanel/types'
import type { SetPolicy } from '@/utilities/domainSetsPolicy'
import type { Domain, DomainSettings } from '@/types/domain-types'
import { BudouXClient } from '@/components/BudouX/client'

const statusLabels: Record<string, string> = {
  open: '受付中',
  not_available: '受付停止',
  sold: '売却済み',
  pending: '交渉中',
}

interface DomainDetailClientProps {
  domain: Domain
  domainSets: SetInfo[]
  isBundleOnly: boolean
  similarDomains: Domain[]
  settings: DomainSettings
  strictestPolicy: SetPolicy
  locale: string
}

export const DomainDetailClient: React.FC<DomainDetailClientProps> = ({
  domain,
  domainSets,
  isBundleOnly,
  similarDomains,
  settings,
  strictestPolicy,
  locale: _locale,
}) => {
  const age = useMemo(
    () => calculateDomainAge(domain.registrationDate ?? undefined),
    [domain.registrationDate],
  )
  const contactEnabled = settings.contactForm.enable && domain.status !== 'sold'
  const currencyLower = settings.currency.code.toLowerCase() as 'jpy' | 'usd'

  const heroImage = useMemo(() => {
    const rawUrl = domain.featuredImage?.url?.trim()
    return rawUrl ? getMediaUrl(rawUrl) : null
  }, [domain.featuredImage?.url])

  const categoryName = domain.category?.name ?? null
  const extensionLabel = domain.extension ? `.${domain.extension.replace(/^\./, '')}` : null

  // Build facts for DomainSummaryCard
  const facts = useMemo(() => {
    const items: { label: string; value: string }[] = []
    if (domain.registrationDate) {
      items.push({ label: '登録日', value: formatDate(domain.registrationDate) })
    }
    if (typeof age === 'number') {
      items.push({ label: 'ドメイン年数', value: `${age}年` })
    }
    if (categoryName) {
      items.push({ label: 'カテゴリー', value: categoryName })
    }
    if (extensionLabel) {
      items.push({ label: 'TLD', value: extensionLabel })
    }
    return items
  }, [age, categoryName, domain.registrationDate, extensionLabel])

  // Build stat cards for the content area
  const statCards = useMemo(() => {
    const cards: { label: string; value: string }[] = []
    if (domain.registrationDate) {
      cards.push({ label: '登録日', value: formatDate(domain.registrationDate) })
    }
    if (typeof age === 'number') {
      cards.push({ label: 'ドメイン年数', value: `${age}年` })
    }
    cards.push({
      label: '最低希望価格',
      value:
        settings.display.enablePriceShorthand && currencyLower === 'jpy'
          ? formatPriceShorthand(domain.minimumOffer)
          : currencyLower === 'jpy'
            ? `${domain.minimumOffer.toLocaleString()}円`
            : `$${domain.minimumOffer.toLocaleString()}`,
    })
    cards.push({
      label: '販売状況',
      value: statusLabels[domain.status] ?? domain.status,
    })
    return cards
  }, [age, currencyLower, domain.minimumOffer, domain.registrationDate, domain.status, settings.display.enablePriceShorthand])

  // Build Media-like object for HeroHeader from domain's featuredImage
  const heroMedia = useMemo(() => {
    if (!heroImage) return undefined
    return {
      url: heroImage,
      alt: domain.featuredImage?.alt || domain.domainName,
    } as import('@/payload-types').Media
  }, [heroImage, domain.featuredImage?.alt, domain.domainName])

  return (
    <article className="pt-16">
      {/* HeroHeader Medium — matches About/Contact/Listing page hero height */}
      <div className="-mt-16">
        <HeroHeaderBlock
          size="short"
          title={domain.domainName}
          subtitle={categoryName ?? undefined}
          image={heroMedia ?? null}
          headingAlignment="left"
        />
      </div>

      {/* Content area */}
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        <BackNav backHref="/domains" backLabel="ドメイン一覧に戻る" shareTitle={domain.domainName} />

        {/* Summary card: domain name + status + price + facts */}
        <DomainSummaryCard
          domainName={domain.domainName}
          status={domain.status as DomainStatus}
          ageText={typeof age === 'number' ? `${age}年` : ''}
          minimumOffer={domain.minimumOffer}
          currency={currencyLower}
          facts={facts}
          enablePriceShorthand={settings.display.enablePriceShorthand}
        />

        {/* Set membership — promoted to top position for visibility */}
        {domainSets.length > 0 && (
          <SetsMembershipPanel
            sets={domainSets}
            strictestPolicy={strictestPolicy}
            isBundleOnly={isBundleOnly}
          />
        )}

        {/* Two-column layout: content + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: content sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* About this domain */}
            {(domain.richSummaryIntro || domain.richSummaryBullets.length > 0) && (
              <RichSummaryCard
                title={domain.richSummaryTitle || 'このドメインについて'}
                description={
                  domain.richSummaryIntro ? (
                    <RichText data={domain.richSummaryIntro} enableGutter={false} />
                  ) : null
                }
                bullets={domain.richSummaryBullets}
              />
            )}

            {/* Stat cards — 2x2 grid */}
            {statCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statCards.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4">
                    <dt className="text-sm md:text-xs text-slate-600 tracking-wider mb-1"><BudouXClient>{stat.label}</BudouXClient></dt>
                    <dd className="text-xl md:text-lg font-semibold text-slate-900"><BudouXClient>{stat.value}</BudouXClient></dd>
                  </div>
                ))}
              </div>
            )}

            {/* Use cases */}
            {domain.useCases.length > 0 && (
              <RichSummaryCard
                title={domain.useCasesTitle || 'このドメインの活用シーン'}
                description={
                  domain.useCasesSummary ? (
                    <RichText data={domain.useCasesSummary} enableGutter={false} />
                  ) : null
                }
                bullets={domain.useCases}
                bulletsGrid
              />
            )}
          </div>

          {/* Right: inquiry sidebar */}
          <aside className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900"><BudouXClient>このドメインを取得する</BudouXClient></h3>
              <p className="text-sm text-slate-600">
                <BudouXClient>{isBundleOnly ? 'セットでのお問い合わせをお待ちしています' : 'ご興味のある方はお気軽にご連絡ください'}</BudouXClient>
              </p>
            </div>
            {contactEnabled ? (
              <InquiryFormCard
                domainId={domain.id}
                domainName={domain.domainName}
                minimumOffer={isBundleOnly ? undefined : domain.minimumOffer}
                currency={currencyLower}
              />
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <p className="text-sm text-slate-600">
                  <BudouXClient>現在、このドメインのオファーは受け付けておりません。</BudouXClient>
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* Disclaimer */}
        {settings.disclaimer && (
          <div className="text-xs text-slate-600 border-t border-slate-200 pt-4">
            {settings.disclaimer}
          </div>
        )}
      </div>

      {/* Similar domains — bg-slate-50 for tonal break before CTA */}
      {similarDomains.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200 py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 rounded-full bg-brand-alt" />
              <h2 className="text-2xl font-bold text-slate-900"><BudouXClient>類似ドメイン</BudouXClient></h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {similarDomains.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/domains/${similar.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-alt"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-slate-900 group-hover:text-brand-alt transition-colors">
                        {similar.domainName}
                      </p>
                      {similar.category?.name && (
                        <p className="text-xs text-slate-600">{similar.category.name}</p>
                      )}
                    </div>
                    <StatusBadge status={similar.status as DomainStatus} />
                  </div>
                    <p className="line-clamp-2 text-sm text-slate-600">{similar.description && <BudouXClient>{similar.description}</BudouXClient>}</p>
                  <div className="flex items-center justify-between text-sm mt-auto">
                    <span className="text-slate-600"><BudouXClient>最低希望価格</BudouXClient></span>
                    <Money
                      amount={similar.minimumOffer}
                      currency={currencyLower}
                      size="sm"
                      className="text-slate-900 font-bold"
                      enableShorthand={settings.display.enablePriceShorthand}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry CTA — bg-slate-50 since footer is dark */}
      {contactEnabled && (
        <section className="bg-slate-50 py-16 md:py-24 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-slate-900 mb-4">
              <BudouXClient>このドメインに興味がありますか？</BudouXClient>
            </h2>
            <p className="text-base md:text-lg leading-8 text-slate-600 mb-10">
              <BudouXClient>お問い合わせフォームからお気軽にご連絡ください。通常1営業日以内にご返信いたします。</BudouXClient>
            </p>
            <button
              onClick={() => document.querySelector('aside')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block bg-brand-primary text-white font-semibold px-8 py-4 rounded-lg hover:bg-brand-alt hover:text-brand-primary transition-colors duration-200"
            >
              <BudouXClient>お問い合わせフォームへ</BudouXClient>
            </button>
          </div>
        </section>
      )}
    </article>
  )
}

export default DomainDetailClient
