import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Globals',
  },
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Domains Portfolio',
    },
    {
      name: 'language',
      type: 'select',
      required: true,
      defaultValue: 'english',
      options: [
        { label: 'English', value: 'english' },
        { label: 'Japanese', value: 'japanese' },
      ],
    },
    {
      name: 'locale',
      type: 'select',
      required: true,
      defaultValue: 'en-US',
      options: [
        { label: 'English (United States)', value: 'en-US' },
        { label: 'English (United Kingdom)', value: 'en-GB' },
        { label: 'Japanese', value: 'ja-JP' },
      ],
    },
    {
      name: 'brand',
      label: 'Brand Colors',
      type: 'group',
      fields: [
        {
          name: 'primary',
          type: 'text',
          required: true,
          defaultValue: '#1B243F',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          defaultValue: '#F0A848',
        },
        {
          name: 'background',
          type: 'text',
          required: true,
          defaultValue: '#FFFFFF',
        },
        {
          name: 'surface',
          type: 'text',
          required: true,
          defaultValue: '#F5F7FF',
        },
        {
          name: 'copy',
          label: 'Primary Text',
          type: 'text',
          required: true,
          defaultValue: '#1F2933',
        },
        {
          name: 'muted',
          label: 'Muted Text',
          type: 'text',
          required: true,
          defaultValue: '#6B7280',
        },
        {
          name: 'border',
          type: 'text',
          required: true,
          defaultValue: '#E2E8F0',
        },
      ],
    },
    {
      name: 'typography',
      type: 'group',
      fields: [
        {
          name: 'headingWeight',
          type: 'select',
          defaultValue: '600',
          options: [
            { label: 'Normal', value: '400' },
            { label: 'Medium', value: '500' },
            { label: 'Semi Bold', value: '600' },
            { label: 'Bold', value: '700' },
          ],
        },
        {
          name: 'bodyWeight',
          type: 'select',
          defaultValue: '400',
          options: [
            { label: 'Light', value: '300' },
            { label: 'Normal', value: '400' },
            { label: 'Medium', value: '500' },
          ],
        },
        {
          name: 'baseSize',
          type: 'select',
          defaultValue: '16px',
          options: [
            { label: 'Small (14px)', value: '14px' },
            { label: 'Default (16px)', value: '16px' },
            { label: 'Large (18px)', value: '18px' },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'group',
      fields: [
        {
          name: 'containerWidth',
          type: 'select',
          defaultValue: '1140px',
          options: [
            { label: 'Narrow (960px)', value: '960px' },
            { label: 'Standard (1140px)', value: '1140px' },
            { label: 'Wide (1320px)', value: '1320px' },
            { label: 'Full Width', value: '100%' },
          ],
        },
        {
          name: 'borderRadius',
          type: 'select',
          defaultValue: '12px',
          options: [
            { label: 'None', value: '0px' },
            { label: 'Subtle (8px)', value: '8px' },
            { label: 'Rounded (12px)', value: '12px' },
            { label: 'Pill (9999px)', value: '9999px' },
          ],
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO Defaults',
          fields: [
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Default OG Image',
              admin: {
                description: 'Default Open Graph image used when a page has no specific OG image set. Recommended size: 1200x630px.',
              },
            },
            {
              name: 'defaultOgTitle',
              type: 'text',
              label: 'Default OG Title',
              admin: {
                description: 'Fallback Open Graph title when a page has no ogTitle set.',
              },
            },
            {
              name: 'defaultOgDescription',
              type: 'textarea',
              label: 'Default OG Description',
              admin: {
                description: 'Fallback Open Graph description when a page has no ogDescription set.',
              },
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              label: 'Site Description',
              admin: {
                description: 'Used in JSON-LD Organization schema and as a general meta description fallback.',
              },
            },
          ],
        },
        {
          label: 'Tracking & Verification',
          fields: [
            {
              name: 'gtmContainerId',
              type: 'text',
              label: 'GTM Container ID',
              admin: {
                description: 'Google Tag Manager container ID (e.g., GTM-XXXXXX)',
              },
            },
            {
              name: 'gaMeasurementId',
              type: 'text',
              label: 'GA Measurement ID',
              admin: {
                description: 'Google Analytics measurement ID (e.g., G-XXXXXXX)',
              },
            },
            {
              name: 'googleSearchConsoleCode',
              type: 'text',
              label: 'Google Search Console Verification',
              admin: {
                description: 'Google Search Console verification code (the content value from the meta tag)',
              },
            },
            {
              name: 'enableCookieConsent',
              type: 'checkbox',
              label: 'Enable Cookie Consent Banner',
              defaultValue: true,
              admin: {
                description: 'When enabled, a cookie consent banner is shown to visitors before loading tracking scripts.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default SiteSettings
