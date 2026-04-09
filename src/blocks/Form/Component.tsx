'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { BudouXClient } from '@/components/BudouX/client'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="site-container lg:max-w-[48rem]">
      {/* Intro content — visually distinct header area above the form card */}
      {enableIntro && introContent && !hasSubmitted && (
        <div className="mb-8 lg:mb-10 pb-8 border-b border-slate-200">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}

      {/* Form card */}
      <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-6 md:p-8">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div className="py-4">
              <RichText data={confirmationMessage} />
            </div>
          )}
          {isLoading && !hasSubmitted && (
            <p className="text-sm text-slate-600 py-4"><BudouXClient>送信中です。しばらくお待ちください...</BudouXClient></p>
          )}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {`${error.status || '500'}: ${error.message || ''}`}
            </div>
          )}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <div className="flex flex-col items-start gap-3">
                <Button
                  form={formID}
                  type="submit"
                  style={{ backgroundColor: 'var(--brand-alt)', borderColor: 'var(--brand-alt)' }}
                  className="text-white hover:opacity-90 transition-opacity px-8"
                >
                  {submitButtonLabel}
                </Button>
                <p className="text-xs text-slate-600">
                  <BudouXClient>通常2営業日以内にご返信いたします</BudouXClient>
                </p>
              </div>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
