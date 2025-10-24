import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getUser, useGetUser } from "@/features/auth/api/get-user";
import { api } from "@/lib/axios";
import React from "react";

jest.mock("@/lib/axios", () => ({
  api: {
    get: jest.fn(),
  },
}));

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

const createWrapper = () => {
  const queryClient = new QueryClient();
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe("getUser API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch user data successfully", async () => {
    const mockData = { id: 1, name: "John Doe", email: "john@example.com" };
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const result = await getUser(1);

    expect(api.get).toHaveBeenCalledWith(`/users/1`, {
      headers: { Authorization: "Bearer fake-token" },
    });
    expect(result).toEqual(mockData);
  });

  it("should throw an error if API fails", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
    await expect(getUser(1)).rejects.toThrow("Network error");
  });
});

describe("useGetUser Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data when query succeeds", async () => {
    const mockData = { id: 1, name: "Jane Doe", email: "jane@example.com" };
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useGetUser({ id: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it("should handle query error", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    const { result } = renderHook(() => useGetUser({ id: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
