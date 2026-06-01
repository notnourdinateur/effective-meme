import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import { formatPrice } from '../../utils/stats'
import { Eye, ShoppingCart, Trash2 } from 'lucide-react'

function ProductTable({
  products,
  isLoading,
  isError,
  error,
  refetch,
  searchTerm,
  onSearchTermChange,
  cartQuantities,
  onAddToCart,
  onShowProduct,
  onDeleteProduct,
  canAddToCart,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Search by title or category.</CardDescription>
          </div>
          <div className="w-full md:max-w-sm">
            <Input
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder="Search products"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Separator className="mb-4" />

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-full" />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive-foreground">
            <p className="font-semibold">Unable to load products</p>
            <p className="mt-1 text-destructive-foreground/80">
              {error instanceof Error ? error.message : 'Unknown error'}
            </p>
            <Button className="mt-4" variant="secondary" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const cartQuantity = cartQuantities[product.id] ?? 0

                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium text-ink-50">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-12 w-12 rounded-lg bg-white/90 object-contain p-2"
                          loading="lazy"
                        />
                        <div className="space-y-1">
                          <p className="max-w-md truncate">{product.title}</p>
                          <p className="text-xs text-ink-400">ID {product.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>{product.rating?.rate ?? 'N/A'} / 5</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAddToCart(product)}
                          disabled={!canAddToCart}
                          title={canAddToCart ? 'Add to cart' : 'Login to add items to cart'}
                          className="gap-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          {canAddToCart
                            ? cartQuantity > 0
                              ? `Add again (${cartQuantity})`
                              : 'Add to cart'
                            : 'Login required'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onShowProduct(product)}
                          title="View product details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          title="Delete product"
                          onClick={() => onDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-ink-400">
                    No products match your search.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductTable
