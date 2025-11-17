import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { material } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getMaterials = async () => {
  const response = await api.get<material[]>("/reference/materials");
  return response.data;
};

export const getMaterialsQueryKey = () => ["materials"];

const getMaterialsQueryOptions = () => {
  return queryOptions({
    queryKey: getMaterialsQueryKey(),
    queryFn: () => getMaterials(),
  });
};

type UseGetMaterialsParams = {
  queryConfig?: QueryConfig<typeof getMaterialsQueryOptions>;
};

export function useGetMaterials({ queryConfig }: UseGetMaterialsParams = {}) {
  return useQuery({
    ...getMaterialsQueryOptions(),
    ...queryConfig,
  });
}
