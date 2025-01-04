import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size: string
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      )
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number, size: string }>) => {
      state.items = state.items.filter(
        item => !(item.id === action.payload.id && item.size === action.payload.size)
      )
    },
    updateQuantity: (state, action: PayloadAction<{ id: number, size: string, quantity: number }>) => {
      const item = state.items.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      )
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions

export default cartSlice.reducer

