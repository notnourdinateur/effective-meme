import { useSelector } from 'react-redux'
import { Card } from '../components/ui/card'

export default function UserProfilePage() {
  const email = useSelector(
    (state) => state.auth.currentUserEmail
  )

  const cartItems = useSelector(
    (state) => state.cart.items
  )

  const role =
    email === 'admin@demo.com'
      ? 'Admin'
      : email
      ? 'Customer'
      : 'Guest'

  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )

  const orderHistory = [
    {
      id: 1001,
      date: '2026-05-10',
      total: 129.99,
    },
    {
      id: 1002,
      date: '2026-04-27',
      total: 84.5,
    },
  ]

  return (
    <div className="space-y-6">

      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          User Profile
        </h1>

        <p>
          <strong>Email:</strong>{' '}
          {email || 'Not logged in'}
        </p>

        <p>
          <strong>Role:</strong> {role}
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">
          Current Cart
        </h2>

        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b py-2"
              >
                <span>
                  {item.title} x {item.quantity}
                </span>

                <span>
                  $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="mt-4 font-bold">
              Total: $
              {cartTotal.toFixed(2)}
            </div>
          </>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">
          Order History
        </h2>

        {orderHistory.map((order) => (
          <div
            key={order.id}
            className="border-b py-3"
          >
            <p>
              Order #{order.id}
            </p>

            <p>
              Date: {order.date}
            </p>

            <p>
              Total: ${order.total}
            </p>
          </div>
        ))}
      </Card>

    </div>
  )
}