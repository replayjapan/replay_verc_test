'use client'

import { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'
import type { Form as PayloadForm, FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

import { BudouXClient } from '@/components/BudouX/client'
import { FormBlock } from '@/blocks/Form/Component'
import { presentPrice } from '@/lib/domain-utils'
import type { Domain, DomainSettings } from '@/types/domain-types'

interface PayloadContactModalProps {
  domain: Domain
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: DomainSettings
  locale: string
}

interface FormsResponse {
  docs: PayloadForm[]
}

const findFormTemplate = (forms: PayloadForm[]): PayloadForm | null => {
  const primary = forms.find((form) => form.title?.toLowerCase() === 'domain inquiry form')
  if (primary) {
    return primary
  }

  const fallback = forms.find((form) => form.title?.toLowerCase().includes('domain'))
  return fallback ?? null
}

const enhanceFields = (fields: FormFieldBlock[], domain: Domain): FormFieldBlock[] =>
  fields.map((field) => {
    if (!field) {
      return field
    }

    const clonedField = structuredClone(field) as FormFieldBlock & {
      defaultValue?: unknown
      min?: number
    }

    if ('name' in clonedField && clonedField.name === 'domain_name') {
      clonedField.defaultValue = domain.domainName
      return clonedField
    }

    if ('name' in clonedField && clonedField.name === 'domain_id') {
      clonedField.defaultValue = domain.id
      return clonedField
    }

    return field
  })

export const PayloadContactModal: React.FC<PayloadContactModalProps> = ({ domain, open, onOpenChange, settings, locale }) => {
  const [form, setForm] = useState<PayloadForm | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const fetchForm = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/forms?depth=1&draft=false&limit=100', {
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('Unable to load forms. Ensure the Form Builder plugin is configured.')
        }

        const data = (await response.json()) as FormsResponse
        const template = findFormTemplate(data.docs)

        if (!template) {
          throw new Error('No domain inquiry form found. Create one titled "Domain Inquiry Form".')
        }

        const hydratedForm: PayloadForm = {
          ...template,
          fields: template.fields ? enhanceFields(template.fields as FormFieldBlock[], domain) : [],
        }

        setForm(hydratedForm)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load contact form.'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void fetchForm()
  }, [domain, open])

  const handleClose = () => {
    onOpenChange(false)
    setForm(null)
    setError(null)
    setLoading(false)
  }

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close contact modal"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
        type="button"
      />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <header className="border-b border-surface/80 bg-surface px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-primary">
                {settings.contactForm.heading || 'Contact About This Domain'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {settings.contactForm.description || 'Fill out the form and we will reply within one business day.'}
              </p>
            </div>
          </div>
        </header>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-6">
          <div className="mb-4 rounded-lg border border-alt/40 bg-alt/10 p-4">
            <p className="text-sm font-semibold text-primary"><BudouXClient>{`最低希望価格: ${presentPrice(domain, settings, locale)}`}</BudouXClient></p>
            <p className="text-sm text-muted-foreground">{domain.description}</p>
          </div>

          {loading && (
            <div className="flex flex-col items-center gap-2 py-10 text-sm text-muted-foreground">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
              Loading contact form…
            </div>
          )}

          {error && (
            <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          )}

          {form && !loading && !error && (
            <FormBlock
              enableIntro={false}
              form={form}
              introContent={undefined}
            />
          )}
        </div>

        <div className="flex justify-end border-t border-surface/70 bg-surface px-6 py-4">
          <button
            className="rounded-md border border-surface/70 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            onClick={handleClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PayloadContactModal
