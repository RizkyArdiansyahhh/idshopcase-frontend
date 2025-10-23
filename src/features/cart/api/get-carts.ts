import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type GetCartItemResponse = {
  id: number;
  userId: number;
  productId: number;
  updatedAt: string;
};

export const getCarts = async () => {
  const response = await api.get<GetCartItemResponse[]>("/carts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
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
