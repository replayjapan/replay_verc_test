'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { BudouXClient } from '@/components/BudouX/client'
import { Money } from '@/components/domains/Money/Component'
import { getClientSideURL } from '@/utilities/getURL'
import type { InquiryFormCardProps } from './types'

const budgetOptions = [
  { value: '', label: '予算レンジを選択' },
  { value: 'under_100k', label: '10万円未満' },
  { value: '100k_300k', label: '10万円〜30万円' },
  { value: '300k_500k', label: '30万円〜50万円' },
  { value: '500k_1m', label: '50万円〜100万円' },
  { value: 'over_1m', label: '100万円以上' },
]

const inputClasses =
  'w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-alt focus:border-brand-alt outline-none'

export function InquiryFormCard({
  domainId,
  domainName,
  minimumOffer,
  currency = 'jpy',
}: InquiryFormCardProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)

    // Honeypot check — if the hidden field has a value, silently "succeed"
    if (formData.get('website')) {
      setSubmitted(true)
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch(`${getClientSideURL()}/api/domain-inquiries?depth=0`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          domain: Number(domainId),
          domainName,
          offer: formData.get('offer') || undefined,
          budget: formData.get('budget') || undefined,
          message: formData.get('message'),
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        const msg = body?.errors?.[0]?.message || '送信に失敗しました。もう一度お試しください。'
        setError(msg)
        return
      }

      setSubmitted(true)
    } catch {
      setError('ネットワークエラーが発生しました。もう一度お試しください。')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">お問い合わせありがとうございます</h3>
          <p className="text-sm text-slate-600 mb-4">内容を確認の上、ご連絡いたします。</p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-sm text-brand-primary hover:text-brand-alt hover:underline transition-colors"
          >
            もう一度送信する
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border-2 border-brand-alt bg-brand-alt/5 p-6">
      {/* Urgency-free CTA hook */}
      <p className="text-xs font-semibold tracking-widest text-brand-alt mb-3">
        このドメインに興味がありますか？
      </p>
      <h3 className="text-lg font-bold text-slate-900 mb-1"><BudouXClient>ドメインお問い合わせ</BudouXClient></h3>
      <p className="text-sm text-slate-600 mb-4">
        <BudouXClient>{`${domainName} についてのお問い合わせ`}</BudouXClient>
      </p>

      {minimumOffer !== undefined && minimumOffer > 0 && (
        <div className="rounded-lg border border-brand-alt/30 bg-white p-3 mb-4 text-sm flex items-center justify-between">
          <span className="text-slate-600"><BudouXClient>最低希望価格</BudouXClient></span>
          <Money amount={minimumOffer} currency={currency} size="sm" className="font-bold text-slate-900 text-base" />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 mb-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — hidden from real users, bots fill it in */}
        <div className="absolute overflow-hidden" style={{ width: 0, height: 0, opacity: 0 }} aria-hidden="true" tabIndex={-1}>
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" autoComplete="off" tabIndex={-1} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1"><BudouXClient>お名前 *</BudouXClient></label>
          <input name="name" type="text" required className={inputClasses} placeholder="山田太郎" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1"><BudouXClient>メールアドレス *</BudouXClient></label>
          <input name="email" type="email" required className={inputClasses} placeholder="taro@example.com" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1"><BudouXClient>希望価格</BudouXClient></label>
            <input name="offer" type="text" className={inputClasses} placeholder="500,000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1"><BudouXClient>予算レンジ</BudouXClient></label>
            <select name="budget" className={inputClasses}>
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1"><BudouXClient>メッセージ *</BudouXClient></label>
          <textarea
            name="message"
            required
            rows={4}
            className={inputClasses}
            placeholder="ご質問やご要望をご記入ください"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-alt text-brand-primary font-bold py-3.5 text-base rounded-lg hover:bg-brand-primary hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <BudouXClient>{submitting ? '送信中...' : 'お問い合わせを送る'}</BudouXClient>
        </button>
      </form>
    </div>
  )
}
