import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Address } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type GetAddressByIdItemRequest = Omit<
  Address,
  "province_id" | "city_id" | "district_id" | "sub_district_id"
>;
const getAddressById = async (id: string | number) => {
  const response = await api.get<{ address: GetAddressByIdItemRequest }>(
    `/user/addresses/${id}`
  );
  return response.data.address;
};

export const getAddressByIdQueryKey = (id: string | number) => ["address", id];
export const getAddressByIdQueryOptions = (id: string | number) => {
  return queryOptions({
    queryKey: getAddressByIdQueryKey(id),
    queryFn: () => getAddressById(id),
  });
};
type UseGetAddressByIdParams = {
  queryConfig?: QueryConfig<typeof getAddressByIdQueryOptions>;
  id: string | number;
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
