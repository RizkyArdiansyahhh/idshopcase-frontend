import { wilayahApi } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type DistrictsItemResponse = {
  id: string;
  name: string;
};

export const getDistricts = async (codeRegency: string) => {
  const response = await wilayahApi.get<DistrictsItemResponse[]>(
    `/districts/${codeRegency}.json`
  );
  return response.data;
};

export const getDistrictsQueryKey = (codeRegency: string) => [
  "districts",
  codeRegency,
];

export const getDistrictsQueryOptions = (codeRegency: string) => {
  return queryOptions({
    queryKey: getDistrictsQueryKey(codeRegency),
    queryFn: () => getDistricts(codeRegency),
  });
};

type UseGetDistricts = {
  queryConfig?: QueryConfig<typeof getDistrictsQueryOptions>;
  codeRegency: string;
};

export const useGetDistricts = (params: UseGetDistricts) => {
  return useQuery({
    ...getDistrictsQueryOptions(params.codeRegency),
    ...params.queryConfig,
  });
};
