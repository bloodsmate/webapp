import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/apiClient";

// Define the PaymentState interface
interface PaymentState {
  loading: boolean;
  error: string | null; // Allow error to be string or null
  paymentResult: any; // Adjust this type based on the actual structure of paymentResult
}

// Define the initial state
const initialState: PaymentState = {
  loading: false,
  error: null,
  paymentResult: null,
};

// Create the processPayment async thunk
export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async (paymentData: any, { rejectWithValue }) => {
    try {
      return await api.processPayment(paymentData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create the payment slice
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.paymentResult = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentResult = action.payload;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Now this is valid
      });
  },
});

export default paymentSlice.reducer;