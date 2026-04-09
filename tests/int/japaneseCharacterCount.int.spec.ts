import { describe, test, expect } from 'vitest'
import {
  isFullWidth,
  countJapaneseCharacters,
  validateJapaneseLength,
} from '../../src/utilities/japaneseCharacterCount'

describe('Japanese Character Counting', () => {
  describe('isFullWidth', () => {
    test('identifies full-width Japanese characters', () => {
      // Hiragana
      expect(isFullWidth('あ')).toBe(true)
      expect(isFullWidth('が')).toBe(true)

      // Katakana
      expect(isFullWidth('ア')).toBe(true)
      expect(isFullWidth('ガ')).toBe(true)

      // Kanji
      expect(isFullWidth('中')).toBe(true)
      expect(isFullWidth('国')).toBe(true)

      // Full-width symbols
      expect(isFullWidth('！')).toBe(true)
      expect(isFullWidth('？')).toBe(true)
    })

    test('identifies half-width characters', () => {
      // ASCII letters
      expect(isFullWidth('a')).toBe(false)
      expect(isFullWidth('Z')).toBe(false)

      // Numbers
      expect(isFullWidth('1')).toBe(false)
      expect(isFullWidth('9')).toBe(false)

      // Symbols
      expect(isFullWidth('!')).toBe(false)
      expect(isFullWidth('?')).toBe(false)

      // Spaces
      expect(isFullWidth(' ')).toBe(false)
    })
  })

  describe('countJapaneseCharacters', () => {
    test('counts mixed Japanese and English text correctly', () => {
      // "Hello Japan" in mixed English/Japanese
      expect(countJapaneseCharacters('Hello日本')).toBe(9) // 5 + 4

      // All Japanese
      expect(countJapaneseCharacters('こんにちは')).toBe(10) // 5 * 2

      // All English
      expect(countJapaneseCharacters('Hello')).toBe(5) // 5 * 1

      // Mixed with numbers and symbols
      expect(countJapaneseCharacters('Hello世界123!')).toBe(13) // 5 + 4 + 4
    })

    test('handles empty and null strings', () => {
      expect(countJapaneseCharacters('')).toBe(0)
      expect(countJapaneseCharacters(null)).toBe(0)
      expect(countJapaneseCharacters(undefined)).toBe(0)
    })
  })

  describe('validateJapaneseLength', () => {
    test('validates text within limits', () => {
      const result = validateJapaneseLength('Hello', 10)
      expect(result.isValid).toBe(true)
      expect(result.count).toBe(5)
      expect(result.remaining).toBe(5)
    })

    test('validates text over limits', () => {
      const result = validateJapaneseLength('こんにちは世界', 10) // 14 characters
      expect(result.isValid).toBe(false)
      expect(result.count).toBe(14)
      expect(result.remaining).toBe(0)
    })

    test('validates text exactly at limit', () => {
      const result = validateJapaneseLength('Hello', 5)
      expect(result.isValid).toBe(true)
      expect(result.count).toBe(5)
      expect(result.remaining).toBe(0)
    })
  })
})
