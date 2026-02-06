import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "./styles/globals.css";
import AuthProvider from "./providers/AuthProvider.tsx";
import Providers from "./providers/ToastProvide.tsx";

const cacheClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={cacheClient}>
      <AuthProvider>
        <BrowserRouter>
          <Providers>
            <Provider>
              <App />
            </Provider>
          </Providers>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
