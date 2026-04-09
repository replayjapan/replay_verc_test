import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const DomainCategory: CollectionConfig = {
  slug: 'domain-category',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Domain Portfolio',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'icon',
      type: 'select',
      admin: {
        isClearable: true,
      },
      options: [
        { label: 'Buildings', value: 'buildings' },
        { label: 'Shopping Cart', value: 'shopping-cart' },
        { label: 'Server', value: 'server' },
        { label: 'Credit Card', value: 'credit-card' },
        { label: 'Briefcase', value: 'briefcase' },
        { label: 'Heart', value: 'heart' },
        { label: 'Utensils', value: 'utensils' },
        { label: 'Plane', value: 'plane' },
        { label: 'Graduation Cap', value: 'graduation-cap' },
        { label: 'Car', value: 'car' },
        { label: 'Gamepad', value: 'gamepad' },
        { label: 'Gem', value: 'gem' },
      ],
    },
  ],
}

export default DomainCategory
