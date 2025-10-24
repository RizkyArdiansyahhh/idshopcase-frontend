import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetProvinces } from "@/features/address/api/get-province";
import { wilayahApi } from "@/lib/axios";

jest.mock("@/lib/axios", () => ({
  wilayahApi: {
    get: jest.fn(),
  },
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetProvinces", () => {
  it("fetches provinces successfully", async () => {
    const mockData = [
      { id: "1", name: "Jawa Barat" },
      { id: "2", name: "Jawa Timur" },
    ];
    (wilayahApi.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useGetProvinces(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
  });

  it("handles error", async () => {
    (wilayahApi.get as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    const { result } = renderHook(() => useGetProvinces(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
