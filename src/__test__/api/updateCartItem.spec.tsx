import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateCartItem } from "@/features/cart/api/update-cart";
import { api } from "@/lib/axios";

jest.mock("@/lib/axios");

const mockResponse = { id: 1, quantity: 5 };
(api.patch as jest.Mock).mockResolvedValue({ data: mockResponse });

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test("useUpdateCartItem updates cart item", async () => {
  const { result } = renderHook(() => useUpdateCartItem(), { wrapper });

  await act(async () => {
    result.current.mutate({ id: 1, quantity: 5 });
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(mockResponse);
});
