import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { OrderAdmin } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getOrderAdmin = async (id: string | number) => {
  const response = await api.get<{ order: OrderAdmin }>(`/order/admin/${id}`);
  return response.data.order;
};

export const getOrderAdminQueryKey = (id: string | number) => ["order-admin", id];

const getOrderAdminQueryOptions = (id: string | number) => {
  return queryOptions({
    queryKey: getOrderAdminQueryKey(id),
    queryFn: () => getOrderAdmin(id),
  });
};

type UseGetOrderAdminParams = {
  queryConfig?: QueryConfig<typeof getOrderAdminQueryOptions>;
  id: string | number;
};

export const useGetOrderAdmin = ({
  queryConfig,
  id,
}: UseGetOrderAdminParams) => {
  return useQuery({
    ...getOrderAdminQueryOptions(id),
    ...queryConfig,
  });
};
