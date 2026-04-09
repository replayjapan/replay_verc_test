import React from 'react'
import Image from 'next/image'
import { BudouX } from '@/components/BudouX'
import type { Media } from '@/payload-types'

type Client = {
  name: string
  logo?: Media | number | null
  id?: string | null
}

type ClientLogosProps = {
  heading?: string | null
  headingAlignment?: string | null
  subtitle?: string | null
  clients?: Client[] | null
  blockType?: 'clientLogos'
  blockName?: string | null
}

export const ClientLogosBlock: React.FC<ClientLogosProps> = ({
  heading,
  subtitle,
  clients,
}) => {
  if (!clients || clients.length === 0) return null

  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        {heading && (
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-slate-900 mb-3">
            <BudouX>{heading}</BudouX>
          </h2>
        )}
        {subtitle && (
          <p className="text-sm leading-6 text-slate-600 mb-8 max-w-2xl">
            <BudouX>{subtitle}</BudouX>
          </p>
        )}
        <div className="border-t border-slate-200 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
            {clients.map((client, i) => {
              const logo = client.logo as Media | undefined
              return (
                <div key={client.id ?? i} className="flex flex-col items-center gap-3">
                  <span className="text-xs text-slate-600 font-medium tracking-wide">{client.name}</span>
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl bg-slate-200 flex items-center justify-center overflow-hidden">
                    {logo?.url ? (
                      <Image src={logo.url} alt={client.name} width={128} height={128} className="object-contain" />
                    ) : (
                      <span className="text-slate-600 text-xs">Logo</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="border-b border-slate-200" />
      </div>
    </section>
  )
}
