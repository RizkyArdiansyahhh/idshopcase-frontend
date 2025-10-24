import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDeleteCartItem } from "@/features/cart/api/delete-cart";
import { api } from "@/lib/axios";

jest.mock("@/lib/axios");

(api.delete as jest.Mock).mockResolvedValue({ data: {} });

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test("useDeleteCartItem deletes cart item", async () => {
  const { result } = renderHook(() => useDeleteCartItem(), { wrapper });

  await act(async () => {
    result.current.mutate(1); // id = 1
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
