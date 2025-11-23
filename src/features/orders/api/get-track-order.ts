import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getTrackOrder = async (orderId: number) => {
  const response = await api.get(`/order/${orderId}/tracking`);
  return response.data;
};

export const getTrackOrderQueryKey = (orderId: number) => [
  "track-order",
  orderId,
];
export const getTrackOrderQueryOptions = (orderId: number) => {
  return queryOptions({
    queryKey: getTrackOrderQueryKey(orderId),
    queryFn: () => getTrackOrder(orderId),
  });
};

type UseGetTrackOrderParams = {
  queryConfig?: QueryConfig<typeof getTrackOrderQueryOptions>;
  orderId: number;
};

export const useGetTrackOrder = ({
  queryConfig,
  orderId,
}: UseGetTrackOrderParams) => {
  return useQuery({
    ...getTrackOrderQueryOptions(orderId),
    ...queryConfig,
  });
};
