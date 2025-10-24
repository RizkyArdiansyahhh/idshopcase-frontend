/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";
import { useDeleteCartItem } from "../../features/cart/api/delete-cart";
import { api } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { getCartItemsQueryKey } from "../../features/cart/api/get-cart-items";
import { getCartsQueryKey } from "../../features/cart/api/get-carts";
import { QueryClientProvider } from "@tanstack/react-query";

// 🔹 Mock API dan queryClient invalidate
jest.mock("@/lib/axios", () => ({
  api: {
    delete: jest.fn(),
  },
}));

jest.mock("@/lib/react-query", () => ({
  queryClient: {
    invalidateQueries: jest.fn(),
  },
}));

describe("useDeleteCartItem", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient as any}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls api.delete with correct ID and headers", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useDeleteCartItem(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(10);
    });

    expect(api.delete).toHaveBeenCalledWith("/cartItems/10", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });

  it("invalidates getCartItems and getCarts queries on success", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useDeleteCartItem(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(5);
    });

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: getCartItemsQueryKey(),
    });

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: getCartsQueryKey(),
    });
  });
});
