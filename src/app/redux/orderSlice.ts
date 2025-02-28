import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api/apiClient"

// Fetch orders by userId
export const fetchOrdersByUserId = createAsyncThunk(
  "orders/fetchOrdersByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await api.getOrdersByUserId(userId) // Replace with your API call
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

// Create a new order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: any, { rejectWithValue }) => {
    try {
      const response = await api.createOrder(orderData) // Replace with your API call
      return response
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch orders by userId
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Create a new order
      .addCase(createOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload) // Add the new order to the list
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default orderSlice.reducer