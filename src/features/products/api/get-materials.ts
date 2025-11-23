import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Material } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type GetMaterialsResponse = {
  data: Material[];
};

const getMaterials = async () => {
  const response = await api.get<GetMaterialsResponse>("/reference/materials");
  return response.data.data;
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
