import type { GlobalConfig } from 'payload'
import { linkFields } from '@/fields/linkFields'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header Settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Globals',
    description: 'Configure header navigation, mega menus, and mobile navigation options.',
  },
  fields: [
    {
      name: 'navPosition',
      type: 'select',
      defaultValue: 'left',
      admin: {
        description: 'Navigation layout position relative to logo.',
      },
      options: [
        { label: 'Left (after logo)', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'separator',
      type: 'select',
      defaultValue: 'border',
      admin: {
        description: 'Visual separator style below the header.',
      },
      options: [
        { label: 'None', value: 'none' },
        { label: 'Border', value: 'border' },
      ],
    },
    {
      name: 'stickyDesktop',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Header stays fixed at the top on desktop viewports.',
      },
    },
    {
      name: 'stickyMobile',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Header stays fixed at the top on mobile viewports.',
      },
    },
    {
      name: 'searchDisplay',
      type: 'select',
      defaultValue: 'icon',
      admin: {
        description: 'How search is displayed in the header.',
      },
      options: [
        { label: 'Icon only', value: 'icon' },
        { label: 'Hidden', value: 'hidden' },
      ],
    },
    {
      name: 'mobileSearchOutside',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'When checked, the search icon appears outside the hamburger menu on mobile devices.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      required: true,
      label: 'Navigation Menu Items',
      admin: {
        description:
          "Add items to your site's main navigation menu. Supports mega menus, icons, and mobile customization.",
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
      labels: {
        singular: 'Menu Item',
        plural: 'Menu Items',
      },
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
          admin: {
            description:
              'Unique identifier for this nav item. Used for stable test selectors (data-testid). Example: "nav-home", "nav-services".',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description:
              'The text displayed in the navigation menu (e.g., "Home", "Services", "About").',
            style: {
              fontWeight: 'bold',
            },
          },
        },
        ...linkFields({ group: 'header-navigation', labelRequired: false }),
        {
          name: 'navGroup',
          type: 'select',
          defaultValue: 'primary',
          admin: {
            description:
              'Select which navigation group this item belongs to. Primary items appear in the main nav, utility items are right-aligned.',
          },
          options: [
            { label: 'Primary Navigation', value: 'primary' },
            { label: 'Utility Navigation', value: 'utility' },
          ],
        },
        {
          name: 'icon',
          type: 'select',
          required: false,
          admin: {
            description:
              'Optional icon to display next to this menu item.',
          },
          options: [
            { label: 'None', value: 'none' },
            { label: 'Home', value: 'home' },
            { label: 'Services', value: 'grid' },
            { label: 'About', value: 'users' },
            { label: 'Portfolio', value: 'folder' },
            { label: 'Blog', value: 'file-text' },
            { label: 'Contact', value: 'mail' },
            { label: 'Search', value: 'search' },
            { label: 'Account', value: 'user' },
            { label: 'Cart', value: 'shopping-cart' },
            { label: 'Settings', value: 'settings' },
            { label: 'Info', value: 'info' },
          ],
        },
        {
          name: 'description',
          type: 'text',
          required: false,
          admin: {
            description:
              'Optional short description that appears in dropdown menus.',
          },
        },
        {
          name: 'showOnMobile',
          type: 'checkbox',
          label: 'Show Outside Mobile Menu',
          defaultValue: false,
          admin: {
            description:
              'When checked, this item will appear outside the hamburger menu on mobile devices. Limit to 1-2 items.',
          },
        },
        {
          name: 'submenuType',
          type: 'select',
          defaultValue: 'none',
          admin: {
            description: 'Select the type of submenu for this navigation item.',
          },
          options: [
            { label: 'No submenu', value: 'none' },
            { label: 'Simple dropdown', value: 'simple' },
            { label: 'Multi-column', value: 'multiColumn' },
            { label: 'Mega menu', value: 'mega' },
          ],
        },
        {
          name: 'submenuItems',
          type: 'array',
          label: 'Submenu Items',
          admin: {
            description: 'Add items to this submenu.',
            condition: (_, siblingData) => siblingData?.submenuType !== 'none',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'Text displayed in the submenu.',
              },
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              admin: {
                description: 'Link URL for this submenu item.',
              },
            },
            {
              name: 'icon',
              type: 'select',
              required: false,
              admin: {
                description: 'Optional icon to display next to this submenu item.',
              },
              options: [
                { label: 'None', value: 'none' },
                { label: 'Home', value: 'home' },
                { label: 'Services', value: 'grid' },
                { label: 'About', value: 'users' },
                { label: 'Portfolio', value: 'folder' },
                { label: 'Blog', value: 'file-text' },
                { label: 'Contact', value: 'mail' },
                { label: 'Search', value: 'search' },
                { label: 'Account', value: 'user' },
                { label: 'Cart', value: 'shopping-cart' },
                { label: 'Settings', value: 'settings' },
                { label: 'Info', value: 'info' },
              ],
            },
            {
              name: 'description',
              type: 'text',
              required: false,
              admin: {
                description: 'Optional short description for this submenu item.',
              },
            },
          ],
        },
        {
          name: 'submenuColumns',
          type: 'select',
          defaultValue: '2',
          admin: {
            description: 'Number of columns to use for multi-column submenu layout.',
            condition: (_, siblingData) => siblingData?.submenuType === 'multiColumn',
          },
          options: [
            { label: '1 column', value: '1' },
            { label: '2 columns', value: '2' },
            { label: '3 columns', value: '3' },
            { label: '4 columns', value: '4' },
          ],
        },
        {
          name: 'megaMenuFeatured',
          type: 'group',
          label: 'Featured Content (Mega Menu)',
          admin: {
            description: 'Featured content for mega menu display.',
            condition: (_, siblingData) => siblingData?.submenuType === 'mega',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: false,
              admin: {
                description: 'Title for the featured section.',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              required: false,
              admin: {
                description: 'Subtitle that appears below the title.',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: false,
              admin: {
                description: 'Short description for the featured content.',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Featured image to display.',
              },
            },
            {
              name: 'link',
              type: 'text',
              required: false,
              admin: {
                description: 'Link for the featured content.',
              },
            },
            {
              name: 'linkLabel',
              type: 'text',
              required: false,
              admin: {
                description: 'Text to display for the featured content link.',
              },
            },
          ],
        },
        {
          name: 'submenuFooter',
          type: 'group',
          label: 'Submenu Footer',
          admin: {
            description: 'Optional footer content for submenu (for call-to-action buttons, etc.).',
            condition: (_, siblingData) => siblingData?.submenuType !== 'none',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: false,
              admin: {
                description: 'Text to display in the submenu footer.',
              },
            },
            {
              name: 'primaryCTA',
              type: 'group',
              label: 'Primary Call to Action',
              admin: {
                description: 'Primary call to action button in the submenu footer.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: false,
                  admin: {
                    description: 'Button text.',
                  },
                },
                {
                  name: 'link',
                  type: 'text',
                  required: false,
                  admin: {
                    description: 'Button link URL.',
                  },
                },
              ],
            },
            {
              name: 'secondaryCTA',
              type: 'group',
              label: 'Secondary Call to Action',
              admin: {
                description: 'Secondary call to action button or link in the submenu footer.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: false,
                  admin: {
                    description: 'Button or link text.',
                  },
                },
                {
                  name: 'link',
                  type: 'text',
                  required: false,
                  admin: {
                    description: 'Button or link URL.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
