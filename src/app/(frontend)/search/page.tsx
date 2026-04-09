import type { Metadata } from 'next/types'
import { SearchPageClient } from './SearchPageClient'

type Args = {
  searchParams: Promise<{
    q?: string
    type?: string
    page?: string
  }>
}

export default async function SearchPage({ searchParams: searchParamsPromise }: Args) {
  const { q, type, page } = await searchParamsPromise
  return <SearchPageClient initialQuery={q || ''} initialType={type || ''} initialPage={page ? parseInt(page, 10) : 1} />
}

export function generateMetadata(_args: { searchParams: Promise<{ q?: string }> }): Metadata {
  return {
    title: '検索 | rePlay Domains',
    description: 'ドメイン、ブログ記事、サービスなどサイト内のコンテンツを検索できます。',
    openGraph: {
      title: '検索 | rePlay Domains',
      description: 'ドメイン、ブログ記事、サービスなどサイト内のコンテンツを検索できます。',
    },
  }
}
