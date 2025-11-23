import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Order } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getOrder = async (id: number) => {
  const response = await api.get<{ order: Order }>(`/order/${id}`);
  return response.data.order;
};

export const getOrderQueryKey = (id: number) => ["order", id];
export const getOrderQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: getOrderQueryKey(id),
    queryFn: () => getOrder(id),
  });
};

type UseGetOrderParams = {
  queryConfig?: QueryConfig<typeof getOrderQueryOptions>;
  id: number;
};

export const useGetOrder = ({ queryConfig, id }: UseGetOrderParams) => {
  return useQuery({
    ...getOrderQueryOptions(id),
    ...queryConfig,
  });
};
