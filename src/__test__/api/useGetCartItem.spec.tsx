import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetCartItems } from "@/features/cart/api/get-cart-items";

// Mock axios
import { api } from "@/lib/axios";
jest.mock("@/lib/axios");

const mockData = [
  {
    id: 1,
    productId: 101,
    quantity: 2,
    price: 50000,
    createdAt: "2025-10-24T00:00:00Z",
  },
];

(api.get as jest.Mock).mockResolvedValue({ data: mockData });

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test("useGetCartItems fetches cart items", async () => {
  const { result } = renderHook(() => useGetCartItems(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(mockData);
});
