const alignmentMap: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

/** Map a headingAlignment value to its Tailwind class, avoiding dynamic interpolation. */
export function alignmentClass(alignment?: string | null): string {
  return alignmentMap[alignment || 'center'] || 'text-center'
}
