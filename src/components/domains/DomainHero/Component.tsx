import Image from 'next/image'
import { StatusBadge } from '@/components/domains/StatusBadge/Component'
import type { DomainHeroProps } from './types'

export function DomainHero({ domainName, category, status, imageUrl }: DomainHeroProps) {
  return (
    <section className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
      {/* Background */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={domainName}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-primary/70" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-8">
        <div className="flex items-center gap-3 mb-2">
          {category && (
            <span className="text-sm text-white/70">{category}</span>
          )}
          <StatusBadge status={status} size="md" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{domainName}</h1>
      </div>
    </section>
  )
}
