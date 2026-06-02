import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-ink-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-ink-400">{rating.toFixed(1)}</span>
    </div>
  )
}

function ProductCard({ product, onProductClick }) {
  const dispatch = useDispatch()
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)

  return (
    <article
      onClick={() => onProductClick?.(product)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line-700 bg-surface-900/75 transition-all duration-200 hover:border-brand-400/50 hover:shadow-lg hover:shadow-brand-300/5"
    >
      <div className="relative overflow-hidden bg-canvas-900">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full border border-line-600 bg-canvas-950/80 px-2 py-0.5 text-xs text-ink-300 backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1 space-y-1">
          <p className="text-xs text-ink-400">{product.brand ?? product.category}</p>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink-50">{product.title}</h3>
        </div>

        <StarRating rating={product.rating} />

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-brand-300">${discountedPrice}</span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-ink-500 line-through">${product.price.toFixed(2)}</span>
          )}
        </div>

        <p className="text-xs text-ink-400">
          {product.stock > 0 ? (
            <span className="text-emerald-400">{product.stock} in stock</span>
          ) : (
            <span className="text-rose-400">Out of stock</span>
          )}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation()
            dispatch(addToCart({ ...product, image: product.thumbnail }))
          }}
          disabled={product.stock === 0}
          className="mt-auto w-full rounded-xl bg-brand-300 py-2 text-sm font-semibold text-canvas-950 transition hover:bg-brand-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard
