import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetCarts } from "@/features/cart/api/get-carts";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test("useGetCarts fetches data", async () => {
  const { result } = renderHook(() => useGetCarts(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
