// file: test-utils.tsx
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Buat QueryClient khusus untuk testing
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // supaya tidak retry saat error
      },
    },
  });

// 2. Wrapper untuk Provider
export const QueryClientWrapper = ({ children }: { children: ReactNode }) => {
  const client = createQueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
