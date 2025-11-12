import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { CartItem } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getCarts = async () => {
  try {
    const response = await api.get<{ CartItems: CartItem[] }>("/cart");
    return response.data.CartItems;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("Cart kosong:", error.response.data.message);
      return [];
    }
    throw error;
  }
};

export const getCartsQueryKey = () => ["carts"];

export const getCartQueryOptions = () => {
  return queryOptions({
    queryKey: getCartsQueryKey(),
    queryFn: getCarts,
  });
};

type UseGetCartsParams = {
  queryConfig?: QueryConfig<typeof getCartQueryOptions>;
};

export const useGetCarts = (params: UseGetCartsParams = {}) => {
  return useQuery({
    ...getCartQueryOptions(),
    ...params.queryConfig,
  });
};
