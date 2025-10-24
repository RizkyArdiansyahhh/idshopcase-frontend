import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetRegencies } from "@/features/address/api/get-regencies";
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

describe("useGetRegencies", () => {
  const codeProvince = "12";

  it("fetches regencies successfully", async () => {
    const mockData = [
      { id: "1201", name: "Kab. Bandung" },
      { id: "1202", name: "Kab. Cimahi" },
    ];
    (wilayahApi.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useGetRegencies({ codeProvince }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it("handles error", async () => {
    (wilayahApi.get as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    const { result } = renderHook(() => useGetRegencies({ codeProvince }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
