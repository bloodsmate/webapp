import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api/apiClient"

export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async (paymentData: any, { rejectWithValue }) => {
    try {
      return await api.processPayment(paymentData)
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  },
)

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    paymentResult: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true
        state.error = null
        state.paymentResult = null
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false
        state.paymentResult = action.payload
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default paymentSlice.reducer

