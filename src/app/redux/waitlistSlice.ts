import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/apiClient";

// Define the `WaitlistItem` type
type WaitlistItem = {
  id: number; // Assuming `waitlistItemId` is a number
  productId: number;
  size: string;
  // Add other properties if needed
};

// Define the `WaitlistState` type
type WaitlistState = {
  items: WaitlistItem[];
  loading: boolean;
  error: string | null;
};

// Define the initial state
const initialState: WaitlistState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk to fetch the waitlist
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

// Async thunk to add an item to the waitlist
export const addToWaitlist = createAsyncThunk(
  "waitlist/addToWaitlist",
  async ({ productId, size }: { productId: number; size: string }, { rejectWithValue }) => {
    try {
      return await api.addToWaitlist(productId, size);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to remove an item from the waitlist
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

// Create the slice
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
        state.items = action.payload; // Ensure `action.payload` is of type `WaitlistItem[]`
      })
      .addCase(fetchWaitlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure `action.payload` is of type `string`
      })
      .addCase(addToWaitlist.fulfilled, (state, action) => {
        state.items.push(action.payload); // Ensure `action.payload` is of type `WaitlistItem`
      })
      .addCase(removeFromWaitlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload); // Ensure `action.payload` is of type `number` (waitlistItemId)
      });
  },
});

export default waitlistSlice.reducer;