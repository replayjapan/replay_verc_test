/**
 * Shared field validators for Payload CMS collections.
 * Extracted from inline validators in M14 collections (M14b audit).
 */

export const validateUrl = (val: string | null | undefined): string | true => {
  if (!val) return true
  // Accept relative paths (e.g., /domains, /services)
  if (val.startsWith('/')) return true
  try {
    new URL(val)
    return true
  } catch {
    return 'Please enter a valid URL (e.g., https://example.com or /path)'
  }
}

export const validateHexColor = (val: string | null | undefined): string | true => {
  if (!val) return true
  if (!/^#[0-9A-Fa-f]{6}$/.test(val)) {
    return 'Color must be a valid hex color (e.g., #EF4444)'
  }
  return true
}
