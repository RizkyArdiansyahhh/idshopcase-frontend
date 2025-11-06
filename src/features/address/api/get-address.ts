import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Address } from "@/types/api";
import { Query, queryOptions, useQuery } from "@tanstack/react-query";

const getAddresses = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.get<{ addresses: Address[] }>("/user/addresses", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

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
