/**
 * Convert simple markdown to Lexical JSON for Payload 3.x richText fields.
 *
 * Supports: ## h2, ### h3, #### h4, **bold**, - list items, paragraphs.
 * Does NOT support: images, links, code blocks, tables, blockquotes.
 *
 * For complex richText, write inline Lexical JSON directly in the seed.
 */

type LexicalTextNode = {
  type: 'text'
  detail: 0
  format: number
  mode: 'normal'
  style: ''
  text: string
  version: 1
}

type LexicalHeadingNode = {
  type: 'heading'
  children: LexicalTextNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  tag: 'h2' | 'h3' | 'h4'
  version: 1
}

type LexicalParagraphNode = {
  type: 'paragraph'
  children: LexicalTextNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  textFormat: 0
  version: 1
}

type LexicalListItemNode = {
  type: 'listitem'
  children: LexicalTextNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  value: number
  version: 1
}

type LexicalListNode = {
  type: 'list'
  children: LexicalListItemNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  listType: 'bullet' | 'number'
  start: 1
  tag: 'ul' | 'ol'
  version: 1
}

type LexicalNode = LexicalHeadingNode | LexicalParagraphNode | LexicalListNode

function textNode(text: string, bold = false): LexicalTextNode {
  return {
    type: 'text',
    detail: 0,
    format: bold ? 1 : 0, // 1 = bold in Lexical
    mode: 'normal',
    style: '',
    text,
    version: 1,
  }
}

function parseInlineFormatting(text: string): LexicalTextNode[] {
  const nodes: LexicalTextNode[] = []
  const parts = text.split(/(\*\*[^*]+\*\*)/)

  for (const part of parts) {
    if (!part) continue
    if (part.startsWith('**') && part.endsWith('**')) {
      nodes.push(textNode(part.slice(2, -2), true))
    } else {
      nodes.push(textNode(part))
    }
  }

  return nodes.length > 0 ? nodes : [textNode(text)]
}

export function markdownToLexical(markdown: string) {
  const lines = markdown.split('\n')
  const children: LexicalNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (line.trim() === '') {
      i++
      continue
    }

    // Headings
    const headingMatch = line.match(/^(#{2,4})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length as 2 | 3 | 4
      const tag = `h${level}` as 'h2' | 'h3' | 'h4'
      children.push({
        type: 'heading',
        children: [textNode(headingMatch[2])],
        direction: 'ltr',
        format: '',
        indent: 0,
        tag,
        version: 1,
      })
      i++
      continue
    }

    // List items (- or *)
    if (line.match(/^[-*]\s+/)) {
      const listItems: LexicalListItemNode[] = []
      let itemIndex = 1
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        const itemText = lines[i].replace(/^[-*]\s+/, '')
        listItems.push({
          type: 'listitem',
          children: parseInlineFormatting(itemText),
          direction: 'ltr',
          format: '',
          indent: 0,
          value: itemIndex++,
          version: 1,
        })
        i++
      }
      children.push({
        type: 'list',
        children: listItems,
        direction: 'ltr',
        format: '',
        indent: 0,
        listType: 'bullet',
        start: 1,
        tag: 'ul',
        version: 1,
      })
      continue
    }

    // Regular paragraph
    children.push({
      type: 'paragraph',
      children: parseInlineFormatting(line.trim()),
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      version: 1,
    })
    i++
  }

  return {
    root: {
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'root' as const,
      version: 1 as const,
    },
  }
}
