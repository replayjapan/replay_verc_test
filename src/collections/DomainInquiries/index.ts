import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { notifyOnInquiry } from './hooks/notifyOnInquiry'
import { populateDomainName } from './hooks/populateDomainName'
import { rejectHoneypot } from './hooks/rejectHoneypot'

const budgetOptions = [
  { label: '10万円未満', value: 'under_100k' },
  { label: '10万円〜30万円', value: '100k_300k' },
  { label: '30万円〜50万円', value: '300k_500k' },
  { label: '50万円〜100万円', value: '500k_1m' },
  { label: '100万円以上', value: 'over_1m' },
]

export const DomainInquiries: CollectionConfig = {
  slug: 'domain-inquiries',
  access: {
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['domainName', 'name', 'email', 'status', 'createdAt'],
    group: 'Domain Portfolio',
    useAsTitle: 'domainName',
  },
  hooks: {
    beforeValidate: [rejectHoneypot],
    beforeChange: [populateDomainName],
    afterChange: [notifyOnInquiry],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Visitor name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Visitor email address',
      },
    },
    {
      name: 'domain',
      type: 'relationship',
      relationTo: 'domains',
      required: true,
      admin: {
        description: 'The domain this inquiry is about',
      },
    },
    {
      name: 'domainName',
      type: 'text',
      admin: {
        description: 'Denormalized domain name — auto-populated from domain relationship',
        readOnly: true,
      },
    },
    {
      name: 'offer',
      type: 'text',
      admin: {
        description: 'Visitor offer amount (free text, e.g. "500,000")',
      },
    },
    {
      name: 'budget',
      type: 'select',
      options: budgetOptions,
      admin: {
        description: 'Budget range selected by the visitor',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Inquiry message from the visitor',
      },
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        hidden: true,
        description: 'Honeypot field — should always be empty. Bots fill this in.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        description: 'Inquiry tracking status',
        position: 'sidebar',
      },
    },
  ],
}

export default DomainInquiries
