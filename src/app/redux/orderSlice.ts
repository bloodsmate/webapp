import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api/apiClient"

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    return await api.getOrders()
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const createOrder = createAsyncThunk("orders/createOrder", async (orderData: any, { rejectWithValue }) => {
  try {
    return await api.createOrder(orderData)
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

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
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
  },
})

export default orderSlice.reducer

