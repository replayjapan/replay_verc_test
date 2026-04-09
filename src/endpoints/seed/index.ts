import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import path from 'path'
import fs from 'fs'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home as homePageData } from './home'
import { aboutPage as aboutPageData } from './about-page'
import { seedDomains } from './domains'
import { seedDomainSets } from './domainSets'
import { privacyPage as privacyPageData } from './privacy'
import { seedPortfolioItems } from './portfolio-items'
// service-pages.ts no longer needed — M25f moved to collection renderer approach
import { seedServices } from './services'
import { seedVideoItems } from './video-items'
import { blogContentSeed } from './blog-content'

const collections: CollectionSlug[] = [
  'domain-category',
  'domain-inquiries',
  'domain-sets',
  'domains',
  'media',
  'pages',
  'forms',
  'form-submissions',
  'search',
  'services',
  'service-categories',
  'portfolios',
  'portfolio-categories',
  'videos',
  'video-categories',
  'posts',
  'categories',
  'articles',
  'article-categories',
]

const globals: GlobalSlug[] = ['header', 'footer', 'site-settings', 'cta-settings']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // Clear collections and globals
  // Skip header (navItems required:true rejects empty array) and site-settings (has required fields)
  // Both are fully overwritten later
  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    globals
      .filter((global) => global !== 'header' && global !== 'site-settings')
      .map((global) =>
        payload.updateGlobal({
          slug: global,
          data: {
            navItems: [],
          } as Record<string, unknown>,
          depth: 0,
          context: {
            disableRevalidate: true,
          },
        }),
      ),
  )

  await Promise.all(
    collections
      .filter((collection) => collection !== 'media')
      .map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  // payload.db.deleteMany() is a raw DB adapter call — it does NOT delete physical files.
  // Without clearing the disk, re-seeding throws:
  //   ValidationError: "Value must be unique" at path "filename"
  // Wipe public/media/ contents before re-uploading.
  const mediaDir = path.resolve(process.cwd(), 'public/media')
  if (fs.existsSync(mediaDir)) {
    for (const entry of fs.readdirSync(mediaDir)) {
      fs.rmSync(path.join(mediaDir, entry), { recursive: true, force: true })
    }
    payload.logger.info('— Cleared physical media files from public/media/')
  }

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  // Seed media from local brand assets
  payload.logger.info(`— Uploading brand assets...`)

  const brandDir = path.resolve(process.cwd(), 'public/brand')

  const [logoBuffer, squareBuffer, teamBuffer, officeBuffer, sceneBuffer, portraitBuffer] =
    await Promise.all([
      readLocalFile(path.join(brandDir, 'rePlay_logo_240x80.png')),
      readLocalFile(path.join(brandDir, 'square_2048x2048.png')),
      readLocalFile(path.join(brandDir, 'team_pix.png')),
      readLocalFile(path.join(brandDir, 'tokyo_office_pix.png')),
      readLocalFile(path.join(brandDir, 'photo_picture_scene.png')),
      readLocalFile(path.join(brandDir, 'portrait_3072x1536.png')),
    ])

  const [logoDoc, _squareDoc, teamDoc, officeDoc, sceneDoc, portraitDoc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: { alt: 'rePlay Domains ロゴ' },
      file: logoBuffer,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'rePlay Domains OGイメージ' },
      file: squareBuffer,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'チーム写真' },
      file: teamBuffer,
    }),
    payload.create({
      collection: 'media',
      data: { alt: '東京オフィス' },
      file: officeBuffer,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'phone guy' },
      file: sceneBuffer,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'Circle Of Flowers Lady' },
      file: portraitBuffer,
    }),
  ])

  // Seed SiteSettings global
  payload.logger.info(`— Seeding site settings...`)

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'rePlay 東京',
      language: 'japanese',
      locale: 'ja-JP',
      brand: {
        primary: '#1B243F',
        alt: '#F0A848',
        background: '#FFFFFF',
        surface: '#F5F7FF',
        copy: '#1F2933',
        muted: '#6B7280',
        border: '#E2E8F0',
      },
      typography: {
        headingWeight: '600',
        bodyWeight: '400',
        baseSize: '16px',
      },
      layout: {
        containerWidth: '1140px',
        borderRadius: '12px',
      },
      logo: logoDoc.id,
      defaultOgTitle: 'rePlay Domains — プレミアム日本語ドメイン',
      defaultOgDescription: '厳選された日本市場向けプレミアムドメインポートフォリオ。ビジネスの成長とブランド構築をサポートします。',
      siteDescription: '東京を拠点とするrePlay合同会社が運営するプレミアムドメインポートフォリオ。日本市場向けの厳選されたドメインを提供しています。',
      enableCookieConsent: true,
    },
    context: {
      disableRevalidate: true,
    },
  })

  // Seed DomainPortfolioSettings global
  payload.logger.info(`— Seeding domain portfolio settings...`)

  await payload.updateGlobal({
    slug: 'domains-settings',
    data: {
      display: {
        enablePriceShorthand: true,
      },
    },
    context: {
      disableRevalidate: true,
    },
  })

  // Seed CTASettings global with default groups
  payload.logger.info(`— Seeding CTA settings...`)

  await payload.updateGlobal({
    slug: 'cta-settings',
    data: {
      groups: [
        {
          name: 'Header Navigation',
          slug: 'header-navigation',
          enableButtonOptions: false,
        },
        {
          name: 'Footer Navigation',
          slug: 'footer-navigation',
          enableButtonOptions: false,
        },
        {
          name: 'Hero CTAs',
          slug: 'hero-ctas',
          enableButtonOptions: true,
          defaultButtonColor: 'brand-alt',
          defaultButtonVariant: 'filled',
          defaultButtonSize: 'large',
        },
        {
          name: 'Block CTAs',
          slug: 'block-ctas',
          enableButtonOptions: true,
          defaultButtonColor: 'brand-primary',
          defaultButtonVariant: 'filled',
          defaultButtonSize: 'default',
        },
        {
          name: 'Rich Text Links',
          slug: 'rich-text-links',
          enableButtonOptions: false,
        },
        {
          name: 'Domain Inquiry',
          slug: 'domain-inquiry',
          enableButtonOptions: false,
        },
      ],
    },
    context: {
      disableRevalidate: true,
    },
  })

  // Upload catalog images from public/image-fix/ for domain featured images
  payload.logger.info(`— Uploading catalog images for domains...`)

  const imageFixDir = path.resolve(process.cwd(), 'public/image-fix')
  const catalogImageFiles = [
    { file: 'koi-splash.png', alt: '鯉の跳躍' },
    { file: 'hallway-sunset.png', alt: 'モダンな廊下' },
    { file: 'sakura-portrait.png', alt: '桜のポートレート' },
    { file: 'origami-ocean.png', alt: '折り鶴と海' },
    { file: 'light-trails.png', alt: '都市の光跡' },
    { file: 'glass-prisms.png', alt: 'ガラスプリズム' },
    { file: 'office-terrace.png', alt: 'オフィステラス' },
    { file: 'glass-building-1.png', alt: 'ガラスのビル' },
    { file: 'glass-building-2.png', alt: 'ガラスのビル (2)' },
    { file: 'paint-splash-light.png', alt: 'ペイントスプラッシュ' },
    { file: 'bokeh-network-1.png', alt: 'ボケネットワーク (1)' },
    { file: 'bokeh-network-2.png', alt: 'ボケネットワーク (2)' },
    { file: 'sakura-minimal.png', alt: '桜のミニマル' },
    { file: 'lanterns-warm.png', alt: '暖かいランタン' },
    { file: 'smoke-collision.png', alt: '煙の衝突' },
    { file: 'mosaic-gaze.png', alt: 'モザイクの視線' },
  ]

  const catalogBuffers = catalogImageFiles.map(({ file, alt }) => ({
    key: file.replace(/\.[^.]+$/, ''),
    alt,
    buffer: readLocalFile(path.join(imageFixDir, file)),
  }))

  const catalogDocs: Array<{ id: number | string }> = []
  for (const { alt, buffer } of catalogBuffers) {
    const doc = await payload.create({ collection: 'media', data: { alt }, file: buffer })
    catalogDocs.push(doc)
  }

  const catalogImages: Record<string, number> = {}
  catalogBuffers.forEach(({ key }, i) => {
    catalogImages[key] = catalogDocs[i].id as number
  })
  payload.logger.info(`— Catalog images uploaded: ${Object.keys(catalogImages).join(', ')}`)

  // Set heroImage on domains-settings now that catalog images are uploaded
  if (catalogImages['glass-building-1']) {
    await payload.updateGlobal({
      slug: 'domains-settings',
      data: {
        heroImage: catalogImages['glass-building-1'],
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info(`— Domains hero image set: glass-building-1`)
  }

  // Set heroImage on posts-settings
  if (catalogImages['sakura-minimal']) {
    await payload.updateGlobal({
      slug: 'posts-settings',
      data: {
        heroImage: catalogImages['sakura-minimal'],
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info('— Posts hero image set: sakura-minimal')
  }

  // Set heroImage on articles-settings
  if (catalogImages['lanterns-warm']) {
    await payload.updateGlobal({
      slug: 'articles-settings',
      data: {
        heroImage: catalogImages['lanterns-warm'],
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info('— Articles hero image set: lanterns-warm')
  }

  // Set heroImage on videos-settings
  if (catalogImages['smoke-collision']) {
    await payload.updateGlobal({
      slug: 'videos-settings',
      data: {
        heroImage: catalogImages['smoke-collision'],
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info('— Videos hero image set: smoke-collision')
  }

  // Set heroImage on portfolios-settings
  if (catalogImages['mosaic-gaze']) {
    await payload.updateGlobal({
      slug: 'portfolios-settings',
      data: {
        heroImage: catalogImages['mosaic-gaze'],
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info('— Portfolio hero image set: mosaic-gaze')
  }

  // Seed services (categories + services) — needed for homepage servicesBlock
  const { serviceIds } = await seedServices(payload, catalogImages)
  payload.logger.info(`— Services seeded`)

  // Seed all 47 domains with categories and featured images
  payload.logger.info(`— Seeding domains...`)
  await seedDomains(payload, {
    sceneImageId: sceneDoc.id as number,
    catalogImages,
  })
  payload.logger.info(`— Domains seeded`)

  // Seed domain sets (references domains by name, must run after seedDomains)
  payload.logger.info(`— Seeding domain sets...`)
  await seedDomainSets(payload)
  payload.logger.info(`— Domain sets seeded`)

  payload.logger.info(`— Seeding contact form...`)

  await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  // Seed pages: contact + about + homepage
  payload.logger.info(`— Seeding pages...`)

  const contactPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: contactPageData({ headerImageId: catalogImages['office-terrace'] }),
  })

  const aboutPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: aboutPageData({
      portraitImageId: portraitDoc.id as number,
      teamImageId: teamDoc.id as number,
      officeImageId: officeDoc.id as number,
      sceneImageId: sceneDoc.id as number,
      catalogImages,
    }),
  })

  await payload.create({
    collection: 'pages',
    depth: 0,
    data: homePageData({
      officeImageId: officeDoc.id as number,
      teamImageId: teamDoc.id as number,
      sceneImageId: sceneDoc.id as number,
      serviceIds,
    }),
  })

  // Seed privacy page
  const privacyPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: privacyPageData(),
  })

  // M25f: service-pages.ts removed — services now use collection renderer with structured fields

  // Seed portfolio items
  await seedPortfolioItems(payload, {
    teamImageId: teamDoc.id as number,
    officeImageId: officeDoc.id as number,
    sceneImageId: sceneDoc.id as number,
    portraitImageId: portraitDoc.id as number,
    catalogImages,
  })

  // Seed video items (placeholder content for design review)
  await seedVideoItems(payload)

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navPosition: 'left',
        separator: 'border',
        stickyDesktop: true,
        stickyMobile: true,
        searchDisplay: 'icon',
        navItems: [
          {
            key: 'header-about',
            label: 'rePlayについて',
            link: {
              type: 'internal',
              internalDoc: { relationTo: 'pages', value: aboutPage.id },
            },
            navGroup: 'primary',
            icon: 'users',
          },
          {
            key: 'nav-domains',
            label: 'ドメイン',
            link: {
              type: 'external',
              externalUrl: '/domains',
            },
            navGroup: 'primary',
            icon: 'folder',
          },
          {
            key: 'nav-services',
            label: 'サービス',
            link: {
              label: 'rePLayのサービス内容',
              type: 'external',
              externalUrl: '/services',
            },
            navGroup: 'primary',
            icon: 'grid',
            description: '提供サービス',
            submenuType: 'multiColumn',
            submenuColumns: '1',
            submenuItems: [
              {
                label: 'プロジェクト開発',
                link: '/services/development',
                icon: 'grid',
                description: 'Webアプリ・業務システムの設計開発',
              },
              {
                label: 'デジタルマーケティング',
                link: '/services/marketing',
                icon: 'search',
                description: 'データ分析に基づく戦略立案・実行',
              },
              {
                label: 'ドメインポートフォリオ管理',
                link: '/services/domains',
                icon: 'folder',
                description: 'プレミアムドメインの取得・運用',
              },
              {
                label: 'ツール・フレームワーク開発',
                link: '/services/tools',
                icon: 'settings',
                description: '開発プロセスの自動化・効率化',
              },
            ],
            submenuFooter: {
              text: 'rePlay Services',
              primaryCTA: {
                label: 'お問い合わせ',
                link: '/contact',
              },
              secondaryCTA: {
                label: 'rePlayについて',
                link: '/about',
              },
            },
          },
          {
            key: 'nav-posts',
            label: 'ブログ',
            link: {
              type: 'external',
              externalUrl: '/posts',
            },
            navGroup: 'primary',
            icon: 'file-text',
          },
          {
            key: 'nav-articles',
            label: '記事',
            link: {
              type: 'external',
              externalUrl: '/articles',
            },
            navGroup: 'primary',
            icon: 'file-text',
          },
          {
            key: 'nav-contact',
            label: 'お問い合わせ',
            link: {
              type: 'internal',
              internalDoc: { relationTo: 'pages', value: contactPage.id },
            },
            navGroup: 'primary',
            icon: 'mail',
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            key: 'footer-domains',
            link: {
              label: 'ドメイン',
              type: 'external',
              externalUrl: '/domains',
            },
          },
          {
            key: 'footer-services',
            link: {
              label: 'サービス',
              type: 'external',
              externalUrl: '/services',
            },
          },
          {
            key: 'footer-about',
            link: {
              label: 'rePlayについて',
              type: 'internal',
              internalDoc: { relationTo: 'pages', value: aboutPage.id },
            },
          },
          {
            key: 'footer-posts',
            link: {
              label: 'ブログ',
              type: 'external',
              externalUrl: '/posts',
            },
          },
          {
            key: 'footer-articles',
            link: {
              label: '記事',
              type: 'external',
              externalUrl: '/articles',
            },
          },
          {
            key: 'footer-videos',
            link: {
              label: '動画',
              type: 'external',
              externalUrl: '/videos',
            },
          },
          {
            key: 'footer-portfolio',
            link: {
              label: 'ポートフォリオ',
              type: 'external',
              externalUrl: '/portfolio',
            },
          },
          {
            key: 'footer-contact',
            link: {
              label: 'お問い合わせ',
              type: 'internal',
              internalDoc: { relationTo: 'pages', value: contactPage.id },
            },
          },
          {
            key: 'footer-privacy',
            link: {
              label: 'プライバシーポリシー',
              type: 'internal',
              internalDoc: { relationTo: 'pages', value: privacyPage.id },
            },
          },
        ],
      },
    }),
  ])

  // Seed blog content (posts + articles)
  payload.logger.info(`— Seeding blog content...`)

  // Create post categories
  type CreateFn = (args: Record<string, unknown>) => Promise<{ id: number | string }>
  const createDoc = payload.create as unknown as CreateFn

  const postCategoryNames = [...new Set(blogContentSeed.posts.flatMap((p) => p.categories))]
  const postCategoryMap = new Map<string, number | string>()
  for (const catName of postCategoryNames) {
    const cat = await createDoc({
      collection: 'categories',
      data: { title: catName },
      context: { disableRevalidate: true },
    })
    postCategoryMap.set(catName, cat.id)
  }

  // Create article categories
  const articleCategoryNames = [...new Set(blogContentSeed.articles.flatMap((a) => a.categories))]
  const articleCategoryMap = new Map<string, number | string>()
  for (const catName of articleCategoryNames) {
    const cat = await createDoc({
      collection: 'article-categories',
      data: { name: catName },
      context: { disableRevalidate: true },
    })
    articleCategoryMap.set(catName, cat.id)
  }

  // Find the admin user for post authors
  const usersResult = await payload.find({ collection: 'users', limit: 1 })
  const adminUserId = usersResult.docs[0]?.id

  // Seed posts
  // Hero images for posts (rotate through catalog images)
  const postHeroImages = [officeDoc.id, teamDoc.id, sceneDoc.id]

  for (const post of blogContentSeed.posts) {
    const categoryIds = post.categories
      .map((c) => postCategoryMap.get(c))
      .filter((id): id is number | string => id !== undefined)

    const heroImageId = postHeroImages[blogContentSeed.posts.indexOf(post) % postHeroImages.length]

    // Add takeaway data to the first post as sample
    const postIndex = blogContentSeed.posts.indexOf(post)
    const takeawayData = postIndex === 0
      ? {
          takeawayHeading: 'この記事のポイント',
          takeaways: [
            { text: 'ローカルIPアドレスを使えば同じWi-Fi上のスマホから確認できる' },
            { text: '0.0.0.0 でサーバーを起動すると外部アクセスが可能になる' },
            { text: 'HTTPSが必要な機能はngrokなどのトンネルツールで対応する' },
          ],
        }
      : {}

    await createDoc({
      collection: 'posts',
      draft: false,
      data: {
        title: post.title,
        slug: post.slug,
        _status: 'published',
        heroImage: heroImageId,
        content: post.content,
        authors: adminUserId ? [adminUserId] : [],
        categories: categoryIds,
        tags: post.tags,
        publishedAt: post.publishedAt,
        relatedPosts: [],
        searchExcerpt: post.searchExcerpt,
        searchKeywords: post.searchKeywords,
        ...takeawayData,
        meta: {
          title: post.meta.title,
          description: post.meta.description,
          ogTitle: post.meta.ogTitle,
          ogDescription: post.meta.ogDescription,
          noIndex: post.meta.noIndex,
        },
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info(`  ✓ Post: ${post.title}`)
  }

  // Seed articles
  for (const article of blogContentSeed.articles) {
    const categoryIds = article.categories
      .map((c) => articleCategoryMap.get(c))
      .filter((id): id is number | string => id !== undefined)

    // Add takeaway data to the first article as sample
    const articleIndex = blogContentSeed.articles.indexOf(article)
    const articleTakeawayData = articleIndex === 0
      ? {
          takeawayHeading: '重要なポイント',
          takeaways: [
            { text: 'プレミアムドメインはブランド認知とSEOの両面で長期的な価値を持つ' },
            { text: '日本市場では.jpドメインの信頼性が他のTLDより高い傾向がある' },
            { text: 'ドメイン投資は適切な評価基準と市場分析に基づいて判断すべきである' },
          ],
        }
      : {}

    await createDoc({
      collection: 'articles',
      draft: false,
      data: {
        title: article.title,
        slug: article.slug,
        _status: 'published',
        author: article.author,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: sceneDoc.id,
        categories: categoryIds,
        tags: article.tags,
        articleType: article.articleType,
        publishedAt: article.publishedAt,
        searchExcerpt: article.searchExcerpt,
        searchKeywords: article.searchKeywords,
        ...articleTakeawayData,
        meta: {
          title: article.meta.title,
          description: article.meta.description,
          ogTitle: article.meta.ogTitle,
          ogDescription: article.meta.ogDescription,
          noIndex: article.meta.noIndex,
        },
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info(`  ✓ Article: ${article.title}`)
  }

  payload.logger.info('Seeded database successfully!')
}

/** Read a local file and return a Payload-compatible File object */
function readLocalFile(filePath: string): File {
  const data = fs.readFileSync(filePath)
  const name = path.basename(filePath)
  const ext = path.extname(filePath).slice(1).toLowerCase()

  const mimeMap: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    svg: 'image/svg+xml',
  }

  return {
    name,
    data: Buffer.from(data),
    mimetype: mimeMap[ext] || `image/${ext}`,
    size: data.byteLength,
  }
}
