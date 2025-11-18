import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Variant } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getVariants = async () => {
  const response = await api.get<Variant[]>("/reference/variants");
  return response.data;
};

export const getVariantsQueryKey = () => ["variants"];
export const getVariantsQueryOptions = () => {
  return queryOptions({
    queryKey: getVariantsQueryKey(),
    queryFn: () => getVariants(),
  });
};

type UseGetVariantsParams = {
  queryConfig?: QueryConfig<typeof getVariantsQueryOptions>;
};

export const useGetVariants = ({ queryConfig }: UseGetVariantsParams = {}) => {
  return useQuery({
    ...getVariantsQueryOptions(),
    ...queryConfig,
  });
};
