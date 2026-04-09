import type { Page } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  headerImageId?: number
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  headerImageId,
}) => {
  return {
    slug: 'contact',
    _status: 'published',
    title: 'お問い合わせ',
    layout: [
      // Block 1: Hero Header with office-terrace image
      {
        blockType: 'heroHeader' as const,
        size: 'medium' as const,
        title: 'お問い合わせ',
        subtitle:
          'ドメインの取得・移管に関するご質問、開発・マーケティングのご相談、お見積もりのご依頼など、お気軽にお問い合わせください。通常1営業日以内にご返信いたします。',
        headingAlignment: 'left' as const,
        ...(headerImageId ? { image: headerImageId } : {}),
      },
      // Block 2: ContactInfo — 2-col: company info LEFT + form RIGHT (side-by-side)
      {
        blockType: 'contactInfo' as const,
        companyName: 'rePlay合同会社',
        description:
          'プロジェクト開発からデジタルマーケティング、プレミアムドメインポートフォリオの管理まで。rePlayはデジタル事業を総合的に支援するパートナーです。',
        address: '〒105-0013 東京都港区浜松町2-2-15\n浜松町ダイヤビル2F',
        phone: '03-6868-5609',
        emailNote: 'お問い合わせフォームよりご連絡ください',
        hours: '平日 10:00〜18:00',
      },
    ] as Page['layout'],
    searchExcerpt: 'お問い合わせフォーム。ドメインやサービスに関するご質問はこちらから。',
    searchKeywords: 'お問い合わせ、コンタクト、フォーム、メール、相談',
    meta: {
      title: 'お問い合わせ | rePlay合同会社',
      description:
        'rePlay合同会社へのお問い合わせ。ドメイン取得・サービスのご相談・お見積もりはこちらから。',
    },
  }
}
