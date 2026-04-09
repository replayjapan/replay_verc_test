import React from 'react'

import RichText from '@/components/RichText'

// Dead code — hero removed from Pages in M22. Kept for reference.
type LowImpactHeroType = {
  children?: React.ReactNode
  richText?: Parameters<typeof RichText>[0]['data'] | null
}

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="site-container mt-16">
      <div className="max-w-[48rem]">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
