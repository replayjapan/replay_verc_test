import type { CheckboxField, TextField } from 'payload'

import { formatSlugHook } from './formatSlug'

type Overrides = {
  checkboxOverrides?: Partial<CheckboxField>
  slugOverrides?: Partial<TextField>
}

export const slugField = (fieldToUse = 'title', overrides: Overrides = {}) => {
  const { checkboxOverrides, slugOverrides } = overrides

  const checkboxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
      ...checkboxOverrides?.admin,
    },
    ...checkboxOverrides,
  }

  const beforeValidateHooks = [
    ...(slugOverrides?.hooks?.beforeValidate ?? []),
    formatSlugHook(fieldToUse),
  ]

  const adminComponents = {
    ...slugOverrides?.admin?.components,
    Field: {
      path: '@/fields/slug/SlugComponent#SlugComponent',
      clientProps: {
        checkboxFieldPath: checkboxField.name,
        fieldToUse,
      },
    },
  }

  const slugFieldConfig = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    ...slugOverrides,
    hooks: {
      ...slugOverrides?.hooks,
      beforeValidate: beforeValidateHooks,
    },
    admin: {
      position: 'sidebar',
      ...slugOverrides?.admin,
      components: adminComponents,
    },
  } as TextField

  return [slugFieldConfig, checkboxField]
}

export default slugField
