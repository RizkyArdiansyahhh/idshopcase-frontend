import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { CartItem } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getCarts = async () => {
  const response = await api.get<{ CartItems: CartItem[] }>("/cart");
  return response.data.CartItems;
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
