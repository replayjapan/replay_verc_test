'use client'

import { loadDefaultJapaneseParser } from 'budoux'
import React, { useMemo } from 'react'

const parser = loadDefaultJapaneseParser()

type BudouXClientProps = {
  children: string
  as?: keyof React.JSX.IntrinsicElements
  className?: string
}

const segmentStyle: React.CSSProperties = { wordBreak: 'keep-all', overflowWrap: 'anywhere' }

/**
 * Client-side BudouX Japanese text segmentation wrapper.
 * Same API as the server BudouX component but works inside 'use client' components.
 * Wraps each word segment in a span with word-break: keep-all.
 */
export function BudouXClient({ children, as: Tag = 'span', className }: BudouXClientProps) {
  const segments = useMemo(() => {
    if (typeof children !== 'string') return [String(children ?? '')]
    return parser.parse(children)
  }, [children])

  return (
    <Tag className={className}>
      {segments.map((segment, i) => (
        <React.Fragment key={i}>
          {i > 0 && <wbr />}
          <span style={segmentStyle}>{segment}</span>
        </React.Fragment>
      ))}
    </Tag>
  )
}
