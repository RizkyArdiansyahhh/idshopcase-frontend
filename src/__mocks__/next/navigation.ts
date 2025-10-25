export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
});

import { renderHook, act, waitFor } from "@testing-library/react";
import { useLogin } from "@/features/auth/api/login";
import { api } from "@/lib/axios";
import * as nextNavigation from "next/navigation";

export const usePathname = jest.fn(() => "/");
export const useSearchParams = jest.fn(() => new URLSearchParams());

jest.mock("@/lib/axios");
const mockedApi = api as jest.Mocked<typeof api>;

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

test("calls router.replace on login success", async () => {
  const router = nextNavigation.useRouter();
  const mockResponse = { user: { id: 1 }, accessToken: "token" };
  mockedApi.post.mockResolvedValueOnce({ data: mockResponse });

  const { result } = renderHook(() => useLogin());

  act(() => {
    result.current.mutate({ email: "test@test.com", password: "Abcd1234" });
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(router.replace).toHaveBeenCalledWith("/");
});
