import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api/apiClient"

export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
  try {
    return await api.getWishlist()
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId: number, { rejectWithValue }) => {
    try {
      return await api.addToWishlist(productId)
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  },
)

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId: number, { rejectWithValue }) => {
    try {
      await api.removeFromWishlist(productId)
      return productId
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  },
)

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item: any) => item.id !== action.payload)
      })
  },
})

export default wishlistSlice.reducer

