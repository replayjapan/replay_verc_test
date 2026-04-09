'use client'

import type React from 'react'
import { useCallback, useEffect } from 'react'
import type { TextFieldClientProps } from 'payload'
import { Button, FieldLabel, TextInput, useField, useForm, useFormFields } from '@payloadcms/ui'

import { formatSlug } from './formatSlug'
import './index.scss'

type SlugComponentProps = TextFieldClientProps & {
  checkboxFieldPath: string
  fieldToUse: string
}

export const SlugComponent: React.FC<SlugComponentProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { value, setValue } = useField<string>({ path: path || field.name })

  const { dispatchFields } = useForm()

  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as boolean | undefined
  })

  const targetFieldValue = useFormFields(([fields]) => {
    const targetValue = fields[fieldToUse]?.value
    return typeof targetValue === 'string' ? targetValue : ''
  })

  useEffect(() => {
    if (!checkboxValue) {
      return
    }

    if (targetFieldValue) {
      const formattedSlug = formatSlug(targetFieldValue)

      if (value !== formattedSlug) {
        setValue(formattedSlug)
      }
    } else if (value !== '') {
      setValue('')
    }
  }, [checkboxValue, setValue, targetFieldValue, value])

  const handleLock = useCallback(
    (event: React.MouseEvent<Element>) => {
      event.preventDefault()

      dispatchFields({
        path: checkboxFieldPath,
        type: 'UPDATE',
        value: !checkboxValue,
      })
    },
    [checkboxFieldPath, checkboxValue, dispatchFields],
  )

  const readOnly = readOnlyFromProps || checkboxValue

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button buttonStyle="none" className="lock-button" onClick={handleLock}>
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
        value={value}
      />
    </div>
  )
}

export default SlugComponent
