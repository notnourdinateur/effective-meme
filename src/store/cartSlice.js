import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
        return
      }

      state.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1,
      })
    },
    increaseQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload)

      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload)

      if (!item) {
        return
      }

      if (item.quantity === 1) {
        state.items = state.items.filter((cartItem) => cartItem.id !== action.payload)
        return
      }

      item.quantity -= 1
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
