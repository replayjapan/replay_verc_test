/**
 * Wrap a plain-text string in minimal Lexical JSON for storage in Payload richText fields.
 *
 * The structure matches what Payload 3.77.0 expects:
 *   root > paragraph > text
 *
 * IMPORTANT: `textFormat: 0` is required on paragraph nodes — without it
 * Payload's type system rejects the value ("Property 'textFormat' is missing").
 */
/**
 * Wrap multiple plain-text paragraphs in Lexical JSON.
 * Each string in the array becomes a separate paragraph node.
 */
export function toLexicalParagraphs(paragraphs: string[]) {
  return {
    root: {
      children: paragraphs.map((text) => ({
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal' as const,
            style: '',
            text,
            type: 'text' as const,
            version: 1 as const,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        type: 'paragraph' as const,
        textFormat: 0,
        version: 1 as const,
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'root' as const,
      version: 1 as const,
    },
  }
}

export function toLexicalJSON(text: string) {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal' as const,
              style: '',
              text,
              type: 'text' as const,
              version: 1 as const,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          type: 'paragraph' as const,
          textFormat: 0,
          version: 1 as const,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'root' as const,
      version: 1 as const,
    },
  }
}
