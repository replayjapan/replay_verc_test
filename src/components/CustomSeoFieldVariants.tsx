'use client'

import React from 'react'
import type { TextFieldClientComponent, TextareaFieldClientComponent } from 'payload'
import CustomSeoTextField from './CustomSeoTextField'

export const CustomSeoTitleField: TextFieldClientComponent = (props) => {
  const label = typeof props.field?.label === 'string' ? props.field.label : 'Meta Title'

  return (
    <CustomSeoTextField {...props} fieldType="title" context="meta" isTextArea={false} label={label} />
  )
}

export const CustomSeoDescriptionField: TextareaFieldClientComponent = (props) => {
  const label = typeof props.field?.label === 'string' ? props.field.label : 'Meta Description'

  return (
    <CustomSeoTextField
      {...props}
      fieldType="description"
      context="meta"
      isTextArea={true}
      label={label}
    />
  )
}

export const CustomSeoOgTitleField: TextFieldClientComponent = (props) => {
  const label = typeof props.field?.label === 'string' ? props.field.label : 'Open Graph Title'

  return (
    <CustomSeoTextField {...props} fieldType="title" context="og" isTextArea={false} label={label} />
  )
}

export const CustomSeoOgDescriptionField: TextareaFieldClientComponent = (props) => {
  const label =
    typeof props.field?.label === 'string' ? props.field.label : 'Open Graph Description'

  return (
    <CustomSeoTextField
      {...props}
      fieldType="description"
      context="og"
      isTextArea={true}
      label={label}
    />
  )
}
