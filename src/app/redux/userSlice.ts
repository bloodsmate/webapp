import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as api from "@/app/api/apiClient";

export const updateShippingDetails = createAsyncThunk(
  'user/updateShippingDetails',
  async ({ userId, shippingAddress, city, zipCode, phone }, { rejectWithValue }) => {
    try {
      return await api.updateShippingDetails({ userId, shippingAddress, city, zipCode, phone });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAccountDetails = createAsyncThunk(
  'user/updateAccountDetails',
  async ({ userId, name, email, password }, { rejectWithValue }) => {
    try {
      return await api.updateAccountDetails({ userId, name, email, password });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Update Shipping Details
      .addCase(updateShippingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShippingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateShippingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update shipping details';
      })

      // Update Account Details
      .addCase(updateAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update account details';
      });
  },
});

export default userSlice.reducer;