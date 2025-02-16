import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import wishlistReducer from "./wishlistSlice";
import waitlistReducer from "./waitlistSlice";
import orderReducer from "./orderSlice";
import paymentReducer from "./paymentSlice";

const productPersistConfig = {
  key: "product", // Key for the persisted state
  storage, // Storage engine (localStorage by default)
  whitelist: ["items", "selectedProduct"], // Only persist these fields
};

const cartPersistConfig = {
  key: "cart",
  storage, 
  whitelist: ["items"],
};

const persistedProductReducer = persistReducer(productPersistConfig, productReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const rootReducer = {
  products: persistedProductReducer,
  auth: authReducer,
  cart: persistedCartReducer,
  wishlist: wishlistReducer,
  waitlist: waitlistReducer,
  orders: orderReducer,
  payment: paymentReducer, // (not persisted)
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore redux-persist actions
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;