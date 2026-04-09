// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { DomainCategory } from './collections/Domains/DomainCategory'
import { Domains } from './collections/Domains'
import { DomainInquiries } from './collections/DomainInquiries'
import { DomainSets } from './collections/DomainSets'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Services } from './collections/Services'
import { ServiceCategories } from './collections/Services/Categories'
import { Videos } from './collections/Videos'
import { VideoCategories } from './collections/Videos/Categories'
import { Portfolios } from './collections/Portfolios'
import { PortfolioCategories } from './collections/Portfolios/Categories'
import { Articles } from './collections/Articles'
import { ArticleCategories } from './collections/Articles/Categories'
import { ArticlesSettings } from './globals/ArticlesSettings'
import { DomainPortfolioSettings } from './globals/DomainPortfolioSettings'
import { PortfoliosSettings } from './globals/PortfoliosSettings'
import { PostsSettings } from './globals/PostsSettings'
import { ServicesSettings } from './globals/ServicesSettings'
import { SiteSettings } from './globals/SiteSettings'
import { VideosSettings } from './globals/VideosSettings'
import { CTASettings } from './globals/CTASettings'
import { Footer } from './globals/Footer/config'
import { Header } from './Header/config'
import { migrations } from './migrations'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDomainsDashboard', '@/components/BeforeDashboard'],
    },
    dashboard: {
      widgets: [
        {
          slug: 'domain-portfolio',
          Component: '@/components/dashboard/DomainPortfolioWidget#default',
          minWidth: 'small',
          maxWidth: 'medium',
        },
        {
          slug: 'inquiry-tracker',
          Component: '@/components/dashboard/InquiryTrackerWidget#default',
          minWidth: 'small',
          maxWidth: 'medium',
        },
        {
          slug: 'content-freshness',
          Component: '@/components/dashboard/ContentFreshnessWidget#default',
          minWidth: 'small',
          maxWidth: 'medium',
        },
        {
          slug: 'seo-health',
          Component: '@/components/dashboard/SeoHealthWidget#default',
          minWidth: 'small',
          maxWidth: 'medium',
        },
        {
          slug: 'collection-overview',
          Component: '@/components/dashboard/CollectionOverviewWidget#default',
          minWidth: 'small',
          maxWidth: 'medium',
        },
      ],
      defaultLayout: ({ req: _req }) => [
        { widgetSlug: 'domain-portfolio' as const, width: 'medium' as const },
        { widgetSlug: 'inquiry-tracker' as const, width: 'medium' as const },
        { widgetSlug: 'content-freshness' as const, width: 'medium' as const },
        { widgetSlug: 'seo-health' as const, width: 'medium' as const },
        { widgetSlug: 'collection-overview' as const, width: 'medium' as const },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: vercelPostgresAdapter({
    push: process.env.NODE_ENV !== 'production',
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    prodMigrations: migrations,
  }),
  collections: [
    Pages, Posts, Domains, DomainSets, DomainInquiries, DomainCategory, Media, Categories, Users,
    Services, ServiceCategories,
    Videos, VideoCategories,
    Portfolios, PortfolioCategories,
    Articles, ArticleCategories,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  csrf: [getServerSideURL()].filter(Boolean),
  graphQL: {
    disable: true,
  },
  globals: [Header, Footer, SiteSettings, CTASettings, DomainPortfolioSettings, ServicesSettings, VideosSettings, PortfoliosSettings, ArticlesSettings, PostsSettings],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
