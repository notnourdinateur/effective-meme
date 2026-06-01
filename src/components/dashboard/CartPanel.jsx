import { useDispatch, useSelector } from 'react-redux'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { decreaseQuantity, increaseQuantity, clearCart, removeFromCart } from '../../store/cartSlice'
import { formatPrice } from '../../utils/stats'
import { Minus, Plus, ShoppingCart, X } from 'lucide-react'

function CartPanel() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const cartSummary = cartItems.reduce(
    (summary, item) => {
      summary.totalItems += item.quantity
      summary.totalPrice += item.price * item.quantity
      return summary
    },
    { totalItems: 0, totalPrice: 0 },
  )

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart
            </CardTitle>
            <CardDescription>
              {cartSummary.totalItems} item{cartSummary.totalItems === 1 ? '' : 's'} in your cart
            </CardDescription>
          </div>
          {cartItems.length > 0 ? (
            <Button variant="ghost" size="sm" onClick={() => dispatch(clearCart())}>
              Clear all
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        {cartItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 p-6 text-sm text-ink-400">
            Your cart is empty. Login and add products from the listing to start building an order.
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-14 w-14 rounded-lg bg-white/90 object-contain p-2"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="space-y-1">
                        <p className="truncate font-medium text-ink-50">{item.title}</p>
                        <p className="text-xs text-ink-400">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-ink-50">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <Badge variant="secondary">Qty {item.quantity}</Badge>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => dispatch(increaseQuantity(item.id))}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-ink-300 hover:text-ink-50"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-ink-300">
                <span>Total items</span>
                <span>{cartSummary.totalItems}</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-ink-50">
                <span>Total</span>
                <span>{formatPrice(cartSummary.totalPrice)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default CartPanel
