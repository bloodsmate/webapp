import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/app/api/apiClient";
import { RootState } from "@/app/redux/store"

type WaitlistItem = {
  id: number;
  productId: number;
  size: string;
  email: string;
};

type WaitlistState = {
  items: WaitlistItem[];
  loading: boolean;
  error: string | null;
};

const initialState: WaitlistState = {
  items: [],
  loading: false,
  error: null,
};

export const selectIsUserInWaitlist = (state: RootState, productId: number, size: string, email: string) => {
  return state.waitlist.items.some(
    (item) => item.productId === productId && item.size === size && item.email === email
  );
};

export const fetchWaitlist = createAsyncThunk(
  "waitlist/fetchWaitlist",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getWaitlist();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addToWaitlist = createAsyncThunk(
  "waitlist/addToWaitlist",
  async ({ productId, size, email }: { productId: number; size: string, email:string }, { rejectWithValue }) => {
    try {
      return await api.addToWaitlist(productId, size, email);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeFromWaitlist = createAsyncThunk(
  "waitlist/removeFromWaitlist",
  async (waitlistItemId: number, { rejectWithValue }) => {
    try {
      await api.removeFromWaitlist(waitlistItemId);
      return waitlistItemId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const waitlistSlice = createSlice({
  name: "waitlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaitlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWaitlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWaitlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToWaitlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWaitlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default waitlistSlice.reducer;