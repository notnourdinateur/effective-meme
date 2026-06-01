import { useSelector } from 'react-redux'
import { Card } from '../components/ui/card'

export default function AnalyticsPage() {
  const cartItems = useSelector((state) => state.cart.items)

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const totalValue = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h2 className="font-bold">Cart Items</h2>
        <p className="text-2xl">{totalItems}</p>
      </Card>

      <Card className="p-4">
        <h2 className="font-bold">Cart Value</h2>
        <p className="text-2xl">${totalValue.toFixed(2)}</p>
      </Card>
    </div>
  )
}