import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, Plus, Minus, Trash2, ChevronRight, Package } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../store/cartSlice'
import { cn } from '../../lib/utils'

// ── Payment method logos ──────────────────────────────────────────────────────

function VisaLogo() {
  return (
    <div className="flex h-8 w-[52px] items-center justify-center rounded-md bg-[#1A1F71]">
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: '900', fontStyle: 'italic', fontSize: '14px', letterSpacing: '1px', color: '#fff' }}>
        VISA
      </span>
    </div>
  )
}

function MastercardLogo() {
  return (
    <div className="flex h-8 w-[52px] items-center justify-center rounded-md bg-[#1a1a1a]">
      <div className="relative h-5 w-7">
        <div className="absolute left-0 top-0 h-5 w-5 rounded-full bg-[#EB001B]" />
        <div className="absolute right-0 top-0 h-5 w-5 rounded-full bg-[#F79E1B]" />
        <div className="absolute left-[6px] top-0 h-5 w-2 bg-[#FF5F00]" />
      </div>
    </div>
  )
}

function PayPalLogo() {
  return (
    <div className="flex h-8 w-[60px] items-center justify-center rounded-md bg-[#003087]">
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '12px' }}>
        <span style={{ color: '#009CDE' }}>Pay</span>
        <span style={{ color: '#ffffff' }}>Pal</span>
      </span>
    </div>
  )
}

function ApplePayLogo() {
  return (
    <div className="flex h-8 w-[70px] items-center justify-center gap-1 rounded-md bg-black">
      <svg className="h-4 w-3.5 flex-shrink-0" viewBox="0 0 814 1000" fill="white">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-37.6-155.5-127.4C46 454.2 0 341 0 220.5c0-169.2 110.6-256.9 220.3-256.9 58.2 0 106.8 38.1 143.4 38.1 35.2 0 90.3-40.2 157.6-40.2 24.3 0 108.2 2.6 168.6 80.1zm-87.7-44.3c-8.4-42.8-31.8-81.8-67.1-109.6-35.3-27.7-75.4-41.7-116.4-41.7 11.3-26.3 17.3-54.3 17.3-82.7 0-5.2-.3-10.5-.8-15.8C528.9 47.9 469.4 74.4 429.8 107.3c-39.6 32.9-62.7 82.6-62.7 133.3 0 5.5.5 11 1.2 16.5 4.5.4 9.1.6 13.7.6 37.3 0 75.6-13.4 104.7-36.6 29.1-23.3 50.8-56.3 59.7-93.1z" />
      </svg>
      <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: '500', color: '#fff' }}>
        Pay
      </span>
    </div>
  )
}

function GooglePayLogo() {
  return (
    <div className="flex h-8 w-[70px] items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-1.5">
      <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
      <span style={{ fontSize: '12px', fontWeight: '500', color: '#5f6368' }}>Pay</span>
    </div>
  )
}

// ── Config ────────────────────────────────────────────────────────────────────

const PAYMENT_METHODS = [
  { id: 'visa',        label: 'Visa',        Logo: VisaLogo },
  { id: 'mastercard',  label: 'Mastercard',  Logo: MastercardLogo },
  { id: 'paypal',      label: 'PayPal',      Logo: PayPalLogo },
  { id: 'apple-pay',   label: 'Apple Pay',   Logo: ApplePayLogo },
  { id: 'google-pay',  label: 'Google Pay',  Logo: GooglePayLogo },
]

const CHECKOUT_LABELS = {
  visa:          'Pay with Card',
  mastercard:    'Pay with Card',
  paypal:        'Continue with PayPal',
  'apple-pay':   'Apple Pay',
  'google-pay':  'Google Pay',
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CartItem({ item }) {
  const dispatch = useDispatch()
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-line-700 bg-canvas-900">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-xs font-medium leading-tight text-ink-100">{item.title}</p>
        <p className="text-xs font-semibold text-brand-300">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <p className="text-[11px] text-ink-500">${item.price.toFixed(2)} each</p>
      </div>

      <div className="flex flex-shrink-0 items-center gap-1">
        <button
          onClick={() => dispatch(decreaseQuantity(item.id))}
          className="flex h-6 w-6 items-center justify-center rounded-md border border-line-700 text-ink-400 transition hover:border-brand-400/50 hover:text-ink-50"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-5 text-center text-xs font-semibold text-ink-100">{item.quantity}</span>
        <button
          onClick={() => dispatch(increaseQuantity(item.id))}
          className="flex h-6 w-6 items-center justify-center rounded-md border border-line-700 text-ink-400 transition hover:border-brand-400/50 hover:text-ink-50"
        >
          <Plus className="h-3 w-3" />
        </button>
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md text-ink-600 transition hover:text-rose-400"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

function CartDropdown() {
  const items = useSelector((state) => state.cart.items)
  const [selectedMethod, setSelectedMethod] = useState('visa')

  const subtotal   = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping   = subtotal > 0 && subtotal < 50 ? 4.99 : 0
  const total      = subtotal + shipping
  const itemCount  = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Popover>
      {/* Trigger */}
      <PopoverTrigger asChild>
        <button className="relative flex items-center gap-2 rounded-xl border border-line-700 bg-surface-900 px-3 py-2 text-sm font-medium text-ink-200 transition hover:border-brand-400 hover:bg-surface-800 hover:text-ink-50">
          <ShoppingCart className="h-4 w-4" />
          <span>Cart</span>
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-300 px-1 text-[10px] font-bold text-canvas-950">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      {/* Dropdown panel */}
      <PopoverContent className="w-[420px] overflow-hidden p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line-700 bg-surface-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-brand-300" />
            <span className="text-sm font-semibold text-ink-50">Your Cart</span>
            {itemCount > 0 && (
              <span className="rounded-full bg-surface-800 px-2 py-0.5 text-[11px] font-medium text-brand-300">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-800 text-ink-600">
              <Package className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink-300">Your cart is empty</p>
              <p className="mt-0.5 text-xs text-ink-600">Add products from the catalog below</p>
            </div>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="max-h-60 divide-y divide-line-700 overflow-y-auto bg-[#1c3152] px-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-line-700 bg-canvas-950 px-4 py-3 space-y-1.5">
              <div className="flex justify-between text-xs text-ink-400">
                <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-ink-400">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="font-medium text-emerald-400">Free</span>
                ) : (
                  <span>${shipping.toFixed(2)}</span>
                )}
              </div>
              {shipping > 0 && (
                <p className="text-[11px] text-ink-600">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="flex justify-between border-t border-line-700 pt-2 text-sm font-semibold">
                <span className="text-ink-100">Total</span>
                <span className="text-brand-300">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment methods */}
            <div className="border-t border-line-700 bg-surface-800 px-4 py-3">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-ink-500">
                Payment method
              </p>
              <div className="flex flex-wrap gap-2">
                {PAYMENT_METHODS.map(({ id, label, Logo }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedMethod(id)}
                    title={label}
                    className={cn(
                      'rounded-lg border-2 p-0.5 transition-all duration-150 focus:outline-none',
                      selectedMethod === id
                        ? 'border-brand-300 shadow-sm shadow-brand-300/20'
                        : 'border-transparent hover:border-line-600',
                    )}
                  >
                    <Logo />
                  </button>
                ))}
              </div>
            </div>

            {/* Checkout button */}
            <div className="border-t border-line-700 bg-surface-800 px-4 pb-4 pt-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-300 py-2.5 text-sm font-semibold text-canvas-950 transition hover:bg-brand-200 active:scale-[0.98]">
                {CHECKOUT_LABELS[selectedMethod]}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default CartDropdown
