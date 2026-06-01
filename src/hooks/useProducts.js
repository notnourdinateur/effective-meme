import { useQuery } from '@tanstack/react-query'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=30'

async function fetchProducts() {
  const response = await fetch(PRODUCTS_URL)
  if (!response.ok) throw new Error(`Failed to load products: ${response.status}`)
  const data = await response.json()
  return data.products
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  })
}
