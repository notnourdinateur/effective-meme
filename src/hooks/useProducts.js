import { useQuery } from '@tanstack/react-query'

const PRODUCTS_API_URL = 'https://fakestoreapi.com/products'

async function fetchProducts() {
  const response = await fetch(PRODUCTS_API_URL)

  if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status}`)
  }

  return response.json()
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  })
}
