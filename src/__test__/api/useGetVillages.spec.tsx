import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetVillages } from "@/features/address/api/get-villages";
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

describe("useGetVillages", () => {
  const codeDistrict = "120101";

  it("fetches villages successfully", async () => {
    const mockData = [
      { id: "12010101", name: "Desa A" },
      { id: "12010102", name: "Desa B" },
    ];
    (wilayahApi.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useGetVillages({ codeDistrict }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it("handles error", async () => {
    (wilayahApi.get as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    const { result } = renderHook(() => useGetVillages({ codeDistrict }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
