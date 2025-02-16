// src/app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import ClientPersistGate from "./ClientPersistGate";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ClientPersistGate>{children}</ClientPersistGate>
    </Provider>
  );
}