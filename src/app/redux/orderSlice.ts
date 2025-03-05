import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/app/api/apiClient";
import { Order } from '@/app/data/orderTypes';

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchOrdersByUserId = createAsyncThunk(
  "orders/fetchOrdersByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await api.getOrdersByUserId(Number(userId));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchOrdersByOrderId = createAsyncThunk(
  "orders/fetchOrdersByOrderId",
  async (orderId: string, { rejectWithValue }) => {
    try {
      return await api.getOrdersByOrderId(orderId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: any, { rejectWithValue }) => {
    try {
      const response = await api.createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch orders by userId
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch orders by orderId
      .addCase(fetchOrdersByOrderId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersByOrderId.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(fetchOrdersByOrderId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create a new order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;