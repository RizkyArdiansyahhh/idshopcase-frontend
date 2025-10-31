import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetProduct } from "@/features/products/api/get-productById";
import { Product } from "@/types/api";
import axios from "axios";

// Mock axios supaya tidak benar-benar request ke API
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test("useGetProduct fetches product data", async () => {
  const mockProduct: Product = {
    id: 1,
    name: "Test Product",
    price: 100,
    description: "Test",
    stock: 0,
    category: "",
    material: "",
    phone_type: "",
    image: "",
    createdAt: "",
    updatedAt: "",
  };
  mockedAxios.get.mockResolvedValueOnce({ data: mockProduct });

  const { result } = renderHook(() => useGetProduct({ id: 1 }), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(mockProduct);
});
