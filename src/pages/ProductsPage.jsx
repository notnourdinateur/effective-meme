import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductGrid from '../components/products/ProductGrid'

function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('all')}
        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
          selected === 'all'
            ? 'bg-brand-300 text-canvas-950'
            : 'border border-line-700 text-ink-300 hover:border-brand-400/50 hover:text-ink-50'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
            selected === cat
              ? 'bg-brand-300 text-canvas-950'
              : 'border border-line-700 text-ink-300 hover:border-brand-400/50 hover:text-ink-50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { data: products } = useProducts()

  const categories = [...new Set((products ?? []).map((p) => p.category))].sort()

  return (
    <section className="space-y-8">
      <div>
        <p className="inline-flex rounded-full border border-brand-400/45 bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-200">
          Store
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink-50">Products</h1>
        <p className="mt-1 text-sm text-ink-400">Browse our catalog powered by DummyJSON</p>
      </div>

      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-line-700 bg-surface-900/60 py-2.5 pl-10 pr-4 text-sm text-ink-50 placeholder-ink-500 outline-none focus:border-brand-400/60 focus:ring-1 focus:ring-brand-400/30"
        />
      </div>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <ProductGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
    </section>
  )
}

export default ProductsPage
