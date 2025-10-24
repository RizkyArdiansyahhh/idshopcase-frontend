import { renderHook, act } from "@testing-library/react";
import { useDeleteCartItem } from "@/features/cart/api/delete-cart";
import * as reactQuery from "@tanstack/react-query";
import * as apiModule from "@/lib/axios";

jest.mock("@/lib/axios", () => ({
  api: {
    delete: jest.fn(),
  },
}));

// Mock queryClient
const invalidateQueriesMock = jest.fn();
jest.spyOn(reactQuery, "useQueryClient").mockReturnValue({
  invalidateQueries: invalidateQueriesMock,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);

describe("useDeleteCartItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "fake-token"),
      },
      writable: true,
    });
  });

  it("calls api.delete with correct id", async () => {
    const apiDeleteSpy = jest
      .spyOn(apiModule.api, "delete")
      .mockResolvedValue({});

    const { result } = renderHook(() => useDeleteCartItem());

    await act(async () => {
      await result.current.mutateAsync(42);
    });

    expect(apiDeleteSpy).toHaveBeenCalledWith("/cartItems/42", {
      headers: {
        Authorization: "Bearer fake-token",
      },
    });
  });

  it("invalidates queries on success", async () => {
    jest.spyOn(apiModule.api, "delete").mockResolvedValue({});

    const { result } = renderHook(() => useDeleteCartItem());

    await act(async () => {
      await result.current.mutateAsync(100);
    });

    expect(invalidateQueriesMock).toHaveBeenCalled();
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: expect.any(Array),
    });
  });
});
