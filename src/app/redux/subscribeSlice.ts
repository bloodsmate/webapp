// slices/subscribeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subscribeToNewsletter, checkSubscriptionStatus } from "@/app/api/apiClient";

interface SubscribeState {
  loading: boolean;
  error: string | null;
  isSubscribed: boolean;
}

const initialState: SubscribeState = {
  loading: false,
  error: null,
  isSubscribed: false,
};

export const subscribe = createAsyncThunk(
  "subscribe/subscribe",
  async (email: string, { rejectWithValue }) => {
    try {
      return await subscribeToNewsletter(email);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const checkSubscription = createAsyncThunk(
  "subscribe/checkSubscription",
  async (email: string, { rejectWithValue }) => {
    try {
      return await checkSubscriptionStatus(email);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribe.fulfilled, (state) => {
        state.loading = false;
        state.isSubscribed = true;
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(checkSubscription.fulfilled, (state, action) => {
        state.isSubscribed = action.payload;
      });
  },
});

export default subscribeSlice.reducer;