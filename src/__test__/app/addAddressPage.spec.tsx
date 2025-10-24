import { Address } from "@/features/address/components/address";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <Address />
  </QueryClientProvider>
);
