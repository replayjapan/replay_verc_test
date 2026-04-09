import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { generateSlugHook, validateSlug } from '../../utilities/generateSlug'
import { validateHexColor } from '../../utilities/validators'

export const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description'],
    group: 'Services',
    description: 'Categories for organizing services',
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [generateSlugHook('name')],
      },
      validate: (val: string | null | undefined) => validateSlug(val as string),
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Optional color for category badges (e.g., #EF4444)',
        placeholder: '#EF4444',
      },
      validate: validateHexColor,
    },
  ],
}

export default ServiceCategories
