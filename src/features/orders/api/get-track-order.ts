import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getTrackOrder = async (orderId: string | number) => {
  const response = await api.get(`/order/${orderId}/tracking`);
  return response.data.tracking;
};

export const getTrackOrderQueryKey = (orderId: string | number) => [
  "track-order",
  String(orderId),
];
export const getTrackOrderQueryOptions = (orderId: string | number) => {
  return queryOptions({
    queryKey: getTrackOrderQueryKey(orderId),
    queryFn: () => getTrackOrder(orderId),
  });
};

type UseGetTrackOrderParams = {
  queryConfig?: QueryConfig<typeof getTrackOrderQueryOptions>;
  orderId: string | number;
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
