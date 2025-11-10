"use client";
import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Order } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getOrders = async () => {
  const response = await api.get<{ orders: Order[] }>("/order");
  return response.data.orders;
};

export const getOrdersQueryKey = () => ["orders"];

const getOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: getOrdersQueryKey(),
    queryFn: getOrders,
  });
};

type UseGetOrdersParams = {
  queryConfig?: QueryConfig<typeof getOrdersQueryOptions>;
};

export const useGetOrders = (params: UseGetOrdersParams = {}) => {
  return useQuery({
    ...getOrdersQueryOptions(),
    ...params.queryConfig,
  });
};
