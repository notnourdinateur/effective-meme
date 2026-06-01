import { useProducts } from '../../hooks/useProducts'
import ProductCard from './ProductCard'

function ProductGridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-line-700 bg-surface-900/75">
          <div className="h-48 rounded-t-2xl bg-surface-800" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-1/3 rounded bg-surface-800" />
            <div className="h-4 w-4/5 rounded bg-surface-800" />
            <div className="h-3 w-1/2 rounded bg-surface-800" />
            <div className="h-6 w-1/4 rounded bg-surface-800" />
            <div className="h-9 w-full rounded-xl bg-surface-800" />
          </div>
        </div>
      ))}
    </div>
  )
}

function ProductGrid({ searchQuery = '', selectedCategory = 'all' }) {
  const { data: products, isLoading, isError, error } = useProducts()

  if (isLoading) return <ProductGridSkeleton />

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center">
        <p className="text-lg font-semibold text-rose-400">Failed to load products</p>
        <p className="text-sm text-ink-400">{error.message}</p>
      </div>
    )
  }

  const filtered = (products ?? []).filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-line-700 py-20 text-center">
        <p className="text-lg font-semibold text-ink-200">No products found</p>
        <p className="text-sm text-ink-400">Try adjusting your search or filter.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
