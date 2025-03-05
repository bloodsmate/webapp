import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from "@/app/api/apiClient";

interface User {
  userId: string;
  name: string;
  email: string;
  shippingAddress?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

interface UpdateShippingDetailsPayload {
  userId: string;
  shippingAddress: string;
  city: string;
  zipCode: string;
  phone: string;
}

interface UpdateAccountDetailsPayload {
  userId: string;
  name: string;
  email: string;
  password: string;
}

export const updateShippingDetails = createAsyncThunk(
  'user/updateShippingDetails',
  async ({ userId, shippingAddress, city, zipCode, phone }: UpdateShippingDetailsPayload, { rejectWithValue }) => {
    try {
      return await api.updateShippingDetails({ userId, shippingAddress, city, zipCode, phone });
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAccountDetails = createAsyncThunk(
  'user/updateAccountDetails',
  async ({ userId, name, email, password }: UpdateAccountDetailsPayload, { rejectWithValue }) => {
    try {
      return await api.updateAccountDetails({ userId, name, email, password });
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Update Shipping Details
      .addCase(updateShippingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShippingDetails.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateShippingDetails.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update shipping details';
      })

      // Update Account Details
      .addCase(updateAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountDetails.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateAccountDetails.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update account details';
      });
  },
});

export default userSlice.reducer;