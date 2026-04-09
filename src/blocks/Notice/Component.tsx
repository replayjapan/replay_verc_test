'use client'

import React, { useState } from 'react'
import {
  Info,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Star,
  Bell,
  Shield,
  Zap,
  Heart,
  X,
  type LucideIcon,
} from 'lucide-react'
import RichText from '@/components/RichText'

import type { NoticeBlock as NoticeBlockProps } from '@/payload-types'
import { BudouXClient } from '@/components/BudouX/client'
import { alignmentClass } from '@/utilities/alignmentClass'

type NoticeVariant = 'info' | 'warning' | 'success' | 'tip' | 'slim'

const variantConfig: Record<NoticeVariant, {
  icon: LucideIcon
  bg: string
  accentBorder: string
  iconBg: string
  iconColor: string
  titleColor: string
}> = {
  info: {
    icon: Info,
    bg: 'bg-blue-50/60',
    accentBorder: 'border-l-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50/60',
    accentBorder: 'border-l-amber-500',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-50/60',
    accentBorder: 'border-l-emerald-500',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    titleColor: 'text-emerald-900',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-violet-50/60',
    accentBorder: 'border-l-violet-500',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    titleColor: 'text-violet-900',
  },
  slim: {
    icon: Info,
    bg: '',
    accentBorder: '',
    iconBg: '',
    iconColor: '',
    titleColor: '',
  },
}

const customIconMap: Record<string, LucideIcon> = {
  Info, AlertTriangle, CheckCircle, Lightbulb, Star, Bell, Shield, Zap, Heart,
}

export const NoticeBlock: React.FC<NoticeBlockProps> = ({
  variant,
  useCustomStyle,
  customBackgroundColor,
  customIcon,
  title,
  headingAlignment,
  content,
  dismissible,
}) => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null
  if (!content) return null

  const v = (variant || 'info') as NoticeVariant

  // Slim banner variant — thin bg-brand-alt/10 strip
  if (v === 'slim') {
    return (
      <div className="bg-[var(--brand-alt)]/10 border-b border-[var(--brand-alt)]/20" role="alert">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="text-sm text-slate-700 [&_p]:m-0">
            <RichText data={content} enableGutter={false} enableProse={false} />
          </div>
        </div>
      </div>
    )
  }

  const config = variantConfig[v]
  const IconComponent = useCustomStyle && customIcon
    ? customIconMap[customIcon] || config.icon
    : config.icon

  const customBgStyle = useCustomStyle && customBackgroundColor
    ? { backgroundColor: customBackgroundColor }
    : undefined

  return (
    <div
      className={`relative overflow-hidden rounded-xl border-l-4 transition-all duration-300 ${
        customBgStyle ? 'border-l-slate-400' : `${config.bg} ${config.accentBorder}`
      }`}
      style={customBgStyle}
      role="alert"
    >
      <div className="flex gap-4 p-5">
        <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
          useCustomStyle ? 'bg-black/[0.06] text-slate-700' : `${config.iconBg} ${config.iconColor}`
        }`}>
          <IconComponent className="w-[18px] h-[18px]" strokeWidth={2} />
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          {title && (
            <h3 className={`font-semibold text-[15px] leading-snug mb-1.5 ${alignmentClass(headingAlignment)} ${
              useCustomStyle ? 'text-slate-900' : config.titleColor
            }`}>
              <BudouXClient>{title}</BudouXClient>
            </h3>
          )}
          <div className="text-[14px] text-slate-700 leading-relaxed [&_p]:m-0">
            <RichText data={content} enableGutter={false} enableProse={false} />
          </div>
        </div>

        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-black/[0.04] transition-all duration-200"
            aria-label="閉じる"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
