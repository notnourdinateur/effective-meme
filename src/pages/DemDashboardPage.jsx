import { useMemo, useState } from 'react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { extractProductsStats } from '../utils/stats'
import { useProducts } from '../hooks/useProducts'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import AuthPanel from '../components/dashboard/AuthPanel'
import CartPanel from '../components/dashboard/CartPanel'
import DashboardStatsCards from '../components/dashboard/DashboardStatsCards'
import ProductDetailsDialog from '../components/dashboard/ProductDetailsDialog'
import ProductTable from '../components/dashboard/ProductTable'

function DemDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [deletedIds, setDeletedIds] = useState(new Set())
  const [selectedProduct, setSelectedProduct] = useState(null)
  const dispatch = useDispatch()
  const currentUserEmail = useSelector((state) => state.auth.currentUserEmail)
  const cartItems = useSelector((state) => state.cart.items)

  const { data = [], isLoading, isError, error, refetch, isFetching } = useProducts()

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    const activeProducts = data.filter((p) => !deletedIds.has(p.id))

    if (!normalizedSearch) {
      return activeProducts
    }

    return activeProducts.filter((product) => {
      const title = product.title?.toLowerCase() ?? ''
      const category = product.category?.toLowerCase() ?? ''

      return title.includes(normalizedSearch) || category.includes(normalizedSearch)
    })
  }, [data, searchTerm, deletedIds])

  const summary = useMemo(() => {
    return extractProductsStats(filteredProducts)
  }, [filteredProducts])

  const cartQuantityById = useMemo(() => {
    return cartItems.reduce((accumulator, item) => {
      accumulator[item.id] = item.quantity
      return accumulator
    }, {})
  }, [cartItems])

  const handleDelete = (id) => {
    setDeletedIds((prev) => new Set([...prev, id]))
  }

  const handleShowProduct = (product) => {
    setSelectedProduct(product)
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const handleDeleteProduct = (productId) => {
    setDeletedIds((prev) => new Set([...prev, productId]))
    setSelectedProduct((currentProduct) => (currentProduct?.id === productId ? null : currentProduct))
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Badge className="w-fit bg-accent text-accent-foreground hover:bg-accent">Standalone dashboard</Badge>
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-50 md:text-4xl">Product dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-300">
              This page uses React Query and shadcn-style components to pull live product data from Fake Store API.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? 'Refreshing...' : 'Refresh data'}
          </Button>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {currentUserEmail ? `Signed in as ${currentUserEmail}` : 'Not signed in'}
          </Badge>
        </div>
      </header>

      <DashboardStatsCards summary={summary} cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

      <AuthPanel />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
        <ProductTable
          products={filteredProducts}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          cartQuantities={cartQuantityById}
          onAddToCart={handleAddToCart}
          onShowProduct={handleShowProduct}
          onDeleteProduct={handleDeleteProduct}
          canAddToCart={Boolean(currentUserEmail)}
        />

        <CartPanel />
      </div>

      <ProductDetailsDialog
        selectedProduct={selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
        onDeleteProduct={handleDeleteProduct}
      />
    </section>
  )
}

export default DemDashboardPage