import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetAddressById } from "@/features/address/api/get-addressById";
import { api } from "@/lib/axios";

// Mock API
jest.mock("@/lib/axios", () => ({
  api: {
    get: jest.fn(),
  },
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetAddressById", () => {
  const addressId = 1;

  it("fetches address successfully", async () => {
    const mockData = {
      id: 1,
      street: "Jalan Sudirman",
      city: "Jakarta",
      postalCode: "10210",
    };
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useGetAddressById({ id: addressId }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it("handles error", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    const { result } = renderHook(() => useGetAddressById({ id: addressId }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
