import type { GlobalConfig } from 'payload'

export const CTASettings: GlobalConfig = {
  slug: 'cta-settings',
  label: 'CTA Settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Globals',
    description: 'Define named CTA groups that control button defaults and available options per context.',
  },
  fields: [
    {
      name: 'groups',
      type: 'array',
      label: 'CTA Groups',
      admin: {
        description: 'Named groups that define button style defaults for each context (hero, block, header, etc.).',
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/CTASettings/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Group Name',
          admin: {
            description: 'Human-readable name (e.g., "Hero CTAs", "Block CTAs").',
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          label: 'Group Slug',
          admin: {
            description: 'Machine-readable identifier used in linkFields(). Must be unique (e.g., "hero-ctas").',
          },
        },
        {
          name: 'enableButtonOptions',
          type: 'checkbox',
          label: 'Enable Button Options',
          defaultValue: false,
          admin: {
            description: 'When enabled, editors can customize button color, variant, and size for CTAs in this group.',
          },
        },
        {
          name: 'defaultButtonColor',
          type: 'select',
          label: 'Default Button Color',
          defaultValue: 'brand-primary',
          options: [
            { label: 'Brand Primary', value: 'brand-primary' },
            { label: 'Brand Alt', value: 'brand-alt' },
            { label: 'White', value: 'white' },
            { label: 'Dark', value: 'dark' },
          ],
          admin: {
            condition: (_data, siblingData) => siblingData?.enableButtonOptions === true,
            description: 'Default button color when editors do not override.',
          },
        },
        {
          name: 'defaultButtonVariant',
          type: 'select',
          label: 'Default Button Variant',
          defaultValue: 'filled',
          options: [
            { label: 'Filled', value: 'filled' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
          admin: {
            condition: (_data, siblingData) => siblingData?.enableButtonOptions === true,
            description: 'Default button variant when editors do not override.',
          },
        },
        {
          name: 'defaultButtonSize',
          type: 'select',
          label: 'Default Button Size',
          defaultValue: 'default',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Default', value: 'default' },
            { label: 'Large', value: 'large' },
          ],
          admin: {
            condition: (_data, siblingData) => siblingData?.enableButtonOptions === true,
            description: 'Default button size when editors do not override.',
          },
        },
      ],
    },
  ],
}
