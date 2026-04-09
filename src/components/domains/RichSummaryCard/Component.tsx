import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { BudouX } from '@/components/BudouX'
import type { RichSummaryCardProps } from './types'

export function RichSummaryCard({ title, description, bullets, imageUrl, bulletsGrid }: RichSummaryCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4"><BudouX>{title}</BudouX></h2>

      {imageUrl && (
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
          <Image src={imageUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      )}

      <div className="text-slate-600 leading-relaxed mb-4">{description}</div>

      {bullets && bullets.length > 0 && (
        <ul className={bulletsGrid ? 'grid sm:grid-cols-2 gap-3' : 'space-y-2'}>
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <span className="text-slate-700">{typeof bullet === 'string' ? <BudouX>{bullet}</BudouX> : bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
