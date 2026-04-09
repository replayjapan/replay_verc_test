export interface RichSummaryCardProps {
  title: string
  description: React.ReactNode
  bullets?: string[]
  imageUrl?: string
  /** Render bullets in a 2-column grid instead of a single list */
  bulletsGrid?: boolean
}
