import { loadDefaultJapaneseParser } from 'budoux'
import React from 'react'

const parser = loadDefaultJapaneseParser()

type BudouXProps = {
  children: string
  as?: keyof React.JSX.IntrinsicElements
  className?: string
}

const segmentStyle: React.CSSProperties = { wordBreak: 'keep-all', overflowWrap: 'anywhere' }

/**
 * BudouX Japanese text segmentation wrapper.
 * Wraps each word segment in a span with word-break: keep-all to prevent
 * mid-word line breaks. Segments are separated by <wbr> break opportunities.
 * Server component — BudouX processing is synchronous.
 */
export function BudouX({ children, as: Tag = 'span', className }: BudouXProps) {
  const segments = parser.parse(children)

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
