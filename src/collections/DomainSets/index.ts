import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const DomainSets: CollectionConfig = {
  slug: 'domain-sets',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'policy', 'updatedAt'],
    group: 'Domain Portfolio',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for this domain set (e.g. "Tokyo Business Bundle").',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-safe identifier. Latin-only, lowercase, hyphens.',
      },
    },
    {
      name: 'policy',
      type: 'select',
      required: true,
      defaultValue: 'allow_individual',
      options: [
        { label: 'セットのみ受付 (Bundle Only)', value: 'bundle_only' },
        { label: 'セット優先 (Preferred Bundle)', value: 'preferred_bundle' },
        { label: '個別受付可 (Allow Individual)', value: 'allow_individual' },
      ],
      admin: {
        description:
          'Sales policy for this set. Strictest-set-wins applies when a domain is in multiple sets.',
      },
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'domains',
      hasMany: true,
      admin: {
        description: 'Domains included in this set.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description shown when this set is listed.',
      },
    },
  ],
}

export default DomainSets
