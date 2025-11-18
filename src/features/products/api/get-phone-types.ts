import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { PhoneType } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type PhoneTypeResponse = {
  message: string;
  data: PhoneType[];
};

const getPhoneTypes = async () => {
  const response = await api.get<PhoneTypeResponse>("/reference/phone-types");
  return response.data.data;
};

export const getPhoneTypesQueryKey = () => ["phone-types"];
export const getPhoneTypesQueryOptions = () => {
  return queryOptions({
    queryKey: getPhoneTypesQueryKey(),
    queryFn: () => getPhoneTypes(),
  });
};

type UseGetPhoneTypesParams = {
  queryConfig?: QueryConfig<typeof getPhoneTypes>;
};
export function useGetPhoneTypes({ queryConfig }: UseGetPhoneTypesParams = {}) {
  return useQuery({
    ...getPhoneTypesQueryOptions(),
    ...queryConfig,
  });
}
