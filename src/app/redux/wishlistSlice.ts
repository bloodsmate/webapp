import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/apiClient";

// Define the `WishlistItem` type
type WishlistItem = {
  id: number; // Assuming `productId` is a number
  name: string;
  image: string;
  price: number;
  // Add other properties if needed (e.g., name, price, etc.)
};

// Define the `WishlistState` type
type WishlistState = {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
};

// Define the initial state
const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk to fetch the wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getWishlist();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to add an item to the wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId: number, { rejectWithValue }) => {
    try {
      return await api.addToWishlist(productId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to remove an item from the wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId: number, { rejectWithValue }) => {
    try {
      await api.removeFromWishlist(productId);
      return productId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create the slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Ensure `action.payload` is of type `WishlistItem[]`
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload); // Ensure `action.payload` is of type `WishlistItem`
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload); // Ensure `action.payload` is of type `number` (productId)
      });
  },
});

export default wishlistSlice.reducer;