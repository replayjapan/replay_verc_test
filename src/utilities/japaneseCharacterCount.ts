/**
 * Japanese Character Counting Utility
 * Full-width characters count as 2, half-width characters count as 1
 */

/**
 * Check if a character is full-width (counts as 2 characters)
 * This includes Japanese hiragana, katakana, kanji, and full-width symbols
 */
export function isFullWidth(char: string): boolean {
  const code = char.codePointAt(0)
  if (code === undefined) return false

  // Full-width ranges:
  // 0x3000-0x303F: CJK Symbols and Punctuation
  // 0x3040-0x309F: Hiragana
  // 0x30A0-0x30FF: Katakana
  // 0x4E00-0x9FFF: CJK Unified Ideographs (Kanji)
  // 0xFF00-0xFFEF: Halfwidth and Fullwidth Forms
  return (
    (code >= 0x3000 && code <= 0x303f) || // CJK Symbols
    (code >= 0x3040 && code <= 0x309f) || // Hiragana
    (code >= 0x30a0 && code <= 0x30ff) || // Katakana
    (code >= 0x4e00 && code <= 0x9fff) || // Kanji
    (code >= 0xff00 && code <= 0xffef) // Full-width forms
  )
}

/**
 * Count characters with Japanese character weighting
 * Full-width characters = 2, half-width characters = 1
 */
export function countJapaneseCharacters(text: string | null | undefined): number {
  if (!text) return 0

  let count = 0
  for (const char of text) {
    count += isFullWidth(char) ? 2 : 1
  }

  return count
}

/**
 * Validate text length against Japanese character limits
 */
export function validateJapaneseLength(
  text: string | null | undefined,
  limit: number,
): {
  isValid: boolean
  count: number
  remaining: number
} {
  const count = countJapaneseCharacters(text)

  return {
    isValid: count <= limit,
    count,
    remaining: Math.max(0, limit - count),
  }
}
