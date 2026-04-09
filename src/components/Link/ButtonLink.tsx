import React from 'react'
import { cn } from '@/utilities/ui'
import { BudouX } from '@/components/BudouX'
import { StandardLink } from './StandardLink'
import type { LinkData } from './StandardLink'

export type ButtonColor = 'brand-primary' | 'brand-alt' | 'white' | 'dark'
export type ButtonVariant = 'filled' | 'outline' | 'ghost'
export type ButtonSize = 'small' | 'default' | 'large'

export type ButtonLinkProps = {
  link: LinkData
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children?: React.ReactNode
}

const sizeClasses: Record<ButtonSize, string> = {
  small: 'px-4 py-2 text-sm',
  default: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
}

function getColorClasses(color: ButtonColor, variant: ButtonVariant): string {
  if (variant === 'filled') {
    switch (color) {
      case 'brand-primary':
        return 'bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-alt)] hover:text-[var(--brand-primary)]'
      case 'brand-alt':
        return 'bg-[var(--brand-alt)] text-white hover:bg-[var(--brand-primary)]'
      case 'white':
        return 'bg-white text-slate-900 hover:bg-slate-100'
      case 'dark':
        return 'bg-slate-900 text-white hover:bg-[var(--brand-alt)] hover:text-[var(--brand-primary)]'
    }
  }

  if (variant === 'outline') {
    switch (color) {
      case 'brand-primary':
        return 'border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white'
      case 'brand-alt':
        return 'border border-[var(--brand-alt)] text-[var(--brand-alt)] hover:bg-[var(--brand-alt)] hover:text-white'
      case 'white':
        return 'border border-white text-white hover:bg-white hover:text-[var(--brand-primary)]'
      case 'dark':
        return 'border border-slate-900 text-slate-900 hover:bg-[var(--brand-primary)] hover:text-white'
    }
  }

  // ghost
  switch (color) {
    case 'brand-primary':
      return 'text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10'
    case 'brand-alt':
      return 'text-[var(--brand-alt)] hover:bg-[var(--brand-alt)]/10'
    case 'white':
      return 'text-white hover:bg-white/10'
    case 'dark':
      return 'text-slate-900 hover:bg-slate-100'
  }
}

/**
 * Button-style link component.
 * Wraps StandardLink for all link logic (internal/external resolution, rel, UTM, anchor, aria).
 * Adds visual button layer with color, variant, and size options.
 *
 * Color and variant default to brand-alt filled — editor overrides take precedence.
 */
export function ButtonLink({
  link,
  color = 'brand-alt',
  variant = 'filled',
  size = 'default',
  className,
  children,
}: ButtonLinkProps) {
  const colorClasses = getColorClasses(color, variant)
  const sizeClass = sizeClasses[size]

  return (
    <StandardLink
      link={link}
      className={cn(
        'inline-block rounded-md font-medium transition-colors duration-200',
        colorClasses,
        sizeClass,
        className,
      )}
    >
      {children ?? (typeof link.label === 'string' ? <BudouX>{link.label}</BudouX> : link.label)}
    </StandardLink>
  )
}
