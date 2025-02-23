import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/apiClient";

export interface Stock {
  size: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  images: string[];
  sizes: string[];
  stock: Stock[];
  color: string;
  inStock: boolean;
  gender: "Men" | "Women" | "Unisex";
  category: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getProducts();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      return await api.getProduct(id);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductStock: (state, action) => {
      const { productId, newStock } = action.payload;
      const product = state.items.find((p: any) => p.id === productId);
      if (product) {
        product.stock = newStock;
      }
    },
    updateProductPrice: (state, action) => {
      const { productId, newPrice } = action.payload;
      const product = state.items.find((p: any) => p.id === productId);
      if (product) {
        product.price = newPrice;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.product;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateProductStock, updateProductPrice } = productSlice.actions;
export default productSlice.reducer;