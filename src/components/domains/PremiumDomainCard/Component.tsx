import Link from 'next/link'
import { BudouX } from '@/components/BudouX'
import Image from 'next/image'
import { StatusBadge } from '@/components/domains/StatusBadge/Component'
import { Money } from '@/components/domains/Money/Component'
import type { PremiumDomainCardProps } from './types'

export function PremiumDomainCard({
  domainName,
  category,
  status,
  minimumOffer,
  currency = 'jpy',
  imageUrl,
  href,
  featured = false,
  enablePriceShorthand = false,
}: PremiumDomainCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all"
    >
      {/* Image / Gradient fallback */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={domainName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-primary/70" />
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {featured && (
            <span className="bg-brand-alt text-brand-primary text-xs font-bold px-2.5 py-1 rounded-full">
              Premium
            </span>
          )}
          <StatusBadge status={status} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors truncate">
          {domainName}
        </h3>
        {category && (
          <p className="text-sm text-slate-600 mt-0.5">{category}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-600 tracking-wider"><BudouX>最低希望価格</BudouX></span>
          <Money amount={minimumOffer} currency={currency} size="lg" className="text-brand-alt" enableShorthand={enablePriceShorthand} />
        </div>
      </div>
    </Link>
  )
}
