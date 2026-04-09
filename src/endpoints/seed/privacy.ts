import type { RequiredDataFromCollectionSlug } from 'payload'

import { markdownToLexical } from '@/utilities/markdownToLexical'

export const privacyPage: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  return {
    slug: 'privacy',
    _status: 'published',
    title: 'プライバシーポリシー',
    layout: [
      // Block 1: Hero Header (no image, solid bg-primary)
      {
        blockType: 'heroHeader' as const,
        size: 'medium' as const,
        title: 'プライバシーポリシー',
        subtitle: 'rePlay合同会社における個人情報の取り扱いについて',
        headingAlignment: 'left' as const,
      },
      // Block 2: Notice — slim banner (bg-brand-alt/10)
      {
        blockType: 'notice',
        variant: 'slim',
        content: markdownToLexical(
          '※ このページはデザインレビュー用のシードコンテンツです。本番公開前に法務レビューが必要です。',
        ),
        dismissible: false,
      },
      // Block 3: Content — legal text with proper headings
      {
        blockName: 'Legal Text',
        blockType: 'content',
        backgroundColor: 'white',
        spacingDensity: 'spacious',
        columns: [
          {
            size: 'full',
            richText: markdownToLexical(
              '## 1. 個人情報の収集について\n\n当社は、お問い合わせフォーム、ドメイン購入に関するご相談、その他のサービス提供に際して、お名前、メールアドレス、電話番号、会社名などの個人情報を収集することがあります。個人情報の収集は、サービスの提供および改善に必要な範囲に限定します。\n\n## 2. 個人情報の利用目的\n\n収集した個人情報は、以下の目的で利用いたします。\n\n- お問い合わせへの回答およびご連絡\n- ドメイン売買に関する交渉および契約手続き\n- Web開発、マーケティングサービスの提供\n- サービス品質の改善および新サービスの開発\n- 法令に基づく対応\n\n## 3. 個人情報の第三者提供\n\n当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。ただし、ドメイン移管手続きなど、サービスの性質上、レジストラや関連事業者との情報共有が必要な場合は、事前にご本人の同意を得た上で行います。\n\n## 4. 個人情報の管理\n\n当社は、収集した個人情報の漏洩、滅失、毀損を防止するため、適切なセキュリティ対策を講じます。個人情報は、利用目的の達成に必要な期間のみ保持し、不要となった場合は速やかに削除または適切に廃棄いたします。\n\n## 5. Cookieの使用について\n\n当サイトでは、ユーザー体験の向上およびアクセス解析のためにCookieを使用する場合があります。Cookieの使用を希望されない場合は、ブラウザの設定により無効にすることができます。ただし、一部のサービスが正常に機能しなくなる可能性があります。\n\n## 6. 個人情報の開示・訂正・削除\n\nご本人から個人情報の開示、訂正、削除のご請求があった場合、ご本人確認の上、合理的な期間内に対応いたします。ご請求については、下記のお問い合わせ先までご連絡ください。\n\n## 7. プライバシーポリシーの変更\n\n当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のポリシーは、当サイト上に掲載した時点で効力を生じるものとします。',
            ),
            enableLink: false,
            link: { label: '' },
          },
        ],
      },
      // Block 4: Content — contact info with divider
      {
        blockName: 'Privacy Contact',
        blockType: 'content',
        backgroundColor: 'white',
        showTopDivider: true,
        columns: [
          {
            size: 'full',
            richText: markdownToLexical(
              '## お問い合わせ先\n\n**rePlay合同会社**\n\n〒105-0013 東京都港区浜松町2-2-15 浜松町ダイヤビル2F\n\nTEL: 03-6868-5609',
            ),
            enableLink: false,
            link: { label: '' },
          },
        ],
      },
      // Block 5: CTA — light bg before dark footer
      {
        blockName: 'Privacy CTA',
        blockType: 'cta',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '個人情報に関するお問い合わせ', version: 1 }],
                direction: 'ltr', format: '', indent: 0, tag: 'h3', version: 1,
              },
              {
                type: 'paragraph',
                children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'プライバシーに関するご質問やご請求はこちらからお願いいたします。', version: 1 }],
                direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1,
              },
            ],
            direction: 'ltr', format: '', indent: 0, version: 1,
          },
        },
        links: [
          { link: { label: 'お問い合わせページへ', type: 'external', externalUrl: '/contact' } },
        ],
      },
    ],
    searchExcerpt: 'rePlay合同会社のプライバシーポリシー。個人情報の取り扱いについて。',
    searchKeywords: 'プライバシーポリシー、個人情報、Cookie、APPI、GDPR',
    meta: {
      title: 'プライバシーポリシー | rePlay合同会社',
      description:
        'rePlay合同会社のプライバシーポリシー。個人情報の収集・利用・保護に関する方針をご確認ください。',
    },
  }
}
