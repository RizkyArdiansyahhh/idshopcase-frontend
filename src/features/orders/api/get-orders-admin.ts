import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { OrderAdmin } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getOrdersAdmin = async () => {
  const response = await api.get<{ orders: OrderAdmin[] }>("/order/admin");
  return response.data.orders;
};

export const getOrdersAdminQueryKey = () => ["orders-admin"];

const getOrdersAdminQueryOptions = () => {
  return queryOptions({
    queryKey: getOrdersAdminQueryKey(),
    queryFn: getOrdersAdmin,
  });
};

type UseGetOrdersParams = {
  queryConfig?: QueryConfig<typeof getOrdersAdminQueryOptions>;
};

export const useGetOrdersAdmin = ({ queryConfig }: UseGetOrdersParams = {}) => {
  return useQuery({
    ...getOrdersAdminQueryOptions(),
    ...queryConfig,
  });
};
