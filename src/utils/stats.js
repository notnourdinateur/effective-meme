export function extractProductsStats(data = []) {
  const totalProducts = data.length
  const averagePrice = totalProducts > 0 
    ? data.reduce((sum, product) => sum + product.price, 0) / totalProducts 
    : 0

  return {
    totalProducts,
    averagePrice,
    categories: new Set(data.map((product) => product.category)).size,
  }
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
