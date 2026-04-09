/**
 * Convert a Unicode domain name to its ASCII/punycode form.
 * Uses the URL constructor for standards-compliant IDN conversion.
 */
export const toASCII = (native: string): string => {
  try {
    const url = new URL(`https://${native}`)
    return url.hostname
  } catch {
    return native
  }
}
