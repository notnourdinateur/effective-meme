import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { X, Star, ShoppingCart, Tag, Package, Truck } from 'lucide-react'
import { addToCart } from '../../store/cartSlice'

function StarRating({ rating, reviewCount }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-ink-600'}`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-ink-100">{rating.toFixed(1)}</span>
      {reviewCount != null && (
        <span className="text-xs text-ink-500">({reviewCount} reviews)</span>
      )}
    </div>
  )
}

function ProductModal({ product, onClose }) {
  const dispatch = useDispatch()
  const [activeImage, setActiveImage] = useState(product.thumbnail)
  const [added, setAdded] = useState(false)

  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
  const images = product.images?.length ? product.images : [product.thumbnail]

  // Escape key + body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  function handleAddToCart() {
    dispatch(addToCart({ ...product, image: product.thumbnail }))
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line-700 bg-surface-900 shadow-2xl shadow-black/70">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line-700 bg-canvas-900/80 text-ink-400 transition hover:border-line-600 hover:text-ink-50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Scrollable body */}
        <div className="flex flex-col overflow-y-auto sm:flex-row">
          {/* ── Image column ── */}
          <div className="flex-shrink-0 bg-canvas-950 p-4 sm:w-72">
            <div className="overflow-hidden rounded-xl border border-line-700 bg-canvas-900">
              <img
                src={activeImage}
                alt={product.title}
                className="h-60 w-full object-contain"
                onError={(e) => { e.target.src = product.thumbnail }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`h-12 w-12 overflow-hidden rounded-lg border-2 transition ${
                      activeImage === img ? 'border-brand-300' : 'border-line-700 hover:border-line-600'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => { e.target.src = product.thumbnail }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details column ── */}
          <div className="flex flex-1 flex-col gap-5 p-6">
            {/* Category + brand + title */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-brand-400/40 bg-brand-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand-300">
                  {product.category}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[11px] font-semibold text-rose-400">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-ink-500">{product.brand ?? product.category}</p>
              <h2 className="text-xl font-bold leading-snug text-ink-50">{product.title}</h2>
            </div>

            {/* Rating */}
            <StarRating rating={product.rating} reviewCount={product.reviews?.length} />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-brand-300">${discountedPrice}</span>
              {product.discountPercentage > 0 && (
                <span className="text-base text-ink-500 line-through">${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-ink-300">{product.description}</p>

            {/* Stock + shipping */}
            <div className="space-y-2 rounded-xl border border-line-700 bg-canvas-950 p-3">
              <div className="flex items-center gap-2 text-xs">
                <Package className="h-3.5 w-3.5 text-ink-500" />
                {product.stock > 0 ? (
                  <span className="text-emerald-400">
                    <span className="font-semibold">{product.stock}</span> in stock
                  </span>
                ) : (
                  <span className="text-rose-400 font-semibold">Out of stock</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <Truck className="h-3.5 w-3.5 text-ink-500" />
                <span>{product.shippingInformation ?? 'Ships in 1–3 business days'}</span>
              </div>
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <Tag className="h-3 w-3 text-ink-600" />
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line-700 px-2 py-0.5 text-[11px] capitalize text-ink-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${
                added
                  ? 'bg-emerald-500 text-white'
                  : 'bg-brand-300 text-canvas-950 hover:bg-brand-200'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
