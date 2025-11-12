"use client";
import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Product } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getProducts = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.get<Product[]>("/product");

  return response.data;
};

export const getProductsQueryKey = () => ["products"];

export const getProductsQueryOptions = () => {
  return queryOptions({
    queryKey: getProductsQueryKey(),
    queryFn: () => getProducts(),
  });
};

type UseGetProductParams = {
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useGetProducts = ({ queryConfig }: UseGetProductParams = {}) => {
  return useQuery({
    ...getProductsQueryOptions(),
    ...queryConfig,
  });
};
