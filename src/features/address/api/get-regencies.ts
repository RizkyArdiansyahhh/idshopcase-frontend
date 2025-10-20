import { wilayahApi } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type RegenciesItemResponse = {
  id: string;
  name: string;
};
export const getRegencies = async (codeProvince: string) => {
  const response = await wilayahApi.get<RegenciesItemResponse[]>(
    `/regencies/${codeProvince}.json`
  );
  return response.data;
};

export const getRegenciesQueryKey = (codeProvince: string) => [
  "regencies",
  codeProvince,
];

export const getRegenciesQueryOptions = (codeProvince: string) => {
  return queryOptions({
    queryKey: getRegenciesQueryKey(codeProvince),
    queryFn: () => getRegencies(codeProvince),
  });
};

type UseGetRegenciesParams = {
  queryConfig?: QueryConfig<typeof getRegenciesQueryOptions>;
  codeProvince: string;
};

export const useGetRegencies = (params: UseGetRegenciesParams) => {
  return useQuery({
    ...getRegenciesQueryOptions(params.codeProvince),
    ...params.queryConfig,
  });
};
