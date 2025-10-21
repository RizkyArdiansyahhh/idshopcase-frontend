import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getUser = async (id: number) => {
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const getUserQueryKey = () => ["user"];

export const getUserQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: getUserQueryKey(),
    queryFn: () => getUser(id),
  });
};

type UseGetUserParams = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
  id: number;
};

export const useGetUser = (params: UseGetUserParams) => {
  return useQuery({
    ...getUserQueryOptions(params.id),
    ...params.queryConfig,
  });
};
