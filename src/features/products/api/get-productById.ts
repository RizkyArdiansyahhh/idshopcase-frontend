import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Product } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getProduct = async (id: number) => {
  const response = await api.get<Product>(`/product/${id}`);

  return response.data;
};

export const getProductQueryKey = (id: number) => ["product", id];

export const getProductQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: getProductQueryKey(id),
    queryFn: () => getProduct(id),
  });
};

type UseGetProductParams = {
  queryConfig?: QueryConfig<typeof getProductQueryOptions>;
  id: number;
};

export const useGetProduct = ({ queryConfig, id }: UseGetProductParams) => {
  return useQuery({
    ...getProductQueryOptions(id),
    ...queryConfig,
  });
};
