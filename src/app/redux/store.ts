import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import cartReducer from "./cartSlice"
import productReducer from "./productSlice"
import wishlistReducer from "./wishlistSlice"
import waitlistReducer from "./waitlistSlice"
import orderReducer from "./orderSlice"
import paymentReducer from "./paymentSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    waitlist: waitlistReducer,
    orders: orderReducer,
    payment: paymentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

