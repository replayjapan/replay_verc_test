'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import RichText from '@/components/RichText'
import { BudouX } from '@/components/BudouX'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export default function VideoTranscriptAccordion({
  transcript,
}: {
  transcript: DefaultTypedEditorState
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-800">
          <BudouX>トランスクリプト</BudouX>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-6 border-t border-slate-100">
          <RichText
            className="prose prose-sm prose-slate max-w-none pt-4"
            data={transcript}
            enableGutter={false}
          />
        </div>
      )}
    </div>
  )
}
