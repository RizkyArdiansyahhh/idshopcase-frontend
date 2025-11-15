import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { User } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getUsers = async () => {
  const response = await api.get<User[]>("/user");
  return response.data;
};

export const getUsersQueryKey = () => ["users"];

const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: getUsersQueryKey(),
    queryFn: () => getUsers(),
  });
};

type UseGetUsersParams = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useGetUsers = (params: UseGetUsersParams = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...params.queryConfig,
  });
};
