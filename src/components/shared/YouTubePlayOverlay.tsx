import type { FC } from 'react'

type Size = 'sm' | 'md' | 'lg'

interface YouTubePlayOverlayProps {
  /** Size of the play button. sm≈48×34, md≈68×48, lg≈88×62. Default: md. */
  size?: Size
  /** Additional className for the absolute-center wrapper. */
  className?: string
}

// YouTube's play button is a wide rectangle (~68×48, roughly 1.42:1 ratio)
// with softly rounded corners and a chunky centered triangle.
const sizeClasses: Record<Size, { container: string; rounded: string }> = {
  sm: { container: 'w-12 h-[34px]', rounded: 'rounded-[8px]' },
  md: { container: 'w-[68px] h-12', rounded: 'rounded-[12px]' },
  lg: { container: 'w-[88px] h-[62px]', rounded: 'rounded-[14px]' },
}

/**
 * YouTube-style play overlay — red rounded rectangle with a white triangle.
 * CSS/SVG only. Does not use YouTube trademarked assets.
 *
 * Wide 1.42:1 aspect matches YouTube's familiar player-button shape.
 * Semi-transparent on idle (`opacity-85`), full opacity on hover
 * (driven by the parent's `group-hover:` class). Always absolute-centered
 * inside a `relative` parent container.
 */
export const YouTubePlayOverlay: FC<YouTubePlayOverlayProps> = ({ size = 'md', className = '' }) => {
  const { container, rounded } = sizeClasses[size]

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
      <div
        className={`${container} ${rounded} bg-red-600 flex items-center justify-center shadow-lg opacity-85 group-hover:opacity-100 transition-opacity duration-200`}
      >
        {/* Chunky equilateral triangle, ~40% of container width, optically centered */}
        <svg
          viewBox="0 0 24 24"
          className="h-[45%] w-auto fill-white translate-x-[1px]"
          aria-hidden="true"
        >
          <path d="M6 4v16l14-8z" />
        </svg>
      </div>
    </div>
  )
}

export default YouTubePlayOverlay
