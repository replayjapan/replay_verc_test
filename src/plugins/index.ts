import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import type { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { mcpPlugin } from '@payloadcms/plugin-mcp'

import { Domain, Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

type SupportedDocs = Post | Page | Domain

const TEMPLATE_TITLE_SUFFIX = 'rePlay Domains'

const generateTitle: GenerateTitle<SupportedDocs> = ({ doc }) => {
  if (!doc) return TEMPLATE_TITLE_SUFFIX

  if ('domainName' in doc && doc.domainName) {
    return `${doc.domainName} | ${TEMPLATE_TITLE_SUFFIX}`
  }

  if ('title' in doc && doc.title) {
    return `${doc.title} | ${TEMPLATE_TITLE_SUFFIX}`
  }

  return TEMPLATE_TITLE_SUFFIX
}

const generateURL: GenerateURL<SupportedDocs> = ({ doc }) => {
  const url = getServerSideURL()

  if (!doc) return url

  if ('slug' in doc && doc.slug) {
    return `${url}/${doc.slug}`
  }

  if ('domainName' in doc && doc.domainName) {
    return `${url}/${doc.domainName}`
  }

  return url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts', 'domains'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['pages', 'domains', 'posts', 'services', 'videos', 'portfolios', 'articles'],
    defaultPriorities: {
      pages: 10,
      domains: 8,
      posts: 6,
      services: 4,
      videos: 4,
      portfolios: 4,
      articles: 4,
    },
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
  mcpPlugin({
    collections: {
      posts: {
        enabled: true,
        description: 'The Posts collection contains the posts for the blog about the latest news and events.',
      },
      domains: {
        enabled: true,
        description: 'The Domains collections is for a portfolio of domains I personally own.',
      },
      articles: {
        enabled: true,
        description: 'The Articles collection contains informational articles about domains and the industry.',
      },
      portfolios: {
        enabled: true,
        description: 'The Portfolios collection contains portfolio entries showcasing work and projects.',
      },
      services: {
        enabled: true,
        description: 'The Services collection contains service offerings and their details.',
      },
      videos: {
        enabled: true,
        description: 'The Videos collection contains video content entries with metadata.',
      },
    },
  }),
]
