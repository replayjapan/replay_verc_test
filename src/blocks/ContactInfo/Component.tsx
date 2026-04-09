'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { BudouXClient } from '@/components/BudouX/client'
import { getClientSideURL } from '@/utilities/getURL'

type ContactInfoProps = {
  companyName: string
  headingAlignment?: string | null
  description?: string | null
  address?: string | null
  phone?: string | null
  emailNote?: string | null
  hours?: string | null
  blockType?: 'contactInfo'
  blockName?: string | null
}

const inputClasses =
  'w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--brand-alt)] focus:border-[var(--brand-alt)] outline-none transition-colors'

export const ContactInfoBlock: React.FC<ContactInfoProps> = ({
  companyName,
  description,
  address,
  phone,
  emailNote,
  hours,
}) => {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formId, setFormId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch the Contact Form ID on mount
  useEffect(() => {
    const fetchFormId = async () => {
      try {
        const res = await fetch(`${getClientSideURL()}/api/forms?where[title][equals]=Contact Form&limit=1`, {
          credentials: 'include',
        })
        const data = await res.json()
        if (data.docs?.[0]?.id) {
          setFormId(String(data.docs[0].id))
        }
      } catch {
        // Form lookup failed — form will submit without ID
      }
    }
    fetchFormId()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const submissionData = Array.from(formData.entries()).map(([field, value]) => ({
      field,
      value: String(value),
    }))

    try {
      const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formId,
          submissionData,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('送信に失敗しました。もう一度お試しください。')
      }
    } catch {
      setError('送信に失敗しました。もう一度お試しください。')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: company info with icons */}
          <div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-slate-900 mb-6">
              <BudouXClient>{companyName}</BudouXClient>
            </h2>
            {description && (
              <p className="text-base md:text-lg leading-8 text-slate-700 max-w-lg mb-10">
                <BudouXClient>{description}</BudouXClient>
              </p>
            )}

            <dl className="space-y-6">
              {address && (
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <MapPin className="h-6 w-6 text-[var(--brand-alt)]" aria-hidden="true" />
                  </dt>
                  <dd className="text-slate-700">
                    <div className="font-semibold text-slate-900 mb-1">所在地</div>
                    {address.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))}
                  </dd>
                </div>
              )}
              {phone && (
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <Phone className="h-6 w-6 text-[var(--brand-alt)]" aria-hidden="true" />
                  </dt>
                  <dd className="text-slate-700">
                    <div className="font-semibold text-slate-900 mb-1">電話番号</div>
                    <a href={`tel:${phone}`} className="text-[var(--brand-primary)] underline decoration-1 underline-offset-4 hover:text-[var(--brand-alt)] transition-colors duration-200">
                      {phone}
                    </a>
                  </dd>
                </div>
              )}
              {emailNote && (
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <Mail className="h-6 w-6 text-[var(--brand-alt)]" aria-hidden="true" />
                  </dt>
                  <dd className="text-slate-700">
                    <div className="font-semibold text-slate-900 mb-1">メール対応</div>
                    {emailNote}
                  </dd>
                </div>
              )}
              {hours && (
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <Clock className="h-6 w-6 text-[var(--brand-alt)]" aria-hidden="true" />
                  </dt>
                  <dd className="text-slate-700">
                    <div className="font-semibold text-slate-900 mb-1">営業時間</div>
                    {hours}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Right: composed form card — matching showcase */}
          <div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">お問い合わせを受け付けました</h3>
                  <p className="text-sm text-slate-600 mb-6">内容を確認の上、ご連絡いたします。通常1営業日以内にご返信いたします。</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-[var(--brand-primary)] underline decoration-1 underline-offset-4 hover:text-[var(--brand-alt)] transition-colors duration-200"
                  >
                    もう一度送信する
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">お問い合わせフォーム</h3>
                  <p className="text-sm text-slate-600 mb-6">必要事項をご記入の上、送信してください。</p>

                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">お名前 *</label>
                      <input name="name" type="text" required className={inputClasses} placeholder="山田太郎" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">メールアドレス *</label>
                      <input name="email" type="email" required className={inputClasses} placeholder="taro@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">電話番号</label>
                      <input name="phone" type="tel" className={inputClasses} placeholder="03-1234-5678" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">お問い合わせの種類</label>
                      <select name="type" className={inputClasses}>
                        <option value="">選択してください</option>
                        <option value="domain">ドメインに関するお問い合わせ</option>
                        <option value="development">開発のご相談</option>
                        <option value="marketing">マーケティングのご相談</option>
                        <option value="other">その他</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">メッセージ *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className={inputClasses}
                        placeholder="ご質問やご要望をご記入ください"
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-600">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[var(--brand-primary)] text-white font-semibold py-3.5 rounded-lg hover:bg-[var(--brand-alt)] hover:text-[var(--brand-primary)] transition-colors duration-200 flex items-center justify-center gap-2 text-base disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {submitting ? '送信中...' : '送信する'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
