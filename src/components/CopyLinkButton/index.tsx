'use client'

import { useState } from 'react'
import { Link2, Check } from 'lucide-react'
import { BudouXClient } from '@/components/BudouX/client'

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    if (typeof window === 'undefined') return
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-colors"
      aria-label="リンクをコピー"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-green-600"><BudouXClient>コピーしました</BudouXClient></span>
        </>
      ) : (
        <>
          <Link2 className="w-4 h-4" />
          <span><BudouXClient>リンクをコピー</BudouXClient></span>
        </>
      )}
    </button>
  )
}
