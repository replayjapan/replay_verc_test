export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero skeleton */}
      <div className="bg-[var(--brand-primary)] h-[320px] md:h-[400px] animate-pulse" />

      {/* Tab bar skeleton */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-slate-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
