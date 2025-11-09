import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Address } from "@/types/api";
import { Query, queryOptions, useQuery } from "@tanstack/react-query";

type GetAddressesItemResponse = Omit<
  Address,
  "province_id" | "city_id" | "district_id" | "sub_district_id"
>;

const getAddresses = async () => {
  const response = await api.get<{ addresses: GetAddressesItemResponse[] }>(
    "/user/addresses"
  );

  return response.data.addresses;
};

export const getAddressesQueryKey = () => ["address"];
export const getAddressQueryOptions = () => {
  return queryOptions({
    queryKey: getAddressesQueryKey(),
    queryFn: getAddresses,
  });
};

type useGetAddressesParams = {
  queryConfig?: QueryConfig<typeof getAddressQueryOptions>;
};

export const useGetAddresses = (params: useGetAddressesParams = {}) => {
  return useQuery({
    ...params.queryConfig,
    ...getAddressQueryOptions(),
  });
};
