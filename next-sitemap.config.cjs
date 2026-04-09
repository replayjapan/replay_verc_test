const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/pages-sitemap.xml',
    '/posts-sitemap.xml',
    '/domains-sitemap.xml',
    '/services-sitemap.xml',
    '/videos-sitemap.xml',
    '/portfolio-sitemap.xml',
    '/articles-sitemap.xml',
    '/*',
    '/domains/*',
    '/posts/*',
    '/services/*',
    '/videos/*',
    '/portfolio/*',
    '/articles/*',
    '/admin/*',
    '/api/*',
    '/next/*',
    '/styleguide/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/*', '/next/*', '/styleguide/*'],
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
      `${SITE_URL}/domains-sitemap.xml`,
      `${SITE_URL}/services-sitemap.xml`,
      `${SITE_URL}/videos-sitemap.xml`,
      `${SITE_URL}/portfolio-sitemap.xml`,
      `${SITE_URL}/articles-sitemap.xml`,
    ],
  },
}
