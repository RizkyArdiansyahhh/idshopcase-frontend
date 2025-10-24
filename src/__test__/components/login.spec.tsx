import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin } from "@/features/auth/api/login";
import { api } from "@/lib/axios";

jest.mock("@/lib/axios");
const mockedApi = api as jest.Mocked<typeof api>;

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useLogin", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should login successfully and store id/token", async () => {
    const mockResponse = {
      user: { id: 1, name: "Test User" },
      accessToken: "mock-token",
    };
    mockedApi.post.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => useLogin(), { wrapper });

    act(() => {
      result.current.mutate({
        email: "test@example.com",
        password: "Abcd1234",
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // cek localStorage
    expect(localStorage.getItem("id")).toBe("1");
    expect(localStorage.getItem("token")).toBe("mock-token");
  });

  it("should call onSuccess callback if provided", async () => {
    const mockResponse = {
      user: { id: 1, name: "Test User" },
      accessToken: "mock-token",
    };
    mockedApi.post.mockResolvedValueOnce({ data: mockResponse });

    const onSuccessMock = jest.fn();
    const { result } = renderHook(
      () => useLogin({ mutationConfig: { onSuccess: onSuccessMock } }),
      { wrapper }
    );

    act(() => {
      result.current.mutate({
        email: "test@example.com",
        password: "Abcd1234",
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(onSuccessMock).toHaveBeenCalledWith(
      mockResponse,
      { email: "test@example.com", password: "Abcd1234" },
      undefined,
      undefined
    );
  });

  it("should handle login error", async () => {
    const error = new Error("Invalid credentials");
    mockedApi.post.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useLogin(), { wrapper });

    act(() => {
      result.current.mutate({
        email: "test@example.com",
        password: "Abcd1234",
      });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
