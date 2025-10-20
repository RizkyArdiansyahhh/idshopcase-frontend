import { wilayahApi } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type AddressItemResponse = {
  id: string;
  name: string;
};

export const getProvince = async () => {
  const response = await wilayahApi.get<AddressItemResponse[]>(
    "/provinces.json"
  );

  return response.data;
};

export const getProvincesQueryKey = () => ["provinces"];

export const getProvincesQueryOptions = () => {
  return queryOptions({
    queryKey: getProvincesQueryKey(),
    queryFn: getProvince,
  });
};

type UseGetProvincesParams = {
  queryConfig?: QueryConfig<typeof getProvincesQueryOptions>;
};

export const useGetProvinces = (params: UseGetProvincesParams = {}) => {
  return useQuery({
    ...getProvincesQueryOptions(),
    ...params.queryConfig,
  });
};
