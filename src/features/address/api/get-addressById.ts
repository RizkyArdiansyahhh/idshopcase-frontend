import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Address } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getAddressById = async (id: number) => {
  const response = await api.get<Address>(`/addresses/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
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
