// src/__test__/api/useCreateAddress.spec.tsx
import { renderHook, act } from "@testing-library/react";
import { useCreateAddress } from "@/features/address/api/create-address";
import { api } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";

// Mock axios
jest.mock("@/lib/axios", () => ({
  api: { post: jest.fn() },
}));

// Mock react-query queryClient
jest.mock("@/lib/react-query", () => ({
  queryClient: { invalidateQueries: jest.fn() },
}));

// Mock toast
jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

// Mock localStorage
beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => "fake-token"),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});

describe("useCreateAddress", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sampleAddress = {
    recipient_name: "John Doe",
    phone: "1234567890",
    province: "California",
    city: "San Francisco",
    district: "Downtown",
    sub_district: "East Side",
    postal_code: "94103",
    detail: "123 Main St",
    is_primary: false,
  };

  it("should call API and show success toast on success", async () => {
    (api.post as jest.Mock).mockResolvedValue({ data: { id: 1 } });

    const { result } = renderHook(() => useCreateAddress());

    await act(async () => {
      await result.current.mutateAsync(sampleAddress);
    });

    expect(api.post).toHaveBeenCalledWith("/addresses", sampleAddress, {
      headers: { Authorization: "Bearer fake-token" },
    });
    expect(queryClient.invalidateQueries).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Address created");
  });

  it("should call toast.error on API failure", async () => {
    const error = new Error("Network Error");
    (api.post as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useCreateAddress());

    await act(async () => {
      await expect(result.current.mutateAsync(sampleAddress)).rejects.toThrow(
        "Network Error"
      );
    });

    expect(toast.error).toHaveBeenCalledWith("Network Error");
    expect(queryClient.invalidateQueries).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("should call custom onSuccess callback if provided", async () => {
    (api.post as jest.Mock).mockResolvedValue({ data: { id: 2 } });
    const onSuccessMock = jest.fn();

    const { result } = renderHook(() =>
      useCreateAddress({ mutationConfig: { onSuccess: onSuccessMock } })
    );

    await act(async () => {
      await result.current.mutateAsync(sampleAddress);
    });

    expect(onSuccessMock).toHaveBeenCalled();
    expect(queryClient.invalidateQueries).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Address created");
  });
});
