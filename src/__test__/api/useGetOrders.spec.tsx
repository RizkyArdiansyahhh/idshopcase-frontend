/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetOrders } from "@/features/orders/api/get-orders";
import { api } from "@/lib/axios";

// 🔹 Mock axios
jest.mock("@/lib/axios", () => ({
  api: {
    get: jest.fn(),
  },
}));

describe("useGetOrders", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches orders successfully", async () => {
    const mockOrders = [
      { id: 1, total: 200000, status: "paid" },
      { id: 2, total: 150000, status: "pending" },
    ];
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockOrders });

    const { result } = renderHook(() => useGetOrders(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.get).toHaveBeenCalledWith("/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    expect(result.current.data).toEqual(mockOrders);
  });

  it("handles fetch error properly", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useGetOrders(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Network error");
  });
});
