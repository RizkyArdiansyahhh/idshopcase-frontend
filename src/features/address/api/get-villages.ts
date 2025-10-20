import { wilayahApi } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type VillagesItemResponse = {
  id: string;
  name: string;
};

export const getVillages = async (codeDistrict: string) => {
  const response = await wilayahApi.get<VillagesItemResponse[]>(
    `/villages/${codeDistrict}.json`
  );
  return response.data;
};

export const getVillagesQueryKey = (codeDistrict: string) => [
  "villages",
  codeDistrict,
];

export const getVillagesQueryOptions = (codeDistrict: string) => {
  return queryOptions({
    queryKey: getVillagesQueryKey(codeDistrict),
    queryFn: () => getVillages(codeDistrict),
  });
};

type UseGetVillagesParams = {
  queryConfig?: QueryConfig<typeof getVillagesQueryOptions>;
  codeDistrict: string;
};

export const useGetVillages = (params: UseGetVillagesParams) => {
  return useQuery({
    ...getVillagesQueryOptions(params.codeDistrict),
    ...params.queryConfig,
  });
};
