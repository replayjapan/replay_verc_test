import React from 'react'
import { BudouX } from '@/components/BudouX'

type TakeawayItem = {
  text: string
  id?: string | null
}

interface TakeawayCalloutProps {
  heading?: string | null
  takeaways?: TakeawayItem[] | null
}

/**
 * Reusable takeaway callout for blog posts and articles.
 * Renders below the featured image, above body content.
 * Only renders if takeaways array has at least 1 item.
 *
 * Spec: bg-slate-50, border-left 3px brand-alt (gold), no border-radius.
 */
export function TakeawayCallout({ heading, takeaways }: TakeawayCalloutProps) {
  if (!takeaways || takeaways.length === 0) return null

  return (
    <div className="bg-slate-50 border-l-[3px] border-[var(--brand-alt)] py-5 px-6 my-8">
      {heading && (
        <p className="font-bold text-slate-900 mb-3">
          <BudouX>{heading}</BudouX>
        </p>
      )}
      <ul className="list-disc pl-5 space-y-1.5">
        {takeaways.map((item, index) => (
          <li key={item.id ?? index} className="text-slate-700 text-[0.9375rem] leading-7">
            <BudouX>{item.text}</BudouX>
          </li>
        ))}
      </ul>
    </div>
  )
}
