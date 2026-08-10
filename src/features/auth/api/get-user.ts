import { authClient } from "@/lib/auth-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getUser = async () => {
  const res = await authClient.getSession();
  if (res.error || !res.data?.user) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return res.data.user as any;
};

export const getUserQueryKey = () => ["user"];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: getUserQueryKey(),
    queryFn: () => getUser(),
    staleTime: 5 * 60 * 1000,
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

