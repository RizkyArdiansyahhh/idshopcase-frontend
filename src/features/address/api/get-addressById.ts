import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Address } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type GetAddressByIdItemRequest = Omit<
  Address,
  "province_id" | "city_id" | "district_id" | "sub_district_id"
>;
const getAddressById = async (id: number) => {
  const response = await api.get<{ address: GetAddressByIdItemRequest }>(
    `/user/addresses/${id}`
  );
  return response.data.address;
};

export const getAddressByIdQueryKey = (id: number) => ["address", id];
export const getAddressByIdQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: getAddressByIdQueryKey(id),
    queryFn: () => getAddressById(id),
  });
};
type UseGetAddressByIdParams = {
  queryConfig?: QueryConfig<typeof getAddressByIdQueryOptions>;
  id: number;
};

export const useGetAddressById = ({
  queryConfig,
  id,
}: UseGetAddressByIdParams) => {
  return useQuery({
    ...getAddressByIdQueryOptions(id),
    ...queryConfig,
  });
};
