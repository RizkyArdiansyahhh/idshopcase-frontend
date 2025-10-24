import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateUser } from "@/features/profile/api/update-user";
import { api } from "@/lib/axios";
import { toast } from "sonner";

// Mock API dan toast
jest.mock("@/lib/axios");
jest.mock("sonner");

const mockedAxios = api as jest.Mocked<typeof api>;
const mockedToast = toast as jest.Mocked<typeof toast>;

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test("useUpdateUser mutation success", async () => {
  const mockResponse = { user: { id: 1, name: "Test User" } };
  mockedAxios.patch.mockResolvedValueOnce({ data: mockResponse });

  const { result } = renderHook(() => useUpdateUser(), { wrapper });

  result.current.mutate({ id: 1, data: new FormData() });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(mockedToast.success).toHaveBeenCalledWith("User updated");
});

test("useUpdateUser mutation error", async () => {
  const error = new Error("Failed update");
  mockedAxios.patch.mockRejectedValueOnce(error);

  const { result } = renderHook(() => useUpdateUser(), { wrapper });

  result.current.mutate({ id: 1, data: new FormData() });

  await waitFor(() => expect(result.current.isError).toBe(true));

  expect(mockedToast.error).toHaveBeenCalledWith(error.message);
});
test("useUpdateUser calls onSuccess callback if provided", async () => {
  const mockResponse = { user: { id: 1, name: "Test User" } };
  mockedAxios.patch.mockResolvedValueOnce({ data: mockResponse });

  const onSuccessMock = jest.fn();

  const { result } = renderHook(
    () => useUpdateUser({ mutationConfig: { onSuccess: onSuccessMock } }),
    { wrapper }
  );

  result.current.mutate({ id: 1, data: new FormData() });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(mockedToast.success).toHaveBeenCalledWith("User updated");

  expect(onSuccessMock).toHaveBeenCalledWith(
    mockResponse,
    { id: 1, data: expect.any(FormData) },
    undefined,
    undefined
  );
});
