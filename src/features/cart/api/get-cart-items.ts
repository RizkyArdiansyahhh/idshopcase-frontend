import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type CartItemsResponse = {
  id: number;
  productId: number;
  customImageId?: number;
  quantity: number;
  price: number;
  createdAt: string;
};

export const getCartItems = async () => {
  const response = await api.get<CartItemsResponse[]>("/cartItems", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const getCartItemsQueryKey = () => ["cartItems"];

export const getCartItemsQueryOptions = () => {
  return queryOptions({
    queryKey: getCartItemsQueryKey(),
    queryFn: getCartItems,
  });
};

type UseGetCartItemsParams = {
  queryConfig?: QueryConfig<typeof getCartItemsQueryOptions>;
};

export const useGetCartItems = (params: UseGetCartItemsParams = {}) => {
  return useQuery({
    ...getCartItemsQueryOptions(),
    ...params.queryConfig,
  });
};
