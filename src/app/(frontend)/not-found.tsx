import { BudouX } from '@/components/BudouX'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="site-container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4"><BudouX>お探しのページは存在しないか、移動された可能性があります。</BudouX></p>
      </div>
      <Button asChild variant="default">
        <Link href="/"><BudouX>ホームに戻る</BudouX></Link>
      </Button>
    </div>
  )
}
