'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Share2, Copy, Check } from 'lucide-react'
import { BudouXClient } from '@/components/BudouX/client'
import type { BackNavProps } from './types'

export function BackNav({
  backHref,
  backLabel,
  showShare = true,
  showCopy = true,
  shareTitle,
}: BackNavProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle ?? document.title,
          url: window.location.href,
        })
      } catch {
        // User cancelled the share dialog — not an error
      }
    } else {
      handleCopy()
    }
  }

  const btnClasses =
    'flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 text-sm text-slate-600 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors'

  return (
    <div className="flex items-center justify-between">
      <Link href={backHref} className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 hover:text-[var(--brand-primary)] transition-colors duration-200 whitespace-nowrap">
        <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
        <BudouXClient>{backLabel}</BudouXClient>
      </Link>
      <div className="flex items-center gap-2">
        {showShare && (
          <button onClick={handleShare} className={btnClasses} aria-label="共有">
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline"><BudouXClient>共有</BudouXClient></span>
          </button>
        )}
        {showCopy && (
          <button onClick={handleCopy} className={btnClasses} aria-label={copied ? 'コピー済' : 'リンクをコピー'}>
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline"><BudouXClient>{copied ? 'コピー済' : 'リンクをコピー'}</BudouXClient></span>
          </button>
        )}
      </div>
    </div>
  )
}
