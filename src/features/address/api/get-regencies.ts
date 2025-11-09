import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type RegenciesItemResponse = {
  data: string[];
};
export const getRegencies = async (province: string) => {
  const response = await api.get<RegenciesItemResponse>(
    `/jnt-address/cities/?province=${province}`
  );
  return response.data.data;
};

export const getRegenciesQueryKey = (province: string) => [
  "regencies",
  province,
];

export const getRegenciesQueryOptions = (province: string) => {
  return queryOptions({
    queryKey: getRegenciesQueryKey(province),
    queryFn: () => getRegencies(province),
  });
};

type UseGetRegenciesParams = {
  queryConfig?: QueryConfig<typeof getRegenciesQueryOptions>;
  province: string;
};

export const useGetRegencies = (params: UseGetRegenciesParams) => {
  return useQuery({
    ...getRegenciesQueryOptions(params.province),
    ...params.queryConfig,
  });
};
