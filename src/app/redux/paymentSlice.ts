import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as api from "@/app/api/apiClient";

interface CreatePayHerePaymentArgs {
  amount: number;
  email: string;
  orderId: string;
  name: string;
  address: string;
  city: string;
  phone: string;
}

export const createPayHerePayment = createAsyncThunk(
  'payment/createPayHerePayment',
  async ({ amount, email, orderId, name, address, city, phone }: CreatePayHerePaymentArgs, { rejectWithValue }) => {
    try {
      const paymentData = {
        orderId,
        amount,
        email,
        name,
        address,
        city,
        phone
      }
       
      const response = await api.processPayment(paymentData);
      console.log(response);
      return response;

      // const response = await axios.post('/api/payment/create-payment', {
      //   amount,
      //   email,
      //   orderId,
      // });
      // return response.data.payment_url;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentUrl: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.paymentUrl = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayHerePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayHerePayment.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.paymentUrl = action.payload;
      })
      .addCase(createPayHerePayment.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create payment';
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;