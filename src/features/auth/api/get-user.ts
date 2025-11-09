import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { User } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getUser = async () => {
  const response = await api.get<User>(`/user/profile`);

  return response.data;
};

export const getUserQueryKey = () => ["user"];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: getUserQueryKey(),
    queryFn: () => getUser(),
  });
};

type UseGetUserParams = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useGetUser = (params: UseGetUserParams = {}) => {
  return useQuery({
    ...getUserQueryOptions(),
    ...params.queryConfig,
  });
};
