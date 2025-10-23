import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getOrders = async () => {
  const response = await api.get("/orders", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
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
