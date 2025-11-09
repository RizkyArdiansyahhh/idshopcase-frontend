import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type DistrictsItemResponse = {
  data: string[];
};

export const getDistricts = async (regency: string) => {
  const response = await api.get<DistrictsItemResponse>(
    `/jnt-address/districts/?city=${regency}`
  );
  return response.data.data;
};

export const getDistrictsQueryKey = (regency: string) => ["districts", regency];

export const getDistrictsQueryOptions = (regency: string) => {
  return queryOptions({
    queryKey: getDistrictsQueryKey(regency),
    queryFn: () => getDistricts(regency),
  });
};

type UseGetDistricts = {
  queryConfig?: QueryConfig<typeof getDistrictsQueryOptions>;
  regency: string;
};

export const useGetDistricts = (params: UseGetDistricts) => {
  return useQuery({
    ...getDistrictsQueryOptions(params.regency),
    ...params.queryConfig,
  });
};
