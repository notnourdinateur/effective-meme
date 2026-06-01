import { useDispatch, useSelector } from 'react-redux'
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../store/cartSlice'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

export default function CartPage() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (items.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Your cart is empty</h2>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Cart</h1>

      {items.map((item) => (
        <Card key={item.id} className="p-4 flex justify-between items-center">
          <div>
            <h2 className="font-bold">{item.title}</h2>
            <p>${item.price}</p>

            <div className="flex items-center gap-2 mt-2">
              <Button onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
              <span>{item.quantity}</span>
              <Button onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </Button>
        </Card>
      ))}

      <div className="flex justify-between items-center pt-4 border-t">
        <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>

        <Button onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </div>
    </div>
  )
}