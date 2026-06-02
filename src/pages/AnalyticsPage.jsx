import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Card } from '../components/ui/card'

export default function AnalyticsPage() {
  const cartItems = useSelector((state) => state.cart.items)
  const allowedEmails = useSelector((state) => state.auth.allowedEmails)
  const currentUser = useSelector((state) => state.auth.currentUserEmail)

  // Fake orders (since no backend exists)
  const mockOrders = [
    { id: 1, total: 120, date: '2026-06-01' },
    { id: 2, total: 80, date: '2026-06-02' },
    { id: 3, total: 150, date: '2026-06-03' },
    { id: 4, total: 60, date: '2026-06-04' },
  ]

  // KPI calculations
  const totalRevenue = useMemo(() => {
    return mockOrders.reduce((sum, o) => sum + o.total, 0)
  }, [])

  const totalOrders = mockOrders.length

  const totalUsers = allowedEmails.length

  const cartItemsCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }, [cartItems])

  // Most expensive product in cart (simple insight)
  const topCartItem = useMemo(() => {
    if (cartItems.length === 0) return null

    return cartItems.reduce((max, item) => {
      const value = item.price * item.quantity
      const maxValue = max.price * max.quantity
      return value > maxValue ? item : max
    })
  }, [cartItems])

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold">Admin Analytics</h1>
        <p className="text-gray-400 text-sm">
          Overview of system performance and ecommerce metrics
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <Card className="p-4">
          <p className="text-sm text-gray-400">Revenue</p>
          <p className="text-2xl font-bold">${totalRevenue}</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-400">Orders</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-400">Users</p>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-400">Cart Items</p>
          <p className="text-2xl font-bold">{cartItemsCount}</p>
        </Card>

      </div>

      {/* SECOND ROW */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* TOP CART PRODUCT */}
        <Card className="p-4">
          <h2 className="font-bold mb-2">Cart Insights</h2>

          {topCartItem ? (
            <div>
              <p className="text-sm text-gray-400">
                Most valuable item in cart:
              </p>

              <p className="font-semibold">
                {topCartItem.title}
              </p>

              <p className="text-sm">
                Quantity: {topCartItem.quantity}
              </p>

              <p className="text-sm">
                Total Value: $
                {(topCartItem.price * topCartItem.quantity).toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No items in cart</p>
          )}
        </Card>

        {/* USER INFO */}
        <Card className="p-4">
          <h2 className="font-bold mb-2">User Status</h2>

          <p className="text-sm text-gray-400">
            Current session:
          </p>

          <p className="font-semibold">
            {currentUser || 'Not logged in'}
          </p>

          <p className="text-sm mt-2">
            Active system users: {allowedEmails.length}
          </p>
        </Card>

      </div>

      {/* FAKE ORDERS TABLE */}
      <Card className="p-4">
        <h2 className="font-bold mb-4">Recent Orders (Mock Data)</h2>

        <div className="space-y-2">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between border-b border-gray-800 py-2"
            >
              <span>Order #{order.id}</span>
              <span>{order.date}</span>
              <span className="font-semibold">
                ${order.total}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* SIMPLE VISUAL BARS */}
      <Card className="p-4">
        <h2 className="font-bold mb-4">Performance Overview</h2>

        <div className="space-y-3">

          <div>
            <p className="text-sm">Revenue</p>
            <div className="w-full bg-gray-800 h-2 rounded">
              <div className="bg-green-500 h-2 w-[80%]" />
            </div>
          </div>

          <div>
            <p className="text-sm">Orders</p>
            <div className="w-full bg-gray-800 h-2 rounded">
              <div className="bg-blue-500 h-2 w-[60%]" />
            </div>
          </div>

          <div>
            <p className="text-sm">Users</p>
            <div className="w-full bg-gray-800 h-2 rounded">
              <div className="bg-purple-500 h-2 w-[90%]" />
            </div>
          </div>

        </div>
      </Card>

    </div>
  )
}