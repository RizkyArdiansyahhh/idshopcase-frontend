// src/__test__/api/useGetDistricts.spec.tsx
import { renderHook, waitFor } from "@testing-library/react";
import { useGetDistricts } from "@/features/address/api/get-districts";
import { wilayahApi } from "@/lib/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/lib/axios", () => ({
  wilayahApi: {
    get: jest.fn(),
  },
}));

describe("useGetDistricts", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const sampleDistricts = [
    { id: "1", name: "District A" },
    { id: "2", name: "District B" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch districts successfully", async () => {
    (wilayahApi.get as jest.Mock).mockResolvedValue({ data: sampleDistricts });

    const { result } = renderHook(
      () => useGetDistricts({ codeRegency: "321" }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(wilayahApi.get).toHaveBeenCalledWith("/districts/321.json");
    expect(result.current.data).toEqual(sampleDistricts);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle error", async () => {
    const error = new Error("Network Error");
    (wilayahApi.get as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(
      () => useGetDistricts({ codeRegency: "321" }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(wilayahApi.get).toHaveBeenCalledWith("/districts/321.json");
    expect(result.current.error).toEqual(error);
    expect(result.current.data).toBeUndefined();
  });
});
